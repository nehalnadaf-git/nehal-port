import { formatInr, type ResolvedOrder } from '@/lib/order/catalog';
import { PAYMENT, payPageUrl } from '@/lib/order/payment';
import { SEO } from '@/lib/seo';

export function buildOrderMessage(order: ResolvedOrder, token: string): string {
  const list = order.lines
    .map((line, index) => {
      return [
        `${index + 1}. ${line.product.sku}  ${line.product.name}`,
        `   Qty ${line.qty} x ${formatInr(line.product.priceInr)}  =  ${formatInr(line.lineTotal)}`,
      ].join('\n');
    })
    .join('\n');

  const lines: string[] = [
    'Order',
    SEO.name,
    '',
  ];

  if (order.customerName) {
    lines.push('Customer', order.customerName, '');
  }

  lines.push(
    'List',
    list,
    '',
    'Total',
    formatInr(order.totalInr),
  );

  if (order.note) {
    lines.push('', 'Note', order.note);
  }

  lines.push(
    '',
    'Pay',
    `UPI  ${PAYMENT.upiId}`,
    `Amount  ${formatInr(order.totalInr)}`,
    'QR (scan the preview image or open this link)',
    payPageUrl(token),
  );

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

export function buildWhatsAppUrl(message: string): string {
  const digits = SEO.phone.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
