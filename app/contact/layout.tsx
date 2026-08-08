/**
 * /contact — metadata + JSON-LD schemas (server component).
 */

import type { Metadata } from 'next';
import type React from 'react';
import { buildMetadata, SEO } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Contact Nehal Nadaf — Web Developer in Hubli, Karnataka`,
  description:
    `Get in touch with Nehal Nadaf — web developer, UI/UX designer, and video editor based in Hubli, Karnataka. WhatsApp, email, or use the contact form. Available Mo–Sa, 09:00–21:00 IST.`,
  keywords: [
    'contact Nehal Nadaf',
    'hire web developer Hubli',
    'web developer contact Karnataka',
    'hire UI UX designer Hubli',
    'hire video editor Karnataka India',
    'freelance web developer contact',
    'digital agency Hubli contact',
    'website development inquiry Karnataka',
    'Nehal Nadaf WhatsApp',
    'web developer for hire Hubli',
  ],
  canonicalPath: '/contact',
});

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SEO.baseUrl,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Contact',
      item: `${SEO.baseUrl}/contact`,
    },
  ],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
