'use client'

import { useRef, useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import ArcCarousel from '@/components/ui/ArcCarousel';
import type { ArcCarouselItem } from '@/components/ui/ArcCarousel';
import { MagicText } from '@/components/ui/magic-text';
import { cldVideo, cldPoster } from '@/lib/cloudinary';

gsap.registerPlugin(ScrollTrigger);

const websiteProjects: ArcCarouselItem[] = [
  {
    src: cldVideo('https://res.cloudinary.com/ep3ji8zn/video/upload/v1787111590/AutoGlam.mp4'),
    poster: cldPoster('https://res.cloudinary.com/ep3ji8zn/video/upload/v1787111590/AutoGlam.mp4'),
    alt: 'Auto Glam Detailing Studio',
    category: 'Automotive',
    url: 'auto-glam.vercel.app',
  },
  {
    src: cldVideo('https://res.cloudinary.com/ep3ji8zn/video/upload/v1787111599/Cardee.mp4'),
    poster: cldPoster('https://res.cloudinary.com/ep3ji8zn/video/upload/v1787111599/Cardee.mp4'),
    alt: 'CARDEE The Detailing Studio',
    category: 'Automotive',
    url: 'cardee-detailing-studio.vercel.app',
  },
  {
    src: cldVideo('https://res.cloudinary.com/ep3ji8zn/video/upload/v1787111656/Baba.mp4'),
    poster: cldPoster('https://res.cloudinary.com/ep3ji8zn/video/upload/v1787111656/Baba.mp4'),
    alt: 'Baba Royal Garage',
    category: 'Automotive',
    url: 'baba-royal-garage-m6hv.vercel.app',
  },
  {
    src: cldVideo('https://res.cloudinary.com/ep3ji8zn/video/upload/v1787111570/Apex.mp4'),
    poster: cldPoster('https://res.cloudinary.com/ep3ji8zn/video/upload/v1787111570/Apex.mp4'),
    alt: 'Apex Dental Clinic',
    category: 'Healthcare',
    url: 'apex-dental-five.vercel.app',
  },
  {
    src: cldVideo('https://res.cloudinary.com/ep3ji8zn/video/upload/v1787111614/Empire.mp4'),
    poster: cldPoster('https://res.cloudinary.com/ep3ji8zn/video/upload/v1787111614/Empire.mp4'),
    alt: 'Empire Restaurant',
    category: 'Hospitality',
    url: 'empire-restaurant.vercel.app',
  },
  {
    src: cldVideo('https://res.cloudinary.com/ep3ji8zn/video/upload/v1787111543/Annachi.mp4'),
    poster: cldPoster('https://res.cloudinary.com/ep3ji8zn/video/upload/v1787111543/Annachi.mp4'),
    alt: 'Annachi Tiffin Centre',
    category: 'Hospitality',
    url: 'annachi-tiffin-centre.vercel.app',
  },
  {
    src: cldVideo('https://res.cloudinary.com/ep3ji8zn/video/upload/v1787112069/tippu-shaheed.mp4'),
    poster: cldPoster('https://res.cloudinary.com/ep3ji8zn/video/upload/v1787112069/tippu-shaheed.mp4'),
    alt: 'Tippu Shaheed Education Trust',
    category: 'Education',
    url: 'tpshaheed.vercel.app',
  },
  {
    src: cldVideo('https://res.cloudinary.com/ep3ji8zn/video/upload/v1787111574/Hosatti.mp4'),
    poster: cldPoster('https://res.cloudinary.com/ep3ji8zn/video/upload/v1787111574/Hosatti.mp4'),
    alt: 'Hosatti Home Services',
    category: 'Home Service',
    url: 'hosatti.com',
  },
  {
    src: cldVideo('https://res.cloudinary.com/ep3ji8zn/video/upload/v1787111551/Arshan.mp4'),
    poster: cldPoster('https://res.cloudinary.com/ep3ji8zn/video/upload/v1787111551/Arshan.mp4'),
    alt: 'Custom Resume Website',
    category: 'Personal',
    url: 'arshan-girniwale-resume.vercel.app',
  },
  {
    src: cldVideo('https://res.cloudinary.com/ep3ji8zn/video/upload/v1787111636/LBow.mp4'),
    poster: cldPoster('https://res.cloudinary.com/ep3ji8zn/video/upload/v1787111636/LBow.mp4'),
    alt: 'LNS Industrial Piping',
    category: 'Industrial',
    url: 'lbownetworksolutions.com',
  },
];


export default function WebsiteProjectsGallery() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const teaserRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const hasPlayedEntrance = useRef(false);

  const [isExpanded, setIsExpanded] = useState(true);

  // ─── Entrance animations (only when expanded) ────────────────────────────
  useGSAP(() => {
    if (!sectionRef.current || !isExpanded || hasPlayedEntrance.current) return;

    if (headlineRef.current) {
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
      const cards = carouselRef.current.querySelectorAll('.arc-carousel-card');
      gsap.from(cards, {
        y: 120,
        opacity: 0,
        scale: 0.85,
        duration: 1,
        stagger: 0.08,
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
      // First capture the current height
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
          // Show teaser
          if (teaser) {
            gsap.set(teaser, { display: 'block', opacity: 0, y: 10 });
            gsap.to(teaser, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
          }
        },
      });
    } else {
      // ── Expand ──
      // Hide teaser first
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

      // Double-RAF: first frame lets React commit the re-render,
      // second frame lets the browser measure the new scrollHeight reliably.
      requestAnimationFrame(() => requestAnimationFrame(() => {
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
            // Refresh ScrollTrigger so carousel entrance works
            ScrollTrigger.refresh();
          },
        });
      }));
    }
  }, [isExpanded]);

  // ─── On mount: if expanded, ensure content is visible ─────────────────────
  useEffect(() => {
    if (isExpanded && contentRef.current) {
      gsap.set(contentRef.current, { height: 'auto', opacity: 1, overflow: 'visible' });
    }
    if (teaserRef.current) {
      gsap.set(teaserRef.current, { display: isExpanded ? 'none' : 'block' });
    }
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="text-foreground"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#F2F1E6',
        color: '#000000',
      }}
    >
      <SectionHeader number="04" title="//Website Projects" label="Client Work" />

      {/* ─── Toggle Bar ──────────────────────────────────────────────────── */}
      <div className="container-padding flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 sm:gap-4 pb-8 md:pb-10">
        <MagicText
          text={"Websites Built for\n[_Real_] Businesses"}
          wrapperClassName="leading-none text-foreground font-extrabold !leading-[1.05] tracking-tight text-left max-w-full md:max-w-4xl lg:max-w-5xl"
          fontSize="clamp(32px, 5.2vw, 84px)"
          ghostOpacity={0.1}
        />

        <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:pb-1">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className="section-toggle-btn"
              onClick={toggleExpand}
              aria-expanded={isExpanded}
              aria-controls="website-projects-content"
            >
              {isExpanded ? 'Collapse' : 'View Projects'}
              <ChevronDown
                size={14}
                className={`section-toggle-chevron ${isExpanded ? 'expanded' : ''}`}
              />
            </button>
            <button
              className="section-toggle-btn"
              onClick={() => router.push('/projects')}
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
        style={{ display: 'none', paddingBottom: '40px' }}
      >
        <p
          style={{
            fontSize: '14px',
            color: 'var(--foreground)',
            lineHeight: 1.6,
            maxWidth: '560px',
          }}
        >
          Live client websites across automotive, education, healthcare, hospitality, home-service &amp; industrial industries — built with React.js, Next.js, and Tailwind CSS.
          <span
            style={{
              display: 'inline-block',
              marginLeft: '8px',
              color: '#A855F7',
              fontWeight: 700,
              letterSpacing: '0.1em',
            }}
            className="type-label"
          >
            Click to explore ↑
          </span>
        </p>
      </div>

      {/* ─── Collapsible Content ─────────────────────────────────────────── */}
      <div
        ref={contentRef}
        id="website-projects-content"
        className="section-collapsible"
      >
        {/* Sub-description */}
        <div ref={headlineRef} className="container-padding pb-4 md:pb-10">
          <p
            className="max-w-full md:max-w-[480px] text-foreground font-medium"
            style={{
              fontSize: '14px',
              lineHeight: 1.6,
            }}
          >
            Live client websites across automotive, education, healthcare, hospitality, home-service, and industrial industries — built with React.js, Next.js, and Tailwind CSS.
          </p>
        </div>

        {/* Arc Carousel */}
        <div ref={carouselRef}>
          <ArcCarousel items={websiteProjects} />
        </div>
      </div>
    </section>
  );
}
