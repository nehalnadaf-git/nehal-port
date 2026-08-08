'use client'

import { MagicText } from '@/components/ui/magic-text';
import { useReveal } from '@/hooks/useReveal';

export default function CTASection() {
  const taglineRef = useReveal<HTMLParagraphElement>({ threshold: 0.2, rootMargin: '0px 0px -30px 0px' });
  const btnRef     = useReveal<HTMLAnchorElement>({ threshold: 0.2, rootMargin: '0px 0px -30px 0px' });
  const imageRef   = useReveal<HTMLDivElement>({ threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

  return (
    <section id="cta" className="container-padding py-24 md:py-32 text-center" style={{ background: '#F2F1E6' }}>
      {/* CTA Headline — MagicText scroll-driven word reveal */}
      <MagicText
        text="Let's work [_together_]"
        wrapperClassName="justify-center font-extrabold"
        fontSize="clamp(36px, 8vw, 120px)"
        ghostOpacity={0.08}
        offsetStart="start 0.9"
        offsetEnd="start 0.35"
      />

      {/* Tagline */}
      <p
        ref={taglineRef}
        className="rv-up type-quote text-foreground/60 mt-4 mb-0"
        style={{ '--rv-delay': '60ms' } as React.CSSProperties}
      >
        Every great project starts with a <em>conversation.</em>
      </p>

      {/* CTA Button */}
      <a
        ref={btnRef}
        href="https://wa.me/916363278962?text=Hi%20Nehal%2C%20I%20am%20interested%20in%20working%20with%20you."
        target="_blank"
        rel="noopener noreferrer"
        className="rv-up btn-brutal btn-brutal-primary mt-10"
        style={{
          '--rv-delay': '140ms',
        } as React.CSSProperties}
      >
        CONTACT NOW
      </a>

      {/* Portrait — simple fade-up reveal */}
      <div
        ref={imageRef}
        className="rv-up mt-16 md:mt-24 mx-auto max-w-4xl rounded-xl overflow-hidden border-3 border-black shadow-[8px_8px_0px_#000000]"
        style={{ '--rv-delay': '100ms' } as React.CSSProperties}
      >
        <img
          src="/images/new-images-nehal/eer.webp"
          alt="Nehal Nadaf — Let's Work Together"
          className="w-full h-auto object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
