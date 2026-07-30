/**
 * HomeSchemas — Server component for homepage-only JSON-LD schemas.
 *
 * Injected via app/layout.tsx only for the '/' path.
 * Keeps FAQPage schema scoped to the homepage where the FAQ accordion lives.
 *
 * Schemas included (homepage-specific):
 * 1. FAQPage — FAQ rich results (accordion in Google SERP)
 */

// ─── FAQ data (mirrors sections/FAQSection.tsx) ───────────────────────────────
// Keep this in sync with sections/FAQSection.tsx whenever FAQ content changes.
const faqs = [
  {
    question: 'What services does Nehal Nadaf offer?',
    answer:
      'Nehal Nadaf offers premium web development (React.js, Next.js, Tailwind CSS, GSAP), UI/UX design (Figma), professional video editing and colour grading (DaVinci Resolve), social media management, content creation, and full influencer marketing campaigns — serving businesses in Hubli, Karnataka, and across India.',
  },
  {
    question: 'Does Nehal Nadaf do social media management and marketing?',
    answer:
      'Yes — through his creative agency in Hubli, Karnataka, Nehal Nadaf provides full-service social media management including content creation, Instagram Reels production, YouTube video editing, branded graphics, and complete social media strategy. He is the production force behind campaigns — ensuring everything is polished, strategic, and on-brand.',
  },
  {
    question: 'Does Nehal Nadaf do influencer marketing in Hubli and Karnataka?',
    answer:
      'Yes. Nehal Nadaf runs influencer marketing campaigns connecting brands with Instagram and YouTube content creators based in Hubli, Dharwad, and across Karnataka, India. The influencers he works with average 50K–100K+ views per post, maximising brand reach and ROI for businesses targeting Karnataka and Indian audiences.',
  },
  {
    question: 'How many projects has Nehal Nadaf delivered?',
    answer:
      '10+ professional business websites across automotive detailing, education, dental healthcare, food service, restaurant, and home-appliance industries — plus years of video production and social media work for brands and content creators across Karnataka, India.',
  },
  {
    question: 'How do we get started with Nehal Nadaf?',
    answer:
      "Hit the contact button or email nehalnadaff@gmail.com directly. You can also WhatsApp at +91 6363278962. We'll align on your vision, goals, and timeline — then move fast.",
  },
  {
    question: 'What is the tech stack for Nehal Nadaf web development projects?',
    answer:
      'React.js, Next.js, HTML5, CSS3, JavaScript (ES6+), TypeScript, Tailwind CSS, and GSAP for animations. All projects are deployed on Vercel for lightning-fast load times, high availability, and global CDN performance.',
  },
  {
    question: 'What does the Nehal Nadaf creative agency offer beyond freelance?',
    answer:
      'Behind Nehal is a full creative agency in Hubli, Karnataka with graphic designers, video editors, videographers, and content scriptwriters. The agency handles complete creative production — from brand identity and social media creatives to video shoots and web development — acting as a full creative partner for your brand across Karnataka and India.',
  },
  {
    question: 'Where is Nehal Nadaf based and does he work remotely?',
    answer:
      'Nehal Nadaf is based in Hubli, Karnataka, India. He works with clients locally in Hubli and Dharwad, and also serves clients remotely across Karnataka, India, and internationally worldwide.',
  },
];

// ─── Schema Builder ───────────────────────────────────────────────────────────

function faqPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomeSchemas() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(), null, 0) }}
    />
  );
}
