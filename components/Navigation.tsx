'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const linkStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 'clamp(10px, 1vw, 12px)',
  fontWeight: 600,
  letterSpacing: '0.07em',
  textTransform: 'uppercase' as const,
  color: 'rgba(0, 0, 0, 0.60)',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  whiteSpace: 'nowrap' as const,
};

const PAGE_LINKS = [
  { href: '/about',   label: 'About'   },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [time, setTime] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      // Only call setState when the threshold is actually crossed (prevents 60+ re-renders/sec)
      const s = window.scrollY > 10;
      setScrolled(prev => (prev === s ? prev : s));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        /* iOS safe area support */
        paddingTop: 'max(env(safe-area-inset-top, 0px), 0px)',
        /* Feather zone below content row — smaller on mobile so it doesn't eat hero text */
        paddingBottom: 'clamp(28px, 5vw, 56px)',
        pointerEvents: 'none',
        transition: 'all 0.4s ease',
        /* GPU compositor layer: backdrop-filter no longer triggers full-page repaint on scroll */
        transform: 'translateZ(0)',
        willChange: 'transform',
        /* Frosted glass */
        backdropFilter: 'blur(28px) saturate(200%) brightness(1.05)',
        /* iOS 15 fix: brightness() causes WebKit compositing glitch; omit it for -webkit- */
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        background: scrolled
          ? 'rgba(255, 255, 255, 0.72)'
          : 'rgba(255, 255, 255, 0.60)',
        /* Inner top highlight sheen */
        boxShadow: scrolled
          ? 'inset 0 1px 0 rgba(255,255,255,0.95), 0 1px 0 rgba(0,0,0,0.06)'
          : 'inset 0 1px 0 rgba(255,255,255,0.9)',
        /* Feathered bottom edge dissolves into page */
        maskImage: 'linear-gradient(to bottom, black 0%, black 46%, rgba(0,0,0,0.88) 60%, rgba(0,0,0,0.6) 74%, rgba(0,0,0,0.28) 86%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 46%, rgba(0,0,0,0.88) 60%, rgba(0,0,0,0.6) 74%, rgba(0,0,0,0.28) 86%, transparent 100%)',
      }}
    >
      {/* ── Content row ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: 'clamp(14px, 2vw, 20px) clamp(20px, 5vw, 72px)',
          pointerEvents: 'auto',
        }}
      >
        {/* Left — live clock */}
        <span
          aria-label="Current local time"
          style={{
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontSize: 'clamp(11px, 1.2vw, 13px)',
            fontWeight: 500,
            letterSpacing: '0.06em',
            color: 'rgba(0, 0, 0, 0.65)',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Local/ {time}
        </span>

        {/* Centre — brand name (always perfectly centred) */}
        <Link
          href="/"
          style={{ textDecoration: 'none' }}
          aria-label="Nehal Nadaf — Home"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '5px',
              userSelect: 'none',
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(15px, 1.6vw, 18px)',
                letterSpacing: '-0.04em',
                color: '#000000',
              }}
            >
              Nehal
            </span>
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 500,
                fontSize: 'clamp(15px, 1.6vw, 18px)',
                letterSpacing: '0em',
                color: '#000000',
              }}
            >
              Nadaf
            </span>
          </div>
        </Link>

        {/* Right — page links */}
        <nav
          aria-label="Page links"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 'clamp(12px, 1.8vw, 28px)',
          }}
        >
          {PAGE_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  ...linkStyle,
                  color: isActive ? '#000' : 'rgba(0, 0, 0, 0.60)',
                  borderBottom: isActive ? '1px solid #000' : '1px solid transparent',
                }}
                onMouseEnter={e => {
                  if (!window.matchMedia('(hover: hover)').matches) return;
                  (e.currentTarget as HTMLElement).style.color = '#000';
                }}
                onMouseLeave={e => {
                  if (!window.matchMedia('(hover: hover)').matches) return;
                  (e.currentTarget as HTMLElement).style.color = isActive ? '#000' : 'rgba(0,0,0,0.60)';
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </nav>
  );
}
