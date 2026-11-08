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

interface FabricsCatalogClientProps {
  fabrics: FabricItem[];
}

const CATEGORIES = [
  'All',
  'Crepe & Georgette',
  'Satin & Sheers',
  'Knits & Mesh',
  'Eco / Sustainable',
  'Dobby & Jacquard',
];

function getCategoryForFabric(slug: string): string {
  if (slug.includes('crepe') || slug.includes('georgette')) return 'Crepe & Georgette';
  if (slug.includes('satin') || slug.includes('chiffon')) return 'Satin & Sheers';
  if (slug.includes('knit') || slug.includes('net') || slug.includes('mesh')) return 'Knits & Mesh';
  if (slug.includes('recycled')) return 'Eco / Sustainable';
  if (slug.includes('dobby')) return 'Dobby & Jacquard';
  return 'Crepe & Georgette';
}

function getAccentColorForFabric(slug: string): string {
  if (slug.includes('crepe')) return '#E25C6A';
  if (slug.includes('georgette')) return '#8B5CF6';
  if (slug.includes('chiffon')) return '#10B981';
  if (slug.includes('satin')) return '#F59E0B';
  if (slug.includes('knit')) return '#0284C7';
  if (slug.includes('bsy')) return '#0D9488';
  if (slug.includes('dobby')) return '#6366F1';
  if (slug.includes('net') || slug.includes('mesh')) return '#EC4899';
  if (slug.includes('recycled')) return '#059669';
  if (slug.includes('viscose')) return '#D97706';
  return '#006DB6';
}

