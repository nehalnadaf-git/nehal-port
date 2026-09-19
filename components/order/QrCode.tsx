'use client';

import { qrMatrix } from '@/lib/order/qr';

export default function QrCode({
  value,
  label,
  size = 240,
}: {
  value: string;
  label: string;
  size?: number;
}) {
  const { data, size: modules } = qrMatrix(value);
  const cell = size / modules;

  return (
    <svg
      role="img"
      aria-label={label}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: 'block', background: '#fff', imageRendering: 'pixelated' }}
    >
      {data.map((row, y) =>
        row.map((on, x) =>
          on ? (
            <rect
              key={`${x}-${y}`}
              x={x * cell}
              y={y * cell}
              width={cell}
              height={cell}
              fill="#000"
            />
          ) : null,
        ),
      )}
    </svg>
  );
}
