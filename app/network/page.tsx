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
  Users,
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center pt-2 sm:pt-4">
            
            {/* 1. Left Editorial Column */}
            <div className="lg:col-span-5 xl:col-span-5 space-y-5 lg:pr-2">
              
              {/* Eyebrow Header */}
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.22em] text-[#006DB6] uppercase font-sans">
                  OUR GLOBAL PRESENCE
                </span>
                <span className="w-10 sm:w-12 h-[2px] bg-[#006DB6] inline-block rounded-full" />
              </div>

              {/* Main Title */}
              <h1 className="font-heading font-serif text-5xl sm:text-6xl lg:text-[70px] xl:text-[76px] font-normal text-[#0A192F] tracking-tight leading-[1.02]">
                Network
              </h1>

              {/* Descriptive Paragraph */}
              <p className="text-[#334155] text-[14px] sm:text-[15px] lg:text-[15.5px] leading-relaxed font-normal max-w-xl">
                At <strong className="font-semibold text-[#0A192F]">Viral Fabrics</strong>, we are proud to serve clients across the globe, supplying premium export-quality fabrics to regions including Europe, America, Dubai, and beyond. With efficient logistics, secure packaging, and strict quality control, we ensure our fabrics consistently meet global standards.
              </p>

              {/* 4 Trust Feature Badges */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg pt-3">
                
                {/* Badge 1: Global Client Base */}
                <div className="flex flex-col items-center text-center group cursor-default">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-2xl bg-[#E0F2FE]/85 border border-[#BAE6FD] shadow-[0_2px_10px_rgba(0,109,182,0.08)] flex items-center justify-center text-[#006DB6] mb-2.5 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#006DB6] group-hover:text-white group-hover:shadow-md">
                    <Globe className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                  </div>
                  <span className="text-[11px] sm:text-[12px] font-bold text-[#0A192F] leading-tight group-hover:text-[#006DB6] transition-colors">
                    Global<br />Client Base
                  </span>
                </div>

                {/* Badge 2: Consistent Quality */}
                <div className="flex flex-col items-center text-center group cursor-default">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-2xl bg-[#E0F2FE]/85 border border-[#BAE6FD] shadow-[0_2px_10px_rgba(0,109,182,0.08)] flex items-center justify-center text-[#006DB6] mb-2.5 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#006DB6] group-hover:text-white group-hover:shadow-md">
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                  </div>
                  <span className="text-[11px] sm:text-[12px] font-bold text-[#0A192F] leading-tight group-hover:text-[#006DB6] transition-colors">
                    Consistent<br />Quality
                  </span>
                </div>

                {/* Badge 3: Secure Packaging */}
                <div className="flex flex-col items-center text-center group cursor-default">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-2xl bg-[#E0F2FE]/85 border border-[#BAE6FD] shadow-[0_2px_10px_rgba(0,109,182,0.08)] flex items-center justify-center text-[#006DB6] mb-2.5 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#006DB6] group-hover:text-white group-hover:shadow-md">
                    <Package className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                  </div>
                  <span className="text-[11px] sm:text-[12px] font-bold text-[#0A192F] leading-tight group-hover:text-[#006DB6] transition-colors">
                    Secure<br />Packaging
                  </span>
                </div>

                {/* Badge 4: Timely Delivery */}
                <div className="flex flex-col items-center text-center group cursor-default">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-2xl bg-[#E0F2FE]/85 border border-[#BAE6FD] shadow-[0_2px_10px_rgba(0,109,182,0.08)] flex items-center justify-center text-[#006DB6] mb-2.5 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#006DB6] group-hover:text-white group-hover:shadow-md">
                    <Truck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                  </div>
                  <span className="text-[11px] sm:text-[12px] font-bold text-[#0A192F] leading-tight group-hover:text-[#006DB6] transition-colors">
                    Timely<br />Delivery
                  </span>
                </div>

              </div>

            </div>

            {/* 2. Right World Route Map Showcase */}
            <div className="lg:col-span-7 xl:col-span-7 relative flex items-center justify-center">
              <div className="relative w-full aspect-[16/9] sm:aspect-[1.95/1] max-w-[880px]">
                
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
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006DB6] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#006DB6] shadow-[0_0_8px_rgba(0,109,182,0.8)]" />
                  </span>

                  {hoveredHotspot === 'surat' && (
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[#0A192F] text-white text-[11px] font-medium py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none animate-fade-in">
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
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500 shadow-sm" />
                  </span>

                  {hoveredHotspot === 'dubai' && (
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#0A192F] text-white text-[11px] font-medium py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none animate-fade-in">
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
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500 shadow-sm" />
                  </span>

                  {hoveredHotspot === 'europe' && (
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#0A192F] text-white text-[11px] font-medium py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none animate-fade-in">
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
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500 shadow-sm" />
                  </span>

                  {hoveredHotspot === 'america' && (
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#0A192F] text-white text-[11px] font-medium py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none animate-fade-in">
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
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500 shadow-sm" />
                  </span>

                  {hoveredHotspot === 'srilanka' && (
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#0A192F] text-white text-[11px] font-medium py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none animate-fade-in">
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
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500 shadow-sm" />
                  </span>

                  {hoveredHotspot === 'australia' && (
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#0A192F] text-white text-[11px] font-medium py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none animate-fade-in">
                      <span className="font-bold text-sky-400">Australia Hub</span>: Sydney &amp; Melbourne
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0A192F]" />
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>

          {/* 3. Bottom Floating Translucent Glass Stats Bar */}
          <div className="mt-8 lg:mt-10 w-full bg-white/96 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/90 shadow-[0_15px_45px_rgba(0,109,182,0.08)] px-5 sm:px-8 py-5 sm:py-6 transition-all duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-slate-200/80">
              
              {/* Stat 1: Since 2012 */}
              <div className="flex items-center gap-3.5 pt-3 sm:pt-0 lg:px-4 first:lg:pl-0">
                <div className="w-10 h-10 rounded-xl bg-[#006DB6]/10 flex items-center justify-center text-[#006DB6] flex-shrink-0">
                  <Calendar className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-heading font-serif text-[16px] sm:text-[17px] font-bold text-[#0A192F] tracking-tight leading-tight">
                    Since 2012
                  </h4>
                  <p className="text-slate-500 text-[12px] sm:text-[12.5px] font-normal leading-snug mt-0.5">
                    Surat, Gujarat, India
                  </p>
                </div>
              </div>

              {/* Stat 2: Wide Product Range */}
              <div className="flex items-center gap-3.5 pt-3 sm:pt-0 lg:px-4">
                <div className="w-10 h-10 rounded-xl bg-[#006DB6]/10 flex items-center justify-center text-[#006DB6] flex-shrink-0">
                  <Layers className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-heading font-serif text-[16px] sm:text-[17px] font-bold text-[#0A192F] tracking-tight leading-tight">
                    Wide Product Range
                  </h4>
                  <p className="text-slate-500 text-[12px] sm:text-[12.5px] font-normal leading-snug mt-0.5">
                    Polyester, Viscose, Rayon, Cotton &amp; More
                  </p>
                </div>
              </div>

              {/* Stat 3: Global Markets */}
              <div className="flex items-center gap-3.5 pt-3 sm:pt-0 lg:px-4">
                <div className="w-10 h-10 rounded-xl bg-[#006DB6]/10 flex items-center justify-center text-[#006DB6] flex-shrink-0">
                  <Users className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-heading font-serif text-[16px] sm:text-[17px] font-bold text-[#0A192F] tracking-tight leading-tight">
                    Global Markets
                  </h4>
                  <p className="text-slate-500 text-[12px] sm:text-[12.5px] font-normal leading-snug mt-0.5">
                    Europe, America, Dubai &amp; Beyond
                  </p>
                </div>
              </div>

              {/* Stat 4: Long-Term Partnerships */}
              <div className="flex items-center gap-3.5 pt-3 sm:pt-0 lg:px-4 last:lg:pr-0">
                <div className="w-10 h-10 rounded-xl bg-[#006DB6]/10 flex items-center justify-center text-[#006DB6] flex-shrink-0">
                  <Handshake className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-heading font-serif text-[16px] sm:text-[17px] font-bold text-[#0A192F] tracking-tight leading-tight">
                    Long-Term Partnerships
                  </h4>
                  <p className="text-slate-500 text-[12px] sm:text-[12.5px] font-normal leading-snug mt-0.5">
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
