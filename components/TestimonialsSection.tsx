'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  author: string;
  role: string;
  initials: string;
  stars: number;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    author: 'Rajesh Bhai',
    role: 'Textile Wholesaler, Surat',
    initials: 'RB',
    stars: 5,
    quote:
      'We’ve partnered with Viral Fabrics since their early days, and it’s been incredible to see their growth. Their commitment to excellence, especially under the leadership of Mr. Viral Patel, has made them a trusted name in the industry.',
  },
  {
    id: 2,
    author: 'Jignesh Shah',
    role: 'Fabric Trader, Ahmedabad',
    initials: 'JS',
    stars: 5,
    quote:
      'As a local wholesaler in Surat, I’ve seen many manufacturers come and go. Viral Fabrics has maintained its promise of their finest quality, and timely supply.',
  },
  {
    id: 3,
    author: 'Arvind Rajan',
    role: 'Apparel Sourcing Director, Mumbai',
    initials: 'AR',
    stars: 5,
    quote:
      'Their variety in fabrics and customization options help us fulfill diverse market needs. They are a dependable supplier with clear communication.',
  },
  {
    id: 4,
    author: 'Mahesh Jain',
    role: 'Ethnic Wear Brand, Jaipur',
    initials: 'MJ',
    stars: 5,
    quote:
      'I have been sourcing cotton and rayon fabrics from Viral Fabrics for the past 4 years. The quality is always consistent, and they never miss delivery deadlines. Mr. Viralbhai and his team are very responsive and easy to work with.',
  },
  {
    id: 5,
    author: 'Mr. Karan Malhotra',
    role: 'International Export House, Delhi',
    initials: 'KM',
    stars: 5,
    quote:
      'As an export house dealing with global clients, fabric quality and timely dispatch are crucial. Viral Fabrics has exceeded expectations on both fronts. Their professionalism and service make them stand out in the Surat textile market.',
  },
  {
    id: 6,
    author: 'Devansh Patel',
    role: 'Cloth & Fashion Studio, Surat',
    initials: 'DP',
    stars: 5,
    quote:
      'From sample to delivery, Viral Fabrics has been an excellent partner. Their fabrics quality is top-notch and the service is truly professional.',
  },
];

const TOTAL = TESTIMONIALS.length; // 6

