/**
 * Service Worker — powered by Serwist
 *
 * Uses the Serwist class API (serwist package).
 * Precaches all Next.js build output (JS, CSS, pages) automatically.
 * Runtime caching (defaultCache from @serwist/next/worker) covers:
 *   - Google Fonts (CacheFirst, 1 year)
 *   - Next.js images (CacheFirst, 30 days)
 *   - API routes (NetworkFirst)
 *   - All navigations (NetworkFirst with offline fallback)
 */

import { defaultCache } from "@serwist/next/worker";
import { Serwist } from "serwist";

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();
