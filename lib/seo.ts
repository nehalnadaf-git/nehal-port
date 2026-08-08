/**
 * Central SEO configuration for nehalnadaf.me
 * Single source of truth — imported by all pages, layout, and schema helpers.
 *
 * LLM OPTIMISATION NOTE:
 * Descriptions and keywords are written to be entity-rich (names, locations,
 * technologies) so that AI-powered search (Perplexity, ChatGPT, Gemini) can
 * confidently surface this site when users ask about related topics.
 */

import type { Metadata } from 'next';

// ─── Core Business Identity ───────────────────────────────────────────────────

export const SEO = {
  baseUrl: 'https://nehalnadaf.me',
  name: 'Nehal Nadaf',
  shortName: 'Nehal Nadaf',
  tagline: 'Web Developer · UI/UX Designer · Video Editor',
  // Primary meta description — 155 chars, entity-rich for LLM indexing
  description:
    'Nehal Nadaf — Freelance Web Developer, UI/UX Designer, Video Editor & Social Media Agency. Based in Hubli, Karnataka — serving clients across India and worldwide. 5+ years of video editing experience.',
  // Long-form description used in JSON-LD schemas — LLM-optimised entity data
  longDescription:
    'Nehal Nadaf is a multi-disciplinary creative professional based in Hubli, Karnataka, India — available for remote and on-site work across India and internationally. He specialises in premium web development (React.js, Next.js, Tailwind CSS, GSAP), UI/UX design, professional video production and colour grading (DaVinci Resolve), social media content creation, and influencer marketing. He has delivered live client websites across the automotive detailing, education, dental healthcare, restaurant, food service, and home-appliance repair industries. His creative agency manages influencer collaborations for brands across Karnataka, connecting them with content creators averaging 50K–100K+ views on Instagram. He works with clients locally in Hubli and Dharwad, remotely across India, and internationally worldwide.',
  email: 'nehalnadaff@gmail.com',
  phone: '+916363278962',
  whatsapp: 'https://wa.me/916363278962?text=Hi%20Nehal%2C%20I%20am%20interested%20in%20working%20with%20you.',

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
    postalCode: '580029',
  },

  // ─── Social Profiles ───────────────────────────────────────────────────────
  social: {
    linkedin: 'https://linkedin.com/in/nehal-nadaf-473800414',
    instagram: 'https://instagram.com/nehalnadaxf',
    twitter: 'https://x.com/NadafNehal',
  },

  // ─── Images ────────────────────────────────────────────────────────────────
  ogImage: '/og-image.jpg',
  portrait: '/images/Nehal.webp',

  // ─── Primary Keywords ──────────────────────────────────────────────────────
  // Covers: brand, service, location, long-tail, social media, influencer, video
  defaultKeywords: [
    // ── Brand identity
    'Nehal Nadaf',
    'nehalnadaf.me',
    'Nehal Nadaf portfolio',
    'Nehal Nadaf web developer',
    'Nehal Nadaf Hubli',

    // ── Web Development — local (primary geo signals)
    'web developer Hubli',
    'web developer Karnataka',
    'web developer India',
    'freelance web developer Hubli',
    'freelance web developer Karnataka',
    'freelance web developer India',
    'website developer Hubli',
    'custom website Hubli',
    'professional website design Hubli',
    'custom website developer Karnataka',
    'best web developer Hubli',
    'web development portfolio India',
    'freelance designer developer Karnataka',
    'hire web developer India',
    // ── Web Development — national & international
    'hire web developer online',
    'remote web developer India',
    'remote freelance web developer',
    'web developer for international clients',
    'affordable web developer India',
    'Indian web developer international',
    'web developer for startups',
    'web developer for small business',
    'website development services online',

    // ── Technology stack — local + global
    'Next.js developer India',
    'Next.js developer Hubli',
    'Next.js developer worldwide',
    'React developer India',
    'React.js developer Hubli',
    'React developer for hire',
    'Tailwind CSS developer India',
    'GSAP animation developer India',
    'Vercel deployment India',
    'full stack developer Hubli',
    'full stack developer India',

    // ── UI/UX Design — local + global
    'UI UX designer Hubli',
    'UI UX designer Karnataka',
    'UI UX designer India',
    'UI UX designer online',
    'remote UI UX designer India',
    'website design Hubli',
    'landing page design India',
    'landing page designer online',

    // ── Video Editing — local + global
    'video editor Hubli',
    'video editor Karnataka',
    'video editor India',
    'cinematic video editor Karnataka',
    'cinematic video editor India',
    'DaVinci Resolve editor India',
    'DaVinci Resolve colour grading',
    'brand video production Hubli',
    'brand video production Karnataka',
    'Instagram Reels editor India',
    'Instagram Reels video editor Hubli',
    'YouTube video editor India',
    'product promo video Hubli',
    'commercial video production India',
    'freelance video editor India',
    'hire video editor online',
    'remote video editor India',
    'freelance video editor international',
    'affordable video editor India',

    // ── Social Media — local + global
    'social media agency Hubli',
    'social media agency Karnataka',
    'social media agency India',
    'social media marketing Hubli',
    'social media marketing Karnataka',
    'social media management Hubli',
    'social media management India',
    'social media content creation Hubli',
    'brand social media strategy India',
    'social media management online',
    'social media agency for international brands',

    // ── Influencer Marketing — local + national + global
    'influencer marketing Hubli',
    'influencer marketing Karnataka',
    'influencer marketing India',
    'influencer agency Hubli',
    'influencer agency Karnataka',
    'influencer management Karnataka',
    'Instagram influencer marketing Hubli',
    'Instagram influencer collaboration Karnataka',
    'brand influencer collaboration India',
    'content creator marketing Hubli',
    'nano influencer marketing India',
    'micro influencer marketing Karnataka',
    'influencer marketing agency India',
    'influencer marketing for international brands',

    // ── Creative services — local + global
    'creative agency Hubli',
    'creative agency Karnataka',
    'digital marketing agency Hubli',
    'brand strategy Hubli',
    'content production India',
    'freelance creative professional India',
    'creative services online',
    'creative agency India remote',
    'freelance creative agency international',
  ],

  // ─── Pages ─────────────────────────────────────────────────────────────────
  pages: {
    home: '/',
    projects: '/projects',
    videos: '/videos',
    influencers: '/influencers',
    about: '/about',
    contact: '/contact',
    services: {
      webDevelopment: '/services/web-development',
      uiUxDesign: '/services/ui-ux-design',
      videoEditing: '/services/video-editing',
      socialMediaMarketing: '/services/social-media-marketing',
    },
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
    category: 'technology',
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
      languages: {
        'en-IN': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    // ─── Favicons & App Icons ────────────────────────────────────────────────
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
      title: SEO.name,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title,
      description,
      siteName: `${SEO.name} — Creative Portfolio`,
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
      // Fixed: using actual X/Twitter handle, not Instagram handle
      creator: '@NadafNehal',
      site: '@NadafNehal',
    },
    // ─── Additional signals ──────────────────────────────────────────────────
    other: {
      'mobile-web-app-capable': 'yes',
      // Geo signals — critical for local freelancer discovery
      'geo.region': SEO.location.regionCode,
      'geo.placename': `${SEO.location.city}, ${SEO.location.region}, ${SEO.location.country}`,
      'geo.position': `${SEO.location.lat};${SEO.location.lng}`,
      'ICBM': `${SEO.location.lat}, ${SEO.location.lng}`,
    },
  };
}
