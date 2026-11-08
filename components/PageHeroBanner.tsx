'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { Home, Gauge, Building2, Globe } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface TrustBadgeItem {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
}

export interface PageHeroBannerProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
  bgVideo?: string;
  bgVideoPoster?: string;
  bgAlt?: string;
  badges?: TrustBadgeItem[];
  breadcrumbs?: BreadcrumbItem[];
}

const DEFAULT_BADGES: TrustBadgeItem[] = [
  { icon: Gauge, label: 'Quick Response' },
  { icon: Building2, label: 'Surat Textile Hub' },
  { icon: Globe, label: 'Global Export Desk' },
];

export function PageHeroBanner({
  title,
  subtitle = 'From Around The Fabrics World',
  bgImage = '/images/enquiry/enquiry-hero-bg.jpg',
  bgVideo,
  bgVideoPoster,
  bgAlt = 'Viral Fabrics - Surat Synthetic Textile Manufacturer',
  badges = DEFAULT_BADGES,
  breadcrumbs,
}: PageHeroBannerProps) {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const bannerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);

  // Agnes Toth Stacking Scroll: Content dissolves, blurs, and background media drifts subtly (Zero React re-renders)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y <= 600) {
            if (heroContentRef.current) {
              const progress = Math.min(1, Math.max(0, y / 280));
              const opacity = 1 - progress;
              const blur = progress * 8;
              const translateY = progress * 24;
              heroContentRef.current.style.opacity = `${opacity}`;
              heroContentRef.current.style.filter = blur > 0.1 ? `blur(${blur}px)` : 'none';
              heroContentRef.current.style.transform = translateY > 0.1 ? `translate3d(0, ${translateY}px, 0)` : 'none';
            }
            if (heroMediaRef.current) {
              const parallaxY = -y * 0.15;
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

  // Attempt video autoplay safely without throwing unhandled exceptions
  useEffect(() => {
    if (bgVideo && videoRef.current) {
      const v = videoRef.current;
      v.play()
        .then(() => setVideoPlaying(true))
        .catch(() => {
          // Autoplay policy or low power mode prevented playback, fallback poster stays cleanly visible
        });
    }
  }, [bgVideo]);

  // Split title into words and characters for the Agnes Toth directional left-to-right unblur sweep
  const words = React.useMemo(() => {
    return title.split(' ').map((word) => ({
      word,
      chars: word.split(''),
    }));
  }, [title]);

  const resolvedBreadcrumbs: BreadcrumbItem[] = breadcrumbs || [
    { label: 'Home', href: '/' },
    { label: title },
  ];

  // Agnes Toth signature directional left-to-right unblur sweep on load
  useEffect(() => {
    let ctx: gsap.Context | null = null;
    let fallbackTimer: NodeJS.Timeout | null = null;

    const animateSweep = () => {
      if (!headlineRef.current) return;
      const chars = headlineRef.current.querySelectorAll<HTMLElement>('.hero-banner-char');
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
        // 1. Exact Agnes Toth directional left-to-right character unblur sweep
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
            duration: 1.1,
            ease: 'power2.out',
            delay: 0.1,
            stagger: (i) => ((pos[i] - min) / span) * 1.1,
            clearProps: 'transform,willChange',
          }
        );

        // 2. Subtitle soft float & unblur
        if (subtitleRef.current) {
          gsap.fromTo(
            subtitleRef.current,
            { opacity: 0, filter: 'blur(10px)', y: 6 },
            {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              duration: 0.9,
              delay: 0.3,
              ease: 'power2.out',
              clearProps: 'transform,willChange',
            }
          );
        }

        // 3. Badges soft staggered fade-in
        if (badgesRef.current) {
          gsap.fromTo(
            badgesRef.current,
            { opacity: 0, filter: 'blur(8px)', y: 6 },
            {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              duration: 0.8,
              delay: 0.45,
              ease: 'power2.out',
              clearProps: 'transform,willChange',
            }
          );
        }
      }, bannerRef);
    };

    // Trigger directional unblur sweep smoothly on mount
    let rafId: number | null = null;
    rafId = requestAnimationFrame(() => {
      animateSweep();
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (ctx) ctx.revert();
    };
  }, [title]);

  return (
    <div ref={bannerRef} className="sticky top-0 z-0 w-full">
      {/* =====================================================================
          1. TOP HERO BANNER (Sticky Stacking Banner with Agnes Toth Parallax & Dissolve)
         ===================================================================== */}
      <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 lg:pb-20 min-h-[340px] sm:min-h-[390px] lg:min-h-[430px] flex items-center overflow-hidden bg-black">
        {/* Banner Graphic Canvas (Poster Image + Optional Smooth Streaming Background Video) */}
        <div
          ref={heroMediaRef}
          className="absolute -top-[12%] inset-x-0 h-[124%] pointer-events-none select-none overflow-hidden will-change-transform"
        >
          {/* Base Fallback Image (always loads fast with priority, visible before video is buffered) */}
          <Image
            src={bgVideoPoster || bgImage}
            alt={bgAlt}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />

          {/* Optional Web-Optimized Background Video */}
          {bgVideo && (
            <video
              ref={videoRef}
              src={bgVideo}
              poster={bgVideoPoster || bgImage}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onPlaying={() => setVideoPlaying(true)}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-out ${
                videoPlaying ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Neutral cinema scrims: ZERO blue tint, 100% natural video & image colors with high contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none z-10" />
        </div>

        {/* Content Aligned with Main Container */}
        <div
          ref={heroContentRef}
          className="relative z-10 w-full max-w-[1440px] xl:max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 will-change-[transform,opacity,filter]"
        >
          <div className="max-w-2xl text-white">
            {/* Pure Haute-Couture Title (Clean Minimalist Typography, No Blue Accent Bar) */}
            <div className="space-y-1.5 sm:space-y-2">
              <h1
                ref={headlineRef}
                className="font-heading font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-white tracking-tight leading-[1.1] drop-shadow-sm select-none"
              >
                {words.map((item, wordIdx) => (
                  <span
                    key={`${item.word}-${wordIdx}`}
                    className="inline-block whitespace-nowrap mr-[0.26em] last:mr-0"
                  >
                    {item.chars.map((char, charIdx) => (
                      <span
                        key={`${char}-${charIdx}`}
                        className="hero-banner-char inline-block will-change-[transform,opacity,filter]"
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </h1>

              <p
                ref={subtitleRef}
                className="font-sans text-[13px] sm:text-[14px] lg:text-[15px] text-white/90 font-light tracking-wide drop-shadow-sm will-change-[transform,opacity,filter]"
              >
                {subtitle}
              </p>
            </div>

            {/* Trust Badges with Dividers */}
            {badges && badges.length > 0 && (
              <div
                ref={badgesRef}
                className="flex flex-wrap items-center gap-3 sm:gap-4 mt-5 sm:mt-6 text-[12px] sm:text-[13px] font-sans font-medium text-white/90 will-change-[transform,opacity,filter]"
              >
                {badges.map((badge, idx) => {
                  const Icon = badge.icon;
                  return (
                    <React.Fragment key={badge.label}>
                      {idx > 0 && <span className="text-white/30 select-none text-xs">|</span>}
                      <div className="flex items-center gap-1.5">
                        {Icon && <Icon className="w-3.5 h-3.5 text-white stroke-[2.2]" />}
                        <span>{badge.label}</span>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
