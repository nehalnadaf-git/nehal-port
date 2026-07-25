'use client'

import SectionHeader from '@/components/SectionHeader';
import { useReveal, useRevealChildren } from '@/hooks/useReveal';
import { MagicText } from '@/components/ui/magic-text';

const agencyRoles = [
  {
    role: 'Graphic Designers',
    logo: '/images/new-icons/agency_graphic_designers.webp',
    description:
      'Specialist graphic designers craft compelling brand identities, social media creatives, and print-ready materials — ensuring visual consistency and premium quality across every touchpoint.',
  },
  {
    role: 'Video Editors',
    logo: '/images/new-icons/agency_video_editors.webp',
    description:
      'Professional video editors working in DaVinci Resolve deliver colour-graded brand films, Instagram Reels, YouTube content, and product promos — with precision audio post-production.',
  },
  {
    role: 'Videographers',
    logo: '/images/new-icons/agency_videographers.webp',
    description:
      'Experienced videographers handle on-location shoots, product captures, and cinematic production — translating your brand story into high-impact visual narratives.',
  },
  {
    role: 'Content Scriptwriters',
    logo: '/images/new-icons/agency_scriptwriters.webp',
    description:
      'Dedicated scriptwriters develop compelling narratives for video content, brand campaigns, and social media — ensuring every piece of content is strategic, engaging, and conversion-focused.',
  },
  {
    role: 'Influencer Management',
    logo: '/images/new-icons/agency_influencer_management.webp',
    description:
      'We manage and collaborate with a network of influencers to promote your brand across social media platforms — connecting you with the right voices to maximise reach, drive engagement, and accelerate business growth.',
  },
];

export default function AgencySection() {
  const sidebarRef  = useReveal<HTMLDivElement>({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  const blurbRef    = useReveal<HTMLParagraphElement>({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  const listRef     = useRevealChildren<HTMLDivElement>('.agency-entry', { staggerMs: 100, rootMargin: '0px 0px -30px 0px' });

  return (
    <section style={{ background: '#E8E6D8' }}>
      <SectionHeader number="08" title="//The Agency" label="Our Team" />

      <div className="container-padding pb-24 md:pb-32">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Left sidebar — slides from left */}
          <div className="md:w-1/4">
            <div ref={sidebarRef} className="rv-left md:sticky md:top-32">
              <div className="mb-4">
                <MagicText
                  text="More Than a [_Freelancer_]"
                  wrapperClassName="font-extrabold type-h2 text-foreground text-left"
                />
              </div>
              <p className="type-body text-foreground mt-4 leading-relaxed max-w-[200px]">
                Behind Nehal is a full creative agency — not just one person.
              </p>
            </div>
          </div>

          {/* Right entries */}
          <div className="md:w-3/4">
            {/* Intro blurb — fades up on its own trigger */}
            <p ref={blurbRef} className="rv-up type-body-lg text-foreground max-w-full md:max-w-[600px] mb-8 md:mb-10">
               We operate as a full creative agency — offering influencer marketing, brand strategy,
              social media content, video production, graphic design, and web development. Beyond
              production, we connect brands with the right influencers to drive reach, engagement,
              and growth across social platforms.
            </p>

            {/* Role entries — staggered reveal */}
            <div ref={listRef}>
              {agencyRoles.map((item, index) => (
                <div
                  key={index}
                  className="agency-entry rv-up py-8 first:border-t-0"
                  style={{ borderTop: index === 0 ? 'none' : '2px solid #000000' }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={item.logo}
                        alt={`${item.role} logo`}
                        width="48"
                        height="48"
                        style={{
                          objectFit: 'contain',
                          flexShrink: 0,
                        }}
                      />
                      <h3 className="type-h3 text-foreground">{item.role}</h3>
                    </div>
                    <span className="type-mono text-foreground flex-shrink-0 opacity-40">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="type-body text-foreground mt-4 max-w-full md:max-w-[500px] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
