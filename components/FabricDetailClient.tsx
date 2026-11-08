'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowLeft,
  X,
  Phone,
  Mail,
  FileText,
} from 'lucide-react';
import type { LiveFabric } from '@/lib/fabricsService';

interface FabricDetailClientProps {
  fabric: LiveFabric;
}

function getAccentBgColor(slug: string): string {
  if (slug.includes('crepe')) return 'bg-[#E25C6A]/20';
  if (slug.includes('georgette')) return 'bg-[#8B5CF6]/20';
  if (slug.includes('chiffon')) return 'bg-[#10B981]/20';
  if (slug.includes('satin')) return 'bg-[#F59E0B]/20';
  if (slug.includes('knit')) return 'bg-[#0284C7]/20';
  if (slug.includes('bsy')) return 'bg-[#0D9488]/20';
  if (slug.includes('dobby')) return 'bg-[#6366F1]/20';
  if (slug.includes('net') || slug.includes('mesh')) return 'bg-[#EC4899]/20';
  if (slug.includes('recycled')) return 'bg-[#059669]/20';
  if (slug.includes('viscose')) return 'bg-[#D97706]/20';
  return 'bg-[#006DB6]/20';
}

export function FabricDetailClient({ fabric }: FabricDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // WhatsApp enquiry deep link for the popup modal
  const getWhatsAppUrl = () => {
    const text = `Hello Viral Fabrics,\n\nI am inquiring about *${fabric.name}* (${fabric.gsmRange || 'Export Quality'}).\n\nWeave: ${fabric.weaveType || 'Standard'}\n\nPlease share price per meter, shade chart, and minimum order quantity (MOQ).\n\nThank you!`;
    return `https://wa.me/919427988999?text=${encodeURIComponent(text)}`;
  };

  const accentBg = getAccentBgColor(fabric.slug);

  return (
    <>
      <main className="relative min-h-[calc(100vh-90px)] flex items-center justify-center bg-white pt-28 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
        
        {/* Soft Ambient Radial Light in Background */}
        <div 
          className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-slate-100/60 blur-3xl pointer-events-none -z-10" 
          aria-hidden="true" 
        />
        <div 
          className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-blue-50/40 blur-3xl pointer-events-none -z-10" 
          aria-hidden="true" 
        />

        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 my-auto">
          
          {/* =========================================================
              MAIN HERO SHOWCASE: PHOTO + TITLE, DESC & BUTTONS (VERTICALLY CENTERED)
             ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* -------------------------------------------------------
                1. LEFT COLUMN: PURE FABRIC PHOTO WITH SIGNATURE ACCENT DISC
               ------------------------------------------------------- */}
            <div 
              className={`lg:col-span-6 relative transition-all duration-800 ease-out ${
                isMounted ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-xs'
              }`}
            >
              
              {/* Soft decorative accent disc behind photo (Viral Fabrics repertoire style) */}
              <div 
                className={`absolute -top-7 -left-7 w-36 h-36 sm:w-48 sm:h-48 rounded-full ${accentBg} -z-10 pointer-events-none transition-transform duration-700 hover:scale-105`}
                aria-hidden="true"
              />

              {/* Main Pure Fabric Photo Frame (No badge clutter) */}
              <div className="group relative w-full aspect-[4/3] rounded-[24px] sm:rounded-[30px] overflow-hidden bg-slate-100 border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                
                <Image
                  src={fabric.image}
                  alt={fabric.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  priority
                />

                {/* Subtle Luxury Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />

              </div>

            </div>

            {/* -------------------------------------------------------
                2. RIGHT COLUMN: EDITORIAL TITLE, DIVIDER & DESCRIPTION
               ------------------------------------------------------- */}
            <div 
              className={`lg:col-span-6 space-y-6 transition-all duration-800 delay-150 ease-out ${
                isMounted ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-xs'
              }`}
            >
              
              {/* 2. Title & Diamond Accent Divider */}
              <div className="space-y-3">
                <h1 className="font-heading font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] font-light text-[#0A192F] tracking-tight">
                  {fabric.name}
                </h1>

                {/* Diamond Accent Divider (matching original Viral Fabrics signature) */}
                <div className="flex items-center gap-2.5 pt-1">
                  <div className="w-3.5 h-3.5 rotate-45 border-[1.5px] border-[#006DB6] bg-white flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-[#006DB6]" />
                  </div>
                  <div className="w-14 h-[2px] bg-[#006DB6]/80 rounded-full" />
                </div>
              </div>

              {/* 3. Description (Clean Left Blue Accent Line from original design) */}
              <div className="border-l-2 border-[#006DB6] pl-5 sm:pl-6 py-1">
                <p className="text-slate-700 text-base sm:text-[17.5px] font-light leading-relaxed">
                  {fabric.description}
                </p>
              </div>

              {/* 4. Action Buttons: Signature Who We Are Polygon ENQUIRE NOW + Back */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                
                {/* Primary: Who We Are Signature Polygon ENQUIRE NOW Button */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="relative inline-flex items-center justify-center gap-2.5 h-12 pl-7 pr-9 text-[11.5px] font-semibold tracking-[0.18em] uppercase text-white bg-gradient-to-r from-[#2c4973] via-[#375785] to-[#436b9e] hover:from-[#375785] hover:via-[#436b9e] hover:to-[#5581ba] transition-all duration-300 group shadow-[0_2px_12px_rgba(55,87,133,0.3)] hover:shadow-[0_4px_20px_rgba(55,87,133,0.45)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden whitespace-nowrap"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)',
                  }}
                >
                  {/* Smooth Luminous Shine Sweep */}
                  <span
                    className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none group-hover:translate-x-[250%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    aria-hidden="true"
                  />
                  <span className="relative z-10 font-sans">ENQUIRE NOW</span>
                  <ArrowRight className="relative z-10 w-3.5 h-3.5 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                {/* Secondary: Back to Fabrics Button */}
                <Link
                  href="/fabrics"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-sm text-[11.5px] font-medium tracking-[0.12em] uppercase text-slate-600 hover:text-slate-900 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 transition-all duration-200"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Fabrics</span>
                </Link>

              </div>

            </div>

          </div>

        </div>
      </main>

      {/* =========================================================
          2-IN-1 QUICK ENQUIRY POPUP MODAL (WHATSAPP + WEB FORM)
         ========================================================= */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A192F]/65 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-[26px] shadow-[0_25px_70px_rgba(10,25,47,0.35)] border border-white/80 overflow-hidden animate-in zoom-in-95 duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative p-6 sm:p-7 pb-4 bg-gradient-to-b from-[#FAF8F5] to-white border-b border-slate-100 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-slate-200 shadow-xs shrink-0">
                  <Image
                    src={fabric.image}
                    alt={fabric.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#006DB6]">
                      QUICK ENQUIRY
                    </span>
                    {fabric.gsmRange && (
                      <>
                        <span className="text-slate-300">&bull;</span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {fabric.gsmRange}
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="font-heading font-serif text-2xl sm:text-[26px] font-normal text-[#0A192F] leading-tight">
                    {fabric.name}
                  </h3>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: 2 Primary Options (WhatsApp Instant Quote + Web Form) */}
            <div className="p-6 sm:p-7 space-y-4">
              <p className="text-[13px] text-slate-600 font-light leading-relaxed">
                Connect directly with our Surat mill team. Choose how you would like to proceed with your sample request or bulk pricing:
              </p>

              {/* Option 1: WhatsApp Instant Quote */}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsModalOpen(false)}
                className="group w-full flex items-center justify-between p-4 rounded-2xl bg-emerald-50/70 hover:bg-emerald-50 border border-emerald-200/80 hover:border-emerald-300 transition-all duration-200 cursor-pointer text-left"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[14px] font-semibold text-emerald-950 flex items-center gap-1.5">
                      <span>Chat on WhatsApp</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-200/80 text-emerald-800 uppercase tracking-wider">
                        Fastest
                      </span>
                    </h4>
                    <p className="text-[12px] text-emerald-800/80 font-light">
                      Pre-filled quote message with {fabric.name} specifications
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-700 transition-transform group-hover:translate-x-1 shrink-0" />
              </a>

              {/* Option 2: Web Enquiry Form */}
              <Link
                href={`/enquiry?product=${encodeURIComponent(fabric.name)}&fabric=${encodeURIComponent(fabric.name)}`}
                onClick={() => setIsModalOpen(false)}
                className="group w-full flex items-center justify-between p-4 rounded-2xl bg-[#FAF8F5] hover:bg-[#F3EFEA] border border-slate-200/90 transition-all duration-200 cursor-pointer text-left"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#006DB6] text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-semibold text-[#0A192F]">
                      Official Web Enquiry Form
                    </h4>
                    <p className="text-[12px] text-slate-500 font-light">
                      Submit detailed specs, GSM requirements &amp; custom color matching
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 transition-transform group-hover:translate-x-1 shrink-0" />
              </Link>

              {/* Quick Contact Info Strip */}
              <div className="pt-2 flex items-center justify-between text-[11.5px] text-slate-500 border-t border-slate-100">
                <a
                  href="tel:+919427988999"
                  className="hover:text-[#006DB6] transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>+91 94279 88999</span>
                </a>
                <a
                  href="mailto:viralfabrics@yahoo.com"
                  className="hover:text-[#006DB6] transition-colors flex items-center gap-1"
                >
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span>viralfabrics@yahoo.com</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}
