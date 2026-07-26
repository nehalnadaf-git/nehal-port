'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import GrainOverlay from '@/components/GrainOverlay';
import GridLines from '@/components/GridLines';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PortfolioDock from '@/components/PortfolioDock';
import HeroSection from '@/sections/HeroSection';
import AboutIntroSection from '@/sections/AboutIntroSection';
import WhoAmISection from '@/sections/WhoAmISection';
import BioStatementSection from '@/sections/BioStatementSection';
import CreativeByMeSection from '@/sections/CreativeByMeSection';
import StatsSection from '@/sections/StatsSection';
import ExperienceSection from '@/sections/ExperienceSection';
import AwardsSection from '@/sections/AwardsSection';
import StackToolsSection from '@/sections/StackToolsSection';
import FAQSection from '@/sections/FAQSection';
import CTASection from '@/sections/CTASection';
import WebsiteProjectsGallery from '@/sections/WebsiteProjectsGallery';
import VideoProjectsGallery from '@/sections/VideoProjectsGallery';

export default function HomePage() {
  useSmoothScroll();

  return (
    <>
      <GrainOverlay />
      <GridLines />
      <Navigation />

      <main className="relative z-10">
        <HeroSection />
        <AboutIntroSection />
        <WebsiteProjectsGallery />
        <VideoProjectsGallery />
        <WhoAmISection />
        <BioStatementSection />
        <CreativeByMeSection />
        <StatsSection />
        <ExperienceSection />
        <AwardsSection />
        <StackToolsSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />

      {/* Magnetic Dock — fixed bottom navigation, hidden on mobile */}
      <PortfolioDock />
    </>
  );
}
