'use client'

import SectionHeader from '@/components/SectionHeader';
import { useReveal, useRevealChildren } from '@/hooks/useReveal';

// ─── Inline SVG logos for each tool ──────────────────────────────────────────
const ReactLogo = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" aria-label="React.js logo">
    <circle cx="12" cy="12" r="2.5" fill="#61DAFB"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
  </svg>
);

const NextjsLogo = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" aria-label="Next.js logo" fill="currentColor">
    <path d="M11.572 0C5.18 0 0 5.18 0 11.572c0 6.394 5.18 11.572 11.572 11.572 6.394 0 11.572-5.178 11.572-11.572C23.144 5.18 17.966 0 11.572 0zm4.886 16.898L8.2 7.334H6.87v9.33h1.29V9.22l7.486 8.72.812-.042v.001z"/>
  </svg>
);

const TailwindLogo = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" aria-label="Tailwind CSS logo" fill="#38BDF8">
    <path d="M12.001 4.8C9.601 4.8 8.1 5.952 7.2 8.4c1.35-1.8 2.925-2.475 4.5-2.025.978.244 1.678.955 2.452 1.74C15.32 9.29 16.697 10.8 19.2 10.8c2.4 0 3.9-1.152 4.8-3.6-1.35 1.8-2.925 2.475-4.5 2.025-.978-.244-1.678-.955-2.452-1.74C15.882 6.31 14.504 4.8 12.001 4.8zM7.2 10.8C4.8 10.8 3.3 11.952 2.4 14.4c1.35-1.8 2.925-2.475 4.5-2.025.978.244 1.678.955 2.452 1.74C11.02 15.29 12.397 16.8 14.9 16.8c2.4 0 3.9-1.152 4.8-3.6-1.35 1.8-2.925 2.475-4.5 2.025-.978-.244-1.678-.955-2.452-1.74C11.082 12.31 9.704 10.8 7.2 10.8z"/>
  </svg>
);

const GsapLogo = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" aria-label="GSAP logo" fill="none">
    <rect width="24" height="24" rx="4" fill="#0AE448"/>
    <text x="3" y="17" fontSize="9" fontWeight="900" fontFamily="Arial, sans-serif" fill="#000">GSAP</text>
  </svg>
);

const FigmaLogo = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" aria-label="Figma logo" fill="none">
    <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83"/>
    <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF"/>
    <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E"/>
    <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262"/>
    <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE"/>
  </svg>
);

const DaVinciLogo = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" aria-label="DaVinci Resolve logo" fill="none">
    <circle cx="12" cy="12" r="11" fill="#1B1B1B" stroke="#333" strokeWidth="0.5"/>
    <circle cx="12" cy="12" r="7" fill="none" stroke="#E8272A" strokeWidth="2"/>
    <circle cx="12" cy="12" r="3.5" fill="#E8272A"/>
    <circle cx="12" cy="12" r="1.5" fill="#fff"/>
  </svg>
);

const Html5Logo = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" aria-label="HTML5 logo" fill="#E34F26">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
  </svg>
);

const JsLogo = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" aria-label="JavaScript logo" fill="none">
    <rect width="24" height="24" fill="#F7DF1E"/>
    <path d="M6.8 19.4l1.66-1c.32.57.61.95 1.23.95.6 0 .98-.23.98-1.14v-6.2h2.04v6.23c0 1.88-1.1 2.74-2.7 2.74-1.45 0-2.3-.75-2.73-1.65M15.6 19.2l1.66-1c.44.7 1 1.22 2.01 1.22.84 0 1.39-.42 1.39-1 0-.7-.56-.95-1.5-1.35l-.52-.22c-1.49-.63-2.47-1.43-2.47-3.1 0-1.55 1.18-2.72 3.02-2.72 1.31 0 2.25.46 2.93 1.65l-1.6 1.03c-.35-.63-.73-.88-1.32-.88-.6 0-.98.38-.98.88 0 .61.38.86 1.26 1.25l.52.22c1.75.75 2.74 1.52 2.74 3.24 0 1.86-1.46 2.87-3.42 2.87-1.92 0-3.16-.91-3.77-2.1" fill="#000"/>
  </svg>
);

