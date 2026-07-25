'use client';

import { useEffect, useRef } from 'react';

export function useSmoothScroll() {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Dynamic imports keep Lenis + GSAP browser-only, no SSR crash
    const init = async () => {
      const Lenis = (await import('lenis')).default;
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        // lerp 0.12 → fast enough that GSAP pin triggers fire at the correct
        // visual position. 0.08 was too slow: pins appeared to "jump" because
        // the native scroll position outran the visual position during scrub.
        lerp: 0.12,
        smoothWheel: true,
        // Prevent iOS rubber-band bounce from corrupting pin math
        overscroll: false,
      });

      lenisRef.current = lenis;
      // Expose globally so any component can hook into Lenis scroll events
      (window as any).__lenis = lenis;

      // Correct Lenis v1 + GSAP ScrollTrigger integration:
      // ScrollTrigger.update is called on every Lenis tick (lerped position),
      // so all trigger points are evaluated against the smooth scroll value,
      // not the raw native scroll position.
      lenis.on('scroll', ScrollTrigger.update);

      // Drive Lenis from GSAP's ticker so they share the same rAF loop
      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });

      // Disable GSAP's lag smoothing — Lenis handles frame timing itself
      gsap.ticker.lagSmoothing(0);

      // After Lenis is running and first paint is complete, recalculate all
      // ScrollTrigger positions. Images/fonts can shift layout after init.
      setTimeout(() => ScrollTrigger.refresh(), 300);
    };

    init();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        (window as any).__lenis = null;
      }
    };
  }, []);

  return lenisRef;
}
