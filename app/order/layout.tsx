/**
 * Hidden order desk — not linked from the public site.
 * Indexed off. Pay routes stay crawlable for WhatsApp Open Graph.
 */

import type { Metadata } from 'next';
import type React from 'react';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Order Desk',
  description: 'Private service catalog and UPI checkout.',
  canonicalPath: '/order',
  noIndex: true,
  keywords: [],
  ogImage: '/og-order.webp',
});

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#F2F1E6', minHeight: '100%' }}>
      {children}
    </div>
  );
}
