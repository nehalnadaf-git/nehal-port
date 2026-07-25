'use client'

// DraggableGrid — True infinite virtual canvas (pan + zoom + infinite tiling)
import { motion, useMotionValue } from "framer-motion"
import { useEffect, useRef, useState, useCallback, useMemo } from "react"

export type GridItem = {
  image?: { src?: string; alt?: string }
  alt?: string
  label?: string
  category?: string
  url?: string
  driveId?: string
}

interface DraggableGridProps {
  items: GridItem[]
  imageWidth?: number
  imageHeight?: number
  gap?: number           // gap in pixels
  rounded?: number       // 0-20
  autoScroll?: boolean
  autoScrollDx?: number
  autoScrollDy?: number
  onItemClick?: (item: GridItem) => void
  style?: React.CSSProperties
}

const MIN_SCALE = 0.08
const MAX_SCALE = 5
const BUFFER = 2       // extra tile buffer around viewport

/* ── Deterministic item picker ────────────────────────────────────────────
   Uses a good integer hash so every (col, row) always maps to the same
   item, but adjacent cells get different items wherever possible.       */
function cellHash(col: number, row: number): number {
  // Szudzik elegant pairing, then xorshift mix
  const n = col >= 0
    ? (row >= 0 ? col >= row ? col * col + col + row : row * row + col
      : col >= -row - 1 ? col * col + col + row : (row + 1) * (row + 1) + col)
    : (row >= 0
      ? col >= -row ? col * col - col + row : row * row - col
      : (-col) >= (-row) ? col * col - col + row : (row + 1) * (row + 1) - col)
  let h = n ^ (n >>> 14)
  h = Math.imul(h, 0x45d9f3b) | 0
  h = h ^ (h >>> 15)
  return Math.abs(h)
}

function getItemForCell(col: number, row: number, items: GridItem[]): GridItem {
  if (!items.length) return {}
  const n = items.length
  // Pick base item
  let idx = cellHash(col, row) % n
  // Avoid same as left/top neighbors when we have enough items
  if (n > 2) {
    const leftIdx = cellHash(col - 1, row) % n
    const topIdx  = cellHash(col, row - 1) % n
    let attempts = 0
    while ((idx === leftIdx || idx === topIdx) && attempts < n) {
      idx = (idx + 1) % n
      attempts++
    }
  }
  return items[idx]
}

/* ── Tile background color (deterministic per cell) ─────────────────────── */
function tileColor(col: number, row: number): string {
  const hue = ((col * 47 + row * 73) * 137.508) % 360
  return `hsl(${Math.abs(hue)}, 32%, 16%)`
}

type TileData = { col: number; row: number; item: GridItem }

type VisibleRange = { colStart: number; colEnd: number; rowStart: number; rowEnd: number }

function rangesEqual(a: VisibleRange, b: VisibleRange) {
  return a.colStart === b.colStart && a.colEnd === b.colEnd &&
         a.rowStart === b.rowStart && a.rowEnd === b.rowEnd
}

