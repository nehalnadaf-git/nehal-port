/**
 * /projects page metadata — server component layout.
 * Provides unique, keyword-rich SEO for the website portfolio page.
 * BreadcrumbList + ItemList JSON-LD for rich results in Google.
 */

import { buildMetadata, SEO } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Website Projects — Nehal Nadaf | Web Developer Hubli Karnataka India',
  description:
    'Explore 9+ professional business websites built by Nehal Nadaf — web developer in Hubli, Karnataka. Projects span automotive detailing, dental healthcare, restaurants, food service, and home-appliance industries. Built with React.js, Next.js, Tailwind CSS, GSAP, deployed on Vercel.',
  canonicalPath: '/projects',
  keywords: [
    'website portfolio Hubli',
    'web development projects India',
    'website portfolio Karnataka',
    'React.js website examples',
    'Next.js portfolio projects',
    'professional website design Karnataka',
    'business website developer Hubli',
    'Vercel deployed websites India',
    'GSAP animation portfolio',
    'automotive website design India',
    'dental clinic website developer Karnataka',
    'restaurant website developer Hubli',
    'freelance website developer portfolio India',
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
      name: 'Website Projects',
      item: `${SEO.baseUrl}/projects`,
    },
  ],
};

// ItemList schema — exposes all 9 portfolio websites to Google structured data
const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Website Projects by Nehal Nadaf — Web Developer Hubli Karnataka',
  description: '9+ professional business websites built by Nehal Nadaf — web developer based in Hubli, Karnataka, India. Stacks: React.js, Next.js, Tailwind CSS, GSAP, Vercel.',
  url: `${SEO.baseUrl}/projects`,
  numberOfItems: 9,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Auto Glam Detailing Studio',
      url: 'https://auto-glam.vercel.app',
      description: 'Premium automotive detailing studio website — React.js, Next.js, GSAP animations',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'CARDEE The Detailing Studio',
      url: 'https://cardee-detailing-studio.vercel.app',
      description: 'Automotive detailing studio website — React.js, Next.js, custom animations',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Baba Royal Garage',
      url: 'https://baba-royal-garage-m6hv.vercel.app',
      description: 'Automotive garage and car service website — React.js, Next.js',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Apex Dental Clinic',
      url: 'https://apex-dental-five.vercel.app',
      description: 'Dental clinic healthcare website — React.js, Next.js, Tailwind CSS',
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'Empire Restaurant',
      url: 'https://empire-restaurant.vercel.app',
      description: 'Restaurant hospitality website — React.js, Next.js',
    },
    {
      '@type': 'ListItem',
      position: 6,
      name: 'Annachi Tiffin Centre',
      url: 'https://annachi-tiffin-centre.vercel.app',
      description: 'Tiffin centre and food service website — React.js, Next.js',
    },
    {
      '@type': 'ListItem',
      position: 7,
      name: 'Hosatti Home Services',
      url: 'https://hosatti.com',
      description: 'Home appliance repair and refrigeration service website',
    },
    {
      '@type': 'ListItem',
      position: 8,
      name: 'Custom Resume Website — Arshan Girniwale',
      url: 'https://arshan-girniwale-resume.vercel.app',
      description: 'Personal resume and portfolio website — React.js, Next.js',
    },
    {
      '@type': 'ListItem',
      position: 9,
      name: 'LNS Industrial Piping',
      url: 'https://lbownetworksolutions.com',
      description: 'Industrial piping and engineering services website',
    },
  ],
};

export default function ProjectsLayout({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {children}
    </>
  );
}
