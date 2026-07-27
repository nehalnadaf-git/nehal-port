/**
 * Web App Manifest — Next.js App Router file convention.
 * Served at /manifest.webmanifest automatically.
 * Replaces the static public/site.webmanifest and public/manifest.json.
 */

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nehal Nadaf",
    short_name: "Nehalnadaf",
    description:
      "Full Creative Professional — Web Development, UI/UX Design & Cinematic Video Production",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#F2F1E6",
    theme_color: "#F2F1E6",
    lang: "en-IN",
    categories: ["portfolio", "design", "development"],
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Website Projects",
        short_name: "Projects",
        description: "View website projects",
        url: "/projects",
        icons: [{ src: "/favicon-96x96.png", sizes: "96x96" }],
      },
      {
        name: "Video Projects",
        short_name: "Videos",
        description: "View video projects",
        url: "/videos",
        icons: [{ src: "/favicon-96x96.png", sizes: "96x96" }],
      },
    ],
  };
}
