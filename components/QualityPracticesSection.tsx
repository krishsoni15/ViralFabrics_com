'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Layers, ClipboardList, FlaskConical, Package, ArrowRight } from 'lucide-react';

interface QualityStep {
  id: string;
  stepNum: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  icon: React.ComponentType<{ className?: string }>;
  items: string[];
}

const QUALITY_STEPS: QualityStep[] = [
  {
    id: 'greige',
    stepNum: '01',
    title: 'At Greige Level',
    subtitle: 'Raw Weave Inspection',
    imageSrc: '/images/quality/greige-level.jpg',
    imageAlt: 'Greige Level fabric weave inspection under magnifying glass',
    icon: Layers,
    items: [
      'Reed-Pick Checking',
      'Weight and GSM Checking',
      'Table or Board Checking',
    ],
  },
  {
    id: 'finished',
    stepNum: '02',
    title: 'At Finished Level',
    subtitle: 'Board & Fault Inspection',
    imageSrc: '/images/quality/finished-level.jpg',
    imageAlt: 'Finished Level board checking for fault rejections with digital inspection monitor',
    icon: ClipboardList,
    items: [
      'Board Checking for Fault Rejections',
      'Lab Testing for all Testing Parameters',
      'Special Care for Design Secrecy',
    ],
  },
  {
    id: 'processing',
    stepNum: '03',
    title: 'At Processing Level',
    subtitle: 'Lab Dips & Print Accuracy',
    imageSrc: '/images/quality/processing-level.jpg',
    imageAlt: 'Processing Level laboratory testing with color solutions, swatches and dyeing machinery',
    icon: FlaskConical,
    items: [
      'Lab Dips for Color Accuracy',
      'Strike Offs for Print Accuracy',
    ],
  },
  {
    id: 'packing',
    stepNum: '04',
    title: 'At Packing Level',
    subtitle: 'Warehousing & Dispatch',
    imageSrc: '/images/quality/packing-level.jpg',
    imageAlt: 'Packing Level warehousing and dispatch with forklift and wrapped fabric rolls on pallets',
    icon: Package,
    items: [
      'High Quality Packing Material',
      'Clean & Huge Warehousing Facilities',
    ],
  },
];

