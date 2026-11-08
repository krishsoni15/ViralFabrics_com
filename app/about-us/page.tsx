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
      />

      {/* =================================================================
          2. HAUTE-COUTURE SHOWCASE: STORY, PRINCIPLES & INFRASTRUCTURE
             - Section 1: Our Story (About Viral Fabrics) - Full Bleed Silk Canvas
             - Section 2: Our Capabilities (Infrastructure) - Full Bleed Mocha Canvas
             - Signature Stacking Curtain: Slides up over sticky hero banner with luxury elevation
         ================================================================= */}
      <div className="relative z-10 bg-[#FAF6F1] shadow-[0_-25px_60px_rgba(0,0,0,0.22)]">
        {/* 2A. OUR STORY (ABOUT VIRAL FABRICS + VISION & MISSION) - FULL HORIZONTAL WIDTH */}
        <section id="our-story" className="relative w-full pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-18 bg-[#FAF6F1] overflow-hidden">
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

              {/* Right: Editorial Story matching Image 1 1:1 */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.24em] uppercase text-slate-500">
                    ABOUT US
                  </span>
                  <div className="w-8 h-[1.5px] bg-[#9C5136]" />
                </div>

                <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#0F172A] leading-[1.14] tracking-tight">
                  Our Heritage, <span className="text-[#9C5136]">Our Fabrics</span>
                </h2>

                <div className="space-y-3.5 text-slate-600 font-sans text-[13.5px] sm:text-[14.5px] font-normal leading-[1.72]">
                  <p>
                    Viral Fabrics was established in 2012 in Surat, Gujarat, with a vision to manufacture and supply high-quality fabrics to clients across India and global markets. With a strong focus on quality, consistency and customer trust, we have grown into a reliable export partner for a wide range of premium fabrics.
                  </p>
                </div>

                {/* 4 Distinct Rounded Pills matching Image 1 1:1 */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-[11.5px] sm:text-[12px] font-medium text-slate-700 shadow-xs">
                    <Calendar className="w-3.5 h-3.5 text-slate-500 stroke-[2.2]" />
                    <span>Est. 2012</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-[11.5px] sm:text-[12px] font-medium text-slate-700 shadow-xs">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 stroke-[2.2]" />
                    <span>Surat, Gujarat, India</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-[11.5px] sm:text-[12px] font-medium text-slate-700 shadow-xs">
                    <Layers className="w-3.5 h-3.5 text-slate-500 stroke-[2.2]" />
                    <span>10+ Fabric Categories</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-[11.5px] sm:text-[12px] font-medium text-slate-700 shadow-xs">
                    <Globe className="w-3.5 h-3.5 text-slate-500 stroke-[2.2]" />
                    <span>Global Export</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Lower Row: Vision & Mission Haute-Couture Cards with subtle silk wave watermarks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pt-8 sm:pt-10">
              
              {/* Our Vision Card */}
              <div className="relative p-6 sm:p-7 rounded-[22px] bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between group hover:shadow-[0_8px_30px_rgba(30,95,168,0.08)] transition-all duration-300">
                {/* Subtle soft cool-blue wave watermark in bottom-right corner (1:1 Image 1) */}
                <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-[radial-gradient(circle_at_bottom_right,rgba(30,95,168,0.14)_0%,transparent_70%)] pointer-events-none rounded-full" />
                <svg
                  className="absolute -bottom-2 -right-2 w-36 h-28 pointer-events-none opacity-30 text-[#1E5FA8]"
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

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-[#EBF3FC] border border-[#D0E2F7] flex items-center justify-center shrink-0 shadow-xs text-[#1665C1] group-hover:scale-105 transition-transform">
                      <Target className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <span className="font-sans text-[10.5px] font-bold tracking-[0.22em] uppercase text-slate-500 block">
                        OUR VISION
                      </span>
                      <h3 className="font-heading text-2xl font-normal text-[#0F172A] tracking-tight">
                        Our Vision
                      </h3>
                    </div>
                  </div>
                  <p className="font-sans text-[13.5px] sm:text-[14px] text-slate-600 leading-relaxed font-normal pt-1">
                    To be a globally trusted textile manufacturer known for quality, innovation and long-term partnerships.
                  </p>
                </div>
              </div>

              {/* Our Mission Card */}
              <div className="relative p-6 sm:p-7 rounded-[22px] bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between group hover:shadow-[0_8px_30px_rgba(184,98,66,0.08)] transition-all duration-300">
                {/* Subtle soft copper/terracotta wave watermark in bottom-right corner (1:1 Image 1) */}
                <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-[radial-gradient(circle_at_bottom_right,rgba(184,98,66,0.14)_0%,transparent_70%)] pointer-events-none rounded-full" />
                <svg
                  className="absolute -bottom-2 -right-2 w-36 h-28 pointer-events-none opacity-30 text-[#B86242]"
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

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-[#FDF2EC] border border-[#F5D5C3] flex items-center justify-center shrink-0 shadow-xs text-[#B86242] group-hover:scale-105 transition-transform">
                      <Layers className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <span className="font-sans text-[10.5px] font-bold tracking-[0.22em] uppercase text-slate-500 block">
                        OUR MISSION
                      </span>
                      <h3 className="font-heading text-2xl font-normal text-[#0F172A] tracking-tight">
                        Our Mission
                      </h3>
                    </div>
                  </div>
                  <p className="font-sans text-[13.5px] sm:text-[14px] text-slate-600 leading-relaxed font-normal pt-1">
                    To deliver premium, durable and diverse fabrics with consistent quality, advanced manufacturing and a customer-first approach.
                  </p>
                </div>
              </div>

            </div>
          </EditorialBlock>
        </div>
      </section>

      {/* =================================================================
          2B. OUR CAPABILITIES: STATE-OF-THE-ART MANUFACTURING (1:1 IMAGE 1)
          - Deep Midnight Navy Card with S-Curve Divider & Cyan Hairline
          - Left: Water-Jet Loom Machinery with Purple Fabric Roll
          - Right: State-of-the-Art Manufacturing with Explore Facility Pill Button
         ================================================================= */}
      <section className="relative w-full py-8 sm:py-12 lg:py-14 bg-[#FAF6F1] overflow-hidden">
        <div className="w-full max-w-[1720px] mx-auto px-5 sm:px-8 lg:px-14">
          <EditorialBlock>
            {/* Desktop Haute-Couture S-Curve Split Banner (hidden on mobile, block on lg+) */}
            <div className="hidden lg:block relative w-full rounded-[28px] xl:rounded-[36px] overflow-hidden shadow-[0_16px_44px_rgba(10,25,47,0.22)] border border-[#1E3A5F]/40 bg-gradient-to-r from-[#07172B] via-[#0A2240] to-[#0D2E54] min-h-[360px] xl:min-h-[390px]">
              
              {/* SVG Layer: Clipping mask for machine image + Cyan/Ice Blue Divider Stroke */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <clipPath id="infraLoomClip" clipPathUnits="objectBoundingBox">
                    <path d="M 0 0 L 0.945 0 C 0.836 0.08, 0.818 0.80, 0.718 1 L 0 1 Z" />
                  </clipPath>
                </defs>
                {/* Cyan/Ice Blue Hairline Accent Stroke along the S-wave */}
                <path
                  d="M 520,0 C 460,40 450,400 395,500"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.85"
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
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-[#0A2240]/40 pointer-events-none" />
              </div>

              {/* Right Side: Dark Navy Editorial Content */}
              <div className="relative z-10 ml-[46%] xl:ml-[47%] w-[54%] xl:w-[53%] py-12 xl:py-16 pl-8 pr-10 xl:pl-12 xl:pr-14 flex flex-col justify-center text-white">
                
                {/* Eyebrow: OUR CAPABILITIES */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.24em] uppercase text-[#38BDF8]">
                    OUR CAPABILITIES
                  </span>
                </div>

                {/* Headline: State-of-the-Art Manufacturing */}
                <h2 className="font-heading font-serif text-3xl xl:text-4xl 2xl:text-[42px] font-normal text-white tracking-tight mb-4 leading-tight">
                  State-of-the-Art Manufacturing
                </h2>

                {/* Editorial Narrative */}
                <p className="font-sans text-[14px] xl:text-[15px] text-slate-300 leading-[1.75] font-light max-w-xl mb-6">
                  Modern weaving, processing and quality control systems that ensure consistent, high-grade fabrics for domestic and international markets.
                </p>

                {/* Explore Our Facility Pill Button */}
                <div>
                  <a
                    href="#quality"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/25 hover:border-white/50 bg-white/[0.08] hover:bg-white/[0.16] text-white text-[12.5px] font-medium tracking-wide transition-all group"
                  >
                    <span>Explore Our Facility</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

            </div>

            {/* Mobile / Tablet Responsive Layout (visible below lg, hidden on lg+) */}
            <div className="block lg:hidden relative w-full rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_12px_36px_rgba(10,25,47,0.2)] border border-[#1E3A5F]/40 bg-gradient-to-br from-[#07172B] via-[#0A2240] to-[#0D2E54]">
              
              {/* Machine Image on Mobile */}
              <div className="relative w-full h-[220px] sm:h-[280px]">
                <Image
                  src="/images/about/water-jet-loom.jpg"
                  alt="Viral Fabrics High Speed Water-Jet Weaving Machinery with Purple Fabric Roll"
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2240] via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#38BDF8]" />
              </div>

              {/* Dark Navy Content Area on Mobile */}
              <div className="p-6 sm:p-8 text-white space-y-4">
                <span className="font-sans text-[11px] font-bold tracking-[0.24em] uppercase text-[#38BDF8] block">
                  OUR CAPABILITIES
                </span>

                <h2 className="font-heading font-serif text-2xl sm:text-3xl font-normal text-white tracking-tight leading-tight">
                  State-of-the-Art Manufacturing
                </h2>

                <p className="font-sans text-[13.5px] sm:text-[14.5px] text-slate-300 leading-[1.72] font-light">
                  Modern weaving, processing and quality control systems that ensure consistent, high-grade fabrics for domestic and international markets.
                </p>

                <div className="pt-2">
                  <a
                    href="#quality"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/25 hover:border-white/50 bg-white/[0.08] hover:bg-white/[0.16] text-white text-[12.5px] font-medium tracking-wide transition-all group"
                  >
                    <span>Explore Our Facility</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

            </div>
          </EditorialBlock>
        </div>
      </section>

      {/* =================================================================
          2C. OUR PROCESS + LUXURY STATS COUNTER BAR (1:1 IMAGE 1 & IMAGE 2)
          - Header: OUR PROCESS
          - 5 Process Step Cards with icons and clean descriptions
          - Dark Navy Stats Counter Bar (Image 2)
            12+ Years of Experience | 50+ Fabric Varieties | 500+ Happy Clients | 10+ Export Countries
         ================================================================= */}
      <section className="relative w-full py-8 sm:py-12 lg:py-16 bg-[#FAF6F1] overflow-hidden">
        <div className="w-full max-w-[1720px] mx-auto px-5 sm:px-8 lg:px-14 space-y-10 sm:space-y-12">
          
          <EditorialBlock>
            {/* Header: OUR PROCESS */}
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-10">
              <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.24em] uppercase text-slate-500 block">
                OUR PROCESS
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#0F172A] tracking-tight">
                From Raw Yarn to Finished Fabric
              </h2>
            </div>

            {/* 5 Workflow Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 items-stretch">
              {[
                {
                  step: '01',
                  title: 'Yarn Sourcing',
                  desc: 'High-grade virgin & recycled filaments procured from trusted suppliers.',
                  icon: Sparkles,
                },
                {
                  step: '02',
                  title: 'Precision Weaving',
                  desc: 'High-speed automated water-jet looms and advanced machinery.',
                  icon: Factory,
                },
                {
                  step: '03',
                  title: 'Dyeing & Printing',
                  desc: 'Vibrant coloration, digital prints & eco-friendly processing.',
                  icon: Palette,
                },
                {
                  step: '04',
                  title: 'Quality Audit',
                  desc: 'Multi-stage inspection for thread count, strength, color and finish.',
                  icon: ShieldCheck,
                },
                {
                  step: '05',
                  title: 'Packaging & Export',
                  desc: 'Export-grade tamper-proof wrapping, warehousing and global delivery.',
                  icon: Truck,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="relative p-5 sm:p-6 rounded-[20px] bg-white border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(30,95,168,0.08)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-[#FAF6F1] border border-[#EAE0D5] flex items-center justify-center text-[#1665C1] group-hover:scale-105 transition-transform">
                          <Icon className="w-5 h-5 stroke-[2]" />
                        </div>
                        <span className="font-mono text-[11px] font-bold text-slate-400">
                          {item.step}
                        </span>
                      </div>
                      <h3 className="font-heading text-lg font-medium text-[#0F172A] tracking-tight">
                        {item.title}
                      </h3>
                      <p className="font-sans text-[12.5px] sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </EditorialBlock>

          {/* THE DARK NAVY STATS COUNTER BAR (EXACT 1:1 REPLICA OF IMAGE 2) */}
          <EditorialBlock delay={150}>
            <div className="relative w-full rounded-2xl sm:rounded-[22px] bg-gradient-to-r from-[#0B1F38] via-[#0E2849] to-[#0B1F38] border border-white/10 shadow-[0_16px_40px_rgba(10,25,47,0.18)] py-6 sm:py-7 px-6 sm:px-10 lg:px-12">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/15 items-center">
                
                {/* 1. 12+ Years of Experience */}
                <div className="flex items-center gap-4 lg:justify-center lg:px-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0 text-white/85">
                    <Factory className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                  </div>
                  <div>
                    <div className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-white tracking-tight leading-none">
                      12+
                    </div>
                    <div className="font-sans text-[12px] sm:text-[12.5px] text-slate-300 font-normal tracking-wide pt-1">
                      Years of Experience
                    </div>
                  </div>
                </div>

                {/* 2. 50+ Fabric Varieties */}
                <div className="flex items-center gap-4 lg:justify-center lg:px-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0 text-white/85">
                    <Layers className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                  </div>
                  <div>
                    <div className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-white tracking-tight leading-none">
                      50+
                    </div>
                    <div className="font-sans text-[12px] sm:text-[12.5px] text-slate-300 font-normal tracking-wide pt-1">
                      Fabric Varieties
                    </div>
                  </div>
                </div>

                {/* 3. 500+ Happy Clients */}
                <div className="flex items-center gap-4 lg:justify-center lg:px-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0 text-white/85">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                  </div>
                  <div>
                    <div className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-white tracking-tight leading-none">
                      500+
                    </div>
                    <div className="font-sans text-[12px] sm:text-[12.5px] text-slate-300 font-normal tracking-wide pt-1">
                      Happy Clients
                    </div>
                  </div>
                </div>

                {/* 4. 10+ Export Countries */}
                <div className="flex items-center gap-4 lg:justify-center lg:px-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0 text-white/85">
                    <Globe className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                  </div>
                  <div>
                    <div className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-white tracking-tight leading-none">
                      10+
                    </div>
                    <div className="font-sans text-[12px] sm:text-[12.5px] text-slate-300 font-normal tracking-wide pt-1">
                      Export Countries
                    </div>
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
                  <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.24em] uppercase text-[#1E5FA8]">
                    OUR PEOPLE
                  </span>
                  <div className="w-10 sm:w-14 h-[1.5px] bg-[#1E5FA8]/40" />
                </div>

                {/* Headline: Our Team in rich royal navy serif */}
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#0F172A] leading-[1.12] tracking-tight">
                  Our <span className="text-[#1E5FA8] font-normal italic">Team</span>
                </h2>

                {/* Authentic Client Manifesto Copy */}
                <p className="font-sans text-[13.5px] sm:text-[14.5px] text-slate-600 font-normal leading-[1.72] max-w-xl">
                  We have a dedicated team of well-qualified professionals and skilled workers. All the employees of our company are very hard working and stand by the company’s vision of attaining complete client satisfaction. Moreover, we work in close coordination with our clients to ensure that they get what they expect.
                </p>

                {/* Action Button in dark luxury navy */}
                <div className="pt-2 sm:pt-3">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-lg text-[12.5px] font-medium tracking-wide text-white bg-[#0E2A47] hover:bg-[#163B66] transition-all duration-300 shadow-[0_2px_10px_rgba(14,42,71,0.25)] hover:shadow-[0_4px_16px_rgba(14,42,71,0.35)] hover:-translate-y-0.5 group"
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

    </div>
  );
}
