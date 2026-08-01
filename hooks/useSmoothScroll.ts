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
    // Synchronous detection — must happen before any GSAP/Lenis init
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      ('ontouchstart' in window) ||
      navigator.maxTouchPoints > 0;

    // Track the cleanup returned from the async init()
    let scrollCleanup: (() => void) | undefined;

    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);

      if (isTouchDevice) {
        // ── Touch / Mobile path ───────────────────────────────────────────
        // Skip Lenis entirely. Do NOT even import it — Lenis's CSS side
        // effects can add classes to <html> that interact badly with the
        // .lenis-stopped { overflow: hidden } rule in globals.css.
        //
        // Explicitly remove any Lenis classes that might have leaked from
        // the CSS file (the CSS rules reference them, no JS needed to add).
        document.documentElement.classList.remove(
          'lenis', 'lenis-smooth', 'lenis-stopped', 'lenis-scrolling'
        );

        // Disable GSAP's lag smoothing
        gsap.ticker.lagSmoothing(0);

        // Refresh once DOM is painted and fonts are loaded
        setTimeout(() => ScrollTrigger.refresh(), 400);
        document.fonts.ready.then(() => ScrollTrigger.refresh());

        scrollCleanup = () => {};
        return;
      }

      // ── Desktop path — Lenis smooth scroll ────────────────────────────
      const Lenis = (await import('lenis')).default;

      const lenis = new Lenis({
        lerp: 0.10,           // was 0.12 — slightly more responsive scroll feel
        smoothWheel: true,
        syncTouch: false,     // never intercept native touch momentum
        overscroll: false,
      });

      lenisRef.current = lenis;
      (window as any).__lenis = lenis;

      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      setTimeout(() => ScrollTrigger.refresh(), 300);
      document.fonts.ready.then(() => ScrollTrigger.refresh());

      scrollCleanup = () => {
        lenis.destroy();
        (window as any).__lenis = null;
      };
    };

    init();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        (window as any).__lenis = null;
        lenisRef.current = null;
      }
      scrollCleanup?.();
    };
  }, []);

  return lenisRef;
}
