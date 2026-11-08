'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Check,
  Loader2,
  ShieldCheck,
  Send,
  Home,
  MessageSquare,
  Building2,
  ExternalLink,
  Copy,
  Plane,
  Anchor,
  TrainTrack,
  Gauge,
  Headphones,
  Globe
} from 'lucide-react';
import { COMPANY_INFO } from '@/data/company';

const INQUIRY_TYPES = [
  'Bulk Export Sourcing (FOB / CIF)',
  'Physical Swatch Hanger Kit Request',
  'Custom Lab Dip & Shade Formulation',
  'Mill Visitation Appointment (Surat)',
  'Digital Print & Jacquard Tech Pack',
  'General Commercial Inquiry'
];

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: INQUIRY_TYPES[0],
    message: ''
  });

  const [humanVerified, setHumanVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (field: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2200);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!humanVerified) {
      setErrorMsg('Please verify the "I am a human" security check.');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          product: `[Contact Desk] ${formData.inquiryType}`,
          message: formData.message,
          captchaToken: 'verified-human'
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit message');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: INQUIRY_TYPES[0],
        message: ''
      });
      setHumanVerified(false);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error transmitting your message. Please reach our Surat mill desk directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] pt-[68px] sm:pt-[72px]">
      
      {/* =====================================================================
          1. TOP BANNER WITH FABRIC ROLLS & TRUST BADGES (Matching Site Standard)
         ===================================================================== */}
      <section className="relative py-7 sm:py-9 lg:py-11 flex items-center overflow-hidden bg-[#0A192F]">
        
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
              className="inline-flex items-center gap-1 text-[#006DB6] hover:text-brand-blue-hover transition-colors font-medium tracking-wide"
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
          3. MAIN HAUTE-COUTURE SILK CANVAS SECTION
         ===================================================================== */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
        
        {/* Authentic Silk Waves Background Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/enquiry-silk-bg.jpg"
            alt="Viral Fabrics Silk Background Canvas"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-95"
            priority
          />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] xl:max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12 sm:space-y-16">
          
          {/* Centered Editorial Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <div className="inline-flex items-center gap-2 justify-center">
              <div className="w-6 h-[1.5px] bg-[#1E5FA8]" />
              <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.24em] uppercase text-[#1E5FA8]">
                DIRECT MILL CONSULTATION &amp; VISITATION
              </span>
              <div className="w-6 h-[1.5px] bg-[#1E5FA8]" />
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-normal text-slate-900 tracking-tight leading-[1.15]">
              Get In Touch With <span className="text-[#1E5FA8] italic font-normal">Our Team</span>
            </h2>

            <p className="font-sans text-[13.5px] sm:text-[14.5px] text-slate-600 font-normal leading-relaxed max-w-xl mx-auto">
              We welcome fashion houses, apparel manufacturers, and textile buyers to consult our sales desk or schedule an on-site visit to our Surat weaving plant.
            </p>
          </div>

          {/* ===================================================================
              4. TWO-COLUMN SPLIT: INTERACTIVE CARDS (LEFT) + DIRECT FORM (RIGHT)
             =================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-[1360px] mx-auto">
            
            {/* LEFT COLUMN: 4 High-Trust Interactive Contact Cards */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-5">
              
              {/* Card 1: Surat Weaving Mill Address */}
              <div className="p-6 sm:p-7 rounded-[24px] bg-white/85 backdrop-blur-md border border-[#EAE0D5] shadow-[0_8px_24px_rgba(15,23,42,0.05)] hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)] transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#E8F3FA] border border-[#C5E1F5] text-[#006DB6] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <MapPin className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <span className="font-sans text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#006DB6] block">
                      MANUFACTURING FACILITY
                    </span>
                    <h3 className="font-heading text-xl font-normal text-slate-900">
                      Surat Weaving Plant
                    </h3>
                    <p className="font-sans text-[13px] sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                      {COMPANY_INFO.address.line1}, {COMPANY_INFO.address.line2}, {COMPANY_INFO.address.line3}, {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} – {COMPANY_INFO.address.pin}, India
                    </p>
                    <div className="pt-2">
                      <a
                        href={COMPANY_INFO.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#006DB6] hover:text-[#00528A] transition-colors group/link"
                      >
                        <span>Open in Google Maps</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Phone & WhatsApp */}
              <div className="p-6 sm:p-7 rounded-[24px] bg-white/85 backdrop-blur-md border border-[#EAE0D5] shadow-[0_8px_24px_rgba(15,23,42,0.05)] hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)] transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#E8F3FA] border border-[#C5E1F5] text-[#006DB6] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <span className="font-sans text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#006DB6] block">
                      TELEPHONE &amp; WHATSAPP
                    </span>
                    <h3 className="font-heading text-xl font-normal text-slate-900">
                      Commercial &amp; Export Sales
                    </h3>
                    <p className="font-sans text-[13px] text-slate-600 leading-relaxed font-normal">
                      Instant response for price estimations, fabric lab dip requests, and container sailings.
                    </p>
                    <div className="flex flex-wrap items-center gap-2.5 pt-2">
                      <a
                        href={`tel:${COMPANY_INFO.phoneTel}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#006DB6] text-white text-[12px] font-medium hover:bg-[#005691] transition-all shadow-xs"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{COMPANY_INFO.phoneDisplay}</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy('phone', COMPANY_INFO.phoneDisplay)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11.5px] font-medium transition-colors cursor-pointer"
                        title="Copy phone number"
                      >
                        {copiedField === 'phone' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
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
                </div>
              </div>

              {/* Card 3: Email Desk */}
              <div className="p-6 sm:p-7 rounded-[24px] bg-white/85 backdrop-blur-md border border-[#EAE0D5] shadow-[0_8px_24px_rgba(15,23,42,0.05)] hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)] transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#E8F3FA] border border-[#C5E1F5] text-[#006DB6] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <span className="font-sans text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#006DB6] block">
                      OFFICIAL EMAIL DESK
                    </span>
                    <h3 className="font-heading text-xl font-normal text-slate-900">
                      Corporate Correspondence
                    </h3>
                    <p className="font-sans text-[13px] text-slate-600 leading-relaxed font-normal">
                      Submit tech packs, digital print artworks, or purchase orders directly to our mill desk.
                    </p>
                    <div className="flex flex-wrap items-center gap-2.5 pt-2">
                      <a
                        href={`mailto:${COMPANY_INFO.email}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#006DB6] text-white text-[12px] font-medium hover:bg-[#005691] transition-all shadow-xs"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{COMPANY_INFO.email}</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy('email', COMPANY_INFO.email)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11.5px] font-medium transition-colors cursor-pointer"
                        title="Copy email address"
                      >
                        {copiedField === 'email' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
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
                </div>
              </div>

              {/* Card 4: Operating Hours & Dispatch */}
              <div className="p-6 sm:p-7 rounded-[24px] bg-white/85 backdrop-blur-md border border-[#EAE0D5] shadow-[0_8px_24px_rgba(15,23,42,0.05)] hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)] transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#E8F3FA] border border-[#C5E1F5] text-[#006DB6] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Clock className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <span className="font-sans text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#006DB6] block">
                      MILL TIMINGS &amp; DISPATCH
                    </span>
                    <h3 className="font-heading text-xl font-normal text-slate-900">
                      Operating Hours
                    </h3>
                    <div className="space-y-1 pt-0.5 text-slate-700 font-sans text-[13px]">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Monday – Saturday:</span>
                        <span className="font-semibold text-slate-900">9:00 AM – 7:30 PM IST</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-500">
                        <span>Sunday:</span>
                        <span className="italic">Closed (Inquiries queued)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Luxury Direct Contact & Sourcing Message Form */}
            <div className="lg:col-span-7">
              <div className="bg-white/95 backdrop-blur-md rounded-[28px] sm:rounded-[32px] p-7 sm:p-10 border border-white/90 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                
                {submitted ? (
                  <div className="py-12 text-center space-y-6 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                      <Check className="w-8 h-8 stroke-[2.2]" />
                    </div>
                    <div className="space-y-2.5">
                      <span className="font-sans text-[11px] font-bold tracking-[0.24em] uppercase text-emerald-700">
                        TRANSMISSION RECEIVED
                      </span>
                      <h3 className="font-heading text-3xl font-light text-slate-900">
                        Thank You For Reaching Out
                      </h3>
                      <p className="font-sans text-[14px] text-slate-600 max-w-md mx-auto leading-relaxed">
                        Your message has been assigned to our Surat commercial export desk. A technical representative will respond within 24 business hours.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white text-[12.5px] font-medium hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span>Send Another Message</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div className="border-b border-slate-100 pb-4">
                      <span className="font-sans text-[10.5px] font-bold tracking-[0.22em] uppercase text-[#1E5FA8] block">
                        DIRECT COMMUNICATION
                      </span>
                      <h3 className="font-heading text-2xl sm:text-3xl font-light text-slate-900 tracking-tight mt-0.5">
                        Send A Direct Message
                      </h3>
                      <p className="font-sans text-[13px] text-slate-500 mt-1">
                        Submit your technical requirements, lab dip schedule, or visit request.
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                        {errorMsg}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-slate-700">
                          Your Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rajesh Singhania"
                          className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-[13.5px] placeholder:text-slate-400 focus:bg-white focus:border-[#006DB6] focus:ring-2 focus:ring-[#006DB6]/15 outline-none transition-all"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-slate-700">
                          Corporate Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-[13.5px] placeholder:text-slate-400 focus:bg-white focus:border-[#006DB6] focus:ring-2 focus:ring-[#006DB6]/15 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-slate-700">
                          Phone / WhatsApp <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-[13.5px] placeholder:text-slate-400 focus:bg-white focus:border-[#006DB6] focus:ring-2 focus:ring-[#006DB6]/15 outline-none transition-all"
                        />
                      </div>

                      {/* Purpose */}
                      <div className="space-y-1.5">
                        <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-slate-700">
                          Inquiry Purpose
                        </label>
                        <select
                          value={formData.inquiryType}
                          onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                          className="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-[13px] focus:bg-white focus:border-[#006DB6] focus:ring-2 focus:ring-[#006DB6]/15 outline-none transition-all cursor-pointer"
                        >
                          {INQUIRY_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-slate-700">
                        Message / Specifications <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail your fabric type (BSY, Jacquard, Crepe, Satin), required GSM, expected volume (meters), or desired mill visitation dates..."
                        className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-[13.5px] placeholder:text-slate-400 focus:bg-white focus:border-[#006DB6] focus:ring-2 focus:ring-[#006DB6]/15 outline-none transition-all resize-none leading-relaxed"
                      />
                    </div>

                    {/* Human Verification & Submit Action */}
                    <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={humanVerified}
                          onChange={(e) => setHumanVerified(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-300 accent-[#006DB6] cursor-pointer"
                        />
                        <span className="text-[12.5px] font-medium text-slate-700">
                          I am a human
                        </span>
                        <ShieldCheck className="w-4 h-4 text-emerald-600 stroke-[2] ml-0.5" />
                      </label>

                      {/* Haute-Couture Submit Button with Angled Cut */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="relative inline-flex items-center justify-center gap-2.5 h-12 pl-7 pr-9 text-[13.5px] font-semibold text-white bg-gradient-to-r from-[#0C2D50] via-[#0E3B68] to-[#164E87] hover:from-[#081F38] hover:via-[#0A2E52] hover:to-[#0F3B66] active:scale-[0.98] transition-all duration-300 shadow-[0_6px_20px_rgba(14,59,104,0.35)] hover:shadow-[0_8px_26px_rgba(14,59,104,0.5)] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group overflow-hidden w-full sm:w-auto"
                        style={{
                          clipPath: 'polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
                        }}
                      >
                        {/* 1px Razor Overlay */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                          <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                          <line x1="100%" y1="0" x2="calc(100% - 12px)" y2="100%" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
                          <line x1="calc(100% - 12px)" y1="calc(100% - 0.5px)" x2="0" y2="calc(100% - 0.5px)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                          <line x1="0.5" y1="100%" x2="0.5" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                        </svg>

                        {/* Luminous Shine Sweep */}
                        <span
                          className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none group-hover:translate-x-[250%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                          aria-hidden="true"
                        />

                        <span className="relative z-10 flex items-center gap-2">
                          {loading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-white" />
                              <span>Transmitting...</span>
                            </>
                          ) : (
                            <>
                              <span className="tracking-wide font-medium">Send Message</span>
                              <ArrowRight className="w-4 h-4 stroke-[2.2] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                            </>
                          )}
                        </span>
                      </button>

                    </div>

                  </form>
                )}

              </div>
            </div>

          </div>

          {/* ===================================================================
              5. SURAT WEAVING PLANT SATELLITE & GOOGLE MAPS SHOWCASE
             =================================================================== */}
          <div className="max-w-[1360px] mx-auto space-y-5 pt-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE0D5] pb-3">
              <div>
                <span className="font-sans text-[11px] font-bold tracking-[0.24em] uppercase text-[#1E5FA8] block">
                  SURAT WEAVING MILL COORDINATES
                </span>
                <h3 className="font-heading text-2xl font-light text-slate-900">
                  Facility Location &amp; Directions
                </h3>
              </div>
              <p className="font-sans text-[12.5px] text-slate-500">
                Plot 37, 38, Krishna Industrial Society, Bamroli, Surat, Gujarat
              </p>
            </div>

            {/* Elevated Map Showcase Container */}
            <div className="relative w-full h-[440px] sm:h-[500px] lg:h-[540px] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-[#EAE0D5] shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
              
              {/* Floating Translucent Coordinates Pill (Top Left) */}
              <div className="absolute top-4 left-4 z-20 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 shadow-md">
                <div className="w-8 h-8 rounded-lg bg-[#006DB6] text-white flex items-center justify-center font-bold text-xs">
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
                  className="ml-2 text-xs text-[#006DB6] hover:underline font-medium inline-flex items-center gap-0.5"
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
              <div className="p-4 sm:p-5 rounded-2xl bg-white/75 backdrop-blur-md border border-[#EAE0D5] flex items-center gap-3.5 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#E8F3FA] text-[#006DB6] flex items-center justify-center shrink-0">
                  <Plane className="w-5 h-5 stroke-[1.8]" />
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

              <div className="p-4 sm:p-5 rounded-2xl bg-white/75 backdrop-blur-md border border-[#EAE0D5] flex items-center gap-3.5 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#E8F3FA] text-[#006DB6] flex items-center justify-center shrink-0">
                  <Anchor className="w-5 h-5 stroke-[1.8]" />
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

              <div className="p-4 sm:p-5 rounded-2xl bg-white/75 backdrop-blur-md border border-[#EAE0D5] flex items-center gap-3.5 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#E8F3FA] text-[#006DB6] flex items-center justify-center shrink-0">
                  <TrainTrack className="w-5 h-5 stroke-[1.8]" />
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

          </div>

        </div>
      </section>

    </main>
  );
}
