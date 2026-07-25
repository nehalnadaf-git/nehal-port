/**
 * Central SEO configuration for nehalnadaf.com
 * Single source of truth — imported by all pages, layout, and schema helpers.
 */

import type { Metadata } from 'next';

// ─── Core Business Identity ───────────────────────────────────────────────────

export const SEO = {
  baseUrl: 'https://nehalnadaf.com',
  name: 'Nehal Nadaf',
  shortName: 'Nehal Nadaf',
  tagline: 'Web Developer · UI/UX Designer · Video Editor',
  description:
    'Nehal Nadaf — Full Creative Professional based in Hubli, Karnataka. 5+ years of freelance experience in premium web development (React.js, Next.js), UI/UX design, and cinematic video editing.',
  longDescription:
    'Nehal Nadaf is a multi-disciplinary creative professional specialising in premium web development, UI/UX design, and professional video production based in Hubli, Karnataka, India. 8+ live client websites delivered across automotive detailing, dental healthcare, food service, and home-appliance industries.',
  email: 'nehalnadaff@gmail.com',
  phone: '+916363278962',
  whatsapp: 'https://wa.me/916363278962',

  // ─── Location ──────────────────────────────────────────────────────────────
  location: {
    city: 'Hubli',
    region: 'Karnataka',
    country: 'India',
    countryCode: 'IN',
    regionCode: 'IN-KA',
    // Hubli city center approximate coordinates
    lat: 15.3647,
    lng: 75.1240,
  },

  // ─── Social Profiles ───────────────────────────────────────────────────────
  social: {
    linkedin: 'https://linkedin.com/in/nehal-nadaf-473800414',
    instagram: 'https://instagram.com/nehalnadaxf',
    // Add GitHub / Twitter handles here when available
  },

  // ─── Images ────────────────────────────────────────────────────────────────
  ogImage: '/og-image.jpg',
  portrait: '/images/Nehal.webp',

  // ─── Primary Keywords ──────────────────────────────────────────────────────
  // Covers: brand, service, location, long-tail (guide categories 1, 3, 5, 6)
  defaultKeywords: [
    // Brand
    'Nehal Nadaf',
    'nehalnadaf.com',
    // Service + location
    'web developer Hubli',
    'web developer Karnataka',
    'UI UX designer Hubli',
    'UI UX designer Karnataka',
    'freelance web developer Hubli',
    'freelance web developer India',
    'video editor Hubli',
    'video editor Karnataka',
    // Technology keywords
    'Next.js developer India',
    'React developer India',
    'React.js developer Hubli',
    'Tailwind CSS developer',
    // Long-tail service keywords
    'hire web developer India',
    'professional website design Hubli',
    'custom website developer Karnataka',
    'social media agency Hubli',
    'influencer marketing Hubli',
    'cinematic video editor Karnataka',
    'DaVinci Resolve editor India',
    'brand video production Hubli',
    // Portfolio / comparison
    'best web developer Hubli',
    'web development portfolio India',
    'freelance designer developer Karnataka',
  ],

  // ─── Pages ─────────────────────────────────────────────────────────────────
  pages: {
    home: '/',
    projects: '/projects',
    videos: '/videos',
    influencers: '/influencers',
  },
} as const;

// ─── Metadata Builder ─────────────────────────────────────────────────────────
// Utility for generating per-page Metadata objects with sane defaults.

interface MetadataOverrides {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalPath?: string;   // e.g. '/projects'  → will be appended to baseUrl
  ogImage?: string;
  noIndex?: boolean;
}

export function buildMetadata(overrides: MetadataOverrides = {}): Metadata {
  const canonicalUrl = overrides.canonicalPath
    ? `${SEO.baseUrl}${overrides.canonicalPath}`
    : SEO.baseUrl;

  const title = overrides.title ?? `${SEO.name} — ${SEO.tagline}`;
  const description = overrides.description ?? SEO.description;
  const keywords = overrides.keywords
    ? [...SEO.defaultKeywords, ...overrides.keywords]
    : SEO.defaultKeywords;

  const ogImageUrl = overrides.ogImage ?? SEO.ogImage;

  return {
    metadataBase: new URL(SEO.baseUrl),
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: SEO.name, url: SEO.baseUrl }],
    creator: SEO.name,
    publisher: SEO.name,
    robots: overrides.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    alternates: {
      canonical: canonicalUrl,
    },
    // ─── Favicons & App Icons ────────────────────────────────────────────────
    // Next.js generates the correct <link> tags from these entries.
    // Files must exist at the paths listed (app/ or public/).
    icons: {
      icon: [
        { url: '/favicon.ico', rel: 'shortcut icon' },
        { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: [
        { url: '/apple-icon.png', sizes: '180x180' },
      ],
    },
    manifest: '/manifest.webmanifest',
    appleWebApp: {
      title: 'Nehalnadaf',
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title,
      description,
      siteName: `${SEO.name} Portfolio`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${SEO.name} — ${SEO.tagline}`,
        },
      ],
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
      creator: '@nehalnadaxf',
    },
    // Additional metadata
    other: {
      'mobile-web-app-capable': 'yes',
      // Geo signals (local freelancer discovery)
      'geo.region': SEO.location.regionCode,
      'geo.placename': `${SEO.location.city}, ${SEO.location.region}, ${SEO.location.country}`,
      'geo.position': `${SEO.location.lat};${SEO.location.lng}`,
      'ICBM': `${SEO.location.lat}, ${SEO.location.lng}`,
    },
  };
}
