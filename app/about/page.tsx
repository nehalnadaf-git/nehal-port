'use client'

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import GrainOverlay from '@/components/GrainOverlay';
import GridLines from '@/components/GridLines';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PortfolioDock from '@/components/PortfolioDock';
import { useReveal, useRevealChildren } from '@/hooks/useReveal';
import { SEO } from '@/lib/seo';
import { MapPin, Globe, Diamond, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

/* ── Service cards using exact homepage webp icons ──────────────────────────── */
const SERVICES = [
  {
    logo: '/images/new-icons/stack_react_next.webp',
    name: 'Web Development',
    slug: 'web-development',
    description: 'Custom React.js and Next.js websites engineered for speed, SEO, and long-term performance. No templates — every build starts from a clean codebase.',
  },
  {
    logo: '/images/new-icons/agency_graphic_designers.webp',
    name: 'UI/UX Design',
    slug: 'ui-ux-design',
    description: 'High-fidelity prototypes and design systems built around conversion, clarity, and brand precision. Design and development in one.',
  },
  {
    logo: '/images/new-icons/stack_davinci.webp',
    name: 'Video Editing & Production',
    slug: 'video-editing',
    description: 'Cinematic brand films, Instagram Reels, YouTube content, and product promos. Edited and colour-graded in DaVinci Resolve.',
  },
  {
    logo: '/images/new-icons/exp_social_media_agency.webp',
    name: 'Social Media Marketing',
    slug: 'social-media-marketing',
    description: 'Full content creation, account management, and Karnataka creator collaborations averaging 50K–100K+ views on Instagram.',
  },
];

const TOOLS = ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'DaVinci Resolve', 'Vercel'];

const LOCATIONS = [
  { icon: MapPin,  label: 'Hubli–Dharwad', sub: 'North Karnataka, India' },
  { icon: Globe,   label: 'India — Remote', sub: 'Full remote workflow' },
  { icon: Diamond, label: 'International',  sub: 'Clients worldwide' },
];

