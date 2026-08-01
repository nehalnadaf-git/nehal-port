'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type CursorType = 'arrow' | 'hand' | 'ibeam' | 'grab';

interface ClickBurst {
  id: number;
  x: number;
  y: number;
}

export default function BrutalistMacCursor() {
  const pointerRef = useRef<HTMLDivElement>(null);
  const svgWrapRef = useRef<HTMLDivElement>(null);

  // Only true on desktop/trackpad — never on touch screens
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<CursorType>('arrow');
  const [bursts, setBursts] = useState<ClickBurst[]>([]);

  // Physics refs — never trigger re-renders
  const mouse = useRef({ x: -200, y: -200 });
  const moveHistory = useRef<{ x: number; y: number; time: number }[]>([]);
  const shakeScaleRef = useRef(1);
  const targetShakeScale = useRef(1);
  const clickScaleRef = useRef(1);
  const rafId = useRef<number | null>(null);

  // ── Idle tracking — skip RAF work when mouse is perfectly still ──
  const lastAppliedPos = useRef({ x: -999, y: -999 });
  const lastAppliedScale = useRef(0);
  const mouseMoved = useRef(false);

  // ── Throttle mouseover cursor-type detection ──
  const lastOverTime = useRef(0);

  useEffect(() => {
    // Mobile / touch devices: pointer:coarse — do nothing at all
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return;

    // Only reach here on mouse / trackpad devices
    setHasFinePointer(true);

    document.body.classList.add('custom-cursor-active');

    // ── Apply position + scale directly to DOM — zero React re-renders ──
    const applyTransform = () => {
      if (!pointerRef.current || !svgWrapRef.current) return;
      const { x, y } = mouse.current;
      const totalScale = shakeScaleRef.current * clickScaleRef.current;

      // Skip DOM write if nothing actually changed (saves GPU compositing when idle)
      const posMoved = x !== lastAppliedPos.current.x || y !== lastAppliedPos.current.y;
      const scaleChanged = Math.abs(totalScale - lastAppliedScale.current) > 0.001;

      if (!posMoved && !scaleChanged) return;

      if (posMoved) {
        pointerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        lastAppliedPos.current = { x, y };
      }

      if (scaleChanged) {
        svgWrapRef.current.style.transform = `scale(${totalScale})`;
        lastAppliedScale.current = totalScale;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const x = e.clientX;
      const y = e.clientY;
      mouse.current = { x, y };
      mouseMoved.current = true;

      // Visibility
      if (x <= 0 || y <= 0 || x >= window.innerWidth || y >= window.innerHeight) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // ── macOS Shake-to-Find Detection ──
      moveHistory.current.push({ x, y, time: now });
      moveHistory.current = moveHistory.current.filter((m) => now - m.time < 350);

      if (moveHistory.current.length > 5) {
        let pathLen = 0;
        for (let i = 1; i < moveHistory.current.length; i++) {
          const dx = moveHistory.current[i].x - moveHistory.current[i - 1].x;
          const dy = moveHistory.current[i].y - moveHistory.current[i - 1].y;
          pathLen += Math.sqrt(dx * dx + dy * dy);
        }
        const oldest = moveHistory.current[0];
        const newest = moveHistory.current[moveHistory.current.length - 1];
        const netDisp = Math.sqrt((newest.x - oldest.x) ** 2 + (newest.y - oldest.y) ** 2);

        if (pathLen > 260 && pathLen / (netDisp + 10) > 1.7) {
          const intensity = Math.min(1, (pathLen - 260) / 400);
          targetShakeScale.current = 1.8 + intensity * 1.0;
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      clickScaleRef.current = 0.82;

      const burst: ClickBurst = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setBursts((prev) => [...prev.slice(-3), burst]);
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== burst.id));
      }, 400);
    };

    const handleMouseUp = () => {
      clickScaleRef.current = 1;
    };

    // ── Throttled cursor type detection — max once per 40ms ──
    const handleMouseOver = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastOverTime.current < 40) return;
      lastOverTime.current = now;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const inputEl = target.closest<HTMLElement>(
        'input[type="text"], input[type="email"], input[type="search"], textarea, [contenteditable="true"]'
      );
      const grabEl = target.closest<HTMLElement>(
        '.cursor-grab, .cursor-grabbing, [data-cursor="grab"]'
      );
      const interactiveEl = target.closest<HTMLElement>(
        'a, button, input[type="submit"], input[type="button"], [role="button"], summary, label, [tabindex], .interactive, [data-cursor="pointer"], .cursor-pointer'
      );

      // Only check computed style as a fallback when no semantic match found
      let isCssPointer = false;
      if (!inputEl && !grabEl && !interactiveEl) {
        try {
          const compCursor = window.getComputedStyle(target).cursor;
          isCssPointer = compCursor === 'pointer';
        } catch { /* ignore */ }
      }

      if (inputEl) {
        setCursorType('ibeam');
      } else if (grabEl) {
        setCursorType('grab');
      } else if (interactiveEl || isCssPointer) {
        setCursorType('hand');
      } else {
        setCursorType('arrow');
      }
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleLeave, { passive: true });
    document.addEventListener('mouseenter', handleEnter, { passive: true });

    // ── RAF spring loop — directly mutates DOM, no setState ──
    const animate = () => {
      // Shake-to-find spring decay
      targetShakeScale.current += (1.0 - targetShakeScale.current) * 0.08;
      shakeScaleRef.current += (targetShakeScale.current - shakeScaleRef.current) * 0.15;

      // Click spring back
      const clickTarget = 1;
      clickScaleRef.current += (clickTarget - clickScaleRef.current) * 0.18;

      applyTransform();
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Never render the cursor on touch/mobile devices
  if (!hasFinePointer) return null;

  // ── Hotspot offsets so the pointer tip sits exactly at mouse coords ──
  const getHotspotStyle = (): React.CSSProperties => {
    switch (cursorType) {
      case 'hand':   return { marginLeft: '-8px',  marginTop: '-2px'  };
      case 'ibeam':  return { marginLeft: '-11px', marginTop: '-14px' };
      case 'grab':   return { marginLeft: '-14px', marginTop: '-8px'  };
      case 'arrow':
      default:       return { marginLeft: '-2px',  marginTop: '-2px'  };
    }
  };

  return createPortal(
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10000000 }}
    >
      {/* ── Click Spark Bursts ── */}
      {bursts.map((burst) => (
        <div
          key={burst.id}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            transform: `translate3d(${burst.x}px, ${burst.y}px, 0)`,
          }}
        >
          <RadialClickBurstSVG />
        </div>
      ))}

      {/* ── Cursor wrapper — moves 1:1 with mouse via RAF ── */}
      <div
        ref={pointerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          willChange: 'transform',
          // NO transition here — must be 0-lag 1:1 hardware tracking
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.15s ease',
        }}
      >
        {/* ── SVG wrapper for scale animations ──
            drop-shadow removed: it forces a per-frame GPU filter re-composite,
            which is the #1 cause of cursor lag on mid-range hardware.  */}
        <div
          ref={svgWrapRef}
          style={{
            ...getHotspotStyle(),
            transformOrigin: '2px 2px',
            // Scale transition for smooth spring feel on cursor type change
            transition: 'margin 0.15s ease',
          }}
        >
          {cursorType === 'arrow' && <Modern3DArrowSVG />}
          {cursorType === 'hand'  && <Modern3DHandSVG />}
          {cursorType === 'ibeam' && <Modern3DIbeamSVG />}
          {cursorType === 'grab'  && <Modern3DGrabSVG />}
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * RADIAL CLICK BURST SVG — simplified to 6 rays (was 8) for lighter animation
 * ──────────────────────────────────────────────────────────────────────────── */
