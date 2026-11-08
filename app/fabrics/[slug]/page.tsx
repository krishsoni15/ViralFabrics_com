import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getFabricBySlug, getPublishedFabrics } from '@/lib/fabricsService';
import { ArrowRight, Check, ShieldCheck, Sparkles, Layers, Sliders, Home, Gauge, Building2, Globe } from 'lucide-react';

export const revalidate = 10; // Incremental Static Regeneration every 10s
export const dynamicParams = true; // Allow new fabrics created in ERP to render dynamically

export async function generateStaticParams() {
  const fabrics = await getPublishedFabrics();
  return fabrics.map((fabric) => ({
    slug: fabric.slug,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const fabric = await getFabricBySlug(slug);
  
  if (!fabric) {
    return { title: 'Fabric Not Found - Viral Fabrics' };
  }

  const title = `${fabric.name} | Viral Fabrics Surat`;
  const description = fabric.description.slice(0, 160);

  return {
    title,
    description,
    alternates: {
      canonical: `https://viralfabrics.com/fabrics/${fabric.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://viralfabrics.com/fabrics/${fabric.slug}`,
      siteName: 'Viral Fabrics',
      images: [
        {
          url: fabric.image,
          width: 800,
          height: 600,
          alt: fabric.name,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fabric.image],
    },
  };
}

export default async function FabricDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const fabric = await getFabricBySlug(slug);

  if (!fabric) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      
      {/* =====================================================================
          1. TOP HERO BANNER (Compact & Minimalist - Exact 1:1 Match)
         ===================================================================== */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 flex items-center overflow-hidden bg-[#0A192F]">
        
        {/* Banner Graphic: Preserving fabric.banner image with luxury dark contrast scrim */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src={fabric.banner}
            alt={fabric.name}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Subtle scrims for crystal-clear contrast and transparent navbar */}
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
                  {fabric.name}
                </h1>
                <p className="font-sans text-[12.5px] sm:text-[13.5px] text-white/90 font-light tracking-wide drop-shadow-sm">
                  {fabric.subtitle || 'Surat Weaving Mill • Export Synthetic Textiles'}
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
          2. MINIMALIST BREADCRUMBS BAR (Home > Fabrics > Fabric Name)
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
            <Link
              href="/fabrics"
              className="text-[#006DB6] hover:text-[#0A192F] transition-colors font-medium tracking-wide"
            >
              Fabrics
            </Link>
            <span className="text-slate-400 select-none text-[11px]">&gt;</span>
            <span className="text-[#006DB6] font-medium tracking-wide" aria-current="page">
              {fabric.name}
            </span>
          </nav>
        </div>
      </div>

      {/* 2. MAIN PRODUCT CONTENT */}
      <section className="py-24 sm:py-32 bg-white relative">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Fabric Image Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border border-slate-100 bg-slate-50">
                <Image
                  src={fabric.image}
                  alt={fabric.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Quality certification pill */}
              <div className="mt-6 p-6 bg-slate-50 border border-slate-200/70 rounded-sm space-y-3">
                <div className="flex items-center gap-2.5 text-brand-blue">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-[12px] font-semibold tracking-luxury uppercase">
                    Guaranteed Quality Parameters
                  </span>
                </div>
                <p className="text-[13px] text-slate-600 font-light leading-relaxed">
                  Every lot is verified for dimensional shrinkage, warp/weft tensile strength, and color fastness to washing &amp; crocking before dispatch.
                </p>
              </div>
            </div>

            {/* Right: Fabric Details & Specifications */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <span className="agnes-eyebrow">
                  Technical Specifications
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-brand-ink">
                  {fabric.name}
                </h2>
                <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed">
                  {fabric.description}
                </p>
              </div>

              {/* Specifications Matrix */}
              <div className="border border-slate-200 rounded-sm overflow-hidden">
                <div className="bg-[#FAF8F5] px-6 py-3.5 border-b border-slate-200">
                  <span className="text-[11px] font-semibold tracking-luxury uppercase text-brand-ink">
                    Production &amp; Supply Specifications
                  </span>
                </div>
                <div className="divide-y divide-slate-100 text-[13px]">
                  <div className="grid grid-cols-3 px-6 py-3">
                    <span className="text-slate-400 font-medium">Weaving Tech</span>
                    <span className="col-span-2 text-slate-800 font-light">High-Speed Electronic Water-Jet Looms</span>
                  </div>
                  <div className="grid grid-cols-3 px-6 py-3">
                    <span className="text-slate-400 font-medium">Dyeing &amp; Print</span>
                    <span className="col-span-2 text-slate-800 font-light">Solid Dyed, Rotary Screen Print, Digital Inkjet Print</span>
                  </div>
                  <div className="grid grid-cols-3 px-6 py-3">
                    <span className="text-slate-400 font-medium">Production Basis</span>
                    <span className="col-span-2 text-slate-800 font-light">100% Make-To-Order with Client Design Secrecy</span>
                  </div>
                  <div className="grid grid-cols-3 px-6 py-3">
                    <span className="text-slate-400 font-medium">Packaging</span>
                    <span className="col-span-2 text-slate-800 font-light">Moisture-Proof Vacuum Wrapping with Barcode / QR Labeling</span>
                  </div>
                  <div className="grid grid-cols-3 px-6 py-3">
                    <span className="text-slate-400 font-medium">Origin</span>
                    <span className="col-span-2 text-slate-800 font-light">Surat, Gujarat, India</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={`/enquiry?product=${encodeURIComponent(fabric.name)}`}
                  className="agnes-btn agnes-btn--primary !min-h-[3.2rem] !px-8 text-[12px]"
                >
                  <span>Request Swatches &amp; Quote</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  href="/fabrics"
                  className="agnes-btn agnes-btn--outline-dark !min-h-[3.2rem] !px-7 text-[12px]"
                >
                  Back to All Fabrics
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
