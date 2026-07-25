'use client'

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin } from 'lucide-react';
import GrainOverlay from '@/components/GrainOverlay';
import {
  DraggableContainer,
  GridBody,
  GridItem,
} from '@/components/ui/infinite-drag-scroll';

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Influencer {
  handle: string;
  avgViews: string;
  location: string;
  imageSrc: string;
  instagramUrl: string;
}

const influencers: Influencer[] = [
  {
    handle: '@kaifofficial_19',
    avgViews: '60K+',
    location: 'Karnataka, India',
    imageSrc: '/images/Md kaif.webp',
    instagramUrl: 'https://www.instagram.com/kaifofficial_19',
  },
  {
    handle: '@afozz_ae',
    avgViews: '70K+',
    location: 'Karnataka, India',
    imageSrc: '/images/Afozz.webp',
    instagramUrl: 'https://www.instagram.com/afozz_ae',
  },
  {
    handle: '@hubballitimes',
    avgViews: '70K+',
    location: 'Karnataka, India',
    imageSrc: '/images/Hubballi times.webp',
    instagramUrl: 'https://www.instagram.com/hubballitimes',
  },
  {
    handle: '@nadeem_pov',
    avgViews: '50K+',
    location: 'Karnataka, India',
    imageSrc: '/images/Nadeem.webp',
    instagramUrl: 'https://www.instagram.com/nadeem_pov',
  },
  {
    handle: '@sahil_hvines',
    avgViews: '100K+',
    location: 'Karnataka, India',
    imageSrc: '/images/Sahil.webp',
    instagramUrl: 'https://www.instagram.com/sahil_hvines',
  },
  {
    handle: '@yavvooshahid',
    avgViews: '70K+',
    location: 'Karnataka, India',
    imageSrc: '/images/Shaahid.webp',
    instagramUrl: 'https://www.instagram.com/yavvooshahid',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function InfluencersPage() {
  const router = useRouter();

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#F2F1E6', overflow: 'hidden' }}>
      <GrainOverlay />

      {/* ── Infinite drag canvas ─────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <DraggableContainer variant="default" bgColor="#F2F1E6">
          <GridBody columns={4}>
            {influencers.map((inf, i) => (
              <GridItem
                key={i}
                className="w-[280px] h-[360px] relative max-w-full"
                onClick={() => window.open(inf.instagramUrl, '_blank', 'noopener,noreferrer')}
                style={{
                  animation: `tileIn 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms both`,
                }}
              >
                {/* ── Transparent card — no white bg ─────────────────── */}
                <div style={{
                  width: '100%', height: '100%',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center',
                  padding: '20px 14px 16px',
                }}>

                  {/* Circle photo */}
                  <div style={{
                    width: '180px', height: '180px',
                    borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
                    border: '3px solid #000000',
                    boxShadow: '5px 5px 0px #000000',
                    marginBottom: '20px',
                    background: '#ffffff',
                  }}>
                    <img
                      src={inf.imageSrc}
                      alt={inf.handle}
                      style={{
                        width: '100%', height: '100%',
                        objectFit: 'cover', display: 'block',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>

                  {/* Username (@handle) */}
                  <div style={{
                    fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: 900, color: '#000000',
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '-0.01em',
                    marginBottom: '8px',
                    textAlign: 'center',
                  }}>
                    {inf.handle}
                  </div>

                  {/* Location */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    marginBottom: '8px',
                    justifyContent: 'center',
                  }}>
                    <MapPin size={16} style={{ color: '#000', flexShrink: 0 }} />
                    <span style={{
                      fontSize: 'clamp(12px, 3vw, 15px)', color: '#000',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700, letterSpacing: '0.06em',
                    }}>
                      {inf.location}
                    </span>
                  </div>

                  {/* Average Views */}
                  <div style={{
                    fontSize: 'clamp(14px, 3.5vw, 16px)', fontWeight: 800, color: '#000000',
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: '0.04em',
                    textAlign: 'center',
                  }}>
                    AVG views:{' '}
                    <span className="brutal-selection">
                      <span className="brutal-selection-handle-left" />
                      <span>{inf.avgViews}</span>
                      <span className="brutal-selection-handle-right" />
                    </span>
                  </div>
                </div>

                {/* Hover overlay — same pattern as other pages */}
                <div
                  className="grid-tile-overlay"
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(124,58,237,0.07)',
                    opacity: 0, transition: 'opacity 0.25s ease',
                    pointerEvents: 'none',
                  }}
                />
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
          /* Same frosted glass as Navigation */
          backdropFilter: 'blur(28px) saturate(200%) brightness(1.06)',
          WebkitBackdropFilter: 'blur(28px) saturate(200%) brightness(1.06)',
          background: 'rgba(255, 255, 255, 0.55)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
          /* Feathered bottom edge */
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
              // Influencer Collabs
            </span>
            <span style={{
              fontSize: '10px', letterSpacing: '0.1em',
              fontFamily: "'JetBrains Mono', monospace", color: 'rgba(0,0,0,0.4)',
            }}>
              {influencers.length} Creators
            </span>
          </div>

          {/* Row 2 — Headline */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '9px', color: '#7C3AED', letterSpacing: '0.2em',
              fontFamily: "'Inter', sans-serif", fontWeight: 600,
              marginBottom: '8px', opacity: 0.85,
            }}>
              Brand Partnerships
            </div>
            <h1 style={{
              fontSize: 'clamp(26px, 5vw, 68px)', fontWeight: 900,
              lineHeight: 0.92, letterSpacing: '-0.04em',
              margin: 0, color: '#000',
            }}>
              Creators We{' '}
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
                  Worked
                </span>
                <span className="brutal-selection-handle-right" />
              </span>{' '}
              With
            </h1>
          </div>


        </div>
      </motion.div>

      <style>{`
        .grid-tile-overlay { opacity: 0 !important; transition: opacity 0.25s ease !important; }
        div:hover > .grid-tile-overlay { opacity: 1 !important; }
      `}</style>
    </div>
  );
}
