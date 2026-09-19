import { ImageResponse } from 'next/og';
import { decodeOrderToken } from '@/lib/order/token';
import { formatInr } from '@/lib/order/catalog';
import { PAYMENT, buildUpiUri } from '@/lib/order/payment';

export const runtime = 'edge';
export const alt = 'UPI payment QR';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-dynamic';

export default async function Image({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const order = decodeOrderToken(token);
  const amount = order ? formatInr(order.totalInr) : 'INR 0';
  const upi = order
    ? buildUpiUri(order.totalInr, `NN ${order.customerName || 'order'}`.slice(0, 50))
    : `upi://pay?pa=${encodeURIComponent(PAYMENT.upiId)}&pn=${encodeURIComponent(PAYMENT.payeeName)}&cu=INR`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=840x840&ecc=M&margin=2&data=${encodeURIComponent(upi)}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#F2F1E6',
          padding: 48,
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            border: '4px solid #000',
            padding: 36,
            gap: 40,
            alignItems: 'center',
          }}
        >
          <img
            src={qrSrc}
            alt="UPI QR"
            width={420}
            height={420}
            style={{ border: '3px solid #000', background: '#fff' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 560 }}>
            <div style={{ fontSize: 22, letterSpacing: 4, textTransform: 'uppercase' }}>
              UPI payment
            </div>
            <div style={{ fontSize: 44, fontWeight: 800, marginTop: 16 }}>{PAYMENT.payeeName}</div>
            <div style={{ fontSize: 28, marginTop: 28 }}>{PAYMENT.upiId}</div>
            <div style={{ fontSize: 56, fontWeight: 800, marginTop: 24 }}>{amount}</div>
            <div style={{ fontSize: 22, marginTop: 20 }}>Scan to pay. Amount is pre-filled.</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
