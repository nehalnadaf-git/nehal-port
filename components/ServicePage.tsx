'use client'

/**
 * ServicePage — shared template for all 4 service pages.
 * Design is fully consistent with the homepage:
 * - GrainOverlay + GridLines ambient layers
 * - Navigation + Footer + PortfolioDock
 * - Purple #A855F7 brutalist CTAs (sharp rectangular, border-2, box-shadow)
 * - brutal-selection highlight on hero heading
 * - Section backgrounds alternating #F2F1E6 / #E8E6D8 (matching homepage sections)
 * - Typography via CSS classes: type-h1, type-h2, type-h3, type-body, type-label, type-mono
 * - Sharp square brutalist boxes: rounded-none (0px radius) + 2px black borders + hard drop shadows
 * - GSAP accordion for FAQ
 */

import { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import GrainOverlay from '@/components/GrainOverlay';
import GridLines from '@/components/GridLines';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PortfolioDock from '@/components/PortfolioDock';
import { useReveal, useRevealChildren } from '@/hooks/useReveal';
import { SEO } from '@/lib/seo';
import type { Service } from '@/lib/services';
import { services } from '@/lib/services';
import { Diamond, ArrowUpRight, Plus } from 'lucide-react';

const DaVinciLogo = () => (
  <Image
    src="/images/new-icons/stack_davinci.webp"
    alt="DaVinci Resolve logo"
    width={24}
    height={24}
    className="object-contain inline-block flex-shrink-0"
  />
);

function splitParagraphs(text: string): string[] {
  return text.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
}

export default function ServicePage({ service }: { service: Service }) {
  useSmoothScroll();

  const paragraphs = splitParagraphs(service.fullDescription);

  const heroRef      = useReveal<HTMLDivElement>({ threshold: 0.1 });
  const includedRef  = useReveal<HTMLDivElement>({ threshold: 0.08 });
  const descRef      = useReveal<HTMLDivElement>({ threshold: 0.08 });
  const toolsRef     = useRevealChildren<HTMLDivElement>('.sp-tool', { staggerMs: 40, threshold: 0.1 });
  const whyRef       = useRevealChildren<HTMLDivElement>('.sp-why', { staggerMs: 80, threshold: 0.08 });
  const relatedRef   = useRevealChildren<HTMLDivElement>('.sp-related', { staggerMs: 80, threshold: 0.1 });
  const ctaRef       = useReveal<HTMLDivElement>({ threshold: 0.1 });

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = useCallback((i: number) => {
    if (openFaq !== null && faqRefs.current[openFaq]) {
      gsap.to(faqRefs.current[openFaq], { height: 0, duration: 0.3, ease: 'power2.inOut' });
    }
    if (openFaq === i) { setOpenFaq(null); return; }
    setOpenFaq(i);
    const el = faqRefs.current[i];
    if (el) {
      gsap.set(el, { height: 'auto' });
      const h = el.offsetHeight;
      gsap.fromTo(el, { height: 0 }, { height: h, duration: 0.38, ease: 'power3.out' });
    }
  }, [openFaq]);

  return (
    <>
      <GrainOverlay />
      <GridLines />
      <Navigation />

      <main className="relative z-10">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          id="service-hero"
          className="container-padding"
          style={{ background: '#F2F1E6', paddingTop: 'clamp(110px, 14vw, 160px)', paddingBottom: 'clamp(64px, 8vw, 120px)' }}
          aria-labelledby="service-heading"
        >
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 type-mono text-foreground/40" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li><Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link></li>
              <li>/</li>
              <li>Services</li>
              <li>/</li>
              <li aria-current="page" style={{ opacity: 0.7 }}>{service.name}</li>
            </ol>
          </nav>

          <div ref={heroRef} className="rv-up max-w-4xl">
            <p className="type-mono opacity-50 mb-4 tracking-widest">// Service</p>
            <h1 id="service-heading" className="type-h2 text-foreground">
              {service.name}{' '}
              <span className="brutal-selection">
                <span className="brutal-selection-handle-left" />
                <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                  Service
                </span>
                <span className="brutal-selection-handle-right" />
              </span>
            </h1>
            <p className="type-body-lg text-foreground/60 mt-5 max-w-xl leading-relaxed">
              {service.shortDescription}
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <a
                href={SEO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal btn-brutal-primary"
              >
                ENQUIRE ON WHATSAPP
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

        {/* ── What's Included ──────────────────────────────────────────────── */}
        <section
          className="container-padding"
          style={{ background: '#E8E6D8', paddingTop: 'clamp(64px, 8vw, 112px)', paddingBottom: 'clamp(64px, 8vw, 112px)' }}
          aria-label="Deliverables"
        >
          <div ref={includedRef} className="rv-up grid md:grid-cols-2 gap-12 max-w-5xl">
            <div>
              <p className="type-mono opacity-50 mb-4 tracking-widest">// Deliverables</p>
              <h2 className="type-h2 text-foreground">What&apos;s Included</h2>
            </div>
            <ul className="space-y-4" aria-label="Deliverables list">
              {service.whatIsIncluded.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Diamond size={12} className="opacity-50 flex-shrink-0 mt-1" />
                  <span className="type-body text-foreground/80 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Full Description ─────────────────────────────────────────────── */}
        <section
          className="container-padding"
          style={{ background: '#F2F1E6', paddingTop: 'clamp(64px, 8vw, 112px)', paddingBottom: 'clamp(64px, 8vw, 112px)' }}
          aria-label="How this service works"
        >
          <div ref={descRef} className="rv-up grid md:grid-cols-2 gap-12 md:gap-20 max-w-5xl">
            <div>
              <p className="type-mono opacity-50 mb-4 tracking-widest">// The detail</p>
              <h2 className="type-h2 text-foreground">How this service works</h2>
            </div>
            <div className="space-y-5">
              {paragraphs.map((para, i) => (
                <p key={i} className="type-body text-foreground/75 leading-relaxed">{para}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tools ────────────────────────────────────────────────────────── */}
        <section
          className="container-padding"
          style={{ background: '#E8E6D8', paddingTop: 'clamp(64px, 8vw, 112px)', paddingBottom: 'clamp(64px, 8vw, 112px)' }}
          aria-label="Tools and technology"
        >
          <p className="type-mono opacity-50 mb-4 tracking-widest">// Tools &amp; technology</p>
          <h2 className="type-h2 text-foreground mb-10">Used on every {service.name} project</h2>
          <div ref={toolsRef} className="flex flex-wrap gap-3">
            {service.toolsUsed.map(tool => (
              <span
                key={tool}
                className="sp-tool rv-up badge-brutal"
              >
                {tool === 'DaVinci Resolve' && <DaVinciLogo />}
                {tool}
              </span>
            ))}
          </div>
        </section>

        {/* ── Why Nehal Nadaf ──────────────────────────────────────────────── */}
        <section
          className="container-padding"
          style={{ background: '#F2F1E6', paddingTop: 'clamp(64px, 8vw, 112px)', paddingBottom: 'clamp(64px, 8vw, 112px)' }}
          aria-label="Why choose Nehal Nadaf"
        >
          <p className="type-mono opacity-50 mb-4 tracking-widest">// Why choose</p>
          <h2 className="type-h2 text-foreground mb-12 md:mb-16">Why Nehal Nadaf for {service.name}</h2>

          <div ref={whyRef} className="grid sm:grid-cols-2 gap-6 max-w-4xl">
            {service.whyChoose.map(({ title, description }) => (
              <div
                key={title}
                className="sp-why rv-up bg-[#F2F1E6] border-2 border-black rounded-none p-6 sm:p-8 shadow-[4px_4px_0px_#000000] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000000]"
              >
                <h3 className="type-h3 text-foreground mb-3">{title}</h3>
                <p className="type-body text-foreground/65 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <section
          className="container-padding"
          style={{ background: '#E8E6D8', paddingTop: 'clamp(64px, 8vw, 112px)', paddingBottom: 'clamp(64px, 8vw, 112px)' }}
          aria-label="FAQ"
        >
          <p className="type-mono opacity-50 mb-4 tracking-widest">// FAQ</p>
          <h2 className="type-h2 text-foreground mb-12">Common questions</h2>

          <div className="max-w-3xl" role="list">
            {service.faqs.map((faq, i) => (
              <div key={i} role="listitem" className="border-b border-black/15">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-5 text-left"
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-${i}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '20px 0', minHeight: '56px' }}
                >
                  <div className="flex items-center gap-4 min-w-0 pr-4">
                    <span className="type-mono text-foreground/30 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <span className="type-h3 text-foreground text-left leading-snug">{faq.question}</span>
                  </div>
                  <Plus
                    size={16}
                    className={`text-foreground transition-transform duration-300 flex-shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}
                  />
                </button>
                <div
                  id={`faq-${i}`}
                  ref={el => { faqRefs.current[i] = el; }}
                  className="overflow-hidden"
                  style={{ height: 0 }}
                >
                  <div className="pb-5 sm:pl-10">
                    <p className="type-body text-foreground/70 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related Services ─────────────────────────────────────────────── */}
        {service.relatedServices.length > 0 && (
          <section
            className="container-padding"
            style={{ background: '#F2F1E6', paddingTop: 'clamp(64px, 8vw, 112px)', paddingBottom: 'clamp(64px, 8vw, 112px)' }}
            aria-label="Related services"
          >
            <p className="type-mono opacity-50 mb-4 tracking-widest">// Also available</p>
            <h2 className="type-h2 text-foreground mb-10">Related services</h2>
            <div ref={relatedRef} className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {service.relatedServices.map(slug => {
                const rel = services.find(s => s.slug === slug);
                if (!rel) return null;
                return (
                  <Link
                    key={slug}
                    href={`/services/${slug}`}
                    className="sp-related rv-up group block bg-[#F2F1E6] border-2 border-black rounded-none p-6 shadow-[4px_4px_0px_#000000] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000000]"
                    style={{ textDecoration: 'none' }}
                  >
                    <h3 className="type-h3 text-foreground mb-2 group-hover:underline">{rel.name}</h3>
                    <p className="type-body text-foreground/60">{rel.shortDescription.slice(0, 90)}…</p>
                    <div className="flex items-center gap-1 mt-4 type-label text-foreground/70 font-bold">
                      VIEW <ArrowUpRight size={12} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section
          id="service-cta"
          className="container-padding py-24 md:py-32 text-center"
          style={{ background: '#E8E6D8' }}
          aria-label="Get started"
        >
          <div ref={ctaRef} className="rv-up max-w-2xl mx-auto">
            <p className="type-mono opacity-50 mb-4 tracking-widest">// Ready to start</p>
            <h2 className="type-h2 text-foreground mb-4">
              Let's work{' '}
              <span className="brutal-selection">
                <span className="brutal-selection-handle-left" />
                <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>together</span>
                <span className="brutal-selection-handle-right" />
              </span>
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
              <a
                href={`mailto:${SEO.email}`}
                className="btn-brutal btn-brutal-ghost"
              >
                EMAIL ME
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <PortfolioDock />
    </>
  );
}
