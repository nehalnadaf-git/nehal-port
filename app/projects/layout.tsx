/**
 * /projects page metadata — server component layout.
 * Provides unique, keyword-rich SEO for the website portfolio page.
 * BreadcrumbList + ItemList JSON-LD for rich results in Google.
 */

import { buildMetadata, SEO } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Website Projects — Nehal Nadaf | Web Developer Hubli Karnataka India',
  description:
    'Explore 10+ professional business websites built by Nehal Nadaf — web developer in Hubli, Karnataka. Projects span automotive detailing, education, dental healthcare, restaurants, food service, and home-appliance industries. Built with React.js, Next.js, Tailwind CSS, GSAP, deployed on Vercel.',
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

// ItemList schema — exposes all 10 portfolio websites to Google structured data
const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Website Projects by Nehal Nadaf — Web Developer Hubli Karnataka',
  description: '10+ professional business websites built by Nehal Nadaf — web developer based in Hubli, Karnataka, India. Stacks: React.js, Next.js, Tailwind CSS, GSAP, Vercel.',
  url: `${SEO.baseUrl}/projects`,
  numberOfItems: 10,
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
      name: 'Tippu Shaheed Education Trust',
      url: 'https://tpshaheed.vercel.app',
      description: 'Educational trust & school website — React.js, Next.js, Tailwind CSS',
    },
    {
      '@type': 'ListItem',
      position: 8,
      name: 'Hosatti Home Services',
      url: 'https://hosatti.com',
      description: 'Home appliance repair and refrigeration service website',
    },
    {
      '@type': 'ListItem',
      position: 9,
      name: 'Custom Resume Website — Arshan Girniwale',
      url: 'https://arshan-girniwale-resume.vercel.app',
      description: 'Personal resume and portfolio website — React.js, Next.js',
    },
    {
      '@type': 'ListItem',
      position: 10,
      name: 'LNS Industrial Piping',
      url: 'https://lbownetworksolutions.com',
      description: 'Industrial piping and engineering services website',
    },
  ],
};

// FAQPage schema — web-development-specific FAQs for rich results on /projects
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What kind of websites does Nehal Nadaf build?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nehal Nadaf builds custom business websites and web applications using React.js, Next.js, and Tailwind CSS — no templates, no WordPress. Projects span automotive detailing studios, dental clinics, restaurants, schools, food service businesses, and personal portfolio sites. Every website is deployed on Vercel for sub-second global load times.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Nehal Nadaf build websites for clients outside India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Web development is fully remote-compatible. Clients across Karnataka, across India, and internationally receive the same process: design review, iterative feedback rounds, and final deployment on Vercel. Time zones and geography are not a constraint — all collaboration happens asynchronously via video calls and shared design files.',
      },
    },
    {
      '@type': 'Question',
      name: 'What tech stack is used for these web development projects?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'React.js and Next.js form the foundation. TypeScript catches errors at development time. Tailwind CSS handles responsive, mobile-first styling. GSAP (GreenSock Animation Platform) powers scroll-triggered animations and micro-interactions. All projects are deployed on Vercel with global CDN for fast load times worldwide.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build a professional business website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A standard business website with 5–8 pages typically takes 3–5 weeks from design kickoff to live deployment — including the UI/UX design phase, React.js / Next.js development, content integration, cross-device testing, and final SEO setup. More complex projects with custom functionality may take 6–10 weeks. Every project includes a timeline agreed upfront.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I see live examples of websites built by Nehal Nadaf?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — this page showcases 10+ live websites across diverse industries. Each project card links directly to the deployed site. Projects include Auto Glam Detailing Studio, CARDEE Detailing Studio, Baba Royal Garage, Apex Dental Clinic, Empire Restaurant, Annachi Tiffin Centre, Tippu Shaheed Education Trust, Hosatti Home Services, and more — all built with React.js and Next.js.',
      },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
