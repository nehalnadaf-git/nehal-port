/**
 * HomeSEO — Server component that injects all homepage JSON-LD schemas.
 *
 * Why a separate server component?
 * app/page.tsx is 'use client' (needed for GSAP/hooks) so it cannot
 * export generateMetadata(). Instead, this server component renders
 * <script type="application/ld+json"> tags for all homepage schemas.
 * It is imported in app/layout.tsx so it renders on EVERY page —
 * the Person + WebSite schemas are global and appropriate on all pages.
 * The FAQPage schema is homepage-specific and only meaningful on /.
 *
 * Schemas included:
 * 1. Person           — who Nehal is (global, good for all pages)
 * 2. WebSite          — enables Google Sitelinks Search Box
 * 3. FAQPage          — FAQ rich results (accordion in Google SERP)
 * 4. ProfessionalService — local freelancer business entity
 */

import { SEO } from '@/lib/seo';

// ─── FAQ data (mirrors FAQSection.tsx) ────────────────────────────────────────
// Keep in sync with sections/FAQSection.tsx
const faqs = [
  {
    question: 'What services do you offer?',
    answer:
      'Premium web development (React.js, Next.js, Tailwind CSS, GSAP), UI/UX design, professional video editing and colour grading (DaVinci Resolve), graphic design, and full social media content production — covering brand videos, Instagram Reels, YouTube content, and product promos.',
  },
  {
    question: 'Do you work with social media content?',
    answer:
      'Yes — through our agency setup we produce professional social media content including Instagram Reels, YouTube videos, branded graphics, and campaign creatives. We are the production force behind the content — ensuring everything is polished, strategic, and on-brand.',
  },
  {
    question: 'How many projects have you delivered?',
    answer:
      '8+ professional business websites across automotive detailing, dental healthcare, food service, and home-appliance industries — plus years of video production work for brands and content creators.',
  },
  {
    question: 'How do we get started?',
    answer:
      "Hit the contact button or email nehalnadaff@gmail.com directly. You can also WhatsApp at +91 6363278962. We'll align on your vision, goals, and timeline — then move fast.",
  },
  {
    question: 'What is your tech stack for web development?',
    answer:
      'React.js, Next.js, HTML5, CSS3, JavaScript (ES6+), Tailwind CSS, and GSAP for animations. All projects are deployed on Vercel for lightning-fast load times, high availability, and global CDN performance.',
  },
  {
    question: 'What does your agency offer beyond freelance?',
    answer:
      'Behind Nehal is a full creative agency with graphic designers, video editors, videographers, and content scriptwriters. We handle complete creative production — from brand identity and social media creatives to video shoots and web development — acting as a full creative partner for your brand.',
  },
];

// ─── Schema Builders ──────────────────────────────────────────────────────────

function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SEO.baseUrl}/#person`,
    name: SEO.name,
    url: SEO.baseUrl,
    email: SEO.email,
    telephone: SEO.phone,
    jobTitle: 'Web Developer, UI/UX Designer & Social Media Agency',
    description: SEO.description,
    image: {
      '@type': 'ImageObject',
      url: `${SEO.baseUrl}${SEO.portrait}`,
      width: 800,
      height: 1000,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SEO.location.city,
      addressRegion: SEO.location.region,
      addressCountry: SEO.location.countryCode,
    },
    knowsAbout: [
      'Web Development',
      'React.js',
      'Next.js',
      'Tailwind CSS',
      'GSAP Animation',
      'UI/UX Design',
      'Figma',
      'Video Editing',
      'DaVinci Resolve',
      'Social Media Marketing',
      'Influencer Marketing',
    ],
    sameAs: [
      SEO.social.linkedin,
      SEO.social.instagram,
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Web Developer',
      occupationLocation: {
        '@type': 'City',
        name: SEO.location.city,
      },
    },
  };
}

function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SEO.baseUrl}/#website`,
    name: `${SEO.name} Portfolio`,
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

function professionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SEO.baseUrl}/#service`,
    name: SEO.name,
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
      addressCountry: SEO.location.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SEO.location.lat,
      longitude: SEO.location.lng,
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    serviceType: [
      'Web Development',
      'UI/UX Design',
      'Video Editing',
      'Social Media Marketing',
      'Influencer Marketing',
    ],
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
              'Custom websites built with React.js, Next.js, Tailwind CSS — deployed on Vercel.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'UI/UX Design',
            description:
              'Immersive digital experiences with modern typography, animations, and user-centred design.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Video Production & Editing',
            description:
              'Cinematic video editing in DaVinci Resolve — brand videos, Instagram Reels, YouTube content, product promos.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Social Media Agency & Influencer Marketing',
            description:
              'Full-service social media production and influencer marketing campaigns for brands.',
          },
        },
      ],
    },
  };
}

function faqPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SEO.baseUrl}/#agency`,
    name: 'Nehal Nadaf Creative Agency',
    url: SEO.baseUrl,
    email: SEO.email,
    telephone: SEO.phone,
    description:
      'Full-service social media and creative agency based in Hubli, Karnataka — offering influencer marketing, brand strategy, video production, graphic design, and web development.',
    founder: {
      '@id': `${SEO.baseUrl}/#person`,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SEO.location.city,
      addressRegion: SEO.location.region,
      addressCountry: SEO.location.countryCode,
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    serviceType: [
      'Influencer Marketing',
      'Brand Strategy',
      'Video Production',
      'Graphic Design',
      'Social Media Content',
      'Web Development',
    ],
    sameAs: [
      SEO.social.instagram,
    ],
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomeSEO() {
  const schemas = [
    personSchema(),
    websiteSchema(),
    professionalServiceSchema(),
    faqPageSchema(),
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