export default function DraggableGrid({
  items = [],
  imageWidth = 320,
  imageHeight = 200,
  gap = 24,
  rounded = 3,
  autoScroll = false,
  autoScrollDx = 0.18,
  autoScrollDy = 0.12,
  onItemClick,
  style,
}: DraggableGridProps) {
  const containerRef   = useRef<HTMLDivElement>(null)
  const containerSize  = useRef({ w: 1200, h: 800 })

  // ── Motion values for pan + zoom ────────────────────────────────────────
  const x     = useMotionValue(0)
  const y     = useMotionValue(0)
  const scale = useMotionValue(1)

  // ── Pan state ────────────────────────────────────────────────────────────
  const isPanningRef  = useRef(false)
  const lastPointer   = useRef({ x: 0, y: 0 })
  const didPan        = useRef(false)
  const [isPanning, setIsPanning] = useState(false)

  // ── Auto-scroll RAF ──────────────────────────────────────────────────────
  const scrollRaf = useRef<number | null>(null)

  // ── Tile click tracking ──────────────────────────────────────────────────
  const tilePD = useRef<{ x: number; y: number; col: number; row: number } | null>(null)

  // ── Virtual tile state ───────────────────────────────────────────────────
  const rangeRef       = useRef<VisibleRange | null>(null)
  const [tiles, setTiles] = useState<TileData[]>([])
  const [zoomPct, setZoomPct] = useState(100)

  // Cell size (world pixels)
  const cellW = imageWidth + gap
  const cellH = imageHeight + gap
  const radius = (rounded / 20) * (Math.min(imageWidth, imageHeight) / 2)

  /* ── Compute visible tile range ─────────────────────────────────────────── */
  const computeRange = useCallback((): VisibleRange => {
    const { w, h } = containerSize.current
    const s  = scale.get()
    const px = x.get()
    const py = y.get()
    return {
      colStart: Math.floor(-px / s / cellW) - BUFFER,
      colEnd:   Math.ceil((-px + w) / s / cellW) + BUFFER,
      rowStart: Math.floor(-py / s / cellH) - BUFFER,
      rowEnd:   Math.ceil((-py + h) / s / cellH) + BUFFER,
    }
  }, [cellW, cellH, x, y, scale])

  /* ── Rebuild tile array from range ─────────────────────────────────────── */
  const buildTiles = useCallback((range: VisibleRange): TileData[] => {
    const out: TileData[] = []
    for (let col = range.colStart; col <= range.colEnd; col++) {
      for (let row = range.rowStart; row <= range.rowEnd; row++) {
        out.push({ col, row, item: getItemForCell(col, row, items) })
      }
    }
    return out
  }, [items])

  /* ── Refresh tiles only when range changes ──────────────────────────────── */
  const refreshTiles = useCallback(() => {
    const newRange = computeRange()
    if (!rangeRef.current || !rangesEqual(newRange, rangeRef.current)) {
      rangeRef.current = newRange
      setTiles(buildTiles(newRange))
    }
  }, [computeRange, buildTiles])

  // Initialise on mount + items change
  useEffect(() => {
    rangeRef.current = null   // force rebuild
    refreshTiles()
  }, [items, refreshTiles])

  // Resize observer
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const measure = () => {
      const rect = el.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        containerSize.current = { w: rect.width, h: rect.height }
        rangeRef.current = null
        refreshTiles()
      }
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [refreshTiles])

  // Subscribe to motion value changes → update visible tiles + zoom badge
  useEffect(() => {
    const u1 = x.on("change", refreshTiles)
    const u2 = y.on("change", refreshTiles)
    const u3 = scale.on("change", () => {
      setZoomPct(Math.round(scale.get() * 100))
      refreshTiles()
    })
    return () => { u1(); u2(); u3() }
  }, [x, y, scale, refreshTiles])

  /* ── Auto-scroll ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!autoScroll) return
    const tick = () => {
      if (!isPanningRef.current) {
        x.set(x.get() - autoScrollDx)
        y.set(y.get() - autoScrollDy)
      }
      scrollRaf.current = requestAnimationFrame(tick)
    }
    scrollRaf.current = requestAnimationFrame(tick)
    return () => { if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current) }
  }, [autoScroll, autoScrollDx, autoScrollDy, x, y])

  /* ── Pointer pan ─────────────────────────────────────────────────────────── */
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    isPanningRef.current = true
    didPan.current = false
    lastPointer.current = { x: e.clientX, y: e.clientY }
    setIsPanning(true)

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - lastPointer.current.x
      const dy = ev.clientY - lastPointer.current.y
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) didPan.current = true
      x.set(x.get() + dx)
      y.set(y.get() + dy)
      lastPointer.current = { x: ev.clientX, y: ev.clientY }
    }
    const onUp = () => {
      isPanningRef.current = false
      setIsPanning(false)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
  }, [x, y])

  /* ── Wheel: pan (default) | zoom (Ctrl/Meta/trackpad pinch) ─────────────── */
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (e.ctrlKey || e.metaKey) {
        // Zoom toward cursor
        const rect  = el.getBoundingClientRect()
        const cx    = e.clientX - rect.left
        const cy    = e.clientY - rect.top
        const os    = scale.get()
        const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY
        const ns    = Math.min(Math.max(os * Math.exp(-delta / 300), MIN_SCALE), MAX_SCALE)
        x.set(cx - (cx - x.get()) * (ns / os))
        y.set(cy - (cy - y.get()) * (ns / os))
        scale.set(ns)
      } else {
        const m = e.deltaMode === 1 ? 16 : 1
        x.set(x.get() - e.deltaX * m)
        y.set(y.get() - e.deltaY * m)
      }
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [x, y, scale])

  /* ── Touch pinch-to-zoom ─────────────────────────────────────────────────── */
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let ld = 0, lmx = 0, lmy = 0
    const onTS = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const [t1, t2] = [e.touches[0], e.touches[1]]
        ld = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY)
        lmx = (t1.clientX + t2.clientX) / 2
        lmy = (t1.clientY + t2.clientY) / 2
      }
    }
    const onTM = (e: TouchEvent) => {
      if (e.touches.length !== 2) return
      e.preventDefault()
      const [t1, t2] = [e.touches[0], e.touches[1]]
      const d  = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY)
      const mx = (t1.clientX + t2.clientX) / 2
      const my = (t1.clientY + t2.clientY) / 2
      const rect = el.getBoundingClientRect()
      const cx = mx - rect.left, cy = my - rect.top
      const os = scale.get()
      const ns = Math.min(Math.max(os * (d / ld), MIN_SCALE), MAX_SCALE)
      x.set(cx - (cx - x.get()) * (ns / os) + (mx - lmx))
      y.set(cy - (cy - y.get()) * (ns / os) + (my - lmy))
      scale.set(ns)
      ld = d; lmx = mx; lmy = my
    }
    el.addEventListener("touchstart", onTS, { passive: true })
    el.addEventListener("touchmove", onTM, { passive: false })
    return () => { el.removeEventListener("touchstart", onTS); el.removeEventListener("touchmove", onTM) }
  }, [x, y, scale])

  /* ── Render ──────────────────────────────────────────────────────────────── */
  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      style={{
        position: "relative", width: "100%", height: "100%",
        overflow: "hidden", touchAction: "none", userSelect: "none",
        cursor: isPanning ? "grabbing" : "grab",
        ...style,
      }}
    >
      {/* Transform origin 0 0 so world coords map directly to screen coords */}
      <motion.div
        style={{
          position: "absolute", top: 0, left: 0,
          width: 0, height: 0,
          transformOrigin: "0 0",
          willChange: "transform",
          x, y, scale,
        }}
      >
        {tiles.map(({ col, row, item }) => {
          const src   = item?.image?.src
          const alt   = item?.alt ?? item?.image?.alt ?? ""
          const bg    = tileColor(col, row)

          return (
            <div
              key={`${col},${row}`}
              onPointerDown={(e) => {
                tilePD.current = { x: e.clientX, y: e.clientY, col, row }
                e.stopPropagation()  // don't trigger container pan
              }}
              onPointerUp={(e) => {
                const info = tilePD.current
                if (info && info.col === col && info.row === row) {
                  const moved = Math.hypot(e.clientX - info.x, e.clientY - info.y)
                  if (moved < 6 && !didPan.current) onItemClick?.(item)
                }
                tilePD.current = null
              }}
              style={{
                position: "absolute",
                left: col * cellW,
                top:  row * cellH,
                width: imageWidth,
                height: imageHeight,
                overflow: "hidden",
                borderRadius: radius,
                backgroundColor: bg,
                cursor: isPanning ? "grabbing" : "pointer",
              }}
            >
              {src ? (
                <img
                  src={src}
                  alt={alt}
                  draggable={false}
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%",
                    objectFit: "cover", display: "block",
                    pointerEvents: "none", userSelect: "none",
                    zIndex: 1,
                  }}
                />
              ) : null}

              {/* Hover label overlay */}
              {(item.alt || item.label || item.category) && (
                <div className="grid-tile-overlay" style={{
                  position: "absolute", inset: 0, zIndex: 2,
                  background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 55%)",
                  display: "flex", flexDirection: "column",
                  justifyContent: "flex-end", padding: "12px",
                }}>
                  {item.category && (
                    <span style={{
                      fontSize: "9px", color: "#A855F7", letterSpacing: "0.15em",
                      textTransform: "uppercase", fontFamily: "JetBrains Mono, monospace",
                      marginBottom: "4px",
                    }}>
                      {item.category}
                    </span>
                  )}
                  <span style={{ fontSize: "11px", color: "#fff", fontWeight: 600, lineHeight: 1.3 }}>
                    {item.alt || item.label}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </motion.div>

      {/* Zoom badge */}
      <div style={{
        position: "absolute", bottom: "14px", right: "14px", zIndex: 30,
        fontFamily: "JetBrains Mono, monospace", fontSize: "10px",
        color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em",
        pointerEvents: "none", userSelect: "none",
        background: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(8px)",
        padding: "4px 10px", borderRadius: "100px",
        border: "1px solid rgba(255,255,255,0.06)",
      }}>
        {zoomPct}%
      </div>
    </div>
  )
}
