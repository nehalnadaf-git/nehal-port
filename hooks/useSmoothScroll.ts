'use client';

import { useEffect, useRef } from 'react';

/**
 * useSmoothScroll — Lenis smooth scroll + GSAP ScrollTrigger integration.
 *
 * IMPORTANT: Lenis is DISABLED on touch / mobile devices (iOS, Android).
 *
 * Why: Lenis intercepts the scroll event that GSAP ScrollTrigger listens to.
 * On iOS, Lenis doesn't drive touch scrolling (smoothTouch is false by default),
 * so ScrollTrigger receives a lerped position that barely moves — causing any
 * GSAP pin to lock the page permanently. The fix is to let iOS use native scroll
 * and wire ScrollTrigger directly to the native scroll event instead.
 *
 * On desktop (mouse wheel), Lenis provides smooth inertia scrolling as before.
 */
export function useSmoothScroll() {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      ('ontouchstart' in window) ||
      navigator.maxTouchPoints > 0;

    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);

      if (isTouchDevice) {
        // ── Touch / Mobile path ───────────────────────────────────────────
        // Skip Lenis entirely. Native scroll works perfectly on iOS.
        // Wire ScrollTrigger to the native scroll event so that any GSAP
        // parallax / trigger effects still work correctly.
        const onScroll = () => ScrollTrigger.update();
        window.addEventListener('scroll', onScroll, { passive: true });

        // Disable GSAP's lag smoothing — not needed without Lenis
        gsap.ticker.lagSmoothing(0);

        // Refresh once DOM is fully painted and fonts are loaded
        setTimeout(() => ScrollTrigger.refresh(), 400);
        document.fonts.ready.then(() => ScrollTrigger.refresh());

        return () => {
          window.removeEventListener('scroll', onScroll);
        };
      }

      // ── Desktop path — Lenis smooth scroll ────────────────────────────
      const Lenis = (await import('lenis')).default;

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
      document.fonts.ready.then(() => ScrollTrigger.refresh());

      return () => {
        lenis.destroy();
        (window as any).__lenis = null;
      };
    };

    let cleanup: (() => void) | undefined;

    init().then((fn) => {
      cleanup = fn;
    });

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        (window as any).__lenis = null;
        lenisRef.current = null;
      }
      cleanup?.();
    };
  }, []);

  return lenisRef;
}
