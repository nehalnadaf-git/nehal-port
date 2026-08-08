'use client'

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";

export interface MagicTextProps {
  text: string;
  className?: string;
  /** Tailwind/inline class for the outer wrapper */
  wrapperClassName?: string;
  /** Font size passed through (e.g. "clamp(15px,2.2vw,24px)") */
  fontSize?: string;
  /** Override font-family (e.g. "var(--font-display)") */
  fontFamily?: string;
  /** Opacity of the ghost (dim) words. Default 0.15 */
  ghostOpacity?: number;
  /** ScrollTrigger start offset. Default "start 0.9" */
  offsetStart?: string;
  /** ScrollTrigger end offset. Default "start 0.25" */
  offsetEnd?: string;
}

interface WordProps {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  ghostOpacity: number;
}

/**
 * Strips MagicText bracket markers from raw text to produce clean readable text.
 *
 * Handles:
 *   [_word_]   → word   (italic marker)
 *   [_word._]  → word.  (italic with inline punctuation)
 *   [word]     → word   (selection highlight marker)
 *
 * Used for the sr-only / crawler-readable version so search engines and screen
 * readers see a single clean sentence — not the doubled ghost+animated text nodes
 * that the visual animation requires in the DOM.
 */
function stripMarkers(raw: string): string {
  return raw
    // [_italic_] and [_italic._] — italic selected words (inner underscores)
    .replace(/\[_([^\]]+?)_\]([.,?!:;]?)/g, '$1$2')
    // [selected] — plain selection highlight words
    .replace(/\[([^\]]+?)\]([.,?!:;]?)/g, '$1$2');
}

/* ─── Single Word ──────────────────────────────────────────────────────────────
   Opacity is driven by scroll progress.  Two text nodes are rendered per word:
   - a dim "ghost" span that preserves layout even when opacity → 0
   - an absolutely-positioned motion.span that animates from 0 → 1 opacity

   Both are inside an aria-hidden="true" parent so screen readers + crawlers
   skip this element entirely and read the sr-only sibling instead.
*/
const Word: React.FC<WordProps> = ({ children, progress, range, ghostOpacity }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  // Animate selection width from 0% to 100% to simulate a drag selection sweep
  const width = useTransform(progress, range, ["0%", "100%"]);
  // Make the right handle fade in as soon as selection drag begins
  const rightHandleOpacity = useTransform(progress, [range[0], range[0] + 0.1], [0, 1]);

  const selectMatch = children.match(/^\[(.*?)\]([.,?!:;]?)$/);
  const isSelected = !!selectMatch;
  const innerWord = selectMatch ? selectMatch[1] : children;
  const punctuation = selectMatch ? selectMatch[2] : "";

  const italicMatch = innerWord.match(/^_(.*?)_$/);
  const isItalic = !!italicMatch;
  const cleanWord = isItalic ? italicMatch![1] : innerWord;

  const fontClass = isItalic ? "type-italic-serif" : "";

  return (
    <span
      className="relative inline-block"
      style={{
        marginRight: "0.35em",
        marginTop: "0.15em",
        paddingLeft: isSelected ? "8px" : 0,
        paddingRight: isSelected ? "8px" : 0,
        whiteSpace: isSelected ? "nowrap" : undefined,
      }}
    >
      {/* Realistic selection sweep animation */}
      {isSelected && (
        <motion.span
          className="absolute left-0 top-0 bottom-0 bg-[#E9D5FF] pointer-events-none"
          style={{
            width,
            borderLeft: "2px solid #A855F7",
            borderRight: "2px solid #A855F7",
            overflow: "visible",
          }}
        >
          <span className="brutal-selection-handle-left" />
          <motion.span
            className="brutal-selection-handle-right"
            style={{ opacity: rightHandleOpacity }}
          />
        </motion.span>
      )}

      {/* Ghost (dim placeholder so layout doesn't shift when revealed word arrives) */}
      <span className={fontClass} style={{ opacity: ghostOpacity }}>
        {cleanWord}
        {punctuation}
      </span>

      {/* Revealed word — animates from transparent to opaque on scroll */}
      <motion.span
        className={fontClass}
        style={{
          opacity,
          position: "absolute",
          left: isSelected ? "8px" : 0,
          top: 0,
          whiteSpace: "nowrap",
          willChange: "opacity",
        }}
      >
        {cleanWord}
        {punctuation}
      </motion.span>
    </span>
  );
};

export const MagicText: React.FC<MagicTextProps> = ({
  text,
  className = "",
  wrapperClassName = "",
  fontSize,
  fontFamily,
  ghostOpacity = 0.15,
  offsetStart = "start 0.9",
  offsetEnd = "start 0.25",
}) => {
  const container = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offset: [offsetStart, offsetEnd] as any,
  });

  const words = useMemo(() => {
    const tokens: string[] = [];
    let currentToken = "";
    let insideBrackets = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '[') {
        insideBrackets = true;
        currentToken += char;
      } else if (char === ']') {
        insideBrackets = false;
        currentToken += char;
      } else if (char === ' ' && !insideBrackets) {
        if (currentToken) {
          tokens.push(currentToken);
          currentToken = "";
        }
      } else {
        currentToken += char;
      }
    }
    if (currentToken) {
      tokens.push(currentToken);
    }
    return tokens;
  }, [text]);

  const wrapperStyle: React.CSSProperties = {};
  if (fontSize) wrapperStyle.fontSize = fontSize;
  if (fontFamily) wrapperStyle.fontFamily = fontFamily;

  // Clean text for screen readers and search engine crawlers:
  // strip the [_bracket_] animation markers so the accessible version reads
  // as a normal sentence without any doubled words.
  const accessibleText = useMemo(() => stripMarkers(text), [text]);

  return (
    <>
      {/*
        ── Accessible / crawler version ────────────────────────────────────────
        Standard Tailwind sr-only: position absolute, 1×1px, overflow hidden,
        clip-path inset(50%) — NOT display:none so search engine crawlers still
        parse it as real text content.  Screen readers read this single clean
        sentence; they never reach the aria-hidden animated block below.
      */}
      <p className={`sr-only ${className}`}>{accessibleText}</p>

      {/*
        ── Animated visual version ─────────────────────────────────────────────
        aria-hidden="true" tells screen readers and accessibility tools to skip
        this entire block. Crawlers that respect aria semantics also skip it.
        The scroll-driven word reveal animation plays exactly as before for
        sighted users in a browser.
      */}
      <p
        aria-hidden="true"
        ref={container}
        className={`flex flex-wrap leading-relaxed ${wrapperClassName}`}
        style={Object.keys(wrapperStyle).length ? wrapperStyle : undefined}
      >
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;

          return (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[start, end]}
              ghostOpacity={ghostOpacity}
            >
              {word}
            </Word>
          );
        })}
      </p>
    </>
  );
};
