import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getPublishedFabrics } from '@/lib/fabricsService';
import { ArrowRight, Layers, Sparkles, Home, Gauge, Building2, Globe } from 'lucide-react';

export const revalidate = 10; // Incremental Static Regeneration every 10s

export const metadata: Metadata = {
  title: 'Fabrics Portfolio | Viral Fabrics Surat - Export Synthetic Textiles',
  description: 'Explore the complete export-grade synthetic fabrics catalog produced by Viral Fabrics in Surat, Gujarat. BSY, Satin, Chiffon, Georgette, Crepe, Recycled PET, and Poly Dobby.',
};

export default async function FabricsPage() {
  const fabrics = await getPublishedFabrics();

  return (
    <div className="min-h-screen bg-white">
      
      {/* =====================================================================
          1. TOP HERO BANNER (Compact & Minimalist - Exact 1:1 Match)
         ===================================================================== */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 flex items-center overflow-hidden bg-[#0A192F]">
        
        {/* Banner Graphic: Preserving fabric collection banner with luxury scrim */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src="/assets/uploads/2025/09/bsy-fabrics-banner.png"
            alt="Fabrics Portfolio - Viral Fabrics"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Subtle scrims for contrast of transparent navbar links */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#061426]/90 via-[#061426]/60 to-black/35 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#061426]/75 via-[#061426]/20 to-transparent pointer-events-none" />
        </div>

        {/* Content Aligned with Main Container */}
        <div className="relative z-10 w-full max-w-[1440px] xl:max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl text-white">
            
            {/* Title with Vertical Blue Accent Bar */}
            <div className="flex items-start gap-3 sm:gap-3.5">
              <div className="w-[3.5px] sm:w-1 h-9 sm:h-11 bg-[#0084D1] rounded-full flex-shrink-0 mt-0.5 shadow-[0_0_10px_rgba(0,132,209,0.7)]" />
              <div className="space-y-0.5 sm:space-y-1">
                <h1 className="font-heading font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-white tracking-tight leading-none drop-shadow-sm">
                  Fabrics Portfolio
                </h1>
                <p className="font-sans text-[12.5px] sm:text-[13.5px] text-white/90 font-light tracking-wide drop-shadow-sm">
                  From Around The Fabrics World
                </p>
              </div>
            </div>

            {/* 3 Trust Badges with Dividers */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 sm:mt-5 text-[11.5px] sm:text-[12.5px] font-sans font-medium text-white/90">
              <div className="flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-white stroke-[2.2]" />
                <span>Quick Response</span>
              </div>
              <span className="text-white/30 select-none text-xs">|</span>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-white stroke-[2.2]" />
                <span>Surat Textile Hub</span>
              </div>
              <span className="text-white/30 select-none text-xs">|</span>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-white stroke-[2.2]" />
                <span>Global Export Desk</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* =====================================================================
          2. MINIMALIST BREADCRUMBS BAR (Home > Fabrics)
         ===================================================================== */}
      <div className="bg-white border-b border-slate-200/70 py-2 sm:py-2.5 shadow-sm">
        <div className="max-w-[1440px] xl:max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 text-left">
          <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1.5 sm:gap-2 text-[12px] sm:text-[12.5px] font-sans">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-[#006DB6] hover:text-[#0A192F] transition-colors font-medium tracking-wide"
            >
              <Home className="w-3.5 h-3.5 fill-[#006DB6] text-[#006DB6]" />
              <span>Home</span>
            </Link>
            <span className="text-slate-400 select-none text-[11px]">&gt;</span>
            <span className="text-[#006DB6] font-medium tracking-wide" aria-current="page">
              Fabrics
            </span>
          </nav>
        </div>
      </div>

      {/* 2. FABRICS CATALOG GRID */}
      <section className="py-24 sm:py-32 bg-white relative">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/80">
            <div className="space-y-3">
              <span className="agnes-eyebrow">
                High-Speed Water-Jet Weaves
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl font-light text-brand-ink tracking-tight">
                All Synthetic Qualities
              </h2>
            </div>
            
            <p className="text-slate-500 text-[14px] sm:text-[15px] max-w-md font-light leading-relaxed">
              Available in solid dyed, rotary print, or digital print forms. Customized GSM and widths available on make-to-order basis.
            </p>
          </div>

          {/* Dynamic Fabric Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {fabrics.map((fabric) => (
              <Link 
                key={fabric.slug}
                href={`/fabrics/${fabric.slug}`}
                className="group flex flex-col bg-slate-50/50 rounded-sm overflow-hidden border border-slate-200/70 transition-all duration-500 hover:shadow-2xl hover:border-slate-300"
              >
                {/* Fabric Image Container with Zoom */}
                <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                  <Image
                    src={fabric.image}
                    alt={fabric.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-agnes group-hover:scale-105"
                  />
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="bg-white/95 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold tracking-luxury uppercase text-slate-800 shadow-sm border border-black/[0.04]">
                      Export Grade
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow justify-between space-y-5">
                  <div className="space-y-2.5">
                    <h3 className="font-heading text-2xl sm:text-3xl font-normal text-brand-ink group-hover:text-brand-blue transition-colors">
                      {fabric.name}
                    </h3>
                    <p className="text-[14px] text-slate-600 line-clamp-3 leading-relaxed font-light">
                      {fabric.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-brand-blue">
                    <span className="agnes-textlink text-[11px]">
                      View Fabric Details
                    </span>
                    <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>

              </Link>
            ))}
          </div>

          {/* Sampling Prompt Banner */}
          <div className="bg-[#FAF8F5] border border-slate-200/80 p-8 sm:p-12 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-heading text-2xl sm:text-3xl text-brand-ink font-light">
                Need a Custom Weave or Specific GSM?
              </h3>
              <p className="text-slate-600 text-[14px] font-light max-w-xl">
                Our Surat loom shed develops customized weave constructions and lab-dip color shades tailored to your tech pack.
              </p>
            </div>
            <Link
              href="/enquiry"
              className="agnes-btn agnes-btn--primary !min-h-[3rem] !px-8 text-[11px] whitespace-nowrap"
            >
              Request Custom Sample
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
