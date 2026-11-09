import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCatalogFabrics } from '@/lib/fabricsService';
import { ArrowRight } from 'lucide-react';
import { PageHeroBanner } from '@/components/PageHeroBanner';
import { FabricsCatalogClient } from '@/components/FabricsCatalogClient';

export const revalidate = 10; // Incremental Static Regeneration every 10s
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Fabrics Portfolio | Viral Fabrics Surat - Export Synthetic Textiles',
  description:
    'Explore the complete export-grade synthetic fabrics catalog produced by Viral Fabrics in Surat, Gujarat. BSY, Satin, Chiffon, Georgette, Crepe, Recycled PET, and Poly Dobby.',
  alternates: {
    canonical: 'https://viralfabrics.com/fabrics',
  },
  openGraph: {
    title: 'Fabrics Portfolio | Viral Fabrics Surat - Export Synthetic Textiles',
    description: 'BSY, Satin, Chiffon, Georgette, Crepe, Recycled PET, and Poly Dobby weaves on Make-to-Order basis.',
    url: 'https://viralfabrics.com/fabrics',
    siteName: 'Viral Fabrics',
    images: [
      {
        url: '/assets/uploads/2025/09/bsy-fabrics-banner.png',
        width: 1200,
        height: 630,
        alt: 'Viral Fabrics Portfolio',
      },
    ],
  },
};

const FABRICS_PAGE_BADGES = [
  { iconName: 'sparkles', label: 'Continuous Water-Jet Weaves' },
  { iconName: 'layers', label: '30 to 180+ Export GSM' },
  { iconName: 'award', label: 'Solid & Digital Strike-Offs' },
];

export default async function FabricsPage() {
  const fabrics = await getCatalogFabrics();

  return (
    <div className="min-h-screen bg-[#FAF8F5] selection:bg-[#006DB6] selection:text-white">
      
      {/* Hero Banner with Agnes Toth directional unblur sweep & Breadcrumbs */}
      <PageHeroBanner
        title="Fabrics Portfolio"
        subtitle="From Around The Fabrics World"
        bgVideo="/videos/fabrics-hero.mp4"
        bgVideoPoster="/assets/uploads/2025/09/bsy-fabrics-banner.png"
        bgImage="/assets/uploads/2025/09/bsy-fabrics-banner.png"
        bgAlt="Fabrics Portfolio - Viral Fabrics"
        badges={FABRICS_PAGE_BADGES}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Fabrics' },
        ]}
      />

      {/* 2. FABRICS CATALOG SECTION */}
      <section className="relative z-10 py-16 sm:py-24 bg-[#FAF8F5] shadow-[0_-25px_60px_rgba(0,0,0,0.22)]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12 sm:space-y-16">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/80">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="font-sans text-[12px] sm:text-[13px] font-bold tracking-[0.28em] uppercase text-[#006DB6]">
                  HIGH-SPEED WATER-JET WEAVES
                </span>
                <span className="w-12 h-[2px] bg-[#006DB6]" />
              </div>
              <h1 className="font-heading font-serif text-3xl sm:text-4xl lg:text-[48px] xl:text-[52px] font-normal text-[#0A192F] leading-[1.12] tracking-tight">
                All Synthetic <span className="text-[#006DB6] italic font-normal">Qualities</span>
              </h1>
            </div>
            
            <p className="text-slate-600 text-[14.5px] sm:text-[15.5px] max-w-md font-normal leading-relaxed">
              Available in solid dyed, rotary print, or bespoke digital strike-offs. Customized GSM and widths produced on make-to-order basis.
            </p>
          </div>

          {/* Interactive Catalog with Search, Category Filter, Dynamic Grid & 2-in-1 Enquiry Modal */}
          <FabricsCatalogClient fabrics={fabrics} />

          {/* Sampling Prompt Banner */}
          <div className="bg-white border border-slate-200/90 p-8 sm:p-12 rounded-[24px] shadow-[0_10px_35px_rgba(15,23,42,0.05)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-heading font-serif text-2xl sm:text-3xl text-[#0A192F] font-normal">
                Need a Custom Weave or Specific GSM?
              </h3>
              <p className="text-slate-600 text-[14px] sm:text-[14.5px] font-normal max-w-xl leading-relaxed">
                Our Surat loom shed develops customized weave constructions, yarn blends, and lab-dip color shades tailored to your tech pack.
              </p>
            </div>
            <Link
              href="/enquiry?product=Custom%20Make-to-Order%20Weave&fabric=Custom%20Make-to-Order%20Weave"
              className="relative inline-flex items-center justify-center gap-2.5 h-12 pl-7 pr-9 text-[11.5px] font-semibold tracking-[0.16em] uppercase text-white bg-gradient-to-r from-[#2c4973] via-[#375785] to-[#436b9e] hover:from-[#375785] hover:via-[#436b9e] hover:to-[#5581ba] transition-all duration-300 group shadow-[0_2px_12px_rgba(55,87,133,0.3)] hover:shadow-[0_4px_18px_rgba(55,87,133,0.45)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer overflow-hidden shrink-0"
              style={{
                clipPath: 'polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)',
              }}
            >
              <span
                className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none group-hover:translate-x-[250%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                aria-hidden="true"
              />
              <span className="relative z-10 font-sans">REQUEST CUSTOM SAMPLE</span>
              <ArrowRight className="relative z-10 w-3.5 h-3.5 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
