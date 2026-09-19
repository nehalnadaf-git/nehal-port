import { decodeOrderToken } from '@/lib/order/token';
import { PAYMENT, buildUpiUri } from '@/lib/order/payment';
import { renderSVG } from 'uqr';
import sharp from 'sharp';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const order = decodeOrderToken(token);

  const businessName = PAYMENT.payeeName;
  const upiNote = `${businessName} Order`;

  const upiUri = order
    ? buildUpiUri(order.totalInr, upiNote)
    : `upi://pay?pa=${PAYMENT.upiId}&pn=${encodeURIComponent(businessName)}&cu=INR`;

  const svg = renderSVG(upiUri, {
    ecc: 'M',
    border: 4,
    pixelSize: 24,
    whiteColor: '#ffffff',
    blackColor: '#000000',
  });

  const webpBuffer = await sharp(Buffer.from(svg))
    .resize(800, 800)
    .webp({ quality: 95, lossless: true })
    .toBuffer();

  return new Response(webpBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'image/webp',
      'Content-Length': String(webpBuffer.length),
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
