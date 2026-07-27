import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

// ─── Serwist PWA wrapper ───────────────────────────────────────────────────────
// Serwist uses Webpack to compile the service worker.
// Next.js 16 defaults to Turbopack; we disable it for production builds
// so Webpack runs and generates public/sw.js correctly.
// Dev still uses Turbopack (fast HMR); SW is disabled in dev anyway.
const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",           // our service worker source
  swDest: "public/sw.js",       // output path (must be inside public/)
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  // Match Vite's build behavior — TS errors don't block production builds
  // (Three.js texture.image types and similar are known strictness gaps)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Allow images from any domain for portfolio content
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
    unoptimized: false,
  },
  // Transpile Three.js ecosystem for Next.js
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  // ─── Domain Consolidation ────────────────────────────────────────────────────
  // Enforce canonical apex domain: nehalnadaf.me (no www).
  // All www variants and old .com domain are permanently redirected here.
  // Requires: both nehalnadaf.me AND www.nehalnadaf.me to be added as domains
  // in your Vercel project dashboard (Domains tab) for these to fire at edge.
  async redirects() {
    return [
      // www.nehalnadaf.me  →  nehalnadaf.me  (apex domain wins)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.nehalnadaf.me' }],
        destination: 'https://nehalnadaf.me/:path*',
        permanent: true,
      },
      // www.nehalnadaf.com →  nehalnadaf.me  (old domain + www)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.nehalnadaf.com' }],
        destination: 'https://nehalnadaf.me/:path*',
        permanent: true,
      },
      // nehalnadaf.com     →  nehalnadaf.me  (old apex domain)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'nehalnadaf.com' }],
        destination: 'https://nehalnadaf.me/:path*',
        permanent: true,
      },
    ];
  },
};

export default withSerwist(nextConfig);
