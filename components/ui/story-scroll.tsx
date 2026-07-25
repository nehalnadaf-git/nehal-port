'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
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
// Each section (except the first) slides up from 100vh below.
// Each section (except the last) pins while the next one slides over it.

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
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const sections = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>('[data-flow-section]'),
      );
      if (sections.length === 0) return;

      const triggers: ScrollTrigger[] = [];

      if (reducedMotion) {
        sections.forEach((s) => {
          const inner = s.querySelector<HTMLElement>('.flow-art-container');
          if (inner) gsap.set(inner, { clearProps: 'transform' });
        });
        return () => {};
      }

      sections.forEach((section, i) => {
        // Later sections render on top of earlier ones
        gsap.set(section, { zIndex: i + 1 });

        const inner = section.querySelector<HTMLElement>('.flow-art-container');
        if (!inner) return;

        // ── Slide-in: every section except the first ─────────────────────
        if (i > 0) {
          gsap.set(inner, { y: '100vh' });

          const tween = gsap.to(inner, {
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',  // section enters viewport from below
              end: 'top top',       // section top reaches viewport top → fully in
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
        }

        // ── Pin: every section except the last ───────────────────────────
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
      // Also refresh after fonts are loaded — prevents misaligned triggers on slow connections
      document.fonts.ready.then(() => ScrollTrigger.refresh());

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        triggers.forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [childCount(children), reducedMotion] },
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
