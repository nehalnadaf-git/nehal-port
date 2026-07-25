'use client'

import SectionHeader from '@/components/SectionHeader';
import { MagicText } from '@/components/ui/magic-text';

export default function WhoAmISection() {
  return (
    <section className="bg-background text-foreground">
      <SectionHeader number="03" title="//Who Am I" label="Since 2021" />

      <div className="container-padding text-center pb-8">
        <MagicText
          text="More about [_Nehal Nadaf_]"
          wrapperClassName="justify-center font-extrabold"
          fontSize="clamp(28px, 5vw, 72px)"
          ghostOpacity={0.1}
          offsetStart="start 0.9"
          offsetEnd="start 0.4"
        />
      </div>
    </section>
  );
}
