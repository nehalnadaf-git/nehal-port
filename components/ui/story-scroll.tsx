'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

// ─── Touch detection (synchronous, SSR-safe) ─────────────────────────────────
// Returns true on the server (safe default — no pin) and on touch devices.
function getIsTouchDevice(): boolean {
  if (typeof window === 'undefined') return true; // SSR → assume mobile
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  );
}

// ─── FlowSection ─────────────────────────────────────────────────────────────
export interface FlowSectionProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  'aria-label'?: string;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  className,
  style = {},
  children,
  'aria-label': ariaLabel,
}) => (
  <section
    data-flow-section
    aria-label={ariaLabel}
    className={cx('relative w-full', className)}
  >
    <div
      className="flow-art-container will-change-transform"
      style={{ transformOrigin: 'top center', ...style }}
    >
      {children}
    </div>
  </section>
);

// ─── FlowArt ─────────────────────────────────────────────────────────────────
// Desktop: each section (except the first) slides up from 100vh below,
//          and each section (except the last) pins while the next slides over it.
//
// Mobile / touch devices: ALL animations and pins are DISABLED.
//   The pin + slide is a desktop-only effect. On touch devices we render
//   every section in normal document flow so native iOS / Android scroll works.
//
// CRITICAL: Touch detection is done synchronously via getIsTouchDevice()
//   so the very first useGSAP call already knows whether to pin.
//   Using useState for this caused a race condition: the first render applied
//   the desktop pin, then the useEffect flipped the boolean → GSAP cleanup
//   failed on iOS → page stuck.

export interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

const childCount = (c: React.ReactNode) => React.Children.count(c);

const FlowArt: React.FC<FlowArtProps> = ({
  children,
  className,
  'aria-label': ariaLabel = 'Scroll transition',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Synchronous — no useState, no race condition.
  // useMemo ensures it's computed once during the first client render.
  const isTouch = useMemo(() => getIsTouchDevice(), []);

  // Detect reduced-motion preference (this one is fine as useEffect —
  // if it flips from false→true we just clear props, which is harmless).
  const reducedMotionRef = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mq.matches;
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const sections = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>('[data-flow-section]'),
      );
      if (sections.length === 0) return;

      const triggers: ScrollTrigger[] = [];

      // ── Touch / Mobile — no pin, no slide, normal document flow ────────
      if (isTouch || reducedMotionRef.current) {
        sections.forEach((s) => {
          const inner = s.querySelector<HTMLElement>('.flow-art-container');
          if (inner) {
            gsap.set(inner, { clearProps: 'all' });
          }
          gsap.set(s, { clearProps: 'zIndex' });
        });
        return () => {};
      }

      // ── Desktop — pin + slide-in ──────────────────────────────────────
      sections.forEach((section, i) => {
        gsap.set(section, { zIndex: i + 1 });

        const inner = section.querySelector<HTMLElement>('.flow-art-container');
        if (!inner) return;

        // Slide-in: every section except the first
        if (i > 0) {
          gsap.set(inner, { y: '100vh' });

          const tween = gsap.to(inner, {
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top top',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
        }

        // Pin: every section except the last
        if (i < sections.length - 1) {
          triggers.push(
            ScrollTrigger.create({
              trigger: section,
              start: 'bottom bottom',
              end: 'bottom top',
              pin: true,
              pinSpacing: false,
              invalidateOnRefresh: true,
            }),
          );
        }
      });

      const t1 = setTimeout(() => ScrollTrigger.refresh(), 200);
      const t2 = setTimeout(() => ScrollTrigger.refresh(), 800);
      document.fonts.ready.then(() => ScrollTrigger.refresh());

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        triggers.forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [childCount(children), isTouch] },
  );

  return (
    <div
      ref={containerRef}
      aria-label={ariaLabel}
      className={cx('w-full', className)}
    >
      {children}
    </div>
  );
};

export default FlowArt;