export function FabricsCatalogClient({ fabrics }: FabricsCatalogClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFabricForEnquiry, setSelectedFabricForEnquiry] = useState<FabricItem | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedFabricForEnquiry(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter fabrics based on Search query & Category selection
  const filteredFabrics = useMemo(() => {
    return fabrics.filter((fabric) => {
      // Category filter
      const cat = getCategoryForFabric(fabric.slug);
      const matchesCategory = selectedCategory === 'All' || cat === selectedCategory;

      if (!matchesCategory) return false;

      // Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();

      return (
        fabric.title.toLowerCase().includes(q) ||
        fabric.subtitle.toLowerCase().includes(q) ||
        fabric.description.toLowerCase().includes(q) ||
        fabric.gsmRange.toLowerCase().includes(q) ||
        fabric.weaveType.toLowerCase().includes(q) ||
        fabric.applications.some((app) => app.toLowerCase().includes(q)) ||
        fabric.features.some((feat) => feat.toLowerCase().includes(q))
      );
    });
  }, [fabrics, searchQuery, selectedCategory]);

  // Construct direct WhatsApp enquiry URL
  const getWhatsAppUrl = (fabric: FabricItem) => {
    const message = `Hello Viral Fabrics,\n\nI am inquiring about *${fabric.title}* (${fabric.gsmRange || 'Export Quality'}).\n\nWeave: ${fabric.weaveType || 'Standard'}\n\nPlease share price per meter, available shades/prints, and minimum order quantity (MOQ).\n\nThank you!`;
    return `https://wa.me/919427988999?text=${encodeURIComponent(message)}`;
  };

  return (
    <>
      {/* =========================================================
          1. CATALOG CONTROLS: SEARCH BAR & CATEGORY FILTER CHIPS
         ========================================================= */}
      <div className="space-y-6 sm:space-y-8">
        
        {/* Search Bar + Controls Container */}
        <div className="bg-white/95 backdrop-blur-md rounded-[22px] sm:rounded-[26px] p-4 sm:p-5 border border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.05)] flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Live Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by fabric name, weave, or GSM (e.g. Crepe, Satin, BSY)..."
              className="w-full pl-11 pr-10 py-3 bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] focus:bg-white text-[13.5px] sm:text-[14px] text-[#0A192F] placeholder-slate-400 rounded-xl border border-slate-200/90 focus:border-[#006DB6] focus:ring-2 focus:ring-[#006DB6]/20 transition-all outline-hidden font-normal"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Results Counter Pill */}
          <div className="flex items-center gap-2.5 self-end md:self-auto text-slate-600 font-sans text-[12.5px] sm:text-[13px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              Showing <strong className="font-semibold text-[#0A192F]">{filteredFabrics.length}</strong> of {fabrics.length} qualities
            </span>
          </div>

        </div>

        {/* Quick Filter Category Chips */}
        <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-[12px] sm:text-[12.5px] font-medium transition-all duration-300 whitespace-nowrap cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#0A192F] text-white shadow-[0_4px_14px_rgba(10,25,47,0.25)] scale-102'
                    : 'bg-white/85 text-slate-600 hover:text-[#0A192F] hover:bg-white border border-slate-200/80 shadow-xs'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </div>

      {/* =========================================================
          2. DYNAMIC FABRIC CARDS GRID
         ========================================================= */}
      {filteredFabrics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-4">
          {filteredFabrics.map((fabric) => {
            const accentColor = getAccentColorForFabric(fabric.slug);
            const categoryName = getCategoryForFabric(fabric.slug);

            return (
              <div
                key={fabric.slug}
                className="group flex flex-col bg-white rounded-[24px] overflow-hidden border border-slate-200/90 shadow-[0_6px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.12)] hover:-translate-y-1.5 transition-all duration-500 ease-out flex-grow"
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

                  {/* Top Left: Export Grade Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="bg-white/95 backdrop-blur-md px-3 py-1 text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#0A192F] rounded-full shadow-xs border border-white/80">
                      Export Grade
                    </span>
                  </div>

                  {/* Top Right: GSM Pill */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="bg-white/95 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-[#0A192F] rounded-full shadow-xs border border-white/80 flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: accentColor }}
                      />
                      {fabric.gsmRange}
                    </span>
                  </div>

                  {/* Subtle hover gradient wash */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Content Block */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between space-y-5">
                  <div className="space-y-3">
                    
                    {/* Category Eyebrow & Weave Type */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="text-[11px] font-bold tracking-[0.2em] uppercase"
                        style={{ color: accentColor }}
                      >
                        {categoryName}
                      </span>
                      <span className="text-[11.5px] text-slate-500 font-sans truncate max-w-[150px]">
                        {fabric.weaveType || 'Water-Jet Weave'}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="font-heading font-serif text-2xl sm:text-[26px] font-normal text-[#0A192F] group-hover:text-[#006DB6] transition-colors leading-snug">
                      <Link href={`/fabrics/${fabric.slug}`}>
                        {fabric.title}
                      </Link>
                    </h3>

                    {/* Description */}
                    <p className="text-[13.5px] sm:text-[14px] text-slate-600 line-clamp-3 leading-relaxed font-normal">
                      {fabric.description}
                    </p>

                    {/* Applications Tags */}
                    {fabric.applications && fabric.applications.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {fabric.applications.slice(0, 3).map((app, i) => (
                          <span
                            key={i}
                            className="bg-[#FAF8F5] text-slate-600 text-[11px] px-2.5 py-0.5 rounded-md border border-slate-200/80"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    )}
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
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A192F] text-white text-[12px] font-semibold tracking-wider uppercase hover:bg-[#1E3A8A] transition-colors cursor-pointer"
          >
            Clear Search &amp; Filters
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
                    <span className="text-slate-300">&bull;</span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {selectedFabricForEnquiry.gsmRange}
                    </span>
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
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 stroke-[2]" />
              </button>

            </div>

            {/* Modal Body: The 2 Enquiry Channels */}
            <div className="p-6 sm:p-7 space-y-4">
              
              <p className="text-[13px] text-slate-600 font-normal leading-relaxed">
                Choose how you would like to connect with our Surat manufacturing export desk:
              </p>

              {/* OPTION 1: WhatsApp Instant Chat */}
              <a
                href={getWhatsAppUrl(selectedFabricForEnquiry)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSelectedFabricForEnquiry(null)}
                className="group flex items-start gap-4 p-4.5 rounded-2xl border-2 border-emerald-500/20 bg-emerald-50/40 hover:bg-emerald-50 hover:border-emerald-500 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-[0_4px_14px_rgba(16,185,129,0.35)]">
                  <MessageCircle className="w-6 h-6 fill-white stroke-none" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-heading font-serif text-[17px] font-bold text-[#0A192F] group-hover:text-emerald-700 transition-colors">
                      Chat via WhatsApp
                    </h4>
                    <span className="bg-emerald-100 text-emerald-800 text-[9.5px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full shrink-0">
                      INSTANT
                    </span>
                  </div>
                  <p className="text-[12.5px] text-slate-600 leading-snug mt-1">
                    Direct chat with Mr. Viral Patel. Pre-filled with fabric specs, GSM range, and quote request.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-emerald-700 tracking-wide mt-2">
                    <span>Open WhatsApp Message</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </a>

              {/* OPTION 2: Official Web Enquiry Form (Pre-selected) */}
              <Link
                href={`/enquiry?product=${encodeURIComponent(selectedFabricForEnquiry.title)}&fabric=${encodeURIComponent(selectedFabricForEnquiry.title)}`}
                onClick={() => setSelectedFabricForEnquiry(null)}
                className="group flex items-start gap-4 p-4.5 rounded-2xl border-2 border-[#1E5FA8]/20 bg-sky-50/40 hover:bg-sky-50 hover:border-[#1E5FA8] transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#2c4973] to-[#436b9e] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-[0_4px_14px_rgba(44,73,115,0.35)]">
                  <FileText className="w-6 h-6 stroke-[2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-heading font-serif text-[17px] font-bold text-[#0A192F] group-hover:text-[#006DB6] transition-colors">
                      Complete RFQ Form
                    </h4>
                    <span className="bg-sky-100 text-sky-800 text-[9.5px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full shrink-0">
                      OFFICIAL
                    </span>
                  </div>
                  <p className="text-[12.5px] text-slate-600 leading-snug mt-1">
                    Fill out our detailed form. <strong>{selectedFabricForEnquiry.title}</strong> will be pre-selected in the enquiry dropdown.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#006DB6] tracking-wide mt-2">
                    <span>Go to Enquiry Page</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>

            </div>

            {/* Modal Footer Note */}
            <div className="px-6 sm:px-7 py-3.5 bg-[#FAF8F5] border-t border-slate-100 flex items-center justify-between text-[11.5px] text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-600">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                100% Confidentiality &amp; Direct Loom Supply
              </span>
              <span className="hidden sm:inline font-mono font-medium text-slate-700">
                +91 94279 88999
              </span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