export default function AboutPage() {
  useSmoothScroll();

  const heroRef     = useReveal<HTMLDivElement>({ threshold: 0.1 });
  const storyRef    = useReveal<HTMLDivElement>({ threshold: 0.08 });
  const servicesRef = useRevealChildren<HTMLDivElement>('.about-svc-card', { staggerMs: 80, threshold: 0.08 });
  const toolsRef    = useRevealChildren<HTMLDivElement>('.about-tool', { staggerMs: 45, threshold: 0.1 });
  const locRef      = useRevealChildren<HTMLDivElement>('.about-loc', { staggerMs: 70, threshold: 0.1 });
  const ctaRef      = useReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <>
      <GrainOverlay />
      <GridLines />
      <Navigation />

      <main className="relative z-10">

        {/* ── Hero ── */}
        <section
          id="about-hero"
          className="container-padding"
          style={{ background: '#F2F1E6', paddingTop: 'clamp(110px, 14vw, 160px)', paddingBottom: 'clamp(64px, 8vw, 120px)' }}
          aria-labelledby="about-heading"
        >
          <div ref={heroRef} className="rv-up max-w-4xl">
            <p className="type-mono opacity-50 mb-4 tracking-widest">// About</p>
            <h1
              id="about-heading"
              className="type-h2 text-foreground"
            >
              About{' '}
              <span className="brutal-selection">
                <span className="brutal-selection-handle-left" />
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}>
                  Nehal Nadaf
                </span>
                <span className="brutal-selection-handle-right" />
              </span>
            </h1>
            <p className="type-body-lg text-foreground/70 mt-6 max-w-2xl leading-relaxed">
              Multi-disciplinary creative professional specialising in web development, UI/UX
              design, video editing, and social media marketing. Based in Hubli, Karnataka —
              working with clients across India and internationally.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-x-12 gap-y-6 mt-10">
              {[
                { num: '5+',   label: 'Years of video experience' },
                { num: '4',    label: 'Service disciplines' },
                { num: '100%', label: 'Custom codebase builds' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p className="type-h2 text-foreground" style={{ lineHeight: 1 }}>{num}</p>
                  <p className="type-label text-foreground/50 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Story ── */}
        <section
          id="about-story"
          className="container-padding"
          style={{ background: '#E8E6D8', paddingTop: 'clamp(64px, 8vw, 112px)', paddingBottom: 'clamp(64px, 8vw, 112px)' }}
          aria-label="Background and story"
        >
          <div ref={storyRef} className="rv-up grid md:grid-cols-2 gap-12 md:gap-20 max-w-5xl">
            <div>
              <p className="type-mono opacity-50 mb-4 tracking-widest">// How it started</p>
              <h2 className="type-h2 text-foreground">From Hubli to clients worldwide</h2>
            </div>
            <div className="space-y-5">
              <p className="type-body text-foreground/75 leading-relaxed">
                The practice began in 2020 with a simple observation: businesses in Hubli and the
                wider Karnataka region needed digital presence that matched international quality
                standards, and most existing options were either template-based, expensive, or both.
              </p>
              <p className="type-body text-foreground/75 leading-relaxed">
                Starting with web development — custom React.js sites for local businesses — the
                quality of the work created demand for adjacent services. Video editing for social
                media, social media management for newly-launched brands, influencer marketing for
                businesses that needed reach beyond their own channels.
              </p>
              <p className="type-body text-foreground/75 leading-relaxed">
                Today, the practice has grown into a full creative agency with
                graphic designers, videographers, and content specialists — capable of handling
                end-to-end creative production for businesses across Karnataka and nationally.
                Every engagement carries the same standard: no shortcuts, no generic templates.
              </p>
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section
          id="about-services"
          className="container-padding"
          style={{ background: '#F2F1E6', paddingTop: 'clamp(64px, 8vw, 112px)', paddingBottom: 'clamp(64px, 8vw, 112px)' }}
          aria-label="Services"
        >
          <p className="type-mono opacity-50 mb-4 tracking-widest">// What I do</p>
          <h2 className="type-h2 text-foreground mb-12 md:mb-16">Four disciplines. One standard.</h2>

          <div ref={servicesRef} className="grid sm:grid-cols-2 gap-6">
            {SERVICES.map(({ logo, name, slug, description }) => (
              <Link
                key={slug}
                href={`/services/${slug}`}
                className="about-svc-card rv-up group block bg-[#F2F1E6] border-2 border-black rounded-none p-6 sm:p-8 shadow-[4px_4px_0px_#000000] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000000]"
                style={{ textDecoration: 'none' }}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={logo}
                    alt={`${name} icon`}
                    width="48"
                    height="48"
                    loading="lazy"
                    decoding="async"
                    style={{ objectFit: 'contain', flexShrink: 0 }}
                  />
                  <div>
                    <h3 className="type-h3 text-foreground mb-2 group-hover:underline">{name}</h3>
                    <p className="type-body text-foreground/65 leading-relaxed">{description}</p>
                    <div className="flex items-center gap-1 mt-4 type-label text-foreground/70 font-bold">
                      VIEW SERVICE <ArrowUpRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Tools ── */}
        <section
          style={{ background: '#E8E6D8', paddingTop: 'clamp(64px, 8vw, 112px)', paddingBottom: 'clamp(64px, 8vw, 112px)' }}
          className="container-padding"
          aria-label="Tools and technology"
        >
          <p className="type-mono opacity-50 mb-4 tracking-widest">// Tools &amp; technology</p>
          <h2 className="type-h2 text-foreground mb-10">The stack used by world-class teams</h2>
          <div ref={toolsRef} className="flex flex-wrap gap-3">
            {TOOLS.map(tool => (
              <span
                key={tool}
                className="about-tool rv-up badge-brutal"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        {/* ── Location ── */}
        <section
          style={{ background: '#F2F1E6', paddingTop: 'clamp(64px, 8vw, 112px)', paddingBottom: 'clamp(64px, 8vw, 112px)' }}
          className="container-padding"
          aria-label="Location"
        >
          <p className="type-mono opacity-50 mb-4 tracking-widest">// Where I work</p>
          <h2 className="type-h2 text-foreground mb-12">Hubli-based. India-ready. Worldwide-available.</h2>
          <div ref={locRef} className="grid sm:grid-cols-3 gap-6 max-w-4xl">
            {LOCATIONS.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="about-loc rv-up bg-[#E8E6D8] border-2 border-black rounded-none p-6 shadow-[4px_4px_0px_#000000] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000000]"
              >
                <Icon size={16} className="text-foreground/70 mb-3" />
                <p className="type-h3 text-foreground mb-1">{label}</p>
                <p className="type-mono text-foreground/60 text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          id="about-cta"
          className="container-padding py-24 md:py-32 text-center"
          style={{ background: '#E8E6D8' }}
          aria-label="Contact"
        >
          <div ref={ctaRef} className="rv-up max-w-2xl mx-auto">
            <p className="type-mono opacity-50 mb-4 tracking-widest">// Let's talk</p>
            <h2 className="type-h2 text-foreground mb-6">
              Let's build something{' '}
              <span className="brutal-selection">
                <span className="brutal-selection-handle-left" />
                <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>exceptional</span>
                <span className="brutal-selection-handle-right" />
              </span>
              {' '}together.
            </h2>
            <p className="type-quote text-foreground/60 mb-10">
              Every great project starts with a <em>conversation.</em>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={SEO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal btn-brutal-primary"
              >
                WHATSAPP ME
              </a>
              <Link
                href="/contact"
                className="btn-brutal btn-brutal-ghost"
              >
                CONTACT FORM
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <PortfolioDock />
    </>
  );
}
