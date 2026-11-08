'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import {
  Calendar,
  Layers,
  Globe2,
  Users2,
} from 'lucide-react';
import { PageHeroBanner } from '@/components/PageHeroBanner';

export default function NetworkPage() {
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  // Agnes Toth aesthetic unblur and float-in animation for main network showcase
  useEffect(() => {
    let ctx: gsap.Context | null = null;
    ctx = gsap.context(() => {
      // 1. Narrative Left Column Entrance
      if (narrativeRef.current) {
        gsap.fromTo(
          narrativeRef.current,
          { opacity: 0, filter: 'blur(14px)', y: 24 },
          { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.1, delay: 0.2, ease: 'power2.out', clearProps: 'transform,filter' }
        );
      }

      // 2. Map Showcase Smooth Scale & Unblur
      if (mapRef.current) {
        gsap.fromTo(
          mapRef.current,
          { opacity: 0, filter: 'blur(16px)', scale: 0.94 },
          { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.2, delay: 0.35, ease: 'power2.out', clearProps: 'transform,filter' }
        );
      }

      // 3. Bottom 4 Pillars Bar Entrance
      if (pillarsRef.current) {
        gsap.fromTo(
          pillarsRef.current,
          { opacity: 0, filter: 'blur(12px)', y: 20 },
          { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.0, delay: 0.5, ease: 'power2.out', clearProps: 'transform,filter' }
        );
      }
    }, sectionRef);

    return () => ctx?.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF6F1] flex flex-col justify-between selection:bg-[#006DB6] selection:text-white">

      {/* Hero Banner with Agnes Toth directional unblur sweep & Breadcrumbs */}
      <PageHeroBanner
        title="Network"
        subtitle="From Around The Fabrics World"
        bgVideo="/videos/network-hero.mp4"
        bgVideoPoster="/images/network/network-hero-poster.webp"
        bgImage="/images/network/network-hero-poster.webp"
        bgAlt="Viral Fabrics Global Network & Export Distribution"
      />

      {/* ========================================================================= */}
      {/* GLOBAL NETWORK SHOWCASE - LUXURY SILK BACKGROUND & WORLD DISTRIBUTION MAP */}
      {/* ========================================================================= */}
      <div className="relative z-10 bg-[#FAF6F1] shadow-[0_-25px_60px_rgba(0,0,0,0.22)]">
        <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#FAF6F1] flex flex-col justify-between py-14 sm:py-18 lg:py-24">
        
        {/* Luxury Silk Fabric Canvas Background (High-res wave) */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <Image
            src="/images/network/network-silk-bg.jpg"
            alt="Viral Fabrics Luxury Silk Wave Canvas"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Main Content Layout Container */}
        <div className="relative z-10 max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 w-full flex-1 flex flex-col justify-between">
          
          {/* Top Row: Left Narrative Story + Right Interactive Route Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center pt-2 sm:pt-4 my-auto">
            
            {/* 1. Left Editorial Narrative (Clean, Prestigious Typography matching About Us) */}
            <div ref={narrativeRef} className="lg:col-span-5 xl:col-span-5 space-y-5 lg:pr-2 will-change-[transform,opacity,filter]">
              
              {/* Eyebrow Header */}
              <div className="flex items-center gap-3">
                <span className="font-sans text-[12px] sm:text-[13px] font-bold tracking-[0.28em] text-[#006DB6] uppercase">
                  OUR GLOBAL PRESENCE
                </span>
                <div className="w-12 h-[2px] bg-[#006DB6]" />
              </div>

              {/* Main Title */}
              <h2 className="font-heading font-serif text-3xl sm:text-4xl lg:text-[48px] xl:text-[54px] font-normal text-[#0A192F] tracking-tight leading-[1.12]">
                Worldwide <span className="text-[#006DB6] italic font-normal">Distribution</span>
              </h2>

              {/* Comprehensive Editorial Story Copy */}
              <div className="space-y-4 text-slate-600 font-sans text-[15px] sm:text-[16px] lg:text-[16.5px] font-normal leading-[1.8]">
                <p>
                  At <strong className="font-semibold text-[#0A192F]">Viral Fabrics</strong>, we are proud to serve clients across the globe, supplying premium export-quality fabrics to regions including Europe, America, Dubai, and beyond. Since our establishment in 2012 in Surat, Gujarat, India, we have built a strong reputation for quality, reliability, and timely delivery.
                </p>

                <p>
                  Our extensive product range—covering Polyester Dyed and Printed Fabrics, Viscose, Rayon, Cotton, and Digital Printed Fabrics—is trusted by international importers, wholesalers, and garment manufacturers. With efficient logistics, secure packaging, and strict quality control at every stage of production, we ensure that our fabrics consistently meet global standards.
                </p>

                <p className="text-slate-700 italic border-l-2 border-[#006DB6] pl-4 py-3 pr-4 text-[14px] sm:text-[15px] leading-[1.75] bg-[#006DB6]/5 rounded-r-lg">
                  This worldwide network, combined with our dedication to excellence and long-term partnerships, has made Viral Fabrics a trusted name in the international textile market.
                </p>
              </div>

            </div>

            {/* 2. Right Interactive World Route Map Showcase */}
            <div ref={mapRef} className="lg:col-span-7 xl:col-span-7 relative flex items-center justify-center will-change-[transform,opacity,filter]">
              <div 
                className="relative w-full max-w-[880px]"
                style={{ aspectRatio: '1755 / 896' }}
              >
                
                {/* High-Resolution Transparent Route Map Graphic */}
                <Image
                  src="/images/network/network-routes-map.png"
                  alt="Viral Fabrics Global Distribution Routes from Surat"
                  fill
                  priority
                  className="object-contain object-center drop-shadow-[0_8px_30px_rgba(0,109,182,0.08)] select-none pointer-events-none"
                  sizes="(max-width: 1024px) 100vw, 880px"
                />

                {/* Hotspot 1: Surat, Gujarat, India (Origin & Manufacturing Hub) */}
                <div 
                  className="absolute top-[37.7%] left-[56.8%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  onMouseEnter={() => setHoveredHotspot('surat')}
                  onMouseLeave={() => setHoveredHotspot(null)}
                >
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    {/* Calm, smooth ambient breathing radar pulse */}
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#006DB6]/30 animate-pulse" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#006DB6] ring-2 ring-white shadow-[0_0_8px_rgba(0,109,182,0.8)]" />
                  </span>

                  {hoveredHotspot === 'surat' && (
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[#0A192F]/95 backdrop-blur-md text-white text-[11px] font-medium py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none border border-sky-400/20">
                      <span className="font-bold text-sky-400">Origin: Surat, Gujarat</span>
                      <br />Manufacturing Looms &amp; Headquarters
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0A192F]" />
                    </div>
                  )}
                </div>

                {/* Hotspot 2: Dubai / GCC Region */}
                <div 
                  className="absolute top-[29.2%] left-[58.0%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  onMouseEnter={() => setHoveredHotspot('dubai')}
                  onMouseLeave={() => setHoveredHotspot(null)}
                >
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006DB6] ring-2 ring-white/90 shadow-xs group-hover:scale-125 transition-transform duration-300" />
                  </span>

                  {hoveredHotspot === 'dubai' && (
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#0A192F]/95 backdrop-blur-md text-white text-[11px] font-medium py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none border border-sky-400/20">
                      <span className="font-bold text-sky-400">Dubai Hub</span>: 5–7 Days Maritime Transit
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0A192F]" />
                    </div>
                  )}
                </div>

                {/* Hotspot 3: Europe */}
                <div 
                  className="absolute top-[24.9%] left-[52.4%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  onMouseEnter={() => setHoveredHotspot('europe')}
                  onMouseLeave={() => setHoveredHotspot(null)}
                >
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006DB6] ring-2 ring-white/90 shadow-xs group-hover:scale-125 transition-transform duration-300" />
                  </span>

                  {hoveredHotspot === 'europe' && (
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#0A192F]/95 backdrop-blur-md text-white text-[11px] font-medium py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none border border-sky-400/20">
                      <span className="font-bold text-sky-400">Europe &amp; UK</span>: High Street Fashion Supply
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0A192F]" />
                    </div>
                  )}
                </div>

                {/* Hotspot 4: America */}
                <div 
                  className="absolute top-[38.3%] left-[19.3%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  onMouseEnter={() => setHoveredHotspot('america')}
                  onMouseLeave={() => setHoveredHotspot(null)}
                >
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006DB6] ring-2 ring-white/90 shadow-xs group-hover:scale-125 transition-transform duration-300" />
                  </span>

                  {hoveredHotspot === 'america' && (
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#0A192F]/95 backdrop-blur-md text-white text-[11px] font-medium py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none border border-sky-400/20">
                      <span className="font-bold text-sky-400">The Americas</span>: Container Imports &amp; Apparel
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0A192F]" />
                    </div>
                  )}
                </div>

                {/* Hotspot 5: Sri Lanka */}
                <div 
                  className="absolute top-[66.3%] left-[71.3%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  onMouseEnter={() => setHoveredHotspot('srilanka')}
                  onMouseLeave={() => setHoveredHotspot(null)}
                >
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006DB6] ring-2 ring-white/90 shadow-xs group-hover:scale-125 transition-transform duration-300" />
                  </span>

                  {hoveredHotspot === 'srilanka' && (
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#0A192F]/95 backdrop-blur-md text-white text-[11px] font-medium py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none border border-sky-400/20">
                      <span className="font-bold text-sky-400">Sri Lanka</span>: Garment Manufacturing Supply
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0A192F]" />
                    </div>
                  )}
                </div>

                {/* Hotspot 6: Australia */}
                <div 
                  className="absolute top-[79.4%] left-[87.7%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  onMouseEnter={() => setHoveredHotspot('australia')}
                  onMouseLeave={() => setHoveredHotspot(null)}
                >
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006DB6] ring-2 ring-white/90 shadow-xs group-hover:scale-125 transition-transform duration-300" />
                  </span>

                  {hoveredHotspot === 'australia' && (
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#0A192F]/95 backdrop-blur-md text-white text-[11px] font-medium py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none border border-sky-400/20">
                      <span className="font-bold text-sky-400">Australia Hub</span>: Sydney &amp; Melbourne
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0A192F]" />
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>

          {/* 3. Bottom Refined Credentials Glassmorphic Floating Bar */}
          <div ref={pillarsRef} className="mt-10 lg:mt-14 w-full will-change-[transform,opacity,filter]">
            <div className="bg-white/85 backdrop-blur-md border border-white/90 rounded-[22px] sm:rounded-[26px] shadow-[0_12px_36px_rgba(10,25,47,0.06)] px-6 sm:px-10 py-5 sm:py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-slate-200/70">
                
                {/* Pillar 1: Since 2012 */}
                <div className="flex items-center gap-4 pt-2 sm:pt-0 lg:px-5 first:lg:pl-0 group cursor-default">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-[#EBF3FC] border border-[#D0E2F7] flex items-center justify-center text-[#006DB6] shrink-0 group-hover:bg-[#006DB6] group-hover:text-white transition-all duration-300 shadow-xs">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading font-serif text-[16px] sm:text-[17px] font-bold text-[#0A192F] tracking-tight leading-snug">
                      Since 2012
                    </h4>
                    <p className="text-slate-600 text-[13px] sm:text-[13.5px] font-normal leading-relaxed mt-1">
                      Surat, Gujarat, India
                    </p>
                  </div>
                </div>

                {/* Pillar 2: Wide Product Range */}
                <div className="flex items-center gap-4 pt-4 sm:pt-0 lg:px-5 group cursor-default">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-[#EBF3FC] border border-[#D0E2F7] flex items-center justify-center text-[#006DB6] shrink-0 group-hover:bg-[#006DB6] group-hover:text-white transition-all duration-300 shadow-xs">
                    <Layers className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading font-serif text-[16px] sm:text-[17px] font-bold text-[#0A192F] tracking-tight leading-snug">
                      Wide Product Range
                    </h4>
                    <p className="text-slate-600 text-[13px] sm:text-[13.5px] font-normal leading-relaxed mt-1">
                      Polyester, Viscose, Rayon, Cotton &amp; More
                    </p>
                  </div>
                </div>

                {/* Pillar 3: Global Markets */}
                <div className="flex items-center gap-4 pt-4 sm:pt-0 lg:px-5 group cursor-default">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-[#EBF3FC] border border-[#D0E2F7] flex items-center justify-center text-[#006DB6] shrink-0 group-hover:bg-[#006DB6] group-hover:text-white transition-all duration-300 shadow-xs">
                    <Globe2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading font-serif text-[16px] sm:text-[17px] font-bold text-[#0A192F] tracking-tight leading-snug">
                      Global Markets
                    </h4>
                    <p className="text-slate-600 text-[13px] sm:text-[13.5px] font-normal leading-relaxed mt-1">
                      Europe, America, Dubai &amp; Beyond
                    </p>
                  </div>
                </div>

                {/* Pillar 4: Long-Term Partnerships */}
                <div className="flex items-center gap-4 pt-4 sm:pt-0 lg:px-5 last:lg:pr-0 group cursor-default">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-[#EBF3FC] border border-[#D0E2F7] flex items-center justify-center text-[#006DB6] shrink-0 group-hover:bg-[#006DB6] group-hover:text-white transition-all duration-300 shadow-xs">
                    <Users2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-heading font-serif text-[16px] sm:text-[17px] font-bold text-[#0A192F] tracking-tight leading-snug">
                      Long-Term Partnerships
                    </h4>
                    <p className="text-slate-600 text-[13px] sm:text-[13.5px] font-normal leading-relaxed mt-1">
                      With Importers &amp; Garment Manufacturers
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </section>
      </div>

    </div>
  );
}
