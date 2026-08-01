'use client'

import { useRef, useCallback, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import PortfolioLightbox, { type LightboxItem } from '@/components/ui/PortfolioLightbox';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface VideoArcItem {
  src: string;
  poster?: string;
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
  // Vertical (9:16) cards — ensure minimum 16px side margin on narrowest phones
  if (vw < 480) {
    const w = Math.min(vw * 0.42, 160);
    return { w: Math.round(w), h: Math.round(w * 16 / 9) };
  }
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
  const hoveredCardIndexRef = useRef(-1);
  // Bidirectional visibility: pauses RAF when section scrolls off screen
  const isInViewRef = useRef(true);
  // Tracks last rendered active index — prevents 60 React re-renders/sec
  const prevActiveRef = useRef(-1);
  // Lightbox ref — avoids adding lightboxItem to animate deps (which restarts RAF on every open/close)
  const lightboxItemRef = useRef<LightboxItem | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [vw, setVw] = useState(1200);
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // iOS Fix: autoPlay attribute is ignored when src is already present at mount.
  // Explicitly call play() on all videos once the carousel enters the viewport.
  useEffect(() => {
    if (!isVisible) return;
    videosRef.current.forEach(v => {
      if (v && v.paused) {
        v.play().catch(() => { /* autoplay blocked by browser policy — poster shown as fallback */ });
      }
    });
  }, [isVisible]);

  // ── Pause background videos while the lightbox is open ─────────────────────
  // PortfolioLightbox dispatches 'portfolio:lightbox-open' when any project
  // or video card is tapped. We pause all background carousel videos immediately
  // so the GPU focuses entirely on the lightbox video decoder. On close, we
  // resume only the videos that are currently inside the viewport.
  useEffect(() => {
    const handleOpen = () => {
      videosRef.current.forEach(v => { if (v) v.pause(); });
    };
    const handleClose = () => {
      videosRef.current.forEach(v => {
        if (!v) return;
        const rect = v.getBoundingClientRect();
        const inView =
          rect.bottom > 0 &&
          rect.right > 0 &&
          rect.top < window.innerHeight &&
          rect.left < window.innerWidth;
        if (inView) v.play().catch(() => {});
      });
    };

    document.addEventListener('portfolio:lightbox-open', handleOpen);
    document.addEventListener('portfolio:lightbox-close', handleClose);
    return () => {
      document.removeEventListener('portfolio:lightbox-open', handleOpen);
      document.removeEventListener('portfolio:lightbox-close', handleClose);
    };
  }, []);

  // Sync lightbox ref so animate loop doesn't need it as a dep
  useEffect(() => {
    lightboxItemRef.current = lightboxItem;
  }, [lightboxItem]);

  const totalCards = items.length;
  const cardSize = getCardSize(vw);
  const angleStepDeg = vw < 768 ? 22 : 16;
  const spacingRatio = vw < 768 ? 0.60 : 0.52;
  const arcRadius = (cardSize.w * spacingRatio) / Math.sin(angleStepDeg * DEG);

  // ─── Position each card on the arc ─────────────────────────────────────────

  const updateCards = useCallback(() => {
    const offset = offsetRef.current;
    const centerX = vw / 2;
    // Top breathing room — mirrors ArcCarousel
    const topPad = vw < 768 ? 20 : 40;

    cardsRef.current.forEach((el, i) => {
      if (!el) return;

      const item = items[i];
      // Use aspectRatio field consistently — no title-matching hacks
      const isHorizontal = item?.aspectRatio === 'horizontal';
      const w = isHorizontal ? Math.round(cardSize.h * 1.1) : cardSize.w;
      const h = isHorizontal ? Math.round(cardSize.w * 0.72) : cardSize.h;

      // Wrap index offset so each card picks the shortest path to center
      let indexOffset = i - (offset % totalCards);
      indexOffset = ((indexOffset % totalCards) + totalCards) % totalCards;
      if (indexOffset > totalCards / 2) indexOffset -= totalCards;

      const angleDeg = indexOffset * angleStepDeg;
      const angleRad = angleDeg * DEG;

      const x = arcRadius * Math.sin(angleRad);
      const y = topPad + arcRadius * (1 - Math.cos(angleRad));
      const rotateZ = angleDeg;

      const distFromCenter = Math.abs(indexOffset);
      const scale = clamp(1 - distFromCenter * 0.05, 0.65, 1);

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
    // Only trigger React re-render when active card actually changes (eliminates 60fps re-renders)
    if (active !== prevActiveRef.current) {
      prevActiveRef.current = active;
      setActiveIndex(active);
    }
  }, [vw, arcRadius, angleStepDeg, cardSize.w, cardSize.h, totalCards, items]);

  // ─── RAF animation loop ────────────────────────────────────────────────────

  const animate = useCallback(() => {
    // Pause RAF loop when section is off-screen — saves CPU on mobile & desktop
    if (!isInViewRef.current) {
      rafId.current = null;
      return;
    }
    // If lightbox is open, keep loop ticking but skip position updates
    // Using a ref instead of state avoids adding lightboxItem to deps (which would restart RAF on every open/close)
    if (lightboxItemRef.current) {
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
  }, [updateCards, driftSpeed, totalCards]);
  // Note: lightboxItem intentionally excluded — we use lightboxItemRef to avoid RAF restart

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
      const lb: LightboxItem = {
        src: src.src,
        title: src.title,
        category: src.label,
        aspectRatio: src.aspectRatio ?? 'vertical',
      };
      lightboxItemRef.current = lb;
      setLightboxItem(lb);
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

  // ─── Close lightbox ─────────────────────────────────────────────────────────

  const closeLightbox = useCallback(() => {
    lightboxItemRef.current = null;
    setLightboxItem(null);
  }, []);

  // ─── Lifecycle ─────────────────────────────────────────────────────────────

  useEffect(() => {
    setVw(window.innerWidth);
    rafId.current = requestAnimationFrame(animate);
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    // orientationchange fires on mobile before resize — re-evaluate vw immediately
    window.addEventListener('orientationchange', onResize);

    // ─── IntersectionObserver: only load video data when carousel is near viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        // One-shot lazy-load: only goes true, triggers video preload
        if (entry.isIntersecting) setIsVisible(true);
        // Bidirectional: pause RAF when scrolled away, resume when back in view
        isInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting && rafId.current === null) {
          rafId.current = requestAnimationFrame(animate);
        }
      },
      { rootMargin: '200px' }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      if (snapTimer.current) clearTimeout(snapTimer.current);
      observer.disconnect();
    };
  }, [animate]);

  useEffect(() => { updateCards(); }, [updateCards]);

  // ─── Render ────────────────────────────────────────────────────────────────

  // Proper viewport height: top breathing room + tallest card + arc drop for max visible offset + bottom pad.
  // max visible = floor(totalCards/2); cards beyond that are intentionally clipped by the bottom gradient.
  const topPad = vw < 768 ? 20 : 40;
  const bottomPad = vw < 768 ? 24 : 40;
  const maxOffset = Math.floor(totalCards / 2);
  const maxAngleRad = maxOffset * angleStepDeg * DEG;
  const maxDrop = arcRadius * (1 - Math.cos(maxAngleRad));
  const viewportH = topPad + cardSize.h + maxDrop + bottomPad;

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
            height: `${viewportH}px`,
            overflow: 'hidden',
            userSelect: 'none',
            // Ensure browser allows horizontal drag without fighting vertical scroll
            touchAction: 'pan-y',
          }}
        >
          {items.map((item, i) => {
            const isActive = i === activeIndex;
            // Use aspectRatio field consistently — no title-matching hacks
            const isHorizontal = item.aspectRatio === 'horizontal';
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
                onPointerCancel={(e) => {
                  isDragging.current = false;
                  // Release capture so iOS doesn't lock further pointer events
                  try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch { /* ignore */ }
                }}
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
                  willChange: 'transform',
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
                  poster={item.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload={isVisible ? 'metadata' : 'none'}
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

          {/* Bottom gradient overlay — fades out partially-visible arc cards */}
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: -2, height: '120px',
            background: 'linear-gradient(to top, var(--background) 40%, transparent 100%)',
            pointerEvents: 'none', zIndex: 100,
          }} />
        </div>

        {/* Sleek minimal thin line pagination */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '16px 0 8px' }}>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goToCard(i)}
              aria-label={`Go to video ${i + 1}`}
              style={{
                // 44×44 min tap target (WCAG 2.5.5 / Apple HIG)
                minWidth: '44px',
                minHeight: '44px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
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
        <p
          className="arc-swipe-hint"
          aria-hidden="true"
          style={{
            textAlign: 'center',
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: 'var(--muted-foreground)',
            fontFamily: "'JetBrains Mono', monospace",
            opacity: 0.55,
            paddingBottom: '8px',
            marginTop: '-4px',
          }}
        >
          ← swipe to explore →
        </p>
      </div>

      {/* ─── Lightbox ──────────────────────────────────────────────────────── */}
      <PortfolioLightbox
        item={lightboxItem}
        onClose={closeLightbox}
        mounted={mounted}
      />
    </>
  );
}
