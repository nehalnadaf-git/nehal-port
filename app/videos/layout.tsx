/**
 * /videos page metadata — server component layout.
 * Provides unique, keyword-rich SEO for the video production portfolio page.
 * BreadcrumbList JSON-LD included for rich breadcrumb results in Google.
 */

import { buildMetadata, SEO } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Video Projects — Nehal Nadaf | Cinematic Video Editor Hubli Karnataka',
  description:
    'Professional video editing portfolio by Nehal Nadaf — brand videos, Instagram Reels, YouTube content, product promos. Cinematic colour grading in DaVinci Resolve. Based in Hubli, Karnataka.',
  canonicalPath: '/videos',
  keywords: [
    'video editor portfolio Hubli',
    'cinematic video editing Karnataka',
    'DaVinci Resolve colour grading India',
    'brand video production Hubli',
    'Instagram Reels editor India',
    'YouTube video editor Karnataka',
    'product promo video Hubli',
    'social media video production India',
    'professional video editor freelance',
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
      name: 'Video Projects',
      item: `${SEO.baseUrl}/videos`,
    },
  ],
};

// ItemList schema — exposes all video portfolio works to Google structured data
const videoListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Video Production Portfolio by Nehal Nadaf',
  description: 'Professional video editing and production portfolio by Nehal Nadaf — cinematic video editor based in Hubli, Karnataka.',
  url: `${SEO.baseUrl}/videos`,
  numberOfItems: 8,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Brand Reel — Cinematic Video Editing', description: 'Cinematic brand video edited and colour-graded in DaVinci Resolve' },
    { '@type': 'ListItem', position: 2, name: 'Cinematic Brand Film', description: 'Professional cinematic brand film with DaVinci Resolve colour grading' },
    { '@type': 'ListItem', position: 3, name: 'Short Form Social Media Video', description: 'Short-form social media video content produced for brand promotion' },
    { '@type': 'ListItem', position: 4, name: 'Social Media — Instagram Reels', description: 'Instagram Reels video production for social media marketing' },
    { '@type': 'ListItem', position: 5, name: 'Brand Film Production', description: 'Professional brand film production with advanced colour grading' },
    { '@type': 'ListItem', position: 6, name: 'Creative Video Reel', description: 'Creative video reel showcasing production quality and editing style' },
    { '@type': 'ListItem', position: 7, name: 'Portfolio Video Showreel', description: 'Video portfolio showreel demonstrating freelance video editing capabilities' },
    { '@type': 'ListItem', position: 8, name: 'YouTube and Brand Video', description: 'YouTube content and brand video production for digital marketing' },
  ],
};

export default function VideosLayout({
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoListSchema) }}
      />
      {children}
    </>
  );
}
