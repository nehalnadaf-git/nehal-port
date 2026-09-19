import { type ResolvedOrder } from '@/lib/order/catalog';
import { PAYMENT, buildUpiUri, payPageUrl } from '@/lib/order/payment';
import { SEO } from '@/lib/seo';

export function buildOrderMessage(order: ResolvedOrder, token?: string): string {
  const businessName = PAYMENT.payeeName || SEO.name;
  const customerName = order.customerName.trim() || '-';

  const now = new Date();
  const dateStr = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(now);

  const timeStr = new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  })
    .format(now)
    .toUpperCase();

  const divider = '--------------------------';

  const itemsFormatted = order.lines
    .map((line) => {
      const name = line.product.name;
      const single = `  - ${name} x${line.qty}  Rs. ${line.lineTotal}`;
      if (single.length <= 30) return single;
      return `  - ${name}\n    x${line.qty}  Rs. ${line.lineTotal}`;
    })
    .join('\n');

  const upiNote = `${businessName} Order`;
  const upiUri = buildUpiUri(order.totalInr, upiNote);

  const lines: string[] = [
    'ORDER REQUEST —',
    businessName,
    divider,
    `Customer  : ${customerName}`,
    `Date      : ${dateStr}`,
    `Time      : ${timeStr}`,
  ];

  if (order.fulfillment === 'delivery') {
    lines.push('Option    : Delivery');
    if (order.address && order.address.trim()) {
      lines.push(`Address   : ${order.address.trim()}`);
    }
  } else {
    lines.push('Option    : Store (We will pick that up)');
  }

  if (order.note && order.note.trim()) {
    lines.push(`Note      : ${order.note.trim()}`);
  }

  lines.push(
    divider,
    'ITEMS ORDERED',
    itemsFormatted,
    divider,
    `TOTAL AMOUNT : Rs. ${order.totalInr}`,
    divider,
    `Upi link: ${upiUri}`,
  );

  if (token) {
    lines.push('', `Web : ${payPageUrl(token)}`);
  }

  lines.push(
    divider,
    'Please do not pay anything until we reply to you.',
  );

  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  const digits = SEO.phone.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
