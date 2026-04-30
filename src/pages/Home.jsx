import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import NewHero from '../components/NewHero';
import SocialProofBand from '../components/SocialProofBand';
import StatsBand from '../components/StatsBand';
import ProblemSolution from '../components/ProblemSolution';
import HowItWorks from '../components/HowItWorks';
import MeetTheTeam from '../components/MeetTheTeam';
import PricingTeaser from '../components/PricingTeaser';
import TestimonialCarousel from '../components/TestimonialCarousel';
import FAQAccordion from '../components/FAQAccordion';
import FinalCTA from '../components/FinalCTA';
import StickyCTA from '../components/StickyCTA';
import LostRevenueCalculator from '../components/LostRevenueCalculator';
import AudioDemoPlayer from '../components/AudioDemoPlayer';
import IntegrationLogoBand from '../components/IntegrationLogoBand';
import ComparisonTable from '../components/ComparisonTable';
import TrustBadgeBand from '../components/TrustBadgeBand';
import { generateHomePageSchemas } from '../utils/schemaOrg';

export default function Home() {
  const schemas = generateHomePageSchemas();

  useEffect(() => {
    // Simple scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.ds-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEO schemas={schemas} />
      <Header />

      <main id="main-content" role="main">
        <NewHero />
        <SocialProofBand />
        <StatsBand />
        <TrustBadgeBand />
        <ProblemSolution />
        <LostRevenueCalculator />
        <AudioDemoPlayer />
        <HowItWorks />
        <MeetTheTeam />
        <IntegrationLogoBand />
        <PricingTeaser />
        <ComparisonTable />
        <TestimonialCarousel />
        <FAQAccordion />
        <FinalCTA />
      </main>

      <Footer />
      <StickyCTA />
    </>
  );
}
