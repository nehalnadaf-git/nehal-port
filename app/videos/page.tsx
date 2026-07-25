'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import GrainOverlay from '@/components/GrainOverlay';
import PortfolioLightbox, { type LightboxItem } from '@/components/ui/PortfolioLightbox';
import {
  DraggableContainer,
  GridBody,
  GridItem,
} from '@/components/ui/infinite-drag-scroll';

// ─── Data ─────────────────────────────────────────────────────────────────────
interface VideoItem {
  src: string;
  alt: string;
  label: string;
  category: string;
  thumbSrc: string;
}

const videoItems: VideoItem[] = [
  { src: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784353308/TPF_Tajweed_hmazce.mp4', alt: 'TPF Tajweed', label: 'TPF Tajweed', category: 'Brand Reel', thumbSrc: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784353308/TPF_Tajweed_hmazce.jpg' },
  { src: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784353306/Empire_Commercial_Video_3_fuccwf.mp4', alt: 'Empire Commercial', label: 'Empire Commercial', category: 'Cinematic', thumbSrc: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784353306/Empire_Commercial_Video_3_fuccwf.jpg' },
  { src: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784353283/Al_Moon_Academy_Eng_1_l5pbgt.mp4', alt: 'Al Moon Academy', label: 'Al Moon Academy', category: 'Short Form', thumbSrc: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784353283/Al_Moon_Academy_Eng_1_l5pbgt.jpg' },
  { src: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784351905/AQMrZwsUNPY_X_buPNvjEiDXTPpWd3kLcvfmCK3kYawXJyhE9AD7f3e9kiZtuGC_N1mAZ417R1yH93PRnYjKhpI_bw5xps.mp4', alt: 'Brand Reel 04', label: 'Brand Reel 04', category: 'Social Media', thumbSrc: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784351905/AQMrZwsUNPY_X_buPNvjEiDXTPpWd3kLcvfmCK3kYawXJyhE9AD7f3e9kiZtuGC_N1mAZ417R1yH93PRnYjKhpI_bw5xps.jpg' },
  { src: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784351904/AQPWxjmQyfz1h6eBdHlY-5mnFDs0zbqeMofj3SEFBpT_cL4Zt_BptaBJoSQImyUTxPj7BW_kcB2eqOBafVA_qIUcrStuLkeUE1jYdDU_x3pyea.mp4', alt: 'Brand Reel 05', label: 'Brand Reel 05', category: 'Brand Film', thumbSrc: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784351904/AQPWxjmQyfz1h6eBdHlY-5mnFDs0zbqeMofj3SEFBpT_cL4Zt_BptaBJoSQImyUTxPj7BW_kcB2eqOBafVA_qIUcrStuLkeUE1jYdDU_x3pyea.jpg' },
  { src: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784351903/AQNs7JWx7643lqque_gte9iVmvD3FmzWci4MY8qN7q4JPfInqGeT1zo24ArKmWatBkcLBaLWUh16lZdDBU9_wSxY19IxEjyjmQXQWOg_bk1qkg.mp4', alt: 'Brand Reel 06', label: 'Brand Reel 06', category: 'Reel', thumbSrc: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784351903/AQNs7JWx7643lqque_gte9iVmvD3FmzWci4MY8qN7q4JPfInqGeT1zo24ArKmWatBkcLBaLWUh16lZdDBU9_wSxY19IxEjyjmQXQWOg_bk1qkg.jpg' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function VideoProjectsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeVideo, setActiveVideo] = useState<LightboxItem | null>(null);

  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#F2F1E6', overflow: 'hidden' }}>
      <GrainOverlay />

      {/* ── Infinite drag canvas ─────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <DraggableContainer variant="masonry" bgColor="#F2F1E6">
          <GridBody columns={5}>
            {videoItems.map((item, i) => {
              const isHorizontal = item.label === 'Al Moon Academy' || item.alt.includes('Al Moon Academy');
              return (
                <GridItem
                  key={i}
                  className={isHorizontal ? 'w-[360px] h-[202px] relative' : 'w-[202px] h-[360px] relative'}
                  onClick={() => setActiveVideo({
                    src: item.src,
                    title: item.alt,
                    category: item.category,
                    aspectRatio: isHorizontal ? 'horizontal' : 'vertical',
                  })}
                  style={{
                    border: '3px solid #000000',
                    boxShadow: '6px 6px 0px #000000',
                    borderRadius: '16px',
                    background: '#000',
                    overflow: 'hidden',
                  }}
                >
                  {/* Video Preview — lazy, plays on hover */}
                  <video
                    src={item.src}
                    poster={item.thumbSrc}
                    muted
                    loop
                    playsInline
                    preload="none"
                    onMouseEnter={e => (e.currentTarget as HTMLVideoElement).play()}
                    onMouseLeave={e => { const v = e.currentTarget as HTMLVideoElement; v.pause(); v.currentTime = 0; }}
                    style={{
                      position: 'absolute', top: 0, left: 0,
                      width: '100%', height: '100%', objectFit: 'cover',
                      pointerEvents: 'none',
                    }}
                  />
                  {/* Play indicator overlay */}
                  <div
                    className="grid-tile-overlay"
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 55%)',
                      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                      padding: '16px', opacity: 0, transition: 'opacity 0.25s ease',
                    }}
                  >
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '10px',
                    }}>
                      <Play size={16} style={{ color: '#fff', marginLeft: '2px' }} />
                    </div>
                    <span style={{
                      fontSize: '12px', fontWeight: 700, color: '#fff',
                      fontFamily: "'Inter', sans-serif", letterSpacing: '-0.01em',
                    }}>
                      {item.alt}
                    </span>
                    <span style={{
                      fontSize: '9px', color: 'rgba(255,255,255,0.6)',
                      fontFamily: "'Inter', sans-serif", fontWeight: 600,
                      letterSpacing: '0.08em', marginTop: '3px',
                    }}>
                      {item.category}
                    </span>
                  </div>
                </GridItem>
              );
            })}
          </GridBody>
        </DraggableContainer>
      </div>

      {/* ── Frosted glass header ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
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
              // Video Projects
            </span>
            <span style={{
              fontSize: '10px', letterSpacing: '0.1em',
              fontFamily: "'JetBrains Mono', monospace", color: 'rgba(0,0,0,0.4)',
            }}>
              {videoItems.length} Videos
            </span>
          </div>

          {/* Row 2 — Headline */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '9px', color: '#7C3AED', letterSpacing: '0.2em',
              fontFamily: "'Inter', sans-serif", fontWeight: 600,
              marginBottom: '8px', opacity: 0.85,
            }}>
              Brand Reels
            </div>
            <h1 style={{
              fontSize: 'clamp(26px, 5vw, 68px)', fontWeight: 900,
              lineHeight: 0.92, letterSpacing: '-0.04em',
              margin: 0, color: '#000',
            }}>
              Videos Crafted for the{' '}
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
                  Screen
                </span>
                <span className="brutal-selection-handle-right" />
              </span>
            </h1>
          </div>
        </div>
      </motion.div>

      {/* ── Shared lightbox ───────────────────────────────────────────────── */}
      <PortfolioLightbox
        item={activeVideo}
        onClose={() => setActiveVideo(null)}
        mounted={mounted}
      />

      <style>{`
        .grid-tile-overlay { opacity: 0 !important; transition: opacity 0.25s ease !important; }
        div:hover > .grid-tile-overlay { opacity: 1 !important; }
      `}</style>
    </div>
  );
}
