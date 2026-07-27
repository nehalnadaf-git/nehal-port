'use client'

import { useState, useEffect } from "react"
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
  // Home → always scroll to absolute top (position 0)
  // Use Lenis instance if available (exposed on window by useSmoothScroll),
  // otherwise fall back to native scrollTo which Lenis also intercepts.
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
   Responsive icon size hook
───────────────────────────────────────────────────────────────────────────── */
function useResponsiveDock() {
  const [config, setConfig] = useState({
    iconSize: 50,
    maxScale: 1.65,
    magneticDistance: 145,
  })

  useEffect(() => {
    function update() {
      const w = window.innerWidth
      if (w < 400) {
        setConfig({ iconSize: 36, maxScale: 1.2, magneticDistance: 60 })
      } else if (w < 640) {
        setConfig({ iconSize: 40, maxScale: 1.25, magneticDistance: 80 })
      } else if (w < 1024) {
        setConfig({ iconSize: 46, maxScale: 1.5, magneticDistance: 120 })
      } else {
        setConfig({ iconSize: 52, maxScale: 1.65, magneticDistance: 145 })
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return config
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────────────────────── */
export default function PortfolioDock() {
  const sectionIds = NAV_ITEMS.map((i) => i.id)
  const activeId = useActiveSection(sectionIds)
  const { iconSize, maxScale, magneticDistance } = useResponsiveDock()
  const [showDock, setShowDock] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const nearBottom = scrollY + window.innerHeight >= document.body.scrollHeight - 200
      // Show dock only if scrolled past the hero section (100vh height) AND not near page bottom
      if (scrollY >= window.innerHeight - 10 && !nearBottom) {
        setShowDock(true)
      } else {
        setShowDock(false)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Also hide dock when footer is in view to prevent overlap
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowDock(false)
        }
      },
      { threshold: 0.01 }
    )
    obs.observe(footer)
    return () => obs.disconnect()
  }, [])

  const items: DockItemData[] = NAV_ITEMS.map((nav) => ({
    ...nav,
    isActive: nav.id === activeId,
    onClick: () => scrollToSection(nav.id),
  }))

  return (
    <div
      className="fixed left-0 right-0 z-[200] flex justify-center pointer-events-none"
      style={{
        // 20px base clears Android Chrome bottom bar; safe-area-inset handles iOS home indicator
        bottom: 'calc(20px + env(safe-area-inset-bottom, 0px))',
      }}
      role="navigation"
      aria-label="Page navigation dock"
    >
      <div
        className="transition-all duration-500 ease-out max-w-[95vw]"
        style={{
          opacity: showDock ? 1 : 0,
          transform: `translateY(${showDock ? '0' : '40px'})`,
          pointerEvents: showDock ? 'auto' : 'none',
        }}
      >
        <MagneticDock
          items={items}
          iconSize={iconSize}
          maxScale={maxScale}
          magneticDistance={magneticDistance}
          showLabels={true}
          variant="glass"
        />
      </div>
    </div>
  )
}
