import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getPublishedFabrics } from '@/lib/fabricsService';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';
import { PageHeroBanner } from '@/components/PageHeroBanner';

export const revalidate = 10; // Incremental Static Regeneration every 10s

export const metadata: Metadata = {
  title: 'Fabrics Portfolio | Viral Fabrics Surat - Export Synthetic Textiles',
  description: 'Explore the complete export-grade synthetic fabrics catalog produced by Viral Fabrics in Surat, Gujarat. BSY, Satin, Chiffon, Georgette, Crepe, Recycled PET, and Poly Dobby.',
};

export default async function FabricsPage() {
  const fabrics = await getPublishedFabrics();

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Banner with Agnes Toth directional unblur sweep & Breadcrumbs */}
      <PageHeroBanner
        title="Fabrics Portfolio"
        subtitle="From Around The Fabrics World"
        bgImage="/assets/uploads/2025/09/bsy-fabrics-banner.png"
        bgAlt="Fabrics Portfolio - Viral Fabrics"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Fabrics' },
        ]}
      />

      {/* 2. FABRICS CATALOG GRID */}
      <section className="relative z-10 py-24 sm:py-32 bg-white shadow-[0_-25px_60px_rgba(0,0,0,0.22)]">
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
