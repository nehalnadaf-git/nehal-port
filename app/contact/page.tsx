'use client'

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import GrainOverlay from '@/components/GrainOverlay';
import GridLines from '@/components/GridLines';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PortfolioDock from '@/components/PortfolioDock';
import { useReveal } from '@/hooks/useReveal';
import { SEO } from '@/lib/seo';
import { MapPin, Mail, MessageSquare, Clock, ArrowUpRight } from 'lucide-react';

/* ── Validation ─────────────────────────────────────────────────────────────── */
const contactSchema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.string().email('Please enter a valid email address'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
type ContactFormData = z.infer<typeof contactSchema>;

const SERVICE_OPTIONS = [
  { value: '',                         label: 'Select a service…'             },
  { value: 'web-development',          label: 'Web Development (React.js / Next.js)' },
  { value: 'ui-ux-design',             label: 'UI/UX Design (Figma)'           },
  { value: 'video-editing',            label: 'Video Editing & Colour Grading'  },
  { value: 'social-media-marketing',   label: 'Social Media Management'         },
  { value: 'influencer-marketing',     label: 'Influencer Marketing Campaign'   },
  { value: 'other',                    label: 'Something else'                  },
];

const CONTACT_INFO = [
  { icon: MessageSquare, label: 'WhatsApp',     value: '+91 6363278962',          href: () => SEO.whatsapp,             external: true,  desc: 'Fastest response — usually within hours' },
  { icon: Mail,          label: 'Email',        value: () => SEO.email,           href: () => `mailto:${SEO.email}`,    external: false, desc: 'For detailed project briefs and documents' },
  { icon: Clock,         label: 'Availability', value: 'Mon – Sat, 09:00–21:00 IST', href: null,                        external: false, desc: 'India Standard Time (UTC +5:30)' },
  { icon: MapPin,        label: 'Based in',     value: 'Hubli, Karnataka, India', href: null,                           external: false, desc: 'Serving clients worldwide' },
];

const fieldWrap = 'flex flex-col gap-1';
const labelCls  = 'type-mono text-foreground/50';
const inputBase: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  borderBottom: '1.5px solid rgba(0,0,0,0.25)',
  outline: 'none',
  padding: '10px 0',
  fontFamily: "'Inter', sans-serif",
  fontSize: 'clamp(14px, 1.3vw, 16px)',
  color: '#000',
  width: '100%',
  transition: 'border-color 0.2s',
};

