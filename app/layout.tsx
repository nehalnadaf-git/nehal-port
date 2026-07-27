/**
 * Root layout — applies to every page.
 *
 * Metadata: uses buildMetadata() from lib/seo.ts so that metadataBase is
 * always set (fixes the Next.js "metadataBase not set" warning).
 *
 * HomeSEO: server component that renders all global JSON-LD schemas
 * (Person, WebSite, ProfessionalService, FAQPage) as <script> tags.
 * Injected here so schemas appear on every page — not just the homepage.
 */

import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import { buildMetadata } from '@/lib/seo';
import HomeSEO from '@/app/HomeSEO';
import HomeSchemas from '@/app/HomeSchemas';
import BrutalistMacCursor from '@/components/BrutalistMacCursor';

// ─── Root-level metadata ──────────────────────────────────────────────────────
// Child layouts can override any of these values per-page.
export const metadata: Metadata = buildMetadata();

// ─── Viewport ─────────────────────────────────────────────────────────────────
// Explicit viewport export is the Next.js 13+ way to set the viewport meta.
// viewport-fit=cover fills behind the iPhone notch/home bar.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,  // Allow pinch-to-zoom (accessibility + Apple requirement)
  viewportFit: 'cover',
  themeColor: '#F2F1E6',
};

// ─── Layout ───────────────────────────────────────────────────────────────────
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Determine if we're on the homepage to inject the FAQPage schema only there.
  // headers() gives us the request path without needing client-side JS.
  const headersList = await headers();
  const pathname = headersList.get('x-invoke-path') ?? headersList.get('x-pathname') ?? '/';
  const isHomepage = pathname === '/' || pathname === '';

  return (
    <html lang="en-IN" className="h-full antialiased">
      <head>
        <HomeSEO />
        {/* FAQPage schema — homepage only (prevents schema misinformation on sub-pages) */}
        {isHomepage && <HomeSchemas />}
        {/* Preconnect to Google Fonts to reduce font load latency on all devices */}
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
