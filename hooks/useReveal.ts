'use client'

/**
 * useReveal — Premium IntersectionObserver-based reveal hook.
 *
 * WHY IntersectionObserver over GSAP scroll events for reveals:
 * – Runs off the main thread, never blocks paint
 * – 100% reliable on iOS Safari (no scroll event quirks)
 * – Respects prefers-reduced-motion via CSS automatically
 * – Zero overhead between trigger points
 *
 * Usage:
 *   const ref = useReveal<HTMLDivElement>();
 *   <div ref={ref} className="rv-up">...</div>
 *
 *   const listRef = useRevealChildren<HTMLUListElement>('.item');
 *   <ul ref={listRef}><li className="rv-up item">...</li></ul>
 */

import { useEffect, useRef, RefObject } from 'react';

export interface RevealOptions {
  /** How much of the element must be visible. Default 0.12 */
  threshold?: number;
  /** CSS rootMargin — negative bottom pushes trigger up. Default '-60px' */
  rootMargin?: string;
  /** Fire once and stop observing. Default true */
  once?: boolean;
}

export interface RevealChildrenOptions extends RevealOptions {
  /** Ms between each child's animation start. Default 80 */
  staggerMs?: number;
}

/** Reveal a single element by adding 'rv-visible' when it enters viewport. */
export function useReveal<T extends HTMLElement>(
  options: RevealOptions = {}
): RefObject<T | null> {
  const { threshold = 0.12, rootMargin = '0px 0px -60px 0px', once = true } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('rv-visible');
            if (once) observer.unobserve(el);
          } else if (!once) {
            el.classList.remove('rv-visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}

/**
 * Reveal children of a container with a CSS stagger.
 * Children must have the given selector AND the appropriate rv-* class.
 */
export function useRevealChildren<T extends HTMLElement>(
  childSelector: string,
  options: RevealChildrenOptions = {}
): RefObject<T | null> {
  const {
    threshold = 0.08,
    rootMargin = '0px 0px -40px 0px',
    once = true,
    staggerMs = 80,
  } = options;

  const ref = useRef<T | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = Array.from(
      container.querySelectorAll<HTMLElement>(childSelector)
    );

    // Apply stagger via CSS custom property
    children.forEach((child, i) => {
      child.style.setProperty('--rv-delay', `${i * staggerMs}ms`);
    });

    const observers: IntersectionObserver[] = [];

    children.forEach((child) => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Use the var(--rv-delay) set above via CSS transition-delay
              child.style.transitionDelay = child.style.getPropertyValue('--rv-delay');
              child.classList.add('rv-visible');
              if (once) obs.unobserve(child);
            } else if (!once) {
              child.style.transitionDelay = '0ms';
              child.classList.remove('rv-visible');
            }
          });
        },
        { threshold, rootMargin }
      );
      obs.observe(child);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [childSelector, threshold, rootMargin, once, staggerMs]);

  return ref;
}
