# SEO / Code Audit Dump — nehalnadaf.me
> Generated: 2026-08-03 | Source: e:\Developer\nehal-nadaf-portfolio\nextjs-app

---

## 1. PROJECT OVERVIEW

### Framework / Version
- **Framework:** Next.js `16.2.10`
- **React:** `19.2.4`
- **TypeScript:** `^5`
- **Styling:** Tailwind CSS `^4.3.3`
- **Build:** Webpack (Turbopack disabled for production — Serwist PWA requirement)
- **Deployment:** Vercel

### Business Identity

| Field | Value |
|---|---|
| **Name** | Nehal Nadaf |
| **Domain** | https://nehalnadaf.me |
| **City** | Hubli |
| **Region** | Karnataka |
| **Country** | India |
| **Postal Code** | 580029 |
| **Lat/Lng** | 15.3647, 75.1240 |
| **Email** | nehalnadaff@gmail.com |
| **Phone** | +916363278962 |
| **Tagline** | Web Developer . UI/UX Designer . Video Editor |

### Full File Tree — /app

```
app/
- HomeSEO.tsx              (11,900 bytes) — Global JSON-LD schemas (Person, WebSite, LocalBusiness, ProfessionalService, Organization)
- HomeSchemas.tsx          (4,482 bytes)  — Homepage-only FAQPage JSON-LD
- apple-icon.png           (27,083 bytes)
- favicon.ico              (15,086 bytes)
- globals.css              (21,790 bytes)
- icon.png                 (8,396 bytes)
- icon.svg                 (503,015 bytes)
- layout.tsx               (2,954 bytes)  — Root layout
- manifest.ts              (1,612 bytes)  — Web App Manifest
- opengraph-image.jpg      (337,722 bytes)
- page.tsx                 (1,785 bytes)  — Homepage (use client)
- robots.ts                (711 bytes)    — robots.txt generator
- sitemap.ts               (1,758 bytes)  — sitemap.xml generator
- sw.ts                    (759 bytes)    — Service worker (Serwist PWA)
influencers/
  - layout.tsx   (6,227 bytes)  — /influencers metadata + JSON-LD
  - page.tsx     (10,949 bytes) — /influencers page (use client)
projects/
  - layout.tsx   (4,879 bytes)  — /projects metadata + JSON-LD
  - page.tsx     (14,668 bytes) — /projects page (use client)
videos/
  - layout.tsx   (7,799 bytes)  — /videos metadata + JSON-LD
  - page.tsx     (13,390 bytes) — /videos page (use client)
```

### Full File Tree — /lib

```
lib/
- cloudinary.ts   (1,783 bytes) — Cloudinary URL helpers (cldVideo, cldPoster)
- seo.ts          (11,503 bytes) — Central SEO config (SEO object + buildMetadata())
- utils.ts        (180 bytes)   — cn() class merge utility
```


---

## 2. DATA FILES

### /lib/services.ts — NOT FOUND
No services.ts in /lib. Service data is inlined directly in layout files.

### /lib/locations.ts — NOT FOUND
Location data is centralised in SEO.location inside /lib/seo.ts.

### /lib/brands.ts — NOT FOUND

### /lib/faqs.ts — NOT FOUND
FAQ data is defined inline inside /app/HomeSchemas.tsx.

### /lib/blogs.ts — NOT FOUND
No blog system. This is a portfolio-only site.

### /lib/seo.ts — FULL CONTENTS

