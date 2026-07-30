'use client'

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { Plus } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { useReveal, useRevealChildren } from '@/hooks/useReveal';
import { MagicText } from '@/components/ui/magic-text';

const faqs = [
  {
    question: 'What services do you offer?',
    answer:
      'Premium web development (React.js, Next.js, Tailwind CSS, GSAP), UI/UX design, professional video editing and colour grading (DaVinci Resolve), graphic design, and full social media content production — covering brand videos, Instagram Reels, YouTube content, and product promos.',
  },
  {
    question: 'Do you work with social media content?',
    answer:
      'Yes — through our agency setup we produce professional social media content including Instagram Reels, YouTube videos, branded graphics, and campaign creatives. We are the production force behind the content — ensuring everything is polished, strategic, and on-brand.',
  },
  {
    question: 'How many projects have you delivered?',
    answer:
      '10+ professional business websites across automotive detailing, education, dental healthcare, food service, and home-appliance industries — plus years of video production work for brands and content creators.',
  },
  {
    question: 'How do we get started?',
    answer:
      "Hit the contact button or email nehalnadaff@gmail.com directly. You can also WhatsApp at +91 6363278962. We'll align on your vision, goals, and timeline — then move fast.",
  },
  {
    question: 'What is your tech stack for web development?',
    answer:
      'React.js, Next.js, HTML5, CSS3, JavaScript (ES6+), Tailwind CSS, and GSAP for animations. All projects are deployed on Vercel for lightning-fast load times, high availability, and global CDN performance.',
  },
  {
    question: 'What does your agency offer beyond freelance?',
    answer:
      'Behind Nehal is a full creative agency with graphic designers, video editors, videographers, and content scriptwriters. We handle complete creative production — from brand identity and social media creatives to video shoots and web development — acting as a full creative partner for your brand.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Heading reveal
  const headingRef = useReveal<HTMLHeadingElement>({ threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

  // Items stagger reveal
  const listRef = useRevealChildren<HTMLDivElement>('.faq-item', {
    staggerMs: 70,
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px',
  });

  // GSAP accordion — height animation (JS-required, GSAP is ideal)
  const toggleItem = (index: number) => {
    if (openIndex !== null && contentRefs.current[openIndex]) {
      gsap.to(contentRefs.current[openIndex], {
        height: 0,
        duration: 0.38,
        ease: 'power2.inOut',
      });
    }

    if (openIndex === index) {
      setOpenIndex(null);
      return;
    }

    setOpenIndex(index);
    const content = contentRefs.current[index];
    if (content) {
      gsap.set(content, { height: 'auto' });
      const autoHeight = content.offsetHeight;
      gsap.fromTo(content, { height: 0 }, {
        height: autoHeight,
        duration: 0.44,
        ease: 'power3.out',
      });
    }
  };

  return (
    <section style={{ background: '#E8E6D8' }}>
      <SectionHeader number="10" title="//FAQ" label="Concerns" />

      <div className="container-padding pb-24 md:pb-32">
        <div className="mb-12">
          <MagicText
            text="Frequently Asked [_Questions_]"
            wrapperClassName="justify-center text-center font-extrabold type-h2 text-foreground"
          />
        </div>

        {/* FAQ items — staggered reveal */}
        <div ref={listRef} className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item rv-up"
              style={{ borderBottom: '2px solid #000000' }}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between py-5 md:py-6 text-left group"
              >
                <div className="flex items-center gap-3 md:gap-6 min-w-0">
                  <span className="type-mono text-foreground flex-shrink-0 opacity-40">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="type-h3 text-foreground leading-snug">
                    {faq.question}
                  </span>
                </div>
                <Plus
                  size={16}
                  className={`text-foreground transition-transform duration-300 flex-shrink-0 ml-2 md:ml-4 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}
                />
              </button>

              <div
                ref={(el) => { contentRefs.current[index] = el; }}
                className="overflow-hidden"
                style={{ height: 0 }}
              >
                <div className="pb-5 md:pb-6 pl-0 sm:pl-8 md:pl-12">
                  <p className="type-body text-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
