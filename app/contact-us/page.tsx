import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { MapPin, Phone, Mail, ArrowRight, Clock, Building } from 'lucide-react';
import { COMPANY_INFO } from '@/data/company';

export const metadata: Metadata = {
  title: 'Contact Surat Facility | Viral Fabrics Surat - Manufacturing Plant & Sales',
  description: 'Contact Viral Fabrics Pvt. Ltd. at Krishna Industrial Society, Bamroli, Surat. Direct Phone: +91 94279 88999, Email: viralfabrics@yahoo.com.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. AGNES EDITORIAL HERO */}
      <section className="relative min-h-[460px] sm:min-h-[520px] flex items-center bg-[#071120] overflow-hidden pt-28 sm:pt-36">
        <Image
          src="/assets/uploads/2025/09/contact-banner-1.png"
          alt="Contact Surat Facility - Viral Fabrics"
          fill
          className="object-cover object-center scale-105"
          priority
        />
        
        {/* Editorial Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/95 via-[#0A192F]/75 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/85 via-transparent to-transparent z-10" />
        
        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 w-full text-white z-20 py-16">
          <div className="max-w-2xl space-y-4">
            <span className="agnes-eyebrow !text-sky-300">
              Surat Manufacturing &amp; Sales Headquarters
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1]">
              Contact Our Facility
            </h1>
            <p className="text-slate-200 text-base sm:text-lg font-light leading-relaxed">
              We welcome fashion designers, apparel brands, and international importers to visit our Surat weaving plant or consult directly with our sales desk.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumbs Bar */}
      <div className="bg-[#FAF8F5] border-b border-slate-200/60 py-3.5">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
          <p className="text-[12px] font-medium tracking-luxury uppercase text-slate-500 flex items-center gap-2">
            <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <span className="text-brand-blue">Contact Us</span>
          </p>
        </div>
      </div>

      {/* 2. THREE EDITORIAL CONTACT CARDS */}
      <section className="py-24 sm:py-32 bg-white relative">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-20">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="agnes-eyebrow">
              Direct Channels
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-light text-brand-ink tracking-tight">
              Get In Touch With Our Team
            </h2>
          </div>

          {/* 3 Luxury Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1300px] mx-auto">
            
            {/* Card 1: Mill Location */}
            <div className="bg-slate-50/60 p-8 sm:p-10 rounded-sm border border-slate-200/80 flex flex-col justify-between space-y-6 transition-all duration-300 hover:bg-white hover:shadow-xl hover:border-brand-blue/30">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold tracking-luxury uppercase text-slate-400 block">
                  Manufacturing Facility
                </span>
                <h3 className="font-heading text-2xl text-brand-ink font-normal">
                  Surat Weaving Plant
                </h3>
                <p className="text-[14px] text-slate-600 font-light leading-relaxed">
                  {COMPANY_INFO.address.line1}, {COMPANY_INFO.address.line2}, {COMPANY_INFO.address.line3}, {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} {COMPANY_INFO.address.pin}, India
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <a
                  href={COMPANY_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="agnes-textlink text-[11px] text-brand-blue"
                >
                  View Facility Map →
                </a>
              </div>
            </div>

            {/* Card 2: Phone & WhatsApp */}
            <div className="bg-slate-50/60 p-8 sm:p-10 rounded-sm border border-slate-200/80 flex flex-col justify-between space-y-6 transition-all duration-300 hover:bg-white hover:shadow-xl hover:border-brand-blue/30">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold tracking-luxury uppercase text-slate-400 block">
                  Telephone &amp; WhatsApp
                </span>
                <h3 className="font-heading text-2xl text-brand-ink font-normal">
                  Direct Mill Line
                </h3>
                <p className="text-[14px] text-slate-600 font-light leading-relaxed">
                  Direct line for commercial inquiries, price estimations, and sampling dispatch tracking:
                </p>
                <p className="text-xl font-heading text-brand-blue font-medium">
                  {COMPANY_INFO.phoneDisplay}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <a
                  href={`tel:${COMPANY_INFO.phoneTel}`}
                  className="agnes-textlink text-[11px] text-brand-blue"
                >
                  Call Now →
                </a>
              </div>
            </div>

            {/* Card 3: Email Desk */}
            <div className="bg-slate-50/60 p-8 sm:p-10 rounded-sm border border-slate-200/80 flex flex-col justify-between space-y-6 transition-all duration-300 hover:bg-white hover:shadow-xl hover:border-brand-blue/30">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold tracking-luxury uppercase text-slate-400 block">
                  Corporate Correspondence
                </span>
                <h3 className="font-heading text-2xl text-brand-ink font-normal">
                  Official Email Desk
                </h3>
                <p className="text-[14px] text-slate-600 font-light leading-relaxed">
                  Submit tech packs, digital print artwork, or purchase orders directly:
                </p>
                <p className="text-base font-medium text-brand-ink tracking-tight break-all">
                  {COMPANY_INFO.email}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="agnes-textlink text-[11px] text-brand-blue"
                >
                  Send Email →
                </a>
              </div>
            </div>

          </div>

          {/* Full-Width Google Maps Embed with Clean Framing */}
          <div className="max-w-[1300px] mx-auto space-y-4 pt-8">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="agnes-eyebrow">
                Surat Coordinates &amp; Map
              </span>
              <span className="text-[12px] text-slate-400">
                Plot 37, 38, Krishna Industrial Society, Bamroli, Surat
              </span>
            </div>

            <div className="w-full h-[450px] sm:h-[520px] rounded-sm overflow-hidden border border-slate-200 shadow-md">
              <iframe
                src="https://maps.google.com/maps?q=VIRAL%20FABRICS%20PVT.%20LTD%20Plot%2037%2C38%20%2C%20Krishna%20Industrial.%20Society%2C%20Opposite%20Umiya%20Residency%2C%20Near%20Milan%20Point%2C%20Bamroli%20-%20Vadod%20Road%2C%20Bamroli%2C%20Pandesara%2C%20Surat.%20Pin%20%3A%20394210&t=m&z=10&output=embed&iwloc=near"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="VIRAL FABRICS PVT. LTD Surat Facility Google Map"
              />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
