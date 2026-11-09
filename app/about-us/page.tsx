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
  Palette,
  Truck,
  UserCheck,
} from 'lucide-react';
import { QualityPracticesSection } from '@/components/QualityPracticesSection';
import { PageHeroBanner } from '@/components/PageHeroBanner';

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

const ABOUT_PAGE_BADGES = [
  { icon: Calendar, label: 'Established In 2012' },
  { icon: Factory, label: 'Modern Surat Loom Shed' },
  { icon: Users, label: '60+ Loom Specialists' },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-[#1E5FA8] selection:text-white">

      {/* Hero Banner with Agnes Toth directional unblur sweep & Breadcrumbs */}
      <PageHeroBanner
        title="About Us"
        subtitle="From Around The Fabrics World"
        bgVideo="/videos/about-hero-720p.mp4"
        bgVideoPoster="/images/about/about-hero-poster.webp"
        bgImage="/images/about/about-hero-poster.webp"
        bgAlt="About Viral Fabrics - Surat Fabric Manufacturer"
        badges={ABOUT_PAGE_BADGES}
      />

      {/* =================================================================
          2. HAUTE-COUTURE SHOWCASE: STORY, PRINCIPLES & INFRASTRUCTURE
             - Section 1: Our Story (About Viral Fabrics) - Full Bleed Silk Canvas
             - Section 2: Our Capabilities (Infrastructure) - Full Bleed Mocha Canvas
             - Signature Stacking Curtain: Slides up over sticky hero banner with luxury elevation
         ================================================================= */}
      <div className="relative z-10 bg-[#FAF6F1] shadow-[0_-25px_60px_rgba(0,0,0,0.22)]">
        {/* 2A. OUR STORY (ABOUT VIRAL FABRICS + VISION & MISSION) - FULL HORIZONTAL WIDTH */}
        <section id="our-story" className="relative w-full pt-20 sm:pt-28 lg:pt-36 pb-16 sm:pb-24 lg:pb-32 bg-[#FAF6F1] overflow-hidden">
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

        <div className="relative z-10 w-full max-w-[1720px] mx-auto px-5 sm:px-8 lg:px-14 space-y-16 sm:space-y-20 lg:space-y-24">
          <EditorialBlock>
            {/* Upper Row: Story Frame + Editorial Narrative */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20 items-center">
              
              {/* Left: 3-Rounded 1-Flat Photographic Frame (Enlarged Luxury Scale) */}
              <div className="lg:col-span-5 flex justify-center lg:justify-start">
                <div className="relative w-full max-w-[500px] xl:max-w-[560px] flex items-center justify-center group">
                  <Image
                    src="/images/about/about-fabrics-arch.png"
                    alt="Viral Fabrics Folded Fabric Collection"
                    width={560}
                    height={335}
                    className="w-full h-auto object-contain drop-shadow-[0_20px_45px_rgba(120,60,30,0.16)] group-hover:scale-102 transition-transform duration-500 ease-out"
                    priority
                  />
                </div>
              </div>

              {/* Right: Editorial Story matching Image 1 1:1 (Enlarged Majestic Scale) */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[12px] sm:text-[13px] font-bold tracking-[0.28em] uppercase text-[#9C5136]">
                    ABOUT US
                  </span>
                  <div className="w-12 h-[2px] bg-[#9C5136]" />
                </div>

                <h2 className="font-heading text-3xl sm:text-4xl lg:text-[48px] xl:text-[54px] font-normal text-[#0F172A] leading-[1.12] tracking-tight">
                  Our Heritage, <span className="text-[#9C5136] italic font-normal">Our Fabrics</span>
                </h2>

                <div className="space-y-4 text-slate-600 font-sans text-[15px] sm:text-[16px] lg:text-[16.5px] font-normal leading-[1.8]">
                  <p>
                    <strong className="font-semibold text-[#0F172A]">VIRAL FABRICS was Established in 2012.</strong> Viral Fabrics has always been one of the most promising player in market of Manufacturers and Suppliers export quality of fabric. We have achieved several milestones under the expert guidance of Mr. Viral A Patel, Owner of the company. We facilitate our valued clients from our base in the beautiful city of SURAT, GUJARAT, INDIA. The turnover of the company is more than 10 crores.
                  </p>
                  <p>
                    We are manufacturers and supplier all type of export fabrics. The exclusive assortment of fabrics offered by us includes Polyester Dyed and Printed Fabrics, Viscose Fabrics, Rayon Fabrics, Cotton Fabrics and Digital Printed Fabrics By Make to Order Base.
                  </p>
                </div>

                {/* 4 Distinct Rounded Glassmorphic Pills (Frosted Glass Aesthetics) */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-3">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 sm:px-4.5 sm:py-2.2 rounded-full bg-white/40 backdrop-blur-md border border-white/70 text-[12px] sm:text-[13px] font-medium text-slate-800 shadow-[0_2px_10px_rgba(15,23,42,0.03)] hover:bg-white/70 hover:border-[#9C5136]/50 hover:shadow-xs transition-all">
                    <Calendar className="w-4 h-4 text-[#9C5136] stroke-[2.2]" />
                    <span>Est. 2012</span>
                  </div>
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 sm:px-4.5 sm:py-2.2 rounded-full bg-white/40 backdrop-blur-md border border-white/70 text-[12px] sm:text-[13px] font-medium text-slate-800 shadow-[0_2px_10px_rgba(15,23,42,0.03)] hover:bg-white/70 hover:border-[#9C5136]/50 hover:shadow-xs transition-all">
                    <MapPin className="w-4 h-4 text-[#9C5136] stroke-[2.2]" />
                    <span>Surat, Gujarat, India</span>
                  </div>
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 sm:px-4.5 sm:py-2.2 rounded-full bg-white/40 backdrop-blur-md border border-white/70 text-[12px] sm:text-[13px] font-medium text-slate-800 shadow-[0_2px_10px_rgba(15,23,42,0.03)] hover:bg-white/70 hover:border-[#9C5136]/50 hover:shadow-xs transition-all">
                    <Sparkles className="w-4 h-4 text-[#9C5136] stroke-[2.2]" />
                    <span>Make-to-Order Fabrics</span>
                  </div>
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 sm:px-4.5 sm:py-2.2 rounded-full bg-white/40 backdrop-blur-md border border-white/70 text-[12px] sm:text-[13px] font-medium text-slate-800 shadow-[0_2px_10px_rgba(15,23,42,0.03)] hover:bg-white/70 hover:border-[#9C5136]/50 hover:shadow-xs transition-all">
                    <Globe className="w-4 h-4 text-[#9C5136] stroke-[2.2]" />
                    <span>Global Export</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Lower Row: Vision & Mission Frosted Glassmorphic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 pt-10 sm:pt-14">
              
              {/* Our Vision Card - Frosted Glass Aesthetics */}
              <div className="relative p-8 sm:p-9 lg:p-11 rounded-[26px] sm:rounded-[28px] bg-white/40 hover:bg-white/60 backdrop-blur-2xl border border-white/70 hover:border-[#1E5FA8]/40 shadow-[0_8px_32px_rgba(15,23,42,0.04),inset_0_1px_2px_rgba(255,255,255,0.8)] hover:shadow-[0_16px_45px_rgba(30,95,168,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
                {/* Subtle soft cool-blue wave watermark in bottom-right corner (1:1 Image 1) */}
                <div className="absolute -bottom-8 -right-8 w-56 h-56 bg-[radial-gradient(circle_at_bottom_right,rgba(30,95,168,0.12)_0%,transparent_70%)] pointer-events-none rounded-full" />
                <svg
                  className="absolute -bottom-2 -right-2 w-44 h-36 pointer-events-none opacity-20 text-[#1E5FA8]"
                  viewBox="0 0 200 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M0,100 C60,40 120,120 200,60 L200,120 L0,120 Z"
                    fill="currentColor"
                  />
                  <path
                    d="M30,110 C90,65 140,110 200,75"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.6"
                  />
                </svg>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white/70 border border-white/80 shadow-xs flex items-center justify-center shrink-0 text-[#1665C1] group-hover:scale-105 transition-transform">
                      <Target className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div>
                      <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.24em] uppercase text-[#1665C1] block">
                        OUR VISION
                      </span>
                      <h3 className="font-heading text-2xl sm:text-3xl lg:text-[30px] font-normal text-[#0F172A] tracking-tight">
                        Our Vision
                      </h3>
                    </div>
                  </div>
                  <p className="font-sans text-[14.5px] sm:text-[15.5px] lg:text-[16px] text-slate-600 leading-[1.78] font-normal pt-1">
                    Successfully delivering High quality fabrics for new and repeat clients.
                  </p>
                </div>
              </div>

              {/* Our Mission Card - Frosted Glass Aesthetics */}
              <div className="relative p-8 sm:p-9 lg:p-11 rounded-[26px] sm:rounded-[28px] bg-white/40 hover:bg-white/60 backdrop-blur-2xl border border-white/70 hover:border-[#B86242]/40 shadow-[0_8px_32px_rgba(15,23,42,0.04),inset_0_1px_2px_rgba(255,255,255,0.8)] hover:shadow-[0_16px_45px_rgba(184,98,66,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
                {/* Subtle soft copper/terracotta wave watermark in bottom-right corner (1:1 Image 1) */}
                <div className="absolute -bottom-8 -right-8 w-56 h-56 bg-[radial-gradient(circle_at_bottom_right,rgba(184,98,66,0.12)_0%,transparent_70%)] pointer-events-none rounded-full" />
                <svg
                  className="absolute -bottom-2 -right-2 w-44 h-36 pointer-events-none opacity-20 text-[#B86242]"
                  viewBox="0 0 200 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M0,100 C60,40 120,120 200,60 L200,120 L0,120 Z"
                    fill="currentColor"
                  />
                  <path
                    d="M30,110 C90,65 140,110 200,75"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.6"
                  />
                </svg>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white/70 border border-white/80 shadow-xs flex items-center justify-center shrink-0 text-[#B86242] group-hover:scale-105 transition-transform">
                      <Layers className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div>
                      <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.24em] uppercase text-[#B86242] block">
                        OUR MISSION
                      </span>
                      <h3 className="font-heading text-2xl sm:text-3xl lg:text-[30px] font-normal text-[#0F172A] tracking-tight">
                        Our Mission
                      </h3>
                    </div>
                  </div>
                  <p className="font-sans text-[14.5px] sm:text-[15.5px] lg:text-[16px] text-slate-600 leading-[1.78] font-normal pt-1">
                    The company has been maintaining a pacesetter for the future time. Company’s main concentration is totally on the international and Indian clients. Company’s aim is to achieve the goal of the nation and by taking our country to one of the most subsidized and industrialized zone in the 21st century.
                  </p>
                </div>
              </div>

            </div>
          </EditorialBlock>
        </div>
      </section>

      {/* =================================================================
          2B. OUR CAPABILITIES: STATE-OF-THE-ART MANUFACTURING
          - Deep Midnight Navy Card with S-Curve Divider & Luxury Golden Hairline
          - Left: Water-Jet Loom Machinery with Purple Fabric Roll
          - Right: State-of-the-Art Manufacturing
          - Perfectly Balanced Vertical Spacing
         ================================================================= */}
      <section className="relative w-full py-16 sm:py-24 lg:py-32 bg-white overflow-hidden">
        <div className="relative z-10 w-full max-w-[1720px] mx-auto px-5 sm:px-8 lg:px-14">
          <EditorialBlock>
            {/* Desktop Haute-Couture S-Curve Split Banner (hidden on mobile, flex on lg+) */}
            <div className="hidden lg:flex items-center relative w-full rounded-[28px] xl:rounded-[36px] overflow-hidden shadow-[0_20px_50px_rgba(10,25,47,0.25)] border border-[#1E3A5F]/40 bg-gradient-to-r from-[#07172B] via-[#0A2240] to-[#0D2E54] min-h-[380px] xl:min-h-[420px]">
              
              {/* SVG Layer: Clipping mask for machine image + Metallic Golden Divider Stroke */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <clipPath id="infraLoomClip" clipPathUnits="objectBoundingBox">
                    <path d="M 0 0 L 0.945 0 C 0.836 0.08, 0.818 0.80, 0.718 1 L 0 1 Z" />
                  </clipPath>
                  <linearGradient id="goldCurveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FDE68A" />
                    <stop offset="35%" stopColor="#D4AF37" />
                    <stop offset="70%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#B45309" />
                  </linearGradient>
                </defs>
                {/* Metallic Champagne Gold Hairline Accent Stroke along the S-wave */}
                <path
                  d="M 520,0 C 460,40 450,400 395,500"
                  fill="none"
                  stroke="url(#goldCurveGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.95"
                />
              </svg>

              {/* Left Side: Water-Jet Weaving Machinery (properly positioned with full left detail) */}
              <div
                className="absolute inset-y-0 left-0 w-[55%] overflow-hidden z-10"
                style={{ clipPath: 'url(#infraLoomClip)', WebkitClipPath: 'url(#infraLoomClip)' }}
              >
                <Image
                  src="/images/about/water-jet-loom.jpg"
                  alt="Viral Fabrics High Speed Water-Jet Weaving Machinery with Purple Fabric Roll"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-left lg:object-[4%_center]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-[#0A2240]/40 pointer-events-none" />
              </div>

              {/* Right Side: Dark Navy Editorial Content (Vertically Centered with Balanced Padding) */}
              <div className="relative z-10 ml-[46%] xl:ml-[47%] w-[54%] xl:w-[53%] py-10 lg:py-12 xl:py-14 pl-10 pr-12 xl:pl-16 xl:pr-18 flex flex-col justify-center text-white my-auto">
                
                {/* Eyebrow: OUR CAPABILITIES in Golden */}
                <div className="flex items-center gap-3 mb-3.5">
                  <span className="font-sans text-[12px] sm:text-[13px] font-bold tracking-[0.28em] uppercase text-[#FDE68A]">
                    OUR CAPABILITIES
                  </span>
                </div>

                {/* Headline: State-of-the-Art Manufacturing & Infrastructure */}
                <h2 className="font-heading font-serif text-3xl sm:text-4xl lg:text-[44px] xl:text-[50px] 2xl:text-[54px] font-normal text-white tracking-tight mb-4 sm:mb-5 leading-[1.14]">
                  State-of-the-Art Manufacturing
                </h2>

                {/* Editorial Narrative with exact user infrastructure specifications */}
                <p className="font-sans text-[15.5px] sm:text-[16px] xl:text-[17px] text-slate-200 leading-[1.8] font-normal max-w-2xl mb-6">
                  We own a well-developed manufacturing unit. It is fully equipped with the latest and automatic high speed machinery. In Polyester Fabrics We have our Own Unit High Speed Water-jet Machine having Production of 6 Lac Meter Per Month.
                </p>

                {/* Infrastructure Highlights Pill Row with Golden Accents */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-3.5">
                  <div className="inline-flex items-center gap-2.5 px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/[0.1] border border-white/15 text-white text-[13px] sm:text-[13.5px] font-sans font-medium shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B] shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                    <span>Automatic Water-Jet Machinery</span>
                  </div>
                  <div className="inline-flex items-center gap-2.5 px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/[0.1] border border-white/15 text-white text-[13px] sm:text-[13.5px] font-sans font-medium shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B] shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                    <span>6 Lac Meters / Month</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Mobile / Tablet Responsive Layout (visible below lg, hidden on lg+) */}
            <div className="block lg:hidden relative w-full rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_16px_40px_rgba(10,25,47,0.22)] border border-[#1E3A5F]/40 bg-gradient-to-br from-[#07172B] via-[#0A2240] to-[#0D2E54]">
              
              {/* Machine Image on Mobile */}
              <div className="relative w-full h-[260px] sm:h-[320px]">
                <Image
                  src="/images/about/water-jet-loom.jpg"
                  alt="Viral Fabrics High Speed Water-Jet Weaving Machinery with Purple Fabric Roll"
                  fill
                  sizes="100vw"
                  className="object-cover object-[10%_center]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2240] via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent" />
              </div>

              {/* Dark Navy Content Area on Mobile (Enlarged & Highly Legible) */}
              <div className="p-7 sm:p-9 text-white space-y-4 sm:space-y-5">
                <span className="font-sans text-[12px] font-bold tracking-[0.24em] uppercase text-[#FDE68A] block">
                  OUR CAPABILITIES
                </span>

                <h2 className="font-heading font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-white tracking-tight leading-tight">
                  State-of-the-Art Manufacturing
                </h2>

                <p className="font-sans text-[15px] sm:text-[16px] text-slate-200 leading-[1.78] font-normal">
                  We own a well-developed manufacturing unit. It is fully equipped with the latest and automatic high speed machinery. In Polyester Fabrics We have our Own Unit High Speed Water-jet Machine having Production of 6 Lac Meter Per Month.
                </p>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.1] border border-white/15 text-white text-[12.5px] font-sans font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
                    <span>Automatic Water-Jet Machinery</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.1] border border-white/15 text-white text-[12.5px] font-sans font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
                    <span>6 Lac Meters / Month</span>
                  </div>
                </div>

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
          4. COMPANY SPECIFICATIONS BAR (DARK LUXURY NAVY PILL ROW)
             - Placed after Process (Quality Practices) and before Our Team
             - Name of Owner: Mr. Viral Patel
             - Year of Establishment: 2012
             - Nature of Business: Manufacturer & Supplier
             - Number of Employees: Above 15
         ================================================================= */}
      <section className="relative w-full py-14 sm:py-18 bg-[#FAF6F1] border-t border-[#EAE0D5] overflow-hidden">
        <div className="w-full max-w-[1720px] mx-auto px-5 sm:px-8 lg:px-14">
          
          {/* THE DARK NAVY COMPANY SPECIFICATIONS BAR (1:1 REPLICA OF USER REFERENCE IMAGE) */}
          <EditorialBlock>
            <div className="relative w-full rounded-2xl sm:rounded-[24px] bg-gradient-to-r from-[#0B1F38] via-[#0E2849] to-[#0B1F38] border border-white/10 shadow-[0_20px_45px_rgba(10,25,47,0.22)] py-6 sm:py-9 px-5 sm:px-10 lg:px-14">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-0 lg:divide-x lg:divide-white/15 items-center divide-y sm:divide-y-0 divide-white/10">
                
                {/* 1. Name of Owner: Mr. Viral Patel */}
                <div className="flex items-center gap-4 lg:justify-center lg:px-4 pt-1 sm:pt-0">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center shrink-0 text-white/90">
                    <UserCheck className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <div>
                    <div className="font-serif text-xl sm:text-2xl lg:text-[28px] font-bold text-white tracking-tight leading-none whitespace-nowrap">
                      Mr. Viral Patel
                    </div>
                    <div className="font-sans text-[12.5px] sm:text-[13.5px] text-slate-300 font-normal tracking-wide pt-1.5 whitespace-nowrap">
                      Name of Owner
                    </div>
                  </div>
                </div>

                {/* 2. Year of Establishment: 2012 */}
                <div className="flex items-center gap-4 lg:justify-center lg:px-4 pt-4 sm:pt-0">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center shrink-0 text-white/90">
                    <Calendar className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <div>
                    <div className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-bold text-white tracking-tight leading-none whitespace-nowrap">
                      2012
                    </div>
                    <div className="font-sans text-[12.5px] sm:text-[13.5px] text-slate-300 font-normal tracking-wide pt-1.5 whitespace-nowrap">
                      Year of Establishment
                    </div>
                  </div>
                </div>

                {/* 3. Nature of Business: Manufacturer & Supplier */}
                <div className="flex items-center gap-4 lg:justify-center lg:px-4 pt-4 sm:pt-0">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center shrink-0 text-white/90">
                    <Building2 className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <div>
                    <div className="font-serif text-base sm:text-lg lg:text-[22px] font-bold text-white tracking-tight leading-none whitespace-nowrap">
                      Manufacturer &amp; Supplier
                    </div>
                    <div className="font-sans text-[12.5px] sm:text-[13.5px] text-slate-300 font-normal tracking-wide pt-1.5 whitespace-nowrap">
                      Nature of Business
                    </div>
                  </div>
                </div>

                {/* 4. Number of Employees: Above 15 */}
                <div className="flex items-center gap-4 lg:justify-center lg:px-4 pt-4 sm:pt-0">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center shrink-0 text-white/90">
                    <Users className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <div>
                    <div className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-bold text-white tracking-tight leading-none whitespace-nowrap">
                      Above 15
                    </div>
                    <div className="font-sans text-[12.5px] sm:text-[13.5px] text-slate-300 font-normal tracking-wide pt-1.5 whitespace-nowrap">
                      Number of Employees
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </EditorialBlock>

        </div>
      </section>

      {/* =================================================================
          5. HAUTE-COUTURE SHOWCASE: OUR TEAM - FULL HORIZONTAL WIDTH
             - Authentic Flowing Silk Wave Background Canvas (100% Full Bleed)
             - Left: Our People Eyebrow + Our Team Headline + Manifesto + Action Button (Enlarged Scale)
             - Right: Dedicated Viral Fabrics Team Photo with Navy Blue Branded Polos in Mill
         ================================================================= */}
      <section className="relative w-full py-20 sm:py-24 lg:py-28 bg-[#FAF6F1] border-y border-slate-200/70 overflow-hidden">
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              
              {/* Left Column: Narrative & Action Button (Enlarged & Highly Legible) */}
              <div className="lg:col-span-6 space-y-5 sm:space-y-6">
                
                {/* Eyebrow: OUR PEOPLE — */}
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[12px] sm:text-[13px] font-bold tracking-[0.28em] uppercase text-[#1E5FA8]">
                    OUR PEOPLE
                  </span>
                  <div className="w-12 sm:w-16 h-[2px] bg-[#1E5FA8]/40" />
                </div>

                {/* Headline: Our Team in rich royal navy serif */}
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-[48px] xl:text-[54px] font-normal text-[#0F172A] leading-[1.12] tracking-tight">
                  Our <span className="text-[#1E5FA8] font-normal italic">Team</span>
                </h2>

                {/* Authentic Client Manifesto Copy (Enlarged & Highly Legible) */}
                <p className="font-sans text-[15.5px] sm:text-[16px] xl:text-[16.5px] text-slate-700 font-normal leading-[1.8] max-w-2xl">
                  We have a dedicated team of well-qualified professionals and skilled workers. All the employees of our company are very hard working and stand by the company’s vision of attaining complete client satisfaction. Moreover, we work in close coordination with our clients to ensure that they get what they expect.
                </p>

                {/* Action Button: Polygon Cut Brand Navy Button (matching Home Page READ MORE button) */}
                <div className="pt-2 sm:pt-3">
                  <Link
                    href="/contact-us"
                    className="relative inline-flex items-center justify-center gap-2.5 h-11 pl-6 pr-8 text-[11.5px] font-semibold tracking-[0.16em] uppercase text-white bg-gradient-to-r from-[#2c4973] via-[#375785] to-[#436b9e] hover:from-[#375785] hover:via-[#436b9e] hover:to-[#5581ba] transition-all duration-300 group shadow-[0_2px_12px_rgba(55,87,133,0.3)] hover:shadow-[0_4px_18px_rgba(55,87,133,0.45)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer overflow-hidden"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)',
                    }}
                  >
                    {/* Smooth Luminous Shine Sweep */}
                    <span
                      className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none group-hover:translate-x-[250%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      aria-hidden="true"
                    />
                    <span className="relative z-10 font-sans">CONNECT WITH OUR TEAM</span>
                    <ArrowRight className="relative z-10 w-3.5 h-3.5 stroke-[2.2] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                  </Link>
                </div>

              </div>

              {/* Right Column: Factory Team Photograph in Arched / Rounded Haute-Couture Frame */}
              <div className="lg:col-span-6 flex justify-center lg:justify-end">
                <div className="relative w-full aspect-[16/9] sm:aspect-[16/8.5] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_20px_45px_rgba(46,31,26,0.14)] border border-[#EAE0D5] bg-slate-900 group">
                  <Image
                    src="/images/about/viral-fabrics-team.jpg"
                    alt="Viral Fabrics Dedicated Professional Team in Surat Weaving Mill"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                    priority
                  />
                  {/* Subtle Glassmorphic Inset Shadow */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[24px] sm:rounded-[28px] pointer-events-none" />
                </div>
              </div>

            </div>
          </EditorialBlock>
        </div>
      </section>
      </div>

    </div>
  );
}
