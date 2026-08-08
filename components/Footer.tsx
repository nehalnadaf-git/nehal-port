'use client'

import Link from 'next/link';
import { MorphingText } from '@/components/ui/morphing-text';
import { useReveal, useRevealChildren } from '@/hooks/useReveal';
import { SEO } from '@/lib/seo';

export default function Footer() {
  const lineRef    = useReveal<HTMLDivElement>({ threshold: 0.3, rootMargin: '0px 0px -20px 0px' });
  const topRef     = useReveal<HTMLDivElement>({ threshold: 0.15, rootMargin: '0px 0px -20px 0px' });
  const morphRef   = useReveal<HTMLDivElement>({ threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
  const contactRef = useReveal<HTMLDivElement>({ threshold: 0.15, rootMargin: '0px 0px -20px 0px' });
  const linksRef   = useRevealChildren<HTMLDivElement>('.lbow-link', {
    staggerMs: 30,
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px',
  });
  const bottomRef  = useReveal<HTMLDivElement>({ threshold: 0.2, rootMargin: '0px 0px -20px 0px' });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="container-padding pt-10 md:pt-16 lg:pt-20 font-sans"
      style={{
        background: '#000000',
        color: '#FFFFFF',
        paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
      }}
    >
      {/* Top border line */}
      <div
        ref={lineRef}
        className="rv-clip"
        style={{ height: '1.5px', background: 'rgba(255, 255, 255, 0.2)', marginBottom: '0' }}
      />

      {/* Row 1: Top Sub-Header Bar (3 Columns) */}
      <div
        ref={topRef}
        className="rv-up grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 pt-6 md:pt-8 pb-4 md:pb-6 text-xs sm:text-sm md:text-base text-white/80 font-sans tracking-wider"
      >
        <div>
          <p className="font-bold text-white">WEB DEVELOPER &amp; UI/UX DESIGNER</p>
          <p className="text-white/70">FREELANCE CREATIVE STUDIO</p>
        </div>
        <div className="md:text-center">
          <p className="font-bold text-white">CREATIVE AGENCY &amp; PRODUCTION</p>
          <Link href="/about" className="hover:underline text-white font-bold">
            VIEW SERVICES &rarr;
          </Link>
        </div>
        <div className="md:text-right">
          <p className="font-bold text-white">HUBLI, KARNATAKA, INDIA</p>
          <p className="text-white/70">EST. 2021</p>
        </div>
      </div>

      {/* Row 2: Morphing Text Animation — Balanced desktop height */}
      <div
        ref={morphRef}
        className="rv-scale relative flex items-center justify-center w-full my-4 md:my-6 py-2 md:py-4 text-center select-none"
        style={{
          minHeight: 'clamp(60px, 14vw, 150px)',
          width: '100%',
        }}
      >
        <MorphingText
          texts={["Nehal", "Nadaf"]}
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(48px, 14vw, 150px)",
            height: "clamp(52px, 14vw, 150px)",
            letterSpacing: "-0.05em",
            color: "#FFFFFF",
            width: "100%",
          }}
        />
      </div>

      {/* Row 3: Contact Details Strip (3 Columns) */}
      <div
        ref={contactRef}
        className="rv-up grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 py-4 md:py-6 border-t-2 border-b-2 border-white/20 font-sans tracking-wider"
      >
        <div>
          <p className="text-white/50 mb-1 text-xs font-bold tracking-widest">// CONTACT</p>
          <a href="tel:+916363278962" className="font-bold text-white hover:underline text-sm sm:text-base md:text-lg">
            +91 6363278962
          </a>
        </div>
        <div className="md:text-center">
          <p className="text-white/50 mb-1 text-xs font-bold tracking-widest">// EMAIL</p>
          <a href={`mailto:${SEO.email}`} className="font-bold text-white hover:underline text-sm sm:text-base md:text-lg">
            {SEO.email.toUpperCase()}
          </a>
        </div>
        <div className="md:text-right">
          <p className="text-white/50 mb-1 text-xs font-bold tracking-widest">// LOCATION</p>
          <p className="font-bold text-white text-sm sm:text-base md:text-lg">HUBLI, KARNATAKA, INDIA</p>
        </div>
      </div>

      {/* Row 4: Technical Links — Balanced spacing */}
      <div
        ref={linksRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 py-6 md:py-8 border-b-2 border-white/20 font-sans text-xs sm:text-sm md:text-base tracking-wider"
      >
        {/* Column 1: Services */}
        <div className="flex flex-col gap-2 md:gap-2.5">
          <p className="text-white/50 font-bold mb-1 md:mb-1.5 tracking-widest text-xs sm:text-sm">// SERVICES</p>
          <Link href="/services/web-development" className="lbow-link rv-up font-bold text-white hover:text-purple-300 hover:underline py-0.5">
            WEB DEVELOPMENT
          </Link>
          <Link href="/services/ui-ux-design" className="lbow-link rv-up font-bold text-white hover:text-purple-300 hover:underline py-0.5">
            UI/UX DESIGN
          </Link>
          <Link href="/services/video-editing" className="lbow-link rv-up font-bold text-white hover:text-purple-300 hover:underline py-0.5">
            VIDEO EDITING &amp; COLOUR GRADING
          </Link>
          <Link href="/services/social-media-marketing" className="lbow-link rv-up font-bold text-white hover:text-purple-300 hover:underline py-0.5">
            SOCIAL MEDIA MARKETING
          </Link>
        </div>

        {/* Column 2: Portfolio */}
        <div className="flex flex-col gap-2 md:gap-2.5">
          <p className="text-white/50 font-bold mb-1 md:mb-1.5 tracking-widest text-xs sm:text-sm">// PORTFOLIO</p>
          <Link href="/projects" className="lbow-link rv-up font-bold text-white hover:text-purple-300 hover:underline py-0.5">
            WEBSITE PROJECTS
          </Link>
          <Link href="/videos" className="lbow-link rv-up font-bold text-white hover:text-purple-300 hover:underline py-0.5">
            VIDEO PROJECTS
          </Link>
          <Link href="/influencers" className="lbow-link rv-up font-bold text-white hover:text-purple-300 hover:underline py-0.5">
            INFLUENCER COLLABS
          </Link>
          <Link href="/contact" className="lbow-link rv-up font-bold text-[#C084FC] hover:underline py-0.5 mt-0.5">
            START A PROJECT &rarr;
          </Link>
        </div>

        {/* Column 3: Social & Quick Links */}
        <div className="flex flex-col gap-2 md:gap-2.5 sm:col-span-2 md:col-span-1">
          <p className="text-white/50 font-bold mb-1 md:mb-1.5 tracking-widest text-xs sm:text-sm">// CONNECT</p>
          <Link href="/about" className="lbow-link rv-up font-bold text-white hover:text-purple-300 hover:underline py-0.5">
            ABOUT NEHAL
          </Link>
          <a href={SEO.social.linkedin} target="_blank" rel="noopener noreferrer" className="lbow-link rv-up font-bold text-white hover:text-purple-300 hover:underline py-0.5">
            LINKEDIN
          </a>
          <a href={SEO.social.instagram} target="_blank" rel="noopener noreferrer" className="lbow-link rv-up font-bold text-white hover:text-purple-300 hover:underline py-0.5">
            INSTAGRAM
          </a>
          <a href={SEO.social.twitter} target="_blank" rel="noopener noreferrer" className="lbow-link rv-up font-bold text-white hover:text-purple-300 hover:underline py-0.5">
            X (TWITTER)
          </a>
        </div>
      </div>

      {/* Row 5: Bottom Copyright Bar */}
      <div
        ref={bottomRef}
        className="rv-up flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 md:pt-6 font-sans text-xs sm:text-sm tracking-wider text-white/70"
      >
        <p className="text-center sm:text-left font-semibold text-white/70">
          &copy; 2026 NEHAL NADAF | HUBLI, KARNATAKA
        </p>
        <div className="flex items-center gap-3 md:gap-4 font-bold">
          <a href={SEO.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:underline text-white">
            WHATSAPP
          </a>
          <span>|</span>
          <a href={`mailto:${SEO.email}`} className="hover:underline text-white">
            EMAIL
          </a>
          <span>|</span>
          <button onClick={scrollToTop} className="hover:underline text-white">
            BACK TO TOP &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
}
