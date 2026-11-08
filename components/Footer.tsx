'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Phone, Mail, MapPin, ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
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

  // Close footer fabrics sub-menu on outside click
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
          MAIN EDITORIAL FOOTER CANVAS (AGNES TOTH MINIMALISM + AUTHENTIC VIRAL FABRICS DATA)
             - Background: #e8f3e5 (Signature Agnes Toth pale sage linen)
             - Typography: Cormorant Garamond serif & deep forest ink (#2e3937)
             - Content strictly matching brand info:
               1. Newsletter (Headline, Email Input + Angled-Cut Subscribe Button, Subtitle)
               2. Quick Links (Home, About Us, Fabrics, Network, Enquiry, Contact Us)
               3. Contact Details (Address with Google Maps link & Copy, Phone with Copy, Email with Copy)
               4. Bottom Bar (Copyright, Brand Logo, Surat Est. 2012, High-Speed Looms Heritage)
          ================================================================= */}
      <div className="relative bg-[#e8f3e5] text-[#2e3937] pt-10 sm:pt-12 md:pt-14 lg:pt-24 pb-10 sm:pb-12 md:pb-16 border-t border-[#2e3937]/10">

        <div className="max-w-[1720px] mx-auto px-5 sm:px-8 lg:px-14">

          {/* Top Grid: Newsletter (Left/Top) + Authentic Navigation & Contact (Right/Bottom) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-14 xl:gap-16 pb-10 sm:pb-14 lg:pb-20 border-b border-[#2e3937]/15">

            {/* NEWSLETTER MODULE */}
            <div className="md:col-span-6 lg:col-span-6 space-y-4 sm:space-y-5">

              {/* Agnes Toth Editorial Headline */}
              <h2 className="font-heading font-light text-[26px] sm:text-[34px] lg:text-[42px] leading-[1.15] text-[#2e3937] tracking-tight max-w-[500px]">
                Be the first to know when a new weave exists.
              </h2>

              {/* Newsletter Form: Unified Angled-Cut Luxury Styling across Mobile, Tablet & Desktop */}
              <form onSubmit={handleSubmit} className="space-y-2.5 max-w-[480px]">
                <div className="flex flex-row items-center gap-2 sm:gap-2.5">
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
                    className="flex-1 min-w-0 h-11 sm:h-12 bg-transparent border border-[#2e3937] rounded-none px-3.5 sm:px-4 text-[13.5px] sm:text-[14px] font-sans text-[#2e3937] placeholder-[#2e3937]/65 focus:outline-none focus:ring-1 focus:ring-[#2e3937] transition-all"
                  />

                  {/* Signature Angled-Cut Luxury Submit Button with Luminous Shine & Arrow (Identical on Mobile & Desktop) */}
                  <button
                    type="submit"
                    className="relative inline-flex items-center justify-center gap-1.5 sm:gap-2 h-11 sm:h-12 px-4 sm:pl-6 sm:pr-9 text-[11px] sm:text-[12px] font-semibold tracking-[0.14em] sm:tracking-[0.16em] uppercase text-white bg-gradient-to-r from-[#3b6294] via-[#4873aa] to-[#5986bf] hover:from-[#4873aa] hover:via-[#5986bf] hover:to-[#6a97ce] transition-all duration-300 group shadow-[0_2px_12px_rgba(72,115,170,0.3)] hover:shadow-[0_4px_18px_rgba(72,115,170,0.45)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer overflow-hidden flex-shrink-0"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)',
                    }}
                  >
                    <span
                      className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none group-hover:translate-x-[250%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      aria-hidden="true"
                    />
                    <span className="relative z-10 font-sans">SUBSCRIBE</span>
                    <ArrowRight className="relative z-10 w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.2] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                  </button>
                </div>

                {subscribed && (
                  <div className="flex items-center gap-2 text-[#2e3937] text-[13px] font-medium pt-1">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[2.2]" />
                    <span>Thank you. You are registered for direct mill weave releases.</span>
                  </div>
                )}
              </form>

              {/* Newsletter Subtitle (Crisp & Visible on Mobile, Tablet & Desktop) */}
              <p className="text-[12.5px] sm:text-[13px] text-[#707c7a] font-light max-w-sm pt-0.5">
                Subscribe to our newsletter for regular updates.
              </p>
            </div>

            {/* AUTHENTIC 2-COLUMN NAVIGATION & CONTACT DETAILS (Symmetrical on Mobile, Tablet & Desktop) */}
            <nav className="md:col-span-6 lg:col-span-6 grid grid-cols-2 gap-5 sm:gap-8 lg:gap-14 pt-2 md:pt-0" aria-label="Footer Navigation">

              {/* Column 1: Quick Links */}
              <div className="space-y-3.5 sm:space-y-4">
                <h3 className="font-heading text-[17px] sm:text-[19px] font-normal text-[#2e3937] tracking-wide">
                  Quick Links
                </h3>
                <ul className="space-y-2 sm:space-y-2.5 text-[13.5px] sm:text-[14.5px] font-sans text-[#707c7a] font-light">
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
                  
                  {/* Fabrics with Smooth Expandable Sub-Menu */}
                  <li ref={footerFabricsRef} className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <Link href="/fabrics" className="hover:text-[#2e3937] transition-colors">
                        Fabrics
                      </Link>
                      <button
                        type="button"
                        onClick={() => setFooterFabricsOpen((prev) => !prev)}
                        className="p-1 -m-1 text-[#707c7a] hover:text-[#2e3937] transition-colors cursor-pointer focus:outline-none"
                        aria-expanded={footerFabricsOpen}
                        aria-label="Toggle Fabrics Sub-Menu"
                      >
                        <ChevronDown
                          className={`w-3.5 h-3.5 stroke-[2] transition-transform duration-300 ${
                            footerFabricsOpen ? 'rotate-180 text-[#375785]' : ''
                          }`}
                        />
                      </button>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        footerFabricsOpen ? 'max-h-[500px] opacity-100 pt-1 pb-2' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pl-2.5 border-l-2 border-[#375785]/35 space-y-1.5 my-1">
                        <ul className="space-y-1 text-[12px] font-sans">
                          {FABRICS.slice(0, 6).map((fabric) => (
                            <li key={fabric.slug}>
                              <Link
                                href={`/fabrics/${fabric.slug}`}
                                className="text-[#707c7a] hover:text-[#375785] transition-colors block truncate"
                                title={fabric.title}
                              >
                                {fabric.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="pt-1 border-t border-[#2e3937]/10">
                          <Link
                            href="/fabrics"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-[0.12em] uppercase text-[#375785] hover:underline"
                          >
                            <span>Explore All</span>
                            <ArrowRight className="w-2.5 h-2.5" />
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

              {/* Column 2: Contact Details (Address, Phone, Email with Instant Copy & Direct Action) */}
              <div className="space-y-3.5 sm:space-y-4">
                <h3 className="font-heading text-[17px] sm:text-[19px] font-normal text-[#2e3937] tracking-wide">
                  Contact Details
                </h3>
                <div className="space-y-3 sm:space-y-3.5 text-[12px] sm:text-[14px] font-sans text-[#707c7a] font-light leading-relaxed">

                  {/* Address with MapPin Icon, Copy & Google Maps Redirection */}
                  <div className="flex items-start gap-1.5 sm:gap-2 group/address pt-0.5">
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
                      className="space-y-0.5 group/addr block hover:text-[#2e3937] transition-colors cursor-pointer text-[12px] sm:text-[13.5px] leading-snug"
                      title="Click to view location in Google Maps"
                    >
                      <p className="font-medium text-[#2e3937] tracking-wider text-[12px] sm:text-[13.5px] uppercase flex items-center gap-1">
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
                  <div className="pt-1 flex items-center gap-1.5 sm:gap-2 group/phone">
                    <button
                      type="button"
                      onClick={(e) => handleCopy('phone', COMPANY_INFO.phoneDisplay, e)}
                      className="relative group/copy p-1 -ml-1 flex items-center justify-center focus:outline-none cursor-pointer transition-transform hover:scale-110 flex-shrink-0"
                      title="Click icon to copy phone number"
                      aria-label="Copy footer phone number"
                    >
                      {copiedField === 'phone' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.4]" />
                      ) : (
                        <Phone className="w-3.5 h-3.5 text-[#2e3937] stroke-[1.8] flex-shrink-0 transition-colors group-hover/copy:text-[#375785]" />
                      )}
                      <span className={`absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-sans font-medium whitespace-nowrap shadow-md pointer-events-none transition-all duration-200 z-50 ${copiedField === 'phone' ? 'bg-emerald-600 text-white opacity-100' : 'bg-slate-900/90 text-white opacity-0 group-hover/copy:opacity-100'}`}>
                        {copiedField === 'phone' ? 'Copied!' : 'Copy'}
                      </span>
                    </button>
                    <a
                      href={`tel:${COMPANY_INFO.phoneTel}`}
                      className="text-[#2e3937] font-medium hover:underline hover:text-[#375785] transition-colors tracking-tight text-[12.5px] sm:text-[14px]"
                      title="Click to dial directly"
                    >
                      {COMPANY_INFO.phoneDisplay}
                    </a>
                  </div>

                  {/* Email Row */}
                  <div className="flex items-center gap-1.5 sm:gap-2 group/email">
                    <button
                      type="button"
                      onClick={(e) => handleCopy('email', COMPANY_INFO.email, e)}
                      className="relative group/copy p-1 -ml-1 flex items-center justify-center focus:outline-none cursor-pointer transition-transform hover:scale-110 flex-shrink-0"
                      title="Click icon to copy email address"
                      aria-label="Copy footer email address"
                    >
                      {copiedField === 'email' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.4]" />
                      ) : (
                        <Mail className="w-3.5 h-3.5 text-[#2e3937] stroke-[1.8] flex-shrink-0 transition-colors group-hover/copy:text-[#375785]" />
                      )}
                      <span className={`absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-sans font-medium whitespace-nowrap shadow-md pointer-events-none transition-all duration-200 z-50 ${copiedField === 'email' ? 'bg-emerald-600 text-white opacity-100' : 'bg-slate-900/90 text-white opacity-0 group-hover/copy:opacity-100'}`}>
                        {copiedField === 'email' ? 'Copied!' : 'Copy'}
                      </span>
                    </button>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-[#2e3937] font-medium hover:underline underline-offset-2 hover:text-[#375785] transition-colors break-all text-[12px] sm:text-[13.5px]"
                      title="Click to compose email"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>

                </div>
              </div>

            </nav>

          </div>

          {/* DESKTOP & TABLET BOTTOM LEGAL BAR: 3-Column Symmetrical Grid */}
          <div className="hidden md:grid md:grid-cols-3 items-center pt-6 sm:pt-8 lg:pt-10 gap-6 text-[13px] text-[#707c7a]">

            {/* Legal Copyright */}
            <div className="text-left">
              <p className="font-sans font-light">
                &copy; {new Date().getFullYear()} Viral Fabrics | All Rights Reserved.
              </p>
            </div>

            {/* Center Brand Logo */}
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

          {/* MOBILE BOTTOM BAR: Centered Logo, Copyright & Heritage Line */}
          <div className="md:hidden pt-8 pb-2 flex flex-col items-center justify-center text-center space-y-3 text-[#707c7a]">

            {/* Centered Brand Logo */}
            <Link
              href="/"
              className="inline-block relative w-[130px] h-[32px] transition-opacity hover:opacity-85"
              aria-label="Viral Fabrics Home"
            >
              <Image
                src="/assets/uploads/2025/08/logo.png"
                alt="Viral Fabrics"
                fill
                className="object-contain"
              />
            </Link>

            {/* Copyright Notice */}
            <p className="font-sans font-light text-[12.5px] text-[#2e3937]">
              &copy; {new Date().getFullYear()} Viral Fabrics | All Rights Reserved.
            </p>

            {/* Heritage Signature Line */}
            <div className="space-y-0.5 text-[11.5px] text-[#707c7a]">
              <p>
                Surat, Gujarat &bull; Est. 2012
              </p>
              <p className="tracking-wider uppercase text-[11px] text-[#707c7a]/85">
                High-Speed Water-Jet Looms &bull; Export Fabrics
              </p>
            </div>

          </div>

        </div>
      </div>

    </footer>
  );
};
