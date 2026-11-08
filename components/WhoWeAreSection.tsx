'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

// Word token structure for scroll reading animation
interface SentenceWord {
  text: string;
  isItalic: boolean;
  weight?: 'bold' | 'semibold' | 'normal';
  wordIdx: number;
}

interface RawSegment {
  text: string;
  isItalic: boolean;
  weight?: 'bold' | 'semibold' | 'normal';
}

// Paragraph 2: Craftsmanship & Quality Manifesto
const RAW_P2: RawSegment[] = [
  { text: "These articles of clothing are ", isItalic: false },
  { text: "intricately designed ", isItalic: true },
  { text: "in attractive colors, embroideries and embellishments. ", isItalic: false },
  { text: "We are here to give you the ", isItalic: false },
  { text: "best quality fabrics ", isItalic: true },
  { text: "that are regularly updated in different fabrics, prints and styles. ", isItalic: false },
  { text: "This website currently works extensively with ", isItalic: false },
  { text: "women’s fashion. ", isItalic: true },
  { text: "We at Viral Fabrics bring on board an inherent assurance of ", isItalic: false },
  { text: "profound research, ", isItalic: true },
  { text: "uncompromised quality ", isItalic: true },
  { text: "and ", isItalic: false },
  { text: "amazing designs.", isItalic: true },
];

const WORDS_P2: SentenceWord[] = [];
let p2Count = 0;
RAW_P2.forEach((seg) => {
  const tokens = seg.text.split(/(\s+)/);
  tokens.forEach((token) => {
    if (token) {
      const isWord = token.trim().length > 0;
      WORDS_P2.push({
        text: token,
        isItalic: seg.isItalic && isWord,
        weight: isWord ? seg.weight : undefined,
        wordIdx: isWord ? p2Count++ : -1,
      });
    }
  });
});

const TOTAL_WORDS_P2 = Math.max(p2Count, 1);

// Interactive animated number counter for metrics with cinematic motion blur & native 60fps/120fps direct DOM updates
function AnimatedCounter({ 
  end, 
  duration = 600, 
  suffix = '', 
  formatCommas = false 
}: { 
  end: number; 
  duration?: number; 
  suffix?: string; 
  formatCommas?: boolean; 
}) {
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const currentEl = elementRef.current;
    if (!currentEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(currentEl);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Fast, snappy easeOutCubic: rapid roll with smooth, elegant deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * end);

      // Authentic cinematic motion blur: stays prominent (3.6px) during the high-speed roll,
      // progressively clears to 1px as it decelerates, and snaps to crystal sharpness (0px) at the finish.
      let blurPx = 0;
      if (progress < 0.45) {
        blurPx = 3.6;
      } else if (progress < 0.85) {
        const t = (progress - 0.45) / 0.40;
        blurPx = 3.6 * (1 - t * t);
      } else {
        const t = (progress - 0.85) / 0.15;
        blurPx = Math.max(0, 1.0 * (1 - t));
      }

      if (elementRef.current) {
        const formatted = formatCommas ? current.toLocaleString('en-IN') : current;
        elementRef.current.textContent = `${formatted}${suffix}`;
        elementRef.current.style.filter = progress < 1 && blurPx > 0.05 ? `blur(${blurPx.toFixed(2)}px)` : 'none';
        elementRef.current.style.transform = progress < 1 ? `translate3d(0, ${(1 - easeProgress) * 2.5}px, 0)` : 'none';
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        if (elementRef.current) {
          const finalFormatted = formatCommas ? end.toLocaleString('en-IN') : end;
          elementRef.current.textContent = `${finalFormatted}${suffix}`;
          elementRef.current.style.filter = 'none';
          elementRef.current.style.transform = 'none';
        }
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, end, duration, formatCommas, suffix]);

  // Initial SSR / first-paint text
  const initialFormatted = formatCommas ? (0).toLocaleString('en-IN') : 0;

  return (
    <span 
      ref={elementRef} 
      className="tabular-nums inline-block font-sans will-change-[transform,filter]"
    >
      {initialFormatted}{suffix}
    </span>
  );
}

