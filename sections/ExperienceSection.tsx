'use client'

import SectionHeader from '@/components/SectionHeader';
import { useReveal, useRevealChildren } from '@/hooks/useReveal';

const experiences = [
  {
    company: 'Self-Employed — Freelance Studio',
    logo: '/images/new-icons/exp_freelance_studio.webp',
    role: 'WEB DEVELOPER • UI/UX DESIGNER • VIDEO EDITOR',
    date: '2021 - PRESENT',
    description:
      'Designed, engineered, and deployed 8+ professional business websites across automotive detailing, dental healthcare, food service, and home-appliance industries. Built performance-optimised, mobile-first sites using React.js, Next.js, Tailwind CSS, and GSAP — deployed on Vercel. Concurrently delivered 5+ years of professional video editing in DaVinci Resolve: brand videos, Instagram Reels, YouTube content, and product promos with advanced colour grading and audio mastering.',
  },
  {
    company: 'Social Media Agency',
    logo: '/images/new-icons/exp_social_media_agency.webp',
    role: 'AGENCY FOUNDER • INFLUENCER MARKETING • BRAND STRATEGY',
    date: '2023 - PRESENT',
    description:
      'Run a full-service social media agency delivering influencer marketing, brand strategy, video production, graphic design, and website development. Manage and collaborate with a network of influencers to promote businesses across Instagram, YouTube, and social platforms — connecting brands with the right voices to maximise reach, engagement, and business growth. End-to-end creative production for clients across multiple industries.',
  },
];

export default function ExperienceSection() {
  const sidebarRef = useReveal<HTMLDivElement>({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  const listRef    = useRevealChildren<HTMLDivElement>('.exp-entry', { staggerMs: 120, rootMargin: '0px 0px -40px 0px' });

  return (
    <section className="bg-background text-foreground">
      <SectionHeader number="07" title="//Experience" label="2021 - Present" />

      <div className="container-padding pb-24 md:pb-32">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Left sidebar — slides in from left */}
          <div className="md:w-1/4">
            <h2
              ref={sidebarRef}
              className="rv-left type-h2 text-foreground md:sticky md:top-32 text-left"
            >
              Experi<span className="type-italic-serif" style={{ fontSize: '0.9em' }}>ence</span>
            </h2>
          </div>

          {/* Right entries — staggered fade-up */}
          <div ref={listRef} className="md:w-3/4">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="exp-entry rv-up py-8"
                style={{ borderTop: index === 0 ? 'none' : '2px solid #000000' }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      width="48"
                      height="48"
                      style={{
                        objectFit: 'contain',
                        flexShrink: 0,
                      }}
                    />
                    <h3 className="type-h3 text-foreground">{exp.company}</h3>
                  </div>
                  <span className="type-mono text-foreground opacity-50">{exp.date}</span>
                </div>
                <p className="type-label text-foreground mt-3 opacity-60">{exp.role}</p>
                <p className="type-body text-foreground mt-4 max-w-full md:max-w-[500px] leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
