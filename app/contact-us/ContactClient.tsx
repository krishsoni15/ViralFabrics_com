'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  ExternalLink,
  Copy,
  Check,
  Gauge,
  Globe,
  ArrowRight,
  MessageCircle,
  Clock,
  QrCode,
} from 'lucide-react';
import QRCode from 'qrcode';
import { COMPANY_INFO } from '@/data/company';
import { PageHeroBanner } from '@/components/PageHeroBanner';
import { ContactQrModal } from '@/components/contact/ContactQrModal';
import { LogisticsTransitGrid } from '@/components/contact/LogisticsTransitGrid';

const CONTACT_PAGE_BADGES = [
  { icon: Gauge, label: 'Quick Response' },
  { icon: Building2, label: 'Surat Textile Hub' },
  { icon: Globe, label: 'Global Export Desk' },
];

export default function ContactClient() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeQrModal, setActiveQrModal] = useState<'location' | 'phone' | 'email' | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const cardsSectionRef = useRef<HTMLDivElement>(null);

  const [qrUrls, setQrUrls] = useState<{ location: string; phone: string; email: string }>({
    location: '',
    phone: '',
    email: '',
  });

  // Client-side QR code generation for instant mobile scan
  useEffect(() => {
    let isMounted = true;
    const generateQrs = async () => {
      try {
        const locationTarget =
          'https://maps.google.com/?q=VIRAL+FABRICS+PVT+LTD+Plot+37+38+Krishna+Industrial+Society+Bamroli+Surat+394210';
        const phoneTarget =
          'https://wa.me/919427988999?text=' +
          encodeURIComponent('Hello Viral Fabrics, I would like to inquire about fabric sourcing.');
        const emailTarget =
          'mailto:viralfabrics@yahoo.com?subject=' +
          encodeURIComponent('Fabric Sourcing Inquiry - Viral Fabrics');

        const [locQr, phoneQr, mailQr] = await Promise.all([
          QRCode.toDataURL(locationTarget, {
            width: 280,
            margin: 1,
            color: { dark: '#113259', light: '#FFFFFF' },
          }),
          QRCode.toDataURL(phoneTarget, {
            width: 280,
            margin: 1,
            color: { dark: '#113259', light: '#FFFFFF' },
          }),
          QRCode.toDataURL(emailTarget, {
            width: 280,
            margin: 1,
            color: { dark: '#113259', light: '#FFFFFF' },
          }),
        ]);

        if (isMounted) {
          setQrUrls({ location: locQr, phone: phoneQr, email: mailQr });
        }
      } catch (err) {
        console.warn('Notice: QR generation completed with fallback', err);
      }
    };

    generateQrs();
    return () => {
      isMounted = false;
    };
  }, []);

  // Trigger luxury on-load unblur state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 60);
    return () => clearTimeout(timer);
  }, []);

  // Scroll effect: Hero text dissolve, blur & parallax drift (matching agnestoth / home page)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y <= 600) {
            if (heroContentRef.current) {
              const progress = Math.min(1, Math.max(0, y / 260));
              const opacity = 1 - progress;
              const blur = progress * 8;
              const translateY = progress * 22;
              heroContentRef.current.style.opacity = `${opacity}`;
              heroContentRef.current.style.filter = blur > 0.1 ? `blur(${blur}px)` : 'none';
              heroContentRef.current.style.transform =
                translateY > 0.1 ? `translate3d(0, ${translateY}px, 0)` : 'none';
            }
            if (heroMediaRef.current) {
              const parallaxY = -y * 0.16;
              heroMediaRef.current.style.transform = `translate3d(0, ${parallaxY}px, 0)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Staggered reveal for contact cards as they scroll into view
  useEffect(() => {
    const el = cardsSectionRef.current;
    const fallbackTimer = setTimeout(() => setCardsVisible(true), 1500);
    if (!el) return () => clearTimeout(fallbackTimer);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);
    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveQrModal(null);
    };
    if (activeQrModal) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [activeQrModal]);

  const handleCopy = (field: string, text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2400);
    }
  };

  const fullAddress =
    'Plot 37, 38, Krishna Industrial Society, Opposite Umiya Residency, Near Milan Point, Bamroli – Vadod Road, Bamroli, Pandesara, Surat. Pin : 394210';

  return (
    <main className="min-h-screen bg-white">

      {/* Hero Banner with Agnes Toth directional unblur sweep & Breadcrumbs */}
      <PageHeroBanner
        title="Contact Us"
        subtitle="Surat Manufacturing Facility & Global Export Sourcing Desk"
        bgVideo="/videos/contact-hero.mp4"
        bgVideoPoster="/images/enquiry/enquiry-hero-bg.jpg"
        bgAlt="Viral Fabrics Sourcing & Consultation Desk"
        badges={CONTACT_PAGE_BADGES}
      />

      {/* =====================================================================
          3. MAIN CONTACT SECTION: 3 ELEVATED CHEVRON CARDS ON LIGHT SILK CANVAS
         ===================================================================== */}
      <section
        id="contact-cards"
        ref={cardsSectionRef}
        className="relative z-10 overflow-hidden py-16 sm:py-20 lg:py-24 bg-[#F8FAFD] shadow-[0_-25px_60px_rgba(0,0,0,0.22)]"
      >
        {/* Authentic Light Luxury Silk Wave Fabric Canvas Background */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src="/images/network/network-silk-bg.jpg"
            alt="Viral Fabrics Light Silk Fabric Drape"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-30 mix-blend-multiply"
            priority
          />
          {/* Subtle gradient wash for pure legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/90" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] xl:max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12 sm:space-y-16">

          {/* Centered Editorial Header Matching User Reference */}
          <div className="text-center max-w-2xl mx-auto space-y-3.5">
            <span className="text-[11px] sm:text-[12px] font-sans font-bold tracking-[0.24em] text-[#1665C1] uppercase block">
              DIRECT SURAT HEADQUARTERS &amp; MILL DESK
            </span>

            <h2 className="font-heading font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#113259] tracking-tight leading-tight">
              Commercial &amp; Export Sourcing Coordinates
            </h2>

            {/* Geometric Accent Line with Authentic Viral Fabrics Diamond Logo Icon */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <div className="w-12 sm:w-20 h-[2px] bg-gradient-to-r from-transparent to-[#1665C1]" />
              <div className="relative w-6 h-6 flex items-center justify-center">
                <Image
                  src="/assets/brand/viral-mark.png"
                  alt="Viral Fabrics Emblem"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <div className="w-12 sm:w-20 h-[2px] bg-gradient-to-l from-transparent to-[#1665C1]" />
            </div>

            <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#2C4A6F] font-normal leading-relaxed max-w-xl mx-auto pt-1">
              Reach our Surat manufacturing headquarters directly for fabric sampling, bulk production quotations, and mill visitation appointments.
            </p>
          </div>

          {/* ===================================================================
              4. 3-COLUMN CHEVRON CONTACT CARDS (Staggered Scroll Entrance)
             =================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-[1300px] mx-auto pt-6 items-stretch">

            {/* ---------------- CARD 1: LOCATION / ADDRESS ---------------- */}
            <div
              className="relative group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2.5 flex flex-col items-center h-full"
              style={{
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30px, 0)',
                filter: cardsVisible ? 'blur(0px)' : 'blur(10px)',
                transition: 'opacity 900ms cubic-bezier(0.16, 1, 0.3, 1) 0ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 0ms, filter 900ms cubic-bezier(0.16, 1, 0.3, 1) 0ms',
              }}
            >
              {/* Circular Floating Blue Icon Badge */}
              <div className="relative z-20 w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#1E6FC4] to-[#114E91] text-white flex items-center justify-center border-[5px] border-white shadow-[0_10px_24px_rgba(22,101,193,0.38)] -mb-10 sm:-mb-11 group-hover:scale-108 group-hover:shadow-[0_14px_30px_rgba(22,101,193,0.5)] transition-all duration-500 flex-shrink-0">
                <MapPin className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
              </div>

              {/* Pointed Chevron Card Body */}
              <div
                className="w-full flex-1 bg-gradient-to-b from-[#F2F7FB] via-[#EBF3FA] to-[#DFEEF7] border-t border-x border-[#D2E4F2] pt-[72px] sm:pt-20 lg:pt-22 pb-12 sm:pb-14 px-5 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-between shadow-[0_12px_32px_rgba(17,50,89,0.06)] group-hover:shadow-[0_22px_48px_rgba(17,50,89,0.14)] transition-all duration-500"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 36px), 50% 100%, 0 calc(100% - 36px))',
                }}
              >
                <div className="space-y-3.5 w-full flex-1 flex flex-col justify-center">
                  <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-[#1665C1] uppercase block">
                    OUR FACILITY
                  </span>

                  <h3 className="font-heading font-serif text-[20px] sm:text-[22px] font-bold text-[#113259] tracking-wider uppercase leading-snug">
                    VIRAL FABRICS PVT. LTD.
                  </h3>

                  {/* Direct Click to Copy Address */}
                  <div
                    onClick={() => handleCopy('address', fullAddress)}
                    className="cursor-pointer group/addr py-2 px-3 rounded-xl hover:bg-white/70 transition-all duration-200 border border-transparent hover:border-[#C6DCED]"
                    title="Click to copy full address"
                  >
                    <p className="font-sans text-[13.5px] sm:text-[14px] text-[#2C4A6F] leading-[1.75] font-normal max-w-[290px] mx-auto group-hover/addr:text-[#113259]">
                      Plot 37, 38, Krishna Industrial. Society,<br />
                      Opposite Umiya Residency, Near Milan Point,<br />
                      Bamroli – Vadod Road, Bamroli,<br />
                      Pandesara, Surat. Pin : 394210
                    </p>
                    <span className="inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#1665C1] mt-2 opacity-80 group-hover/addr:opacity-100 transition-opacity">
                      {copiedField === 'address' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied to clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Click to copy address</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Simplified & Unified Actions (Primary Action with Signature Angled Cut + QR Mobile Scan) */}
                <div className="pt-4 pb-2 flex items-center justify-center gap-2 w-full flex-shrink-0">
                  <a
                    href={COMPANY_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center justify-center gap-1.5 h-10 sm:h-11 px-3.5 sm:px-5 bg-gradient-to-r from-[#113259] via-[#164273] to-[#1C518C] hover:from-[#0A223E] hover:to-[#143B66] text-white text-[12px] sm:text-[13px] font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 overflow-hidden whitespace-nowrap"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                    }}
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white/85" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveQrModal('location')}
                    className="relative inline-flex items-center justify-center gap-1.5 h-10 sm:h-11 px-3 sm:px-4 bg-white hover:bg-[#F0F6FB] text-[#113259] border border-[#C6DCED] text-[11px] sm:text-[12px] font-semibold transition-all duration-300 shadow-2xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group/qr overflow-hidden whitespace-nowrap"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                    }}
                    title="Scan QR on phone to navigate directly"
                  >
                    <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1665C1] group-hover/qr:scale-110 transition-transform" />
                    <span>QR Code</span>
                  </button>
                </div>
              </div>

              {/* Floating Navy Chevron Accent Line Below Card (Visible on Mobile, Tablet & Desktop) */}
              <div className="flex w-full justify-center mt-3 sm:mt-3.5 flex-shrink-0">
                <svg viewBox="0 0 340 44" className="w-full max-w-[340px] sm:max-w-[380px] h-6 sm:h-7 overflow-visible group-hover:translate-y-0.5 transition-transform duration-500" preserveAspectRatio="none">
                  <polygon points="0,0 170,32 340,0 340,12 170,44 0,12" fill="#113259" />
                </svg>
              </div>
            </div>

            {/* ---------------- CARD 2: CALL US ---------------- */}
            <div
              className="relative group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2.5 flex flex-col items-center h-full"
              style={{
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30px, 0)',
                filter: cardsVisible ? 'blur(0px)' : 'blur(10px)',
                transition: 'opacity 900ms cubic-bezier(0.16, 1, 0.3, 1) 150ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 150ms, filter 900ms cubic-bezier(0.16, 1, 0.3, 1) 150ms',
              }}
            >
              {/* Circular Floating Blue Icon Badge */}
              <div className="relative z-20 w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#1E6FC4] to-[#114E91] text-white flex items-center justify-center border-[5px] border-white shadow-[0_10px_24px_rgba(22,101,193,0.38)] -mb-10 sm:-mb-11 group-hover:scale-108 group-hover:shadow-[0_14px_30px_rgba(22,101,193,0.5)] transition-all duration-500 flex-shrink-0">
                <Phone className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
              </div>

              {/* Pointed Chevron Card Body */}
              <div
                className="w-full flex-1 bg-gradient-to-b from-[#F2F7FB] via-[#EBF3FA] to-[#DFEEF7] border-t border-x border-[#D2E4F2] pt-[72px] sm:pt-20 lg:pt-22 pb-12 sm:pb-14 px-5 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-between shadow-[0_12px_32px_rgba(17,50,89,0.06)] group-hover:shadow-[0_22px_48px_rgba(17,50,89,0.14)] transition-all duration-500"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 36px), 50% 100%, 0 calc(100% - 36px))',
                }}
              >
                <div className="space-y-3 w-full flex-1 flex flex-col justify-center">
                  <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-[#1665C1] uppercase block">
                    DIRECT SALES DESK
                  </span>

                  <h3 className="font-heading font-serif text-[21px] sm:text-[23px] font-bold text-[#113259] tracking-widest uppercase">
                    CALL US
                  </h3>

                  {/* Direct Click to Call or WhatsApp */}
                  <div className="pt-2">
                    <div className="inline-flex flex-col items-center p-2 rounded-xl hover:bg-white/70 transition-all border border-transparent hover:border-[#C6DCED]">
                      <div className="flex items-center justify-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            handleCopy('phone', '91-9427988999');
                            if (typeof window !== 'undefined') {
                              window.location.href = `tel:${COMPANY_INFO.phoneTel}`;
                            }
                          }}
                          className="font-sans text-[22px] sm:text-[25px] font-bold text-[#113259] hover:text-[#1665C1] transition-colors tracking-wide cursor-pointer focus:outline-none"
                          title="Click to dial and copy"
                        >
                          91-9427988999
                        </button>
                        <a
                          href="https://wa.me/919427988999?text=Hello%20Viral%20Fabrics%2C%20I%20would%20like%20to%20inquire%20about%20fabric%20sourcing."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200"
                          title="Chat directly on WhatsApp"
                          aria-label="Chat directly on WhatsApp"
                        >
                          {/* Official Real WhatsApp Brand Emblem */}
                          <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-xs" aria-hidden="true">
                            <path fill="#25D366" d="M12 0C5.373 0 0 5.373 0 12c0 2.118.552 4.108 1.517 5.836L.055 24l6.326-1.424A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                            <path fill="#FFF" fillRule="evenodd" clipRule="evenodd" d="M18.42 16.71c-.24.68-1.4 1.3-1.95 1.38-.5.07-1.12.1-3.23-.77-2.69-1.12-4.43-3.86-4.56-4.04-.13-.18-1.09-1.45-1.09-2.77s.69-1.97.94-2.24c.24-.26.54-.33.72-.33.18 0 .36 0 .52.01.17.01.4-.06.62.48.23.54.78 1.9.85 2.04.07.14.12.3.02.49-.09.19-.14.3-.27.46-.14.16-.29.35-.42.47-.14.14-.29.29-.12.58.16.29.73 1.2 1.57 1.95 1.08.96 1.98 1.26 2.27 1.4.28.14.45.12.62-.07.17-.19.72-.84.92-1.13.19-.29.39-.24.65-.15.26.1.1.66 1.63 1.42.26.1.43.15.5.26.07.12.07.7-.17 1.38z" />
                          </svg>
                        </a>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => handleCopy('phone', '91-9427988999')}
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#1665C1] hover:text-[#0C2544] transition-colors cursor-pointer"
                        >
                          {copiedField === 'phone' ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Phone className="w-3 h-3" />
                              <span>Click to Call &amp; Copy</span>
                            </>
                          )}
                        </button>
                        <span className="text-slate-300 text-xs">&bull;</span>
                        <a
                          href="https://wa.me/919427988999"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-semibold text-[#128C7E] hover:text-[#075E54] hover:underline inline-flex items-center gap-1"
                        >
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" aria-hidden="true">
                            <path fill="#25D366" d="M12 0C5.373 0 0 5.373 0 12c0 2.118.552 4.108 1.517 5.836L.055 24l6.326-1.424A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                            <path fill="#FFF" fillRule="evenodd" clipRule="evenodd" d="M18.42 16.71c-.24.68-1.4 1.3-1.95 1.38-.5.07-1.12.1-3.23-.77-2.69-1.12-4.43-3.86-4.56-4.04-.13-.18-1.09-1.45-1.09-2.77s.69-1.97.94-2.24c.24-.26.54-.33.72-.33.18 0 .36 0 .52.01.17.01.4-.06.62.48.23.54.78 1.9.85 2.04.07.14.12.3.02.49-.09.19-.14.3-.27.46-.14.16-.29.35-.42.47-.14.14-.29.29-.12.58.16.29.73 1.2 1.57 1.95 1.08.96 1.98 1.26 2.27 1.4.28.14.45.12.62-.07.17-.19.72-.84.92-1.13.19-.29.39-.24.65-.15.26.1.1.66 1.63 1.42.26.1.43.15.5.26.07.12.07.7-.17 1.38z" />
                          </svg>
                          <span>WhatsApp</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <p className="font-sans text-[13px] text-[#2C4A6F] leading-relaxed max-w-[280px] mx-auto pt-1">
                    Instant Fabric Pricing &amp; Container Estimates<br />
                    <span className="text-slate-500 text-[12px] font-medium">Mon – Sat: 9:00 AM – 7:30 PM IST</span>
                  </p>
                </div>

                {/* Simplified & Unified Actions (Primary Action with Signature Angled Cut + QR Mobile Scan) */}
                <div className="pt-4 pb-2 flex items-center justify-center gap-2 w-full flex-shrink-0">
                  <a
                    href={`tel:${COMPANY_INFO.phoneTel}`}
                    className="relative inline-flex items-center justify-center gap-1.5 h-10 sm:h-11 px-3.5 sm:px-5 bg-gradient-to-r from-[#113259] via-[#164273] to-[#1C518C] hover:from-[#0A223E] hover:to-[#143B66] text-white text-[12px] sm:text-[13px] font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 overflow-hidden whitespace-nowrap"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                    }}
                  >
                    <Phone className="w-3.5 h-3.5 text-white/85" />
                    <span>Call Desk</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveQrModal('phone')}
                    className="relative inline-flex items-center justify-center gap-1.5 h-10 sm:h-11 px-3 sm:px-4 bg-white hover:bg-[#F0F6FB] text-[#113259] border border-[#C6DCED] text-[11px] sm:text-[12px] font-semibold transition-all duration-300 shadow-2xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group/qr overflow-hidden whitespace-nowrap"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                    }}
                    title="Scan QR to Call or WhatsApp directly on your phone"
                  >
                    <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1665C1] group-hover/qr:scale-110 transition-transform" />
                    <span>QR Code</span>
                  </button>
                </div>
              </div>

              {/* Floating Navy Chevron Accent Line Below Card (Visible on Mobile, Tablet & Desktop) */}
              <div className="flex w-full justify-center mt-3 sm:mt-3.5 flex-shrink-0">
                <svg viewBox="0 0 340 44" className="w-full max-w-[340px] sm:max-w-[380px] h-6 sm:h-7 overflow-visible group-hover:translate-y-0.5 transition-transform duration-500" preserveAspectRatio="none">
                  <polygon points="0,0 170,32 340,0 340,12 170,44 0,12" fill="#113259" />
                </svg>
              </div>
            </div>

            {/* ---------------- CARD 3: WRITE US / EMAIL ---------------- */}
            <div
              className="relative group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2.5 flex flex-col items-center h-full"
              style={{
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30px, 0)',
                filter: cardsVisible ? 'blur(0px)' : 'blur(10px)',
                transition: 'opacity 900ms cubic-bezier(0.16, 1, 0.3, 1) 300ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 300ms, filter 900ms cubic-bezier(0.16, 1, 0.3, 1) 300ms',
              }}
            >
              {/* Circular Floating Blue Icon Badge */}
              <div className="relative z-20 w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#1E6FC4] to-[#114E91] text-white flex items-center justify-center border-[5px] border-white shadow-[0_10px_24px_rgba(22,101,193,0.38)] -mb-10 sm:-mb-11 group-hover:scale-108 group-hover:shadow-[0_14px_30px_rgba(22,101,193,0.5)] transition-all duration-500 flex-shrink-0">
                <Mail className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
              </div>

              {/* Pointed Chevron Card Body */}
              <div
                className="w-full flex-1 bg-gradient-to-b from-[#F2F7FB] via-[#EBF3FA] to-[#DFEEF7] border-t border-x border-[#D2E4F2] pt-[72px] sm:pt-20 lg:pt-22 pb-12 sm:pb-14 px-5 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-between shadow-[0_12px_32px_rgba(17,50,89,0.06)] group-hover:shadow-[0_22px_48px_rgba(17,50,89,0.14)] transition-all duration-500"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 36px), 50% 100%, 0 calc(100% - 36px))',
                }}
              >
                <div className="space-y-3 w-full flex-1 flex flex-col justify-center">
                  <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-[#1665C1] uppercase block">
                    CORPORATE DESK
                  </span>

                  <h3 className="font-heading font-serif text-[21px] sm:text-[23px] font-bold text-[#113259] tracking-widest uppercase">
                    WRITE US
                  </h3>

                  {/* Direct Click to Email or Copy */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        handleCopy('email', COMPANY_INFO.email);
                        if (typeof window !== 'undefined') {
                          window.location.href = `mailto:${COMPANY_INFO.email}`;
                        }
                      }}
                      className="group/email inline-flex flex-col items-center cursor-pointer focus:outline-none p-2 rounded-xl hover:bg-white/70 transition-all border border-transparent hover:border-[#C6DCED] w-full max-w-[280px]"
                      title="Click to compose mail and copy"
                    >
                      <span className="font-sans text-[16px] sm:text-[17.5px] font-bold text-[#113259] group-hover/email:text-[#1665C1] transition-colors tracking-tight break-all">
                        {COMPANY_INFO.email}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#1665C1] mt-1.5 opacity-80 group-hover/email:opacity-100 transition-opacity">
                        {copiedField === 'email' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied to clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Mail className="w-3 h-3" />
                            <span>Click to Email &amp; Copy</span>
                          </>
                        )}
                      </span>
                    </button>
                  </div>

                  <p className="font-sans text-[13px] text-[#2C4A6F] leading-relaxed max-w-[280px] mx-auto pt-1">
                    Submit Tech Packs, POs &amp; Lab Dips<br />
                    <span className="text-slate-500 text-[12px] font-medium">Guaranteed response within 24 business hours</span>
                  </p>
                </div>

                {/* Simplified & Unified Actions (Primary Action with Signature Angled Cut + QR Mobile Scan) */}
                <div className="pt-4 pb-2 flex items-center justify-center gap-2 w-full flex-shrink-0">
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="relative inline-flex items-center justify-center gap-1.5 h-10 sm:h-11 px-3.5 sm:px-5 bg-gradient-to-r from-[#113259] via-[#164273] to-[#1C518C] hover:from-[#0A223E] hover:to-[#143B66] text-white text-[12px] sm:text-[13px] font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 overflow-hidden whitespace-nowrap"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                    }}
                  >
                    <Mail className="w-3.5 h-3.5 text-white/85" />
                    <span>Send Email</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveQrModal('email')}
                    className="relative inline-flex items-center justify-center gap-1.5 h-10 sm:h-11 px-3 sm:px-4 bg-white hover:bg-[#F0F6FB] text-[#113259] border border-[#C6DCED] text-[11px] sm:text-[12px] font-semibold transition-all duration-300 shadow-2xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group/qr overflow-hidden whitespace-nowrap"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                    }}
                    title="Scan QR to email directly from your phone"
                  >
                    <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1665C1] group-hover/qr:scale-110 transition-transform" />
                    <span>QR Code</span>
                  </button>
                </div>
              </div>

              {/* Floating Navy Chevron Accent Line Below Card (Visible on Mobile, Tablet & Desktop) */}
              <div className="flex w-full justify-center mt-3 sm:mt-3.5 flex-shrink-0">
                <svg viewBox="0 0 340 44" className="w-full max-w-[340px] sm:max-w-[380px] h-6 sm:h-7 overflow-visible group-hover:translate-y-0.5 transition-transform duration-500" preserveAspectRatio="none">
                  <polygon points="0,0 170,32 340,0 340,12 170,44 0,12" fill="#113259" />
                </svg>
              </div>
            </div>

          </div>

          {/* ===================================================================
              5. SURAT WEAVING PLANT INTERACTIVE GOOGLE MAP & TRANSIT SECTION
             =================================================================== */}
          <div className="max-w-[1360px] mx-auto space-y-6 pt-10 sm:pt-14">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8E6F3] pb-4">
              <div>
                <span className="font-sans text-[11px] font-bold tracking-[0.24em] uppercase text-[#1665C1] block">
                  SURAT WEAVING MILL COORDINATES
                </span>
                <h3 className="font-heading font-serif text-2xl sm:text-3xl font-bold text-[#113259]">
                  Facility Location &amp; Directions
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={COMPANY_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#006DB6] hover:bg-[#0A192F] text-white text-[12.5px] font-medium tracking-wide shadow-xs hover:shadow-md transition-all duration-200 group"
                >
                  <MapPin className="w-3.5 h-3.5 text-white/90 group-hover:scale-110 transition-transform" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Elevated Map Showcase Container */}
            <div className="relative w-full h-[430px] sm:h-[490px] lg:h-[530px] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-[#D8E6F3] shadow-[0_16px_40px_rgba(17,50,89,0.08)] bg-slate-100">
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
            <LogisticsTransitGrid />

            {/* Quick Sourcing Bridge Callout */}
            <div className="mt-8 p-7 sm:p-9 rounded-[26px] bg-gradient-to-r from-[#07192F] via-[#0E3560] to-[#164D87] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_16px_40px_rgba(10,25,47,0.25)] border border-white/10 group/cta overflow-hidden relative">

              {/* Animated Luminous Shine Sweep */}
              <span
                className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none group-hover/cta:translate-x-[250%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                aria-hidden="true"
              />

              <div className="space-y-1.5 text-center md:text-left relative z-10">
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
                className="relative z-10 inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-5 sm:px-7 text-[11px] sm:text-[12.5px] font-bold tracking-wider uppercase text-[#0A192F] bg-white hover:bg-[#F0F7FF] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 shrink-0 whitespace-nowrap"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                }}
              >
                <span>Sourcing Enquiry Desk</span>
                <ArrowRight className="w-4 h-4 stroke-[2.4]" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================================
          6. INTERACTIVE QR CODE "SCAN ON MOBILE" MODAL
         ===================================================================== */}
      <ContactQrModal
        activeQrModal={activeQrModal}
        onClose={() => setActiveQrModal(null)}
        qrUrls={qrUrls}
        copiedField={copiedField}
        onCopy={handleCopy}
        fullAddress={fullAddress}
      />

    </main>
  );
}
