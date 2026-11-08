'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Lightbulb,
  Target,
  Compass,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Building2,
  Calendar,
  Users,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  PackageCheck,
  Leaf,
  Factory,
  Home,
  Gauge,
  Globe,
} from 'lucide-react';
import { QualityPracticesSection } from '@/components/QualityPracticesSection';

// ============================================================================
// AGNES TOTH HAUTE-COUTURE PARALLAX IMAGE COMPONENT
// - Overflow hidden container with whisper-thin border
// - Inner image slightly scaled (1.14x)
// - On scroll, inner image smoothly drifts vertically (upward motion)
// - 100% requestAnimationFrame with zero React re-renders
// ============================================================================
interface ParallaxImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  badge?: {
    value: string;
    label: string;
  };
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  aspectRatio = 'aspect-[4/3]',
  className = '',
  badge,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current && imgWrapperRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight && rect.bottom > 0) {
              const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
              // Inner image drifts subtly upward as you scroll down
              const yOffset = (progress - 0.5) * 44;
              imgWrapperRef.current.style.transform = `translate3d(0, ${yOffset}px, 0) scale(1.14)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${aspectRatio} overflow-hidden bg-[#0A192F] shadow-[0_16px_40px_rgba(15,23,42,0.1)] rounded-sm border border-slate-200/80 ${className}`}
    >
      <div
        ref={imgWrapperRef}
        className="absolute inset-x-0 -top-[14%] -bottom-[14%] w-full h-[128%] will-change-transform"
        style={{ transform: 'translate3d(0, 0, 0) scale(1.14)' }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center"
        />
      </div>

      {/* Subtle vignette border ring */}
      <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none" />

      {/* Optional luxury floating badge */}
      {badge && (
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 bg-[#0F2942]/90 backdrop-blur-md text-white px-5 py-4 rounded-[2px] border border-white/15 shadow-[0_12px_30px_rgba(0,0,0,0.3)] max-w-xs">
          <p className="font-heading text-2xl sm:text-3xl font-light text-white tracking-tight leading-none">
            {badge.value}
          </p>
          <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#93C5FD] mt-1.5 font-medium">
            {badge.label}
          </p>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// EDITORIAL BLOCK WRAPPER (AGNES TOTH DIRECTIONAL UNBLUR & SLOW FLOAT)
// ============================================================================
const EditorialBlock: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={blockRef}
      className={`will-change-[transform,opacity,filter] ${className}`}
      style={{
        transition: `opacity 1100ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 1100ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter 1100ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0px)' : 'blur(14px)',
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
      }}
    >
      {children}
    </div>
  );
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-[#1E5FA8] selection:text-white">

      {/* =====================================================================
          1. TOP HERO BANNER (Compact & Minimalist - Exact 1:1 Match with Enquiry, Contact & Network)
         ===================================================================== */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 flex items-center overflow-hidden bg-[#0A192F]">
        
        {/* Banner Graphic: Stacked folded luxury fabrics on right, deep navy silk on left */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src="/images/enquiry/enquiry-hero-bg.jpg"
            alt="About Viral Fabrics - Surat Fabric Manufacturer"
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
                  About Us
                </h1>
                <p className="font-sans text-[12.5px] sm:text-[13.5px] text-white/90 font-light tracking-wide drop-shadow-sm">
                  From Around The Fabrics World
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
          2. MINIMALIST BREADCRUMBS BAR (Home > About Us)
         ===================================================================== */}
      <div className="bg-white border-b border-slate-200/70 py-2 sm:py-2.5 shadow-sm">
        <div className="max-w-[1440px] xl:max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 text-left">
          <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1.5 sm:gap-2 text-[12px] sm:text-[12.5px] font-sans">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-[#006DB6] hover:text-[#0A192F] transition-colors font-medium tracking-wide"
            >
              <Home className="w-3.5 h-3.5 fill-[#006DB6] text-[#006DB6]" />
              <span>Home</span>
            </Link>
            <span className="text-slate-400 select-none text-[11px]">&gt;</span>
            <span className="text-[#006DB6] font-medium tracking-wide" aria-current="page">
              About Us
            </span>
          </nav>
        </div>
      </div>

      {/* =================================================================
          2. HAUTE-COUTURE SHOWCASE: STORY, PRINCIPLES & INFRASTRUCTURE
             - Section 1: Our Story (About Viral Fabrics) - Full Bleed Silk Canvas
             - Section 2: Our Capabilities (Infrastructure) - Full Bleed Mocha Canvas
         ================================================================= */}
      
      {/* 2A. OUR STORY (ABOUT VIRAL FABRICS + VISION & MISSION) - FULL HORIZONTAL WIDTH */}
      <section id="our-story" className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FAF6F1] border-b border-[#EAE0D5] overflow-hidden">
        {/* Authentic Silk Background Canvas with Leaf Shadow - 100% Full Bleed */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/about/about-silk-bg.jpg"
            alt="Viral Fabrics Silk Background Canvas"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-95"
            priority
          />
        </div>

        <div className="relative z-10 w-full max-w-[1720px] mx-auto px-5 sm:px-8 lg:px-14 space-y-12 lg:space-y-14">
          <EditorialBlock>
            {/* Upper Row: Story Frame + Editorial Narrative */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              
              {/* Left: 3-Rounded 1-Flat Photographic Frame */}
              <div className="lg:col-span-5 flex justify-center lg:justify-start">
                <div className="relative w-full max-w-[440px] xl:max-w-[480px] aspect-[436/261] flex items-center justify-center">
                  <Image
                    src="/images/about/about-fabrics-arch.png?v=10"
                    alt="Viral Fabrics Folded Fabric Collection"
                    width={436}
                    height={261}
                    className="w-full h-auto object-contain drop-shadow-[0_12px_28px_rgba(120,60,30,0.12)]"
                    priority
                  />
                </div>
              </div>

              {/* Right: Editorial Story */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.24em] uppercase text-slate-700">
                    OUR STORY
                  </span>
                  <div className="w-8 h-[1.5px] bg-[#9C5136]" />
                </div>

                <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-light text-[#0F172A] leading-[1.14] tracking-tight">
                  About <span className="text-[#9C5136] font-normal">Viral Fabrics</span>
                </h2>

                <div className="space-y-3.5 text-slate-700 font-sans text-[13.5px] sm:text-[14.5px] font-normal leading-[1.72]">
                  <p>
                    VIRAL FABRICS was Established in 2012. Viral Fabrics has always been one of the most promising player in market of Manufacturers and Suppliers export quality of fabric. We have achieved several milestones under the expert guidance of Mr. Viral A Patel, Owner of the company. We facilitate our valued clients from our base in the beautiful city of SURAT, GUJARAT, INDIA. The turnover of the company is more than 10 crores.
                  </p>

                  <p>
                    We are manufacturers and supplier all type of export fabrics. The exclusive assortment of fabrics offered by us includes Polyester Dyed and Printed Fabrics, Viscose Fabrics, Rayon Fabrics, Cotton Fabrics and Digital Printed Fabrics By Make to Order Base.
                  </p>
                </div>

                {/* Corporate Milestones Badges (Replacing redundant button with high-trust credentials) */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#EAE0D5] text-[11.5px] sm:text-[12px] font-medium text-slate-700 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#9C5136]" />
                    <span>Est. 2012 • Surat, Gujarat, India</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#EAE0D5] text-[11.5px] sm:text-[12px] font-medium text-slate-700 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#9C5136]" />
                    <span>Turnover: ₹10+ Crores</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#EAE0D5] text-[11.5px] sm:text-[12px] font-medium text-slate-700 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#9C5136]" />
                    <span>Make-to-Order Export Weaves</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Lower Row: Vision & Mission Haute-Couture Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pt-10 sm:pt-12 border-t border-[#E6D8CC] mt-8 sm:mt-10">
              
              {/* Our Vision Card */}
              <div className="relative p-6 sm:p-8 rounded-[22px] bg-white/80 backdrop-blur-md border border-[#EAE0D5] shadow-[0_8px_24px_rgba(156,81,54,0.06)] hover:shadow-[0_14px_34px_rgba(156,81,54,0.10)] transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-3.5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#F4E5D8] border border-[#E8D3C2] flex items-center justify-center shrink-0 shadow-xs text-[#8C4B28] group-hover:scale-105 transition-transform">
                      <Compass className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <span className="font-sans text-[10.5px] font-bold tracking-[0.22em] uppercase text-[#9C5136] block">
                        OUR DIRECTION
                      </span>
                      <h3 className="font-heading text-2xl font-normal text-[#0F172A] tracking-tight">
                        Our Vision
                      </h3>
                    </div>
                  </div>
                  <p className="font-sans text-[13.5px] sm:text-[14px] text-slate-700 leading-relaxed font-normal">
                    Successfully delivering High quality fabrics for new and repeat clients.
                  </p>
                </div>
              </div>

              {/* Our Mission Card */}
              <div className="relative p-6 sm:p-8 rounded-[22px] bg-white/80 backdrop-blur-md border border-[#EAE0D5] shadow-[0_8px_24px_rgba(156,81,54,0.06)] hover:shadow-[0_14px_34px_rgba(156,81,54,0.10)] transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-3.5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#F4E5D8] border border-[#E8D3C2] flex items-center justify-center shrink-0 shadow-xs text-[#8C4B28] group-hover:scale-105 transition-transform">
                      <Target className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <span className="font-sans text-[10.5px] font-bold tracking-[0.22em] uppercase text-[#9C5136] block">
                        OUR PURPOSE
                      </span>
                      <h3 className="font-heading text-2xl font-normal text-[#0F172A] tracking-tight">
                        Our Mission
                      </h3>
                    </div>
                  </div>
                  <p className="font-sans text-[13.5px] sm:text-[14px] text-slate-700 leading-relaxed font-normal">
                    The company has been maintaining a pacesetter for the future time. Company’s main concentration is totally on the international and Indian clients. Company’s aim is to achieve the goal of the nation and by taking our country to one of the most subsidized and industrialized zone in the 21st century.
                  </p>
                </div>
              </div>

            </div>
          </EditorialBlock>
        </div>
      </section>

      {/* =================================================================
          2B. OUR CAPABILITIES: INFRASTRUCTURE (HAUTE-COUTURE S-CURVE BANNER)
          - Single Unified Contained Banner matching reference 1:1
          - Left: Water-Jet Loom Machinery photo with purple fabric roll
          - Center: Organic S-Wave divider with Champagne Gold stroke (#D8B388)
          - Right: Dark Chocolate Mocha panel (#3E2420)
          - Eyebrow: OUR CAPABILITIES —
          - Factory Architectural Line Icon + "Infrastructure" Headline
          - Clean editorial narrative (No cluttered stat columns)
         ================================================================= */}
      <section className="relative w-full py-8 sm:py-12 lg:py-14 bg-[#FAF6F1] overflow-hidden">
        <div className="w-full max-w-[1720px] mx-auto px-5 sm:px-8 lg:px-14">
          <EditorialBlock>
            {/* Desktop Haute-Couture S-Curve Split Banner (hidden on mobile, block on lg+) */}
            <div className="hidden lg:block relative w-full rounded-[28px] xl:rounded-[36px] overflow-hidden shadow-[0_16px_44px_rgba(40,20,15,0.12)] border border-[#EAE0D5] bg-[#3E2420] min-h-[360px] xl:min-h-[390px]">
              
              {/* SVG Layer: Clipping mask for machine image + Champagne Gold Divider Stroke */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <clipPath id="infraLoomClip" clipPathUnits="objectBoundingBox">
                    {/* Normalized coordinates fitting detected points:
                        P0=(0.945, 0), P1=(0.836, 0.08), P2=(0.818, 0.80), P3=(0.718, 1.0)
                        applied to 55% container width -> x ranges from 52.0% down to 39.5% of total card */}
                    <path d="M 0 0 L 0.945 0 C 0.836 0.08, 0.818 0.80, 0.718 1 L 0 1 Z" />
                  </clipPath>
                </defs>
                {/* Champagne Gold Hairline Accent Stroke along the S-wave */}
                <path
                  d="M 520,0 C 460,40 450,400 395,500"
                  fill="none"
                  stroke="#D8B388"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>

              {/* Left Side: Water-Jet Weaving Machinery (clipped to organic S-curve) */}
              <div
                className="absolute inset-y-0 left-0 w-[55%] overflow-hidden z-10"
                style={{ clipPath: 'url(#infraLoomClip)', WebkitClipPath: 'url(#infraLoomClip)' }}
              >
                <Image
                  src="/images/about/water-jet-loom.jpg"
                  alt="Viral Fabrics High Speed Water-Jet Weaving Machinery with Purple Fabric Roll"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/25 pointer-events-none" />
              </div>

              {/* Right Side: Dark Mocha Editorial Content */}
              <div className="relative z-10 ml-[46%] xl:ml-[47%] w-[54%] xl:w-[53%] py-12 xl:py-16 pl-8 pr-10 xl:pl-12 xl:pr-14 flex flex-col justify-center text-white">
                
                {/* Eyebrow: OUR CAPABILITIES — */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.24em] uppercase text-[#E2B892]">
                    OUR CAPABILITIES
                  </span>
                  <div className="w-8 h-[1.5px] bg-[#E2B892]" />
                </div>

                {/* Headline Row: Factory Architectural Icon + Infrastructure */}
                <div className="flex items-center gap-4 mb-5">
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="#F1E6DE"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-[#F1E6DE] drop-shadow-sm"
                    aria-hidden="true"
                  >
                    <path d="M 4 42 H 44" />
                    <path d="M 6 42 V 22 L 17 28 V 22 L 28 28 V 12 H 38 V 42" />
                    <path d="M 27 12 H 39" />
                    <path d="M 11 42 V 33 H 16 V 42" />
                    <path d="M 20 42 V 33 H 25 V 42" />
                    <path d="M 29 42 V 33 H 34 V 42" />
                    <path d="M 32 8 C 30 6 36 4 34 2" />
                    <path d="M 35 9 C 34 7 40 5 38 3" />
                  </svg>
                  <h2 className="font-heading text-3xl xl:text-4xl 2xl:text-[42px] font-normal text-white tracking-tight">
                    Infrastructure
                  </h2>
                </div>

                {/* Editorial Narrative */}
                <p className="font-sans text-[14px] xl:text-[15.5px] text-[#F1E6DE] leading-[1.8] font-light max-w-xl">
                  We own a well-developed manufacturing unit. It is fully equipped with the latest and automatic high speed machinery. In Polyester Fabrics We have our Own Unit High Speed Water-jet Machine having Production of 6 Lac Meter Per Month.
                </p>
              </div>

            </div>

            {/* Mobile / Tablet Responsive Layout (visible below lg, hidden on lg+) */}
            <div className="block lg:hidden relative w-full rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_12px_36px_rgba(40,20,15,0.12)] border border-[#EAE0D5] bg-[#3E2420]">
              
              {/* Machine Image on Mobile */}
              <div className="relative w-full h-[220px] sm:h-[280px]">
                <Image
                  src="/images/about/water-jet-loom.jpg"
                  alt="Viral Fabrics High Speed Water-Jet Weaving Machinery with Purple Fabric Roll"
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3E2420] via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#D8B388]" />
              </div>

              {/* Mocha Content Area on Mobile */}
              <div className="p-6 sm:p-8 text-white space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[11px] font-bold tracking-[0.24em] uppercase text-[#E2B892]">
                    OUR CAPABILITIES
                  </span>
                  <div className="w-8 h-[1.5px] bg-[#E2B892]" />
                </div>

                <div className="flex items-center gap-3">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="#F1E6DE"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-[#F1E6DE]"
                    aria-hidden="true"
                  >
                    <path d="M 4 42 H 44" />
                    <path d="M 6 42 V 22 L 17 28 V 22 L 28 28 V 12 H 38 V 42" />
                    <path d="M 27 12 H 39" />
                    <path d="M 11 42 V 33 H 16 V 42" />
                    <path d="M 20 42 V 33 H 25 V 42" />
                    <path d="M 29 42 V 33 H 34 V 42" />
                    <path d="M 32 8 C 30 6 36 4 34 2" />
                    <path d="M 35 9 C 34 7 40 5 38 3" />
                  </svg>
                  <h2 className="font-heading text-2xl sm:text-3xl font-normal text-white tracking-tight">
                    Infrastructure
                  </h2>
                </div>

                <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#F1E6DE] leading-[1.75] font-light">
                  We own a well-developed manufacturing unit. It is fully equipped with the latest and automatic high speed machinery. In Polyester Fabrics We have our Own Unit High Speed Water-jet Machine having Production of 6 Lac Meter Per Month.
                </p>
              </div>

            </div>
          </EditorialBlock>
        </div>
      </section>

      {/* =================================================================
          3. QUALITY ASSURANCE: 4 AUDIT LEVELS (COMPLETE PIPELINE)
             - Silk Background Canvas
             - 100% Quality Assurance Gold Laurel Wreath on Blue Drape
             - 4 Arched Cards with Connected Pipeline and Glowing Blue Dots
             - Point-by-Point Levels:
               1. At Greige Level (Reed-Pick, Weight/GSM, Table/Board)
               2. At Finished Level (Board Checking, Lab Testing, Design Secrecy)
               3. At Processing Level (Lab Dips, Strike Offs)
               4. At Packing Level (Packing Material, Clean & Huge Warehousing)
         ================================================================= */}
      <QualityPracticesSection />

      {/* =================================================================
          4. HAUTE-COUTURE SHOWCASE: OUR TEAM - FULL HORIZONTAL WIDTH
             - Authentic Flowing Silk Wave Background Canvas (100% Full Bleed)
             - Left: Our People Eyebrow + Our Team Headline + Manifesto + Action Button
             - Right: Dedicated Viral Fabrics Team Photo with Navy Blue Branded Polos in Mill
         ================================================================= */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FAF6F1] border-y border-slate-200/70 overflow-hidden">
        {/* Authentic Flowing Silk Wave Background Canvas - 100% Full Bleed */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/about/team-silk-wave-bg.jpg"
            alt="Viral Fabrics Team Silk Wave Background Canvas"
            fill
            sizes="100vw"
            className="object-cover object-bottom opacity-95"
            priority
          />
        </div>

        {/* Luminous Ambient Glow */}
        <div
          className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18)_0%,transparent_70%)] blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-[1720px] mx-auto px-5 sm:px-8 lg:px-14">
          <EditorialBlock>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              
              {/* Left Column: Narrative & Action Button */}
              <div className="lg:col-span-6 space-y-4 sm:space-y-5">
                
                {/* Eyebrow: OUR PEOPLE — */}
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.24em] uppercase text-[#8C4B28]">
                    OUR PEOPLE
                  </span>
                  <div className="w-10 sm:w-14 h-[1.5px] bg-[#8C4B28]/40" />
                </div>

                {/* Headline: Our Team in rich bronze/mocha serif */}
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#2E1F1A] leading-[1.12] tracking-tight">
                  Our <span className="text-[#8C4B28] font-normal italic">Team</span>
                </h2>

                {/* Authentic Client Manifesto Copy */}
                <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#5C4D44] font-normal leading-[1.72] max-w-xl">
                  We have a dedicated team of well-qualified professionals and skilled workers. All the employees of our company are very hard working and stand by the company’s vision of attaining complete client satisfaction. Moreover, we work in close coordination with our clients to ensure that they get what they expect.
                </p>

                {/* Action Button */}
                <div className="pt-2 sm:pt-3">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-lg text-[12.5px] font-medium tracking-wide text-white bg-[#7A3E20] hover:bg-[#663217] transition-all duration-300 shadow-[0_2px_8px_rgba(122,62,32,0.25)] hover:shadow-[0_4px_14px_rgba(122,62,32,0.35)] hover:-translate-y-0.5 group"
                  >
                    <span>Connect With Our Team</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>

              </div>

              {/* Right Column: Factory Team Photograph in Arched / Rounded Haute-Couture Frame */}
              <div className="lg:col-span-6 flex justify-center lg:justify-end">
                <div className="relative w-full aspect-[16/9] sm:aspect-[16/8.5] rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0_16px_40px_rgba(46,31,26,0.12)] border border-[#EAE0D5] bg-slate-900 group">
                  <Image
                    src="/images/about/viral-fabrics-team.jpg"
                    alt="Viral Fabrics Dedicated Professional Team in Surat Weaving Mill"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                    priority
                  />
                  {/* Subtle Glassmorphic Inset Shadow */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[22px] sm:rounded-[26px] pointer-events-none" />
                </div>
              </div>

            </div>
          </EditorialBlock>
        </div>
      </section>

      {/* =================================================================
          9. COMPANY FACT SHEET (AGNES TOTH HAUTE-COUTURE SPECIFICATION TABLE)
             - Name of Owner: Mr. Viral Patel
             - Year of Establishment: 2012
             - Nature of Business: Manufacturer & Supplier
             - Number of Employees: Above 15
             - Plus Surat base, address, phone, email, turnover
         ================================================================= */}
      <section className="py-20 sm:py-28 bg-white relative">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <EditorialBlock className="mb-12">
            <p className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.24em] uppercase text-slate-400">
              Company Information
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-[#0F172A] tracking-tight mt-1">
              Company Profile &amp; Specifications
            </h2>
          </EditorialBlock>

          <EditorialBlock delay={100}>
            <div className="bg-white border border-slate-200/90 rounded-sm divide-y divide-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.03)] overflow-hidden">
              {[
                { label: 'Name of Owner', value: 'Mr. Viral Patel' },
                { label: 'Year of Establishment', value: '2012' },
                { label: 'Nature of Business', value: 'Manufacturer & Supplier' },
                { label: 'Number of Employees', value: 'Above 15' },
              ].map((row, rIdx) => (
                <div
                  key={rIdx}
                  className="grid grid-cols-1 sm:grid-cols-12 py-4 px-6 sm:px-8 hover:bg-[#FAF8F5]/80 transition-colors gap-2 sm:gap-4 items-center"
                >
                  <span className="sm:col-span-4 font-sans text-[12px] uppercase tracking-[0.16em] font-semibold text-slate-500">
                    {row.label}
                  </span>
                  <span className="sm:col-span-8 font-heading text-[15px] sm:text-[16px] text-[#0F172A] font-medium leading-relaxed">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </EditorialBlock>

        </div>
      </section>

    </div>
  );
}
