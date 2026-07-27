'use client';

import SectionHeader from '@/components/SectionHeader';
import { useRevealChildren } from '@/hooks/useReveal';

const stats = [
  {
    code: '01',
    heading: 'DIRECT',
    label: 'Freelance Delivery',
  },
  {
    code: '02',
    heading: 'RANK',
    label: 'Top Ranking SEO',
  },
  {
    code: '03',
    heading: 'CUSTOM',
    label: 'Brand Identity',
  },
  {
    code: '04',
    heading: 'IMPACT',
    label: 'Value Over Service',
  },
];

export default function StatsSection() {
  const listRef = useRevealChildren<HTMLDivElement>('.stat-item', {
    staggerMs: 100,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.15,
  });

  return (
    <section style={{ background: '#E8E6D8' }}>
      <SectionHeader number="06" title="//Stats" label="Outcomes" />

      <div className="container-padding pb-24 md:pb-32">
        <div ref={listRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((item) => (
            <div key={item.code} className="stat-item rv-scale text-left group">
              {/* Brutalist Mono Index Code */}
              <span className="type-mono text-xs font-bold tracking-widest text-foreground/40 block mb-2">
                //{item.code}
              </span>

              {/* Bold Brutalist Heading */}
              <h3 className="type-h2 text-foreground font-black tracking-tight uppercase leading-none">
                {item.heading}
              </h3>

              {/* Brutalist Sub-label */}
              <p className="type-label text-foreground opacity-75 font-bold tracking-wider text-xs md:text-sm uppercase mt-4">
                {item.label}
              </p>

              {/* Subtle Brutalist Accent Line */}
              <div className="h-[2px] w-6 bg-foreground/20 mt-3 group-hover:w-16 group-hover:bg-foreground transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}







