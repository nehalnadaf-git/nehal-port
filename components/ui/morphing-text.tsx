"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";

const morphTime    = 1.6; // duration of liquid morph transition (seconds)
const cooldownTime = 3.5; // duration word stays crystal clear (seconds)

// Imperatively set word & font styling on span element
function applyWordStyles(el: HTMLSpanElement, text: string) {
  if (el.textContent !== text) {
    el.textContent = text;
  }
  if (text.toLowerCase() === "nadaf") {
    el.style.fontFamily    = "'Playfair Display', Georgia, 'Times New Roman', serif";
    el.style.fontStyle     = "italic";
    el.style.fontWeight    = "600";
    el.style.letterSpacing = "0em";
  } else {
    el.style.fontFamily    = "'Inter', system-ui, -apple-system, sans-serif";
    el.style.fontStyle     = "normal";
    el.style.fontWeight    = "900";
    el.style.letterSpacing = "-0.05em";
  }
}

// Smooth cubic ease in-out
function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export interface MorphingTextProps {
  texts: string[];
  className?: string;
  style?: React.CSSProperties;
}

export function MorphingText({ texts, className, style }: MorphingTextProps) {
  const rawId = useId();
  const filterId = `morph-filter-${rawId.replace(/[:]/g, "")}`;

  const textIndexRef = useRef(0);
  const isText1ActiveRef = useRef(true);
  const phaseRef = useRef<"cooldown" | "morph">("cooldown");
  const timerRef = useRef(cooldownTime);
  const lastTimeRef = useRef<number | null>(null);

  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const c1 = text1Ref.current;
    const c2 = text2Ref.current;
    if (!c1 || !c2 || texts.length === 0) return;

    // Initial setup — ensure initial words and styles are ready
    const currentWord = texts[0];
    const nextWord = texts[1 % texts.length];
    applyWordStyles(c1, currentWord);
    applyWordStyles(c2, nextWord);

    c1.style.opacity   = "1";
    c1.style.filter    = "none";
    c1.style.transform = "translate3d(-50%, -50%, 0) scale(1)";

    c2.style.opacity   = "0";
    c2.style.filter    = "none";
    c2.style.transform = "translate3d(-50%, -50%, 0) scale(0.95)";

    let rafId: number;

    const animate = (timestamp: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
      const dt = Math.min(0.05, (timestamp - lastTimeRef.current) / 1000);
      lastTimeRef.current = timestamp;

      const activeEl   = isText1ActiveRef.current ? c1 : c2;
      const incomingEl = isText1ActiveRef.current ? c2 : c1;

      if (phaseRef.current === "cooldown") {
        timerRef.current -= dt;
        // Keep active element 100% clear and static
        activeEl.style.opacity   = "1";
        activeEl.style.filter    = "none";
        activeEl.style.transform = "translate3d(-50%, -50%, 0) scale(1)";

        incomingEl.style.opacity = "0";
        incomingEl.style.filter  = "none";

        if (timerRef.current <= 0) {
          phaseRef.current = "morph";
          timerRef.current = 0;
          // Prepare hidden incoming element with next word before morph starts
          const nextIndex = (textIndexRef.current + 1) % texts.length;
          applyWordStyles(incomingEl, texts[nextIndex]);
        }
      } else {
        // Morphing phase
        timerRef.current += dt;
        const progress = Math.min(1, timerRef.current / morphTime);
        const eased = easeInOutCubic(progress);

        const blurActive   = (eased * 10).toFixed(2);
        const blurIncoming = ((1 - eased) * 10).toFixed(2);

        const scaleActive   = (1 + eased * 0.04).toFixed(3);
        const scaleIncoming = (0.95 + eased * 0.05).toFixed(3);

        activeEl.style.opacity   = (1 - eased).toFixed(3);
        activeEl.style.filter    = `blur(${blurActive}px)`;
        activeEl.style.transform = `translate3d(-50%, -50%, 0) scale(${scaleActive})`;

        incomingEl.style.opacity   = eased.toFixed(3);
        incomingEl.style.filter    = `blur(${blurIncoming}px)`;
        incomingEl.style.transform = `translate3d(-50%, -50%, 0) scale(${scaleIncoming})`;

        if (progress >= 1) {
          // Morph completed! Seamlessly hand over active role without DOM swap
          textIndexRef.current = (textIndexRef.current + 1) % texts.length;
          isText1ActiveRef.current = !isText1ActiveRef.current;
          phaseRef.current = "cooldown";
          timerRef.current = cooldownTime;
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafId);
      lastTimeRef.current = null;
    };
  }, [texts]);

  return (
    <div
      className={cn("morphing-text-root relative w-full h-full text-center leading-none select-none", className)}
      style={{
        filter: `url(#${filterId}) blur(0.4px)`,
        WebkitFilter: `url(#${filterId}) blur(0.4px)`,
        ...style,
      }}
    >
      <span
        ref={text1Ref}
        className="absolute top-1/2 left-1/2 whitespace-nowrap text-center will-change-[filter,opacity,transform]"
        style={{ transform: "translate3d(-50%, -50%, 0)" }}
      />
      <span
        ref={text2Ref}
        className="absolute top-1/2 left-1/2 whitespace-nowrap text-center will-change-[filter,opacity,transform]"
        style={{ transform: "translate3d(-50%, -50%, 0)" }}
      />

      {/* Instance-unique SVG threshold filter for WebKit, Blink & Gecko cross-browser support */}
      <svg
        aria-hidden="true"
        focusable="false"
        style={{ position: "absolute", width: 0, height: 0, opacity: 0, pointerEvents: "none" }}
      >
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}