// Individual Interactive 3D Arched Card with Line-by-Line Typography
const InteractiveCard: React.FC<{
  step: QualityStep;
  index: number;
  isVisible: boolean;
}> = ({ step, index, isVisible }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });
  const IconComponent = step.icon;
  const delayMs = index * 130 + 150;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Subtle 3D perspective tilt (max 4 degrees)
    const rotateY = ((mouseX / rect.width) - 0.5) * 8;
    const rotateX = ((mouseY / rect.height) - 0.5) * -8;
    
    setTilt({
      x: rotateX,
      y: rotateY,
      glareX: (mouseX / rect.width) * 100,
      glareY: (mouseY / rect.height) * 100,
      isHovered: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col bg-white/85 hover:bg-white/95 backdrop-blur-xl rounded-t-[50px] sm:rounded-t-[58px] lg:rounded-t-[62px] xl:rounded-t-[70px] rounded-b-[22px] sm:rounded-b-[24px] border border-white/90 hover:border-[#1E5FA8]/40 shadow-[0_10px_30px_rgba(15,23,42,0.05),0_1px_3px_rgba(30,95,168,0.04),inset_0_1px_1px_rgba(255,255,255,0.95)] overflow-visible cursor-default will-change-[transform,filter,opacity]"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transform: isVisible
          ? tilt.isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translate3d(0, -10px, 12px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)'
          : 'perspective(1000px) translate3d(0, 36px, 0)',
        transition: tilt.isHovered
          ? 'transform 120ms ease-out, box-shadow 300ms ease-out'
          : `opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, filter 1000ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, box-shadow 400ms ease-out`,
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0px)' : 'blur(12px)',
        boxShadow: tilt.isHovered
          ? '0 24px 50px -8px rgba(30, 95, 168, 0.26), 0 0 25px rgba(30, 95, 168, 0.12), inset 0 1px 2px rgba(255, 255, 255, 1)'
          : '0 10px 30px -5px rgba(15, 23, 42, 0.05), 0 2px 10px rgba(30, 95, 168, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
      }}
    >
      {/* 3D Luminous Surface Glare */}
      <div
        className="absolute inset-0 rounded-t-[50px] sm:rounded-t-[58px] lg:rounded-t-[62px] xl:rounded-t-[70px] rounded-b-[22px] sm:rounded-b-[24px] pointer-events-none transition-opacity duration-300 z-30"
        style={{
          background: tilt.isHovered
            ? `radial-gradient(circle 200px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.55) 0%, transparent 80%)`
            : 'none',
          opacity: tilt.isHovered ? 1 : 0,
        }}
      />

      {/* Subtle Brand Blue Ambient Glow at base of card */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1E5FA8]/[0.07] via-[#3B82F6]/[0.02] to-transparent pointer-events-none rounded-b-[22px] sm:rounded-b-[24px]" />

      {/* 1. Arched Fabric Process Photo Top */}
      <div className="relative w-full h-36 sm:h-40 lg:h-38 xl:h-44 2xl:h-48 overflow-hidden rounded-t-[50px] sm:rounded-t-[58px] lg:rounded-t-[62px] xl:rounded-t-[70px] bg-slate-100 flex-shrink-0">
        <Image
          src={step.imageSrc}
          alt={step.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        {/* Subtle arched top shadow ring */}
        <div className="absolute inset-0 rounded-t-[50px] sm:rounded-t-[58px] lg:rounded-t-[62px] xl:rounded-t-[70px] ring-1 ring-inset ring-black/10 pointer-events-none" />
      </div>

      {/* 2. Floating Circular Icon Badge (Crystalline Glass Jewel) */}
      <div
        className="relative -mt-6 sm:-mt-7 self-center z-20 flex items-center justify-center flex-shrink-0 transition-transform duration-500 ease-out"
        style={{
          transform: tilt.isHovered ? 'translateZ(20px) scale(1.12)' : 'translateZ(0px) scale(1)',
        }}
      >
        <div className="w-12 h-12 sm:w-13 sm:h-13 xl:w-14 xl:h-14 rounded-full bg-white/95 backdrop-blur-md border border-white shadow-[0_4px_16px_rgba(30,95,168,0.14)] flex items-center justify-center text-[#1E3A5F] group-hover:bg-gradient-to-tr group-hover:from-[#1E5FA8] group-hover:to-[#2563EB] group-hover:text-white group-hover:shadow-[0_6px_22px_rgba(30,95,168,0.35)] transition-all duration-300">
          <IconComponent className="w-5 h-5 sm:w-5.5 sm:h-5.5 xl:w-6 xl:h-6 stroke-[1.8]" />
        </div>
      </div>

      {/* 3. Card Content (Title, Distinct Proper Lines, Blue Underline) */}
      <div className="flex-1 flex flex-col items-center pt-2.5 pb-6 px-3.5 sm:px-4 xl:px-5 text-center justify-between relative z-10">
        <h3 className="font-heading text-[16px] sm:text-[17px] xl:text-[18px] 2xl:text-[19px] font-bold text-[#1E3A5F] tracking-tight mb-2.5 group-hover:text-[#1E5FA8] transition-colors">
          {step.title}
        </h3>

        {/* Distinct Proper Lines (Not cut off, cleanly formatted) */}
        <div className="flex-1 flex flex-col items-center justify-center gap-1 sm:gap-1.5 w-full my-auto">
          {step.items.map((line, lIdx) => (
            <p
              key={lIdx}
              className="font-sans text-[11.5px] sm:text-[12px] xl:text-[12.5px] 2xl:text-[13px] text-slate-600 font-normal leading-[1.38] text-center transition-colors group-hover:text-slate-800"
            >
              {line}
            </p>
          ))}
        </div>

        {/* Centered Small Blue Accent Bar with Luminous Gradient */}
        <div className="w-8 sm:w-10 h-[2.5px] bg-gradient-to-r from-[#1E5FA8] via-[#3B82F6] to-[#60A5FA] mx-auto mt-3.5 rounded-full transition-all duration-300 group-hover:w-16 shadow-[0_1px_6px_rgba(30,95,168,0.3)]" />
      </div>

      {/* 4. Sequential Pipeline Connector with Arrow to next card (Desktop) */}
      {index < QUALITY_STEPS.length - 1 && (
        <div
          className="hidden lg:flex items-center justify-center absolute -right-4 xl:-right-5 2xl:-right-6 top-[60%] -translate-y-1/2 z-20 w-8 xl:w-10 2xl:w-12 pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-full relative flex items-center justify-end overflow-visible">
            {/* The connector line */}
            <div className="w-full h-[2px] bg-gradient-to-r from-[#1E5FA8]/30 via-[#1E5FA8]/80 to-[#2563EB] rounded-full shadow-[0_0_8px_rgba(30,95,168,0.35)]" />
            {/* Directional Arrow Head */}
            <div className="-ml-1.5 flex items-center justify-center text-[#1E5FA8] transform translate-x-1">
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.6] text-[#1E5FA8] drop-shadow-[0_1px_3px_rgba(30,95,168,0.4)]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const QualityPracticesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll Parallax Drift
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const el = sectionRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
              const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
              if (bgRef.current) {
                const bgOffset = (progress - 0.5) * 36;
                bgRef.current.style.transform = `translate3d(0, ${bgOffset}px, 0)`;
              }
              if (badgeRef.current) {
                const badgeOffset = (progress - 0.5) * -16;
                badgeRef.current.style.transform = `translate3d(0, ${badgeOffset}px, 0)`;
              }
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

  // Staggered Unblur Trigger
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      setIsVisible(true);
    }

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
    <section
      ref={sectionRef}
      id="quality"
      className="relative w-full py-16 sm:py-20 lg:py-24 xl:py-28 bg-[#FAF8F5] overflow-hidden selection:bg-[#1E5FA8] selection:text-white"
    >
      {/* =========================================================
          FULL-BLEED LUXURY SILK BACKGROUND (EDGE-TO-EDGE 100vw)
          - Exact user-uploaded silk drape artwork
          - Parallax drift on scroll creates subtle 3D living depth
         ========================================================= */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-6 -bottom-6 z-0 pointer-events-none select-none overflow-hidden will-change-transform"
      >
        <Image
          src="/images/quality/quality-section-silk-bg.webp"
          alt="Viral Fabrics Quality Practices Silk Drape Canvas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-left-top lg:object-left"
        />
      </div>

      {/* Subtle Ethereal Ambient Light Accent (Very low, clean aesthetic touch) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Delicate low ambient blue glow (only 3% opacity) */}
        <div className="absolute top-1/2 left-[30%] -translate-y-1/2 w-[550px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(30,95,168,0.035)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* =========================================================
          FULL-AREA CONTENT CANVAS (Cinematic max-w-[1720px] matching Hero)
         ========================================================= */}
      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-10 xl:px-14">
        <div className="flex flex-col lg:flex-row items-stretch gap-6 sm:gap-8 lg:gap-6 xl:gap-8 2xl:gap-10">

          {/* -------------------------------------------------------------
              1. LEFT BLUE DRAPE PANEL (WITH 100% QUALITY ASSURANCE WREATH)
             ------------------------------------------------------------- */}
          <div
            ref={badgeRef}
            className="relative w-full lg:w-[21%] xl:w-[19%] 2xl:w-[18%] flex-shrink-0 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-2 xl:p-4 overflow-hidden will-change-transform"
            style={{
              transition: 'opacity 1100ms cubic-bezier(0.16, 1, 0.3, 1), filter 1100ms cubic-bezier(0.16, 1, 0.3, 1)',
              opacity: isVisible ? 1 : 0,
              filter: isVisible ? 'blur(0px)' : 'blur(14px)',
            }}
          >
            {/* Mobile blue gradient backing */}
            <div
              className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#1C3E68] via-[#2A5582] to-[#1C3E68] rounded-3xl pointer-events-none shadow-lg"
              aria-hidden="true"
            />

            {/* Standalone 100% Quality Assurance Gold Laurel Wreath Badge Container */}
            <div className="relative z-10 w-44 sm:w-52 lg:w-44 xl:w-52 2xl:w-60 aspect-[605/536] group cursor-default transition-transform duration-700 ease-out hover:scale-106">
              
              {/* Golden Ambient Luster Aura Glow */}
              <div
                className="absolute inset-0 -m-6 sm:-m-8 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.3)_0%,rgba(30,95,168,0.18)_50%,transparent_75%)] blur-2xl pointer-events-none transition-all duration-700 group-hover:scale-120 group-hover:opacity-100 opacity-80"
                aria-hidden="true"
              />

              {/* High-Resolution Laurel Wreath Badge */}
              <Image
                src="/images/quality/wreath-quality-assurance.png"
                alt="Viral Fabrics 100% Quality Assurance Guarantee"
                fill
                priority
                sizes="(max-width: 640px) 208px, (max-width: 1024px) 208px, 240px"
                className="object-contain drop-shadow-[0_18px_36px_rgba(0,0,0,0.5)] drop-shadow-[0_4px_16px_rgba(212,175,55,0.4)]"
              />
            </div>

            {/* 5-Star Rated Authority Quality Pill Badge */}
            <div className="relative z-10 mt-4 sm:mt-5 transition-transform duration-500 ease-out hover:scale-105">
              <div className="relative w-40 sm:w-44 xl:w-48 aspect-[703/132] drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]">
                <Image
                  src="/images/quality/5-star-rated-badge-clean.png"
                  alt="Viral Fabrics 5-Star Rated Quality Seal"
                  fill
                  sizes="200px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Vertical Hairline Divider with Gold Jewel Dot */}
          <div
            className="hidden lg:block relative w-[1px] bg-gradient-to-b from-transparent via-[#C5A880]/80 to-transparent flex-shrink-0 pointer-events-none my-6 self-stretch"
            style={{
              transition: 'opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1) 150ms',
              opacity: isVisible ? 1 : 0,
            }}
            aria-hidden="true"
          >
            <span className="absolute top-1/2 -translate-y-1/2 -left-[4.5px] w-2.5 h-2.5 rounded-full bg-[#D4AF37] ring-4 ring-[#FAF8F5] shadow-[0_1px_6px_rgba(212,175,55,0.4)]" />
          </div>

          {/* -------------------------------------------------------------
              2. RIGHT EXPANSIVE CONTENT AREA: HEADER + 4 ARCHED PROCESS CARDS
             ------------------------------------------------------------- */}
          <div className="flex-1 flex flex-col justify-between py-2 lg:py-2">

            {/* Editorial Header Block (Exact Complete User Manifesto Copy) */}
            <div
              className="max-w-4xl mb-8 sm:mb-10 lg:mb-8 xl:mb-10 bg-white/75 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-5 sm:p-6 lg:p-0 rounded-2xl lg:rounded-none border border-slate-200/60 lg:border-none shadow-sm lg:shadow-none"
              style={{
                transition: 'opacity 1100ms cubic-bezier(0.16, 1, 0.3, 1) 100ms, transform 1100ms cubic-bezier(0.16, 1, 0.3, 1) 100ms, filter 1100ms cubic-bezier(0.16, 1, 0.3, 1) 100ms',
                opacity: isVisible ? 1 : 0,
                filter: isVisible ? 'blur(0px)' : 'blur(12px)',
                transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
              }}
            >
              
              {/* Eyebrow: OUR COMMITMENT — */}
              <div className="inline-flex items-center gap-3 text-[#1E5FA8] mb-2 sm:mb-3">
                <span className="font-sans text-[11px] sm:text-[12px] xl:text-[13px] font-bold tracking-[0.24em] uppercase text-[#1E5FA8]">
                  OUR COMMITMENT
                </span>
                <span className="w-12 sm:w-16 h-[1.5px] bg-[#1E5FA8]/50 inline-block" />
              </div>

              {/* Headline */}
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[40px] xl:text-[46px] 2xl:text-[50px] font-bold text-[#0F172A] leading-[1.14] tracking-tight mb-3">
                Our <span className="italic font-normal text-[#1E5FA8]">Quality</span> Practices
              </h2>

              {/* Complete Manifesto Description Copy */}
              <p className="font-sans text-[13.5px] sm:text-[14px] xl:text-[14.5px] text-slate-700 font-normal leading-relaxed">
                Quality is the chief concern of our company. We invest all our resources to ensure that the Fabrics our valued clients procure from us match the highest quality standards. The entire manufacturing process is under strict supervision of experts who make sure that the Fabrics supplied to our customers are flawless.
              </p>
            </div>

            {/* 4 Arched Process Cards Pipeline Row with Line-by-Line Formatting */}
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-4 xl:gap-5 2xl:gap-6 items-stretch relative z-10">
                {QUALITY_STEPS.map((step, index) => (
                  <InteractiveCard
                    key={step.id}
                    step={step}
                    index={index}
                    isVisible={isVisible}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
