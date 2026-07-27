/**
 * HomeSEO — Server component that injects all GLOBAL JSON-LD schemas.
 *
 * Why a separate server component?
 * app/page.tsx is 'use client' (needed for GSAP/hooks) so it cannot
 * export generateMetadata(). Instead, this server component renders
 * <script type="application/ld+json"> tags for global schemas.
 * It is imported in app/layout.tsx so it renders on EVERY page.
 *
 * Schemas included (global — valid on all pages):
 * 1. Person              — who Nehal is (LLM knowledge card)
 * 2. WebSite             — enables Google Sitelinks search box
 * 3. LocalBusiness       — Google Maps / local pack ranking
 * 4. ProfessionalService — freelance creative service entity
 * 5. Organization        — the creative agency entity
 */

import { SEO } from '@/lib/seo';

// ─── Schema Builders ──────────────────────────────────────────────────────────

function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SEO.baseUrl}/#person`,
    name: SEO.name,
    givenName: 'Nehal',
    familyName: 'Nadaf',
    url: SEO.baseUrl,
    email: SEO.email,
    telephone: SEO.phone,
    // All three job titles — critical for multi-role LLM recognition
    jobTitle: [
      'Web Developer',
      'UI/UX Designer',
      'Video Editor',
      'Social Media Manager',
      'Influencer Marketing Consultant',
    ],
    description: SEO.longDescription,
    image: {
      '@type': 'ImageObject',
      url: `${SEO.baseUrl}${SEO.portrait}`,
      width: 800,
      height: 1000,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hubli',
      addressLocality: SEO.location.city,
      addressRegion: SEO.location.region,
      postalCode: SEO.location.postalCode,
      addressCountry: SEO.location.countryCode,
    },
    // Entity-rich knowledge fields for LLM indexing
    knowsAbout: [
      'Web Development',
      'React.js',
      'Next.js',
      'JavaScript',
      'TypeScript',
      'Tailwind CSS',
      'GSAP Animation',
      'UI/UX Design',
      'Figma',
      'Video Editing',
      'DaVinci Resolve',
      'Colour Grading',
      'Social Media Marketing',
      'Social Media Management',
      'Influencer Marketing',
      'Brand Strategy',
      'Content Creation',
      'Instagram Reels',
      'YouTube Content',
      'Brand Video Production',
    ],
    hasOccupation: [
      {
        '@type': 'Occupation',
        name: 'Web Developer',
        occupationLocation: { '@type': 'City', name: SEO.location.city },
        skills: 'React.js, Next.js, TypeScript, Tailwind CSS, GSAP',
      },
      {
        '@type': 'Occupation',
        name: 'Video Editor',
        occupationLocation: { '@type': 'City', name: SEO.location.city },
        skills: 'DaVinci Resolve, Colour Grading, Brand Video, Instagram Reels',
      },
      {
        '@type': 'Occupation',
        name: 'Social Media Manager',
        occupationLocation: { '@type': 'City', name: SEO.location.city },
        skills: 'Influencer Marketing, Brand Strategy, Content Creation',
      },
    ],
    worksFor: {
      '@id': `${SEO.baseUrl}/#agency`,
    },
    sameAs: [
      SEO.social.linkedin,
      SEO.social.instagram,
      SEO.social.twitter,
      SEO.baseUrl,
    ],
  };
}

function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SEO.baseUrl}/#website`,
    name: `${SEO.name} — Creative Portfolio`,
    alternateName: ['Nehal Nadaf Portfolio', 'nehalnadaf.me'],
    url: SEO.baseUrl,
    description: SEO.description,
    author: {
      '@id': `${SEO.baseUrl}/#person`,
    },
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO.baseUrl}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// NEW: LocalBusiness schema — directly signals Google Maps / local pack
function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${SEO.baseUrl}/#localbusiness`,
    name: 'Nehal Nadaf — Web Developer & Creative Agency Hubli',
    url: SEO.baseUrl,
    email: SEO.email,
    telephone: SEO.phone,
    description:
      'Freelance web developer, video editor, and social media agency based in Hubli, Karnataka, India — serving clients locally in Hubli and Dharwad, remotely across India, and internationally worldwide. Specialising in React.js / Next.js websites, cinematic video editing, and influencer marketing for businesses of all sizes.',
    image: `${SEO.baseUrl}${SEO.portrait}`,
    logo: `${SEO.baseUrl}/images/Nehal.webp`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hubli',
      addressLocality: SEO.location.city,
      addressRegion: SEO.location.region,
      postalCode: SEO.location.postalCode,
      addressCountry: SEO.location.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SEO.location.lat,
      longitude: SEO.location.lng,
    },
    areaServed: [
      { '@type': 'City', name: 'Hubli' },
      { '@type': 'City', name: 'Dharwad' },
      { '@type': 'City', name: 'Bangalore' },
      { '@type': 'State', name: 'Karnataka' },
      { '@type': 'Country', name: 'India' },
      { '@type': 'Place', name: 'International' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    priceRange: '₹₹',
    currenciesAccepted: 'INR, USD',
    paymentAccepted: 'Bank Transfer, UPI, Razorpay',
    openingHours: 'Mo-Sa 09:00-21:00',
    foundingDate: '2020',
    founder: {
      '@id': `${SEO.baseUrl}/#person`,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Creative Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Development',
            description:
              'Custom websites and web apps built with React.js, Next.js, Tailwind CSS, GSAP — deployed on Vercel with sub-second load times.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'UI/UX Design',
            description:
              'Immersive, conversion-focused digital experiences with modern typography, micro-animations, and user-centred design in Figma.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Video Production & Editing',
            description:
              'Cinematic video editing and colour grading in DaVinci Resolve — brand films, Instagram Reels, YouTube content, product promos.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Social Media Management & Marketing',
            description:
              'Full-service social media content production, strategy, and influencer marketing campaigns for brands in Karnataka and across India.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Influencer Marketing',
            description:
              'Connecting brands with Instagram, YouTube, and social media influencers in Hubli, Karnataka — averaging 50K–100K+ views per collaboration.',
          },
        },
      ],
    },
    sameAs: [
      SEO.social.linkedin,
      SEO.social.instagram,
      SEO.social.twitter,
    ],
  };
}

function professionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SEO.baseUrl}/#service`,
    name: 'Nehal Nadaf Creative Services',
    url: SEO.baseUrl,
    email: SEO.email,
    telephone: SEO.phone,
    description: SEO.longDescription,
    founder: {
      '@id': `${SEO.baseUrl}/#person`,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SEO.location.city,
      addressRegion: SEO.location.region,
      postalCode: SEO.location.postalCode,
      addressCountry: SEO.location.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SEO.location.lat,
      longitude: SEO.location.lng,
    },
    areaServed: [
      { '@type': 'City', name: 'Hubli' },
      { '@type': 'City', name: 'Dharwad' },
      { '@type': 'City', name: 'Bangalore' },
      { '@type': 'State', name: 'Karnataka' },
      { '@type': 'Country', name: 'India' },
      { '@type': 'Place', name: 'International' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    serviceType: [
      'Web Development',
      'UI/UX Design',
      'Video Editing',
      'Social Media Management',
      'Social Media Marketing',
      'Influencer Marketing',
      'Brand Strategy',
      'Content Creation',
    ],
    knowsAbout: [
      'React.js', 'Next.js', 'Tailwind CSS', 'GSAP', 'Figma',
      'DaVinci Resolve', 'Instagram Reels', 'YouTube Content',
      'Influencer Marketing', 'Social Media Management',
    ],
  };
}

function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SEO.baseUrl}/#agency`,
    name: 'Nehal Nadaf Creative Agency',
    legalName: 'Nehal Nadaf Creative Agency',
    url: SEO.baseUrl,
    email: SEO.email,
    telephone: SEO.phone,
    description:
      'Full-service creative agency based in Hubli, Karnataka, India — serving clients across India and internationally worldwide. Services include influencer marketing, brand strategy, social media management, video production, content creation, and web development for businesses of all sizes.',
    logo: {
      '@type': 'ImageObject',
      url: `${SEO.baseUrl}/images/Nehal.webp`,
      width: 400,
      height: 400,
    },
    foundingDate: '2020',
    foundingLocation: {
      '@type': 'Place',
      name: 'Hubli, Karnataka, India',
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 5,
    },
    founder: {
      '@id': `${SEO.baseUrl}/#person`,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SEO.location.city,
      addressRegion: SEO.location.region,
      postalCode: SEO.location.postalCode,
      addressCountry: SEO.location.countryCode,
    },
    areaServed: [
      { '@type': 'City', name: 'Hubli' },
      { '@type': 'City', name: 'Dharwad' },
      { '@type': 'City', name: 'Bangalore' },
      { '@type': 'State', name: 'Karnataka' },
      { '@type': 'Country', name: 'India' },
      { '@type': 'Place', name: 'International' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    serviceType: [
      'Influencer Marketing',
      'Social Media Management',
      'Social Media Marketing',
      'Brand Strategy',
      'Video Production',
      'Content Creation',
      'Web Development',
      'UI/UX Design',
    ],
    sameAs: [
      SEO.social.linkedin,
      SEO.social.instagram,
      SEO.social.twitter,
      SEO.baseUrl,
    ],
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomeSEO() {
  const schemas = [
    personSchema(),
    websiteSchema(),
    localBusinessSchema(),
    professionalServiceSchema(),
    organizationSchema(),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
        />
      ))}
    </>
  );
}
