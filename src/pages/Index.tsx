import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import WhySection from '@/components/landing/WhySection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CertificateSection from '@/components/landing/CertificateSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import ChallengeRulesSection from '@/components/landing/ChallengeRulesSection';
import FinalCTASection from '@/components/landing/FinalCTASection';
import Footer from '@/components/landing/Footer';
import LiveVisitorCount from '@/components/landing/LiveVisitorCount';

const Index = () => {
  console.log('Index page rendering...');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50">
      <HeroSection />
      <LiveVisitorCount />
      <WhySection />
      <TestimonialsSection />
      <CertificateSection />
      <FeaturesSection />
      <ChallengeRulesSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default Index;
