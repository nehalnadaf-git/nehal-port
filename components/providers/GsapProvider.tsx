'use client';

import { useEffect } from 'react';

export default function GsapProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // All GSAP initialization is inside useEffect — runs only in browser, never during SSR
    const initGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);

      // ignoreMobileResize: prevents iOS address-bar show/hide from resetting scroll positions
      ScrollTrigger.config({ ignoreMobileResize: true });

      // Handle orientation changes and tab visibility
      ScrollTrigger.config({
        autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
      });

      // Default GSAP ease
      gsap.defaults({ ease: 'power3.out' });
    };

    initGsap();
  }, []);

  return <>{children}</>;
}
