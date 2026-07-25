'use client'

export default function GridLines() {
  return (
    <div className="grid-lines" aria-hidden="true">
      <div className="grid-line-v" style={{ left: '25%' }} />
      <div className="grid-line-v" style={{ left: '75%' }} />
    </div>
  );
}
