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
    <div className="min-h-screen bg-[#FAF4F0] flex flex-col justify-between selection:bg-[#006DB6] selection:text-white">

      {/* Hero Banner with Agnes Toth directional unblur sweep & Breadcrumbs */}
      <PageHeroBanner
        title="Network"
        subtitle="From Around The Fabrics World"
        bgAlt="Viral Fabrics Global Network & Export Distribution"
      />

      {/* ========================================================================= */}
      {/* GLOBAL NETWORK SHOWCASE - LUXURY SILK BACKGROUND & WORLD DISTRIBUTION MAP */}
      {/* ========================================================================= */}
      <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#FAF4F0] flex flex-col justify-between py-12 sm:py-16 lg:py-20">
        
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
        <div className="relative z-10 max-w-[1560px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 w-full flex-1 flex flex-col justify-between">
          
          {/* Top Row: Left Narrative Story + Right Interactive Route Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center pt-2 sm:pt-4 my-auto">
            
            {/* 1. Left Editorial Narrative (Clean, Prestigious Typography, Zero Tag Clutter) */}
            <div ref={narrativeRef} className="lg:col-span-5 xl:col-span-5 space-y-4 lg:pr-2 will-change-[transform,opacity,filter]">
              
              {/* Eyebrow Header */}
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.24em] text-[#006DB6] uppercase font-sans">
                  OUR GLOBAL PRESENCE
                </span>
                <span className="w-10 sm:w-12 h-[1.5px] bg-[#006DB6]/60 inline-block" />
              </div>

              {/* Main Title */}
              <h2 className="font-heading font-serif text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-bold text-[#0A192F] tracking-tight leading-[1.08]">
                Worldwide Distribution
              </h2>

              {/* Comprehensive Editorial Story Copy */}
              <div className="space-y-3.5 text-[#334155] text-[13.5px] sm:text-[14px] lg:text-[14.5px] leading-[1.72] font-normal">
                <p>
                  At <strong className="font-semibold text-[#0A192F]">Viral Fabrics</strong>, we are proud to serve clients across the globe, supplying premium export-quality fabrics to regions including Europe, America, Dubai, and beyond. Since our establishment in 2012 in Surat, Gujarat, India, we have built a strong reputation for quality, reliability, and timely delivery.
                </p>

                <p>
                  Our extensive product range—covering Polyester Dyed and Printed Fabrics, Viscose, Rayon, Cotton, and Digital Printed Fabrics—is trusted by international importers, wholesalers, and garment manufacturers. With efficient logistics, secure packaging, and strict quality control at every stage of production, we ensure that our fabrics consistently meet global standards.
                </p>

                <p className="text-slate-700 italic border-l-2 border-[#006DB6] pl-3.5 pt-0.5 text-[12.5px] sm:text-[13px] leading-relaxed bg-[#006DB6]/5 py-2 pr-3 rounded-r-md">
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
          <div ref={pillarsRef} className="mt-8 lg:mt-10 w-full pt-4 will-change-[transform,opacity,filter]">
            <div className="bg-white/75 backdrop-blur-md border border-white/90 rounded-2xl shadow-[0_8px_30px_rgba(10,25,47,0.04)] px-5 sm:px-8 py-4 sm:py-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-slate-200/70">
                
                {/* Pillar 1: Since 2012 */}
                <div className="flex items-center gap-3 pt-2 sm:pt-0 lg:px-4 first:lg:pl-0 group cursor-default">
                  <div className="w-9 h-9 rounded-full bg-[#006DB6]/10 border border-[#006DB6]/20 flex items-center justify-center text-[#006DB6] flex-shrink-0 group-hover:bg-[#006DB6] group-hover:text-white transition-all duration-300">
                    <Calendar className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <div>
                    <h4 className="font-heading font-serif text-[14.5px] sm:text-[15px] font-bold text-[#0A192F] tracking-tight leading-tight">
                      Since 2012
                    </h4>
                    <p className="text-slate-600 text-[11.5px] sm:text-[12px] font-normal leading-snug mt-0.5">
                      Surat, Gujarat, India
                    </p>
                  </div>
                </div>

                {/* Pillar 2: Wide Product Range */}
                <div className="flex items-center gap-3 pt-3 sm:pt-0 lg:px-4 group cursor-default">
                  <div className="w-9 h-9 rounded-full bg-[#006DB6]/10 border border-[#006DB6]/20 flex items-center justify-center text-[#006DB6] flex-shrink-0 group-hover:bg-[#006DB6] group-hover:text-white transition-all duration-300">
                    <Layers className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <div>
                    <h4 className="font-heading font-serif text-[14.5px] sm:text-[15px] font-bold text-[#0A192F] tracking-tight leading-tight">
                      Wide Product Range
                    </h4>
                    <p className="text-slate-600 text-[11.5px] sm:text-[12px] font-normal leading-snug mt-0.5">
                      Polyester, Viscose, Rayon, Cotton &amp; More
                    </p>
                  </div>
                </div>

                {/* Pillar 3: Global Markets */}
                <div className="flex items-center gap-3 pt-3 sm:pt-0 lg:px-4 group cursor-default">
                  <div className="w-9 h-9 rounded-full bg-[#006DB6]/10 border border-[#006DB6]/20 flex items-center justify-center text-[#006DB6] flex-shrink-0 group-hover:bg-[#006DB6] group-hover:text-white transition-all duration-300">
                    <Globe2 className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <div>
                    <h4 className="font-heading font-serif text-[14.5px] sm:text-[15px] font-bold text-[#0A192F] tracking-tight leading-tight">
                      Global Markets
                    </h4>
                    <p className="text-slate-600 text-[11.5px] sm:text-[12px] font-normal leading-snug mt-0.5">
                      Europe, America, Dubai &amp; Beyond
                    </p>
                  </div>
                </div>

                {/* Pillar 4: Long-Term Partnerships */}
                <div className="flex items-center gap-3 pt-3 sm:pt-0 lg:px-4 last:lg:pr-0 group cursor-default">
                  <div className="w-9 h-9 rounded-full bg-[#006DB6]/10 border border-[#006DB6]/20 flex items-center justify-center text-[#006DB6] flex-shrink-0 group-hover:bg-[#006DB6] group-hover:text-white transition-all duration-300">
                    <Users2 className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <div>
                    <h4 className="font-heading font-serif text-[14.5px] sm:text-[15px] font-bold text-[#0A192F] tracking-tight leading-tight">
                      Long-Term Partnerships
                    </h4>
                    <p className="text-slate-600 text-[11.5px] sm:text-[12px] font-normal leading-snug mt-0.5">
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
  );
}
