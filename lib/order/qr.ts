import { encode, renderSVG } from 'uqr';

export function qrMatrix(value: string) {
  return encode(value, { ecc: 'M', border: 2 });
}

export function qrSvgDataUrl(value: string, pixelSize = 8): string {
  const svg = renderSVG(value, {
    ecc: 'M',
    border: 2,
    pixelSize,
    whiteColor: '#ffffff',
    blackColor: '#000000',
  });
  const encoded =
    typeof Buffer !== 'undefined'
      ? Buffer.from(svg).toString('base64')
      : btoa(svg);
  return `data:image/svg+xml;base64,${encoded}`;
}