```typescript
import type { Metadata } from 'next';

export const SEO = {
  baseUrl: 'https://nehalnadaf.me',
  name: 'Nehal Nadaf',
  shortName: 'Nehal Nadaf',
  tagline: 'Web Developer . UI/UX Designer . Video Editor',
  description: 'Nehal Nadaf — Freelance Web Developer, UI/UX Designer, Video Editor & Social Media Agency. Based in Hubli, Karnataka — serving clients across India and worldwide. 5+ years in premium websites, brand videos, and influencer marketing.',
  longDescription: 'Nehal Nadaf is a multi-disciplinary creative professional based in Hubli, Karnataka, India — available for remote and on-site work across India and internationally. He specialises in premium web development (React.js, Next.js, Tailwind CSS, GSAP), UI/UX design (Figma), professional video production and colour grading (DaVinci Resolve), social media content creation, and influencer marketing. He has delivered 10+ live client websites across the automotive detailing, education, dental healthcare, restaurant, food service, and home-appliance repair industries. His creative agency manages influencer collaborations for brands across Karnataka, connecting them with content creators averaging 50K-100K+ views on Instagram. He works with clients locally in Hubli and Dharwad, remotely across India, and internationally worldwide.',
  email: 'nehalnadaff@gmail.com',
  phone: '+916363278962',
  whatsapp: 'https://wa.me/916363278962?text=Hi%20Nehal%2C%20I%20am%20interested%20in%20working%20with%20you.',

  location: {
    city: 'Hubli',
    region: 'Karnataka',
    country: 'India',
    countryCode: 'IN',
    regionCode: 'IN-KA',
    lat: 15.3647,
    lng: 75.1240,
    postalCode: '580029',
  },

  social: {
    linkedin: 'https://linkedin.com/in/nehal-nadaf-473800414',
    instagram: 'https://instagram.com/nehalnadaxf',
    twitter: 'https://x.com/NadafNehal',
  },

  ogImage: '/og-image.jpg',
  portrait: '/images/Nehal.webp',

  // 118 keywords covering: brand, local/national/global web dev, UI/UX, video, social media, influencer
  defaultKeywords: [
    'Nehal Nadaf', 'nehalnadaf.me', 'Nehal Nadaf portfolio', 'Nehal Nadaf web developer', 'Nehal Nadaf Hubli',
    'web developer Hubli', 'web developer Karnataka', 'web developer India',
    'freelance web developer Hubli', 'freelance web developer Karnataka', 'freelance web developer India',
    'website developer Hubli', 'custom website Hubli', 'professional website design Hubli',
    'custom website developer Karnataka', 'best web developer Hubli', 'web development portfolio India',
    'freelance designer developer Karnataka', 'hire web developer India', 'hire web developer online',
    'remote web developer India', 'remote freelance web developer', 'web developer for international clients',
    'affordable web developer India', 'Indian web developer international', 'web developer for startups',
    'web developer for small business', 'website development services online',
    'Next.js developer India', 'Next.js developer Hubli', 'Next.js developer worldwide',
    'React developer India', 'React.js developer Hubli', 'React developer for hire',
    'Tailwind CSS developer India', 'GSAP animation developer India', 'Vercel deployment India',
    'full stack developer Hubli', 'full stack developer India',
    'UI UX designer Hubli', 'UI UX designer Karnataka', 'UI UX designer India', 'UI UX designer online',
    'remote UI UX designer India', 'Figma designer Hubli', 'website design Hubli',
    'landing page design India', 'landing page designer online',
    'video editor Hubli', 'video editor Karnataka', 'video editor India',
    'cinematic video editor Karnataka', 'cinematic video editor India',
    'DaVinci Resolve editor India', 'DaVinci Resolve colour grading',
    'brand video production Hubli', 'brand video production Karnataka',
    'Instagram Reels editor India', 'Instagram Reels video editor Hubli',
    'YouTube video editor India', 'product promo video Hubli',
    'commercial video production India', 'freelance video editor India',
    'hire video editor online', 'remote video editor India',
    'freelance video editor international', 'affordable video editor India',
    'social media agency Hubli', 'social media agency Karnataka', 'social media agency India',
    'social media marketing Hubli', 'social media marketing Karnataka',
    'social media management Hubli', 'social media management India',
    'social media content creation Hubli', 'brand social media strategy India',
    'social media management online', 'social media agency for international brands',
    'influencer marketing Hubli', 'influencer marketing Karnataka', 'influencer marketing India',
    'influencer agency Hubli', 'influencer agency Karnataka', 'influencer management Karnataka',
    'Instagram influencer marketing Hubli', 'Instagram influencer collaboration Karnataka',
    'brand influencer collaboration India', 'content creator marketing Hubli',
    'nano influencer marketing India', 'micro influencer marketing Karnataka',
    'influencer marketing agency India', 'influencer marketing for international brands',
    'creative agency Hubli', 'creative agency Karnataka', 'digital marketing agency Hubli',
    'brand strategy Hubli', 'content production India', 'freelance creative professional India',
    'creative services online', 'creative agency India remote', 'freelance creative agency international',
  ],

  pages: {
    home: '/',
    projects: '/projects',
    videos: '/videos',
    influencers: '/influencers',
  },
} as const;

interface MetadataOverrides {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalPath?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function buildMetadata(overrides: MetadataOverrides = {}): Metadata {
  const canonicalUrl = overrides.canonicalPath
    ? `${SEO.baseUrl}${overrides.canonicalPath}` : SEO.baseUrl;
  const title = overrides.title ?? `${SEO.name} — ${SEO.tagline}`;
  const description = overrides.description ?? SEO.description;
  const keywords = overrides.keywords ? [...SEO.defaultKeywords, ...overrides.keywords] : SEO.defaultKeywords;
  const ogImageUrl = overrides.ogImage ?? SEO.ogImage;

  return {
    metadataBase: new URL(SEO.baseUrl),
    title, description,
    keywords: keywords.join(', '),
    authors: [{ name: SEO.name, url: SEO.baseUrl }],
    creator: SEO.name, publisher: SEO.name,
    category: 'technology',
    robots: overrides.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    alternates: {
      canonical: canonicalUrl,
      languages: { 'en-IN': canonicalUrl, 'x-default': canonicalUrl },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', rel: 'shortcut icon' },
        { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
    },
    manifest: '/manifest.webmanifest',
    appleWebApp: { title: SEO.name },
    openGraph: {
      type: 'website', url: canonicalUrl, title, description,
      siteName: `${SEO.name} — Creative Portfolio`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${SEO.name} — ${SEO.tagline}` }],
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image', title, description, images: [ogImageUrl],
      creator: '@NadafNehal', site: '@NadafNehal',
    },
    other: {
      'mobile-web-app-capable': 'yes',
      'geo.region': SEO.location.regionCode,
      'geo.placename': `${SEO.location.city}, ${SEO.location.region}, ${SEO.location.country}`,
      'geo.position': `${SEO.location.lat};${SEO.location.lng}`,
      'ICBM': `${SEO.location.lat}, ${SEO.location.lng}`,
    },
  };
}
```

### /lib/cloudinary.ts — FULL CONTENTS

```typescript
const VIDEO_TRANSFORM = 'f_auto,q_auto:good,w_1280';
const POSTER_TRANSFORM = 'f_auto,q_auto:good,w_640,so_0';

export function cldVideo(src: string): string {
  return src.replace('/upload/', `/upload/${VIDEO_TRANSFORM}/`);
}

export function cldPoster(src: string): string {
  return src
    .replace('/upload/', `/upload/${POSTER_TRANSFORM}/`)
    .replace(/\.mp4$/, '.jpg');
}
```


---

## 3. ROUTING STRUCTURE

### All Routes in /app

| Route | File | Type | generateMetadata? | generateStaticParams? |
|---|---|---|---|---|
| / | app/page.tsx | Static | NO (root layout) | N/A |
| /projects | app/projects/page.tsx | Static | NO (layout.tsx) | N/A |
| /videos | app/videos/page.tsx | Static | NO (layout.tsx) | N/A |
| /influencers | app/influencers/page.tsx | Static | NO (layout.tsx) | N/A |
| /sitemap.xml | app/sitemap.ts | Generated | N/A | N/A |
| /robots.txt | app/robots.ts | Generated | N/A | N/A |
| /manifest.webmanifest | app/manifest.ts | Generated | N/A | N/A |

> NO dynamic routes exist. No [slug], [id], or any segment brackets. generateStaticParams() is unused.

### Metadata per Route

**Root layout** — all pages (buildMetadata() no overrides):
- Title: `Nehal Nadaf — Web Developer . UI/UX Designer . Video Editor`
- Description: `Nehal Nadaf — Freelance Web Developer, UI/UX Designer, Video Editor & Social Media Agency...`
- Canonical: https://nehalnadaf.me

**`/projects`** — app/projects/layout.tsx:
```typescript
export const metadata = buildMetadata({
  title: 'Website Projects — Nehal Nadaf | Web Developer Hubli Karnataka India',
  description: 'Explore 10+ professional business websites built by Nehal Nadaf — web developer in Hubli, Karnataka...',
  canonicalPath: '/projects',
  keywords: ['website portfolio Hubli','web development projects India','website portfolio Karnataka',
    'React.js website examples','Next.js portfolio projects','professional website design Karnataka',
    'business website developer Hubli','Vercel deployed websites India','GSAP animation portfolio',
    'automotive website design India','dental clinic website developer Karnataka',
    'restaurant website developer Hubli','freelance website developer portfolio India'],
});
```

**`/videos`** — app/videos/layout.tsx:
```typescript
export const metadata = buildMetadata({
  title: 'Video Projects — Nehal Nadaf | Cinematic Video Editor Hubli Karnataka India',
  description: 'Professional video editing portfolio by Nehal Nadaf — cinematic video editor in Hubli, Karnataka...',
  canonicalPath: '/videos',
  keywords: ['video editor portfolio Hubli','video editor portfolio Karnataka',
    'cinematic video editing Karnataka','cinematic video editor India',
    'DaVinci Resolve colour grading India','DaVinci Resolve editor Karnataka',
    'brand video production Hubli','brand video production Karnataka',
    'Instagram Reels editor India','Instagram Reels video editor Hubli',
    'YouTube video editor Karnataka','YouTube video editor India',
    'product promo video Hubli','social media video production India',
    'professional video editor freelance India','commercial video editor Karnataka',
    'brand film production India'],
});
```

**`/influencers`** — app/influencers/layout.tsx:
```typescript
export const metadata = buildMetadata({
  title: 'Influencer Marketing Hubli Karnataka — Nehal Nadaf | Social Media Agency',
  description: "Nehal Nadaf's social media agency in Hubli, Karnataka connects brands with Instagram & YouTube influencers averaging 50K-100K+ views...",
  canonicalPath: '/influencers',
  keywords: ['influencer marketing Hubli','influencer marketing Karnataka','influencer marketing India',
    'social media agency Hubli Karnataka','Instagram influencer Hubli','Instagram influencer Karnataka',
    'brand influencer collaboration India','influencer collaboration Karnataka',
    'YouTube influencer agency Hubli','social media brand strategy India',
    'influencer management agency Karnataka','brand promotion social media Hubli',
    'content creator Hubli Karnataka','micro influencer Karnataka','nano influencer Hubli',
    'brand awareness Karnataka','social media marketing agency India'],
});
```

**`/`** homepage — metadata from root layout ONLY (no per-page override). page.tsx is 'use client' due to useSmoothScroll()/GSAP hooks.

---

## 4. ROBOTS & SITEMAP

### robots.txt — Source: app/robots.ts

Static /public/robots.txt: NOT FOUND — single source only, no duplicate.

Rendered output at https://nehalnadaf.me/robots.txt:
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /_next/
Disallow: /api/
Disallow: /sw.js

Sitemap: https://nehalnadaf.me/sitemap.xml
```

