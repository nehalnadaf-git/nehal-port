'use client'

import SectionHeader from '@/components/SectionHeader';
import { MagicText } from '@/components/ui/magic-text';
import { useReveal, useRevealChildren } from '@/hooks/useReveal';

const usps = [
  {
    number: '1',
    title: 'Premium Design Focus',
    description:
      'Every website and interface is crafted to the highest standard — visually compelling, pixel-accurate, and built to reflect the true calibre of your brand.',
  },
  {
    number: '2',
    title: 'Performance-First Engineering',
    description:
      'Speed, accessibility, and SEO are engineered into the foundation — not bolted on afterward. Expect 90+ Lighthouse scores and measurable results from day one.',
  },
  {
    number: '3',
    title: 'End-to-End Creative Delivery',
    description:
      'From strategy and wireframes to development, video production, and launch — one cohesive creative force handles your entire digital presence.',
  },
];

export default function CreativeByMeSection() {
  const cardsRef  = useRevealChildren<HTMLDivElement>('.usp-card', {
    staggerMs: 110,
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  });
  const taglineRef = useReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="creative" className="relative" style={{ background: '#F2F1E6' }}>
      <SectionHeader number="05" title="//Why Nehal" label="Value Propositions" />

      <div className="container-padding pb-32 md:pb-32">
        {/* Headline — MagicText scroll-driven word reveal */}
        <div className="text-center mb-16">
          <MagicText
            text="Why choose Nehal for your next [_project?_]"
            wrapperClassName="justify-center font-extrabold"
            fontSize="clamp(22px, 4vw, 60px)"
            ghostOpacity={0.1}
            offsetStart="start 0.9"
            offsetEnd="start 0.35"
          />
        </div>

        {/* USP Cards — staggered scale-up reveal via IntersectionObserver */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {usps.map((usp) => (
            <div
              key={usp.number}
              className="usp-card rv-scale bg-purple border-3 border-black rounded-xl p-8 shadow-[6px_6px_0px_#000000] group"
              style={{
                /* Ensure hover transform doesn't conflict with rv transition */
                transitionProperty: 'opacity, transform, box-shadow',
                transitionTimingFunction: 'var(--ease-out-expo)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '8px 8px 0px #000000';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '6px 6px 0px #000000';
              }}
            >
              {/* Number badge */}
              <div className="w-10 h-10 rounded-full border-2 border-black bg-black flex items-center justify-center mb-6 group-hover:bg-white transition-colors duration-300">
                <span className="type-mono text-white group-hover:text-black font-bold transition-colors duration-300">{usp.number}</span>
              </div>

              {/* Dot indicators */}
              <div className="flex gap-1 mb-6">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/20'}`}
                  />
                ))}
              </div>

              <h3 className="type-h3 text-white mb-4">{usp.title}</h3>
              <p className="type-body text-white/90 leading-relaxed">{usp.description}</p>
            </div>
          ))}
        </div>

        {/* Tagline — MagicText scroll reveal */}
        <div ref={taglineRef} className="mt-16">
          <MagicText
            text="Precision. Performance. Purpose — Every Project, Every Time."
            wrapperClassName="justify-center text-center tracking-widest"
            fontSize="12px"
            ghostOpacity={0.2}
            offsetStart="start 0.95"
            offsetEnd="start 0.6"
          />
        </div>
      </div>
    </section>
  );
}