export const TestimonialsSection: React.FC = () => {
  // Active testimonial index (0..5) - locked DEAD CENTER
  // Initial load: idx 0 (Rajesh Bhai) in Center, idx 5 (Devansh Patel) on Left, idx 1 (Jignesh Shah) on Right (Exact 1:1 match with user mockup)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile swipe support
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Responsive mobile/tablet threshold (< 640px displays single center card)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer for graceful entrance
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Butter-Smooth Navigation Actions (Pure GPU transition, zero timers)
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TOTAL);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + TOTAL) % TOTAL);
  }, []);

  const goToSlide = (targetIdx: number) => {
    setCurrentIndex(targetIdx);
  };

  // Continuous Right-to-Left Autoplay every 2.8s (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 2800);
    return () => clearInterval(interval);
  }, [isPaused, handleNext, currentIndex]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Calculate circular distance from currentIndex (-2, -1, 0, 1, 2, 3)
  const getDiff = (itemIndex: number) => {
    let diff = (itemIndex - currentIndex) % TOTAL;
    if (diff > TOTAL / 2) diff -= TOTAL;
    if (diff <= -TOTAL / 2) diff += TOTAL;
    return diff;
  };

  // Get exact GPU-accelerated slot position for each card
  const getCardStyle = (diff: number) => {
    if (isMobile) {
      if (diff === 0) {
        return {
          left: '50%',
          transform: 'translate3d(-50%, -50%, 0) scale(1)',
          opacity: 1,
          zIndex: 20,
          pointerEvents: 'auto' as const,
          visibility: 'visible' as const,
          transition: 'all 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        };
      }
      return {
        left: diff > 0 ? '160%' : '-60%',
        transform: 'translate3d(-50%, -50%, 0) scale(0.85)',
        opacity: 0,
        zIndex: 1,
        pointerEvents: 'none' as const,
        visibility: 'hidden' as const,
        transition: 'none',
      };
    }

    // Desktop & Tablet (>= 860px): 3 visible cards (Left, Center, Right)
    // Lateral offset calculated to guarantee ~20-25px gap between center and side cards
    const offset = 'clamp(285px, 26vw, 360px)';
    const smoothTransition = 'all 700ms cubic-bezier(0.16, 1, 0.3, 1)';

    if (diff === 0) {
      // Center active card: Dead Center (50%), zoomed (1.06), elevated luxury shadow
      return {
        left: '50%',
        transform: 'translate3d(-50%, -50%, 0) scale(1.06)',
        opacity: 1,
        zIndex: 20,
        pointerEvents: 'auto' as const,
        visibility: 'visible' as const,
        transition: smoothTransition,
      };
    }

    if (diff === -1) {
      // Left card: placed symmetrically to the left with ~25px gap from center card
      return {
        left: `calc(50% - ${offset})`,
        transform: 'translate3d(-50%, -50%, 0) scale(0.88)',
        opacity: 0.75,
        zIndex: 10,
        pointerEvents: 'auto' as const,
        cursor: 'pointer',
        visibility: 'visible' as const,
        transition: smoothTransition,
      };
    }

    if (diff === 1) {
      // Right card: placed symmetrically to the right with ~25px gap from center card
      return {
        left: `calc(50% + ${offset})`,
        transform: 'translate3d(-50%, -50%, 0) scale(0.88)',
        opacity: 0.75,
        zIndex: 10,
        pointerEvents: 'auto' as const,
        cursor: 'pointer',
        visibility: 'visible' as const,
        transition: smoothTransition,
      };
    }

    // Off-stage left:
    // If wrapping around (|diff| >= 3), transition is 'none' to prevent flying across the screen
    if (diff <= -2) {
      return {
        left: 'calc(50% - 680px)',
        transform: 'translate3d(-50%, -50%, 0) scale(0.75)',
        opacity: 0,
        zIndex: 1,
        pointerEvents: 'none' as const,
        visibility: 'hidden' as const,
        transition: diff === -2 ? smoothTransition : 'none',
      };
    }

    // diff >= 2: Off-stage right
    return {
      left: 'calc(50% + 680px)',
      transform: 'translate3d(-50%, -50%, 0) scale(0.75)',
      opacity: 0,
      zIndex: 1,
      pointerEvents: 'none' as const,
      visibility: 'hidden' as const,
      transition: diff === 2 ? smoothTransition : 'none',
    };
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full py-10 sm:py-12 lg:py-14 bg-white overflow-hidden selection:bg-[#1E5FA8] selection:text-white"
    >
      {/* =========================================================
          EXACT USER BACKGROUND: Minimal Blue Fabric Waves Canvas
          - Soft aesthetic blur (blur-[2.5px] scale-105) for luxury editorial depth
          - Top-left: Icy white silk drape
          - Delicate fine blue line accents
          - Bottom-right: Deep vibrant royal blue fabric folds
         ========================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/images/testimonials-bg.png"
          alt="Minimal Blue Fabric Waves Background"
          fill
          priority={true}
          className="object-cover object-center blur-[2.5px] scale-105"
        />
      </div>

      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* -------------------------------------------------------------
            1. SECTION HEADER (Matching Exact Mockup Typography)
           ------------------------------------------------------------- */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center justify-center gap-2.5 mb-2.5">
            <span className="w-10 sm:w-14 h-[1px] bg-[#1E5FA8]/40 inline-block" />
            <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.22em] uppercase text-[#1E5FA8]">
              CLIENT VOICES
            </span>
            <span className="w-10 sm:w-14 h-[1px] bg-[#1E5FA8]/40 inline-block" />
          </div>

          {/* Headline */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#0A2540] tracking-tight mb-2">
            Testimonials
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-[13.5px] sm:text-[14.5px] text-slate-600 font-normal leading-relaxed">
            Trusted by fashion businesses for consistent quality, reliability and service.
          </p>
        </div>

        {/* -------------------------------------------------------------
            2. BUTTER-SMOOTH 3D CAROUSEL (Unclipped, No Overlap, Flank Buttons)
           ------------------------------------------------------------- */}
        <div className="relative max-w-6xl xl:max-w-7xl mx-auto flex items-center justify-between px-1 sm:px-3">

          {/* Left Arrow Button (Matching circular white button with chevron) */}
          <button
            type="button"
            onClick={handlePrev}
            className="w-10 h-10 sm:w-11 sm:h-11 xl:w-12 xl:h-12 rounded-full bg-white shadow-[0_4px_16px_rgba(15,23,42,0.10)] border border-slate-100 flex items-center justify-center text-[#1E5FA8] hover:bg-[#1E5FA8] hover:text-white hover:border-[#1E5FA8] transition-all duration-300 flex-shrink-0 z-30 cursor-pointer hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Carousel Stage Container (Unclipped, zero hard borders, centered) */}
          <div
            className="relative flex-1 h-[310px] sm:h-[330px] lg:h-[340px] mx-1 sm:mx-2 lg:mx-3 overflow-visible"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {TESTIMONIALS.map((item, idx) => {
              const diff = getDiff(idx);
              const isCenter = diff === 0;
              const cardStyle = getCardStyle(diff);

              return (
                <div
                  key={item.id}
                  style={cardStyle}
                  onClick={() => {
                    if (diff === -1) handlePrev();
                    if (diff === 1) handleNext();
                  }}
                  className={`absolute top-1/2 w-[260px] sm:w-[275px] md:w-[280px] lg:w-[285px] xl:w-[335px] min-h-[235px] sm:min-h-[245px] flex flex-col justify-between p-4 sm:p-5 lg:p-6 select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isCenter
                      ? 'bg-white border-2 border-[#60A5FA]/60 shadow-[0_16px_40px_rgba(30,95,168,0.14)] rounded-[22px] sm:rounded-[26px] z-20 opacity-100'
                      : 'bg-white border border-slate-200/80 shadow-[0_6px_22px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_28px_rgba(15,23,42,0.10)] rounded-[20px] sm:rounded-[24px] hover:opacity-95 z-10 cursor-pointer'
                  }`}
                >
                  {/* Top Row: Soft Blue Quote Icon + 5 Gold Stars (Exact Mockup Match) */}
                  <div className="flex items-center justify-between mb-2">
                    {/* Sky Blue Quotation Icon */}
                    <div className="text-[#60A5FA] group-hover:scale-105 transition-transform duration-300">
                      <svg
                        className="w-6 h-6 sm:w-7 sm:h-7 fill-[#60A5FA]"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {/* 5 Golden Stars */}
                    <div className="flex items-center gap-1 text-[#F59E0B]">
                      {[...Array(item.stars)].map((_, sIdx) => (
                        <svg
                          key={sIdx}
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current drop-shadow-[0_1px_1px_rgba(245,158,11,0.2)]"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Middle: Client Quote */}
                  <p
                    className={`font-sans leading-[1.6] my-auto ${
                      isCenter
                        ? 'text-[12.5px] sm:text-[13px] lg:text-[13.5px] text-slate-700 font-normal'
                        : 'text-[12px] sm:text-[12.5px] text-slate-600 font-normal line-clamp-4'
                    }`}
                  >
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Bottom: Client Profile with Round Avatar & Details (Exact Mockup Match) */}
                  <div className="pt-3 mt-2.5 border-t border-slate-100 flex items-center gap-2.5">
                    {/* Circular Avatar / Monogram */}
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-[11px] sm:text-[12px] tracking-wider shrink-0 transition-transform ${
                        isCenter
                          ? 'bg-[#1E3A5F] text-white shadow-sm ring-2 ring-[#1E5FA8]/20'
                          : 'bg-[#E0F2FE] text-[#0369A1]'
                      }`}
                    >
                      {item.initials}
                    </div>

                    {/* Name & Role */}
                    <div className="text-left min-w-0">
                      <p className="font-heading text-[13.5px] sm:text-[14.5px] font-bold text-[#0A2540] tracking-tight truncate">
                        {item.author}
                      </p>
                      <p className="font-sans text-[11px] sm:text-[11.5px] text-slate-500 font-normal truncate mt-0.5">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button (Matching circular white button with chevron) */}
          <button
            type="button"
            onClick={handleNext}
            className="w-10 h-10 sm:w-11 sm:h-11 xl:w-12 xl:h-12 rounded-full bg-white shadow-[0_4px_16px_rgba(15,23,42,0.10)] border border-slate-100 flex items-center justify-center text-[#1E5FA8] hover:bg-[#1E5FA8] hover:text-white hover:border-[#1E5FA8] transition-all duration-300 flex-shrink-0 z-30 cursor-pointer hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* -------------------------------------------------------------
            3. PAGINATION DOTS (Exact Matching Circular Dots from Mockup)
           ------------------------------------------------------------- */}
        <div className="flex items-center justify-center gap-2 mt-5 sm:mt-7">
          {TESTIMONIALS.map((_, dotIdx) => {
            const isActive = currentIndex === dotIdx;
            return (
              <button
                key={dotIdx}
                type="button"
                onClick={() => goToSlide(dotIdx)}
                className={`transition-all duration-300 rounded-full h-2.5 w-2.5 focus:outline-none cursor-pointer ${
                  isActive
                    ? 'bg-[#3B82F6] scale-110 shadow-sm'
                    : 'bg-slate-300/80 hover:bg-slate-400'
                }`}
                aria-label={`Go to testimonial ${dotIdx + 1}`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};
