'use client'

import { useRef } from 'react';
import { MagicText } from '@/components/ui/magic-text';

export default function AboutIntroSection() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section
      id="about"
      ref={ref}
      className="container-padding py-24 md:py-32"
      style={{ background: '#E8E6D8' }}
    >
      {/* Large headline — scroll-driven word reveal */}
      <MagicText
        text="I'm Nehal Nadaf, based in [Hubli,] [Karnataka.]"
        wrapperClassName="justify-center text-center font-extrabold !leading-[1.05] tracking-tight"
        fontSize="clamp(28px, 6vw, 96px)"
        ghostOpacity={0.1}
        offsetStart="start 0.9"
        offsetEnd="start 0.3"
      />

      {/* Sub-copy — scroll-driven word reveal */}
      <div className="mt-4 max-w-[500px] mx-auto">
        <MagicText
          text="Multi-disciplinary creative professional with 5+ years of freelance expertise — spanning premium web development, UI/UX design, and cinematic video production."
          wrapperClassName="justify-center text-center leading-relaxed"
          fontSize="clamp(14px, 1.4vw, 16px)"
          ghostOpacity={0.2}
          offsetStart="start 0.85"
          offsetEnd="start 0.2"
        />
      </div>
    </section>
  );
}
