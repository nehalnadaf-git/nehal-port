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
};

export default withSerwist(nextConfig);
