/**
 * Central service data — single source of truth for all 4 service pages.
 *
 * Each service object drives:
 *   - Page content (ServicePage.tsx template)
 *   - JSON-LD schema (Service, FAQPage, BreadcrumbList in each layout.tsx)
 *   - Metadata (title, description, keywords in each layout.tsx)
 *
 * To add a new service: append a new object to the SERVICES array.
 * To edit existing content: modify only this file — all pages update automatically.
 *
 * NO PRICING: This file must not contain any price figures, price ranges, tiers,
 * ₹ symbols, or cost references. Contact information goes through lib/seo.ts (SEO.*).
 */

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceWhyItem {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  name: string;
  /** Short phrase shown in hero — includes Hubli/Karnataka for local SEO */
  tagline: string;
  /** 1–2 sentences shown prominently in hero under the H1 */
  shortDescription: string;
  /** 5–7 sentences of full body copy (split into paragraphs at \n\n) */
  fullDescription: string;
  /** Bullet list of deliverables for the "What's Included" section */
  whatIsIncluded: string[];
  /** Tools/technologies for the "Tools & Technology" section */
  toolsUsed: string[];
  /** 3–4 reasons for the "Why Nehal Nadaf" section */
  whyChoose: ServiceWhyItem[];
  /** 5 page-specific FAQs (also injected as FAQPage JSON-LD in layout.tsx) */
  faqs: ServiceFAQ[];
  /** Slug(s) of related services to show in the cross-link cards */
  relatedServices: string[];
  // ── SEO ──────────────────────────────────────────────────────────────────
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export const services: Service[] = [
  /* ── 1. Web Development ──────────────────────────────────────────────────── */
  {
    slug: 'web-development',
    name: 'Web Development',
    tagline: 'Custom, High-Performance Websites Built for Results — Hubli, Karnataka',
    shortDescription:
      'Custom React.js and Next.js websites engineered for speed, performance, and search visibility. No templates, no WordPress — every build starts from a clean codebase and is crafted to the highest standard.',
    fullDescription:
      `Nehal Nadaf builds bespoke, high-performance business websites using React.js and Next.js — the same stack powering companies like Vercel, Loom, and Twitch. Unlike template-based site builders that produce bloated, slow websites, every project starts from a clean codebase and is engineered for performance from the first line of code. The result is consistently sub-second load times, excellent Lighthouse scores, and websites that rank and convert.

Serving clients in Hubli, Dharwad, and across Karnataka, with a growing portfolio of remote clients across India and internationally, the web development practice has delivered live business websites across automotive detailing, dental healthcare, education, restaurants, food service, and home appliance repair. Every industry. Every size. Every time to the same standard.

Each website is designed in Figma first, developed with precision in React.js and Next.js, animated with GSAP for cinematic micro-interactions, and deployed on Vercel for edge-performance globally. TypeScript ensures maintainable, type-safe codebases. Tailwind CSS provides consistent, pixel-accurate design systems without runtime CSS overhead.

The combination means faster delivery, fewer bugs, and a website that genuinely reflects the calibre of the business it represents — whether it is a single-page landing that converts or a multi-section portfolio that impresses.`,
    whatIsIncluded: [
      'Custom design (no templates) — Figma wireframes to pixel-accurate implementation',
      'React.js / Next.js development with TypeScript for maintainability',
      'Responsive, mobile-first layouts tested across iOS, Android, and desktop',
      'GSAP scroll-triggered animations and micro-interactions',
      'Vercel deployment with global CDN and edge performance',
      'SEO foundation: semantic HTML, meta tags, Open Graph, JSON-LD schema',
      'Performance optimisation: lazy loading, image optimisation, code splitting',
      'On-page content integration and keyword alignment',
    ],
    toolsUsed: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Figma', 'Vercel'],
    whyChoose: [
      {
        title: 'No templates — ever',
        description:
          'Every project starts from a clean codebase written specifically for your business. No page builder bloat. No generic layouts. No WordPress vulnerabilities. The result is a faster, more secure, more maintainable website.',
      },
      {
        title: 'Live websites across Karnataka',
        description:
          'The portfolio includes businesses across automotive detailing, dental healthcare, education, restaurants, and home services — all deployed and live. You can visit every one of them before making a decision.',
      },
      {
        title: 'Design and development in one',
        description:
          'When the designer and developer are the same person, there is zero handoff friction. The Figma design is implemented exactly as designed — right fonts, right spacing, right animations. No translation loss between design and code.',
      },
      {
        title: 'Built for long-term performance',
        description:
          'Every website is built with an SEO foundation (semantic HTML, schema markup, Open Graph), optimised assets, and a codebase that is easy to maintain and extend. The site you get on launch day performs better than most sites after years of patches.',
      },
    ],
    faqs: [
      {
        question: 'What kind of businesses does Nehal Nadaf build websites for?',
        answer:
          'Nehal has built websites across automotive detailing, dental healthcare, education, restaurants, food service, home appliance repair, and personal portfolio sites. Any business that needs a professional online presence built to the highest standard is a fit. There is no industry restriction.',
      },
      {
        question: 'Does Nehal Nadaf build websites for clients outside Hubli?',
        answer:
          'Yes — the majority of web development work is remote-compatible. Clients across Karnataka, across India, and internationally receive the same process: Figma design review, iterative feedback rounds, and final deployment on Vercel. Time zones and geography are not a constraint.',
      },
      {
        question: 'What tech stack is used and why?',
        answer:
          'React.js and Next.js form the foundation — the same stack used by some of the world\'s fastest-growing companies. TypeScript catches errors at development time. Tailwind CSS ensures consistent responsive styling without CSS bloat. GSAP handles animations that CSS alone cannot achieve. Vercel provides deployment with automatic SSL, global CDN, and zero-downtime deploys. Together this produces websites that are fast, maintainable, and future-proof.',
      },
      {
        question: 'How long does it take to build a business website?',
        answer:
          'A standard business website with 5–8 pages typically takes 3–5 weeks from design kickoff to live deployment — including the Figma design phase, development, content integration, cross-device testing, and final SEO setup. More complex projects may take 6–10 weeks. Every project includes a clear timeline agreed upfront.',
      },
      {
        question: 'What happens after the website is live?',
        answer:
          'The handover includes a walkthrough of the deployed site, and all code is available in a Git repository. Minor content updates can be discussed case by case. For ongoing changes, performance monitoring, or further feature development, continuation arrangements are available on a project basis.',
      },
    ],
    relatedServices: ['ui-ux-design', 'social-media-marketing'],
    metaTitle: 'Web Development in Hubli, Karnataka | Nehal Nadaf',
    metaDescription:
      'Custom React.js & Next.js websites built for performance by Nehal Nadaf — web developer in Hubli, Karnataka. Serving clients across India and worldwide. No templates, no WordPress.',
    keywords: [
      'web development Hubli',
      'web developer Hubli Karnataka',
      'website developer Karnataka India',
      'React.js developer Hubli',
      'Next.js developer Karnataka',
      'custom website development Hubli',
      'professional website developer India',
      'freelance web developer Hubli',
      'business website Hubli',
      'website design and development Karnataka',
    ],
  },

  /* ── 2. UI/UX Design ─────────────────────────────────────────────────────── */
  {
    slug: 'ui-ux-design',
    name: 'UI/UX Design',
    tagline: 'Conversion-Focused Digital Experiences Designed in Figma — Hubli, Karnataka',
    shortDescription:
      'Every interface is designed around one question: what does this visitor need to do next? From wireframes to polished high-fidelity prototypes, the process is grounded in user behaviour, brand precision, and a visual standard that makes a first impression count.',
    fullDescription:
      `Good design is not decoration — it is the difference between a visitor who leaves in three seconds and a client who picks up the phone. The UI/UX design process starts with understanding: the brand, the audience, and the specific outcome the design needs to achieve.

From there, wireframes establish the information architecture and user flows before a single visual decision is made. High-fidelity prototypes in Figma bring the design to life — letting you experience the product before any code is written, reducing development time and design misalignment.

The visual design language is deliberately premium: considered typography (no generic system fonts), a curated colour palette, and micro-interactions that reward exploration without distracting from the goal. For web interfaces, every component is designed with its responsive behaviour defined — desktop, tablet, and mobile are designed together, not added as afterthoughts.

For clients who need both design and development, the UI/UX process flows directly into the React.js and Next.js build — no handoff friction, no file conversion, no visual drift between design and production. The result is a website that looks exactly like the Figma file and behaves exactly as designed.`,
    whatIsIncluded: [
      'Discovery call and brand alignment session',
      'Information architecture and user flow mapping',
      'Low-fidelity wireframes for all core pages and screens',
      'High-fidelity Figma prototypes with interactive states',
      'Responsive design across desktop, tablet, and mobile breakpoints',
      'Design system: type scale, colour palette, spacing tokens, component library',
      'Handoff-ready Figma files with developer annotations',
      'Optional: direct transition to React.js / Next.js development',
    ],
    toolsUsed: ['Figma', 'React.js', 'Next.js', 'Tailwind CSS', 'GSAP'],
    whyChoose: [
      {
        title: 'Design that converts, not just impresses',
        description:
          'Every layout decision is made with a conversion goal in mind. Typography hierarchy guides the eye. Whitespace creates focus. CTAs are placed where user attention naturally lands. Beautiful and effective are not trade-offs here.',
      },
      {
        title: 'Figma → production with zero drift',
        description:
          'When design and development are done by the same person, the Figma prototype is what gets built — exact fonts, exact spacing, exact animations. No "close enough" from a developer who never met the designer.',
      },
      {
        title: 'Responsive by default, not by afterthought',
        description:
          'Every component is designed for mobile, tablet, and desktop simultaneously from the wireframe stage. The mobile layout is not a scaled-down desktop; it is a fully considered experience for touch and small screens.',
      },
      {
        title: 'You own the design files',
        description:
          'All Figma source files — frames, components, design system tokens, and interactive prototypes — are delivered at project completion. You own them outright and can use them with any future developer.',
      },
    ],
    faqs: [
      {
        question: 'What does the UI/UX design process look like?',
        answer:
          'It begins with a discovery session to understand your brand, target audience, and design goals. From there: wireframes establish structure, high-fidelity Figma designs build the visual system, and an interactive prototype demonstrates the experience before development begins. Feedback rounds are built into every stage.',
      },
      {
        question: 'Do you design for mobile as well as desktop?',
        answer:
          'Responsive design is non-negotiable. Every interface is designed for desktop, tablet, and mobile simultaneously — not as an afterthought. Mobile-first principles guide layout decisions from the wireframe stage, ensuring the design is equally polished at every breakpoint.',
      },
      {
        question: 'Can you design the UI and also build the website?',
        answer:
          'Yes — and this is the strongest version of the service. When UI/UX design and React.js / Next.js development are handled by the same person, there is zero handoff friction. The design is implemented exactly as intended, with the right fonts, spacing, animation, and interaction behaviours. No translation loss.',
      },
      {
        question: 'Do I get the Figma source files?',
        answer:
          'Yes. All Figma source files are delivered at project completion — including all frames, components, and the full design system. You own them outright and can take them to any future developer without restriction.',
      },
      {
        question: 'What if I already have a brand identity but need a new website design?',
        answer:
          'Existing brand guidelines are integrated directly into the Figma design system from the start — typography, colour palette, logo usage. If guidelines are informal or incomplete, a short brand alignment session can formalise the key decisions before design begins.',
      },
    ],
    relatedServices: ['web-development', 'social-media-marketing'],
    metaTitle: 'UI/UX Design in Hubli, Karnataka | Nehal Nadaf',
    metaDescription:
      'Professional UI/UX design in Figma by Nehal Nadaf — Hubli, Karnataka. Conversion-focused interfaces, responsive design for all devices, and direct handoff to React.js / Next.js development.',
    keywords: [
      'UI UX design Hubli',
      'UI UX designer Karnataka',
      'Figma designer Hubli',
      'web design Hubli Karnataka',
      'UI design freelancer India',
      'UX design Karnataka',
      'interface design Hubli',
      'product design Karnataka India',
      'freelance UI designer Karnataka',
      'web design and development Hubli',
    ],
  },

  /* ── 3. Video Editing ────────────────────────────────────────────────────── */
  {
    slug: 'video-editing',
    name: 'Video Editing & Production',
    tagline: 'Cinematic Video Editing & DaVinci Resolve Colour Grading — Hubli, Karnataka',
    shortDescription:
      'Brand films, Instagram Reels, YouTube content, and product promos — cut and colour-graded in DaVinci Resolve to commercial production standards. Available remotely across India and internationally.',
    fullDescription:
      `Most video content fails not because of bad footage, but because of average editing. The cut, the colour, the pacing, the music — these decisions transform raw footage into content that stops a scroll or holds a viewer to the end.

The video editing service is built around DaVinci Resolve — the industry standard for colour grading, used on Hollywood films and major commercial productions worldwide. Every project begins with an understanding of the intended platform and audience: a 15-second Instagram Reel has entirely different editing logic from a 90-second brand film or a YouTube explainer, and the edit reflects that.

Colour grading is not an optional extra — it is applied to every project, transforming flat, ungraded footage into content with a distinct visual identity that compounds into brand recognition over time. Audio is mixed to platform standards: dialogue levels, music bed, sound effects, and noise reduction are all handled.

Clients across Hubli, Karnataka, and across India and internationally have used this service for brand launches, product promos, event coverage, and ongoing social media content calendars. Remote collaboration works seamlessly: footage is shared via Google Drive or WeTransfer, and review links are delivered for browser-based approval before final export.`,
    whatIsIncluded: [
      'Full edit from raw footage to final export',
      'Colour grading and colour correction in DaVinci Resolve',
      'Audio mix: music, voice-over, sound effects, and noise reduction',
      'Motion graphics and title cards in brand fonts and colours',
      'Platform-optimised exports: Instagram (9:16, 1:1), YouTube (16:9), etc.',
      'Caption and subtitle files (.srt) on request',
      '2 rounds of revisions included per project',
    ],
    toolsUsed: ['DaVinci Resolve'],
    whyChoose: [
      {
        title: 'DaVinci Resolve — the Hollywood standard',
        description:
          'Most editors use consumer-grade tools. DaVinci Resolve is used on major Hollywood productions and global advertising campaigns. The colour science is measurably better, and it shows — especially in skin tones, shadow detail, and highlight recovery.',
      },
      {
        title: 'Platform-native editing logic',
        description:
          'Instagram Reels, YouTube videos, and brand films are different products that require different editing approaches. Reel pacing, hook placement, aspect ratio, and caption timing are all calibrated to the specific platform where the content will live.',
      },
      {
        title: 'Full audio production included',
        description:
          'Every deliverable has a complete audio mix: dialogue levels, royalty-free or licensed music beds, sound effects, and broadcast-standard noise reduction. Not just a video with a music track dropped on top.',
      },
      {
        title: 'Remote-first workflow, professional delivery',
        description:
          'Footage in, final export out — the remote workflow is tight and structured. Shared drives for footage, browser-viewable review links for feedback, and final delivery in every required format. Clients across India and internationally operate this way without friction.',
      },
    ],
    faqs: [
      {
        question: 'What type of videos does Nehal Nadaf edit?',
        answer:
          'Brand films, Instagram Reels, YouTube content, product promos, event highlight reels, and social media content for businesses and content creators. The full range — from 15-second vertical Reels built for the Instagram algorithm to cinematic 2-minute brand stories for websites and presentations.',
      },
      {
        question: 'Does colour grading come included?',
        answer:
          'Yes. Colour grading in DaVinci Resolve is applied to every video project — it is not a paid add-on. This includes primary correction for exposure and white balance, and secondary creative grading for the finished visual look. Platform-specific brightness limits (Instagram and YouTube have different luminance ceilings) are handled in the final export.',
      },
      {
        question: "What is the turnaround time for a brand video?",
        answer:
          'Instagram Reels and short-form content under 60 seconds are typically delivered within 1–2 business days. A standard brand video or commercial (1–3 minutes from good-quality footage) is typically delivered as a first cut within 3–5 business days. Revision rounds are structured and agreed upfront for every project.',
      },
      {
        question: 'Can Nehal Nadaf edit videos for international brands remotely?',
        answer:
          'Yes — fully remote video editing is the default workflow. Footage is shared via Google Drive, Dropbox, or WeTransfer. Review links are delivered in a browser-viewable format. Final exports are delivered in the resolution, format, and aspect ratio required for each platform. Time zone differences are not a constraint.',
      },
      {
        question: 'What software is used?',
        answer:
          'DaVinci Resolve is the exclusive editing and colour grading tool — the industry standard used on major Hollywood productions and commercial campaigns for precision colour science, editing, and audio mastering.',
      },
    ],
    relatedServices: ['social-media-marketing', 'web-development'],
    metaTitle: 'Video Editing in Hubli, Karnataka | Nehal Nadaf',
    metaDescription:
      'Cinematic video editing & DaVinci Resolve colour grading by Nehal Nadaf — Hubli, Karnataka. Brand films, Instagram Reels, YouTube content. Serving clients across India and worldwide.',
    keywords: [
      'video editing Hubli',
      'video editor Karnataka',
      'DaVinci Resolve editor India',
      'colour grading Karnataka',
      'Instagram Reels editor Hubli',
      'YouTube video editor Karnataka',
      'brand video production Hubli',
      'professional video editor India',
      'freelance video editor Karnataka',
      'video production Hubli Karnataka',
    ],
  },

  /* ── 4. Social Media Marketing ───────────────────────────────────────────── */
  {
    slug: 'social-media-marketing',
    name: 'Social Media Marketing',
    tagline: 'Full-Service Social Media Management & Influencer Marketing — Hubli, Karnataka',
    shortDescription:
      'Content strategy, production, scheduling, and influencer partnerships for brands that want to build a genuine audience on Instagram, YouTube, and beyond. Based in Hubli, Karnataka — operating across India and internationally.',
    fullDescription:
      `Social media management done properly is not posting three times a week and hoping for likes. It is a deliberate content strategy — knowing what the audience wants to see, when to post it, how to produce it, and how to use the platform's distribution logic to reach people who are not yet following you.

The service handles every layer of this: strategy, content creation (video, graphics, copy), production (filming, editing, design), scheduling, and performance review. The in-house video production capability sets this apart from pure strategy agencies — when the same team designs, shoots, edits, and posts the content, the result is a cohesive visual identity that compounds over time.

For brands in Hubli, Dharwad, and Karnataka, local market knowledge shapes the content strategy: understanding the language, cultural calendar, local hashtag ecosystem, and influencer network in the region. For national and international brands, the strategy shifts to broader positioning — SEO-informed YouTube descriptions, platform-specific creative for Instagram versus LinkedIn versus YouTube.

The influencer marketing side connects brand campaigns with a network of Karnataka-based creators averaging 50K–100K+ views per collaboration, reaching real, engaged audiences rather than inflated follower counts.`,
    whatIsIncluded: [
      'Monthly content calendar — platform-specific posting schedule',
      'Short-form video production: Instagram Reels and YouTube Shorts',
      'Branded graphic design: static posts, carousels, and stories',
      'Caption writing with platform-native SEO, hashtags, and hooks',
      'Community management: DM responses and comment engagement',
      'Influencer identification and campaign coordination (on request)',
      'Monthly performance report: reach, impressions, follower growth, top posts',
    ],
    toolsUsed: ['Instagram', 'YouTube', 'DaVinci Resolve', 'Figma', 'Meta Business Suite'],
    whyChoose: [
      {
        title: 'Full production, not just strategy',
        description:
          'Most social media agencies give you a content calendar. This service produces the content too — filming, editing, designing, and posting. One creative force handles the entire pipeline, which is why the visual identity stays consistent.',
      },
      {
        title: 'Karnataka influencer network — real reach',
        description:
          'An active network of Karnataka-based Instagram and YouTube creators averages 50K–100K+ views per collaboration. These are real audiences, not inflated follower counts — the reach is verified and the engagement is genuine.',
      },
      {
        title: 'Local market knowledge',
        description:
          'Being based in Hubli, Karnataka means understanding the local market: the language preferences, the cultural calendar, the peak engagement windows, and the hashtag ecosystems that actually work for audiences in North Karnataka.',
      },
      {
        title: 'Platform-native content logic',
        description:
          'Instagram Reels, YouTube videos, and LinkedIn posts require different formats, hooks, pacing, and caption strategies. Content is not repurposed across platforms — it is created specifically for each platform\'s algorithm and audience behaviour.',
      },
    ],
    faqs: [
      {
        question: 'What does a social media management retainer include?',
        answer:
          'A monthly retainer covers the full content calendar: a set number of posts per week across agreed platforms, including video Reels, static posts, and stories. Content is planned, produced, captioned, and posted on a pre-agreed schedule. A monthly performance review covers reach, impressions, follower growth, and engagement — with strategy adjustments based on the data.',
      },
      {
        question: 'Do you manage both content creation and posting?',
        answer:
          'Yes — this is a full-service offering. The content is not just strategised and handed off for the client to post. The full production pipeline is covered: filming coordination or editing of provided footage, post-production, caption writing, hashtag strategy, and scheduling at optimal times.',
      },
      {
        question: 'Does this service work for brands outside Karnataka?',
        answer:
          'Yes. Social media management is fully remote-compatible and works for brands anywhere in India or internationally. The content strategy is adapted for the target market — whether local Hubli audiences, pan-India campaigns, or international brand positioning. Platform algorithms are consistent regardless of geography.',
      },
      {
        question: 'How is the influencer marketing component integrated?',
        answer:
          'Influencer marketing can be added to any social media management arrangement. The agency manages an active network of Karnataka-based Instagram and YouTube creators averaging 50K–100K+ views per collaboration. Campaign briefs, creator selection, content approval, and performance tracking are all handled as part of the managed service.',
      },
      {
        question: 'What platforms do you manage?',
        answer:
          'Instagram, YouTube, and LinkedIn are the primary platforms. The strategy is tailored per platform — Instagram Reels for engagement and discovery, YouTube for longer-form content and search-driven traffic, LinkedIn for B2B positioning and professional credibility. Additional platforms are discussed based on where the target audience actually spends time.',
      },
    ],
    relatedServices: ['video-editing', 'web-development'],
    metaTitle: 'Social Media Marketing Hubli, Karnataka | Nehal Nadaf',
    metaDescription:
      'Full-service social media management & content creation by Nehal Nadaf — Hubli, Karnataka. Instagram, YouTube, brand strategy & influencer marketing for businesses across India.',
    keywords: [
      'social media marketing Hubli',
      'social media management Karnataka',
      'Instagram marketing Hubli Karnataka',
      'influencer marketing Hubli',
      'content creation Karnataka',
      'social media agency Hubli',
      'YouTube marketing Karnataka',
      'brand strategy Hubli',
      'social media consultant Karnataka India',
      'digital marketing Hubli Karnataka',
    ],
  },
];

/** Convenience lookup by slug — throws if not found */
export function getService(slug: string): Service {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Service not found: ${slug}`);
  return service;
}
