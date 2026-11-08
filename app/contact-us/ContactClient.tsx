'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
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
  Clock,
  QrCode,
  X,
  Share2,
  Smartphone,
  Navigation
} from 'lucide-react';
import QRCode from 'qrcode';
import { COMPANY_INFO } from '@/data/company';

// Character-by-character unblur structure matching home page
const HEADLINE_WORDS = [
  { word: 'Quality', chars: ['Q', 'u', 'a', 'l', 'i', 't', 'y'] },
  { word: 'Fabrics', chars: ['F', 'a', 'b', 'r', 'i', 'c', 's'] },
  { word: 'From', chars: ['F', 'r', 'o', 'm'] },
  { word: 'Around', chars: ['A', 'r', 'o', 'u', 'n', 'd'] },
  { word: 'The', chars: ['T', 'h', 'e'] },
  { word: 'World', chars: ['W', 'o', 'r', 'l', 'd'] },
];

export default function ContactClient() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeQrModal, setActiveQrModal] = useState<'location' | 'phone' | 'email' | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
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

  // Trigger luxury on-load unblur state and video playback
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 60);
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85;
      videoRef.current.play().catch(() => {});
    }
    return () => clearTimeout(timer);
  }, []);

  // Directional left-to-right character unblur sweep (matching home page)
  useEffect(() => {
    let ctx: gsap.Context | null = null;
    let fallbackTimer: NodeJS.Timeout | null = null;

    const animateChars = () => {
      if (!headlineRef.current) return;
      const chars = headlineRef.current.querySelectorAll<HTMLElement>('.hero-headline-char');
      if (!chars || chars.length === 0) return;

      const pos: number[] = [];
      chars.forEach((c) => {
        const r = c.getBoundingClientRect();
        pos.push(r.left);
      });
      const min = Math.min(...pos);
      const max = Math.max(...pos);
      const span = Math.max(max - min, 1);

      ctx = gsap.context(() => {
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            filter: 'blur(16px)',
            y: 10,
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            delay: 0.15,
            stagger: (i) => ((pos[i] - min) / span) * 1.2,
            clearProps: 'transform,willChange',
            onComplete: () => {
              gsap.set(chars, { clearProps: 'all' });
            },
          }
        );
      }, headlineRef);
    };

    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(animateChars);
    } else {
      fallbackTimer = setTimeout(animateChars, 100);
    }

    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (ctx) ctx.revert();
    };
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
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
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
      
      {/* =====================================================================
          1. TOP HERO BANNER WITH SCROLL DISSOLVE, PARALLAX & UNBLUR ANIMATION
         ===================================================================== */}
      <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-18 lg:pb-22 flex items-center overflow-hidden bg-[#0A192F] min-h-[420px] sm:min-h-[460px] lg:min-h-[500px]">
        
        {/* Parallax Background Media Container (Moving Dark Blue Silk Video) */}
        <div
          ref={heroMediaRef}
          className="absolute -top-[12%] inset-x-0 h-[124%] z-0 will-change-transform overflow-hidden"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/craftsmanship-poster.jpg"
            className="w-full h-full object-cover object-center scale-105"
          >
            <source src="/craftsmanship-atelier.mp4" type="video/mp4" />
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Subtle Agnes Toth Luxury Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-black/55 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061426]/90 via-[#061426]/60 to-transparent pointer-events-none" />
        </div>

        {/* Hero Content with Scroll Dissolve & Directional Character Unblur Sweep */}
        <div
          ref={heroContentRef}
          className="relative z-10 w-full max-w-[1440px] xl:max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 will-change-[transform,opacity,filter]"
        >
          <div className="w-full text-white space-y-3.5 sm:space-y-4">
            
            {/* Agnes Eyebrow with Vertical Sapphire Accent Bar */}
            <div className="flex items-center gap-3">
              <div className="w-[3.5px] sm:w-1 h-7 sm:h-8 bg-[#0084D1] rounded-full flex-shrink-0 shadow-[0_0_12px_rgba(0,132,209,0.85)]" />
              <p className="font-sans text-[12px] sm:text-[13px] font-semibold tracking-[0.24em] uppercase text-white/95 drop-shadow-sm">
                Viral Fabrics &bull; <span className="text-[#64B5F6] font-normal normal-case italic">est. Surat, India</span>
              </p>
            </div>

            {/* Statuesque Headline: Directional Unblur Character Sweep */}
            <h1
              ref={headlineRef}
              className="font-heading font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-[56px] font-normal text-white tracking-tight leading-[1.08] drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)] select-none"
            >
              {HEADLINE_WORDS.map((w, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0">
                  {w.chars.map((char, cIdx) => (
                    <span
                      key={cIdx}
                      className="hero-headline-char inline-block will-change-[transform,opacity,filter]"
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Subtitle & Angled Cut CTA in a clean minimal row below */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 sm:pt-2">
              <p className="font-sans text-sm sm:text-base lg:text-[17px] text-white/90 font-light leading-relaxed max-w-2xl drop-shadow-sm">
                Manufacturer and Supplier of all types of Export Fabrics &bull; <span className="font-normal text-white">Direct Sourcing &amp; Mill Consultation Desk</span>
              </p>

              {/* Luxury Angled Outline Button matching Home page & Enquiry */}
              <a
                href="#contact-cards"
                className="relative inline-flex items-center gap-2.5 h-10 sm:h-11 pl-6 pr-8 text-[11px] sm:text-[11.5px] font-medium tracking-[0.2em] uppercase text-white bg-white/[0.08] hover:bg-white/[0.18] backdrop-blur-[8px] transition-all duration-300 group cursor-pointer self-start sm:self-auto whitespace-nowrap overflow-hidden hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)',
                }}
              >
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                  <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />
                  <line x1="100%" y1="0" x2="calc(100% - 14px)" y2="100%" stroke="rgba(255,255,255,0.75)" strokeWidth="1.2" />
                  <line x1="calc(100% - 14px)" y1="calc(100% - 0.5px)" x2="0" y2="calc(100% - 0.5px)" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />
                  <line x1="0.5" y1="100%" x2="0.5" y2="0" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />
                </svg>
                <span>CONNECT WITH MILL</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* 3 Trust Badges with Dividers */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2 text-[11.5px] sm:text-[12.5px] font-sans font-medium text-white/90">
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
          3. MAIN CONTACT SECTION: 3 ELEVATED CHEVRON CARDS ON LIGHT SILK CANVAS
         ===================================================================== */}
      <section
        id="contact-cards"
        ref={cardsSectionRef}
        className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-[#F8FAFD]"
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
              4. 3-COLUMN CHEVRON CONTACT CARDS (Staggered Scroll Entrance)
             =================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-[1300px] mx-auto pt-6">
            
            {/* ---------------- CARD 1: LOCATION / ADDRESS ---------------- */}
            <div
              className="relative group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2.5 flex flex-col items-center"
              style={{
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30px, 0)',
                filter: cardsVisible ? 'blur(0px)' : 'blur(10px)',
                transition: 'opacity 900ms cubic-bezier(0.16, 1, 0.3, 1) 0ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 0ms, filter 900ms cubic-bezier(0.16, 1, 0.3, 1) 0ms',
              }}
            >
              {/* Circular Floating Blue Icon Badge */}
              <div className="relative z-20 w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#1E6FC4] to-[#114E91] text-white flex items-center justify-center border-[5px] border-white shadow-[0_10px_24px_rgba(22,101,193,0.38)] -mb-10 sm:-mb-11 group-hover:scale-108 group-hover:shadow-[0_14px_30px_rgba(22,101,193,0.5)] transition-all duration-500">
                <MapPin className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
              </div>

              {/* Pointed Chevron Card Body */}
              <div
                className="w-full bg-gradient-to-b from-[#F2F7FB] via-[#EBF3FA] to-[#DFEEF7] border-t border-x border-[#D2E4F2] pt-18 sm:pt-20 lg:pt-22 pb-12 sm:pb-14 px-6 sm:px-8 text-center flex flex-col items-center justify-between min-h-[440px] shadow-[0_12px_32px_rgba(17,50,89,0.06)] group-hover:shadow-[0_22px_48px_rgba(17,50,89,0.14)] transition-all duration-500"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 36px), 50% 100%, 0 calc(100% - 36px))',
                }}
              >
                <div className="space-y-3.5 w-full">
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
                <div className="pt-5 pb-2 flex items-center justify-center gap-2.5 w-full">
                  <a
                    href={COMPANY_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center justify-center gap-2 h-11 px-5 sm:px-6 bg-gradient-to-r from-[#113259] via-[#164273] to-[#1C518C] hover:from-[#0A223E] hover:to-[#143B66] text-white text-[13px] font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
                    }}
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white/85" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveQrModal('location')}
                    className="relative inline-flex items-center justify-center gap-1.5 h-11 px-3.5 sm:px-4 bg-white hover:bg-[#F0F6FB] text-[#113259] border border-[#C6DCED] text-[12px] font-semibold transition-all duration-300 shadow-2xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group/qr overflow-hidden"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                    }}
                    title="Scan QR on phone to navigate directly"
                  >
                    <QrCode className="w-4 h-4 text-[#1665C1] group-hover/qr:scale-110 transition-transform" />
                    <span>QR Code</span>
                  </button>
                </div>
              </div>

              {/* Floating Navy Chevron Accent Line Below Card */}
              <div className="w-full flex justify-center mt-3.5">
                <svg viewBox="0 0 340 44" className="w-full max-w-[380px] h-7 overflow-visible group-hover:translate-y-0.5 transition-transform duration-500" preserveAspectRatio="none">
                  <polygon points="0,0 170,32 340,0 340,12 170,44 0,12" fill="#113259" />
                </svg>
              </div>
            </div>

            {/* ---------------- CARD 2: CALL US ---------------- */}
            <div
              className="relative group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2.5 flex flex-col items-center"
              style={{
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30px, 0)',
                filter: cardsVisible ? 'blur(0px)' : 'blur(10px)',
                transition: 'opacity 900ms cubic-bezier(0.16, 1, 0.3, 1) 150ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 150ms, filter 900ms cubic-bezier(0.16, 1, 0.3, 1) 150ms',
              }}
            >
              {/* Circular Floating Blue Icon Badge */}
              <div className="relative z-20 w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#1E6FC4] to-[#114E91] text-white flex items-center justify-center border-[5px] border-white shadow-[0_10px_24px_rgba(22,101,193,0.38)] -mb-10 sm:-mb-11 group-hover:scale-108 group-hover:shadow-[0_14px_30px_rgba(22,101,193,0.5)] transition-all duration-500">
                <Phone className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
              </div>

              {/* Pointed Chevron Card Body */}
              <div
                className="w-full bg-gradient-to-b from-[#F2F7FB] via-[#EBF3FA] to-[#DFEEF7] border-t border-x border-[#D2E4F2] pt-18 sm:pt-20 lg:pt-22 pb-12 sm:pb-14 px-6 sm:px-8 text-center flex flex-col items-center justify-between min-h-[440px] shadow-[0_12px_32px_rgba(17,50,89,0.06)] group-hover:shadow-[0_22px_48px_rgba(17,50,89,0.14)] transition-all duration-500"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 36px), 50% 100%, 0 calc(100% - 36px))',
                }}
              >
                <div className="space-y-3 w-full">
                  <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-[#1665C1] uppercase block">
                    DIRECT SALES DESK
                  </span>

                  <h3 className="font-heading font-serif text-[21px] sm:text-[23px] font-bold text-[#113259] tracking-widest uppercase">
                    CALL US
                  </h3>

                  {/* Direct Click to Call or Copy */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        handleCopy('phone', '91-9427988999');
                        if (typeof window !== 'undefined') {
                          window.location.href = `tel:${COMPANY_INFO.phoneTel}`;
                        }
                      }}
                      className="group/phone inline-flex flex-col items-center cursor-pointer focus:outline-none p-2 rounded-xl hover:bg-white/70 transition-all border border-transparent hover:border-[#C6DCED]"
                      title="Click to dial and copy"
                    >
                      <span className="font-sans text-[24px] sm:text-[26px] font-bold text-[#113259] group-hover/phone:text-[#1665C1] transition-colors tracking-wide">
                        91-9427988999
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#1665C1] mt-1.5 opacity-80 group-hover/phone:opacity-100 transition-opacity">
                        {copiedField === 'phone' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied to clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Phone className="w-3 h-3" />
                            <span>Click to Call &amp; Copy</span>
                          </>
                        )}
                      </span>
                    </button>
                  </div>

                  <p className="font-sans text-[13px] text-[#2C4A6F] leading-relaxed max-w-[280px] mx-auto pt-1">
                    Instant Fabric Pricing &amp; Container Estimates<br />
                    <span className="text-slate-500 text-[12px] font-medium">Mon – Sat: 9:00 AM – 7:30 PM IST</span>
                  </p>
                </div>

                {/* Simplified & Unified Actions (Primary Action with Signature Angled Cut + QR Mobile Scan) */}
                <div className="pt-5 pb-2 flex items-center justify-center gap-2.5 w-full">
                  <a
                    href={`tel:${COMPANY_INFO.phoneTel}`}
                    className="relative inline-flex items-center justify-center gap-2 h-11 px-5 sm:px-6 bg-gradient-to-r from-[#113259] via-[#164273] to-[#1C518C] hover:from-[#0A223E] hover:to-[#143B66] text-white text-[13px] font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
                    }}
                  >
                    <Phone className="w-3.5 h-3.5 text-white/85" />
                    <span>Call Sales Desk</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveQrModal('phone')}
                    className="relative inline-flex items-center justify-center gap-1.5 h-11 px-3.5 sm:px-4 bg-white hover:bg-[#F0F6FB] text-[#113259] border border-[#C6DCED] text-[12px] font-semibold transition-all duration-300 shadow-2xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group/qr overflow-hidden"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                    }}
                    title="Scan QR to Call or WhatsApp directly on your phone"
                  >
                    <QrCode className="w-4 h-4 text-[#1665C1] group-hover/qr:scale-110 transition-transform" />
                    <span>QR Code</span>
                  </button>
                </div>
              </div>

              {/* Floating Navy Chevron Accent Line Below Card */}
              <div className="w-full flex justify-center mt-3.5">
                <svg viewBox="0 0 340 44" className="w-full max-w-[380px] h-7 overflow-visible group-hover:translate-y-0.5 transition-transform duration-500" preserveAspectRatio="none">
                  <polygon points="0,0 170,32 340,0 340,12 170,44 0,12" fill="#113259" />
                </svg>
              </div>
            </div>

            {/* ---------------- CARD 3: WRITE US / EMAIL ---------------- */}
            <div
              className="relative group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2.5 flex flex-col items-center"
              style={{
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30px, 0)',
                filter: cardsVisible ? 'blur(0px)' : 'blur(10px)',
                transition: 'opacity 900ms cubic-bezier(0.16, 1, 0.3, 1) 300ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 300ms, filter 900ms cubic-bezier(0.16, 1, 0.3, 1) 300ms',
              }}
            >
              {/* Circular Floating Blue Icon Badge */}
              <div className="relative z-20 w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#1E6FC4] to-[#114E91] text-white flex items-center justify-center border-[5px] border-white shadow-[0_10px_24px_rgba(22,101,193,0.38)] -mb-10 sm:-mb-11 group-hover:scale-108 group-hover:shadow-[0_14px_30px_rgba(22,101,193,0.5)] transition-all duration-500">
                <Mail className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
              </div>

              {/* Pointed Chevron Card Body */}
              <div
                className="w-full bg-gradient-to-b from-[#F2F7FB] via-[#EBF3FA] to-[#DFEEF7] border-t border-x border-[#D2E4F2] pt-18 sm:pt-20 lg:pt-22 pb-12 sm:pb-14 px-6 sm:px-8 text-center flex flex-col items-center justify-between min-h-[440px] shadow-[0_12px_32px_rgba(17,50,89,0.06)] group-hover:shadow-[0_22px_48px_rgba(17,50,89,0.14)] transition-all duration-500"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 36px), 50% 100%, 0 calc(100% - 36px))',
                }}
              >
                <div className="space-y-3 w-full">
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
                <div className="pt-5 pb-2 flex items-center justify-center gap-2.5 w-full">
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="relative inline-flex items-center justify-center gap-2 h-11 px-5 sm:px-6 bg-gradient-to-r from-[#113259] via-[#164273] to-[#1C518C] hover:from-[#0A223E] hover:to-[#143B66] text-white text-[13px] font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
                    }}
                  >
                    <Mail className="w-3.5 h-3.5 text-white/85" />
                    <span>Send Email</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveQrModal('email')}
                    className="relative inline-flex items-center justify-center gap-1.5 h-11 px-3.5 sm:px-4 bg-white hover:bg-[#F0F6FB] text-[#113259] border border-[#C6DCED] text-[12px] font-semibold transition-all duration-300 shadow-2xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group/qr overflow-hidden"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                    }}
                    title="Scan QR to email directly from your phone"
                  >
                    <QrCode className="w-4 h-4 text-[#1665C1] group-hover/qr:scale-110 transition-transform" />
                    <span>QR Code</span>
                  </button>
                </div>
              </div>

              {/* Floating Navy Chevron Accent Line Below Card */}
              <div className="w-full flex justify-center mt-3.5">
                <svg viewBox="0 0 340 44" className="w-full max-w-[380px] h-7 overflow-visible group-hover:translate-y-0.5 transition-transform duration-500" preserveAspectRatio="none">
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
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11.5px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Looms Operational: Mon–Sat 9AM–7:30PM IST</span>
                </span>
              </div>
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
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D8E6F3] flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#1665C1]/40 transition-all duration-300">
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

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D8E6F3] flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#1665C1]/40 transition-all duration-300">
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

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D8E6F3] flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#1665C1]/40 transition-all duration-300">
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
                className="relative z-10 inline-flex items-center justify-center gap-2 h-12 px-7 text-[12.5px] font-bold tracking-wider uppercase text-[#0A192F] bg-white hover:bg-[#F0F7FF] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 shrink-0"
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

      {/* =====================================================================
          6. INTERACTIVE QR CODE "SCAN ON MOBILE" MODAL
         ===================================================================== */}
      {activeQrModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveQrModal(null)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(17,50,89,0.3)] border border-slate-100 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveQrModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close QR Modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Title & Subtitle */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF2F8] text-[#1665C1] text-[11px] font-bold tracking-wider uppercase">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Instant Mobile Connect</span>
              </div>
              <h3 className="font-heading font-serif text-2xl font-bold text-[#113259] pt-1">
                Scan With Phone Camera
              </h3>
              <p className="font-sans text-[12.5px] text-slate-500">
                Point your phone camera to open directly on your mobile device.
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex rounded-xl bg-slate-100 p-1 text-[12px] font-semibold">
              <button
                type="button"
                onClick={() => setActiveQrModal('location')}
                className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                  activeQrModal === 'location'
                    ? 'bg-white text-[#113259] shadow-xs'
                    : 'text-slate-600 hover:text-[#113259]'
                }`}
              >
                📍 Surat Mill
              </button>
              <button
                type="button"
                onClick={() => setActiveQrModal('phone')}
                className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                  activeQrModal === 'phone'
                    ? 'bg-white text-[#113259] shadow-xs'
                    : 'text-slate-600 hover:text-[#113259]'
                }`}
              >
                📞 Phone / WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setActiveQrModal('email')}
                className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                  activeQrModal === 'email'
                    ? 'bg-white text-[#113259] shadow-xs'
                    : 'text-slate-600 hover:text-[#113259]'
                }`}
              >
                ✉️ Email
              </button>
            </div>

            {/* QR Code Graphic Frame */}
            <div className="relative mx-auto w-64 h-64 p-3.5 rounded-2xl bg-white border-2 border-[#D8E6F3] shadow-inner flex items-center justify-center">
              {qrUrls[activeQrModal] ? (
                <div className="relative w-full h-full">
                  <Image
                    src={qrUrls[activeQrModal]}
                    alt={`Viral Fabrics ${activeQrModal} QR code`}
                    fill
                    className="object-contain"
                  />
                  {/* Central Branded Seal */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1665C1] to-[#113259] text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white">
                      VF
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                  <QrCode className="w-8 h-8 animate-spin" />
                  <span className="text-xs">Generating QR...</span>
                </div>
              )}
            </div>

            {/* Detail Explanation & Direct Actions */}
            <div className="space-y-3 text-left bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {activeQrModal === 'location' && (
                <div>
                  <p className="font-sans text-[12.5px] font-bold text-[#113259]">
                    Surat Mill Turn-by-Turn Navigation
                  </p>
                  <p className="font-sans text-[11.5px] text-slate-600 leading-relaxed mt-0.5">
                    Krishna Industrial Society, Bamroli, Pandesara, Surat. Launches directly in Google Maps.
                  </p>
                  <div className="flex items-center gap-2 pt-3">
                    <a
                      href={COMPANY_INFO.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#113259] text-white text-[11.5px] font-semibold hover:bg-[#0C2544] transition-colors"
                    >
                      <span>Open Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy('modal-address', fullAddress)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11.5px] font-medium hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      {copiedField === 'modal-address' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedField === 'modal-address' ? 'Copied' : 'Copy Address'}</span>
                    </button>
                  </div>
                </div>
              )}

              {activeQrModal === 'phone' && (
                <div>
                  <p className="font-sans text-[12.5px] font-bold text-[#113259]">
                    Commercial Sales &amp; WhatsApp Desk
                  </p>
                  <p className="font-sans text-[11.5px] text-slate-600 leading-relaxed mt-0.5">
                    +91 94279 88999 &bull; Scans directly into WhatsApp chat with Viral Fabrics export team.
                  </p>
                  <div className="flex items-center gap-2 pt-3">
                    <a
                      href={`tel:${COMPANY_INFO.phoneTel}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#113259] text-white text-[11.5px] font-semibold hover:bg-[#0C2544] transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call Now</span>
                    </a>
                    <a
                      href="https://wa.me/919427988999?text=Hello%20Viral%20Fabrics%2C%20I%20would%20like%20to%20inquire%20about%20export%20fabrics."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-[11.5px] font-semibold hover:bg-[#1EBE5D] transition-colors"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy('modal-phone', '91-9427988999')}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11.5px] font-medium hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      {copiedField === 'modal-phone' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedField === 'modal-phone' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              )}

              {activeQrModal === 'email' && (
                <div>
                  <p className="font-sans text-[12.5px] font-bold text-[#113259]">
                    Corporate Email Correspondence
                  </p>
                  <p className="font-sans text-[11.5px] text-slate-600 leading-relaxed mt-0.5">
                    viralfabrics@yahoo.com &bull; Scans directly into your mobile mail app ready to send.
                  </p>
                  <div className="flex items-center gap-2 pt-3">
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#113259] text-white text-[11.5px] font-semibold hover:bg-[#0C2544] transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Compose Mail</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy('modal-email', COMPANY_INFO.email)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11.5px] font-medium hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      {copiedField === 'modal-email' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedField === 'modal-email' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </main>
  );
}
