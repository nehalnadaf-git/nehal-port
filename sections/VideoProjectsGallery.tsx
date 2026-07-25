'use client'

import { useRef, useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import VideoArcCarousel from '@/components/ui/VideoArcCarousel';
import type { VideoArcItem } from '@/components/ui/VideoArcCarousel';
import ArcCarousel from '@/components/ui/ArcCarousel';
import type { ArcCarouselItem } from '@/components/ui/ArcCarousel';
import { MagicText } from '@/components/ui/magic-text';

gsap.registerPlugin(ScrollTrigger);

// ─── Separate Vertical (9:16) and Horizontal (16:9) Video Collections ───────

const verticalVideoProjects: VideoArcItem[] = [
  {
    src: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784353308/TPF_Tajweed_hmazce.mp4',
    title: 'TPF Tajweed',
    label: 'Brand Reel • 9:16',
    aspectRatio: 'vertical',
  },
  {
    src: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784351905/AQMrZwsUNPY_X_buPNvjEiDXTPpWd3kLcvfmCK3kYawXJyhE9AD7f3e9kiZtuGC_N1mAZ417R1yH93PRnYjKhpI_bw5xps.mp4',
    title: 'Brand Reel 04',
    label: 'Social Media • 9:16',
    aspectRatio: 'vertical',
  },
  {
    src: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784351904/AQPWxjmQyfz1h6eBdHlY-5mnFDs0zbqeMofj3SEFBpT_cL4Zt_BptaBJoSQImyUTxPj7BW_kcB2eqOBafVA_qIUcrStuLkeUE1jYdDU_x3pyea.mp4',
    title: 'Brand Reel 05',
    label: 'Brand Film • 9:16',
    aspectRatio: 'vertical',
  },
  {
    src: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784351903/AQNs7JWx7643lqque_gte9iVmvD3FmzWci4MY8qN7q4JPfInqGeT1zo24ArKmWatBkcLBaLWUh16lZdDBU9_wSxY19IxEjyjmQXQWOg_bk1qkg.mp4',
    title: 'Brand Reel 06',
    label: 'Instagram Reel • 9:16',
    aspectRatio: 'vertical',
  },
];

const horizontalVideoProjects: ArcCarouselItem[] = [
  {
    src: 'https://res.cloudinary.com/w71scqkk/video/upload/v1784353283/Al_Moon_Academy_Eng_1_l5pbgt.mp4',
    alt: 'Al Moon Academy',
    category: 'Education',
    url: undefined,
  },
];

export default function VideoProjectsGallery() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const teaserRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const hasPlayedEntrance = useRef(false);

  const [isExpanded, setIsExpanded] = useState(false);
  const [videoFormat, setVideoFormat] = useState<'vertical' | 'horizontal'>('vertical');

  // ─── Entrance animations ───────────────────────────────────────────────────
  useGSAP(() => {
    if (!sectionRef.current || !isExpanded || hasPlayedEntrance.current) return;

    if (headlineRef.current && headlineRef.current.children.length > 0) {
      gsap.from(headlineRef.current.children, {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 85%',
        },
      });
    }

    if (carouselRef.current) {
      const cards = carouselRef.current.querySelectorAll('.video-arc-card');
      gsap.from(cards, {
        y: 140,
        opacity: 0,
        scale: 0.8,
        duration: 1.1,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top 90%',
        },
      });
    }

    hasPlayedEntrance.current = true;
  }, { scope: sectionRef, dependencies: [isExpanded] });

  // ─── Expand / Collapse toggle ─────────────────────────────────────────────
  const toggleExpand = useCallback(() => {
    if (isAnimating.current || !contentRef.current) return;
    isAnimating.current = true;

    const content = contentRef.current;
    const teaser = teaserRef.current;

    if (isExpanded) {
      // ── Collapse ──
      const currentH = content.scrollHeight;
      gsap.set(content, { height: currentH, overflow: 'hidden' });

      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.inOut',
        onComplete: () => {
          setIsExpanded(false);
          isAnimating.current = false;
          if (teaser) {
            gsap.set(teaser, { display: 'block', opacity: 0, y: 10 });
            gsap.to(teaser, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
          }
        },
      });
    } else {
      // ── Expand ──
      if (teaser) {
        gsap.to(teaser, {
          opacity: 0,
          y: -10,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            gsap.set(teaser, { display: 'none' });
          },
        });
      }

      setIsExpanded(true);

      requestAnimationFrame(() => {
        if (!content) return;
        const targetH = content.scrollHeight;
        gsap.set(content, { height: 0, opacity: 0, overflow: 'hidden' });
        gsap.to(content, {
          height: targetH,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set(content, { height: 'auto', overflow: 'visible' });
            isAnimating.current = false;
            ScrollTrigger.refresh();
          },
        });
      });
    }
  }, [isExpanded]);

  // ─── On mount: collapsed by default ───────────────────────────────────────
  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        gsap.set(contentRef.current, { height: 'auto', opacity: 1, overflow: 'visible' });
      } else {
        gsap.set(contentRef.current, { height: 0, opacity: 0, overflow: 'hidden' });
      }
    }
    if (teaserRef.current) {
      gsap.set(teaserRef.current, { display: isExpanded ? 'none' : 'block' });
    }
  }, []);

  return (
    <section
      id="video"
      ref={sectionRef}
      className="text-foreground"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#E8E6D8',
      }}
    >
      <SectionHeader number="05" title="//Video Projects" label="Brand Reels & Films" />

      {/* ─── Toggle Bar ──────────────────────────────────────────────────── */}
      <div className="container-padding flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 sm:gap-4 pb-8 md:pb-10">
        <MagicText
          text="Videos Crafted for the [_Screen_]"
          wrapperClassName="leading-none text-foreground font-extrabold !leading-[1.0] tracking-tight text-left max-w-3xl"
          fontSize="clamp(36px, 8vw, 120px)"
          ghostOpacity={0.1}
        />

        <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:pb-1">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className="section-toggle-btn"
              onClick={toggleExpand}
              aria-expanded={isExpanded}
              aria-controls="video-projects-content"
            >
              {isExpanded ? 'Collapse' : 'View Videos'}
              <ChevronDown
                size={14}
                className={`section-toggle-chevron ${isExpanded ? 'expanded' : ''}`}
              />
            </button>
            <button
              className="section-toggle-btn"
              onClick={() => router.push('/videos')}
              style={{ color: '#A855F7', borderColor: '#A855F7' }}
            >
              View All
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ─── Collapsed Teaser ────────────────────────────────────────────── */}
      <div
        ref={teaserRef}
        className="container-padding"
        style={{ paddingBottom: '40px' }}
      >
        <p
          style={{
            fontSize: '14px',
            color: 'var(--foreground)',
            lineHeight: 1.6,
            maxWidth: '560px',
          }}
        >
          Short-form content, brand reels, and cinematic videos produced for social media — built to stop the scroll and start the story.
          <span
            style={{
              display: 'inline-block',
              marginLeft: '8px',
              fontSize: '11px',
              color: '#A855F7',
              fontWeight: 700,
              letterSpacing: '0.1em',
            }}
          >
            Click to explore ↑
          </span>
        </p>
      </div>

      {/* ─── Collapsible Content ─────────────────────────────────────────── */}
      <div
        ref={contentRef}
        id="video-projects-content"
        className="section-collapsible"
      >
        {/* Sub-description */}
        <div ref={headlineRef} className="container-padding pb-6 md:pb-8">
          {/* Format toggle hidden — uncomment to re-enable horizontal section */}
        </div>

        {/* Video Display — vertical only while horizontal is hidden */}
        <div ref={carouselRef}>
          <VideoArcCarousel items={verticalVideoProjects} />
        </div>
      </div>

    </section>
  );
}
