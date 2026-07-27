'use client'

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin, Globe, Diamond } from 'lucide-react';
import { MorphingText } from '@/components/ui/morphing-text';
import { useReveal } from '@/hooks/useReveal';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const morphRef     = useRef<HTMLDivElement>(null);
  const imageRef     = useRef<HTMLDivElement>(null);
  const infoRef      = useReveal<HTMLDivElement>({ threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
    });

    // Morph text container — scale from slight zoom (cinematic feel)
    tl.fromTo(
      '.hero-retro-btn',
      { scale: 1.06, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.4, ease: 'power3.out' }
    );

    // Hero image — clip-path reveal from bottom (curtain up)
    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.6,
          ease: 'power3.inOut',
        },
        '-=0.8'
      );
    }

    // Parallax — desktop only; mobile uses native scroll momentum, skip expensive scrub
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) {
      // Subtle parallax on the background morph text while scrolling
      if (morphRef.current) {
        gsap.to(morphRef.current, {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });
      }

      // Slight parallax on hero image — moves slower than scroll (depth)
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.8,
            invalidateOnRefresh: true,
          },
        });
      }
    }
  }, { scope: containerRef });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center pt-24 pb-16 relative overflow-hidden"
    >
      {/*
        Visually-hidden H1 — required for SEO (one H1 per page rule).
        The morphing "Nehal / Nadaf" text below is a <div> for animation purposes.
        This hidden H1 gives Googlebot the semantic heading it expects on the homepage
        without affecting the visual design.
      */}
      <h1 className="sr-only">
        Nehal Nadaf — Freelance Web Developer, UI/UX Designer &amp; Video Editor in Hubli, Karnataka
      </h1>

      {/* Centered Stacking Wrapper */}
      <div className="relative flex items-center justify-center w-full my-auto select-none">

        {/* Text Morph Title — behind the photo, peeks around on all sides */}
        <div
          ref={morphRef}
          className="hero-retro-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none select-none w-full max-w-full px-2"
          style={{
            height: 'clamp(60px, 20vw, 280px)',
          }}
        >
          <MorphingText
            texts={["Nehal", "Nadaf"]}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(42px, 20vw, 260px)",
              height: "clamp(60px, 20vw, 260px)",
              letterSpacing: "-0.05em",
              color: "#000",
            }}
          />
        </div>

        {/* Hero Image — clips up from bottom */}
        <div
          ref={imageRef}
          className="w-[85vw] max-w-[480px] aspect-[4/5] rounded-2xl overflow-hidden relative z-10 shadow-2xl pointer-events-none"
          style={{ clipPath: 'inset(0% 0 0 0)' }}
        >
          <img
            src="/images/Nehal.webp"
            alt="Nehal Nadaf — Web Developer, UI/UX Designer & Video Editor"
            className="w-full h-full object-cover object-top"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
        </div>
      </div>

      {/* Info Strip — IntersectionObserver fade-in (more reliable than scroll-relative) */}
      <div
        ref={infoRef}
        className="rv-up grid grid-cols-3 gap-3 sm:gap-6 md:gap-16 mt-8 md:mt-16 text-center relative z-20 px-4 w-full max-w-2xl mx-auto"
        style={{ '--rv-delay': '200ms' } as React.CSSProperties}
      >
        <div className="info-item flex flex-col items-center gap-2">
          <MapPin size={12} style={{ color: 'var(--muted-foreground)' }} />
          <span className="text-[10px] sm:text-xs tracking-wider leading-snug" style={{ color: 'var(--muted-foreground)' }}>
            Based in Hubli,<br />Karnataka
          </span>
        </div>
        <div className="info-item flex flex-col items-center gap-2">
          <Globe size={12} style={{ color: 'var(--muted-foreground)' }} />
          <span className="text-[10px] sm:text-xs tracking-wider leading-snug" style={{ color: 'var(--muted-foreground)' }}>
            Available All Around<br />Worldwide
          </span>
        </div>
        <div className="info-item flex flex-col items-center gap-2">
          <Diamond size={12} style={{ color: 'var(--muted-foreground)' }} />
          <span className="text-[10px] sm:text-xs tracking-wider leading-snug" style={{ color: 'var(--muted-foreground)' }}>
            Web Dev • UI/UX<br />Video + Social
          </span>
        </div>
      </div>
    </section>
  );
}
