'use client'

import * as React from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from "framer-motion"
import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */
export interface DockItemData {
  id: string
  label: string
  icon: React.ReactNode
  onClick?: () => void
  isActive?: boolean
  badge?: number
}

interface MagneticDockProps {
  items: DockItemData[]
  iconSize?: number
  maxScale?: number
  magneticDistance?: number
  showLabels?: boolean
  variant?: "glass" | "solid" | "transparent"
  className?: string
  /** Pass isMobile from the parent to avoid duplicate state / hydration mismatch */
  isMobile?: boolean
}

interface DockItemProps {
  item: DockItemData
  mouseX: MotionValue<number>
  iconSize: number
  maxScale: number
  magneticDistance: number
  showLabels: boolean
  isMobile: boolean
}

/* ─────────────────────────────────────────────────────────────────────────────
   Single Dock Item
───────────────────────────────────────────────────────────────────────────── */
function DockItem({
  item,
  mouseX,
  iconSize,
  maxScale,
  magneticDistance,
  showLabels,
  isMobile,
}: DockItemProps) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = React.useState(false)

  // ── Magnetic distance calculation ──────────────────────────────────────────
  const distance = useTransform(mouseX, (val: number) => {
    if (isMobile || !ref.current) return magneticDistance + 1
    const rect = ref.current.getBoundingClientRect()
    return val - (rect.left + rect.width / 2)
  })

  const scale = useTransform(
    distance,
    [-magneticDistance, 0, magneticDistance],
    isMobile ? [1, 1, 1] : [1, maxScale, 1],
  )

  const springCfg = { damping: 22, stiffness: 320, mass: 0.45 }
  const smoothScale = useSpring(scale, springCfg)
  const size = useTransform(smoothScale, (s) => s * iconSize)
  // Only apply Y lift on desktop — keeps mobile dock flat and stable
  const rawY = useTransform(smoothScale, (s) => (isMobile ? 0 : (s - 1) * -10))
  const smoothY = useSpring(rawY, springCfg)

  // ── Touch-device: simulate hover on tap ────────────────────────────────────
  const handleTouchStart = React.useCallback(() => {
    setIsHovered(true)
  }, [])
  const handleTouchEnd = React.useCallback(() => {
    // Brief highlight, then fade
    setTimeout(() => setIsHovered(false), 200)
  }, [])

  return (
    <motion.button
      ref={ref}
      onClick={item.onClick}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label={item.label}
      aria-current={item.isActive ? "page" : undefined}
      className="relative flex items-center justify-center flex-shrink-0 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
      style={{
        width: size,
        height: size,
        y: smoothY,
        // Eliminate 300ms tap delay on all mobile browsers
        touchAction: "manipulation",
        // Prevent text/icon selection on long-press
        userSelect: "none",
        WebkitUserSelect: "none",
        // GPU compositing hint for smooth animation
        willChange: "transform",
      }}
      whileTap={{ scale: 0.85 }}
    >
      {/* ── Icon shell ── */}
      <motion.div
        className="relative w-full h-full rounded-2xl flex items-center justify-center overflow-hidden"
        style={{
          background: isHovered ? "#7C3AED" : "#ffffff",
          boxShadow: isHovered
            ? "4px 4px 0px 0px #000000"
            : "2px 2px 0px 0px #000000",
          border: "2px solid #000000",
          transition: "background 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        {/* Icon */}
        <div
          className="w-[56%] h-[56%] flex items-center justify-center"
          style={{
            color: isHovered ? "#ffffff" : "#7C3AED",
            transition: "color 0.2s ease",
          }}
        >
          {item.icon}
        </div>
      </motion.div>

      {/* ── Badge ── */}
      <AnimatePresence>
        {item.badge !== undefined && item.badge > 0 && (
          <motion.span
            key="badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-1 -right-1 z-10 min-w-[16px] h-4 px-1 rounded-full bg-purple-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-black shadow-sm"
          >
            {item.badge > 99 ? "99+" : item.badge}
          </motion.span>
        )}
      </AnimatePresence>

      {/* ── Active dot — visible on all backgrounds via dark ring ── */}
      <AnimatePresence>
        {item.isActive && (
          <motion.span
            key="active"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -bottom-2.5 w-1.5 h-1.5 rounded-full border border-black/30"
            style={{ background: "#ffffff" }}
          />
        )}
      </AnimatePresence>

      {/* ── Tooltip — desktop only, rendered outside icon shell to avoid clipping ── */}
      <AnimatePresence>
        {showLabels && isHovered && !isMobile && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.88 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            // Use fixed positioning via translate trick — stays above overflow boundaries
            className="absolute -top-10 left-1/2 -translate-x-1/2 z-[300] px-2.5 py-1.5 rounded-lg whitespace-nowrap pointer-events-none"
            style={{
              background: "#ffffff",
              border: "2px solid #000000",
              boxShadow: "3px 3px 0px 0px #000000",
              color: "#000000",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.02em",
            }}
          >
            {item.label}
            <span
              className="absolute left-1/2 -translate-x-1/2 -bottom-[5px] w-2 h-2 rotate-45"
              style={{
                background: "#ffffff",
                borderRight: "2px solid #000000",
                borderBottom: "2px solid #000000",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Dock Container
───────────────────────────────────────────────────────────────────────────── */
export function MagneticDock({
  items,
  iconSize = 52,
  maxScale = 1.6,
  magneticDistance = 140,
  showLabels = true,
  variant = "glass",
  className,
  isMobile = false,
}: MagneticDockProps) {
  const mouseX = useMotionValue(Infinity)

  const variantStyles: Record<NonNullable<MagneticDockProps["variant"]>, React.CSSProperties> = {
    glass: {
      // backdropFilter blur removed: it is the most GPU-expensive CSS property and
      // caused stutter on mid-range hardware. Solid semi-transparent bg looks identical.
      background: "rgba(100, 40, 200, 0.92)",
      border: "3px solid #000000",
      boxShadow: "4px 4px 0px 0px #000000",
    },
    solid: {
      background: "#7C3AED",
      border: "3px solid #000000",
      boxShadow: "4px 4px 0px 0px #000000",
    },
    transparent: {
      background: "transparent",
      border: "none",
    },
  }

  return (
    <motion.div
      onMouseMove={(e) => !isMobile && mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        // items-center keeps icons vertically stable during scale animation;
        // items-end caused drift on mobile where y-lift is disabled
        "inline-flex items-center rounded-3xl",
        // Ensure tooltips (absolutely positioned children) are not clipped
        "overflow-visible",
        isMobile ? "gap-1.5 px-3 py-2.5" : "gap-2 px-4 py-3",
        className,
      )}
      style={{
        ...variantStyles[variant ?? "glass"],
        // willChange removed from container: child DockItem elements already have
        // willChange: 'transform' for their individual scale animations. Adding it
        // here creates a redundant stacking context and extra GPU memory pressure.
      }}
      initial={{ opacity: 0, y: 28, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {items.map((item) => (
        <DockItem
          key={item.id}
          item={item}
          mouseX={mouseX}
          iconSize={iconSize}
          maxScale={maxScale}
          magneticDistance={magneticDistance}
          showLabels={showLabels}
          isMobile={isMobile}
        />
      ))}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Preset icons
───────────────────────────────────────────────────────────────────────────── */
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  style: { width: "100%", height: "100%" },
}

export function DockIconHome() {
  return (
    <svg {...iconProps}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

export function DockIconAbout() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

export function DockIconProjects() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

export function DockIconVideo() {
  return (
    <svg {...iconProps}>
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  )
}

export function DockIconSkills() {
  return (
    <svg {...iconProps}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

export function DockIconContact() {
  return (
    <svg {...iconProps}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

export function DockIconCreative() {
  return (
    <svg {...iconProps}>
      <circle cx="13.5" cy="6.5" r=".5" />
      <circle cx="17.5" cy="10.5" r=".5" />
      <circle cx="8.5" cy="7.5" r=".5" />
      <circle cx="6.5" cy="12.5" r=".5" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  )
}

export function DockIconBlog() {
  return (
    <svg {...iconProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

export type { MagneticDockProps }
