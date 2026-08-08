/**
 * /influencers page metadata — server component layout.
 * Provides unique, keyword-rich SEO for the influencer marketing page.
 * BreadcrumbList + Service + ItemList JSON-LD for full Google rich results.
 */

import { buildMetadata, SEO } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Influencer Marketing Hubli Karnataka — Nehal Nadaf | Social Media Agency',
  description:
    'Nehal Nadaf\'s social media agency in Hubli, Karnataka connects brands with Instagram & YouTube influencers averaging 50K–100K+ views. Expert influencer marketing campaigns across Karnataka and India for maximum brand reach and ROI.',
  canonicalPath: '/influencers',
  keywords: [
    'influencer marketing Hubli',
    'influencer marketing Karnataka',
    'influencer marketing India',
    'social media agency Hubli Karnataka',
    'Instagram influencer Hubli',
    'Instagram influencer Karnataka',
    'brand influencer collaboration India',
    'influencer collaboration Karnataka',
    'YouTube influencer agency Hubli',
    'social media brand strategy India',
    'influencer management agency Karnataka',
    'brand promotion social media Hubli',
    'content creator Hubli Karnataka',
    'micro influencer Karnataka',
    'nano influencer Hubli',
    'brand awareness Karnataka',
    'social media marketing agency India',
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
      name: 'Influencer Marketing',
      item: `${SEO.baseUrl}/influencers`,
    },
  ],
};

// Service schema — dedicated influencer marketing service entity
const influencerServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SEO.baseUrl}/influencers#service`,
  name: 'Influencer Marketing & Social Media Agency — Hubli, Karnataka',
  url: `${SEO.baseUrl}/influencers`,
  description:
    'Full-service influencer marketing agency in Hubli, Karnataka connecting brands with Instagram and YouTube content creators across Karnataka and India. Services include influencer identification, campaign strategy, content production, and performance tracking.',
  provider: {
    '@id': `${SEO.baseUrl}/#agency`,
  },
  areaServed: [
    { '@type': 'City', name: 'Hubli' },
    { '@type': 'City', name: 'Dharwad' },
    { '@type': 'State', name: 'Karnataka' },
    { '@type': 'Country', name: 'India' },
  ],
  serviceType: 'Influencer Marketing',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Influencer Marketing Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Instagram Influencer Marketing',
          description: 'Brand collaborations with Karnataka-based Instagram influencers averaging 50K–100K+ views per post.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'YouTube Influencer Campaigns',
          description: 'YouTube content creator partnerships for brand awareness and product promotion across India.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Social Media Content Production',
          description: 'End-to-end social media content creation, scripting, filming, editing, and publishing for brands.',
        },
      },
    ],
  },
};

// ItemList schema — exposes all 6 influencer collaborators as entities
const influencerListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Influencer Collaborations — Nehal Nadaf Creative Agency Hubli',
  description: 'Instagram and YouTube influencer collaborations managed by Nehal Nadaf\'s creative agency in Hubli, Karnataka.',
  url: `${SEO.baseUrl}/influencers`,
  numberOfItems: 6,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: '@kaifofficial_19 — Instagram Influencer Karnataka',
      description: 'Karnataka-based Instagram content creator with 60K+ average views per post.',
      url: 'https://www.instagram.com/kaifofficial_19',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: '@afozz_ae — Instagram Influencer Karnataka',
      description: 'Karnataka-based Instagram content creator with 70K+ average views per post.',
      url: 'https://www.instagram.com/afozz_ae',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: '@hubballitimes — Hubballi Times Instagram',
      description: 'Hubballi local news and content page with 70K+ average views per post.',
      url: 'https://www.instagram.com/hubballitimes',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: '@nadeem_pov — Instagram Content Creator Karnataka',
      description: 'Karnataka-based Instagram POV content creator with 50K+ average views.',
      url: 'https://www.instagram.com/nadeem_pov',
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: '@sahil_hvines — Instagram Influencer Hubli',
      description: 'Hubli-based Instagram lifestyle influencer with 100K+ average views per post.',
      url: 'https://www.instagram.com/sahil_hvines',
    },
    {
      '@type': 'ListItem',
      position: 6,
      name: '@yavvooshahid — Instagram Content Creator',
      description: 'Karnataka-based Instagram content creator with 70K+ average views per post.',
      url: 'https://www.instagram.com/yavvooshahid',
    },
  ],
};

// FAQPage schema — influencer-marketing-specific FAQs for rich results on /influencers
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "How does Nehal Nadaf's influencer marketing agency work?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The agency identifies the right influencers for your brand from a managed network of Karnataka-based Instagram and YouTube creators, develops the campaign brief, coordinates content creation, reviews and approves content before publishing, and tracks performance post-publication. The full process is managed — brands don't need to coordinate directly with individual influencers.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is the average reach of influencers in the network?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The influencer network covers creators averaging 50K–100K+ views per post across Instagram and YouTube. The network includes @sahil_hvines (100K+ average views), @afozz_ae, @hubballitimes, and @yavvooshahid (70K+ average views each), @kaifofficial_19 (60K+ average views), and @nadeem_pov (50K+ average views). All are based in Karnataka, India.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this influencer marketing service cover brands outside Karnataka?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. While the influencer network is primarily Karnataka-based — making it ideal for brands targeting Hubli, Dharwad, Bangalore, and the broader Karnataka market — the agency can source creators for national campaigns across India or international brand awareness campaigns on request.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I start an influencer marketing campaign?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Contact via WhatsApp or email with your brand details, campaign goal, and target audience. The agency will identify the right influencers from the network, propose a campaign structure, and send a detailed proposal before any commitment. WhatsApp: +91 6363278962. Email: nehalnadaff@gmail.com.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of influencer content are available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Instagram Reels for maximum reach and algorithm distribution, Instagram static posts and stories for product placements and brand features, and YouTube dedicated videos or integrations. Content types are matched to the campaign goal — brand awareness favours Reels, product reviews favour YouTube, and event promotions work best as stories combined with Reels.',
      },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(influencerServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(influencerListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
