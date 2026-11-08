'use client';

import React, { useEffect, useRef } from 'react';
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
  bgAlt = 'Viral Fabrics - Surat Synthetic Textile Manufacturer',
  badges = DEFAULT_BADGES,
  breadcrumbs,
}: PageHeroBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

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
        // 1. Accent Cyan Bar entrance
        if (barRef.current) {
          gsap.fromTo(
            barRef.current,
            { scaleY: 0, opacity: 0, transformOrigin: 'top center' },
            { scaleY: 1, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.05 }
          );
        }

        // 2. Exact Agnes Toth directional left-to-right character unblur sweep
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

        // 3. Subtitle soft float & unblur
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

        // 4. Badges soft staggered fade-in
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
    <div ref={bannerRef} className="w-full">
      {/* =====================================================================
          1. TOP HERO BANNER (Compact & Minimalist with Agnes Toth Unblur Sweep)
         ===================================================================== */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 flex items-center overflow-hidden bg-[#0A192F]">
        {/* Banner Graphic Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src={bgImage}
            alt={bgAlt}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Subtle horizontal and top scrims for transparent navbar clarity */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#061426]/90 via-[#061426]/55 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#061426]/75 via-[#061426]/20 to-transparent pointer-events-none" />
        </div>

        {/* Content Aligned with Main Container */}
        <div className="relative z-10 w-full max-w-[1440px] xl:max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl text-white">
            {/* Title with Vertical Blue Accent Bar */}
            <div className="flex items-start gap-3 sm:gap-3.5">
              <div
                ref={barRef}
                className="w-[3.5px] sm:w-1 h-9 sm:h-11 bg-[#0084D1] rounded-full flex-shrink-0 mt-0.5 shadow-[0_0_10px_rgba(0,132,209,0.7)] will-change-transform"
              />
              <div className="space-y-0.5 sm:space-y-1">
                <h1
                  ref={headlineRef}
                  className="font-heading font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-white tracking-tight leading-none drop-shadow-sm select-none"
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
                  className="font-sans text-[12.5px] sm:text-[13.5px] text-white/90 font-light tracking-wide drop-shadow-sm will-change-[transform,opacity,filter]"
                >
                  {subtitle}
                </p>
              </div>
            </div>

            {/* Trust Badges with Dividers */}
            {badges && badges.length > 0 && (
              <div
                ref={badgesRef}
                className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 sm:mt-5 text-[11.5px] sm:text-[12.5px] font-sans font-medium text-white/90 will-change-[transform,opacity,filter]"
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

      {/* =====================================================================
          2. MINIMALIST BREADCRUMBS BAR (Home > ...)
         ===================================================================== */}
      <div className="bg-white border-b border-slate-200/70 py-2 sm:py-2.5 shadow-sm">
        <div className="max-w-[1440px] xl:max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 text-left">
          <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1.5 sm:gap-2 text-[12px] sm:text-[12.5px] font-sans">
            {resolvedBreadcrumbs.map((crumb, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === resolvedBreadcrumbs.length - 1;

              return (
                <React.Fragment key={`${crumb.label}-${idx}`}>
                  {idx > 0 && <span className="text-slate-400 select-none text-[11px]">&gt;</span>}
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className="inline-flex items-center gap-1 text-[#006DB6] hover:text-[#0A192F] transition-colors font-medium tracking-wide"
                    >
                      {isFirst && <Home className="w-3.5 h-3.5 fill-[#006DB6] text-[#006DB6]" />}
                      <span>{crumb.label}</span>
                    </Link>
                  ) : (
                    <span className="text-[#006DB6] font-medium tracking-wide" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