const InstagramLogo = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" aria-label="Instagram logo" fill="url(#igGrad)">
    <defs>
      <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433"/>
        <stop offset="25%" stopColor="#e6683c"/>
        <stop offset="50%" stopColor="#dc2743"/>
        <stop offset="75%" stopColor="#cc2366"/>
        <stop offset="100%" stopColor="#bc1888"/>
      </linearGradient>
    </defs>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YouTubeLogo = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" aria-label="YouTube logo" fill="#FF0000">
    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
  </svg>
);

interface ToolItem {
  name: string;
  category: string;
  proficiency: string;
  description: string;
  icon?: string;
  logos?: React.ComponentType[];
}

const tools: ToolItem[] = [
  {
    name: 'React.js / Next.js',
    category: 'WEB DEVELOPMENT',
    proficiency: 'Expert',
    description:
      'Primary frameworks for building high-performance, responsive, and scalable client websites. Deployed on Vercel with fast load times and modern architecture.',
    icon: '/images/new-icons/stack_react_next.webp',
  },
  {
    name: 'Tailwind CSS / GSAP',
    category: 'UI STYLING & ANIMATION',
    proficiency: 'Expert',
    description:
      'Tailwind CSS for pixel-accurate, mobile-first design systems. GSAP for professional-grade scroll-triggered animations and cinematic micro-interactions.',
    icon: '/images/new-icons/stack_tailwind_gsap.webp',
  },

  {
    name: 'DaVinci Resolve',
    category: 'VIDEO EDITING & COLOR GRADING',
    proficiency: '5+ Years',
    description:
      'Core tool for professional video editing, colour grading, and audio post-production. Used for brand videos, Instagram Reels, YouTube content, and product promos.',
    icon: '/images/new-icons/stack_davinci.webp',
  },
  {
    name: 'HTML5 / CSS3 / JavaScript',
    category: 'FRONTEND CORE',
    proficiency: 'ES6+',
    description:
      'Solid foundation in semantic HTML5, modern CSS3, and JavaScript (ES6+) for cross-browser compatible, accessible, and performant web experiences.',
    icon: '/images/new-icons/stack_frontend.webp',
  },
  {
    name: 'Influencer Marketing & Brand Strategy',
    category: 'SOCIAL MEDIA & AGENCY',
    proficiency: 'Agency',
    description:
      'Manage a network of influencers to promote brands across Instagram, YouTube, and social media platforms — connecting businesses with the right voices to maximise reach, drive engagement, and accelerate growth.',
    icon: '/images/new-icons/stack_influencer_agency.webp',
  },
];

export default function StackToolsSection() {
  const sidebarRef = useReveal<HTMLDivElement>({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  const listRef    = useRevealChildren<HTMLDivElement>('.tool-entry', { staggerMs: 90, rootMargin: '0px 0px -40px 0px' });

  return (
    <section id="stack" style={{ background: '#F2F1E6' }}>
      <SectionHeader number="09" title="//Stack & Tools" label="Technologies" />

      <div className="container-padding pb-24 md:pb-32">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Left sidebar — slides in from left */}
          <div className="md:w-1/4">
            <h2
              ref={sidebarRef}
              className="rv-left type-h2 text-foreground md:sticky md:top-32"
            >
              Stack &amp; <span className="type-italic-serif" style={{ fontSize: '0.9em' }}>Tools</span>
            </h2>
          </div>

          {/* Right entries — staggered fade-up */}
          <div ref={listRef} className="md:w-3/4">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="tool-entry rv-up py-8"
                style={{ borderTop: index === 0 ? 'none' : '1px solid var(--border)' }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 md:gap-2">
                  {/* Name + logos row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    {/* Tool logo / icon */}
                    {tool.icon ? (
                      <img
                        src={tool.icon}
                        alt={`${tool.name} icon`}
                        width="48"
                        height="48"
                        style={{
                          objectFit: 'contain',
                          flexShrink: 0,
                        }}
                      />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {tool.logos?.map((Logo, li) => (
                          <span
                            key={li}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '48px',
                              height: '48px',
                              flexShrink: 0,
                            }}
                          >
                            <Logo />
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="type-h3 text-foreground">{tool.name}</h3>
                  </div>
                  <span className="type-mono text-foreground opacity-50">{tool.proficiency}</span>
                </div>
                <p className="type-label text-foreground mt-3 opacity-60">{tool.category}</p>
                <p className="type-body text-foreground mt-4 max-w-full md:max-w-[600px] leading-relaxed">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