Source code:
```typescript
import type { MetadataRoute } from 'next';
import { SEO } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin/', '/_next/', '/api/', '/sw.js'] }],
    sitemap: `${SEO.baseUrl}/sitemap.xml`,
  };
}
```

### /app/sitemap.ts — FULL CONTENTS

```typescript
import type { MetadataRoute } from 'next';
import { SEO } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SEO.baseUrl;
  return [
    { url: base, lastModified: new Date('2026-07-27'), changeFrequency: 'monthly', priority: 1.0,
      alternates: { languages: { 'en-IN': base, 'x-default': base } } },
    { url: `${base}/projects`, lastModified: new Date('2026-07-27'), changeFrequency: 'weekly', priority: 0.9,
      alternates: { languages: { 'en-IN': `${base}/projects`, 'x-default': `${base}/projects` } } },
    { url: `${base}/videos`, lastModified: new Date('2026-07-27'), changeFrequency: 'weekly', priority: 0.9,
      alternates: { languages: { 'en-IN': `${base}/videos`, 'x-default': `${base}/videos` } } },
    { url: `${base}/influencers`, lastModified: new Date('2026-07-27'), changeFrequency: 'monthly', priority: 0.9,
      alternates: { languages: { 'en-IN': `${base}/influencers`, 'x-default': `${base}/influencers` } } },
  ];
}
```

| URL | Priority | changeFrequency | lastModified |
|---|---|---|---|
| https://nehalnadaf.me | 1.0 | monthly | 2026-07-27 |
| https://nehalnadaf.me/projects | 0.9 | weekly | 2026-07-27 |
| https://nehalnadaf.me/videos | 0.9 | weekly | 2026-07-27 |
| https://nehalnadaf.me/influencers | 0.9 | monthly | 2026-07-27 |


---

## 5. SCHEMA / JSON-LD

All schemas use @context: https://schema.org. Schemas split across 4 files.

### FILE: app/HomeSEO.tsx — GLOBAL (injected on every page via root layout)

#### Schema 1: Person

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://nehalnadaf.me/#person",
  "name": "Nehal Nadaf",
  "givenName": "Nehal",
  "familyName": "Nadaf",
  "url": "https://nehalnadaf.me",
  "email": "nehalnadaff@gmail.com",
  "telephone": "+916363278962",
  "jobTitle": ["Web Developer","UI/UX Designer","Video Editor","Social Media Manager","Influencer Marketing Consultant"],
  "image": { "@type": "ImageObject", "url": "https://nehalnadaf.me/images/Nehal.webp", "width": 800, "height": 1000 },
  "address": { "@type": "PostalAddress", "streetAddress": "Hubli", "addressLocality": "Hubli", "addressRegion": "Karnataka", "postalCode": "580029", "addressCountry": "IN" },
  "knowsAbout": ["Web Development","React.js","Next.js","JavaScript","TypeScript","Tailwind CSS","GSAP Animation","UI/UX Design","Figma","Video Editing","DaVinci Resolve","Colour Grading","Social Media Marketing","Social Media Management","Influencer Marketing","Brand Strategy","Content Creation","Instagram Reels","YouTube Content","Brand Video Production"],
  "hasOccupation": [
    { "@type": "Occupation", "name": "Web Developer", "occupationLocation": { "@type": "City", "name": "Hubli" }, "skills": "React.js, Next.js, TypeScript, Tailwind CSS, GSAP" },
    { "@type": "Occupation", "name": "Video Editor", "occupationLocation": { "@type": "City", "name": "Hubli" }, "skills": "DaVinci Resolve, Colour Grading, Brand Video, Instagram Reels" },
    { "@type": "Occupation", "name": "Social Media Manager", "occupationLocation": { "@type": "City", "name": "Hubli" }, "skills": "Influencer Marketing, Brand Strategy, Content Creation" }
  ],
  "worksFor": { "@id": "https://nehalnadaf.me/#agency" },
  "sameAs": ["https://linkedin.com/in/nehal-nadaf-473800414","https://instagram.com/nehalnadaxf","https://x.com/NadafNehal","https://nehalnadaf.me"]
}
```

#### Schema 2: WebSite

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://nehalnadaf.me/#website",
  "name": "Nehal Nadaf — Creative Portfolio",
  "alternateName": ["Nehal Nadaf Portfolio","nehalnadaf.me"],
  "url": "https://nehalnadaf.me",
  "author": { "@id": "https://nehalnadaf.me/#person" },
  "inLanguage": "en-IN",
  "potentialAction": {
    "@type": "SearchAction",
    "target": { "@type": "EntryPoint", "urlTemplate": "https://nehalnadaf.me/?q={search_term_string}" },
    "query-input": "required name=search_term_string"
  }
}
```

