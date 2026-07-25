'use client'

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";

export interface MagicTextProps {
  text: string;
  className?: string;
  /** Tailwind/inline class for the outer <p> wrapper */
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

/* Single word — opacity driven by scroll progress */
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
  const cleanWord = isItalic ? italicMatch[1] : innerWord;

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

      {/* Ghost (dim placeholder so layout doesn't shift) */}
      <span className={fontClass} style={{ opacity: ghostOpacity }}>
        {cleanWord}
        {punctuation}
      </span>

      {/* Revealed word */}
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
    offset: [offsetStart, offsetEnd],
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

  return (
    <p
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
  );
};
