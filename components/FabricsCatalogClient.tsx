'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  X,
  MessageCircle,
  FileText,
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import type { FabricItem } from '@/data/fabrics';
import type { LiveFabric } from '@/types';

interface FabricsCatalogClientProps {
  fabrics: (FabricItem | LiveFabric)[];
}

export function FabricsCatalogClient({ fabrics }: FabricsCatalogClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFabricForEnquiry, setSelectedFabricForEnquiry] = useState<FabricItem | LiveFabric | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedFabricForEnquiry(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter fabrics based on live search query
  const filteredFabrics = useMemo(() => {
    if (!searchQuery.trim()) return fabrics;
    const q = searchQuery.toLowerCase().trim();

    return fabrics.filter((fabric) => {
      const title = (fabric.title || (fabric as any).name || '').toLowerCase();
      const subtitle = (fabric.subtitle || '').toLowerCase();
      const description = (fabric.description || '').toLowerCase();
      const gsmRange = (fabric.gsmRange || '').toLowerCase();
      const weaveType = (fabric.weaveType || '').toLowerCase();
      const apps = Array.isArray(fabric.applications) ? fabric.applications : [];
      const feats = Array.isArray(fabric.features) ? fabric.features : [];

      return (
        title.includes(q) ||
        subtitle.includes(q) ||
        description.includes(q) ||
        gsmRange.includes(q) ||
        weaveType.includes(q) ||
        apps.some((app) => app.toLowerCase().includes(q)) ||
        feats.some((feat) => feat.toLowerCase().includes(q))
      );
    });
  }, [fabrics, searchQuery]);

  // Construct direct WhatsApp enquiry URL
  const getWhatsAppUrl = (fabric: FabricItem | LiveFabric) => {
    const message = `Hello Viral Fabrics,\n\nI am inquiring about *${fabric.title || (fabric as any).name}* (${fabric.gsmRange || 'Export Quality'}).\n\nWeave: ${fabric.weaveType || 'Standard'}\n\nPlease share price per meter, available shades/prints, and minimum order quantity (MOQ).\n\nThank you!`;
    return `https://wa.me/919427988999?text=${encodeURIComponent(message)}`;
  };

  return (
    <>
      {/* =========================================================
          1. CATALOG SEARCH BAR (MINIMALIST, CLEAN & REFINED)
         ========================================================= */}
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full p-2 pl-4 sm:pl-6 sm:pr-3 border border-slate-200/90 shadow-[0_8px_25px_rgba(15,23,42,0.04)] flex flex-col sm:flex-row items-center justify-between gap-3 transition-all focus-within:shadow-[0_12px_32px_rgba(15,23,42,0.08)] focus-within:border-[#006DB6]/40">
          
          {/* Live Search Input */}
          <div className="relative flex-1 w-full flex items-center">
            <Search className="w-4 h-4 text-slate-400 shrink-0 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fabrics by name, weave, or GSM (e.g. Crepe, Satin, BSY)..."
              className="w-full pl-3.5 pr-8 py-2 text-[13.5px] sm:text-[14px] text-[#0A192F] placeholder-slate-400 bg-transparent transition-all outline-hidden font-normal"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-1 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Minimalist Results Counter Badge (No Green Dot) */}
          <div className="self-end sm:self-center px-4 py-1.5 rounded-full bg-[#FAF8F5] border border-slate-200/80 text-slate-600 font-sans text-[12px] sm:text-[12.5px] shrink-0 whitespace-nowrap">
            Showing <strong className="font-semibold text-[#0A192F]">{filteredFabrics.length}</strong> of {fabrics.length} qualities
          </div>

        </div>
      </div>

      {/* =========================================================
          2. DYNAMIC FABRIC CARDS GRID (MINIMAL, CLEAN & HAUTE-COUTURE)
         ========================================================= */}
      {filteredFabrics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-4">
          {filteredFabrics.map((fabric, index) => {
            return (
              <div
                key={fabric.slug}
                style={{ animationDelay: `${index * 45}ms` }}
                className="group flex flex-col bg-white rounded-[24px] overflow-hidden border border-slate-200/90 shadow-[0_6px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.12)] hover:-translate-y-1.5 transition-all duration-500 ease-out flex-grow animate-in fade-in-50 slide-in-from-bottom-3 fill-mode-backwards"
              >
                {/* Fabric Image Container with Hover Scale */}
                <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                  <Image
                    src={fabric.image}
                    alt={fabric.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106 select-none"
                  />

                  {/* Subtle hover gradient wash */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Content Block */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between space-y-5">
                  <div className="space-y-3">
                    {/* Headline */}
                    <h3 className="font-heading font-serif text-2xl sm:text-[26px] font-normal text-[#0A192F] group-hover:text-[#006DB6] transition-colors leading-snug">
                      <Link href={`/fabrics/${fabric.slug}`}>
                        {fabric.title}
                      </Link>
                    </h3>

                    {/* Description (Clean, Uncluttered, Minimal) */}
                    <p className="text-[13.5px] sm:text-[14px] text-slate-600 line-clamp-3 leading-relaxed font-normal">
                      {fabric.description}
                    </p>
                  </div>

                  {/* Action Row: 2-in-1 Enquiry Button + Details Link */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    
                    {/* Primary Button: 2-in-1 Enquiry Trigger (Who We Are Polygon Styling) */}
                    <button
                      type="button"
                      onClick={() => setSelectedFabricForEnquiry(fabric)}
                      className="relative inline-flex items-center justify-center gap-2 h-10 pl-5 pr-6 text-[11px] font-semibold tracking-[0.16em] uppercase text-white bg-gradient-to-r from-[#2c4973] via-[#375785] to-[#436b9e] hover:from-[#375785] hover:via-[#436b9e] hover:to-[#5581ba] transition-all duration-300 group shadow-[0_2px_10px_rgba(55,87,133,0.3)] hover:shadow-[0_4px_16px_rgba(55,87,133,0.45)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden whitespace-nowrap"
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
                      }}
                    >
                      {/* Smooth Luminous Shine Sweep */}
                      <span
                        className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none group-hover:translate-x-[250%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        aria-hidden="true"
                      />
                      <span className="relative z-10 font-sans">ENQUIRE NOW</span>
                      <ArrowRight className="relative z-10 w-3 h-3 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-1" />
                    </button>

                    {/* Secondary Link: View Full Details */}
                    <Link
                      href={`/fabrics/${fabric.slug}`}
                      className="text-[12px] font-medium text-slate-500 hover:text-[#006DB6] transition-colors inline-flex items-center gap-1 group/link py-1"
                    >
                      <span>Details</span>
                      <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                    </Link>

                  </div>

                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Empty Search State */
        <div className="bg-white rounded-[24px] border border-slate-200/90 p-12 text-center max-w-lg mx-auto space-y-4 my-8">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-slate-200 mx-auto flex items-center justify-center text-slate-400">
            <Search className="w-6 h-6 stroke-[1.8]" />
          </div>
          <h3 className="font-heading font-serif text-2xl text-[#0A192F]">
            No fabrics found matching &ldquo;{searchQuery}&rdquo;
          </h3>
          <p className="text-slate-600 text-[13.5px] leading-relaxed">
            Try checking for spelling errors, or try searching for keywords like <strong className="text-[#0A192F]">Crepe</strong>, <strong className="text-[#0A192F]">Satin</strong>, or <strong className="text-[#0A192F]">BSY</strong>.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A192F] text-white text-[12px] font-semibold tracking-wider uppercase hover:bg-[#1E3A8A] transition-colors cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* =========================================================
          3. 2-IN-1 QUICK ENQUIRY POPUP MODAL (WHATSAPP OR WEB FORM)
         ========================================================= */}
      {selectedFabricForEnquiry && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A192F]/65 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedFabricForEnquiry(null)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-[26px] shadow-[0_25px_70px_rgba(10,25,47,0.35)] border border-white/80 overflow-hidden animate-in zoom-in-95 duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header Bar with Close Button */}
            <div className="relative p-6 sm:p-7 pb-4 bg-gradient-to-b from-[#FAF8F5] to-white border-b border-slate-100 flex items-start justify-between gap-4">
              
              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-slate-200 shadow-xs shrink-0">
                  <Image
                    src={selectedFabricForEnquiry.image}
                    alt={selectedFabricForEnquiry.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#006DB6]">
                      QUICK ENQUIRY
                    </span>
                    {selectedFabricForEnquiry.gsmRange && (
                      <>
                        <span className="text-slate-300">&bull;</span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {selectedFabricForEnquiry.gsmRange}
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="font-heading font-serif text-2xl sm:text-[26px] font-normal text-[#0A192F] leading-tight">
                    {selectedFabricForEnquiry.title}
                  </h3>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedFabricForEnquiry(null)}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 stroke-[2]" />
              </button>

            </div>

            {/* Modal Body: 2 Primary Options (WhatsApp Instant Quote + Web Form) */}
            <div className="p-6 sm:p-7 space-y-4">
              
              <p className="text-[13px] text-slate-600 font-light leading-relaxed">
                Connect directly with our Surat mill team. Choose how you would like to proceed with your sample request or bulk pricing:
              </p>

              {/* Option 1: WhatsApp Instant Quote */}
              <a
                href={getWhatsAppUrl(selectedFabricForEnquiry)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSelectedFabricForEnquiry(null)}
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
                      Pre-filled quote message with {selectedFabricForEnquiry.title} specifications
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-700 transition-transform group-hover:translate-x-1 shrink-0" />
              </a>

              {/* Option 2: Web Enquiry Form */}
              <Link
                href={`/enquiry?product=${encodeURIComponent(selectedFabricForEnquiry.title)}&fabric=${encodeURIComponent(selectedFabricForEnquiry.title)}`}
                onClick={() => setSelectedFabricForEnquiry(null)}
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