export default function ContactPage() {
  useSmoothScroll();
  const [focused, setFocused] = useState<string | null>(null);

  const heroRef  = useReveal<HTMLDivElement>({ threshold: 0.1 });
  const infoRef  = useReveal<HTMLDivElement>({ threshold: 0.08 });
  const formRef  = useReveal<HTMLDivElement>({ threshold: 0.08 });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    console.log('[ContactForm] Submission (not yet sent):', data);
    await new Promise(r => setTimeout(r, 700));
    toast.success('Message received!', { description: "I'll reply within 24 hours.", duration: 5000 });
    reset();
  };

  const borderColor = (name: string, hasError: boolean) =>
    hasError ? '#e53e3e' : focused === name ? '#A855F7' : 'rgba(0,0,0,0.25)';

  return (
    <>
      <Toaster position="top-right" />
      <GrainOverlay />
      <GridLines />
      <Navigation />

      <main className="relative z-10">

        {/* ── Hero ── */}
        <section
          id="contact-hero"
          className="container-padding"
          style={{ background: '#F2F1E6', paddingTop: 'clamp(110px, 14vw, 160px)', paddingBottom: 'clamp(64px, 8vw, 120px)' }}
          aria-labelledby="contact-heading"
        >
          <div ref={heroRef} className="rv-up max-w-3xl">
            <p className="type-mono opacity-50 mb-4 tracking-widest">// Contact</p>
            <h1
              id="contact-heading"
              className="type-h2 text-foreground"
            >
              Start a{' '}
              <span className="brutal-selection">
                <span className="brutal-selection-handle-left" />
                <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>Project</span>
                <span className="brutal-selection-handle-right" />
              </span>
            </h1>
            <p className="type-body-lg text-foreground/65 mt-6 leading-relaxed">
              Based in Hubli, Karnataka — working with clients across India and internationally.
              Reach out via the form below, WhatsApp, or email.
            </p>
          </div>
        </section>

        {/* ── Info + Form ── */}
        <section
          className="container-padding"
          style={{ background: '#E8E6D8', paddingTop: 'clamp(64px, 8vw, 112px)', paddingBottom: 'clamp(64px, 8vw, 112px)' }}
          aria-label="Contact details and form"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl">

            {/* Left — direct info cards */}
            <div ref={infoRef} className="rv-up flex flex-col gap-5">
              <p className="type-mono opacity-50 mb-3 tracking-widest">// Direct contact</p>
              <div className="space-y-4">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href, external, desc }) => {
                  const displayValue = typeof value === 'function' ? value() : value;
                  const hrefValue    = typeof href  === 'function' ? href()  : href;
                  return (
                    <div
                      key={label}
                      className="bg-[#F2F1E6] border-2 border-black rounded-none p-5 shadow-[4px_4px_0px_#000000] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000000] flex gap-4 items-start"
                    >
                      <Icon size={16} className="text-foreground/70 mt-1 flex-shrink-0" />
                      <div>
                        <p className="type-mono text-foreground/40 mb-1">{label}</p>
                        {hrefValue ? (
                          <a
                            href={hrefValue}
                            target={external ? '_blank' : undefined}
                            rel={external ? 'noopener noreferrer' : undefined}
                            className="type-body text-foreground font-semibold hover:underline flex items-center gap-1"
                            style={{ textDecoration: 'none' }}
                          >
                            {displayValue} <ArrowUpRight size={12} />
                          </a>
                        ) : (
                          <p className="type-body text-foreground font-semibold">{displayValue}</p>
                        )}
                        <p className="type-body text-foreground/50 text-xs mt-0.5">{desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Pills */}
              <p className="type-mono opacity-40 mt-6 mb-2 tracking-widest">// Also on</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { href: SEO.social.linkedin,  label: 'LinkedIn'    },
                  { href: SEO.social.instagram, label: 'Instagram'   },
                  { href: SEO.social.twitter,   label: 'X (Twitter)' },
                ].map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-tool badge-brutal flex items-center gap-1"
                    style={{ textDecoration: 'none' }}
                  >
                    {label} <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right — form inside brutalist container */}
            <div ref={formRef} className="rv-up bg-[#F2F1E6] border-2 border-black rounded-none p-6 sm:p-8 shadow-[6px_6px_0px_#000000]">
              <p className="type-mono opacity-50 mb-6 tracking-widest">// Send a message</p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-label="Contact form"
                className="space-y-6"
              >
                {/* Name */}
                <div className={fieldWrap}>
                  <label htmlFor="c-name" className={labelCls}>Your name</label>
                  <input
                    id="c-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Rahul Sharma"
                    {...register('name')}
                    style={{ ...inputBase, borderColor: borderColor('name', !!errors.name) }}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                  />
                  {errors.name && <p role="alert" className="type-mono opacity-60" style={{ color: '#e53e3e' }}>{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className={fieldWrap}>
                  <label htmlFor="c-email" className={labelCls}>Email address</label>
                  <input
                    id="c-email"
                    type="email"
                    autoComplete="email"
                    placeholder="rahul@company.com"
                    {...register('email')}
                    style={{ ...inputBase, borderColor: borderColor('email', !!errors.email) }}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                  />
                  {errors.email && <p role="alert" className="type-mono opacity-60" style={{ color: '#e53e3e' }}>{errors.email.message}</p>}
                </div>

                {/* Service */}
                <div className={fieldWrap}>
                  <label htmlFor="c-service" className={labelCls}>Service needed</label>
                  <select
                    id="c-service"
                    {...register('service')}
                    style={{ ...inputBase, borderColor: borderColor('service', !!errors.service), appearance: 'none', cursor: 'pointer' }}
                    onFocus={() => setFocused('service')}
                    onBlur={() => setFocused(null)}
                  >
                    {SERVICE_OPTIONS.map(({ value, label }) => (
                      <option key={value} value={value} disabled={!value}>{label}</option>
                    ))}
                  </select>
                  {errors.service && <p role="alert" className="type-mono opacity-60" style={{ color: '#e53e3e' }}>{errors.service.message}</p>}
                </div>

                {/* Message */}
                <div className={fieldWrap}>
                  <label htmlFor="c-message" className={labelCls}>Your message</label>
                  <textarea
                    id="c-message"
                    rows={4}
                    placeholder="Tell me about your project…"
                    {...register('message')}
                    style={{ ...inputBase, borderColor: borderColor('message', !!errors.message), resize: 'vertical', minHeight: '100px' }}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                  />
                  {errors.message && <p role="alert" className="type-mono opacity-60" style={{ color: '#e53e3e' }}>{errors.message.message}</p>}
                </div>

                {/* Submit — purple brutalist button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-brutal btn-brutal-primary w-full"
                  style={{
                    background: isSubmitting ? 'rgba(168,85,247,0.5)' : '#A855F7',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isSubmitting ? 'SENDING…' : 'SEND MESSAGE'}
                </button>

                <p className="type-mono text-center text-foreground/30 opacity-60">
                  I reply within 24 hours · Mon–Sat · 09:00–21:00 IST
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <PortfolioDock />
    </>
  );
}
