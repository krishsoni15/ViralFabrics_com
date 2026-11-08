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
    <main className="min-h-screen bg-white">
      
      {/* =====================================================================
          1. TOP HERO BANNER WITH LUXURY FABRIC ROLLS (Transparent Navbar on Top)
         ===================================================================== */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-9 sm:pb-11 flex items-center overflow-hidden bg-[#0A192F]">
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
          <div className="absolute inset-0 bg-gradient-to-b from-[#061426]/80 via-[#061426]/25 to-transparent pointer-events-none" />
        </div>

        {/* Content Aligned with Main Container */}
        <div className="relative z-10 w-full max-w-[1440px] xl:max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl text-white">
            
            {/* Title with Vertical Blue Accent Bar */}
            <div className="flex items-start gap-3 sm:gap-3.5">
              <div className="w-[3.5px] sm:w-1 h-9 sm:h-11 bg-[#0084D1] rounded-full flex-shrink-0 mt-0.5 shadow-[0_0_12px_rgba(0,132,209,0.8)]" />
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
      <div className="bg-white border-b border-slate-200/80 py-2.5 sm:py-3 shadow-xs">
        <div className="max-w-[1440px] xl:max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 text-left">
          <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1.5 sm:gap-2 text-[12px] sm:text-[12.5px] font-sans">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-[#1665C1] hover:text-[#0C2544] transition-colors font-medium tracking-wide"
            >
              <Home className="w-3.5 h-3.5 fill-[#1665C1] text-[#1665C1]" />
              <span>Home</span>
            </Link>
            <span className="text-slate-400 select-none text-[11px]">&gt;</span>
            <span className="text-[#1665C1] font-semibold tracking-wide" aria-current="page">
              Contact Us
            </span>
          </nav>
        </div>
      </div>

      {/* =====================================================================
          3. MAIN CONTACT SECTION: 3 ELEVATED CHEVRON CARDS (Matching Reference)
         ===================================================================== */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F8FAFD] via-white to-[#F4F8FC]">
        
        <div className="relative z-10 w-full max-w-[1440px] xl:max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12 sm:space-y-16">
          
          {/* Centered Editorial Header Matching User Reference */}
          <div className="text-center max-w-2xl mx-auto space-y-3.5">
            <h2 className="font-heading font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#113259] tracking-tight leading-tight">
              Contact Us
            </h2>
            
            {/* Geometric Accent Line with Diamond Emblem */}
            <div className="flex items-center justify-center gap-3 pt-0.5">
              <div className="w-16 sm:w-24 h-[2px] bg-[#1665C1]" />
              <div className="w-4 h-4 rotate-45 border-[2px] border-[#1665C1] bg-white flex items-center justify-center shadow-xs">
                <div className="w-1.5 h-1.5 bg-[#1665C1]" />
              </div>
              <div className="w-16 sm:w-24 h-[2px] bg-[#1665C1]" />
            </div>

            <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#2C4A6F] font-normal leading-relaxed max-w-xl mx-auto pt-1">
              Reach our Surat manufacturing headquarters directly for fabric sampling, bulk production quotations, and mill visitation appointments.
            </p>
          </div>

          {/* ===================================================================
              4. 3-COLUMN CHEVRON CONTACT CARDS (Elevated Color & Unified Buttons)
             =================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-[1300px] mx-auto pt-6">
            
            {/* ---------------- CARD 1: LOCATION / ADDRESS ---------------- */}
            <div className="relative group transition-all duration-300 hover:-translate-y-2 flex flex-col items-center">
              {/* Circular Floating Blue Icon Badge */}
              <div className="relative z-20 w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#1E6FC4] to-[#114E91] text-white flex items-center justify-center border-[5px] border-white shadow-[0_10px_24px_rgba(22,101,193,0.38)] -mb-10 sm:-mb-11 group-hover:scale-105 transition-transform duration-300">
                <MapPin className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
              </div>

              {/* Pointed Chevron Card Body */}
              <div
                className="w-full bg-gradient-to-b from-[#F2F7FB] via-[#EBF3FA] to-[#DFEEF7] border-t border-x border-[#D2E4F2] pt-14 sm:pt-16 pb-12 sm:pb-14 px-6 sm:px-8 text-center flex flex-col items-center justify-between min-h-[420px] shadow-[0_12px_32px_rgba(17,50,89,0.06)] group-hover:shadow-[0_20px_42px_rgba(17,50,89,0.12)] transition-shadow duration-300"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 36px), 50% 100%, 0 calc(100% - 36px))'
                }}
              >
                <div className="space-y-4 w-full">
                  <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-[#1665C1] uppercase block">
                    OUR FACILITY
                  </span>

                  <h3 className="font-heading font-serif text-[20px] sm:text-[22px] font-bold text-[#113259] tracking-wider uppercase leading-snug">
                    VIRAL FABRICS PVT. LTD.
                  </h3>

                  <p className="font-sans text-[13.5px] sm:text-[14px] text-[#2C4A6F] leading-[1.75] font-normal max-w-[290px] mx-auto">
                    Plot 37, 38, Krishna Industrial. Society,<br />
                    Opposite Umiya Residency, Near Milan Point,<br />
                    Bamroli – Vadod Road, Bamroli,<br />
                    Pandesara, Surat. Pin : 394210
                  </p>
                </div>

                {/* Unified High-End Actions */}
                <div className="pt-6 pb-2 flex flex-wrap items-center justify-center gap-2.5 w-full">
                  <a
                    href={COMPANY_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-gradient-to-r from-[#113259] via-[#164273] to-[#1C518C] hover:from-[#0A223E] hover:to-[#143B66] text-white text-[12.5px] font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
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
                    className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl bg-white hover:bg-slate-50 text-[#113259] border border-[#C6DCED] text-[12px] font-semibold transition-all duration-200 cursor-pointer shadow-2xs hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {copiedField === 'address' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#1665C1]" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Floating Navy Chevron Accent Line Below Card */}
              <div className="w-full flex justify-center mt-3.5">
                <svg viewBox="0 0 340 44" className="w-full max-w-[380px] h-7 overflow-visible" preserveAspectRatio="none">
                  <polygon points="0,0 170,32 340,0 340,12 170,44 0,12" fill="#113259" />
                </svg>
              </div>
            </div>

            {/* ---------------- CARD 2: CALL US ---------------- */}
            <div className="relative group transition-all duration-300 hover:-translate-y-2 flex flex-col items-center">
              {/* Circular Floating Blue Icon Badge */}
              <div className="relative z-20 w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#1E6FC4] to-[#114E91] text-white flex items-center justify-center border-[5px] border-white shadow-[0_10px_24px_rgba(22,101,193,0.38)] -mb-10 sm:-mb-11 group-hover:scale-105 transition-transform duration-300">
                <Phone className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
              </div>

              {/* Pointed Chevron Card Body */}
              <div
                className="w-full bg-gradient-to-b from-[#F2F7FB] via-[#EBF3FA] to-[#DFEEF7] border-t border-x border-[#D2E4F2] pt-14 sm:pt-16 pb-12 sm:pb-14 px-6 sm:px-8 text-center flex flex-col items-center justify-between min-h-[420px] shadow-[0_12px_32px_rgba(17,50,89,0.06)] group-hover:shadow-[0_20px_42px_rgba(17,50,89,0.12)] transition-shadow duration-300"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 36px), 50% 100%, 0 calc(100% - 36px))'
                }}
              >
                <div className="space-y-3 w-full">
                  <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-[#1665C1] uppercase block">
                    DIRECT SALES DESK
                  </span>

                  <h3 className="font-heading font-serif text-[21px] sm:text-[23px] font-bold text-[#113259] tracking-widest uppercase">
                    CALL US
                  </h3>

                  <div className="pt-2">
                    <a
                      href={`tel:${COMPANY_INFO.phoneTel}`}
                      className="font-sans text-[23px] sm:text-[25px] font-bold text-[#113259] hover:text-[#1665C1] transition-colors tracking-wide block"
                    >
                      91-9427988999
                    </a>
                  </div>

                  <p className="font-sans text-[13px] text-[#2C4A6F] leading-relaxed max-w-[280px] mx-auto pt-1">
                    Instant Fabric Pricing &amp; Container Estimates<br />
                    <span className="text-slate-500 text-[12px] font-medium">Mon – Sat: 9:00 AM – 7:30 PM IST</span>
                  </p>
                </div>

                {/* Unified High-End Actions */}
                <div className="pt-6 pb-2 flex flex-wrap items-center justify-center gap-2.5 w-full">
                  <a
                    href={`tel:${COMPANY_INFO.phoneTel}`}
                    className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-gradient-to-r from-[#113259] via-[#164273] to-[#1C518C] hover:from-[#0A223E] hover:to-[#143B66] text-white text-[12.5px] font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </a>

                  <a
                    href="https://wa.me/919427988999?text=Hello%20Viral%20Fabrics%2C%20I%20would%20like%20to%20inquire%20about%20export%20fabrics."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl bg-white hover:bg-slate-50 text-[#113259] border border-[#C6DCED] text-[12px] font-semibold transition-all duration-200 shadow-2xs hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#1665C1]" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy('phone', '91-9427988999')}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white hover:bg-slate-50 text-[#113259] border border-[#C6DCED] transition-all duration-200 cursor-pointer shadow-2xs hover:-translate-y-0.5 active:translate-y-0"
                    title="Copy phone number"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#1665C1]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Floating Navy Chevron Accent Line Below Card */}
              <div className="w-full flex justify-center mt-3.5">
                <svg viewBox="0 0 340 44" className="w-full max-w-[380px] h-7 overflow-visible" preserveAspectRatio="none">
                  <polygon points="0,0 170,32 340,0 340,12 170,44 0,12" fill="#113259" />
                </svg>
              </div>
            </div>

            {/* ---------------- CARD 3: WRITE US / EMAIL ---------------- */}
            <div className="relative group transition-all duration-300 hover:-translate-y-2 flex flex-col items-center">
              {/* Circular Floating Blue Icon Badge */}
              <div className="relative z-20 w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#1E6FC4] to-[#114E91] text-white flex items-center justify-center border-[5px] border-white shadow-[0_10px_24px_rgba(22,101,193,0.38)] -mb-10 sm:-mb-11 group-hover:scale-105 transition-transform duration-300">
                <Mail className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
              </div>

              {/* Pointed Chevron Card Body */}
              <div
                className="w-full bg-gradient-to-b from-[#F2F7FB] via-[#EBF3FA] to-[#DFEEF7] border-t border-x border-[#D2E4F2] pt-14 sm:pt-16 pb-12 sm:pb-14 px-6 sm:px-8 text-center flex flex-col items-center justify-between min-h-[420px] shadow-[0_12px_32px_rgba(17,50,89,0.06)] group-hover:shadow-[0_20px_42px_rgba(17,50,89,0.12)] transition-shadow duration-300"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 36px), 50% 100%, 0 calc(100% - 36px))'
                }}
              >
                <div className="space-y-3 w-full">
                  <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-[#1665C1] uppercase block">
                    CORPORATE DESK
                  </span>

                  <h3 className="font-heading font-serif text-[21px] sm:text-[23px] font-bold text-[#113259] tracking-widest uppercase">
                    WRITE US
                  </h3>

                  <div className="pt-2">
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="font-sans text-[16.5px] sm:text-[18px] font-bold text-[#113259] hover:text-[#1665C1] transition-colors tracking-tight block break-all"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>

                  <p className="font-sans text-[13px] text-[#2C4A6F] leading-relaxed max-w-[280px] mx-auto pt-1">
                    Submit Tech Packs, POs &amp; Lab Dips<br />
                    <span className="text-slate-500 text-[12px] font-medium">Guaranteed response within 24 business hours</span>
                  </p>
                </div>

                {/* Unified High-End Actions */}
                <div className="pt-6 pb-2 flex flex-wrap items-center justify-center gap-2.5 w-full">
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-gradient-to-r from-[#113259] via-[#164273] to-[#1C518C] hover:from-[#0A223E] hover:to-[#143B66] text-white text-[12.5px] font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Email</span>
                  </a>

                  <Link
                    href="/enquiry"
                    className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl bg-white hover:bg-slate-50 text-[#113259] border border-[#C6DCED] text-[12px] font-semibold transition-all duration-200 shadow-2xs hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Enquiry Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#1665C1]" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleCopy('email', COMPANY_INFO.email)}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white hover:bg-slate-50 text-[#113259] border border-[#C6DCED] transition-all duration-200 cursor-pointer shadow-2xs hover:-translate-y-0.5 active:translate-y-0"
                    title="Copy email address"
                  >
                    {copiedField === 'email' ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#1665C1]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Floating Navy Chevron Accent Line Below Card */}
              <div className="w-full flex justify-center mt-3.5">
                <svg viewBox="0 0 340 44" className="w-full max-w-[380px] h-7 overflow-visible" preserveAspectRatio="none">
                  <polygon points="0,0 170,32 340,0 340,12 170,44 0,12" fill="#113259" />
                </svg>
              </div>
            </div>

          </div>

          {/* ===================================================================
              5. SURAT WEAVING PLANT INTERACTIVE GOOGLE MAP & TRANSIT SECTION
             =================================================================== */}
          <div className="max-w-[1360px] mx-auto space-y-6 pt-10 sm:pt-14">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D8E6F3] pb-4">
              <div>
                <span className="font-sans text-[11px] font-bold tracking-[0.24em] uppercase text-[#1665C1] block">
                  SURAT WEAVING MILL COORDINATES
                </span>
                <h3 className="font-heading font-serif text-2xl sm:text-3xl font-bold text-[#113259]">
                  Facility Location &amp; Directions
                </h3>
              </div>
              <p className="font-sans text-[13px] text-slate-600 font-medium">
                Plot 37, 38, Krishna Industrial Society, Bamroli, Surat, Gujarat
              </p>
            </div>

            {/* Elevated Map Showcase Container */}
            <div className="relative w-full h-[430px] sm:h-[490px] lg:h-[530px] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-[#D8E6F3] shadow-[0_16px_40px_rgba(17,50,89,0.08)]">
              
              {/* Floating Translucent Coordinates Pill (Top Left) */}
              <div className="absolute top-4 left-4 z-20 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-md">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1665C1] to-[#113259] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  VF
                </div>
                <div>
                  <p className="font-sans text-xs font-bold text-[#113259] leading-tight">
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
                  className="ml-2 text-xs text-[#1665C1] hover:underline font-semibold inline-flex items-center gap-0.5"
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

            {/* Direct Transit & Ocean Port Connectivity Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D8E6F3] flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-[#EAF2F8] text-[#1665C1] flex items-center justify-center shrink-0">
                  <Plane className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <p className="font-sans text-[12px] font-bold text-[#113259] uppercase tracking-wide">
                    Surat Airport (STV)
                  </p>
                  <p className="font-sans text-[11.5px] text-slate-600">
                    14 km &bull; 25 mins direct via Ring Road
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D8E6F3] flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-[#EAF2F8] text-[#1665C1] flex items-center justify-center shrink-0">
                  <Anchor className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <p className="font-sans text-[12px] font-bold text-[#113259] uppercase tracking-wide">
                    Hazira Ocean Port
                  </p>
                  <p className="font-sans text-[11.5px] text-slate-600">
                    25 km &bull; Direct sea container sailings
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D8E6F3] flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-[#EAF2F8] text-[#1665C1] flex items-center justify-center shrink-0">
                  <TrainTrack className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <p className="font-sans text-[12px] font-bold text-[#113259] uppercase tracking-wide">
                    Surat Railway Station
                  </p>
                  <p className="font-sans text-[11.5px] text-slate-600">
                    10 km &bull; Overnight express from Mumbai
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Sourcing Bridge Callout */}
            <div className="mt-8 p-7 sm:p-9 rounded-[26px] bg-gradient-to-r from-[#0A192F] via-[#10355E] to-[#164E87] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_16px_40px_rgba(10,25,47,0.25)] border border-white/10">
              <div className="space-y-1.5 text-center md:text-left">
                <span className="font-sans text-[10.5px] font-bold tracking-[0.24em] uppercase text-[#64B5F6] block">
                  BULK TEXTILE SOURCING &amp; LAB DIPS
                </span>
                <h4 className="font-heading font-serif text-2xl sm:text-3xl lg:text-[32px] font-light text-white">
                  Need Custom Fabric Formulation or Swatches?
                </h4>
                <p className="font-sans text-[13.5px] text-white/85 max-w-xl">
                  Submit technical fabric specifications, required GSM, strike-off requests, and container delivery schedules directly on our export sourcing desk.
                </p>
              </div>

              <Link
                href="/enquiry"
                className="relative inline-flex items-center justify-center gap-2 h-12 px-7 text-[12.5px] font-bold tracking-wider uppercase text-[#0A192F] bg-white hover:bg-[#F0F7FF] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 shrink-0"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                }}
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
