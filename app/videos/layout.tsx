/**
 * /videos page metadata — server component layout.
 * Provides unique, keyword-rich SEO for the video production portfolio page.
 * BreadcrumbList + ItemList JSON-LD for rich results in Google.
 */

import { buildMetadata, SEO } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Video Projects — Nehal Nadaf | Cinematic Video Editor Hubli Karnataka India',
  description:
    'Professional video editing portfolio by Nehal Nadaf — cinematic video editor in Hubli, Karnataka. Brand films, Instagram Reels, YouTube content, product promos, colour grading in DaVinci Resolve. Serving clients across Karnataka and India.',
  canonicalPath: '/videos',
  keywords: [
    'video editor portfolio Hubli',
    'video editor portfolio Karnataka',
    'cinematic video editing Karnataka',
    'cinematic video editor India',
    'DaVinci Resolve colour grading India',
    'DaVinci Resolve editor Karnataka',
    'brand video production Hubli',
    'brand video production Karnataka',
    'Instagram Reels editor India',
    'Instagram Reels video editor Hubli',
    'YouTube video editor Karnataka',
    'YouTube video editor India',
    'product promo video Hubli',
    'social media video production India',
    'professional video editor freelance India',
    'commercial video editor Karnataka',
    'brand film production India',
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

// ItemList schema — exposes all 6 actual video works to Google structured data
const videoListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Video Production Portfolio by Nehal Nadaf — Cinematic Video Editor Hubli Karnataka',
  description: 'Professional video editing and production portfolio by Nehal Nadaf — cinematic video editor based in Hubli, Karnataka, India. Colour grading in DaVinci Resolve.',
  url: `${SEO.baseUrl}/videos`,
  numberOfItems: 7,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'TPF Tajweed — Brand Reel', description: 'Brand reel video production for TPF Tajweed — cinematic editing and colour grading in DaVinci Resolve' },
    { '@type': 'ListItem', position: 2, name: 'True Path Foundation ADV — Brand Reel', description: 'Vertical brand advertisement video for True Path Foundation — cinematic editing in DaVinci Resolve' },
    { '@type': 'ListItem', position: 3, name: 'Empire Commercial — Cinematic Brand Film', description: 'Cinematic commercial video for Empire Restaurant — professional colour grading in DaVinci Resolve' },
    { '@type': 'ListItem', position: 4, name: 'Al Moon Academy — Short Form Video', description: 'Short-form social media video content for Al Moon Academy — Instagram Reels and YouTube production' },
    { '@type': 'ListItem', position: 5, name: 'Brand Reel — Social Media Video Production', description: 'Social media brand reel produced for Instagram — cinematic editing and motion graphics' },
    { '@type': 'ListItem', position: 6, name: 'Brand Film Production', description: 'Professional brand film with advanced colour grading — DaVinci Resolve, Hubli Karnataka' },
    { '@type': 'ListItem', position: 7, name: 'Creative Video Reel — Portfolio Showreel', description: 'Video portfolio showreel demonstrating cinematic video editing capabilities — DaVinci Resolve, India' },
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
