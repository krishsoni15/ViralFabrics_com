'use client';

import React from 'react';
import { HomeHeroSection } from '@/components/HomeHeroSection';
import { WhoWeAreSection } from '@/components/WhoWeAreSection';
import { FabricsPortfolioSection } from '@/components/FabricsPortfolioSection';
import { QualityPracticesSection } from '@/components/QualityPracticesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* 1. Luxury Hero Section with Agnes Toth Left-to-Right Unblur Sweep & Parallax Video */}
      <HomeHeroSection />

      {/* 2. Curtain Stacking Sections */}
      <div className="relative z-10 bg-transparent">
        <WhoWeAreSection />
        <FabricsPortfolioSection />
        <QualityPracticesSection />
        <TestimonialsSection />
      </div>
    </div>
  );
}
