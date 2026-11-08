'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Home,
  Building2,
  ExternalLink,
  Copy,
  Check,
  Plane,
  Anchor,
  TrainTrack,
  Gauge,
  Globe,
  ArrowRight,
  MessageCircle,
  Clock
} from 'lucide-react';
import { COMPANY_INFO } from '@/data/company';

export default function ContactClient() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (field: string, text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2200);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      
      {/* =====================================================================
          1. TOP HERO BANNER WITH LUXURY FABRIC ROLLS (Matching Site Standard)
         ===================================================================== */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 flex items-center overflow-hidden bg-[#0A192F]">
        {/* Banner Graphic: Stacked folded luxury fabrics on right, deep navy silk on left */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/enquiry/enquiry-hero-bg.jpg"
            alt="Viral Fabrics Sourcing & Consultation Desk"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Subtle top scrim for crystal-clear contrast of transparent navbar links */}
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
                  Contact Us
                </h1>
                <p className="font-sans text-[12.5px] sm:text-[13.5px] text-white/90 font-light tracking-wide drop-shadow-sm">
                  Surat Manufacturing Facility &amp; Global Export Sourcing Desk
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
          2. MINIMALIST BREADCRUMBS BAR (Home > Contact Us)
         ===================================================================== */}
      <div className="bg-white border-b border-slate-200/70 py-2 sm:py-2.5 shadow-xs">
        <div className="max-w-[1440px] xl:max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 text-left">
          <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1.5 sm:gap-2 text-[12px] sm:text-[12.5px] font-sans">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-[#006DB6] hover:text-[#00528A] transition-colors font-medium tracking-wide"
            >
              <Home className="w-3.5 h-3.5 fill-[#006DB6] text-[#006DB6]" />
              <span>Home</span>
            </Link>
            <span className="text-slate-400 select-none text-[11px]">&gt;</span>
            <span className="text-[#006DB6] font-medium tracking-wide" aria-current="page">
              Contact Us
            </span>
          </nav>
        </div>
      </div>

      {/* =====================================================================
          3. MAIN CONTACT CANVAS: 3 CHEVRON CARDS SECTION (Matching Reference)
         ===================================================================== */}
      <section className="relative overflow-hidden py-14 sm:py-18 lg:py-22">
        
        {/* Soft Background Silk Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/enquiry-silk-bg.jpg"
            alt="Viral Fabrics Background Canvas"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-85"
            priority
          />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] xl:max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12 sm:space-y-16">
          
          {/* Centered Editorial Header Matching User Mockup */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-heading font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-slate-900 tracking-tight leading-tight">
              Contact Us
            </h2>
            
            {/* Geometric Accent Line with Diamond Emblem */}
            <div className="flex items-center justify-center gap-3 pt-0.5">
              <div className="w-14 sm:w-20 h-[1.5px] bg-[#1864AB]" />
              <div className="w-3.5 h-3.5 rotate-45 border-[2px] border-[#1864AB] bg-white flex items-center justify-center shadow-xs">
                <div className="w-1 h-1 bg-[#1864AB]" />
              </div>
              <div className="w-14 sm:w-20 h-[1.5px] bg-[#1864AB]" />
            </div>

            <p className="font-sans text-[13.5px] sm:text-[14.5px] text-slate-600 font-normal leading-relaxed max-w-xl mx-auto pt-1">
              Reach our Surat manufacturing headquarters directly for fabric sampling, bulk production quotations, and mill visitation appointments.
            </p>
          </div>

          {/* ===================================================================
              4. 3-COLUMN CHEVRON CONTACT CARDS (Matching media_1794120460835_9d12aa0b.jpg)
             =================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-[1280px] mx-auto pt-4">
            
            {/* ---------------- CARD 1: LOCATION / ADDRESS ---------------- */}
            <div className="relative group transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center">
              {/* Circular Floating Blue Icon Badge */}
              <div className="relative z-20 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#1864AB] text-white flex items-center justify-center border-[4.5px] border-white shadow-[0_6px_18px_rgba(24,100,171,0.35)] -mb-8 sm:-mb-9 group-hover:scale-105 transition-transform duration-300">
                <MapPin className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
              </div>

              {/* Pointed Chevron Card Body */}
              <div
                className="w-full bg-[#EDF5FA] border-t border-x border-[#D6E6F2] pt-12 sm:pt-14 pb-12 sm:pb-14 px-5 sm:px-7 text-center flex flex-col items-center justify-between min-h-[380px] shadow-[0_10px_28px_rgba(20,45,75,0.06)] group-hover:shadow-[0_16px_36px_rgba(20,45,75,0.1)] transition-shadow duration-300"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 32px), 50% 100%, 0 calc(100% - 32px))'
                }}
              >
                <div className="space-y-3.5 w-full">
                  <h3 className="font-heading font-serif text-lg sm:text-[20px] font-bold text-[#142C4F] tracking-wide uppercase">
                    VIRAL FABRICS PVT. LTD.
                  </h3>

                  <p className="font-sans text-[13px] sm:text-[14px] text-slate-700 leading-relaxed font-normal max-w-[280px] mx-auto">
                    Plot 37, 38, Krishna Industrial. Society,<br />
                    Opposite Umiya Residency, Near Milan Point,<br />
                    Bamroli – Vadod Road, Bamroli,<br />
                    Pandesara, Surat. Pin : 394210
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-5 pb-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full max-w-[260px]">
                  <a
                    href={COMPANY_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2 rounded-full bg-[#1864AB] text-white text-[12px] font-semibold hover:bg-[#124E85] transition-colors shadow-xs"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        'address',
                        'Plot 37, 38, Krishna Industrial Society, Opposite Umiya Residency, Near Milan Point, Bamroli – Vadod Road, Bamroli, Pandesara, Surat. Pin : 394210'
                      )
                    }
                    className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-3.5 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11.5px] font-medium transition-colors cursor-pointer shadow-2xs"
                  >
                    {copiedField === 'address' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Floating Navy Chevron Accent Line Below Card */}
              <div className="w-full flex justify-center mt-3">
                <svg viewBox="0 0 320 36" className="w-full max-w-[340px] h-6 overflow-visible" preserveAspectRatio="none">
                  <polygon points="0,0 160,26 320,0 320,8 160,34 0,8" fill="#143A67" />
                </svg>
              </div>
            </div>

            {/* ---------------- CARD 2: CALL US ---------------- */}
            <div className="relative group transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center">
              {/* Circular Floating Blue Icon Badge */}
              <div className="relative z-20 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#1864AB] text-white flex items-center justify-center border-[4.5px] border-white shadow-[0_6px_18px_rgba(24,100,171,0.35)] -mb-8 sm:-mb-9 group-hover:scale-105 transition-transform duration-300">
                <Phone className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
              </div>

              {/* Pointed Chevron Card Body */}
              <div
                className="w-full bg-[#EDF5FA] border-t border-x border-[#D6E6F2] pt-12 sm:pt-14 pb-12 sm:pb-14 px-5 sm:px-7 text-center flex flex-col items-center justify-between min-h-[380px] shadow-[0_10px_28px_rgba(20,45,75,0.06)] group-hover:shadow-[0_16px_36px_rgba(20,45,75,0.1)] transition-shadow duration-300"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 32px), 50% 100%, 0 calc(100% - 32px))'
                }}
              >
                <div className="space-y-3.5 w-full">
                  <h3 className="font-heading font-serif text-lg sm:text-[20px] font-bold text-[#142C4F] tracking-widest uppercase">
                    CALL US
                  </h3>

                  <div className="pt-2">
                    <a
                      href={`tel:${COMPANY_INFO.phoneTel}`}
                      className="font-sans text-[20px] sm:text-[22px] font-bold text-[#142C4F] hover:text-[#1864AB] transition-colors tracking-wide block"
                    >
                      91-9427988999
                    </a>
                  </div>

                  <p className="font-sans text-[12.5px] text-slate-600 leading-relaxed font-normal max-w-[260px] mx-auto pt-1">
                    Direct Commercial &amp; Export Sales Desk<br />
                    <span className="text-slate-500 text-[11.5px]">Mon – Sat: 9:00 AM – 7:30 PM IST</span>
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-5 pb-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full max-w-[260px]">
                  <a
                    href={`tel:${COMPANY_INFO.phoneTel}`}
                    className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2 rounded-full bg-[#1864AB] text-white text-[12px] font-semibold hover:bg-[#124E85] transition-colors shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </a>

                  <a
                    href="https://wa.me/919427988999?text=Hello%20Viral%20Fabrics%2C%20I%20would%20like%20to%20inquire%20about%20export%20fabrics."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-3.5 py-2 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-[11.5px] font-medium transition-colors shadow-2xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy('phone', '91-9427988999')}
                    className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-3 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11.5px] font-medium transition-colors cursor-pointer shadow-2xs"
                    title="Copy phone number"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Floating Navy Chevron Accent Line Below Card */}
              <div className="w-full flex justify-center mt-3">
                <svg viewBox="0 0 320 36" className="w-full max-w-[340px] h-6 overflow-visible" preserveAspectRatio="none">
                  <polygon points="0,0 160,26 320,0 320,8 160,34 0,8" fill="#143A67" />
                </svg>
              </div>
            </div>

            {/* ---------------- CARD 3: WRITE US / EMAIL ---------------- */}
            <div className="relative group transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center">
              {/* Circular Floating Blue Icon Badge */}
              <div className="relative z-20 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#1864AB] text-white flex items-center justify-center border-[4.5px] border-white shadow-[0_6px_18px_rgba(24,100,171,0.35)] -mb-8 sm:-mb-9 group-hover:scale-105 transition-transform duration-300">
                <Mail className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
              </div>

              {/* Pointed Chevron Card Body */}
              <div
                className="w-full bg-[#EDF5FA] border-t border-x border-[#D6E6F2] pt-12 sm:pt-14 pb-12 sm:pb-14 px-5 sm:px-7 text-center flex flex-col items-center justify-between min-h-[380px] shadow-[0_10px_28px_rgba(20,45,75,0.06)] group-hover:shadow-[0_16px_36px_rgba(20,45,75,0.1)] transition-shadow duration-300"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 32px), 50% 100%, 0 calc(100% - 32px))'
                }}
              >
                <div className="space-y-3.5 w-full">
                  <h3 className="font-heading font-serif text-lg sm:text-[20px] font-bold text-[#142C4F] tracking-widest uppercase">
                    WRITE US
                  </h3>

                  <div className="pt-2">
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="font-sans text-[15.5px] sm:text-[17px] font-bold text-[#142C4F] hover:text-[#1864AB] transition-colors tracking-tight block break-all"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>

                  <p className="font-sans text-[12.5px] text-slate-600 leading-relaxed font-normal max-w-[260px] mx-auto pt-1">
                    Corporate Correspondence &amp; Tech Packs<br />
                    <span className="text-slate-500 text-[11.5px]">Guaranteed response within 24 business hours</span>
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-5 pb-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full max-w-[260px]">
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2 rounded-full bg-[#1864AB] text-white text-[12px] font-semibold hover:bg-[#124E85] transition-colors shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Email</span>
                  </a>

                  <Link
                    href="/enquiry"
                    className="inline-flex items-center justify-center gap-1 w-full sm:w-auto px-3.5 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-[11.5px] font-medium transition-colors shadow-2xs"
                  >
                    <span>Enquiry</span>
                    <ArrowRight className="w-3 h-3 text-[#1864AB]" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleCopy('email', COMPANY_INFO.email)}
                    className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-3 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11.5px] font-medium transition-colors cursor-pointer shadow-2xs"
                    title="Copy email address"
                  >
                    {copiedField === 'email' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Floating Navy Chevron Accent Line Below Card */}
              <div className="w-full flex justify-center mt-3">
                <svg viewBox="0 0 320 36" className="w-full max-w-[340px] h-6 overflow-visible" preserveAspectRatio="none">
                  <polygon points="0,0 160,26 320,0 320,8 160,34 0,8" fill="#143A67" />
                </svg>
              </div>
            </div>

          </div>

          {/* ===================================================================
              5. SURAT WEAVING PLANT INTERACTIVE GOOGLE MAP & TRANSIT SECTION
             =================================================================== */}
          <div className="max-w-[1360px] mx-auto space-y-5 pt-8 sm:pt-12">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8DEC8] pb-3">
              <div>
                <span className="font-sans text-[11px] font-bold tracking-[0.24em] uppercase text-[#1864AB] block">
                  SURAT WEAVING MILL COORDINATES
                </span>
                <h3 className="font-heading font-serif text-2xl sm:text-3xl font-light text-slate-900">
                  Facility Location &amp; Directions
                </h3>
              </div>
              <p className="font-sans text-[12.5px] text-slate-600">
                Plot 37, 38, Krishna Industrial Society, Bamroli, Surat, Gujarat
              </p>
            </div>

            {/* Elevated Map Showcase Container */}
            <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[520px] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-[#E8DEC8] shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
              
              {/* Floating Translucent Coordinates Pill (Top Left) */}
              <div className="absolute top-4 left-4 z-20 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-md">
                <div className="w-8 h-8 rounded-lg bg-[#1864AB] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  VF
                </div>
                <div>
                  <p className="font-sans text-xs font-bold text-slate-900 leading-tight">
                    Viral Fabrics Surat Facility
                  </p>
                  <p className="font-sans text-[10.5px] text-slate-500">
                    21.1442° N, 72.8258° E &bull; Pandesara Industrial Cluster
                  </p>
                </div>
                <a
                  href={COMPANY_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-xs text-[#1864AB] hover:underline font-semibold inline-flex items-center gap-0.5"
                >
                  <span>Open</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Real Google Map Embed */}
              <iframe
                src={COMPANY_INFO.mapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="VIRAL FABRICS PVT. LTD Surat Facility Google Map"
                className="w-full h-full"
              />
            </div>

            {/* Direct Transit & Ocean Port Connectivity Credentials (From Screenshot media_1794120481149_f0d2abff.jpg) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 sm:p-5 rounded-2xl bg-white/85 backdrop-blur-md border border-[#E8DEC8] flex items-center gap-3.5 shadow-xs hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#E8F3FA] text-[#1864AB] flex items-center justify-center shrink-0">
                  <Plane className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <p className="font-sans text-[12px] font-bold text-slate-900 uppercase tracking-wide">
                    Surat Airport (STV)
                  </p>
                  <p className="font-sans text-[11.5px] text-slate-600">
                    14 km &bull; 25 mins direct via Ring Road
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/85 backdrop-blur-md border border-[#E8DEC8] flex items-center gap-3.5 shadow-xs hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#E8F3FA] text-[#1864AB] flex items-center justify-center shrink-0">
                  <Anchor className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <p className="font-sans text-[12px] font-bold text-slate-900 uppercase tracking-wide">
                    Hazira Ocean Port
                  </p>
                  <p className="font-sans text-[11.5px] text-slate-600">
                    25 km &bull; Direct sea container sailings
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/85 backdrop-blur-md border border-[#E8DEC8] flex items-center gap-3.5 shadow-xs hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#E8F3FA] text-[#1864AB] flex items-center justify-center shrink-0">
                  <TrainTrack className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <p className="font-sans text-[12px] font-bold text-slate-900 uppercase tracking-wide">
                    Surat Railway Station
                  </p>
                  <p className="font-sans text-[11.5px] text-slate-600">
                    10 km &bull; Overnight express from Mumbai
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Sourcing Bridge Callout */}
            <div className="mt-8 p-6 sm:p-8 rounded-[24px] bg-gradient-to-r from-[#0C2D50] via-[#0E3B68] to-[#164E87] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_12px_32px_rgba(12,45,80,0.2)]">
              <div className="space-y-1.5 text-center md:text-left">
                <span className="font-sans text-[10.5px] font-bold tracking-[0.24em] uppercase text-[#64B5F6] block">
                  BULK TEXTILE SOURCING &amp; LAB DIPS
                </span>
                <h4 className="font-heading font-serif text-2xl sm:text-3xl font-light text-white">
                  Need Custom Fabric Formulation or Swatches?
                </h4>
                <p className="font-sans text-[13px] text-white/85 max-w-xl">
                  Submit technical fabric specifications, required GSM, strike-off requests, and container delivery schedules directly on our export sourcing desk.
                </p>
              </div>

              <Link
                href="/enquiry"
                className="relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#0C2D50] hover:bg-[#F0F7FF] text-[13px] font-bold tracking-wide transition-all duration-300 shadow-md shrink-0 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Go To Sourcing Enquiry Desk</span>
                <ArrowRight className="w-4 h-4 stroke-[2.4]" />
              </Link>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
