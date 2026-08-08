'use client'

import { useState, useEffect, useCallback, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  MagneticDock,
  DockIconHome,
  DockIconAbout,
  DockIconProjects,
  DockIconVideo,
  DockIconCreative,
  DockIconSkills,
  DockIconContact,
} from "@/components/ui/magnetic-dock"
import type { DockItemData } from "@/components/ui/magnetic-dock"

/* ─────────────────────────────────────────────────────────────────────────────
   Section ID → icon mapping
───────────────────────────────────────────────────────────────────────────── */
const NAV_ITEMS: Omit<DockItemData, "onClick" | "isActive">[] = [
  { id: "hero",     label: "Home",     icon: <DockIconHome /> },
  { id: "about",    label: "About",    icon: <DockIconAbout /> },
  { id: "projects", label: "Projects", icon: <DockIconProjects /> },
  { id: "video",    label: "Video",    icon: <DockIconVideo /> },
  { id: "creative", label: "Creative", icon: <DockIconCreative /> },
  { id: "stack",    label: "Skills",   icon: <DockIconSkills /> },
  { id: "cta",      label: "Contact",  icon: <DockIconContact /> },
]

function scrollToSection(id: string) {
  if (id === 'hero') {
    const lenis = (window as Window & { __lenis?: { scrollTo: (target: number, opts?: object) => void } }).__lenis
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2, easing: (t: number) => 1 - Math.pow(1 - t, 4) })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return
  }
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ─────────────────────────────────────────────────────────────────────────────
   Detect which section is in view on homepage
───────────────────────────────────────────────────────────────────────────── */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.3 },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [ids])

  return active
}

/* ─────────────────────────────────────────────────────────────────────────────
   Responsive config — single source of truth for icon sizing and mobile flag.
───────────────────────────────────────────────────────────────────────────── */
function useResponsiveDock() {
  const [config, setConfig] = useState({
    iconSize: 50,
    maxScale: 1.65,
    magneticDistance: 145,
    isMobile: false,
    bottomInset: "calc(20px + env(safe-area-inset-bottom, 0px))",
  })

  useEffect(() => {
    function update() {
      const w = window.innerWidth
      const h = window.innerHeight
      const isLandscape = w > h
      const mobile = w < 768

      if (w < 400) {
        setConfig({
          iconSize: 34,
          maxScale: 1.0,
          magneticDistance: 60,
          isMobile: true,
          bottomInset: isLandscape
            ? "calc(12px + env(safe-area-inset-bottom, 0px))"
            : "calc(env(safe-area-inset-bottom, 0px) + 72px)",
        })
      } else if (w < 640) {
        setConfig({
          iconSize: 38,
          maxScale: 1.0,
          magneticDistance: 80,
          isMobile: true,
          bottomInset: isLandscape
            ? "calc(10px + env(safe-area-inset-bottom, 0px))"
            : "calc(env(safe-area-inset-bottom, 0px) + 72px)",
        })
      } else if (w < 768) {
        setConfig({
          iconSize: 42,
          maxScale: 1.15,
          magneticDistance: 100,
          isMobile: true,
          bottomInset: isLandscape
            ? "calc(10px + env(safe-area-inset-bottom, 0px))"
            : "calc(env(safe-area-inset-bottom, 0px) + 64px)",
        })
      } else if (w < 1024) {
        setConfig({
          iconSize: 46,
          maxScale: 1.4,
          magneticDistance: 120,
          isMobile: false,
          bottomInset: "calc(24px + env(safe-area-inset-bottom, 0px))",
        })
      } else {
        setConfig({
          iconSize: 52,
          maxScale: 1.65,
          magneticDistance: 145,
          isMobile: false,
          bottomInset: "calc(20px + env(safe-area-inset-bottom, 0px))",
        })
      }

      void mobile
    }

    update()
    window.addEventListener("resize", update)
    window.addEventListener("orientationchange", update)
    return () => {
      window.removeEventListener("resize", update)
      window.removeEventListener("orientationchange", update)
    }
  }, [])

  return config
}

/* ─────────────────────────────────────────────────────────────────────────────
   Dock visibility — unified scroll + footer observer.
───────────────────────────────────────────────────────────────────────────── */
function useDockVisibility(pathname: string): boolean {
  const [showDock, setShowDock] = useState(false)
  const footerVisibleRef = useRef(false)

  const evaluate = useCallback(() => {
    if (footerVisibleRef.current) {
      setShowDock(false)
      return
    }
    const scrollY = window.scrollY
    const threshold = pathname === '/' ? window.innerHeight - 10 : 150
    setShowDock(scrollY >= threshold)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => evaluate()
    window.addEventListener("scroll", onScroll, { passive: true })
    evaluate()

    const footer = document.querySelector("footer")
    let footerObs: IntersectionObserver | null = null
    if (footer) {
      footerObs = new IntersectionObserver(
        ([entry]) => {
          footerVisibleRef.current = entry.isIntersecting
          evaluate()
        },
        { threshold: 0.01 },
      )
      footerObs.observe(footer)
    }

    return () => {
      window.removeEventListener("scroll", onScroll)
      footerObs?.disconnect()
    }
  }, [evaluate])

  return showDock
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────────────────────── */
export default function PortfolioDock() {
  const pathname = usePathname()
  const router = useRouter()
  const sectionIds = NAV_ITEMS.map((i) => i.id)
  const sectionActiveId = useActiveSection(sectionIds)
  const { iconSize, maxScale, magneticDistance, isMobile, bottomInset } = useResponsiveDock()
  const showDock = useDockVisibility(pathname)

  // Compute active item based on route
  let activeId = sectionActiveId
  if (pathname === '/about') activeId = 'about'
  else if (pathname === '/contact') activeId = 'cta'
  else if (pathname === '/projects') activeId = 'projects'
  else if (pathname === '/videos') activeId = 'video'

  const handleItemClick = (id: string) => {
    if (pathname === '/') {
      scrollToSection(id)
      return
    }

    // On sub-pages (e.g. /about, /contact, /services/*, /projects, etc.)
    if (id === 'hero') {
      router.push('/')
      return
    }

    if (id === 'about') {
      if (pathname === '/about') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        router.push('/about')
      }
      return
    }

    if (id === 'projects') {
      if (pathname === '/projects') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        router.push('/projects')
      }
      return
    }

    if (id === 'video') {
      if (pathname === '/videos') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        router.push('/videos')
      }
      return
    }

    if (id === 'cta') {
      if (pathname === '/contact') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        router.push('/contact')
      }
      return
    }

    if (id === 'creative' || id === 'stack') {
      router.push(`/#${id}`)
      return
    }

    router.push('/')
  }

  const items: DockItemData[] = NAV_ITEMS.map((nav) => ({
    ...nav,
    isActive: nav.id === activeId,
    onClick: () => handleItemClick(nav.id),
  }))

  return (
    <div
      className="fixed left-0 right-0 z-[200] flex justify-center pointer-events-none"
      style={{ bottom: bottomInset }}
      role="navigation"
      aria-label="Page navigation dock"
    >
      <div
        className="overflow-visible"
        style={{
          maxWidth: "95vw",
          opacity: showDock ? 1 : 0,
          transform: `translateY(${showDock ? "0" : "40px"})`,
          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
          pointerEvents: showDock ? "auto" : "none",
          willChange: "opacity, transform",
        }}
      >
        <MagneticDock
          items={items}
          iconSize={iconSize}
          maxScale={maxScale}
          magneticDistance={magneticDistance}
          showLabels={true}
          variant="glass"
          isMobile={isMobile}
        />
      </div>
    </div>
  )
}
