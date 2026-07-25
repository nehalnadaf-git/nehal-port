'use client'

import { useId, useMemo } from "react"

// Map Framer Transition `ease` value to a CSS animation-timing-function.
function mapEaseToCSS(ease: any): string {
    if (Array.isArray(ease) && ease.length === 4) {
        return `cubic-bezier(${ease.join(",")})`
    }
    switch (ease) {
        case "linear":
            return "linear"
        case "easeIn":
            return "ease-in"
        case "easeOut":
            return "ease-out"
        case "easeInOut":
            return "ease-in-out"
        case "circIn":
            return "cubic-bezier(0.6, 0.04, 0.98, 0.335)"
        case "circOut":
            return "cubic-bezier(0.075, 0.82, 0.165, 1)"
        case "circInOut":
            return "cubic-bezier(0.785, 0.135, 0.15, 0.86)"
        case "backIn":
            return "cubic-bezier(0.6, -0.28, 0.735, 0.045)"
        case "backOut":
            return "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        case "backInOut":
            return "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
        default:
            return "ease-in-out"
    }
}

const COMPONENT_DEFAULTS = {
    words: "NEHAL\nCREATIVE\nDEVELOPER\nEDITOR",
    transition: {
        type: "tween",
        duration: 0.8,
        delay: 1.2,
        ease: "easeInOut",
    },
    color: "#000000",
    font: {
        fontFamily: "Inter, sans-serif",
        fontWeight: "900",
        fontSize: "clamp(48px, 14vw, 180px)",
        lineHeight: "1.0em",
        letterSpacing: "-0.04em",
        textAlign: "center",
    } as any,
    tag: "div",
}

interface TextMorphProps {
    words?: string
    color?: string
    font?: React.CSSProperties & { textAlign?: string }
    transition?: {
        type?: string
        duration?: number
        delay?: number
        ease?: string
    }
    tag?: string
}

export default function TextMorph(props: TextMorphProps) {
    const mergedProps = { ...COMPONENT_DEFAULTS, ...props }
    const { words, color, font, transition, tag } = mergedProps

    const morph = Math.max(0.1, transition?.duration ?? 1)
    const hold = Math.max(0, transition?.delay ?? 1)
    const easeCurve: string = transition?.ease ?? "easeInOut"
    const easeCSS = mapEaseToCSS(easeCurve)

    const Tag = (tag ?? "div") as any

    const wordList = useMemo<string[]>(
        () =>
            (words as string)
                .split(/\r?\n|\\n|,/)
                .map((w) => w.trim())
                .filter(Boolean),
        [words]
    )

    const rawId = useId()
    const safeId = rawId.replace(/[:]/g, "")
    const filterId = `tm-thr-${safeId}`
    const animName = `tm-rot-${safeId}`

    const count = Math.max(1, wordList.length)
    const slot = morph + hold
    const cycle = slot * count
    const pct = (s: number) => Math.min(100, (s / cycle) * 100).toFixed(4)
    const mIn = pct(morph) 
    const mHold = pct(morph + hold) 
    const mOut = pct(2 * morph + hold) 

    const keyframes = `
@keyframes ${animName} {
  0% {
    opacity: 0;
    filter: blur(6px);
    transform: translate(-50%, -50%) scale(0.95);
  }
  ${mIn}% {
    opacity: 1;
    filter: blur(0px);
    transform: translate(-50%, -50%) scale(1);
  }
  ${mHold}% {
    opacity: 1;
    filter: blur(0px);
    transform: translate(-50%, -50%) scale(1);
  }
  ${mOut}%, 100% {
    opacity: 0;
    filter: blur(6px);
    transform: translate(-50%, -50%) scale(1.03);
  }
}
`

    const typeface = font ?? {}
    const textAlign: string = (typeface as any)?.textAlign ?? "center"
    const fontStyle = Object.fromEntries(
        Object.entries(typeface).filter(([k]) => k !== "textAlign")
    )

    const longest = wordList.reduce(
        (acc, w) => (w.length > acc.length ? w : acc),
        ""
    )

    return (
        <Tag
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "visible",
                userSelect: "none",
            }}
        >
            <style>{keyframes}</style>

            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: textAlign as any,
                    ...fontStyle,
                }}
            >
                <div
                    style={{
                        position: "relative",
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        lineHeight: 1.0,
                        minHeight: "1.0em",
                        overflow: "visible",
                    }}
                >
                    {/* Width anchor: longest word reserves space so layout never shifts */}
                    <span
                        style={{
                            visibility: "hidden",
                            whiteSpace: "nowrap",
                            display: "inline-block",
                            ...(() => {
                                const wStyle = { ...fontStyle };
                                if (longest.toLowerCase() === "nehal") {
                                    wStyle.fontFamily = "'Inter', system-ui, sans-serif";
                                    wStyle.fontStyle = "normal";
                                    wStyle.fontWeight = "900";
                                    wStyle.letterSpacing = "-0.07em";
                                } else if (longest.toLowerCase() === "nadaf") {
                                    wStyle.fontFamily = "'Playfair Display', Georgia, serif";
                                    wStyle.fontStyle = "italic";
                                    wStyle.fontWeight = "600";
                                    wStyle.letterSpacing = "0em";
                                }
                                return wStyle;
                            })()
                        }}
                    >
                        {longest || " "}
                    </span>

                    {wordList.map((word, i) => {
                        const wordStyle: React.CSSProperties = {};
                        if (word.toLowerCase() === "nehal") {
                            wordStyle.fontFamily = "'Inter', system-ui, sans-serif";
                            wordStyle.fontStyle = "normal";
                            wordStyle.fontWeight = "900";
                            wordStyle.letterSpacing = "-0.07em";
                        } else if (word.toLowerCase() === "nadaf") {
                            wordStyle.fontFamily = "'Playfair Display', Georgia, serif";
                            wordStyle.fontStyle = "italic";
                            wordStyle.fontWeight = "600";
                            wordStyle.letterSpacing = "0em";
                        }

                        return (
                            <span
                                key={`${word}-${i}`}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    opacity: 0,
                                    color,
                                    whiteSpace: "nowrap",
                                    animation: `${animName} ${cycle}s ${(slot * i).toFixed(3)}s infinite ${easeCSS} both`,
                                    willChange: "opacity, transform",
                                    ...wordStyle,
                                }}
                            >
                                {word}
                            </span>
                        );
                    })}
                </div>
            </div>
        </Tag>
    )
}