function RadialClickBurstSVG() {
  const rays = [0, 60, 120, 180, 240, 300];
  return (
    <svg
      width="52"
      height="52"
      viewBox="-26 -26 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', top: '-26px', left: '-26px', pointerEvents: 'none' }}
    >
      <style>{`
        @keyframes sparkBurst {
          0%   { opacity: 1; transform: scale(0.3) rotate(var(--angle)); }
          65%  { opacity: 1; transform: scale(1.1) rotate(var(--angle)); }
          100% { opacity: 0; transform: scale(1.4) rotate(var(--angle)); }
        }
        .spark-ray {
          transform-origin: 0px 0px;
          animation: sparkBurst 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      {rays.map((angle) => (
        <g
          key={angle}
          className="spark-ray"
          style={{ '--angle': `${angle}deg` } as React.CSSProperties}
        >
          <path
            d="M 0 -8 C 1.2 -8, 1.8 -12, 0 -16 C -1.8 -12, -1.2 -8, 0 -8 Z"
            fill="#A855F7"
            stroke="#000000"
            strokeWidth="0.7"
          />
        </g>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * CURSOR SVGs
 * ──────────────────────────────────────────────────────────────────────────── */

function Modern3DArrowSVG() {
  return (
    <svg width="34" height="38" viewBox="0 0 34 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 2 2 L 6 30 L 10 30 L 7 21 L 2 2 Z" fill="#6B21A8" stroke="#000" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M 6 30 L 14 21 L 24 21 L 27 25 L 14 25 L 10 30 Z" fill="#A855F7" stroke="#000" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M 2 2 L 25 21 H 13.5 L 6 30 L 2 2 Z" fill="#FDFDFC" stroke="#000" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M 4 4 L 21 19.5 H 13.5 L 6.5 27.5 L 4 4 Z" fill="#FFFFFF" />
    </svg>
  );
}

function Modern3DHandSVG() {
  return (
    <svg width="36" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 8 2 L 8 20 L 4 22 L 4 32 L 24 32 L 28 28 L 28 18 L 8 2 Z"
        fill="#6B21A8" stroke="#000" strokeWidth="1.6" strokeLinejoin="round"
        transform="translate(2, 2)"
      />
      <path
        d="M 8 2 C 6.5 2 5.5 3 5.5 4.5 V 19 L 3 18 C 1.5 17.5 0 19 0.5 20.5 L 3 27 C 4 29.5 6.5 31 9 31 H 19 C 22 31 24 29 24 26 V 17 C 24 15.5 22.5 14.5 21 15 C 20.5 15 20 15.5 20 16 V 14 C 20 12.5 18.5 11.5 17 12 C 16.5 12 16 12.5 16 13 V 11 C 16 9.5 14.5 8.5 13 9 C 12.5 9 12 9.5 12 10 V 4.5 C 12 3 10.5 2 9 2 H 8 Z"
        fill="#FDFDFC" stroke="#000" strokeWidth="1.8" strokeLinejoin="round"
      />
      <path d="M 12 10 V 17" stroke="#000" strokeWidth="1.2" opacity="0.4" />
      <path d="M 16 12 V 18" stroke="#000" strokeWidth="1.2" opacity="0.4" />
      <path d="M 20 15 V 19" stroke="#000" strokeWidth="1.2" opacity="0.4" />
    </svg>
  );
}

function Modern3DIbeamSVG() {
  return (
    <svg width="26" height="32" viewBox="0 0 26 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 5 2 H 19 V 7 H 15 V 23 H 19 V 28 H 5 V 23 H 9 V 7 H 5 V 2 Z" fill="#6B21A8" stroke="#000" strokeWidth="1.4" transform="translate(1.8, 1.8)" />
      <path d="M 4 1 H 18 V 6 H 14 V 22 H 18 V 27 H 4 V 22 H 8 V 6 H 4 V 1 Z" fill="#FDFDFC" stroke="#000" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function Modern3DGrabSVG() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shadow layer */}
      <g transform="translate(2.5, 2.5)" opacity="0.85">
        <path d="M 9 10 C 9 8.3 10.3 7 12 7 C 13.7 7 15 8.3 15 10 L 15 18" stroke="#6B21A8" strokeWidth="4" strokeLinecap="round"/>
        <path d="M 15 9 C 15 7.3 16.3 6 18 6 C 19.7 6 21 7.3 21 9 L 21 17" stroke="#6B21A8" strokeWidth="4" strokeLinecap="round"/>
        <path d="M 21 10 C 21 8.3 22.3 7 24 7 C 25.7 7 27 8.3 27 10 L 27 18" stroke="#6B21A8" strokeWidth="4" strokeLinecap="round"/>
        <path d="M 27 13 C 27 11.3 28.3 10 30 10 C 31.7 10 33 11.3 33 13 L 33 21 C 33 27 28 32 22 32 L 16 32 C 12.7 32 9 29 9 25 L 9 10" stroke="#6B21A8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      {/* White main layer */}
      <path d="M 9 10 C 9 8.3 10.3 7 12 7 C 13.7 7 15 8.3 15 10 L 15 18" stroke="#FDFDFC" strokeWidth="3.2" strokeLinecap="round"/>
      <path d="M 15 9 C 15 7.3 16.3 6 18 6 C 19.7 6 21 7.3 21 9 L 21 17" stroke="#FDFDFC" strokeWidth="3.2" strokeLinecap="round"/>
      <path d="M 21 10 C 21 8.3 22.3 7 24 7 C 25.7 7 27 8.3 27 10 L 27 18" stroke="#FDFDFC" strokeWidth="3.2" strokeLinecap="round"/>
      <path d="M 27 13 C 27 11.3 28.3 10 30 10 C 31.7 10 33 11.3 33 13 L 33 21 C 33 27 28 32 22 32 L 16 32 C 12.7 32 9 29 9 25 L 9 10" stroke="#FDFDFC" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Black outline */}
      <path d="M 9 10 C 9 8.3 10.3 7 12 7 C 13.7 7 15 8.3 15 10 L 15 18" stroke="#000" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M 15 9 C 15 7.3 16.3 6 18 6 C 19.7 6 21 7.3 21 9 L 21 17" stroke="#000" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M 21 10 C 21 8.3 22.3 7 24 7 C 25.7 7 27 8.3 27 10 L 27 18" stroke="#000" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M 27 13 C 27 11.3 28.3 10 30 10 C 31.7 10 33 11.3 33 13 L 33 21 C 33 27 28 32 22 32 L 16 32 C 12.7 32 9 29 9 25 L 9 10" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
