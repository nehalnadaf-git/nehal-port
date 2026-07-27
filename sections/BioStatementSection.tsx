'use client'

import { MagicText } from '@/components/ui/magic-text';
import { useReveal } from '@/hooks/useReveal';

export default function BioStatementSection() {
  const taglineRef = useReveal<HTMLParagraphElement>({ threshold: 0.2, rootMargin: '0px 0px -30px 0px' });
  const btnRef     = useReveal<HTMLDivElement>({ threshold: 0.2, rootMargin: '0px 0px -30px 0px' });
  const imageRef   = useReveal<HTMLDivElement>({ threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

  return (
    <section className="container-padding py-16 md:py-24" style={{ background: '#E8E6D8' }}>
      {/* Main statement — scroll-driven word reveal */}
      <MagicText
        text="I build high-performance websites, design immersive digital experiences, and produce cinematic video content — where precision engineering meets creative [_vision._]"
        wrapperClassName="text-center font-extrabold max-w-[800px] mx-auto tracking-tight justify-center"
        fontSize="clamp(15px, 2.2vw, 24px)"
        ghostOpacity={0.12}
        offsetStart="start 0.9"
        offsetEnd="start 0.2"
      />

      {/* Body paragraph — scroll-driven word reveal */}
      <div className="mt-8">
        <MagicText
          text="Nehal Nadaf is a multi-disciplinary creative professional specialising in premium web development, UI/UX design, and professional video production. Every project is crafted from first principles — performance-optimised, visually refined, and strategically positioned to drive real business outcomes."
          wrapperClassName="text-center max-w-[620px] mx-auto justify-center"
          fontSize="clamp(14px, 1.5vw, 16px)"
          ghostOpacity={0.18}
          offsetStart="start 0.85"
          offsetEnd="start 0.15"
        />
      </div>

      {/* Playfair italic pull quote */}
      <p
        ref={taglineRef}
        className="rv-up type-quote text-center text-foreground max-w-[500px] mx-auto mt-10 opacity-75"
      >
        "Precision-crafted websites. Immersive digital experiences. Content that converts."
      </p>

      {/* CTA button */}
      <div
        ref={btnRef}
        className="rv-up text-center mt-10"
        style={{ '--rv-delay': '80ms' } as React.CSSProperties}
      >
        <a
          href="mailto:nehalnadaff@gmail.com?subject=Resume%20Request&body=Hi%20Nehal%2C%20I%20would%20like%20to%20request%20your%20resume."
          className="type-label inline-block bg-purple border-2 border-black rounded-xl px-8 py-4 text-white shadow-[4px_4px_0px_0px_#000000]"
          style={{
            transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s cubic-bezier(0.16,1,0.3,1)',
          }}
        onMouseEnter={e => {
          if (!window.matchMedia('(hover: hover)').matches) return;
          e.currentTarget.style.transform = 'translate(-1px, -1px)';
          e.currentTarget.style.boxShadow = '5px 5px 0px 0px #000000';
        }}
        onMouseLeave={e => {
          if (!window.matchMedia('(hover: hover)').matches) return;
          e.currentTarget.style.transform = 'translate(0, 0)';
          e.currentTarget.style.boxShadow = '4px 4px 0px 0px #000000';
        }}
        >
          Download Resume
        </a>
      </div>

      {/* Portrait — simple fade-up reveal */}
      <div
        ref={imageRef}
        className="rv-up mt-16 md:mt-24 rounded-xl overflow-hidden max-w-4xl mx-auto border-3 border-black shadow-[8px_8px_0px_#000000]"
        style={{ '--rv-delay': '100ms' } as React.CSSProperties}
      >
        <img
          src="/images/new-images-nehal/IMG_20251109_125745.webp"
          alt="Nehal Nadaf — Professional portrait"
          className="w-full h-auto object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
