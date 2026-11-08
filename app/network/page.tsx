'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Globe,
  ShieldCheck,
  Package,
  Truck,
  Calendar,
  Layers,
  Handshake,
} from 'lucide-react';

export default function NetworkPage() {
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF4F0] flex flex-col justify-center">

      {/* ========================================================================= */}
      {/* GLOBAL NETWORK SHOWCASE BANNER - LUXURY SILK & WORLD ROUTES MAP           */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#FAF4F0] min-h-[640px] sm:min-h-[680px] lg:min-h-[720px] xl:min-h-[760px] flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12">
        
        {/* Luxury Silk Fabric Canvas Background (1024x522 native ratio) */}
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
        <div className="relative z-10 max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-16 w-full flex-1 flex flex-col justify-between">
          
          {/* Top Section: Left Editorial + Right World Route Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center pt-2 sm:pt-4">
            
            {/* 1. Left Editorial Column (Minimalist, High Readability) */}
            <div className="lg:col-span-5 xl:col-span-5 space-y-5 lg:pr-2">
              
              {/* Eyebrow Header */}
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.24em] text-[#006DB6] uppercase font-sans">
                  OUR GLOBAL PRESENCE
                </span>
                <span className="w-10 sm:w-12 h-[1px] bg-[#006DB6]/40 inline-block" />
              </div>

              {/* Main Title */}
              <h1 className="font-heading font-serif text-5xl sm:text-6xl lg:text-[68px] xl:text-[74px] font-bold text-[#0A192F] tracking-tight leading-[1.02]">
                Network
              </h1>

              {/* Descriptive Paragraph */}
              <p className="text-[#334155] text-[14px] sm:text-[15px] lg:text-[15.5px] leading-relaxed font-normal max-w-xl">
                At <strong className="font-semibold text-[#0A192F]">Viral Fabrics</strong>, we are proud to serve clients across the globe, supplying premium export-quality fabrics to regions including Europe, America, Dubai, and beyond. With efficient logistics, secure packaging, and strict quality control, we ensure our fabrics consistently meet global standards.
              </p>

              {/* 4 Minimalist Trust Feature Badges (No chunky square boxes, clean & readable) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-3 border-t border-slate-300/40">
                
                {/* Feature 1: Global Client Base */}
                <div className="flex items-center gap-2.5 group cursor-default">
                  <div className="w-8 h-8 rounded-full bg-white/90 border border-slate-200/70 shadow-xs flex items-center justify-center text-[#006DB6] group-hover:bg-[#006DB6] group-hover:text-white transition-all duration-300 shrink-0">
                    <Globe className="w-4 h-4 stroke-[1.6]" />
                  </div>
                  <span className="text-[12px] sm:text-[12.5px] font-semibold text-[#0A192F] leading-snug">
                    Global Client Base
                  </span>
                </div>

                {/* Feature 2: Consistent Quality */}
                <div className="flex items-center gap-2.5 group cursor-default">
                  <div className="w-8 h-8 rounded-full bg-white/90 border border-slate-200/70 shadow-xs flex items-center justify-center text-[#006DB6] group-hover:bg-[#006DB6] group-hover:text-white transition-all duration-300 shrink-0">
                    <ShieldCheck className="w-4 h-4 stroke-[1.6]" />
                  </div>
                  <span className="text-[12px] sm:text-[12.5px] font-semibold text-[#0A192F] leading-snug">
                    Consistent Quality
                  </span>
                </div>

                {/* Feature 3: Secure Packaging */}
                <div className="flex items-center gap-2.5 group cursor-default">
                  <div className="w-8 h-8 rounded-full bg-white/90 border border-slate-200/70 shadow-xs flex items-center justify-center text-[#006DB6] group-hover:bg-[#006DB6] group-hover:text-white transition-all duration-300 shrink-0">
                    <Package className="w-4 h-4 stroke-[1.6]" />
                  </div>
                  <span className="text-[12px] sm:text-[12.5px] font-semibold text-[#0A192F] leading-snug">
                    Secure Packaging
                  </span>
                </div>

                {/* Feature 4: Timely Delivery */}
                <div className="flex items-center gap-2.5 group cursor-default">
                  <div className="w-8 h-8 rounded-full bg-white/90 border border-slate-200/70 shadow-xs flex items-center justify-center text-[#006DB6] group-hover:bg-[#006DB6] group-hover:text-white transition-all duration-300 shrink-0">
                    <Truck className="w-4 h-4 stroke-[1.6]" />
                  </div>
                  <span className="text-[12px] sm:text-[12.5px] font-semibold text-[#0A192F] leading-snug">
                    Timely Delivery
                  </span>
                </div>

              </div>

            </div>

            {/* 2. Right World Route Map Showcase */}
            <div className="lg:col-span-7 xl:col-span-7 relative flex items-center justify-center">
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

                {/* Interactive Hotspot 1: Surat, Gujarat, India (Origin & Manufacturing Hub) */}
                <div 
                  className="absolute top-[37.7%] left-[56.8%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  onMouseEnter={() => setHoveredHotspot('surat')}
                  onMouseLeave={() => setHoveredHotspot(null)}
                >
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    {/* Calm, smooth ambient breathing radar pulse (NO harsh pinging) */}
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#006DB6]/25 animate-pulse" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#006DB6] ring-2 ring-white/95 shadow-[0_0_8px_rgba(0,109,182,0.8)]" />
                  </span>

                  {hoveredHotspot === 'surat' && (
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[#0A192F]/95 backdrop-blur-md text-white text-[11px] font-medium py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none border border-sky-400/20">
                      <span className="font-bold text-sky-400">Origin: Surat, Gujarat</span>
                      <br />Manufacturing Headquarter &amp; Looms
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0A192F]" />
                    </div>
                  )}
                </div>

                {/* Interactive Hotspot 2: Dubai / GCC Region */}
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
                      <span className="font-bold text-sky-400">Dubai Hub</span>: 5–7 Days Maritime
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0A192F]" />
                    </div>
                  )}
                </div>

                {/* Interactive Hotspot 3: Europe */}
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
                      <span className="font-bold text-sky-400">Europe &amp; UK</span>: High Street Fashion
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0A192F]" />
                    </div>
                  )}
                </div>

                {/* Interactive Hotspot 4: America */}
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
                      <span className="font-bold text-sky-400">The Americas</span>: Container Imports
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0A192F]" />
                    </div>
                  )}
                </div>

                {/* Interactive Hotspot 5: Sri Lanka */}
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
                      <span className="font-bold text-sky-400">Sri Lanka</span>: Garment Hub Supply
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0A192F]" />
                    </div>
                  )}
                </div>

                {/* Interactive Hotspot 6: Australia */}
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

          {/* 3. Bottom Minimalist Stats Showcase (NO heavy card shell or awkward rounded card corners) */}
          <div className="mt-8 lg:mt-10 w-full pt-6 sm:pt-7 border-t border-slate-300/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-slate-300/40">
              
              {/* Stat 1: Since 2012 */}
              <div className="flex items-center gap-3.5 pt-3 sm:pt-0 lg:px-4 first:lg:pl-0 group">
                <div className="w-9 h-9 rounded-full bg-white/90 border border-slate-200/70 shadow-xs flex items-center justify-center text-[#006DB6] flex-shrink-0 group-hover:bg-[#006DB6] group-hover:text-white transition-all duration-300">
                  <Calendar className="w-4 h-4 stroke-[1.6]" />
                </div>
                <div>
                  <h4 className="font-heading font-serif text-[15.5px] sm:text-[16.5px] font-bold text-[#0A192F] tracking-tight leading-tight">
                    Since 2012
                  </h4>
                  <p className="text-slate-600 text-[12px] sm:text-[12.5px] font-normal leading-snug mt-0.5">
                    Surat, Gujarat, India
                  </p>
                </div>
              </div>

              {/* Stat 2: Wide Product Range */}
              <div className="flex items-center gap-3.5 pt-3 sm:pt-0 lg:px-4 group">
                <div className="w-9 h-9 rounded-full bg-white/90 border border-slate-200/70 shadow-xs flex items-center justify-center text-[#006DB6] flex-shrink-0 group-hover:bg-[#006DB6] group-hover:text-white transition-all duration-300">
                  <Layers className="w-4 h-4 stroke-[1.6]" />
                </div>
                <div>
                  <h4 className="font-heading font-serif text-[15.5px] sm:text-[16.5px] font-bold text-[#0A192F] tracking-tight leading-tight">
                    Wide Product Range
                  </h4>
                  <p className="text-slate-600 text-[12px] sm:text-[12.5px] font-normal leading-snug mt-0.5">
                    Polyester, Viscose, Rayon, Cotton &amp; More
                  </p>
                </div>
              </div>

              {/* Stat 3: Global Markets */}
              <div className="flex items-center gap-3.5 pt-3 sm:pt-0 lg:px-4 group">
                <div className="w-9 h-9 rounded-full bg-white/90 border border-slate-200/70 shadow-xs flex items-center justify-center text-[#006DB6] flex-shrink-0 group-hover:bg-[#006DB6] group-hover:text-white transition-all duration-300">
                  <Globe className="w-4 h-4 stroke-[1.6]" />
                </div>
                <div>
                  <h4 className="font-heading font-serif text-[15.5px] sm:text-[16.5px] font-bold text-[#0A192F] tracking-tight leading-tight">
                    Global Markets
                  </h4>
                  <p className="text-slate-600 text-[12px] sm:text-[12.5px] font-normal leading-snug mt-0.5">
                    Europe, America, Dubai &amp; Beyond
                  </p>
                </div>
              </div>

              {/* Stat 4: Long-Term Partnerships */}
              <div className="flex items-center gap-3.5 pt-3 sm:pt-0 lg:px-4 last:lg:pr-0 group">
                <div className="w-9 h-9 rounded-full bg-white/90 border border-slate-200/70 shadow-xs flex items-center justify-center text-[#006DB6] flex-shrink-0 group-hover:bg-[#006DB6] group-hover:text-white transition-all duration-300">
                  <Handshake className="w-4 h-4 stroke-[1.6]" />
                </div>
                <div>
                  <h4 className="font-heading font-serif text-[15.5px] sm:text-[16.5px] font-bold text-[#0A192F] tracking-tight leading-tight">
                    Long-Term Partnerships
                  </h4>
                  <p className="text-slate-600 text-[12px] sm:text-[12.5px] font-normal leading-snug mt-0.5">
                    With Importers &amp; Garment Manufacturers
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </section>

    </div>
  );
}
