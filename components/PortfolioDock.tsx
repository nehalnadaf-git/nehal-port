'use client'

import { useState, useEffect, useCallback, useRef } from "react"
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
   Detect which section is in view
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
   This drives both the dock appearance and MagneticDock's isMobile prop.
───────────────────────────────────────────────────────────────────────────── */
function useResponsiveDock() {
  const [config, setConfig] = useState({
    iconSize: 50,
    maxScale: 1.65,
    magneticDistance: 145,
    isMobile: false,
    // Bottom clearance — accounts for Android Chrome UI bar + iOS home indicator
    bottomInset: "calc(20px + env(safe-area-inset-bottom, 0px))",
  })

  useEffect(() => {
    function update() {
      const w = window.innerWidth
      const h = window.innerHeight
      const isLandscape = w > h
      const mobile = w < 768

      if (w < 400) {
        // Very small phones (iPhone SE 1st gen, small Androids)
        setConfig({
          iconSize: 34,
          maxScale: 1.0,
          magneticDistance: 60,
          isMobile: true,
          // Extra clearance for Android bottom bar in portrait (≈56px UI bar + buffer)
          bottomInset: isLandscape
            ? "calc(12px + env(safe-area-inset-bottom, 0px))"
            : "calc(env(safe-area-inset-bottom, 0px) + 72px)",
        })
      } else if (w < 640) {
        // Standard mobile (iPhone, Pixel, etc.)
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
        // Large phones / small tablets
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
        // Tablets (iPad, Android tablet)
        setConfig({
          iconSize: 46,
          maxScale: 1.4,
          magneticDistance: 120,
          isMobile: false,
          bottomInset: "calc(24px + env(safe-area-inset-bottom, 0px))",
        })
      } else {
        // Desktop / large displays
        setConfig({
          iconSize: 52,
          maxScale: 1.65,
          magneticDistance: 145,
          isMobile: false,
          bottomInset: "calc(20px + env(safe-area-inset-bottom, 0px))",
        })
      }

      void mobile // suppress lint — already used via w < 768
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
   Avoids the conflict between two separate effects fighting over `showDock`.
───────────────────────────────────────────────────────────────────────────── */
function useDockVisibility(): boolean {
  const [showDock, setShowDock] = useState(false)
  // Track footer intersection separately so scroll handler doesn't override it
  const footerVisibleRef = useRef(false)

  const evaluate = useCallback(() => {
    if (footerVisibleRef.current) {
      setShowDock(false)
      return
    }
    const scrollY = window.scrollY
    // Show once user has scrolled past the hero (first full viewport height)
    const pastHero = scrollY >= window.innerHeight - 10
    setShowDock(pastHero)
  }, [])

  useEffect(() => {
    // Scroll listener
    const onScroll = () => evaluate()
    window.addEventListener("scroll", onScroll, { passive: true })
    evaluate() // run once on mount

    // Footer intersection
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
  const sectionIds = NAV_ITEMS.map((i) => i.id)
  const activeId = useActiveSection(sectionIds)
  const { iconSize, maxScale, magneticDistance, isMobile, bottomInset } = useResponsiveDock()
  const showDock = useDockVisibility()

  const items: DockItemData[] = NAV_ITEMS.map((nav) => ({
    ...nav,
    isActive: nav.id === activeId,
    onClick: () => scrollToSection(nav.id),
  }))

  return (
    <div
      className="fixed left-0 right-0 z-[200] flex justify-center pointer-events-none"
      style={{ bottom: bottomInset }}
      role="navigation"
      aria-label="Page navigation dock"
    >
      <div
        // max-w ensures dock never overflows on tiny screens; overflow-visible keeps tooltips visible
        className="overflow-visible"
        style={{
          // clamp dock width: never wider than 95vw
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
