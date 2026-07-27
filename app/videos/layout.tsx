/**
 * /videos page metadata — server component layout.
 * Provides unique, keyword-rich SEO for the video production portfolio page.
 * BreadcrumbList + ItemList + VideoObject JSON-LD for rich results in Google.
 */

import { buildMetadata, SEO } from '@/lib/seo';
import { cldPoster, cldVideo } from '@/lib/cloudinary';

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

// VideoObject schema — allows Google to show individual videos in Search & Discover
// Each VideoObject needs: name, description, thumbnailUrl, uploadDate, contentUrl
const videoObjectSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Video Production Portfolio — Nehal Nadaf',
  url: `${SEO.baseUrl}/videos`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'VideoObject',
        name: 'TPF Tajweed — Brand Reel',
        description: 'Brand reel video production for TPF Tajweed — cinematic editing and colour grading in DaVinci Resolve by Nehal Nadaf, Hubli Karnataka.',
        thumbnailUrl: cldPoster('https://res.cloudinary.com/w71scqkk/video/upload/v1784353308/TPF_Tajweed_hmazce.mp4'),
        contentUrl: cldVideo('https://res.cloudinary.com/w71scqkk/video/upload/v1784353308/TPF_Tajweed_hmazce.mp4'),
        uploadDate: '2025-05-18',
        author: { '@id': `${SEO.baseUrl}/#person` },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'VideoObject',
        name: 'True Path Foundation ADV — Brand Reel',
        description: 'Vertical brand advertisement video for True Path Foundation — cinematic editing in DaVinci Resolve by Nehal Nadaf.',
        thumbnailUrl: cldPoster('https://res.cloudinary.com/w71scqkk/video/upload/v1785126183/True_Path_foundation_ADV_apywir.mp4'),
        contentUrl: cldVideo('https://res.cloudinary.com/w71scqkk/video/upload/v1785126183/True_Path_foundation_ADV_apywir.mp4'),
        uploadDate: '2025-05-27',
        author: { '@id': `${SEO.baseUrl}/#person` },
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'VideoObject',
        name: 'Empire Commercial — Cinematic Brand Film',
        description: 'Cinematic commercial video for Empire Restaurant — professional colour grading in DaVinci Resolve by Nehal Nadaf, Hubli.',
        thumbnailUrl: cldPoster('https://res.cloudinary.com/w71scqkk/video/upload/v1784353306/Empire_Commercial_Video_3_fuccwf.mp4'),
        contentUrl: cldVideo('https://res.cloudinary.com/w71scqkk/video/upload/v1784353306/Empire_Commercial_Video_3_fuccwf.mp4'),
        uploadDate: '2025-05-18',
        author: { '@id': `${SEO.baseUrl}/#person` },
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'VideoObject',
        name: 'Al Moon Academy — Short Form Video',
        description: 'Short-form social media video for Al Moon Academy — Instagram and YouTube content production by Nehal Nadaf.',
        thumbnailUrl: cldPoster('https://res.cloudinary.com/w71scqkk/video/upload/v1784353283/Al_Moon_Academy_Eng_1_l5pbgt.mp4'),
        contentUrl: cldVideo('https://res.cloudinary.com/w71scqkk/video/upload/v1784353283/Al_Moon_Academy_Eng_1_l5pbgt.mp4'),
        uploadDate: '2025-05-18',
        author: { '@id': `${SEO.baseUrl}/#person` },
      },
    },
    {
      '@type': 'ListItem',
      position: 5,
      item: {
        '@type': 'VideoObject',
        name: 'YC5 Brand Film Production',
        description: 'Professional brand film with advanced colour grading — DaVinci Resolve, produced by Nehal Nadaf, Hubli Karnataka.',
        thumbnailUrl: cldPoster('https://res.cloudinary.com/w71scqkk/video/upload/v1785126518/YC5_slkuzx.mp4'),
        contentUrl: cldVideo('https://res.cloudinary.com/w71scqkk/video/upload/v1785126518/YC5_slkuzx.mp4'),
        uploadDate: '2025-05-27',
        author: { '@id': `${SEO.baseUrl}/#person` },
      },
    },
  ],
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObjectSchema) }}
      />
      {children}
    </>
  );
}
