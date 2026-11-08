'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Phone, Mail, MapPin, ArrowRight, ArrowUpRight, ChevronRight, ChevronDown } from 'lucide-react';
import { COMPANY_INFO } from '@/data/company';
import { FABRICS } from '@/data/fabrics';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copiedField, setCopiedField] = useState<'phone' | 'email' | 'address' | null>(null);
  const [footerFabricsOpen, setFooterFabricsOpen] = useState(false);
  const footerFabricsRef = React.useRef<HTMLLIElement>(null);

  const fullAddress = `${COMPANY_INFO.name}, Plot 37, 38, Krishna Industrial Society, Opposite Umiya Residency, Near Milan Point, Bamroli – Vadod Road, Bamroli, Pandesara, Surat, Gujarat 394210, India`;
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=VIRAL+FABRICS+PVT+LTD+Plot+37+38+Krishna+Industrial+Society+Bamroli+Surat+394210';

  const handleCopy = async (type: 'phone' | 'email' | 'address', text: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        copied = true;
      }
    } catch {
      // Fallback below if clipboard API is restricted
    }

    if (!copied) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        copied = true;
      } catch (err2) {
        console.warn('Fallback copy failed:', err2);
      }
    }

    if (copied) {
      setCopiedField(type);
      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    }
  };

  // Close footer fabrics side menu on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (footerFabricsRef.current && !footerFabricsRef.current.contains(e.target as Node)) {
        setFooterFabricsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full">

      {/* =================================================================
          1. MAIN EDITORIAL FOOTER CANVAS (AGNES TOTH UI/UX + VIRAL FABRICS DATA)
             - Background: #e8f3e5 (Exact signature Agnes Toth pale sage linen)
             - Clean, pure, serene aesthetic (no video overlay)
             - Typography: Cormorant Garamond serif & deep forest ink (#2e3937)
             - Data: STRICTLY authentic Viral Fabrics content:
               Quick Links, Contact Details, Newsletter, Copyright
          ================================================================= */}
      <div className="relative bg-[#e8f3e5] text-[#2e3937] pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 border-t border-[#2e3937]/10">

        <div className="max-w-[1720px] mx-auto px-5 sm:px-8 lg:px-14">

          {/* Top Grid: Newsletter Module (Left) + Authentic Columns (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 pb-16 sm:pb-20 lg:pb-24 border-b border-[#2e3937]/15">

            {/* LEFT COLUMN: Agnes Toth Newsletter Subscription */}
            <div className="lg:col-span-6 space-y-6">

              {/* Agnes Toth Editorial Headline */}
              <h2 className="font-heading font-light text-[28px] sm:text-[38px] lg:text-[44px] leading-[1.12] sm:leading-[1.1] text-[#2e3937] tracking-tight max-w-[500px]">
                Be the first to know when a new weave exists.
              </h2>

              {/* Newsletter Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5 max-w-[480px]">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <label htmlFor="footer-email" className="sr-only">
                    Your Email Address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email Address"
                    required
                    className="flex-1 h-12 bg-transparent border border-[#2e3937] rounded-[2px] px-4 text-[14px] font-sans text-[#2e3937] placeholder-[#2e3937]/65 focus:outline-none focus:ring-1 focus:ring-[#2e3937] transition-all"
                  />

                  {/* Desktop Submit Button: Original Angled Luminous Blue Button (Refined Medium Slate-Blue Gradient) */}
                  <button
                    type="submit"
                    className="hidden lg:inline-flex relative items-center justify-center gap-2 h-12 pl-6 pr-9 text-[12px] font-semibold tracking-[0.16em] uppercase text-white bg-gradient-to-r from-[#3b6294] via-[#4873aa] to-[#5986bf] hover:from-[#4873aa] hover:via-[#5986bf] hover:to-[#6a97ce] transition-all duration-300 group shadow-[0_2px_12px_rgba(72,115,170,0.3)] hover:shadow-[0_4px_18px_rgba(72,115,170,0.45)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer overflow-hidden"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)',
                    }}
                  >
                    <span
                      className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none group-hover:translate-x-[250%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      aria-hidden="true"
                    />
                    <span className="relative z-10 font-sans">SUBSCRIBE</span>
                    <ArrowRight className="relative z-10 w-3.5 h-3.5 stroke-[2.2] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                  </button>

                  {/* Mobile Submit Button */}
                  <button
                    type="submit"
                    className="lg:hidden w-[130px] h-11 bg-gradient-to-r from-[#3b6294] to-[#5986bf] hover:from-[#4873aa] hover:to-[#6a97ce] active:scale-[0.98] text-white rounded-[2px] text-[12px] font-sans font-medium tracking-[0.16em] uppercase transition-all flex items-center justify-center cursor-pointer shadow-sm"
                  >
                    SUBSCRIBE
                  </button>
                </div>

                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded-[2px] border-[#2e3937] accent-[#2e3937] cursor-pointer"
                  />
                  <span className="text-[13px] text-[#707c7a] font-sans">
                    I am a human
                  </span>
                </label>

                {subscribed && (
                  <div className="flex items-center gap-2 text-[#2e3937] text-[13px] font-medium pt-1">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[2.2]" />
                    <span>Thank you. You are registered for direct mill weave releases.</span>
                  </div>
                )}
              </form>

              {/* Exact Copy on Desktop */}
              <p className="hidden lg:block text-[13px] text-[#707c7a] font-light max-w-sm pt-1">
                Subscribe to our newsletter for regular updates.
              </p>
            </div>

            {/* DESKTOP NAVIGATION: Original Clean 2-Column Side-by-Side Layout (Zero Desktop Gaps) */}
            <nav className="hidden lg:grid lg:col-span-6 grid-cols-2 gap-10 sm:gap-12 lg:gap-16" aria-label="Desktop Footer Navigation">

              {/* Column 1: Quick Links */}
              <div className="space-y-4">
                <h3 className="font-heading text-[18px] sm:text-[19px] font-normal text-[#2e3937] tracking-wide">
                  Quick Links
                </h3>
                <ul className="space-y-2.5 text-[14.5px] font-sans text-[#707c7a] font-light">
                  <li>
                    <Link href="/" className="hover:text-[#2e3937] transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about-us" className="hover:text-[#2e3937] transition-colors">
                      About Us
                    </Link>
                  </li>
                  {/* Fabrics with Smooth In-Flow Expandable Sub-Menu */}
                  <li ref={footerFabricsRef} className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setFooterFabricsOpen((prev) => !prev)}
                        className="flex items-center gap-1.5 text-left hover:text-[#2e3937] transition-colors cursor-pointer group/btn focus:outline-none"
                        aria-expanded={footerFabricsOpen}
                        aria-label="Toggle Fabrics Sub-Menu"
                      >
                        <span className={footerFabricsOpen ? 'text-[#375785] font-medium' : ''}>
                          Fabrics
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 stroke-[2] transition-transform duration-300 ${
                            footerFabricsOpen ? 'rotate-180 text-[#375785]' : 'text-[#707c7a] group-hover/btn:text-[#2e3937]'
                          }`}
                        />
                      </button>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        footerFabricsOpen ? 'max-h-[500px] opacity-100 pt-1 pb-2' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pl-3 border-l-2 border-[#375785]/35 space-y-2 my-1">
                        <div className="flex items-center justify-between text-[10px] font-semibold tracking-[0.16em] uppercase text-[#375785] font-sans pb-1">
                          <span>Export Qualities</span>
                          <span className="text-[#707c7a] font-normal normal-case">10 Types</span>
                        </div>

                        <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[12.5px] font-sans">
                          {FABRICS.map((fabric) => (
                            <li key={fabric.slug}>
                              <Link
                                href={`/fabrics/${fabric.slug}`}
                                className="text-[#707c7a] hover:text-[#375785] hover:font-medium transition-colors flex items-center gap-1 py-0.5 truncate block"
                                title={fabric.title}
                              >
                                <span className="w-1 h-1 rounded-full bg-[#375785]/50 flex-shrink-0" />
                                <span className="truncate">{fabric.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-1.5 border-t border-[#2e3937]/10">
                          <Link
                            href="/fabrics"
                            className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase text-[#375785] hover:text-[#2c4973] hover:underline font-sans"
                          >
                            <span>Explore All Fabrics</span>
                            <ArrowRight className="w-3 h-3 transition-transform hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link href="/network" className="hover:text-[#2e3937] transition-colors">
                      Network
                    </Link>
                  </li>
                  <li>
                    <Link href="/enquiry" className="hover:text-[#2e3937] transition-colors">
                      Enquiry
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact-us" className="hover:text-[#2e3937] transition-colors">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 2: Contact Details */}
              <div className="space-y-4">
                <h3 className="font-heading text-[18px] sm:text-[19px] font-normal text-[#2e3937] tracking-wide">
                  Contact Details
                </h3>
                <div className="space-y-3.5 text-[14px] font-sans text-[#707c7a] font-light leading-relaxed">

                  {/* Address with MapPin Icon, Instant Copy & Google Maps Redirection */}
                  <div className="flex items-start gap-2 group/address pt-0.5">
                    <button
                      type="button"
                      onClick={(e) => handleCopy('address', fullAddress, e)}
                      className="relative group/copy p-1 -ml-1 mt-0.5 flex items-center justify-center focus:outline-none cursor-pointer transition-transform hover:scale-110 flex-shrink-0"
                      title="Click icon to copy full facility address"
                      aria-label="Copy footer address"
                    >
                      {copiedField === 'address' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.4]" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 text-[#2e3937] stroke-[1.8] flex-shrink-0 transition-colors group-hover/copy:text-[#375785]" />
                      )}
                      <span className={`absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-sans font-medium whitespace-nowrap shadow-md pointer-events-none transition-all duration-200 z-50 ${copiedField === 'address' ? 'bg-emerald-600 text-white opacity-100' : 'bg-slate-900/90 text-white opacity-0 group-hover/copy:opacity-100'}`}>
                        {copiedField === 'address' ? 'Copied!' : 'Copy'}
                      </span>
                    </button>

                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="space-y-0.5 group/addr block hover:text-[#2e3937] transition-colors cursor-pointer"
                      title="Click to view location in Google Maps"
                    >
                      <p className="font-medium text-[#2e3937] tracking-wider text-[13.5px] uppercase flex items-center gap-1.5">
                        <span>VIRAL FABRICS</span>
                        <ArrowUpRight className="w-3 h-3 text-[#375785] opacity-0 group-hover/addr:opacity-100 transition-opacity stroke-[2]" />
                      </p>
                      <p>Plot 37, 38, Krishna Industrial Society,</p>
                      <p>Opposite Umiya Residency, Near Milan Point,</p>
                      <p>Bamroli – Vadod Road, Bamroli,</p>
                      <p>Pandesara, Surat. Pin : 394210</p>
                    </a>
                  </div>

                  {/* Phone Row */}
                  <div className="pt-2 flex items-center gap-2 group/phone">
                    <button
                      type="button"
                      onClick={(e) => handleCopy('phone', COMPANY_INFO.phoneDisplay, e)}
                      className="relative group/copy p-1 -ml-1 flex items-center justify-center focus:outline-none cursor-pointer transition-transform hover:scale-110"
                      title="Click icon to copy phone number"
                      aria-label="Copy footer phone number"
                    >
                      {copiedField === 'phone' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.4]" />
                      ) : (
                        <Phone className="w-3.5 h-3.5 text-[#2e3937] stroke-[1.8] flex-shrink-0 transition-colors group-hover/copy:text-[#375785]" />
                      )}
                      <span className={`absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-sans font-medium whitespace-nowrap shadow-md pointer-events-none transition-all duration-200 z-50 ${copiedField === 'phone' ? 'bg-emerald-600 text-white opacity-100' : 'bg-slate-900/90 text-white opacity-0'}`}>
                        {copiedField === 'phone' ? 'Copied!' : 'Copy'}
                      </span>
                    </button>
                    <a
                      href={`tel:${COMPANY_INFO.phoneTel}`}
                      className="text-[#2e3937] font-medium hover:underline hover:text-[#375785] transition-colors tracking-tight"
                      title="Click to dial directly"
                    >
                      {COMPANY_INFO.phoneDisplay}
                    </a>
                  </div>

                  {/* Email Row */}
                  <div className="flex items-center gap-2 group/email">
                    <button
                      type="button"
                      onClick={(e) => handleCopy('email', COMPANY_INFO.email, e)}
                      className="relative group/copy p-1 -ml-1 flex items-center justify-center focus:outline-none cursor-pointer transition-transform hover:scale-110"
                      title="Click icon to copy email address"
                      aria-label="Copy footer email address"
                    >
                      {copiedField === 'email' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.4]" />
                      ) : (
                        <Mail className="w-3.5 h-3.5 text-[#2e3937] stroke-[1.8] flex-shrink-0 transition-colors group-hover/copy:text-[#375785]" />
                      )}
                      <span className={`absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-sans font-medium whitespace-nowrap shadow-md pointer-events-none transition-all duration-200 z-50 ${copiedField === 'email' ? 'bg-emerald-600 text-white opacity-100' : 'bg-slate-900/90 text-white opacity-0'}`}>
                        {copiedField === 'email' ? 'Copied!' : 'Copy'}
                      </span>
                    </button>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-[#2e3937] font-medium hover:underline underline-offset-2 hover:text-[#375785] transition-colors break-all"
                      title="Click to compose email"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>

                </div>
              </div>

            </nav>

            {/* MOBILE NAVIGATION: Symmetrical 2x2 Grid Matching Agnes Toth Reference */}
            <nav className="lg:hidden col-span-1 grid grid-cols-2 gap-x-5 sm:gap-x-8 gap-y-9 pt-2" aria-label="Mobile Footer Navigation">

              {/* Mobile Col 1: Navigation */}
              <div className="space-y-3.5">
                <h3 className="font-heading text-[17px] font-normal text-[#2e3937] tracking-wide">
                  Navigation
                </h3>
                <ul className="space-y-2 text-[13.5px] font-sans text-[#5a6663]">
                  <li>
                    <Link href="/" className="hover:text-[#2e3937] transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about-us" className="hover:text-[#2e3937] transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/fabrics" className="hover:text-[#2e3937] transition-colors">
                      Fabrics
                    </Link>
                  </li>
                  <li>
                    <Link href="/network" className="hover:text-[#2e3937] transition-colors">
                      Network
                    </Link>
                  </li>
                  <li>
                    <Link href="/enquiry" className="hover:text-[#2e3937] transition-colors">
                      Enquiry
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact-us" className="hover:text-[#2e3937] transition-colors">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Mobile Col 2: Export Weaves */}
              <div className="space-y-3.5">
                <h3 className="font-heading text-[17px] font-normal text-[#2e3937] tracking-wide">
                  Export Weaves
                </h3>
                <ul className="space-y-2 text-[13.5px] font-sans text-[#5a6663]">
                  <li>
                    <Link href="/fabrics/crepe-fabrics" className="hover:text-[#2e3937] transition-colors">
                      Crepe Fabrics
                    </Link>
                  </li>
                  <li>
                    <Link href="/fabrics/bsy-fabrics" className="hover:text-[#2e3937] transition-colors">
                      BSY Fabrics
                    </Link>
                  </li>
                  <li>
                    <Link href="/fabrics/satin-fabrics" className="hover:text-[#2e3937] transition-colors">
                      Satin Fabrics
                    </Link>
                  </li>
                  <li>
                    <Link href="/fabrics/recycled-fabrics" className="hover:text-[#2e3937] transition-colors">
                      Recycled Fabrics
                    </Link>
                  </li>
                  <li>
                    <Link href="/fabrics/poly-dobby-fabrics-jacquard" className="hover:text-[#2e3937] transition-colors">
                      Poly Dobby
                    </Link>
                  </li>
                  <li>
                    <Link href="/fabrics" className="inline-flex items-center gap-1 text-[#375785] hover:text-[#2c4973] font-medium text-[12.5px] tracking-wide transition-colors">
                      <span>Explore All</span>
                      <ArrowRight className="w-3 h-3 stroke-[2]" />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Mobile Col 3: Inquiries (Matching Agnes Toth Reference) */}
              <div className="space-y-3.5">
                <h3 className="font-heading text-[18px] font-normal text-[#2e3937] tracking-wide">
                  Inquiries
                </h3>
                <div className="space-y-3 text-[13px] font-sans text-[#707c7a] font-light leading-relaxed">
                  
                  {/* Phone */}
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#2e3937] font-medium block">Direct Line</span>
                    <a
                      href={`tel:${COMPANY_INFO.phoneTel}`}
                      className="text-[#2e3937] font-normal hover:underline text-[12.5px] whitespace-nowrap block pt-0.5"
                    >
                      {COMPANY_INFO.phoneDisplay}
                    </a>
                  </div>

                  {/* Email - Guaranteed Clean Single Line */}
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#2e3937] font-medium block">Email Us</span>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-[#2e3937] font-normal underline underline-offset-2 hover:text-[#375785] text-[12px] whitespace-nowrap block pt-0.5"
                      title={COMPANY_INFO.email}
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>

                  <p className="text-[11px] text-[#707c7a] pt-0.5 leading-snug">
                    Make-To-Order &bull; 100% Confidential
                  </p>
                </div>
              </div>

              {/* Mobile Col 4: Surat Facility */}
              <div className="space-y-3.5">
                <h3 className="font-heading text-[18px] font-normal text-[#2e3937] tracking-wide">
                  Surat Facility
                </h3>
                <div className="space-y-2 text-[12.5px] font-sans text-[#707c7a] font-light leading-relaxed">
                  <div className="flex items-start gap-1.5 group/mobaddr">
                    <button
                      type="button"
                      onClick={(e) => handleCopy('address', fullAddress, e)}
                      className="p-1 -ml-1 mt-0.5 focus:outline-none cursor-pointer text-[#2e3937] hover:text-[#375785] transition-colors"
                      title="Copy address"
                      aria-label="Copy address"
                    >
                      {copiedField === 'address' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.4]" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 stroke-[1.8]" />
                      )}
                    </button>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-[#2e3937] transition-colors"
                      title="Open in Google Maps"
                    >
                      <p className="font-medium text-[#2e3937] tracking-wider text-[11.5px] uppercase">VIRAL FABRICS</p>
                      <p>Plot 37, 38, Krishna Ind.</p>
                      <p>Bamroli – Pandesara,</p>
                      <p>Surat, Gujarat 394210</p>
                      <span className="inline-flex items-center gap-0.5 text-[11px] text-[#375785] font-medium underline pt-0.5">
                        <span>Open Maps</span>
                        <ArrowUpRight className="w-2.5 h-2.5" />
                      </span>
                    </a>
                  </div>
                  <div className="pt-2 text-[11.5px] space-y-0.5 border-t border-[#2e3937]/10">
                    <p className="text-[#2e3937] font-medium">Hours:</p>
                    <p>Mon &ndash; Sat: 9am &ndash; 7:30pm</p>
                    <p className="text-[#707c7a]/80 italic">Sunday: Closed</p>
                  </div>
                </div>
              </div>

            </nav>

          </div>

          {/* DESKTOP BOTTOM LEGAL BAR: Original 3-Column Horizontal Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 items-center pt-8 sm:pt-10 gap-6 text-[13px] text-[#707c7a]">

            {/* Legal Copyright */}
            <div className="text-left">
              <p className="font-sans font-light">
                &copy; {new Date().getFullYear()} Viral Fabrics | All Rights Reserved.
              </p>
            </div>

            {/* Center Brand Logo: Original Refined Size */}
            <div className="flex items-center justify-center">
              <Link
                href="/"
                className="relative flex items-center justify-center transition-opacity hover:opacity-85 py-1"
                aria-label="Viral Fabrics Home"
              >
                <div className="relative w-[145px] sm:w-[160px] h-[38px] sm:h-[44px]">
                  <Image
                    src="/assets/uploads/2025/08/logo.png"
                    alt="Viral Fabrics"
                    fill
                    className="object-contain object-center"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Right: Authentic Surat Mill & Export Heritage Data */}
            <div className="text-right font-sans font-light text-[12.5px] text-[#707c7a] space-y-0.5">
              <p className="tracking-wide text-[#2e3937]/90 font-medium text-[13px]">
                Surat, Gujarat &bull; <span className="font-light italic text-[#707c7a]">Est. 2012</span>
              </p>
              <p className="text-[11.5px] text-[#707c7a] tracking-wider uppercase">
                High-Speed Water-Jet Looms &bull; Export Fabrics
              </p>
            </div>

          </div>

          {/* MOBILE BOTTOM LEGAL BAR: Exact Agnes Toth Centered Monogram & Links */}
          <div className="lg:hidden pt-12 pb-2 flex flex-col items-center justify-center text-center space-y-3.5 text-[#707c7a]">

            {/* Centered Brand Emblem (Matching Agnes Toth monogram emblem) */}
            <Link
              href="/"
              className="inline-block relative w-8 h-7 transition-opacity hover:opacity-85"
              aria-label="Viral Fabrics Home"
            >
              <Image
                src="/assets/brand/vf-emblem.png"
                alt="Viral Fabrics Emblem"
                fill
                className="object-contain"
              />
            </Link>

            {/* Copyright Notice */}
            <p className="font-sans font-light text-[12.5px] text-[#2e3937]">
              &copy; {new Date().getFullYear()} VIRAL FABRICS. All rights reserved.
            </p>

            {/* Privacy Policy & Terms */}
            <div className="flex items-center justify-center gap-3.5 text-[12px] font-light text-[#707c7a]">
              <Link href="/contact-us" className="hover:text-[#2e3937] transition-colors underline-offset-4 hover:underline">
                Privacy Policy
              </Link>
              <span>&middot;</span>
              <Link href="/contact-us" className="hover:text-[#2e3937] transition-colors underline-offset-4 hover:underline">
                Terms &amp; Conditions
              </Link>
            </div>

            {/* Heritage Signature Line */}
            <p className="text-[11px] tracking-wider uppercase text-[#707c7a]/80 pt-0.5">
              Surat Facility &bull; High-Speed Water-Jet Looms &bull; Est. 2012
            </p>

          </div>

        </div>
      </div>

    </footer>
  );
};
