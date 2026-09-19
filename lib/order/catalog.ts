/**
 * Hidden order-desk catalog.
 *
 * Prices live here on purpose — lib/services.ts must stay price-free.
 * Edit SKUs and amounts in this file only.
 */

export interface OrderProduct {
  sku: string;
  name: string;
  category: string;
  spec: string;
  unit: string;
  priceInr: number;
}

export const ORDER_PRODUCTS: OrderProduct[] = [
  {
    sku: 'NN-WEB-01',
    name: 'Website Build',
    category: 'Web Development',
    spec: 'Custom React / Next.js website, responsive layout, SEO foundation, and deployment.',
    unit: 'project',
    priceInr: 45000,
  },
  {
    sku: 'NN-WEB-02',
    name: 'Landing Page',
    category: 'Web Development',
    spec: 'Single-page conversion website with custom UI and motion interactions.',
    unit: 'project',
    priceInr: 18000,
  },
  {
    sku: 'NN-UX-01',
    name: 'UI/UX Design',
    category: 'UI/UX Design',
    spec: 'Complete Figma interface design, wireframes, prototypes, and component system.',
    unit: 'project',
    priceInr: 22000,
  },
  {
    sku: 'NN-VID-01',
    name: 'Video Editing',
    category: 'Video Editing',
    spec: 'Professional cut, creative color grade, and sound mastering in DaVinci Resolve.',
    unit: 'video',
    priceInr: 8000,
  },
  {
    sku: 'NN-VID-02',
    name: 'Reels Pack',
    category: 'Video Editing',
    spec: 'Short-form videos planned, edited, and captioned for Instagram Reels and Shorts.',
    unit: 'pack',
    priceInr: 12000,
  },
  {
    sku: 'NN-SMM-01',
    name: 'Social Media',
    category: 'Social Media Marketing',
    spec: 'Monthly content production, captions, scheduling, and account management.',
    unit: 'month',
    priceInr: 20000,
  },
];

export const ORDER_CATEGORIES = Array.from(
  new Set(ORDER_PRODUCTS.map((product) => product.category)),
);

export const productBySku = new Map(ORDER_PRODUCTS.map((p) => [p.sku, p]));

export function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export interface CartLine {
  sku: string;
  qty: number;
}

export interface ResolvedLine {
  product: OrderProduct;
  qty: number;
  lineTotal: number;
}

export interface ResolvedOrder {
  customerName: string;
  note: string;
  lines: ResolvedLine[];
  totalInr: number;
  itemCount: number;
}

export function resolveCart(lines: CartLine[], customerName = '', note = ''): ResolvedOrder | null {
  const resolved: ResolvedLine[] = [];

  for (const line of lines) {
    if (!Number.isFinite(line.qty) || line.qty < 1) continue;
    const product = productBySku.get(line.sku);
    if (!product) continue;
    const qty = Math.min(99, Math.floor(line.qty));
    resolved.push({
      product,
      qty,
      lineTotal: product.priceInr * qty,
    });
  }

  if (resolved.length === 0) return null;

  resolved.sort((a, b) => a.product.sku.localeCompare(b.product.sku));

  return {
    customerName: customerName.trim(),
    note: note.trim(),
    lines: resolved,
    totalInr: resolved.reduce((sum, line) => sum + line.lineTotal, 0),
    itemCount: resolved.reduce((sum, line) => sum + line.qty, 0),
  };
}
