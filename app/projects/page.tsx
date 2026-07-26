'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import GrainOverlay from '@/components/GrainOverlay';
import PortfolioLightbox, { type LightboxItem } from '@/components/ui/PortfolioLightbox';
import {
  DraggableContainer,
  GridBody,
  GridItem,
} from '@/components/ui/infinite-drag-scroll';

// ─── Data ─────────────────────────────────────────────────────────────────────
interface WebsiteItem {
  src: string;
  alt: string;
  category: string;
  url: string;
}

const websiteItems: WebsiteItem[] = [
  {
    src: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784355456/AutoGlam_kaenne.mp4',
    alt: 'Auto Glam Detailing Studio',
    category: 'Automotive',
    url: 'https://auto-glam.vercel.app',
  },
  {
    src: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784355455/Cardee_hluecv.mp4',
    alt: 'CARDEE The Detailing Studio',
    category: 'Automotive',
    url: 'https://cardee-detailing-studio.vercel.app',
  },
  {
    src: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784355445/Baba_zfvjq8.mp4',
    alt: 'Baba Royal Garage',
    category: 'Automotive',
    url: 'https://baba-royal-garage-m6hv.vercel.app',
  },
  {
    src: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784355436/Apex_tfdm6t.mp4',
    alt: 'Apex Dental Clinic',
    category: 'Healthcare',
    url: 'https://apex-dental-five.vercel.app',
  },
  {
    src: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784355446/Empire_prxg4l.mp4',
    alt: 'Empire Restaurant',
    category: 'Hospitality',
    url: 'https://empire-restaurant.vercel.app',
  },
  {
    src: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784355427/Annachi_yma3us.mp4',
    alt: 'Annachi Tiffin Centre',
    category: 'Hospitality',
    url: 'https://annachi-tiffin-centre.vercel.app',
  },
  {
    src: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784355432/Hosatti_qcfsw3.mp4',
    alt: 'Hosatti Home Services',
    category: 'Home Service',
    url: 'https://hosatti.com',
  },
  {
    src: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784355431/Arshan_h0xb6d.mp4',
    alt: 'Custom Resume Website',
    category: 'Personal',
    url: 'https://arshan-girniwale-resume.vercel.app',
  },
  {
    src: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784355446/LBow_vmjk0c.mp4',
    alt: 'LNS Industrial Piping',
    category: 'Industrial',
    url: 'https://lns-piping.vercel.app',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WebsiteProjectsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeProject, setActiveProject] = useState<LightboxItem | null>(null);

  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#F2F1E6', overflow: 'hidden' }}>
      <GrainOverlay />

      {/* ── Infinite drag canvas ─────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <DraggableContainer variant="default" bgColor="#F2F1E6">
          <GridBody columns={4}>
            {websiteItems.map((item, i) => (
              <GridItem
                key={i}
                className="w-[300px] h-[169px]"
                onClick={() => setActiveProject({
                  src: item.src,
                  title: item.alt,
                  category: item.category,
                  url: item.url,
                  aspectRatio: 'horizontal',
                })}
                style={{
                  border: '3px solid #000000',
                  boxShadow: '6px 6px 0px #000000',
                  borderRadius: '0px',
                  background: '#000000',
                  overflow: 'hidden',
                  animation: `tileIn 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 55}ms both`,
                }}
              >
                <video
                  src={item.src}
                  poster={item.src.replace(/\.mp4$/, '.jpg')}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="pointer-events-none absolute h-full w-full object-cover"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'auto', borderRadius: '0px', background: '#000000' }}
                />
                {/* Hover overlay */}
                <div
                  className="grid-tile-overlay"
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                    padding: '16px',
                    opacity: 0,
                    transition: 'opacity 0.25s ease',
                  }}
                >
                  <span style={{
                    fontSize: '13px', fontWeight: 700, color: '#fff',
                    letterSpacing: '-0.01em',
                  }}>
                    {item.alt}
                  </span>
                  <span style={{
                    fontSize: '10px', color: 'rgba(255,255,255,0.6)',
                    fontFamily: "'Inter', sans-serif", fontWeight: 600,
                    letterSpacing: '0.08em', marginTop: '2px',
                  }}>
                    {item.category} · Click to preview ↗
                  </span>
                </div>
              </GridItem>
            ))}
          </GridBody>
        </DraggableContainer>
      </div>

      {/* ── Frosted glass header ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
          backdropFilter: 'blur(28px) saturate(200%) brightness(1.06)',
          WebkitBackdropFilter: 'blur(28px) saturate(200%) brightness(1.06)',
          background: 'rgba(255, 255, 255, 0.55)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 42%, rgba(0,0,0,0.85) 58%, rgba(0,0,0,0.55) 72%, rgba(0,0,0,0.25) 84%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 42%, rgba(0,0,0,0.85) 58%, rgba(0,0,0,0.55) 72%, rgba(0,0,0,0.25) 84%, transparent 100%)',
          paddingBottom: '130px',
          pointerEvents: 'none',
        }}
      >
        <div style={{
          padding: 'clamp(14px, 2.5vw, 24px) clamp(20px, 5vw, 72px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px',
          pointerEvents: 'auto',
        }}>
          {/* Row 1 — Back · Label · Count */}
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={() => router.push('/')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em',
                fontFamily: "'Inter', sans-serif",
                color: 'rgba(0,0,0,0.6)', background: 'none', border: 'none',
                cursor: 'pointer', padding: 0, transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#000')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,0,0,0.6)')}
            >
              <ArrowLeft size={13} /> Back
            </button>
            <span style={{
              fontSize: '10px', letterSpacing: '0.2em',
              fontFamily: "'JetBrains Mono', monospace", color: '#7C3AED',
            }}>
              // Website Projects
            </span>
            <span style={{
              fontSize: '10px', letterSpacing: '0.1em',
              fontFamily: "'JetBrains Mono', monospace", color: 'rgba(0,0,0,0.4)',
            }}>
              {websiteItems.length} Sites
            </span>
          </div>

          {/* Row 2 — Headline */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '9px', color: '#7C3AED', letterSpacing: '0.2em',
              fontFamily: "'Inter', sans-serif", fontWeight: 600,
              marginBottom: '8px', opacity: 0.85,
            }}>
              Client Work
            </div>
            <h1 style={{
              fontSize: 'clamp(26px, 5vw, 68px)', fontWeight: 900,
              lineHeight: 0.92, letterSpacing: '-0.04em',
              margin: 0, color: '#000',
            }}>
              Websites Built for{' '}
              <span className="brutal-selection">
                <span className="brutal-selection-handle-left" />
                <span style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  fontWeight: 800,
                  color: '#000000',
                  textTransform: 'none',
                  letterSpacing: '0em',
                }}>
                  Real
                </span>
                <span className="brutal-selection-handle-right" />
              </span>{' '}
              Businesses
            </h1>
          </div>
        </div>
      </motion.div>

      {/* ── Shared lightbox ───────────────────────────────────────────────── */}
      <PortfolioLightbox
        item={activeProject}
        onClose={() => setActiveProject(null)}
        mounted={mounted}
      />

      <style>{`
        .grid-tile-overlay { opacity: 0 !important; transition: opacity 0.25s ease !important; }
        div:hover > .grid-tile-overlay { opacity: 1 !important; }
        @keyframes tileIn {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>
  );
}
