/**
 * /projects page metadata — server component layout.
 * Provides unique, keyword-rich SEO for the website portfolio page.
 * BreadcrumbList JSON-LD included for rich breadcrumb results in Google.
 */

import { buildMetadata, SEO } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Website Projects — Nehal Nadaf | Web Developer Hubli Karnataka',
  description:
    'Explore 8+ professional websites built by Nehal Nadaf — automotive detailing, dental healthcare, food service, and home-appliance industries. Built with React.js, Next.js, Tailwind CSS, GSAP, deployed on Vercel.',
  canonicalPath: '/projects',
  keywords: [
    'website portfolio Hubli',
    'web development projects India',
    'React.js website examples',
    'Next.js portfolio projects',
    'professional website design Karnataka',
    'business website developer Hubli',
    'Vercel deployed websites India',
    'GSAP animation portfolio',
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

// ItemList schema — exposes all portfolio websites to Google structured data
const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Website Projects by Nehal Nadaf',
  description: '8+ professional business websites built by Nehal Nadaf — web developer based in Hubli, Karnataka.',
  url: `${SEO.baseUrl}/projects`,
  numberOfItems: 8,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Auto Glam Detailing Studio', url: 'https://auto-glam.vercel.app', description: 'Automotive detailing studio website — React.js, Next.js' },
    { '@type': 'ListItem', position: 2, name: 'CARDEE The Detailing Studio', url: 'https://cardee-detailing-studio.vercel.app', description: 'Automotive detailing studio website — React.js, Next.js' },
    { '@type': 'ListItem', position: 3, name: 'Baba Royal Garage', url: 'https://baba-royal-garage-m6hv.vercel.app', description: 'Automotive garage website — React.js, Next.js' },
    { '@type': 'ListItem', position: 4, name: 'Apex Dental Clinic', url: 'https://apex-dental-five.vercel.app', description: 'Dental clinic healthcare website' },
    { '@type': 'ListItem', position: 5, name: 'Hayat Family Restaurant', url: 'https://hayat-the-family-restaurant.vercel.app', description: 'Family restaurant hospitality website' },
    { '@type': 'ListItem', position: 6, name: 'Annachi Tiffin Centre', url: 'https://annachi-tiffin-centre.vercel.app', description: 'Tiffin centre food service website' },
    { '@type': 'ListItem', position: 7, name: 'Hosatti Refrigeration Service', url: 'https://hosatti.com', description: 'Home appliance repair service website' },
    { '@type': 'ListItem', position: 8, name: 'Custom Resume Website', url: 'https://arshan-girniwale-resume.vercel.app', description: 'Personal resume portfolio website' },
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
