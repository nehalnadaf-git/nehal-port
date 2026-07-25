'use client'

import { MapPin, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { MagicText } from '@/components/ui/magic-text';
import { MorphingText } from '@/components/ui/morphing-text';
import { useReveal, useRevealChildren } from '@/hooks/useReveal';

export default function Footer() {
  const lineRef    = useReveal<HTMLDivElement>({ threshold: 0.3, rootMargin: '0px 0px -20px 0px' });
  const topRowRef  = useReveal<HTMLDivElement>({ threshold: 0.15, rootMargin: '0px 0px -20px 0px' });
  const linksRef   = useRevealChildren<HTMLDivElement>('.footer-link', {
    staggerMs: 80,
    threshold: 0.2,
    rootMargin: '0px 0px -20px 0px',
  });
  const morphRef   = useReveal<HTMLDivElement>({ threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
  const bottomRef  = useReveal<HTMLDivElement>({ threshold: 0.2, rootMargin: '0px 0px -20px 0px' });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="container-padding pt-24 pb-8">
      {/* Top border line — clip-path sweep */}
      <div
        ref={lineRef}
        className="rv-clip"
        style={{ height: '1px', background: 'var(--border)', marginBottom: '0' }}
      />

      {/* Top Row */}
      <div
        ref={topRowRef}
        className="rv-up flex flex-col sm:flex-row items-start sm:justify-between gap-4 mb-12 md:mb-16 pt-8"
      >
        <div className="flex items-center gap-2 text-foreground">
          <MapPin size={12} className="opacity-50" />
          <span className="type-label opacity-60">Based in Hubli,<br />Karnataka</span>
        </div>
        <div className="type-label text-foreground opacity-60 sm:text-right">
          Web Dev + UI/UX<br />Video Production
        </div>
      </div>

      {/* Middle Row — MagicText scroll reveal (self-animating) */}
      <MagicText
        text="Based in Hubli, Karnataka — I engineer high-performance websites, craft immersive UI/UX experiences, and produce cinematic video content. Every project is built with precision, purpose, and a commitment to digital excellence."
        wrapperClassName="justify-center text-center font-bold tracking-wide max-w-2xl mx-auto"
        fontSize="clamp(13px, 1.2vw, 16px)"
        ghostOpacity={0.18}
        offsetStart="start 0.95"
        offsetEnd="start 0.5"
      />

      {/* Social Links — staggered reveal */}
      <div ref={linksRef} className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-8">
        <Link
          href="/projects"
          className="footer-link rv-up type-label text-foreground flex items-center gap-1 hover:underline"
          style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
        >
          Website Projects <ArrowUpRight size={12} />
        </Link>
        <Link
          href="/videos"
          className="footer-link rv-up type-label text-foreground flex items-center gap-1 hover:underline"
          style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
        >
          Video Projects <ArrowUpRight size={12} />
        </Link>
        <Link
          href="/influencers"
          className="footer-link rv-up type-label text-foreground flex items-center gap-1 hover:underline"
          style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
        >
          Influencer Collabs <ArrowUpRight size={12} />
        </Link>
        <a
          href="https://linkedin.com/in/nehal-nadaf-473800414"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link rv-up type-label text-foreground flex items-center gap-1 hover:underline"
          style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
        >
          LinkedIn <ArrowUpRight size={12} />
        </a>
        <a
          href="https://instagram.com/nehalnadaxf"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link rv-up type-label text-foreground flex items-center gap-1 hover:underline"
          style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
        >
          Instagram <ArrowUpRight size={12} />
        </a>
      </div>

      {/* Large TextMorph — rv-up then self-animating */}
      <div
        ref={morphRef}
        className="rv-scale relative flex items-center justify-center w-full mt-12 md:mt-16 py-8"
        style={{ minHeight: '280px' }}
      >
        <MorphingText
          texts={["Nehal", "Nadaf"]}
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(70px, 18vw, 240px)",
            height: "clamp(70px, 18vw, 240px)",
            letterSpacing: "-0.05em",
            color: "#000",
          }}
        />
      </div>

      {/* Bottom Row */}
      <div
        ref={bottomRef}
        className="rv-up flex flex-col sm:flex-row items-center sm:justify-between gap-3 mt-8 pt-8"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <span className="type-mono text-foreground text-center sm:text-left opacity-40">
          &copy;2026 Nehal Nadaf. All rights reserved.
        </span>
        <button
          onClick={scrollToTop}
          className="type-label text-foreground hover:underline transition-colors"
          style={{ minHeight: '44px' }}
        >
          Back To Top ↑
        </button>
      </div>
    </footer>
  );
}
