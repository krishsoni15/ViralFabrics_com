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
  videoSrc: string;
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
    videoSrc: '/videos/quality/greige-level.mp4',
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
    videoSrc: '/videos/quality/finished-level.mp4',
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
    videoSrc: '/videos/quality/processing-level.mp4',
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
    videoSrc: '/videos/quality/packing-level.mp4',
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
  isActiveStep?: boolean;
  onActivate?: () => void;
}> = ({ step, index, isVisible, isActiveStep = false, onActivate }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const IconComponent = step.icon;
  const delayMs = index * 130 + 150;

  // Detect mobile / touch viewports
  useEffect(() => {
    const checkMobile = () => {
      const mobileQuery = window.matchMedia('(hover: none), (max-width: 1023px)');
      setIsMobile(mobileQuery.matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // IntersectionObserver to auto-play on scroll on mobile
  useEffect(() => {
    if (!isMobile) return;
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [isMobile]);

  // Unified Video Playback Controller:
  // - On Mobile: Auto-plays when scrolled into view (isInView)
  // - On Desktop: Plays smoothly when active in scroll stack or hovered
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const shouldPlay = isMobile ? isInView : (isActiveStep || tilt.isHovered);

    if (shouldPlay) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoPlaying(true);
          })
          .catch(() => {
            // Handled gracefully (e.g. quick scroll or power saving)
          });
      }
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  }, [isMobile, isInView, isActiveStep, tilt.isHovered]);

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

  const isHighlighted = isActiveStep || tilt.isHovered;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onActivate}
      className={`group relative flex flex-col bg-white/90 hover:bg-white backdrop-blur-xl rounded-t-[44px] sm:rounded-t-[52px] lg:rounded-t-[54px] xl:rounded-t-[60px] rounded-b-[20px] sm:rounded-b-[22px] border ${
        isActiveStep
          ? 'border-[#1E5FA8] ring-2 ring-[#1E5FA8]/25 shadow-[0_20px_45px_-8px_rgba(30,95,168,0.25),0_0_20px_rgba(30,95,168,0.12)] -translate-y-1.5'
          : 'border-white/90 hover:border-[#1E5FA8]/40 shadow-[0_10px_30px_rgba(15,23,42,0.05),0_1px_3px_rgba(30,95,168,0.04)]'
      } overflow-visible cursor-pointer will-change-[transform,filter,opacity] transition-all duration-500`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transform: isVisible
          ? tilt.isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translate3d(0, -10px, 12px)`
            : isActiveStep
              ? 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, -6px, 0)'
              : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)'
          : 'perspective(1000px) translate3d(0, 36px, 0)',
        transition: tilt.isHovered
          ? 'transform 120ms ease-out, box-shadow 300ms ease-out'
          : `opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, filter 1000ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, box-shadow 400ms ease-out, border-color 300ms ease-out`,
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0px)' : 'blur(12px)',
        boxShadow: tilt.isHovered
          ? '0 24px 50px -8px rgba(30, 95, 168, 0.28), 0 0 25px rgba(30, 95, 168, 0.14), inset 0 1px 2px rgba(255, 255, 255, 1)'
          : isActiveStep
            ? '0 20px 42px -8px rgba(30, 95, 168, 0.22), 0 0 18px rgba(30, 95, 168, 0.10), inset 0 1px 2px rgba(255, 255, 255, 1)'
            : '0 10px 30px -5px rgba(15, 23, 42, 0.05), 0 2px 10px rgba(30, 95, 168, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
      }}
    >
      {/* 3D Luminous Surface Glare */}
      <div
        className="absolute inset-0 rounded-t-[44px] sm:rounded-t-[52px] lg:rounded-t-[54px] xl:rounded-t-[60px] rounded-b-[20px] sm:rounded-b-[22px] pointer-events-none transition-opacity duration-300 z-30"
        style={{
          background: tilt.isHovered
            ? `radial-gradient(circle 200px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.55) 0%, transparent 80%)`
            : 'none',
          opacity: tilt.isHovered ? 1 : 0,
        }}
      />

      {/* Subtle Brand Blue Ambient Glow at base of card */}
      <div className={`absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t ${isActiveStep ? 'from-[#1E5FA8]/[0.12] via-[#3B82F6]/[0.05]' : 'from-[#1E5FA8]/[0.07] via-[#3B82F6]/[0.02]'} to-transparent pointer-events-none rounded-b-[20px] sm:rounded-b-[22px] transition-all duration-500`} />

      {/* 1. Arched Fabric Process Photo / Video Top */}
      <div 
        className="relative w-full h-32 sm:h-36 lg:h-32 xl:h-38 2xl:h-42 overflow-hidden rounded-t-[44px] sm:rounded-t-[52px] lg:rounded-t-[54px] xl:rounded-t-[60px] bg-slate-900 flex-shrink-0"
        style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
      >
        {/* Base Poster Image */}
        <Image
          src={step.imageSrc}
          alt={step.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-cover object-center transition-all duration-700 ease-out ${
            isVideoPlaying ? 'opacity-0 scale-105' : 'opacity-100 group-hover:scale-108'
          }`}
          priority={index < 2}
        />

        {/* Cinematic Quality Process Video (Plays on Hover / Active Scroll / Mobile In-View) */}
        <video
          ref={videoRef}
          src={step.videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-500 ease-out ${
            isVideoPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Active Stage Indicator Badge at top right */}
        {isActiveStep && (
          <div className="absolute top-3 right-3 z-20 px-2 py-0.5 rounded-full bg-[#1E5FA8]/90 text-white text-[9.5px] font-mono font-bold tracking-widest uppercase shadow-[0_2px_8px_rgba(0,0,0,0.3)] animate-pulse">
            AUDITING
          </div>
        )}

        {/* Subtle arched top shadow ring */}
        <div className="absolute inset-0 rounded-t-[44px] sm:rounded-t-[52px] lg:rounded-t-[54px] xl:rounded-t-[60px] ring-1 ring-inset ring-black/10 pointer-events-none z-10" />
      </div>

      {/* 2. Floating Circular Icon Badge (Crystalline Glass Jewel) */}
      <div
        className="relative -mt-5 sm:-mt-6 self-center z-20 flex items-center justify-center flex-shrink-0 transition-transform duration-500 ease-out"
        style={{
          transform: tilt.isHovered ? 'translateZ(20px) scale(1.12)' : 'translateZ(0px) scale(1)',
        }}
      >
        <div className={`w-11 h-11 sm:w-12 sm:h-12 xl:w-13 xl:h-13 rounded-full backdrop-blur-md border border-white shadow-[0_4px_16px_rgba(30,95,168,0.14)] flex items-center justify-center transition-all duration-300 ${
          isActiveStep
            ? 'bg-gradient-to-tr from-[#1E5FA8] to-[#2563EB] text-white shadow-[0_6px_22px_rgba(30,95,168,0.4)] scale-105'
            : 'bg-white/95 text-[#1E3A5F] group-hover:bg-gradient-to-tr group-hover:from-[#1E5FA8] group-hover:to-[#2563EB] group-hover:text-white group-hover:shadow-[0_6px_22px_rgba(30,95,168,0.35)]'
        }`}>
          <IconComponent className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[1.8]" />
        </div>
      </div>

      {/* 3. Card Content (Title, Distinct Proper Lines, Blue Underline) */}
      <div className="flex-1 flex flex-col items-center pt-2.5 pb-6 px-3.5 sm:px-4 xl:px-4.5 text-center justify-between relative z-10">
        <div>
          <span className="block font-mono text-[10px] font-bold tracking-widest uppercase text-[#1E5FA8] mb-1">
            STAGE {step.stepNum}
          </span>
          <h3 className={`font-heading text-[16.5px] sm:text-[17.5px] xl:text-[18.5px] font-bold tracking-tight mb-2.5 transition-colors ${
            isActiveStep ? 'text-[#1E5FA8]' : 'text-[#1E3A5F] group-hover:text-[#1E5FA8]'
          }`}>
            {step.title}
          </h3>
        </div>

        {/* Distinct Proper Lines (Highly Legible & Bold/Medium Contrast) */}
        <div className="flex-1 flex flex-col items-center justify-center gap-1.5 w-full my-auto">
          {step.items.map((line, lIdx) => (
            <p
              key={lIdx}
              className={`font-sans text-[12.5px] sm:text-[13px] xl:text-[13.5px] font-medium leading-[1.45] text-center transition-colors ${
                isActiveStep ? 'text-slate-900 font-semibold' : 'text-slate-700 group-hover:text-slate-900'
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Centered Small Blue Accent Bar with Luminous Gradient */}
        <div className={`h-[2.5px] bg-gradient-to-r from-[#1E5FA8] via-[#3B82F6] to-[#60A5FA] mx-auto mt-3 rounded-full transition-all duration-300 shadow-[0_1px_6px_rgba(30,95,168,0.3)] ${
          isActiveStep ? 'w-16 shadow-[0_1px_10px_rgba(30,95,168,0.5)]' : 'w-8 sm:w-10 group-hover:w-14'
        }`} />
      </div>

      {/* 4. Sequential Pipeline Connector with Arrow to next card (Desktop) */}
      {index < QUALITY_STEPS.length - 1 && (
        <div
          className="hidden lg:flex items-center justify-center absolute -right-3 xl:-right-4 2xl:-right-5 top-[58%] -translate-y-1/2 z-20 w-6 xl:w-8 2xl:w-10 pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-full relative flex items-center justify-end overflow-visible">
            {/* The connector line */}
            <div className={`w-full h-[2px] transition-all duration-500 rounded-full ${
              index < (isActiveStep ? index + 1 : 0)
                ? 'bg-gradient-to-r from-[#1E5FA8] via-[#3B82F6] to-[#60A5FA] shadow-[0_0_8px_rgba(30,95,168,0.45)]'
                : 'bg-gradient-to-r from-[#1E5FA8]/20 via-[#1E5FA8]/50 to-[#1E5FA8]/30'
            }`} />
            {/* Directional Arrow Head */}
            <div className="-ml-1 flex items-center justify-center text-[#1E5FA8] transform translate-x-1">
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.6] text-[#1E5FA8] drop-shadow-[0_1px_3px_rgba(30,95,168,0.4)]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const QualityPracticesSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Agnes Toth Sticky Pinning & Scroll-Linked Step Progress (Zero Lag)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!trackRef.current) return;
          const rect = trackRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const trackHeight = trackRef.current.offsetHeight;
          const scrollableDistance = trackHeight - windowHeight;

          // Trigger entrance unblur when section enters viewport
          if (rect.top < windowHeight * 0.88) {
            setIsVisible(true);
          }

          if (scrollableDistance > 0) {
            // Distance scrolled into the pinned runway
            const scrolled = -rect.top;
            const progress = Math.min(1, Math.max(0, scrolled / scrollableDistance));
            setScrollProgress(progress);

            // Progressive step illumination (0 -> 1 -> 2 -> 3)
            const step = Math.min(3, Math.floor(progress * 4));
            setActiveStepIndex(step);
          }

          // Parallax background drift for living depth
          if (bgRef.current) {
            const bgProgress = (windowHeight - rect.top) / (windowHeight + trackHeight);
            const bgOffset = (bgProgress - 0.5) * 40;
            bgRef.current.style.transform = `translate3d(0, ${bgOffset}px, 0)`;
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
      id="quality-track"
      ref={trackRef}
      className="relative w-full z-20 min-h-screen lg:h-[220vh]"
    >
      <section
        ref={sectionRef}
        id="quality"
        className="relative lg:sticky lg:top-0 w-full min-h-screen lg:h-screen lg:max-h-[1080px] flex items-center justify-center py-10 sm:py-14 lg:py-4 xl:py-6 bg-[#FAF8F5] overflow-hidden z-20 shadow-[0_-25px_60px_rgba(15,23,42,0.12)] selection:bg-[#1E5FA8] selection:text-white"
      >
        {/* =========================================================
            FULL-BLEED LUXURY SILK BACKGROUND (EDGE-TO-EDGE 100vw)
            - Exact user-uploaded silk drape artwork
            - Parallax drift on scroll creates subtle 3D living depth
           ========================================================= */}
        <div
          ref={bgRef}
          className="absolute inset-0 -top-8 -bottom-8 z-0 pointer-events-none select-none overflow-hidden will-change-transform"
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

        {/* Subtle Ethereal Ambient Light Accent */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/2 left-[30%] -translate-y-1/2 w-[550px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(30,95,168,0.04)_0%,transparent_70%)] blur-3xl" />
        </div>

        {/* =========================================================
            FULL-AREA CONTENT CANVAS (Cinematic max-w-[1720px] matching Hero)
           ========================================================= */}
        <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-10 xl:px-14">
          <div className="flex flex-col lg:flex-row items-stretch gap-5 sm:gap-7 lg:gap-5 xl:gap-8 2xl:gap-10">

            {/* -------------------------------------------------------------
                1. LEFT BLUE DRAPE PANEL (WITH 100% QUALITY ASSURANCE WREATH)
               ------------------------------------------------------------- */}
            <div
              ref={badgeRef}
              className="relative w-full lg:w-[20%] xl:w-[18%] 2xl:w-[17%] flex-shrink-0 flex flex-col items-center justify-center py-2 sm:py-3 lg:p-2 xl:p-3 overflow-hidden will-change-transform"
              style={{
                transition: 'opacity 1100ms cubic-bezier(0.16, 1, 0.3, 1), filter 1100ms cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: isVisible ? 1 : 0,
                filter: isVisible ? 'blur(0px)' : 'blur(14px)',
              }}
            >
              {/* Standalone 100% Quality Assurance Gold Laurel Wreath Badge Container */}
              <div className="relative z-10 w-28 sm:w-36 lg:w-40 xl:w-48 2xl:w-56 aspect-[605/536] group cursor-default transition-transform duration-700 ease-out hover:scale-106">
                
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
                  sizes="(max-width: 640px) 160px, (max-width: 1024px) 208px, 240px"
                  className="object-contain drop-shadow-[0_18px_36px_rgba(0,0,0,0.5)] drop-shadow-[0_4px_16px_rgba(212,175,55,0.4)]"
                />
              </div>

              {/* 5-Star Rated Authority Quality Pill Badge */}
              <div className="relative z-10 mt-2 sm:mt-3 lg:mt-3 xl:mt-4 transition-transform duration-500 ease-out hover:scale-105">
                <div className="relative w-28 sm:w-32 xl:w-44 aspect-[703/132] drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]">
                  <Image
                    src="/images/quality/5-star-rated-badge-clean.png"
                    alt="Viral Fabrics 5-Star Rated Quality Seal"
                    fill
                    sizes="190px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Vertical Hairline Divider with Gold Jewel Dot */}
            <div
              className="hidden lg:block relative w-[1px] bg-gradient-to-b from-transparent via-[#C5A880]/80 to-transparent flex-shrink-0 pointer-events-none my-4 self-stretch"
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
            <div className="flex-1 flex flex-col justify-between py-1 lg:py-1">

              {/* Editorial Header Block */}
              <div
                className="max-w-4xl mb-4 sm:mb-6 lg:mb-4 xl:mb-6 bg-[#FAF8F5]/90 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-4 sm:p-5 lg:p-0 rounded-2xl lg:rounded-none border border-white/80 lg:border-none shadow-[0_4px_24px_rgba(0,0,0,0.06)] lg:shadow-none text-center lg:text-left"
                style={{
                  transition: 'opacity 1100ms cubic-bezier(0.16, 1, 0.3, 1) 100ms, transform 1100ms cubic-bezier(0.16, 1, 0.3, 1) 100ms, filter 1100ms cubic-bezier(0.16, 1, 0.3, 1) 100ms',
                  opacity: isVisible ? 1 : 0,
                  filter: isVisible ? 'blur(0px)' : 'blur(12px)',
                  transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
                }}
              >
                
                {/* Eyebrow: OUR COMMITMENT — */}
                <div className="inline-flex items-center gap-2.5 text-[#1E5FA8] mb-1.5 sm:mb-2">
                  <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.26em] uppercase text-[#1E5FA8]">
                    OUR COMMITMENT
                  </span>
                  <span className="w-10 sm:w-14 h-[2px] bg-[#1E5FA8]/50 inline-block" />
                </div>

                {/* Headline */}
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-[36px] xl:text-[42px] 2xl:text-[46px] font-bold text-[#0F172A] leading-[1.12] tracking-tight mb-2 sm:mb-2.5">
                  Our <span className="italic font-normal text-[#1E5FA8]">Quality</span> Practices
                </h2>

                {/* Complete Manifesto Description Copy */}
                <p className="font-sans text-[14px] sm:text-[14.5px] xl:text-[15.5px] text-slate-700 font-normal leading-[1.65] max-w-4xl">
                  Quality is the chief concern of our company. We invest all our resources to ensure that the Fabrics our valued clients procure from us match the highest quality standards. The entire manufacturing process is under strict supervision of experts who make sure that the Fabrics supplied to our customers are flawless.
                </p>
              </div>

              {/* 4 Arched Process Cards Pipeline Row */}
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4.5 lg:gap-3.5 xl:gap-4.5 2xl:gap-5 items-stretch relative z-10">
                  {QUALITY_STEPS.map((step, index) => (
                    <InteractiveCard
                      key={step.id}
                      step={step}
                      index={index}
                      isVisible={isVisible}
                      isActiveStep={index === activeStepIndex}
                      onActivate={() => setActiveStepIndex(index)}
                    />
                  ))}
                </div>
              </div>

              {/* Interactive Step Tracker (Agnes Toth Signature Segmented Pills) */}
              <div className="hidden lg:flex items-center justify-between gap-6 mt-4 xl:mt-5 pt-3.5 border-t border-slate-200/80">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] font-bold text-[#1E5FA8] tracking-wider">
                    STAGE {String(activeStepIndex + 1).padStart(2, '0')} / 04
                  </span>
                  <span className="text-[12.5px] font-semibold text-slate-700 tracking-wide">
                    {QUALITY_STEPS[activeStepIndex].title} &mdash; <span className="font-normal text-slate-500">{QUALITY_STEPS[activeStepIndex].subtitle}</span>
                  </span>
                </div>

                {/* 4 Segmented Interactive Progress Pills */}
                <div className="flex items-center gap-2">
                  {QUALITY_STEPS.map((step, idx) => (
                    <button
                      key={`step-btn-${idx}`}
                      type="button"
                      onClick={() => {
                        setActiveStepIndex(idx);
                        if (trackRef.current) {
                          const trackTop = trackRef.current.offsetTop;
                          const scrollable = trackRef.current.offsetHeight - window.innerHeight;
                          window.scrollTo({
                            top: trackTop + (idx / 4) * scrollable + 10,
                            behavior: 'smooth',
                          });
                        }
                      }}
                      className={`group/pip flex items-center gap-2 h-7 px-3 rounded-full text-[11px] font-semibold transition-all duration-300 cursor-pointer ${
                        idx === activeStepIndex
                          ? 'bg-[#1E5FA8] text-white shadow-[0_2px_10px_rgba(30,95,168,0.35)] scale-105'
                          : idx < activeStepIndex
                            ? 'bg-[#1E5FA8]/15 text-[#1E5FA8] hover:bg-[#1E5FA8]/25'
                            : 'bg-slate-200/80 text-slate-500 hover:bg-slate-300/80'
                      }`}
                      aria-label={`Jump to stage ${step.stepNum}: ${step.title}`}
                    >
                      <span>{step.stepNum}</span>
                      <span className={`text-[10px] uppercase tracking-wider ${idx === activeStepIndex ? 'inline' : 'hidden xl:inline'}`}>
                        {step.title.replace('At ', '')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