#### Schema 3: LocalBusiness + ProfessionalService (dual @type)

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness","ProfessionalService"],
  "@id": "https://nehalnadaf.me/#localbusiness",
  "name": "Nehal Nadaf — Web Developer & Creative Agency Hubli",
  "url": "https://nehalnadaf.me",
  "email": "nehalnadaff@gmail.com",
  "telephone": "+916363278962",
  "image": "https://nehalnadaf.me/images/Nehal.webp",
  "logo": "https://nehalnadaf.me/images/Nehal.webp",
  "address": { "@type": "PostalAddress", "streetAddress": "Hubli", "addressLocality": "Hubli", "addressRegion": "Karnataka", "postalCode": "580029", "addressCountry": "IN" },
  "geo": { "@type": "GeoCoordinates", "latitude": 15.3647, "longitude": 75.124 },
  "areaServed": [
    {"@type":"City","name":"Hubli"},{"@type":"City","name":"Dharwad"},{"@type":"City","name":"Bangalore"},
    {"@type":"State","name":"Karnataka"},{"@type":"Country","name":"India"},
    {"@type":"Place","name":"International"},{"@type":"Place","name":"Worldwide"}
  ],
  "priceRange": "rupee rupee",
  "currenciesAccepted": "INR, USD",
  "paymentAccepted": "Bank Transfer, UPI, Razorpay",
  "openingHours": "Mo-Sa 09:00-21:00",
  "foundingDate": "2020",
  "founder": { "@id": "https://nehalnadaf.me/#person" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Creative Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UI/UX Design" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Video Production & Editing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Media Management & Marketing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Influencer Marketing" } }
    ]
  },
  "sameAs": ["https://linkedin.com/in/nehal-nadaf-473800414","https://instagram.com/nehalnadaxf","https://x.com/NadafNehal"]
}
```

#### Schema 4: ProfessionalService

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://nehalnadaf.me/#service",
  "name": "Nehal Nadaf Creative Services",
  "founder": { "@id": "https://nehalnadaf.me/#person" },
  "address": { "@type": "PostalAddress", "addressLocality": "Hubli", "addressRegion": "Karnataka", "postalCode": "580029", "addressCountry": "IN" },
  "geo": { "@type": "GeoCoordinates", "latitude": 15.3647, "longitude": 75.124 },
  "areaServed": [{"@type":"City","name":"Hubli"},{"@type":"City","name":"Dharwad"},{"@type":"City","name":"Bangalore"},{"@type":"State","name":"Karnataka"},{"@type":"Country","name":"India"},{"@type":"Place","name":"Worldwide"}],
  "serviceType": ["Web Development","UI/UX Design","Video Editing","Social Media Management","Social Media Marketing","Influencer Marketing","Brand Strategy","Content Creation"],
  "knowsAbout": ["React.js","Next.js","Tailwind CSS","GSAP","Figma","DaVinci Resolve","Instagram Reels","YouTube Content","Influencer Marketing","Social Media Management"]
}
```

#### Schema 5: Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://nehalnadaf.me/#agency",
  "name": "Nehal Nadaf Creative Agency",
  "legalName": "Nehal Nadaf Creative Agency",
  "url": "https://nehalnadaf.me",
  "email": "nehalnadaff@gmail.com",
  "telephone": "+916363278962",
  "logo": { "@type": "ImageObject", "url": "https://nehalnadaf.me/images/Nehal.webp", "width": 400, "height": 400 },
  "foundingDate": "2020",
  "foundingLocation": { "@type": "Place", "name": "Hubli, Karnataka, India" },
  "numberOfEmployees": { "@type": "QuantitativeValue", "value": 5 },
  "founder": { "@id": "https://nehalnadaf.me/#person" },
  "address": { "@type": "PostalAddress", "addressLocality": "Hubli", "addressRegion": "Karnataka", "postalCode": "580029", "addressCountry": "IN" },
  "areaServed": [{"@type":"City","name":"Hubli"},{"@type":"City","name":"Dharwad"},{"@type":"City","name":"Bangalore"},{"@type":"State","name":"Karnataka"},{"@type":"Country","name":"India"},{"@type":"Place","name":"Worldwide"}],
  "serviceType": ["Influencer Marketing","Social Media Management","Social Media Marketing","Brand Strategy","Video Production","Content Creation","Web Development","UI/UX Design"],
  "sameAs": ["https://linkedin.com/in/nehal-nadaf-473800414","https://instagram.com/nehalnadaxf","https://x.com/NadafNehal","https://nehalnadaf.me"]
}
```

---

### FILE: app/HomeSchemas.tsx — HOMEPAGE-ONLY (injected only on /)

#### Schema 6: FAQPage (8 questions)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type":"Question","name":"What services does Nehal Nadaf offer?","acceptedAnswer":{"@type":"Answer","text":"Nehal Nadaf offers premium web development (React.js, Next.js, Tailwind CSS, GSAP), UI/UX design (Figma), professional video editing and colour grading (DaVinci Resolve), social media management, content creation, and full influencer marketing campaigns — serving businesses in Hubli, Karnataka, and across India."} },
    { "@type":"Question","name":"Does Nehal Nadaf do social media management and marketing?","acceptedAnswer":{"@type":"Answer","text":"Yes — through his creative agency in Hubli, Karnataka, Nehal Nadaf provides full-service social media management including content creation, Instagram Reels production, YouTube video editing, branded graphics, and complete social media strategy."} },
    { "@type":"Question","name":"Does Nehal Nadaf do influencer marketing in Hubli and Karnataka?","acceptedAnswer":{"@type":"Answer","text":"Yes. Nehal Nadaf runs influencer marketing campaigns connecting brands with Instagram and YouTube content creators based in Hubli, Dharwad, and across Karnataka, India. The influencers he works with average 50K-100K+ views per post."} },
    { "@type":"Question","name":"How many projects has Nehal Nadaf delivered?","acceptedAnswer":{"@type":"Answer","text":"10+ professional business websites across automotive detailing, education, dental healthcare, food service, restaurant, and home-appliance industries — plus years of video production and social media work."} },
    { "@type":"Question","name":"How do we get started with Nehal Nadaf?","acceptedAnswer":{"@type":"Answer","text":"Hit the contact button or email nehalnadaff@gmail.com directly. You can also WhatsApp at +91 6363278962. We'll align on your vision, goals, and timeline — then move fast."} },
    { "@type":"Question","name":"What is the tech stack for Nehal Nadaf web development projects?","acceptedAnswer":{"@type":"Answer","text":"React.js, Next.js, HTML5, CSS3, JavaScript (ES6+), TypeScript, Tailwind CSS, and GSAP for animations. All projects are deployed on Vercel for lightning-fast load times, high availability, and global CDN performance."} },
    { "@type":"Question","name":"What does the Nehal Nadaf creative agency offer beyond freelance?","acceptedAnswer":{"@type":"Answer","text":"Behind Nehal is a full creative agency in Hubli, Karnataka with graphic designers, video editors, videographers, and content scriptwriters. The agency handles complete creative production."} },
    { "@type":"Question","name":"Where is Nehal Nadaf based and does he work remotely?","acceptedAnswer":{"@type":"Answer","text":"Nehal Nadaf is based in Hubli, Karnataka, India. He works with clients locally in Hubli and Dharwad, and also serves clients remotely across Karnataka, India, and internationally worldwide."} }
  ]
}
```

---

### FILE: app/projects/layout.tsx — /projects SCHEMAS

**Schema 7: BreadcrumbList**
```json
{ "@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://nehalnadaf.me"},{"@type":"ListItem","position":2,"name":"Website Projects","item":"https://nehalnadaf.me/projects"}] }
```

