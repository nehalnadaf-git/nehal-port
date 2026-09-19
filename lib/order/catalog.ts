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
    name: 'Custom Website Build',
    category: 'Web Development',
    spec: 'React.js / Next.js business website. Custom design, responsive layout, SEO foundation, Vercel deploy.',
    unit: 'project',
    priceInr: 45000,
  },
  {
    sku: 'NN-WEB-02',
    name: 'Landing Page',
    category: 'Web Development',
    spec: 'Single-page conversion site. Custom UI, motion, and form handoff.',
    unit: 'project',
    priceInr: 18000,
  },
  {
    sku: 'NN-WEB-03',
    name: 'Extra Website Page',
    category: 'Web Development',
    spec: 'One additional custom page on an existing Next.js build.',
    unit: 'page',
    priceInr: 4000,
  },
  {
    sku: 'NN-WEB-04',
    name: 'GSAP Motion Pass',
    category: 'Web Development',
    spec: 'Scroll-triggered animation and micro-interactions across key pages.',
    unit: 'project',
    priceInr: 8000,
  },
  {
    sku: 'NN-WEB-05',
    name: 'SEO Foundation + Deploy',
    category: 'Web Development',
    spec: 'Meta, Open Graph, JSON-LD, sitemap, and Vercel production deploy.',
    unit: 'project',
    priceInr: 6000,
  },
  {
    sku: 'NN-UX-01',
    name: 'UI/UX Design System',
    category: 'UI/UX Design',
    spec: 'Wireframes, high-fidelity screens, and a documented type/colour/component system.',
    unit: 'project',
    priceInr: 22000,
  },
  {
    sku: 'NN-UX-02',
    name: 'Wireframes and User Flows',
    category: 'UI/UX Design',
    spec: 'Information architecture and low-fidelity frames for core screens.',
    unit: 'project',
    priceInr: 8000,
  },
  {
    sku: 'NN-UX-03',
    name: 'High-fidelity Prototype',
    category: 'UI/UX Design',
    spec: 'Interactive desktop and mobile prototype with component states.',
    unit: 'project',
    priceInr: 12000,
  },
  {
    sku: 'NN-VID-01',
    name: 'Short-form Edit',
    category: 'Video Editing',
    spec: 'Instagram Reel or YouTube Short. Cut, colour grade, audio mix. DaVinci Resolve.',
    unit: 'video',
    priceInr: 2500,
  },
  {
    sku: 'NN-VID-02',
    name: 'Brand Film Edit',
    category: 'Video Editing',
    spec: '1–3 minute brand or product film. Colour grade, titles, master audio.',
    unit: 'video',
    priceInr: 12000,
  },
  {
    sku: 'NN-VID-03',
    name: 'YouTube Long-form Edit',
    category: 'Video Editing',
    spec: 'Talking-head or explainer cut, grade, audio, titles, and export.',
    unit: 'video',
    priceInr: 8000,
  },
  {
    sku: 'NN-VID-04',
    name: 'Colour Grade Only',
    category: 'Video Editing',
    spec: 'Primary correction and creative grade in DaVinci Resolve.',
    unit: 'video',
    priceInr: 3500,
  },
  {
    sku: 'NN-VID-05',
    name: 'Captions / Subtitles',
    category: 'Video Editing',
    spec: 'Burned-in captions or .srt file, timed to the edit.',
    unit: 'video',
    priceInr: 800,
  },
  {
    sku: 'NN-SMM-01',
    name: 'Social Media Management',
    category: 'Social Media Marketing',
    spec: 'Monthly calendar, production, captions, scheduling, and a performance note.',
    unit: 'month',
    priceInr: 20000,
  },
  {
    sku: 'NN-SMM-02',
    name: 'Reels Pack',
    category: 'Social Media Marketing',
    spec: 'Eight short-form videos planned, edited, and captioned for Instagram or YouTube.',
    unit: 'pack',
    priceInr: 16000,
  },
  {
    sku: 'NN-SMM-03',
    name: 'Static Post Pack',
    category: 'Social Media Marketing',
    spec: 'Twelve branded static or carousel posts with captions.',
    unit: 'pack',
    priceInr: 8000,
  },
  {
    sku: 'NN-SMM-04',
    name: 'Community Management',
    category: 'Social Media Marketing',
    spec: 'Comment and DM handling on agreed platforms for one month.',
    unit: 'month',
    priceInr: 6000,
  },
  {
    sku: 'NN-INF-01',
    name: 'Influencer Campaign',
    category: 'Influencer Marketing',
    spec: 'Creator selection, brief, coordination, and delivery tracking in Karnataka.',
    unit: 'campaign',
    priceInr: 15000,
  },
  {
    sku: 'NN-INF-02',
    name: 'Single Creator Collab',
    category: 'Influencer Marketing',
    spec: 'One creator brief, content approval, and post tracking.',
    unit: 'collab',
    priceInr: 5000,
  },
  {
    sku: 'NN-GR-01',
    name: 'Brand Identity',
    category: 'Graphic Design',
    spec: 'Logo, type, colour, and basic usage rules for web and social.',
    unit: 'project',
    priceInr: 18000,
  },
  {
    sku: 'NN-GR-02',
    name: 'Social Graphic Pack',
    category: 'Graphic Design',
    spec: 'Ten branded graphics for feed or stories.',
    unit: 'pack',
    priceInr: 5000,
  },
  {
    sku: 'NN-PROD-01',
    name: 'On-location Videography',
    category: 'Production',
    spec: 'Shoot day for brand, product, or event coverage. Edit sold separately.',
    unit: 'day',
    priceInr: 15000,
  },
  {
    sku: 'NN-PROD-02',
    name: 'Content Script',
    category: 'Production',
    spec: 'Script for a Reel, brand film, or YouTube video.',
    unit: 'script',
    priceInr: 3000,
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
