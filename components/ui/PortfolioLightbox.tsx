'use client'

/**
 * PortfolioLightbox.tsx
 * Shared lightbox overlay — used by ArcCarousel, VideoArcCarousel,
 * /projects page, and /videos page for a consistent presentation.
 */

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, X } from 'lucide-react';

export interface LightboxItem {
  /** Video source URL */
  src: string;
  /** Display name / title */
  title: string;
  /** Category / type tag shown in purple above the title */
  category?: string;
  /** External URL — renders a "Visit Site" CTA when present */
  url?: string;
  /** Controls the video aspect ratio in the lightbox (default: horizontal) */
  aspectRatio?: 'vertical' | 'horizontal';
}

interface PortfolioLightboxProps {
  item: LightboxItem | null;
  onClose: () => void;
  /** Set to true after the component is mounted client-side (avoids SSR portal issues) */
  mounted?: boolean;
}

export default function PortfolioLightbox({
  item,
  onClose,
  mounted = true,
}: PortfolioLightboxProps) {
  // ── Escape key ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!mounted || !item) return null;

  const isVertical = item.aspectRatio === 'vertical';

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: 'rgba(10,8,20,0.55)',
        backdropFilter: 'blur(28px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(28px) saturate(1.4)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(12px, 4vw, 24px)',
        paddingTop: 'clamp(64px, 12vh, 80px)',
        paddingBottom: 'clamp(24px, 6vh, 48px)',
        boxSizing: 'border-box',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        animation: 'lbFadeIn 0.25s ease both',
      }}
    >
      {/* ── Close button ─────────────────────────────────────────────────── */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close lightbox"
        style={{
          position: 'fixed',
          top: 'max(env(safe-area-inset-top, 0px), clamp(12px, 3vh, 20px))',
          right: 'clamp(12px, 3vw, 20px)',
          background: 'rgba(255,255,255,0.12)',
          border: '1.5px solid rgba(255,255,255,0.25)',
          borderRadius: '50%',
          width: '46px',
          height: '46px',
          minWidth: '44px',
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#fff',
          zIndex: 1000000,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          transition: 'transform 0.2s ease, background 0.2s ease',
          WebkitTapHighlightColor: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.22)';
          e.currentTarget.style.transform = 'scale(1.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <X size={20} />
      </button>

      {/* ── Video container ───────────────────────────────────────────────── */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: isVertical ? '360px' : '980px',
          maxHeight: isVertical ? 'min(72vh, 640px)' : 'min(72vh, 560px)',
          aspectRatio: isVertical ? '9 / 16' : '16 / 9',
          borderRadius: '12px',
          overflow: 'hidden',
          background: '#000',
          boxShadow: '0 32px 80px rgba(0,0,0,0.85)',
          border: '2px solid rgba(255,255,255,0.15)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'lbSlideUp 0.35s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        <video
          src={item.src}
          autoPlay
          loop
          controls
          playsInline
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: isVertical ? 'cover' : 'contain',
          }}
        />
      </div>

      {/* ── Info + CTA ────────────────────────────────────────────────────── */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          marginTop: '20px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          animation: 'lbSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.06s both',
        }}
      >
        {item.category && (
          <span style={{
            fontSize: '11px',
            color: '#A855F7',
            letterSpacing: '0.18em',
            fontFamily: "'JetBrains Mono', monospace",
            textTransform: 'uppercase',
            fontWeight: 700,
          }}>
            {item.category}
          </span>
        )}
        <h3 style={{
          fontSize: 'clamp(18px, 3.5vw, 24px)',
          color: '#fff',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          margin: 0,
        }}>
          {item.title}
        </h3>
        {item.url && (
          <a
            href={item.url.startsWith('http') ? item.url : `https://${item.url}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 24px',
              background: '#A855F7',
              border: '2px solid #000',
              borderRadius: '100px',
              color: '#fff',
              fontWeight: 700,
              fontSize: '13px',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              marginTop: '6px',
              boxShadow: '3px 3px 0px #000',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '5px 5px 0px #000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '3px 3px 0px #000';
            }}
          >
            Visit Site <ArrowUpRight size={14} />
          </a>
        )}
      </div>

      <style>{`
        @keyframes lbFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lbSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </div>,
    document.body,
  );
}