**Schema 8: ItemList (10 Website Projects)**
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Website Projects by Nehal Nadaf — Web Developer Hubli Karnataka",
  "url": "https://nehalnadaf.me/projects",
  "numberOfItems": 10,
  "itemListElement": [
    { "@type":"ListItem","position":1,"name":"Auto Glam Detailing Studio","url":"https://auto-glam.vercel.app","description":"Premium automotive detailing studio website — React.js, Next.js, GSAP animations" },
    { "@type":"ListItem","position":2,"name":"CARDEE The Detailing Studio","url":"https://cardee-detailing-studio.vercel.app","description":"Automotive detailing studio website" },
    { "@type":"ListItem","position":3,"name":"Baba Royal Garage","url":"https://baba-royal-garage-m6hv.vercel.app","description":"Automotive garage and car service website" },
    { "@type":"ListItem","position":4,"name":"Apex Dental Clinic","url":"https://apex-dental-five.vercel.app","description":"Dental clinic healthcare website — React.js, Next.js, Tailwind CSS" },
    { "@type":"ListItem","position":5,"name":"Empire Restaurant","url":"https://empire-restaurant.vercel.app","description":"Restaurant hospitality website" },
    { "@type":"ListItem","position":6,"name":"Annachi Tiffin Centre","url":"https://annachi-tiffin-centre.vercel.app","description":"Tiffin centre and food service website" },
    { "@type":"ListItem","position":7,"name":"Tippu Shaheed Education Trust","url":"https://tpshaheed.vercel.app","description":"Educational trust and school website" },
    { "@type":"ListItem","position":8,"name":"Hosatti Home Services","url":"https://hosatti.com","description":"Home appliance repair and refrigeration service website" },
    { "@type":"ListItem","position":9,"name":"Custom Resume Website — Arshan Girniwale","url":"https://arshan-girniwale-resume.vercel.app","description":"Personal resume and portfolio website" },
    { "@type":"ListItem","position":10,"name":"LNS Industrial Piping","url":"https://lbownetworksolutions.com","description":"Industrial piping and engineering services website" }
  ]
}
```

---

### FILE: app/videos/layout.tsx — /videos SCHEMAS

**Schema 9: BreadcrumbList** (Home -> Video Projects at https://nehalnadaf.me/videos)

**Schema 10: ItemList (7 video production items)**
numberOfItems: 7; names: TPF Tajweed, True Path Foundation ADV, Empire Commercial, Al Moon Academy, Brand Reel - Social Media, Brand Film Production, Creative Video Reel

**Schema 11: ItemList with VideoObject sub-items (5 entries)**
Each VideoObject has: name, description, thumbnailUrl (Cloudinary poster), contentUrl (Cloudinary video), uploadDate (2025-05-18 or 2025-05-27), author @id ref.

Videos: TPF Tajweed (2025-05-18), True Path Foundation ADV (2025-05-27), Empire Commercial (2025-05-18), Al Moon Academy (2025-05-18), YC5 Brand Film (2025-05-27).

---

### FILE: app/influencers/layout.tsx — /influencers SCHEMAS

**Schema 12: BreadcrumbList** (Home -> Influencer Marketing at https://nehalnadaf.me/influencers)

**Schema 13: Service — Influencer Marketing**
```json
{
  "@context":"https://schema.org","@type":"Service",
  "@id":"https://nehalnadaf.me/influencers#service",
  "name":"Influencer Marketing & Social Media Agency — Hubli, Karnataka",
  "url":"https://nehalnadaf.me/influencers",
  "serviceType":"Influencer Marketing",
  "provider":{"@id":"https://nehalnadaf.me/#agency"},
  "areaServed":[{"@type":"City","name":"Hubli"},{"@type":"City","name":"Dharwad"},{"@type":"State","name":"Karnataka"},{"@type":"Country","name":"India"}],
  "hasOfferCatalog":{
    "@type":"OfferCatalog","name":"Influencer Marketing Services",
    "itemListElement":[
      {"@type":"Offer","itemOffered":{"@type":"Service","name":"Instagram Influencer Marketing","description":"Brand collaborations with Karnataka-based Instagram influencers averaging 50K-100K+ views per post."}},
      {"@type":"Offer","itemOffered":{"@type":"Service","name":"YouTube Influencer Campaigns","description":"YouTube content creator partnerships for brand awareness and product promotion across India."}},
      {"@type":"Offer","itemOffered":{"@type":"Service","name":"Social Media Content Production","description":"End-to-end social media content creation, scripting, filming, editing, and publishing for brands."}}
    ]
  }
}
```

**Schema 14: ItemList (6 Influencer Collaborations)**
```json
{
  "@context":"https://schema.org","@type":"ItemList",
  "name":"Influencer Collaborations — Nehal Nadaf Creative Agency Hubli",
  "url":"https://nehalnadaf.me/influencers","numberOfItems":6,
  "itemListElement":[
    {"@type":"ListItem","position":1,"name":"@kaifofficial_19 — Instagram Influencer Karnataka","description":"60K+ avg views/post","url":"https://www.instagram.com/kaifofficial_19"},
    {"@type":"ListItem","position":2,"name":"@afozz_ae — Instagram Influencer Karnataka","description":"70K+ avg views/post","url":"https://www.instagram.com/afozz_ae"},
    {"@type":"ListItem","position":3,"name":"@hubballitimes — Hubballi Times Instagram","description":"70K+ avg views/post","url":"https://www.instagram.com/hubballitimes"},
    {"@type":"ListItem","position":4,"name":"@nadeem_pov — Instagram Content Creator Karnataka","description":"50K+ avg views","url":"https://www.instagram.com/nadeem_pov"},
    {"@type":"ListItem","position":5,"name":"@sahil_hvines — Instagram Influencer Hubli","description":"100K+ avg views/post","url":"https://www.instagram.com/sahil_hvines"},
    {"@type":"ListItem","position":6,"name":"@yavvooshahid — Instagram Content Creator","description":"70K+ avg views/post","url":"https://www.instagram.com/yavvooshahid"}
  ]
}
```


---

## 6. LAYOUT & META

### /app/layout.tsx — FULL CONTENTS

```tsx
import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import { buildMetadata } from '@/lib/seo';
import HomeSEO from '@/app/HomeSEO';
import HomeSchemas from '@/app/HomeSchemas';
import BrutalistMacCursor from '@/components/BrutalistMacCursor';

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#F2F1E6',
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers();
  const pathname = headersList.get('x-invoke-path') ?? headersList.get('x-pathname') ?? '/';
  const isHomepage = pathname === '/' || pathname === '';

  return (
    <html lang="en-IN" className="h-full antialiased">
      <head>
        <HomeSEO />
        {isHomepage && <HomeSchemas />}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">
        <BrutalistMacCursor />
        {children}
      </body>
    </html>
  );
}
```

### Geo Meta Tags (every page, via buildMetadata other field)

```html
<meta name="geo.region"    content="IN-KA" />
<meta name="geo.placename" content="Hubli, Karnataka, India" />
<meta name="geo.position"  content="15.3647;75.124" />
<meta name="ICBM"          content="15.3647, 75.124" />
<meta name="mobile-web-app-capable" content="yes" />
```

### OpenGraph Tags (every page)

```html
<meta property="og:type"        content="website" />
<meta property="og:url"         content="https://nehalnadaf.me[/path]" />
<meta property="og:title"       content="[page title]" />
<meta property="og:description" content="[page description]" />
<meta property="og:site_name"   content="Nehal Nadaf — Creative Portfolio" />
<meta property="og:image"       content="https://nehalnadaf.me/og-image.jpg" />
<meta property="og:image:width"  content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt"   content="Nehal Nadaf — Web Developer . UI/UX Designer . Video Editor" />
<meta property="og:locale"      content="en_IN" />
```

### Twitter Card Tags (every page)

```html
<meta name="twitter:card"        content="summary_large_image" />
<meta name="twitter:title"       content="[page title]" />
<meta name="twitter:description" content="[page description]" />
<meta name="twitter:image"       content="https://nehalnadaf.me/og-image.jpg" />
<meta name="twitter:creator"     content="@NadafNehal" />
<meta name="twitter:site"        content="@NadafNehal" />
```

### Canonical / hreflang (every page)

```html
<link rel="canonical"  href="https://nehalnadaf.me[/path]" />
<link rel="alternate"  hreflang="en-IN"     href="https://nehalnadaf.me[/path]" />
<link rel="alternate"  hreflang="x-default" href="https://nehalnadaf.me[/path]" />
```

### Viewport and Theme Meta

```html
<meta name="viewport"     content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
<meta name="theme-color"  content="#F2F1E6" />
```

### Favicons and App Icons (every page)

```html
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="icon"          href="/favicon-96x96.png" type="image/png" sizes="96x96" />
<link rel="icon"          href="/icon.svg"           type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
<link rel="manifest"      href="/manifest.webmanifest" />
```

### Robots Directives (every page, index/follow)

```html
<meta name="robots"     content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
<meta name="googlebot"  content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
```

### Authors / Publisher Tags

```html
<meta name="author"    content="Nehal Nadaf" />
<meta name="creator"   content="Nehal Nadaf" />
<meta name="publisher" content="Nehal Nadaf" />
<meta name="category"  content="technology" />
```

---

## 7. DOMAIN CONFIG

### vercel.json
**NOT FOUND** — No vercel.json exists in the project root or anywhere in the workspace.

### www / non-www Redirect — CONFIGURED IN CODE (next.config.ts)

Three permanent (301) redirects are defined in `next.config.ts` using Next.js `async redirects()`.
These fire at Vercel edge without needing a separate vercel.json.

```typescript
// next.config.ts — full redirects() export
async redirects() {
  return [
    // www.nehalnadaf.me  ->  nehalnadaf.me  (apex domain wins)
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.nehalnadaf.me' }],
      destination: 'https://nehalnadaf.me/:path*',
      permanent: true,
    },
    // www.nehalnadaf.com ->  nehalnadaf.me  (old domain + www)
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.nehalnadaf.com' }],
      destination: 'https://nehalnadaf.me/:path*',
      permanent: true,
    },
    // nehalnadaf.com     ->  nehalnadaf.me  (old apex domain)
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'nehalnadaf.com' }],
      destination: 'https://nehalnadaf.me/:path*',
      permanent: true,
    },
  ];
},
```

| Source | Destination | HTTP Status |
|---|---|---|
| www.nehalnadaf.me/* | https://nehalnadaf.me/* | 301 |
| www.nehalnadaf.com/* | https://nehalnadaf.me/* | 301 |
| nehalnadaf.com/* | https://nehalnadaf.me/* | 301 |

> Code comment: "Requires both nehalnadaf.me AND www.nehalnadaf.me to be added as domains in the Vercel project dashboard (Domains tab) for these to fire at edge."

### Full next.config.ts

```typescript
import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  turbopack: {},
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
    unoptimized: false,
  },
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  async redirects() {
    return [
      { source: '/:path*', has: [{ type: 'host', value: 'www.nehalnadaf.me' }], destination: 'https://nehalnadaf.me/:path*', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'www.nehalnadaf.com' }], destination: 'https://nehalnadaf.me/:path*', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'nehalnadaf.com' }], destination: 'https://nehalnadaf.me/:path*', permanent: true },
    ];
  },
};

