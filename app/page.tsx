'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { WhoWeAreSection } from '@/components/WhoWeAreSection';
import { FabricsPortfolioSection } from '@/components/FabricsPortfolioSection';
import { QualityPracticesSection } from '@/components/QualityPracticesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';

// Exact character structure for directional unblur sweep
const HEADLINE_WORDS = [
  { word: 'Quality', chars: ['Q', 'u', 'a', 'l', 'i', 't', 'y'] },
  { word: 'Fabrics', chars: ['F', 'a', 'b', 'r', 'i', 'c', 's'] },
  { word: 'From', chars: ['F', 'r', 'o', 'm'] },
  { word: 'Around', chars: ['A', 'r', 'o', 'u', 'n', 'd'] },
  { word: 'The', chars: ['T', 'h', 'e'] },
  { word: 'World', chars: ['W', 'o', 'r', 'l', 'd'] },
];

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Track scroll position for hero parallax and text dissolve
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const headlineRef = React.useRef<HTMLHeadingElement>(null);
  const heroContentRef = React.useRef<HTMLDivElement>(null);
  const heroMediaRef = React.useRef<HTMLDivElement>(null);

  // Agnes Toth Hero Stacking Parallax & Text Dissolve (Zero React re-renders)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y <= window.innerHeight * 1.3) {
            if (heroContentRef.current) {
              const progress = Math.min(1, Math.max(0, y / 360));
              const opacity = 1 - progress;
              const blur = progress * 10;
              const translateY = progress * 24;
              heroContentRef.current.style.opacity = `${opacity}`;
              heroContentRef.current.style.filter = blur > 0.1 ? `blur(${blur}px)` : 'none';
              heroContentRef.current.style.transform = translateY > 0.1 ? `translate3d(0, ${translateY}px, 0)` : 'none';
            }
            if (heroMediaRef.current) {
              // Subtle background drift (matching agnestoth yPercent -12%)
              const parallaxY = -y * 0.14;
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

  // Trigger Agnes Toth luxury on-load unblur entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  // Agnes Toth signature directional left-to-right unblur sweep
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
            y: 8,
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            delay: 0.15,
            stagger: (i) => ((pos[i] - min) / span) * 1.3,
            clearProps: 'transform,willChange',
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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Hero video autoplay:', err);
        });
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* ----------------------------------------------------------------
          1. AGNES HERO SECTION (PINNED CARD STACKING LAYER)
             - sticky top-0 z-0
             - 100vh / 100dvh full viewport height with full-bleed photography
             - Top vignette for razor-sharp transparent navbar legibility
             - Section 2 slides UP and stacks over it like on agnestoth.com
             - Zero bottom gap on initial load (100% full screen)
      ----------------------------------------------------------------- */}
      <section
        className="sticky top-0 w-full h-screen h-[100dvh] min-h-[640px] flex items-end bg-[#071120] overflow-hidden z-0"
      >
        {/* Hero Background Video Container */}
        <div
          ref={heroMediaRef}
          className={`absolute -top-[10%] inset-x-0 h-[120%] z-0 will-change-transform ${
            isLoaded ? 'blur-0 scale-[1.02] opacity-100' : 'blur-[28px] scale-[1.12] opacity-90'
          }`}
          style={{
            transition: isLoaded ? 'filter 1.2s ease, opacity 1.2s ease' : 'none'
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/craftsmanship-poster.jpg"
            className="w-full h-full object-cover object-center"
          >
            <source src="/craftsmanship-atelier.mp4" type="video/mp4" />
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>

          {/* Subtle Agnes Toth Luxury Overlay */}
          <span
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent z-10 pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Hero Bottom Content Container: Dissolves and blurs as Section 2 stacks over it */}
        <div
          ref={heroContentRef}
          className="relative max-w-[1720px] w-full mx-auto px-5 sm:px-8 lg:px-14 pb-12 sm:pb-16 lg:pb-20 z-20 pointer-events-auto will-change-[transform,opacity,filter]"
        >
          <div className="w-full space-y-3 sm:space-y-4">

            {/* Agnes Eyebrow - Exact 1:1 Typography from Agnes Toth Reference (.agnes-hero__eyebrow) */}
            <p
              className="font-sans text-[16px] sm:text-[18px] font-normal leading-[1.35] tracking-normal uppercase text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[180ms]"
              style={{
                opacity: isLoaded ? 1 : 0,
                filter: isLoaded ? 'blur(0px)' : 'blur(10px)',
                transform: isLoaded ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
              }}
            >
              Viral Fabrics &bull; <em className="italic font-normal normal-case text-white/95 tracking-normal">est. Surat, India</em>
            </p>

            {/* Main Editorial Headline - Agnes Toth Directional Left-to-Right Unblur Sweep (Bigger, Statuesque Typography on Mobile) */}
            <h1
              ref={headlineRef}
              className="font-heading text-[40px] xs:text-[44px] sm:text-[50px] md:text-[56px] lg:text-[62px] xl:text-[68px] 2xl:text-[74px] font-normal sm:font-medium text-white leading-[1.06] sm:leading-none tracking-[-0.015em] sm:whitespace-nowrap drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]"
            >
              {HEADLINE_WORDS.map((item) => (
                <span
                  key={item.word}
                  className="inline-block whitespace-nowrap mr-[0.24em] last:mr-0"
                >
                  {item.chars.map((char, cIdx) => (
                    <span
                      key={`${item.word}-${cIdx}`}
                      className="hero-headline-char inline-block"
                      style={{
                        opacity: 0,
                        filter: 'blur(16px)',
                        transform: 'translate3d(0, 8px, 0)',
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Subtitle & Explore Products CTA in a clean minimal row below */}
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 sm:pt-3 transition-all duration-[1350ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[460ms]"
              style={{
                opacity: isLoaded ? 1 : 0,
                filter: isLoaded ? 'blur(0px)' : 'blur(10px)',
                transform: isLoaded ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
              }}
            >
              <p className="font-sans text-white/90 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
                Manufacturer and Supplier of all types of Export Fabrics.
              </p>

              {/* Luxury Outline Button with Angled Cut Corner & Smooth Luminous Shine Sweep */}
              <Link
                href="/fabrics"
                className="relative inline-flex items-center gap-3 h-10 sm:h-11 pl-6 pr-8 text-[11px] sm:text-[11.5px] font-medium tracking-[0.2em] uppercase text-white bg-white/[0.06] hover:bg-white/[0.16] backdrop-blur-[8px] transition-all duration-300 group cursor-pointer self-start sm:self-auto whitespace-nowrap overflow-hidden hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)',
                }}
              >
                {/* 100% Transparent Center with Razor-Sharp 1px Border Following Cut Corner */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                  <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />
                  <line x1="100%" y1="0" x2="calc(100% - 14px)" y2="100%" stroke="rgba(255,255,255,0.75)" strokeWidth="1.2" />
                  <line x1="calc(100% - 14px)" y1="calc(100% - 0.5px)" x2="0" y2="calc(100% - 0.5px)" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />
                  <line x1="0.5" y1="100%" x2="0.5" y2="0" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />
                </svg>

                {/* Smooth Luminous Shine Sweep (matching READ MORE and SUBSCRIBE) */}
                <span
                  className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/45 to-transparent -skew-x-12 pointer-events-none group-hover:translate-x-[250%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  aria-hidden="true"
                />

                <span className="font-sans relative z-10">EXPLORE OUR PRODUCTS</span>
                <ArrowRight className="relative z-10 w-3.5 h-3.5 stroke-[2] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------
          2. REST OF SECTIONS: STACKING CURTAIN REVEAL OVER HERO (1:1 AGNES TOTH)
             - relative z-10 bg-white
             - Slides UP over the pinned hero like a card/sheet as you scroll
             - Luxury top shadow provides clear depth elevation
             - Zero white gap on initial load (starts at exactly top: 100vh)
      ----------------------------------------------------------------- */}
      <div className="relative z-10 bg-white shadow-[0_-25px_60px_rgba(0,0,0,0.2)]">
        <WhoWeAreSection />
        <FabricsPortfolioSection />
        <QualityPracticesSection />
        <TestimonialsSection />
      </div>

    </div>
  );
}
