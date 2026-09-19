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
  image?: string;
}

export const ORDER_PRODUCTS: OrderProduct[] = [
  {
    sku: 'BAC-01',
    name: 'Birty Auto Cleanser',
    category: 'Auto Care',
    spec: 'Premium exterior auto cleanser formula for deep cleaning and surface restoration.',
    unit: 'piece',
    priceInr: 899,
    image: '/images/order-products/auto-cleanser-1000x1000.webp',
  },
  {
    sku: 'IC-02',
    name: 'Interior Cleaner',
    category: 'Auto Care',
    spec: 'Concentrated interior cleaner for leather, fabric, upholstery, and dashboard trim.',
    unit: 'piece',
    priceInr: 1499,
    image: '/images/order-products/interior-cleaner-concentrate-500x500.webp',
  },
  {
    sku: 'CBS-03',
    name: 'Car & Bike Shiner',
    category: 'Auto Care',
    spec: 'High-gloss protective instant shiner spray for cars and motorcycles.',
    unit: 'piece',
    priceInr: 399,
    image: '/images/order-products/car-and-bike-shiner-500x500.webp',
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

export type FulfillmentType = 'store' | 'delivery';

export interface ResolvedOrder {
  customerName: string;
  fulfillment: FulfillmentType;
  address?: string;
  note: string;
  lines: ResolvedLine[];
  totalInr: number;
  itemCount: number;
}

export function resolveCart(
  lines: CartLine[],
  customerName = '',
  note = '',
  fulfillment: FulfillmentType = 'store',
  address = '',
): ResolvedOrder | null {
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
    fulfillment,
    address: address.trim(),
    note: note.trim(),
    lines: resolved,
    totalInr: resolved.reduce((sum, line) => sum + line.lineTotal, 0),
    itemCount: resolved.reduce((sum, line) => sum + line.qty, 0),
  };
}