export default withSerwist(nextConfig);
```


---

## 8. SAMPLE PAGES

### Homepage — /app/page.tsx (FULL FILE, 55 lines)

```tsx
'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import GrainOverlay from '@/components/GrainOverlay';
import GridLines from '@/components/GridLines';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PortfolioDock from '@/components/PortfolioDock';
import HeroSection from '@/sections/HeroSection';
import AboutIntroSection from '@/sections/AboutIntroSection';
import WhoAmISection from '@/sections/WhoAmISection';
import BioStatementSection from '@/sections/BioStatementSection';
import CreativeByMeSection from '@/sections/CreativeByMeSection';
import StatsSection from '@/sections/StatsSection';
import ExperienceSection from '@/sections/ExperienceSection';
import AwardsSection from '@/sections/AwardsSection';
import StackToolsSection from '@/sections/StackToolsSection';
import FAQSection from '@/sections/FAQSection';
import CTASection from '@/sections/CTASection';
import WebsiteProjectsGallery from '@/sections/WebsiteProjectsGallery';
import VideoProjectsGallery from '@/sections/VideoProjectsGallery';

export default function HomePage() {
  useSmoothScroll();

  return (
    <>
      <GrainOverlay />
      <GridLines />
      <Navigation />

      <main className="relative z-10">
        <HeroSection />
        <AboutIntroSection />
        <WebsiteProjectsGallery />
        <VideoProjectsGallery />
        <WhoAmISection />
        <BioStatementSection />
        <CreativeByMeSection />
        <StatsSection />
        <ExperienceSection />
        <AwardsSection />
        <StackToolsSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />

      {/* Magnetic Dock — fixed bottom navigation, hidden on mobile */}
      <PortfolioDock />
    </>
  );
}
```

> NOTE: page.tsx is 'use client' (useSmoothScroll + GSAP section hooks). It has NO generateMetadata() or
> exported metadata const. Metadata is inherited entirely from the root app/layout.tsx which calls
> buildMetadata() with no overrides. Global JSON-LD schemas (Person, WebSite, LocalBusiness,
> ProfessionalService, Organization) are injected via HomeSEO server component in the layout.
> FAQPage schema is injected via HomeSchemas only when pathname === '/'.

---

### Portfolio Page — /app/projects/page.tsx (metadata + key data, first 100 lines shown)

**Metadata export** (lives in app/projects/layout.tsx, not page.tsx):
- Title: `Website Projects — Nehal Nadaf | Web Developer Hubli Karnataka India`
- Description: `Explore 10+ professional business websites built by Nehal Nadaf — web developer in Hubli, Karnataka. Projects span automotive detailing, education, dental healthcare, restaurants, food service, and home-appliance industries. Built with React.js, Next.js, Tailwind CSS, GSAP, deployed on Vercel.`
- Canonical: `https://nehalnadaf.me/projects`
- JSON-LD in layout: BreadcrumbList + ItemList (10 websites)

