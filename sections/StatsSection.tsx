'use client'

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import SectionHeader from '@/components/SectionHeader';
import { useRevealChildren } from '@/hooks/useReveal';

const stats = [
  { value: 8,   suffix: '+', label: 'Client Websites' },
  { value: 5,   suffix: '+', label: 'Years of Experience' },
  { value: 3,   suffix: '',  label: 'Service Verticals' },
  { value: 100, suffix: '%', label: 'Freelance Delivery' },
];

export default function StatsSection() {
  const gridRef              = useRef<HTMLDivElement>(null);
  const [displayValues, setDisplayValues] = useState(stats.map(() => 0));
  const [showSuffix,    setShowSuffix]    = useState(stats.map(() => false));
  const [triggered,     setTriggered]     = useState(false);

  // Reveal children via IntersectionObserver
  const listRef = useRevealChildren<HTMLDivElement>('.stat-item', {
    staggerMs: 100,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.15,
  });

  // Counter trigger — IntersectionObserver fires correctly with Lenis smooth scroll
  // (GSAP ScrollTrigger reads window.scrollY which Lenis intercepts, causing late triggers)
  useEffect(() => {
    const el = gridRef.current;
    if (!el || triggered) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          setTriggered(true);

          stats.forEach((stat, index) => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: stat.value,
              duration: 2.2,
              ease: 'power2.out',
              onUpdate: () => {
                setDisplayValues(prev => {
                  const next = [...prev];
                  next[index] = Math.round(obj.val);
                  return next;
                });
              },
              onComplete: () => {
                setShowSuffix(prev => {
                  const next = [...prev];
                  next[index] = true;
                  return next;
                });
              },
            });
          });
        });
      },
      // 0.15 threshold fires reliably on small phone viewports (0.3 could never trigger)
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <section style={{ background: '#E8E6D8' }}>
      <SectionHeader number="06" title="//Stats" label="Numbers" />

      <div className="container-padding pb-24 md:pb-32">
        {/* Invisible sentinel — IntersectionObserver watches this to start counter */}
        <div ref={gridRef} style={{ height: 0 }} />
        <div ref={listRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item rv-scale text-center md:text-left">
              <div
                className="type-h1 text-foreground"
                style={{ fontVariantNumeric: 'tabular-nums', minWidth: '5ch', display: 'inline-block' }}
              >
                {displayValues[index]}
                <span
                  className="transition-opacity duration-500"
                  style={{ opacity: showSuffix[index] ? 1 : 0 }}
                >
                  {stat.suffix}
                </span>
              </div>
              <p className="type-label text-foreground mt-4 opacity-60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
