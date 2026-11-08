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
      'As a local wholesaler in Surat, I’ve seen many manufacturers come and go. Viral Fabrics has maintained its name because of their honesty, quality, and timely supply.',
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
    author: 'Devendra Patel',
    role: 'Couture Design Studio, Surat',
    initials: 'DP',
    stars: 5,
    quote:
      'From sample yardage to bulk container shipments, Viral Fabrics handles every order with immaculate precision. Their synthetic weaves and custom prints are truly world-class.',
  },
];

const TOTAL = TESTIMONIALS.length; // 6

export const TestimonialsSection: React.FC = () => {
  // Active testimonial index (0..5) - always pointing to the center zoomed card
  const [currentIndex, setCurrentIndex] = useState(0);

  // Animation direction & offset state
  // 0: idle at center; -1: sliding next (moving left); 1: sliding prev (moving right)
  const [slideDirection, setSlideDirection] = useState<'idle' | 'next' | 'prev'>('idle');
  const [isPaused, setIsPaused] = useState(false);
  const isAnimatingRef = useRef(false);

  // Responsive: on small screens, center card takes 100% width
  const [isMobile, setIsMobile] = useState(false);

  // Touch Swipe for Mobile
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer for smooth entrance
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

  // Smooth circular NEXT action (Glitch-Free)
  const handleNext = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setSlideDirection('next');

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % TOTAL);
      setSlideDirection('idle');
      isAnimatingRef.current = false;
    }, 460);
  }, []);

  // Smooth circular PREV action (Glitch-Free)
  const handlePrev = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setSlideDirection('prev');

    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + TOTAL) % TOTAL);
      setSlideDirection('idle');
      isAnimatingRef.current = false;
    }, 460);
  }, []);

  // Direct dot navigation
  const goToSlide = (targetIdx: number) => {
    if (isAnimatingRef.current || targetIdx === currentIndex) return;
    isAnimatingRef.current = true;
    const diff = (targetIdx - currentIndex + TOTAL) % TOTAL;
    const direction = diff <= TOTAL / 2 ? 'next' : 'prev';
    setSlideDirection(direction);

    setTimeout(() => {
      setCurrentIndex(targetIdx);
      setSlideDirection('idle');
      isAnimatingRef.current = false;
    }, 460);
  };

  // Autoplay every 5s (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

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

  // 5-slot circular window relative to currentIndex
  // Slots: -2 (off left), -1 (left visible), 0 (center zoomed), 1 (right visible), 2 (off right)
  const slotOffsets = isMobile ? [-1, 0, 1] : [-2, -1, 0, 1, 2];
  const slotWidth = isMobile ? 100 : 33.333333;

  // Track transform calculation based on direction
  // Base transform keeps slot 0 in the center
  const basePercent = isMobile ? -100 : -33.333333;
  let transformTranslate = basePercent;
  if (slideDirection === 'next') {
    transformTranslate = basePercent - slotWidth;
  } else if (slideDirection === 'prev') {
    transformTranslate = basePercent + slotWidth;
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FAF8F5] overflow-hidden selection:bg-[#1E5FA8] selection:text-white"
    >
      {/* =========================================================
          LUXURY SILK CANVAS BACKGROUND WITH GENTLE BILLOWING WAVES
          - Blue wave at bottom-left, champagne drape at bottom-right
         ========================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/images/testimonials/testimonials-silk-bg.webp"
          alt="Viral Fabrics Testimonials Silk Canvas"
          fill
          sizes="100vw"
          className="object-cover object-bottom opacity-90"
          priority
        />
      </div>

      {/* =========================================================
          CONTENT CANVAS (Centered Editorial Layout matching Mockup)
         ========================================================= */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">

        {/* -------------------------------------------------------------
            1. EDITORIAL HEADER (Client Voices — Testimonials)
           ------------------------------------------------------------- */}
        <div
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-14"
          style={{
            transition:
              'opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1), transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
          }}
        >
          {/* Eyebrow: — CLIENT VOICES — */}
          <div className="inline-flex items-center justify-center gap-3 text-[#1E5FA8] mb-2 sm:mb-3">
            <span className="w-8 sm:w-12 h-[1.5px] bg-[#1E5FA8]/50 inline-block" />
            <span className="font-sans text-[11px] sm:text-[12px] xl:text-[13px] font-bold tracking-[0.24em] uppercase text-[#1E5FA8]">
              CLIENT VOICES
            </span>
            <span className="w-8 sm:w-12 h-[1.5px] bg-[#1E5FA8]/50 inline-block" />
          </div>

          {/* Headline */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0F172A] tracking-tight mb-2.5">
            Testimonials
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-[13.5px] sm:text-[14.5px] text-slate-600 font-normal leading-relaxed">
            Trusted by fashion businesses for consistent quality, reliability and service.
          </p>
        </div>

        {/* -------------------------------------------------------------
            2. CAROUSEL STAGE WITH CENTER ZOOM & LATERAL NAVIGATION BUTTONS
           ------------------------------------------------------------- */}
        <div className="relative max-w-6xl xl:max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-4 lg:gap-5">

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-[0_4px_18px_rgba(15,23,42,0.12)] border border-slate-200/90 flex items-center justify-center text-[#1E3A5F] hover:bg-[#1E5FA8] hover:text-white hover:border-[#1E5FA8] transition-all duration-300 flex-shrink-0 z-30 cursor-pointer hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </button>

          {/* Carousel Window */}
          <div
            className="flex-1 overflow-hidden py-6 sm:py-8"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex items-center"
              style={{
                transform: `translateX(${transformTranslate}%)`,
                transition:
                  slideDirection !== 'idle'
                    ? 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'none',
              }}
            >
              {slotOffsets.map((offset) => {
                // Circular wrapping guarantees an authentic testimonial is always present
                const itemIndex = (currentIndex + offset + TOTAL * 10) % TOTAL;
                const item = TESTIMONIALS[itemIndex];
                const isCenter = offset === 0;

                return (
                  <div
                    key={`${item.id}-${offset}`}
                    className="flex-shrink-0 px-2 sm:px-3 lg:px-3.5 transition-all duration-450"
                    style={{
                      width: `${slotWidth}%`,
                    }}
                    onClick={() => {
                      if (offset === -1) handlePrev();
                      if (offset === 1) handleNext();
                    }}
                  >
                    <div
                      className={`group relative h-full min-h-[280px] sm:min-h-[300px] flex flex-col justify-between p-6 sm:p-7 lg:p-8 rounded-[24px] sm:rounded-[28px] transition-all duration-500 ease-out ${
                        isCenter
                          ? 'scale-105 sm:scale-108 lg:scale-110 bg-white border-2 border-[#1E5FA8]/50 shadow-[0_22px_50px_rgba(30,95,168,0.20)] z-20 opacity-100 ring-4 ring-[#1E5FA8]/5'
                          : 'scale-92 sm:scale-90 bg-white/95 backdrop-blur-xs border border-slate-200/80 shadow-[0_6px_22px_rgba(15,23,42,0.06)] opacity-75 hover:opacity-90 z-10 cursor-pointer hover:shadow-[0_10px_28px_rgba(15,23,42,0.08)]'
                      }`}
                    >
                      {/* Top Row: Blue Quote Icon + 5 Gold Stars */}
                      <div className="flex items-center justify-between mb-4">
                        {/* Custom Blue Double Quote Icon */}
                        <div className="text-[#1E5FA8] opacity-95 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>

                        {/* 5 Golden Stars */}
                        <div className="flex items-center gap-1 text-[#F59E0B]">
                          {[...Array(item.stars)].map((_, sIdx) => (
                            <svg
                              key={sIdx}
                              className="w-4 h-4 fill-current drop-shadow-[0_1px_2px_rgba(245,158,11,0.25)]"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>

                      {/* Middle: Client Quote */}
                      <p className="font-sans text-[13px] sm:text-[13.5px] lg:text-[14px] text-slate-700 font-normal leading-[1.65] my-auto">
                        &ldquo;{item.quote}&rdquo;
                      </p>

                      {/* Bottom: Client Profile with Round Avatar & Details (Matching Mockup) */}
                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-3">
                        {/* Circular Avatar / Monogram */}
                        <div
                          className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-[13px] tracking-wider shrink-0 transition-transform ${
                            isCenter
                              ? 'bg-gradient-to-br from-[#1E5FA8] to-[#0A2E52] text-white shadow-sm ring-2 ring-[#1E5FA8]/20'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {item.initials}
                        </div>

                        {/* Name & Role */}
                        <div className="text-left min-w-0">
                          <p className="font-heading text-[15px] sm:text-[16px] font-bold text-[#1E3A5F] tracking-tight truncate">
                            {item.author}
                          </p>
                          <p className="font-sans text-[11.5px] sm:text-[12px] text-slate-500 font-normal truncate mt-0.5">
                            {item.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-[0_4px_18px_rgba(15,23,42,0.12)] border border-slate-200/90 flex items-center justify-center text-[#1E3A5F] hover:bg-[#1E5FA8] hover:text-white hover:border-[#1E5FA8] transition-all duration-300 flex-shrink-0 z-30 cursor-pointer hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* -------------------------------------------------------------
            3. PAGINATION DOTS (6 Testimonials, Interactive & Animated)
           ------------------------------------------------------------- */}
        <div className="flex items-center justify-center gap-2 mt-8 sm:mt-11">
          {TESTIMONIALS.map((_, dotIdx) => {
            const isActive = currentIndex === dotIdx;
            return (
              <button
                key={dotIdx}
                type="button"
                onClick={() => goToSlide(dotIdx)}
                className={`transition-all duration-300 rounded-full h-2.5 focus:outline-none cursor-pointer ${
                  isActive
                    ? 'w-7 bg-[#1E5FA8] shadow-sm'
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
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