**Key data array (app/projects/page.tsx lines 25-96):**
```typescript
const websiteItems: WebsiteItem[] = [
  { src: cldVideo('...AutoGlam_kaenne.mp4'),  alt: 'Auto Glam Detailing Studio',     category: 'Automotive',   url: 'https://auto-glam.vercel.app' },
  { src: cldVideo('...Cardee_hluecv.mp4'),    alt: 'CARDEE The Detailing Studio',    category: 'Automotive',   url: 'https://cardee-detailing-studio.vercel.app' },
  { src: cldVideo('...Baba_zfvjq8.mp4'),      alt: 'Baba Royal Garage',              category: 'Automotive',   url: 'https://baba-royal-garage-m6hv.vercel.app' },
  { src: cldVideo('...Apex_tfdm6t.mp4'),      alt: 'Apex Dental Clinic',             category: 'Healthcare',   url: 'https://apex-dental-five.vercel.app' },
  { src: cldVideo('...Empire_prxg4l.mp4'),    alt: 'Empire Restaurant',              category: 'Hospitality',  url: 'https://empire-restaurant.vercel.app' },
  { src: cldVideo('...Annachi_yma3us.mp4'),   alt: 'Annachi Tiffin Centre',          category: 'Hospitality',  url: 'https://annachi-tiffin-centre.vercel.app' },
  { src: cldVideo('...tippu-shaheed.mp4'),    alt: 'Tippu Shaheed Education Trust',  category: 'Education',    url: 'https://tpshaheed.vercel.app' },
  { src: cldVideo('...Hosatti_qcfsw3.mp4'),   alt: 'Hosatti Home Services',          category: 'Home Service', url: 'https://hosatti.com' },
  { src: cldVideo('...Arshan_h0xb6d.mp4'),    alt: 'Custom Resume Website',          category: 'Personal',     url: 'https://arshan-girniwale-resume.vercel.app' },
  { src: cldVideo('...LBow_vmjk0c.mp4'),      alt: 'LNS Industrial Piping',          category: 'Industrial',   url: 'https://lbownetworksolutions.com' },
];
// 10 items total
```

**Page implementation pattern:**
- `'use client'` — uses useState, useEffect, useRef, useRouter
- Infinite drag canvas via DraggableContainer (GridBody 4 columns)
- Each ProjectCard: IntersectionObserver-based play/pause for GPU efficiency
- Frosted glass header with motion.div (Framer Motion)
- PortfolioLightbox for fullscreen video preview
- Back button navigates to /

---

### Influencer / Location Page — /app/influencers/page.tsx (metadata + key data)

**Metadata export** (in app/influencers/layout.tsx):
- Title: `Influencer Marketing Hubli Karnataka — Nehal Nadaf | Social Media Agency`
- Description: `Nehal Nadaf's social media agency in Hubli, Karnataka connects brands with Instagram & YouTube influencers averaging 50K-100K+ views. Expert influencer marketing campaigns across Karnataka and India for maximum brand reach and ROI.`
- Canonical: `https://nehalnadaf.me/influencers`
- JSON-LD in layout: BreadcrumbList + Service + ItemList (6 influencers)

**Key data array (app/influencers/page.tsx lines 22-65):**
```typescript
const influencers: Influencer[] = [
  { handle: '@kaifofficial_19', avgViews: '60K+',  location: 'Karnataka, India', imageSrc: '/images/Md kaif.webp',       instagramUrl: 'https://www.instagram.com/kaifofficial_19' },
  { handle: '@afozz_ae',        avgViews: '70K+',  location: 'Karnataka, India', imageSrc: '/images/Afozz.webp',         instagramUrl: 'https://www.instagram.com/afozz_ae' },
  { handle: '@hubballitimes',   avgViews: '70K+',  location: 'Karnataka, India', imageSrc: '/images/Hubballi times.webp', instagramUrl: 'https://www.instagram.com/hubballitimes' },
  { handle: '@nadeem_pov',      avgViews: '50K+',  location: 'Karnataka, India', imageSrc: '/images/Nadeem.webp',        instagramUrl: 'https://www.instagram.com/nadeem_pov' },
  { handle: '@sahil_hvines',    avgViews: '100K+', location: 'Karnataka, India', imageSrc: '/images/Sahil.webp',         instagramUrl: 'https://www.instagram.com/sahil_hvines' },
  { handle: '@yavvooshahid',    avgViews: '70K+',  location: 'Karnataka, India', imageSrc: '/images/Shaahid.webp',       instagramUrl: 'https://www.instagram.com/yavvooshahid' },
];
// 6 items total
```

**Page implementation pattern:**
- `'use client'` — uses useRouter
- Infinite drag canvas via DraggableContainer (GridBody 4 columns)
- Each card: circular photo, @handle, location, avg views stat
- Click opens Instagram profile in new tab (no lightbox)
- Frosted glass header with motion.div
- Back button navigates to /

---

### Video Page — /app/videos/page.tsx (metadata + key data)

**Metadata export** (in app/videos/layout.tsx):
- Title: `Video Projects — Nehal Nadaf | Cinematic Video Editor Hubli Karnataka India`
- Canonical: `https://nehalnadaf.me/videos`
- JSON-LD in layout: BreadcrumbList + ItemList (numberOfItems: 7) + ItemList with VideoObject sub-items (5 entries)

**Key data array (app/videos/page.tsx lines 25-33):**
```typescript
const videoItems: VideoItem[] = [
  { src: cldVideo('...TPF_Tajweed_hmazce.mp4'),              alt: 'TPF Tajweed',               label: 'TPF Tajweed',               category: 'Brand Reel' },
  { src: cldVideo('...True_Path_foundation_ADV_apywir.mp4'), alt: 'True Path Foundation ADV',  label: 'True Path Foundation ADV',  category: 'Brand Reel' },
  { src: cldVideo('...Empire_Commercial_Video_3_fuccwf.mp4'),alt: 'Empire Commercial',          label: 'Empire Commercial',         category: 'Cinematic' },
  { src: cldVideo('...Al_Moon_Academy_Eng_1_l5pbgt.mp4'),    alt: 'Al Moon Academy',            label: 'Al Moon Academy',           category: 'Short Form' },
  { src: cldVideo('...AQMrZws[long-hash].mp4'),              alt: 'Brand Reel 04',              label: 'Brand Reel 04',             category: 'Social Media' },
  { src: cldVideo('...YC5_slkuzx.mp4'),                      alt: 'YC5 Brand Film',             label: 'YC5 Brand Film',            category: 'Brand Film' },
  { src: cldVideo('...AQNs7JW[long-hash].mp4'),              alt: 'Brand Reel 06',              label: 'Brand Reel 06',             category: 'Reel' },
];
// 7 items total
```

