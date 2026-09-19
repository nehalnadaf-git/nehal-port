import { SEO } from '@/lib/seo';

/**
 * Personal UPI / Paytm targets.
 *
 * Override with env without a rebuild of copy:
 *   NEXT_PUBLIC_UPI_ID
 *   NEXT_PUBLIC_UPI_NAME
 *   NEXT_PUBLIC_PAYTM_UPI_LINK   (optional paytm.me or Paytm API / intent URL)
 */
export const PAYMENT = {
  upiId: process.env.NEXT_PUBLIC_UPI_ID ?? 'nehalnadaf@ptyes',
  payeeName: process.env.NEXT_PUBLIC_UPI_NAME ?? SEO.name,
  paytmLink: process.env.NEXT_PUBLIC_PAYTM_UPI_LINK ?? '',
} as const;

export function buildUpiUri(amountInr: number, note: string): string {
  const tn = encodeURIComponent(note.slice(0, 50) || 'Order');
  const pn = encodeURIComponent(PAYMENT.payeeName);
  return `upi://pay?pa=${PAYMENT.upiId}&pn=${pn}&am=${amountInr}&cu=INR&tn=${tn}`;
}

export function buildPaytmUri(amountInr: number, note: string): string {
  if (PAYMENT.paytmLink) {
    try {
      const url = new URL(PAYMENT.paytmLink);
      url.searchParams.set('am', String(amountInr));
      url.searchParams.set('pa', PAYMENT.upiId);
      url.searchParams.set('pn', PAYMENT.payeeName);
      url.searchParams.set('cu', 'INR');
      url.searchParams.set('tn', note.slice(0, 50) || 'Order');
      return url.toString();
    } catch {
      return PAYMENT.paytmLink;
    }
  }

  return `paytmmp://cash_wallet?pa=${PAYMENT.upiId}&pn=${encodeURIComponent(PAYMENT.payeeName)}&am=${amountInr}&cu=INR&tn=${encodeURIComponent(note.slice(0, 50) || 'Order')}`;
}

export function payPageUrl(token: string): string {
  return `${SEO.baseUrl}/order/pay/${token}`;
}
