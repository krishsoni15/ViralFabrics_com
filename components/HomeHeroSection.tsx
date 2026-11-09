'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const HEADLINE_WORDS = [
  { word: 'Quality', chars: ['Q', 'u', 'a', 'l', 'i', 't', 'y'] },
  { word: 'Fabrics', chars: ['F', 'a', 'b', 'r', 'i', 'c', 's'] },
  { word: 'From', chars: ['F', 'r', 'o', 'm'] },
  { word: 'Around', chars: ['A', 'r', 'o', 'u', 'n', 'd'] },
  { word: 'The', chars: ['T', 'h', 'e'] },
  { word: 'World', chars: ['W', 'o', 'r', 'l', 'd'] },
];

export function HomeHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);

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

  // Trigger luxury on-load unblur entrance immediately on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 20);
    return () => clearTimeout(timer);
  }, []);

  // Agnes Toth signature directional left-to-right unblur sweep
  useEffect(() => {
    let ctx: gsap.Context | null = null;
    let fallbackTimer: NodeJS.Timeout | null = null;
    let safetyTimer: NodeJS.Timeout | null = null;

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
            filter: 'blur(14px)',
            y: 8,
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            delay: 0.05,
            stagger: (i) => ((pos[i] - min) / span) * 0.45,
            clearProps: 'transform,willChange,opacity,filter',
          }
        );
      }, headlineRef);
    };

    // Run animation when fonts are ready or quickly via timeout
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(animateChars).catch(animateChars);
    } else {
      fallbackTimer = setTimeout(animateChars, 80);
    }

    // Safety fallback: ensure text is 100% visible regardless of network/font latency
    safetyTimer = setTimeout(() => {
      setIsLoaded(true);
      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll<HTMLElement>('.hero-headline-char');
        chars.forEach((c) => {
          c.style.opacity = '1';
          c.style.filter = 'none';
          c.style.transform = 'none';
        });
      }
    }, 450);

    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (safetyTimer) clearTimeout(safetyTimer);
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
    <section
      className="sticky top-0 w-full h-screen h-[100dvh] min-h-[640px] flex items-end bg-[#071120] overflow-hidden z-0"
    >
      {/* Hero Background Video Container with smooth unblur sweep */}
      <div
        ref={heroMediaRef}
        className={`absolute -top-[10%] inset-x-0 h-[120%] z-0 will-change-transform transition-[filter,opacity,transform] duration-1000 ease-out ${
          isLoaded ? 'blur-0 scale-[1.02] opacity-100' : 'blur-[10px] scale-[1.06] opacity-95'
        }`}
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

        <span
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Hero Bottom Content Container */}
      <div
        ref={heroContentRef}
        className="relative max-w-[1720px] w-full mx-auto px-5 sm:px-8 lg:px-14 pb-12 sm:pb-16 lg:pb-20 z-20 pointer-events-auto will-change-[transform,opacity,filter]"
      >
        <div className="w-full space-y-3 sm:space-y-4">
          <p
            className={`font-sans text-[16px] sm:text-[18px] font-normal leading-[1.35] tracking-normal uppercase text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[120ms] ${
              isLoaded ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-[8px] translate-y-3'
            }`}
          >
            Viral Fabrics &bull; <em className="italic font-normal normal-case text-white/95 tracking-normal">est. Surat, India</em>
          </p>

          <h1
            ref={headlineRef}
            className="font-heading text-[38px] xs:text-[42px] sm:text-[46px] md:text-[43px] lg:text-[52px] xl:text-[64px] 2xl:text-[72px] font-normal sm:font-medium text-white leading-[1.08] md:leading-none tracking-[-0.015em] md:whitespace-nowrap drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]"
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
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <div
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 sm:pt-3 transition-all duration-[1350ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[280ms] ${
              isLoaded ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-[8px] translate-y-3'
            }`}
          >
            <p className="font-sans text-white/90 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
              Manufacturer and Supplier of all types of Export Fabrics.
            </p>

            <Link
              href="/fabrics"
              className="relative inline-flex items-center gap-3 h-10 sm:h-11 pl-6 pr-8 text-[11px] sm:text-[11.5px] font-medium tracking-[0.2em] uppercase text-white bg-white/[0.06] hover:bg-white/[0.16] backdrop-blur-[8px] transition-all duration-300 group cursor-pointer self-start sm:self-auto whitespace-nowrap overflow-hidden hover:-translate-y-0.5 active:translate-y-0"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 89% 100%, 0 100%)',
              }}
            >
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon
                  points="0.5,0.5 99.5,0.5 89,99.5 0.5,99.5"
                  fill="none"
                  stroke="rgba(255,255,255,0.75)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  strokeLinejoin="miter"
                />
              </svg>

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
  );
}