**Page implementation pattern:**
- `'use client'` — uses useState, useEffect, useRef, useRouter
- Mixed aspect ratio tiles: Al Moon Academy is horizontal (360x202px), all others vertical (202x360px)
- Infinite drag canvas via DraggableContainer (GridBody 5 columns, masonry variant)
- Each VideoCard: IntersectionObserver play/pause
- PortfolioLightbox for fullscreen playback
- Back button navigates to /

---

## 9. PAGE COUNT SUMMARY

This is a STATIC PORTFOLIO — no dynamic slug routing. All routes are hardcoded. generateStaticParams() is NOT used anywhere.

### Routed Pages at Build Time

| Page | Route | Count |
|---|---|---|
| Homepage | / | 1 |
| Website Projects | /projects | 1 |
| Video Projects | /videos | 1 |
| Influencer Marketing | /influencers | 1 |
| **TOTAL UNIQUE ROUTES** | | **4** |

### Content Items (rendered as cards, NOT separate URLs)

| Content Type | Array | Item Count | File |
|---|---|---|---|
| Website portfolio items | websiteItems[] | **10** | app/projects/page.tsx |
| Video portfolio items | videoItems[] | **7** | app/videos/page.tsx |
| Influencer profiles | influencers[] | **6** | app/influencers/page.tsx |
| FAQ questions | faqs[] | **8** | app/HomeSchemas.tsx |
| Sitemap URLs | — | **4** | app/sitemap.ts |

> IMPORTANT: None of the content items above generate separate SEO-indexable URLs.
> All 10 website items, 7 videos, and 6 influencers are rendered within their single
> parent page route. There is NO pagination, NO dynamic sub-routes, and NO
> generateStaticParams() call anywhere in the codebase.

### Schema Item Counts (cross-reference)

| Schema | File | numberOfItems |
|---|---|---|
| ItemList (website projects) | app/projects/layout.tsx | 10 |
| ItemList (video production) | app/videos/layout.tsx | 7 |
| ItemList with VideoObject | app/videos/layout.tsx | 5 (VideoObject entries) |
| ItemList (influencer collabs) | app/influencers/layout.tsx | 6 |
| FAQPage | app/HomeSchemas.tsx | 8 questions |

---

## APPENDIX

### /public/llms.txt (LLM Crawler Context File)

Present at: https://nehalnadaf.me/llms.txt — 98 lines, 4,489 bytes.
Follows the emerging llms.txt convention for providing structured context to AI crawlers.

Content summary:
- Who is Nehal Nadaf (multi-disciplinary creative, Hubli, Karnataka, India, 5+ years)
- Services: Web Development, UI/UX Design, Video Production, Social Media, Influencer Marketing
- Portfolio: 10 website URLs, 6 video titles, 6 influencer @handles + avg views
- Tech stack: React.js / Next.js 16 / TypeScript / Tailwind CSS v4 / GSAP / Framer Motion / DaVinci Resolve / Figma
- Location: Hubli, Karnataka, India (PIN: 580029), Mo-Sa 09:00-21:00 IST
- Contact: nehalnadaff@gmail.com / +91 6363278962 / @NadafNehal
- All 4 page URLs listed

### Web App Manifest — /app/manifest.ts

Served at: /manifest.webmanifest

```typescript
{
  name: "Nehal Nadaf",
  short_name: "Nehalnadaf",
  description: "Full Creative Professional — Web Development, UI/UX Design & Cinematic Video Production",
  start_url: "/",
  scope: "/",
  display: "standalone",
  orientation: "portrait-primary",
  background_color: "#F2F1E6",
  theme_color: "#F2F1E6",
  lang: "en-IN",
  categories: ["portfolio", "design", "development"],
  icons: [
    { src: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
    { src: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
  ],
  shortcuts: [
    { name: "Website Projects", short_name: "Projects", url: "/projects", icons: [{ src: "/favicon-96x96.png", sizes: "96x96" }] },
    { name: "Video Projects",   short_name: "Videos",   url: "/videos",   icons: [{ src: "/favicon-96x96.png", sizes: "96x96" }] },
  ],
}
```

### Service Worker — /app/sw.ts

- Library: Serwist (Workbox-based)
- Source: app/sw.ts
- Output: public/sw.js (compiled at build time via Webpack)
- Disabled in development (NODE_ENV === 'development')
- Enables: offline caching, PWA install prompt, background sync
- Note: Next.js 16 build uses --webpack flag (not Turbopack) to allow Serwist compilation

### Image Assets (public/ directory)

| File | Size | Purpose |
|---|---|---|
| public/og-image.jpg | 337,722 bytes | OpenGraph share image (1200x630) |
| public/favicon-96x96.png | 8,396 bytes | Browser favicon (96px) |
| public/web-app-manifest-192x192.png | 29,488 bytes | PWA icon maskable (192px) |
| public/web-app-manifest-512x512.png | 203,476 bytes | PWA icon maskable (512px) |
| public/sw.js | 44,662 bytes | Compiled service worker |
| public/llms.txt | 4,489 bytes | LLM crawler context file |

### Key Observations for SEO Review

1. **No static robots.txt** — robots.txt is generated via Next.js App Router convention (app/robots.ts). No duplicate exists in /public.
2. **FAQPage schema is homepage-only** — deliberately scoped to / using headers() pathname detection. Sub-pages do NOT carry the FAQ schema.
3. **All page.tsx files are 'use client'** — metadata is exported from layout.tsx files for /projects, /videos, /influencers. Homepage metadata is in root layout.tsx.
4. **No generateMetadata() anywhere** — metadata is static, exported as const from buildMetadata() calls.
5. **No dynamic routes** — zero [slug] segments. This site has exactly 4 user-facing routes.
6. **Canonical set per-page** — via canonicalPath in buildMetadata(). hreflang en-IN and x-default are both set and equal.
7. **Sitemap uses static lastModified dates** — not new Date(). Set to 2026-07-27 for all pages. Homepage is priority 1.0, others 0.9.
8. **Domain redirects in code** — three 301 redirects in next.config.ts cover www.nehalnadaf.me, nehalnadaf.com, and www.nehalnadaf.com. vercel.json does NOT exist.
9. **Cloudinary CDN for all media** — videos use f_auto,q_auto:good,w_1280. Posters use f_auto,q_auto:good,w_640,so_0. Zero media files hosted on Vercel origin.
10. **Schema @id cross-references** — Person (#person), Organization (#agency), Service (#service), LocalBusiness (#localbusiness) are linked via @id refs for Knowledge Graph coherence.
