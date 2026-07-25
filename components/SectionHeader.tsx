'use client'

/**
 * SectionHeader — Premium animated section divider.
 *
 * Animations:
 * – Border-top line: clip-path wipe from left (rv-clip)
 * – Number: fade + slide up with rv-up rv-fast
 * – Title: fade + slide up, slight delay
 * – Label: fade + slide up, slightly later
 *
 * Uses IntersectionObserver via useReveal for cross-platform reliability.
 */
import { useReveal } from '@/hooks/useReveal';

interface SectionHeaderProps {
  number: string;
  title: string;
  label: string;
}

export default function SectionHeader({ number, title, label }: SectionHeaderProps) {
  const lineRef = useReveal<HTMLDivElement>({ threshold: 0.2, rootMargin: '0px 0px -40px 0px' });
  const rowRef  = useReveal<HTMLDivElement>({ threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

  return (
    <div className="container-padding pt-8">
      {/* Horizontal line — clip-path sweep reveal */}
      <div
        ref={lineRef}
        className="rv-clip"
        style={{
          height: '1px',
          background: 'var(--border)',
          marginBottom: '0',
        }}
      />

      {/* Metadata row */}
      <div
        ref={rowRef}
        className="rv-up flex items-center justify-between pb-8 md:pb-16 pt-5"
      >
        <span
          className="type-mono opacity-50"
          style={{ color: 'var(--foreground)', transitionDelay: '60ms' }}
        >
          {number}
        </span>
        <span
          className="type-label tracking-[0.1em]"
          style={{ color: 'var(--foreground)', transitionDelay: '100ms' }}
        >
          {title}
        </span>
        <span
          className="type-mono opacity-40"
          style={{ color: 'var(--foreground)', transitionDelay: '140ms' }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
