/**
 * /influencers page metadata — server component layout.
 * Provides unique, keyword-rich SEO for the influencer marketing page.
 * BreadcrumbList JSON-LD included for rich breadcrumb results in Google.
 */

import { buildMetadata, SEO } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Influencer Collaborations — Nehal Nadaf | Social Media Agency Hubli',
  description:
    'Influencer marketing & brand collaborations by Nehal Nadaf\'s social media agency in Hubli, Karnataka. Connecting brands with the right voices on Instagram, YouTube, and social platforms to maximise reach and business growth.',
  canonicalPath: '/influencers',
  keywords: [
    'influencer marketing Hubli',
    'social media agency Hubli Karnataka',
    'brand influencer collaboration India',
    'Instagram influencer marketing Karnataka',
    'YouTube influencer agency Hubli',
    'social media brand strategy India',
    'influencer management agency Karnataka',
    'brand promotion social media Hubli',
  ],
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
      name: 'Influencer Collaborations',
      item: `${SEO.baseUrl}/influencers`,
    },
  ],
};

export default function InfluencersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
