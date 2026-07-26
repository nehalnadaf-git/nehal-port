'use client'

import { useRef, useCallback, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import PortfolioLightbox, { type LightboxItem } from '@/components/ui/PortfolioLightbox';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface VideoArcItem {
  src: string;
  title: string;
  label?: string;
  aspectRatio?: 'vertical' | 'horizontal';
}

interface VideoArcCarouselProps {
  items: VideoArcItem[];
  /** Continuous drift speed in index-units per frame (default 0.003) */
  driftSpeed?: number;
  className?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const DEG = Math.PI / 180;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function getCardSize(vw: number): { w: number; h: number } {
  if (vw < 480) return { w: 160, h: 284 };
  if (vw < 768) return { w: 200, h: 356 };
  if (vw < 1200) return { w: 240, h: 427 };
  return { w: 280, h: 498 };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function VideoArcCarousel({
  items,
  driftSpeed = 0.003,
  className = '',
}: VideoArcCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const videosRef = useRef<(HTMLVideoElement | null)[]>([]);
  const offsetRef = useRef(0);
  const targetRef = useRef(0);
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const isDrifting = useRef(true);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const velocityRef = useRef(0);
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const rafId = useRef<number | null>(null);
  const snapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerMovedRef = useRef(false);
  // Tracks which card index is currently hovered (for pop effect)
  const hoveredCardIndexRef = useRef(-1);

  const [activeIndex, setActiveIndex] = useState(0);
  const [vw, setVw] = useState(1200);
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ─── Imperatively play active video, pause others ───────────────────────────
  useEffect(() => {
    videosRef.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === activeIndex) {
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  }, [activeIndex]);

  const totalCards = items.length;
  const cardSize = getCardSize(vw);
  const angleStepDeg = vw < 768 ? 22 : 16;
  const spacingRatio = vw < 768 ? 0.60 : 0.52;
  const arcRadius = (cardSize.w * spacingRatio) / Math.sin(angleStepDeg * DEG);

  // ─── Position each card on the arc ─────────────────────────────────────────

  const updateCards = useCallback(() => {
    const offset = offsetRef.current;
    const centerX = vw / 2;

    cardsRef.current.forEach((el, i) => {
      if (!el) return;

      const item = items[i];
      const isHorizontal = item?.aspectRatio === 'horizontal' || item?.title === 'Al Moon Academy' || item?.title === 'Empire Commercial';
      const w = isHorizontal ? Math.round(cardSize.h * 1.1) : cardSize.w;
      const h = isHorizontal ? Math.round(cardSize.w * 0.72) : cardSize.h;

      // Wrap index offset so each card picks the shortest path to center
      let indexOffset = i - (offset % totalCards);
      indexOffset = ((indexOffset % totalCards) + totalCards) % totalCards;
      if (indexOffset > totalCards / 2) indexOffset -= totalCards;

      const angleDeg = indexOffset * angleStepDeg;
      const angleRad = angleDeg * DEG;

      const x = arcRadius * Math.sin(angleRad);
      const y = arcRadius * (1 - Math.cos(angleRad));
      const rotateZ = angleDeg;

      const distFromCenter = Math.abs(indexOffset);
      const scale = clamp(1 - distFromCenter * 0.05, 0.65, 1);

      const opacity = 1;
      const zIndex = Math.round((totalCards - distFromCenter) * 10);

      el.style.transform = `translate3d(${centerX + x - w / 2}px, ${y}px, 0) rotate(${rotateZ}deg) scale(${scale})`;
      el.style.opacity = '1';
      el.style.zIndex = `${zIndex}`;
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;

      // Update shadow and border on the card element directly
      const isActive = distFromCenter < 0.5;
      el.style.borderRadius = '0px';
      el.style.border = '3px solid #000000';
      el.style.backgroundColor = '#000000';
      if (isActive) {
        el.style.boxShadow = '8px 8px 0px #000000';
      } else {
        el.style.boxShadow = '4px 4px 0px #000000';
      }
    });

    const raw = Math.round(offset) % totalCards;
    const active = ((raw % totalCards) + totalCards) % totalCards;
    setActiveIndex(active);
  }, [vw, arcRadius, angleStepDeg, cardSize.w, totalCards]);

  // ─── RAF animation loop ────────────────────────────────────────────────────

  const animate = useCallback(() => {
    // If lightbox is open, we can stop the background motion to preserve performance
    if (lightboxItem) {
      rafId.current = requestAnimationFrame(animate);
      return;
    }

    if (isDragging.current) {
      offsetRef.current += (targetRef.current - offsetRef.current) * 0.18;
    } else if (isDrifting.current) {
      // Slow to 25% speed when hovered — never fully stops
      const activeDrift = isHovered.current ? driftSpeed * 0.25 : driftSpeed;
      targetRef.current += activeDrift;
      offsetRef.current += (targetRef.current - offsetRef.current) * 0.06;
    } else {
      if (Math.abs(velocityRef.current) > 0.0005) {
        targetRef.current += velocityRef.current;
        velocityRef.current *= 0.90;
      }
      offsetRef.current += (targetRef.current - offsetRef.current) * 0.10;
    }

    // Infinite wrapping
    if (offsetRef.current >= totalCards) {
      offsetRef.current -= totalCards;
      targetRef.current -= totalCards;
    } else if (offsetRef.current < 0) {
      offsetRef.current += totalCards;
      targetRef.current += totalCards;
    }

    updateCards();
    rafId.current = requestAnimationFrame(animate);
  }, [updateCards, driftSpeed, totalCards, lightboxItem]);

  // ─── Pointer handlers ──────────────────────────────────────────────────────

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    isDrifting.current = false;
    velocityRef.current = 0;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetRef.current;
    lastPointerX.current = e.clientX;
    lastPointerTime.current = Date.now();
    pointerMovedRef.current = false;
    if (snapTimer.current) clearTimeout(snapTimer.current);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 12) pointerMovedRef.current = true;
    const sensitivity = vw < 768 ? 120 : 180;
    targetRef.current = dragStartOffset.current - dx / sensitivity;

    const now = Date.now();
    if (now - lastPointerTime.current > 0) {
      velocityRef.current = -(e.clientX - lastPointerX.current) / sensitivity;
    }
    lastPointerX.current = e.clientX;
    lastPointerTime.current = now;
  }, [vw]);

  const onPointerUp = useCallback((index: number) => {
    isDragging.current = false;
    velocityRef.current = clamp(velocityRef.current, -0.6, 0.6);

    if (!pointerMovedRef.current) {
      // Tap on any card → open lightbox & bring card to center
      const src = items[index];
      setLightboxItem({
        src: src.src,
        title: src.title,
        category: src.label,
        aspectRatio: src.aspectRatio ?? 'vertical',
      });
      isDrifting.current = false;
      if (snapTimer.current) clearTimeout(snapTimer.current);
      const currentPos = offsetRef.current;
      const diff1 = index - currentPos;
      const diff2 = (index + totalCards) - currentPos;
      const diff3 = (index - totalCards) - currentPos;
      const minDiff = [diff1, diff2, diff3].reduce((prev, curr) =>
        Math.abs(curr) < Math.abs(prev) ? curr : prev
      );
      targetRef.current = currentPos + minDiff;
    }

    if (snapTimer.current) clearTimeout(snapTimer.current);
    snapTimer.current = setTimeout(() => {
      if (!isDragging.current && !isHovered.current) {
        targetRef.current = offsetRef.current;
        isDrifting.current = true;
      }
    }, 1500);
  }, [items, totalCards]);

  const onCardMouseEnter = useCallback((index: number) => {
    isHovered.current = true;
    hoveredCardIndexRef.current = index;
    // Cancel any pending resume timer — drift just slows, never stops on hover
    if (snapTimer.current) clearTimeout(snapTimer.current);
  }, []);

  const onCardMouseLeave = useCallback(() => {
    isHovered.current = false;
    hoveredCardIndexRef.current = -1;
    // If drift was paused (e.g. after drag), restart it after a short delay
    if (!isDragging.current && !isDrifting.current) {
      if (snapTimer.current) clearTimeout(snapTimer.current);
      snapTimer.current = setTimeout(() => {
        targetRef.current = offsetRef.current;
        isDrifting.current = true;
      }, 600);
    }
  }, []);

  // ─── Dot click ─────────────────────────────────────────────────────────────

  const goToCard = useCallback((index: number) => {
    isDrifting.current = false;
    if (snapTimer.current) clearTimeout(snapTimer.current);

    const currentPos = offsetRef.current;
    const diff1 = index - currentPos;
    const diff2 = (index + totalCards) - currentPos;
    const diff3 = (index - totalCards) - currentPos;

    const minDiff = [diff1, diff2, diff3].reduce((prev, curr) =>
      Math.abs(curr) < Math.abs(prev) ? curr : prev
    );

    targetRef.current = currentPos + minDiff;

    snapTimer.current = setTimeout(() => {
      if (!isDragging.current && !isHovered.current) {
        targetRef.current = offsetRef.current;
        isDrifting.current = true;
      }
    }, 2000);
  }, [totalCards]);

  // ─── Escape key handled by PortfolioLightbox ───────────────────────────────

  // ─── Lifecycle ─────────────────────────────────────────────────────────────

  useEffect(() => {
    setVw(window.innerWidth);
    rafId.current = requestAnimationFrame(animate);
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('resize', onResize);
      if (snapTimer.current) clearTimeout(snapTimer.current);
    };
  }, [animate]);

  useEffect(() => { updateCards(); }, [updateCards]);

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <div
        className={`video-arc-carousel-wrapper ${className}`}
        style={{ overflow: 'hidden', position: 'relative' }}
      >
        {/* Carousel viewport */}
        <div
          ref={containerRef}
          className="video-arc-carousel-viewport"
          style={{
            position: 'relative',
            width: '100%',
            height: `${cardSize.h + arcRadius * 0.38 + (vw < 768 ? 24 : 60)}px`,
            overflow: 'hidden',
            userSelect: 'none',
          }}
        >
          {items.map((item, i) => {
            const isActive = i === activeIndex;
            const isHorizontal = item.title === 'Al Moon Academy';
            const w = isHorizontal ? cardSize.h : cardSize.w;
            const h = isHorizontal ? cardSize.w : cardSize.h;
            return (
              <div
                key={`${item.src}-${i}`}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="video-arc-card"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={() => onPointerUp(i)}
                onPointerCancel={() => { isDragging.current = false; }}
                onMouseEnter={() => onCardMouseEnter(i)}
                onMouseLeave={onCardMouseLeave}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: `${w}px`,
                  height: `${h}px`,
                  borderRadius: '0px',
                  overflow: 'hidden',
                  willChange: 'transform, opacity',
                  transformOrigin: 'center bottom',
                  border: '3px solid #000000',
                  boxShadow: isActive
                    ? '8px 8px 0px #000000'
                    : '4px 4px 0px #000000',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  isolation: 'isolate',
                  background: '#000000',
                  transition: 'box-shadow 0.35s ease',
                  cursor: isActive ? 'pointer' : 'grab',
                  touchAction: 'pan-y',
                }}
              >
                <video
                  ref={(el) => { videosRef.current[i] = el; }}
                  key={item.src}
                  src={item.src}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: 'block',
                    pointerEvents: 'none',
                    objectFit: 'cover',
                    background: '#000000',
                    borderRadius: '0px',
                  }}
                />

                {/* Overlay for non-active cards or click hint on center card */}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    background: '#000000',
                    border: '1.5px solid #FFFFFF',
                    borderRadius: '0px',
                    padding: '4px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    pointerEvents: 'none',
                    zIndex: 2,
                    boxShadow: '2px 2px 0px #FFFFFF',
                  }}>
                    <span style={{ fontSize: '11px', color: '#fff', fontWeight: 700, letterSpacing: '0.08em', fontFamily: "'JetBrains Mono', monospace" }}>EXPAND</span>
                    <ArrowUpRight size={12} color="#fff" />
                  </div>
                )}

                {!isActive && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '12px 14px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
                    pointerEvents: 'none',
                  }}>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em' }}>
                      {item.label || item.title}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sleek minimal thin line pagination */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '16px 0 8px' }}>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goToCard(i)}
              aria-label={`Go to video ${i + 1}`}
              style={{
                minWidth: '28px',
                minHeight: '28px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <span style={{
                display: 'block',
                width: i === activeIndex ? '32px' : '16px',
                height: '2px',
                borderRadius: '1px',
                background: i === activeIndex ? '#A855F7' : 'rgba(0,0,0,0.2)',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: 'none',
              }} />
            </button>
          ))}
        </div>

        {/* Active label */}
        <div style={{ textAlign: 'center', paddingBottom: '20px', paddingTop: '4px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', padding: '4px 16px' }}>
            <span
              style={{
                fontSize: 'clamp(12px, 1.4vw, 14px)',
                fontWeight: 800,
                color: '#A855F7',
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.08em',
              }}
            >
              {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <span style={{ opacity: 0.3, color: 'var(--foreground)' }}>•</span>
            <span
              style={{
                fontSize: 'clamp(14px, 1.8vw, 18px)',
                fontWeight: 800,
                color: 'var(--foreground)',
                letterSpacing: '0.02em',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {items[activeIndex]?.title || ''}
            </span>
          </div>
        </div>

        {/* Mobile swipe hint */}
        <p className="arc-swipe-hint" style={{
          textAlign: 'center',
          fontSize: '10px',
          letterSpacing: '0.12em',
          color: 'var(--muted-foreground)',
          fontFamily: "'JetBrains Mono', monospace",
          opacity: 0.55,
          paddingBottom: '8px',
          marginTop: '-4px',
        }}>
          ← swipe to explore →
        </p>
      </div>

      {/* ─── Lightbox ──────────────────────────────────────────────────────── */}
      <PortfolioLightbox
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
        mounted={mounted}
      />
    </>
  );
}
