'use client'

import React from 'react';

interface RetroFrameButtonProps {
  text: string;
  onClick?: () => void;
  showHints?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** Font size for the text. Accepts any CSS value, e.g. 'clamp(80px,18vw,260px)'. */
  fontSize?: string;
}

export default function RetroFrameButton({
  text,
  onClick,
  showHints = false,
  className = '',
  style = {},
  fontSize,
}: RetroFrameButtonProps) {
  const wrapperStyle: React.CSSProperties = {
    ...style,
    ...(fontSize ? ({ '--retro-font-size': fontSize } as React.CSSProperties) : {}),
  };

  return (
    <div className={`btn-wrapper ${className}`} style={wrapperStyle}>
      <button className="btn" onClick={onClick}>
        <div className="txt-box">
          <span className="txt">{text}</span>
          <span className="txt">{text}</span>
        </div>
        <div className="frame">
          <span className="point top left"></span>
          <span className="point top right"></span>
          <span className="point bottom left"></span>
          <span className="point bottom right"></span>
        </div>
      </button>
      {showHints && (
        <>
          <span className="txt-secondary" id="hint1">Hover me</span>
          <span className="txt-secondary" id="hint2">Click me</span>
        </>
      )}
    </div>
  );
}
