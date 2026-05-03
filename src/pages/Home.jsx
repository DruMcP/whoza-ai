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
import DashboardPreview from '../components/DashboardPreview';
import AudioDemoPlayer from '../components/AudioDemoPlayer';
import IntegrationLogoBand from '../components/IntegrationLogoBand';
import ComparisonTable from '../components/ComparisonTable';
import TrustBadgeBand from '../components/TrustBadgeBand';
import LostRevenueCalculator from '../components/LostRevenueCalculator';
import GoogleReviews from '../components/GoogleReviews';
import { generateHomePageSchemas } from '../utils/schemaOrg';

export default function Home() {
  const schemas = generateHomePageSchemas();

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
        <DashboardPreview />
        <MeetTheTeam />
        <IntegrationLogoBand />
        <PricingTeaser />
        <ComparisonTable />
        <TestimonialCarousel />
        <GoogleReviews />
        <FAQAccordion />
        <FinalCTA />
      </main>

      <Footer />
      <StickyCTA />
    </>
  );
}
