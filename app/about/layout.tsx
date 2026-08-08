/**
 * /about — metadata + JSON-LD schemas (server component).
 * Provides unique title/description/keywords distinct from the homepage.
 * JSON-LD: BreadcrumbList + Person (extended, about-specific fields).
 */

import type { Metadata } from 'next';
import type React from 'react';
import { buildMetadata, SEO } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `About Nehal Nadaf — Web Developer & Creative in Hubli, Karnataka`,
  description:
    `Learn about Nehal Nadaf — multi-disciplinary web developer, UI/UX designer, and video editor based in Hubli, Karnataka. 5+ years of video editing experience, live business websites, and a full creative agency serving clients across India.`,
  keywords: [
    'about Nehal Nadaf',
    'web developer Hubli Karnataka',
    'UI UX designer Hubli',
    'video editor Karnataka',
    'freelance developer Hubli India',
    'creative professional Karnataka',
    'digital agency Hubli',
    'full stack developer Hubli',
    'React developer Karnataka',
    'Nehal Nadaf portfolio',
  ],
  canonicalPath: '/about',
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
      name: 'About',
      item: `${SEO.baseUrl}/about`,
    },
  ],
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
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