export function WhoWeAreSection() {
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [p2Progress, setP2Progress] = useState(0);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  // Pure scroll-driven reading wave: advances word-by-word on every scroll, slow and silky smooth
  useEffect(() => {
    let rafId: number | null = null;

    const updateTarget = () => {
      const el = p2Ref.current || sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Generous scroll range (~520px) so words illuminate word-by-word slowly and smoothly
      const start = vh * 0.82;
      const end = vh * 0.26;

      let raw = (start - rect.top) / (start - end);
      raw = Math.max(0, Math.min(1, raw));

      targetProgressRef.current = raw;
    };

    // Smooth liquid momentum loop: gives buttery-smooth, word-by-word scroll progression
    const tick = () => {
      updateTarget();

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0005) {
        currentProgressRef.current += diff * 0.15;
        setP2Progress(currentProgressRef.current);
      } else if (currentProgressRef.current !== targetProgressRef.current) {
        currentProgressRef.current = targetProgressRef.current;
        setP2Progress(currentProgressRef.current);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const onScroll = () => {
      updateTarget();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section 
      id="who-we-are" 
      ref={sectionRef}
      className="relative w-full text-[#2e3937] pt-36 sm:pt-42 md:pt-46 lg:pt-50 xl:pt-54 pb-40 sm:pb-48 md:pb-52 lg:pb-60 xl:pb-64 overflow-hidden selection:bg-[#375785] selection:text-white"
    >
      {/* Seamless transition underlay for the bottom torn edge into Fabrics Portfolio (#F5F5F5) */}
      <div 
        className="absolute inset-x-0 bottom-0 h-80 sm:h-96 lg:h-[420px] bg-[#F5F5F5] z-0 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Authentic One-Piece Torn Silk Canvas Background (Single Image, 100% Clean) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/images/who-we-are-bg.png"
          alt="Viral Fabrics Who We Are Background Canvas"
          fill
          priority
          sizes="100vw"
          className="w-full h-full object-cover sm:object-fill pointer-events-none"
        />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-14">
        
        {/* Main Editorial Block - Matching Preferred Proportions & Layout (5% Font Boost) */}
        <div className="max-w-4xl lg:max-w-[920px] mx-auto text-center flex flex-col items-center">
          
          {/* Eyebrow Editorial Ornament - Luxury Lines with Terminal Dots/Diamonds (as in reference) */}
          <div className="inline-flex items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-6 text-[#1d3557]">
            <svg width="44" height="8" viewBox="0 0 44 8" fill="none" className="shrink-0" aria-hidden="true">
              <line x1="0" y1="4" x2="36" y2="4" stroke="#375785" strokeWidth="1.2" strokeOpacity="0.45" />
              <circle cx="39.5" cy="4" r="2.2" fill="#1d3557" />
            </svg>
            <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.24em] uppercase font-sans text-[#1d3557]">
              Who We Are
            </span>
            <svg width="44" height="8" viewBox="0 0 44 8" fill="none" className="shrink-0" aria-hidden="true">
              <circle cx="4.5" cy="4" r="2.2" fill="#1d3557" />
              <line x1="8" y1="4" x2="44" y2="4" stroke="#375785" strokeWidth="1.2" strokeOpacity="0.45" />
            </svg>
          </div>

          {/* Sentence 1: Opening Proclamation - 5% Larger Authoritative Headline */}
          <h2 className="font-heading text-[25px] sm:text-[32px] md:text-[38px] lg:text-[44px] xl:text-[46px] font-medium leading-[1.26] text-[#0f172a] tracking-normal">
            Welcome to <span className="font-serif italic font-semibold text-[#1d3557]">Viral Fabrics,</span> we are here to provide you a <span className="font-serif italic font-semibold text-[#1d3557]">stunning gamut of fabrics.</span>
          </h2>

          {/* Sentence 2: Craftsmanship & Quality Manifesto - Pure Scroll-Driven Reading Wave (Word-By-Word, Smooth and Tactile) */}
          <p 
            ref={p2Ref}
            className="font-heading text-[21px] sm:text-[25px] md:text-[32px] lg:text-[36px] leading-[1.3] sm:leading-[1.32] tracking-normal mt-5 sm:mt-6 max-w-4xl mx-auto cursor-default"
          >
            {WORDS_P2.map((item, idx) => {
              if (item.wordIdx === -1) {
                return <span key={`p2-space-${idx}`}>{item.text}</span>;
              }

              // Active reading word index under scroll (0.0 to 58.0)
              const activeWord = p2Progress * (TOTAL_WORDS_P2 - 1);
              const diff = activeWord - item.wordIdx;

              let tierClass = '';
              let dynamicOpacity = 0.72;

              if (p2Progress >= 0.98 || diff >= 0.8) {
                // Tier 1: Wave has reached this word -> BOLD (Crisp, authoritative, 100% visible)
                if (item.isItalic) {
                  tierClass = 'font-serif italic font-bold text-[#1d3557] drop-shadow-[0_1px_6px_rgba(29,53,87,0.18)]';
                } else {
                  tierClass = 'font-semibold sm:font-bold text-[#0f172a]';
                }
                dynamicOpacity = 1.0;
              } else if (diff >= -0.6) {
                // Tier 2: Reading cursor right at current word -> SEMI-BOLD
                if (item.isItalic) {
                  tierClass = 'font-serif italic font-semibold text-[#1d3557]/90';
                } else {
                  tierClass = 'font-medium text-[#1e293b]';
                }
                dynamicOpacity = 0.88;
              } else {
                // Tier 3: Upcoming text -> LIGHT COLOR (Clean, legible slate)
                if (item.isItalic) {
                  tierClass = 'font-serif italic font-normal text-[#334e68]';
                } else {
                  tierClass = 'font-normal text-[#475569]';
                }
                dynamicOpacity = 0.72;
              }

              const boldSpacerClass = item.isItalic
                ? 'font-serif italic font-bold text-[#1d3557]'
                : 'font-semibold sm:font-bold text-[#0f172a]';

              return (
                <span
                  key={`p2-w-${idx}`}
                  className="inline-grid grid-cols-1 grid-rows-1 align-baseline"
                >
                  {/* Invisible bold spacer: reserves permanent bold width so lines never shift or re-wrap */}
                  <span
                    className={`invisible select-none pointer-events-none col-start-1 row-start-1 ${boldSpacerClass}`}
                    aria-hidden="true"
                  >
                    {item.text}
                  </span>
                  {/* Visible word: smoothly transitions between light, semi-bold and bold without width shifts */}
                  <span
                    style={{ opacity: dynamicOpacity }}
                    className={`col-start-1 row-start-1 transition-[opacity,color,text-shadow] duration-200 ease-out ${tierClass}`}
                  >
                    {item.text}
                  </span>
                </span>
              );
            })}
          </p>

          {/* Horizontal Hairline Divider */}
          <div className="w-16 sm:w-20 h-px bg-[#2e3937]/20 mx-auto mt-6 sm:mt-7 mb-5 sm:mb-6" />

          {/* Attribution & READ MORE Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 w-full max-w-full px-4">
            <div className="inline-flex items-center justify-center gap-2.5 sm:gap-3">
              <div className="relative w-[18px] h-[15px] sm:w-[21px] sm:h-[18px] shrink-0">
                <Image
                  src="/assets/brand/vf-emblem.png"
                  alt="Viral Fabrics Mark"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <p className="font-sans text-[12px] sm:text-[13px] font-semibold tracking-[0.2em] uppercase text-[#707c7a] text-center">
                &mdash; MR. VIRAL A. PATEL, FOUNDER &amp; MANAGING DIRECTOR
              </p>
            </div>

            {/* Polygon Cut Brand Navy READ MORE Button */}
            <Link
              href="/about-us"
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
              <span className="relative z-10 font-sans">READ MORE</span>
              <ArrowRight className="relative z-10 w-3.5 h-3.5 stroke-[2.2] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
            </Link>
          </div>

        </div>

        {/* FOUR MINIMALIST METRIC ITEMS - Darker, High-Contrast Typography for 100% Visibility */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 pt-7 sm:pt-9 lg:pt-10 border-t border-slate-300/80 mt-12 sm:mt-16 lg:mt-20">
          
          {/* Metric 01: Monthly Capacity */}
          <div className="space-y-1.5 group">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.2em] text-slate-600">
              <span className="truncate">MONTHLY CAPACITY</span>
              <span className="text-[#1d3557] font-mono font-semibold shrink-0 ml-1.5">01</span>
            </div>
            <p className="font-sans text-3xl sm:text-4xl lg:text-[48px] xl:text-[50px] font-semibold text-[#0f172a] tracking-tight group-hover:text-[#375785] transition-colors">
              <AnimatedCounter end={600000} duration={600} suffix="+" formatCommas={true} />
            </p>
            <p className="text-[11px] sm:text-[12px] lg:text-[12.5px] text-slate-700 font-normal leading-relaxed break-words">
              Meters / Month &middot; Continuous water-jet looms
            </p>
          </div>

          {/* Metric 02: Years of Leadership */}
          <div className="space-y-1.5 group">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.2em] text-slate-600">
              <span className="truncate">YEARS OF LEADERSHIP</span>
              <span className="text-[#1d3557] font-mono font-semibold shrink-0 ml-1.5">02</span>
            </div>
            <p className="font-sans text-3xl sm:text-4xl lg:text-[48px] xl:text-[50px] font-semibold text-[#0f172a] tracking-tight group-hover:text-[#375785] transition-colors">
              <AnimatedCounter end={12} duration={520} suffix="+" />
            </p>
            <p className="text-[11px] sm:text-[12px] lg:text-[12.5px] text-slate-700 font-normal leading-relaxed break-words">
              Surat, Gujarat &middot; Established 2012
            </p>
          </div>

          {/* Metric 03: Export Qualities */}
          <div className="space-y-1.5 group">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.2em] text-slate-600">
              <span className="truncate">EXPORT QUALITIES</span>
              <span className="text-[#1d3557] font-mono font-semibold shrink-0 ml-1.5">03</span>
            </div>
            <p className="font-sans text-3xl sm:text-4xl lg:text-[48px] xl:text-[50px] font-semibold text-[#0f172a] tracking-tight group-hover:text-[#375785] transition-colors">
              <AnimatedCounter end={10} duration={480} suffix="+" />
            </p>
            <p className="text-[11px] sm:text-[12px] lg:text-[12.5px] text-slate-700 font-normal leading-relaxed break-words">
              Synthetic Weaves &middot; Crepe, BSY, Satin &amp; Eco PET
            </p>
          </div>

          {/* Metric 04: Confidentiality & Accuracy */}
          <div className="space-y-1.5 group">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.2em] text-slate-600">
              <span className="truncate">DESIGN SECRECY</span>
              <span className="text-[#1d3557] font-mono font-semibold shrink-0 ml-1.5">04</span>
            </div>
            <p className="font-sans text-3xl sm:text-4xl lg:text-[48px] xl:text-[50px] font-semibold text-[#0f172a] tracking-tight group-hover:text-[#375785] transition-colors">
              <AnimatedCounter end={100} duration={550} suffix="%" />
            </p>
            <p className="text-[11px] sm:text-[12px] lg:text-[12.5px] text-slate-700 font-normal leading-relaxed break-words">
              Make-To-Order &middot; 100% Confidentiality
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
