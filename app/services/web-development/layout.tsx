import type { Metadata } from 'next';
import type React from 'react';
import { buildMetadata, SEO } from '@/lib/seo';
import { getService } from '@/lib/services';

const service = getService('web-development');

export const metadata: Metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  keywords: service.keywords,
  canonicalPath: `/services/${service.slug}`,
});

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',     item: SEO.baseUrl },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${SEO.baseUrl}/services/web-development` },
    { '@type': 'ListItem', position: 3, name: service.name, item: `${SEO.baseUrl}/services/${service.slug}` },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.shortDescription,
  provider: {
    '@type': 'Person',
    name: SEO.name,
    url: SEO.baseUrl,
    address: { '@type': 'PostalAddress', addressLocality: SEO.location.city, addressRegion: SEO.location.region, addressCountry: SEO.location.country },
  },
  areaServed: [
    { '@type': 'Place', name: 'Hubli, Karnataka, India' },
    { '@type': 'Place', name: 'India' },
    { '@type': 'Place', name: 'Worldwide' },
  ],
  serviceType: service.name,
  url: `${SEO.baseUrl}/services/${service.slug}`,
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: service.faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

export default function WebDevLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
