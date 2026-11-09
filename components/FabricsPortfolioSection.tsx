'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';
import { fetchPublishedFabrics } from '@/services/fabricsApi';
import type { LiveFabric } from '@/types';

interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  gsm: string;
  imageSrc: string;
  circleColor: string;
  circlePosition: 'top-right' | 'top-left';
  imageOnLeft: boolean;
}

const ACCENT_COLORS = [
  '#E25C6A', '#8B5CF6', '#10B981', '#F59E0B', 
  '#0284C7', '#0D9488', '#6366F1', '#EC4899', 
  '#059669', '#D97706'
];

function mapLiveToPortfolioItems(fabrics: LiveFabric[]): PortfolioItem[] {
  return fabrics.map((f, idx) => ({
    id: f.slug || String(idx),
    slug: f.slug,
    title: f.name || f.title,
    description: f.description,
    gsm: f.gsmRange || 'Export Quality',
    imageSrc: f.image || '/assets/uploads/2025/09/bsy-fabrics.png',
    circleColor: ACCENT_COLORS[idx % ACCENT_COLORS.length],
    circlePosition: idx % 2 === 0 ? 'top-right' : 'top-left',
    imageOnLeft: idx % 2 === 0,
  }));
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [];

// Interactive 3D Card with Mouse-Tracking Perspective Tilt & Specular Light Reflection
function Interactive3DCard({
  item,
  children,
}: {
  item: PortfolioItem;
  children: React.ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth subtle 3D tilt (-6deg to +6deg)
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.3,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative z-10 w-full aspect-[3/2] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-white border border-slate-200/90 transition-transform duration-300 ease-out group cursor-pointer will-change-transform"
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        transformStyle: 'preserve-3d',
        boxShadow: isHovered
          ? `0 24px 50px -12px ${item.circleColor}33, 0 12px 24px -8px rgba(15,23,42,0.12)`
          : '0 14px 36px rgba(15,23,42,0.07)',
      }}
    >
      {children}

      {/* Dynamic Specular 3D Glare follow */}
      <div
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle 280px at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4), transparent 70%)`,
        }}
      />
    </div>
  );
}

// Single Item Component with Directional Unblur, 3D Orb, and Title Character Sweep
const PortfolioRow: React.FC<{
  item: PortfolioItem;
  index: number;
}> = ({ item, index }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  // Split title into word tokens & chars for the directional character unblur sweep
  const titleWords = React.useMemo(() => {
    return item.title.split(' ').map((word) => ({
      word,
      chars: Array.from(word),
    }));
  }, [item.title]);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    let ctx: gsap.Context | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();

          ctx = gsap.context(() => {
            // 1. Directional Image Column Animation:
            // If image is on the left -> slides in from left (-45px to 0)
            // If image is on the right -> slides in from right (45px to 0)
            if (imageColRef.current) {
              const fromX = item.imageOnLeft ? -45 : 45;
              gsap.fromTo(
                imageColRef.current,
                { opacity: 0, filter: 'blur(14px)', x: fromX },
                {
                  opacity: 1,
                  filter: 'blur(0px)',
                  x: 0,
                  duration: 0.65,
                  ease: 'power3.out',
                  clearProps: 'transform,filter',
                }
              );
            }

            // 2. Directional Text Column Animation:
            // If text is on the right -> slides in from right (45px to 0)
            // If text is on the left -> slides in from left (-45px to 0)
            if (textColRef.current) {
              const fromX = item.imageOnLeft ? 45 : -45;
              gsap.fromTo(
                textColRef.current,
                { opacity: 0, filter: 'blur(14px)', x: fromX },
                {
                  opacity: 1,
                  filter: 'blur(0px)',
                  x: 0,
                  duration: 0.65,
                  ease: 'power3.out',
                  clearProps: 'transform,filter',
                }
              );
            }

            // 3. Agnes Toth Directional Character Unblur Sweep (matching Quality Fabrics From Around The World)
            if (titleRef.current) {
              const chars = titleRef.current.querySelectorAll<HTMLElement>('.fabric-title-char');
              if (chars && chars.length > 0) {
                const pos: number[] = [];
                chars.forEach((c) => {
                  const r = c.getBoundingClientRect();
                  pos.push(r.left);
                });
                const min = Math.min(...pos);
                const max = Math.max(...pos);
                const span = Math.max(max - min, 1);

                gsap.fromTo(
                  chars,
                  {
                    opacity: 0,
                    filter: 'blur(14px)',
                    y: 6,
                  },
                  {
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: 0,
                    duration: 0.55,
                    ease: 'power3.out',
                    delay: 0.08,
                    stagger: (i) => ((pos[i] - min) / span) * 0.35,
                    clearProps: 'transform,filter',
                  }
                );
              }
            }

            // 4. Accent line, description & button stagger entrance
            if (detailsRef.current) {
              gsap.fromTo(
                detailsRef.current.children,
                { opacity: 0, y: 12 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.55,
                  ease: 'power3.out',
                  delay: 0.16,
                  stagger: 0.08,
                  clearProps: 'transform',
                }
              );
            }
          }, rowRef);
        }
      },
      { threshold: 0.05, rootMargin: '120px 0px 60px 0px' }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (ctx) ctx.revert();
    };
  }, [item.imageOnLeft]);

  return (
    <div
      id={`fabric-item-${index}`}
      ref={rowRef}
      className={`grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-8 lg:gap-14 xl:gap-16 items-center will-change-[transform,opacity,filter] ${
        index > 0 ? 'mt-14 sm:mt-18 md:mt-20 lg:mt-28' : ''
      }`}
    >
      {/* -------------------------------------------------------------
          IMAGE CONTAINER WITH LIVING 3D ORB BEHIND CORNER
         ------------------------------------------------------------- */}
      <div
        ref={imageColRef}
        className={`md:col-span-6 relative flex justify-center will-change-[transform,opacity,filter] ${
          item.imageOnLeft ? 'order-1' : 'order-1 md:order-2'
        }`}
        style={{
          opacity: 0,
          filter: 'blur(14px)',
          transform: `translate3d(${item.imageOnLeft ? -45 : 45}px, 0, 0)`,
        }}
      >
        <div className="relative w-full max-w-[560px] group">
          
          {/* Living 3D Orb with Diffuse Radial Gradient & Ambient Float (Visible on Tablet & Desktop) */}
          <div
            className={`hidden md:block absolute w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full pointer-events-none transition-transform duration-700 ease-out group-hover:scale-115 z-0 animate-pulse ${
              item.circlePosition === 'top-right'
                ? '-top-6 -right-5 sm:-top-8 sm:-right-7'
                : '-top-6 -left-5 sm:-top-8 sm:-left-7'
            }`}
            style={{
              background: `radial-gradient(circle at 35% 35%, ${item.circleColor}ee, ${item.circleColor}99 55%, ${item.circleColor}33 85%, transparent 100%)`,
              boxShadow: `0 20px 45px -8px ${item.circleColor}55`,
            }}
            aria-hidden="true"
          />

          {/* Interactive 3D Card Frame */}
          <Interactive3DCard item={item}>
            <Image
              src={item.imageSrc}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106 select-none"
            />

            {/* Subtle Inner Highlight Ring */}
            <div className="absolute inset-0 rounded-[24px] sm:rounded-[28px] ring-1 ring-inset ring-black/5 pointer-events-none" />
          </Interactive3DCard>

        </div>
      </div>

      {/* -------------------------------------------------------------
          TEXT BLOCK: TITLE (CHARACTER SWEEP), ACCENT COLOR BAR, DESCRIPTION, READ MORE
         ------------------------------------------------------------- */}
      <div
        ref={textColRef}
        className={`md:col-span-6 flex flex-col justify-center will-change-[transform,opacity,filter] ${
          item.imageOnLeft ? 'order-2 pl-0 md:pl-4 lg:pl-6 xl:pl-8' : 'order-2 md:order-1 pr-0 md:pr-4 lg:pr-6 xl:pr-8'
        }`}
        style={{
          opacity: 0,
          filter: 'blur(14px)',
          transform: `translate3d(${item.imageOnLeft ? 45 : -45}px, 0, 0)`,
        }}
      >
        <div className="max-w-xl space-y-4 sm:space-y-5">
          
          {/* Fabric Heading with Directional Character Sweep */}
          <div>
            <h3
              ref={titleRef}
              className="font-heading font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#0A192F] tracking-tight leading-[1.12]"
            >
              {titleWords.map((w, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0">
                  {w.chars.map((char, cIdx) => (
                    <span
                      key={cIdx}
                      className="fabric-title-char inline-block will-change-[transform,opacity,filter]"
                      style={{ opacity: 0, filter: 'blur(14px)' }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h3>

            {/* Accent Line Color Match */}
            <div
              className="h-[2.5px] w-12 rounded-full mt-3"
              style={{ backgroundColor: item.circleColor }}
            />
          </div>

          <div ref={detailsRef} className="space-y-4 sm:space-y-5">
            {/* Description Body */}
            <p className="font-sans text-[15px] sm:text-[15.5px] lg:text-[16px] text-slate-600 font-normal leading-[1.8]">
              {item.description}
            </p>

            {/* Polygon Cut Brand Navy READ MORE Button */}
            <div className="pt-2">
              <Link
                href={`/fabrics/${item.slug}`}
                className="relative inline-flex items-center justify-center gap-2.5 h-11 pl-6 pr-8 text-[11.5px] font-semibold tracking-[0.16em] uppercase text-white bg-gradient-to-r from-[#2c4973] via-[#375785] to-[#436b9e] hover:from-[#375785] hover:via-[#436b9e] hover:to-[#5581ba] transition-all duration-300 group shadow-[0_2px_12px_rgba(55,87,133,0.3)] hover:shadow-[0_4px_18px_rgba(55,87,133,0.45)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer overflow-hidden"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 89% 100%, 0 100%)',
                }}
              >
                {/* SVG Continuous 1px Border Overlay (Zero line glitch) */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <polygon
                    points="0.5,0.5 99.5,0.5 89,99.5 0.5,99.5"
                    fill="none"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    strokeLinejoin="miter"
                  />
                </svg>

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

        </div>
      </div>
    </div>
  );
};

interface FabricsPortfolioSectionProps {
  initialFabrics?: LiveFabric[];
}

export const FabricsPortfolioSection: React.FC<FabricsPortfolioSectionProps> = ({ initialFabrics }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [items, setItems] = useState<PortfolioItem[]>(() => {
    if (initialFabrics && initialFabrics.length > 0) {
      return mapLiveToPortfolioItems(initialFabrics);
    }
    return PORTFOLIO_ITEMS;
  });

  // Fetch live dynamic fabrics from database with fallback (respects showOnHomepage)
  useEffect(() => {
    let mounted = true;
    fetchPublishedFabrics('homepage').then((fabrics) => {
      if (mounted && fabrics.length > 0) {
        setItems(mapLiveToPortfolioItems(fabrics));
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // In-Place Smooth Batch Load (5 by 5 on this page without page reload or redirect)
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextCount = Math.min(visibleCount + 5, items.length);
      setVisibleCount(nextCount);
      setIsLoadingMore(false);

      // Smooth scroll gently to the first newly loaded quality
      setTimeout(() => {
        const newlyRevealedEl = document.getElementById(`fabric-item-${visibleCount}`);
        if (newlyRevealedEl) {
          const y = newlyRevealedEl.getBoundingClientRect().top + window.scrollY - 100;
          if (window.__lenis) {
            window.__lenis.scrollTo(y, { duration: 1.2 });
          } else {
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }
      }, 120);
    }, 300);
  };

  const hasMore = visibleCount < items.length;

  return (
    <section
      ref={sectionRef}
      id="fabrics-portfolio"
      className="relative w-full -mt-[2px] pt-10 sm:pt-12 lg:pt-16 pb-20 sm:pb-24 lg:pb-28 xl:pb-32 bg-[#FAF8F5] text-[#0A192F] overflow-hidden selection:bg-[#006DB6] selection:text-white"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">

        {/* =========================================================
            SECTION HEADER: FABRICS PORTFOLIO + DIAMOND DIVIDER
           ========================================================= */}
        <div
          className="max-w-2xl mx-auto text-center flex flex-col items-center mb-16 sm:mb-20 lg:mb-24 will-change-[transform,opacity,filter]"
          style={{
            transition:
              'opacity 1100ms cubic-bezier(0.16, 1, 0.3, 1), transform 1100ms cubic-bezier(0.16, 1, 0.3, 1), filter 1100ms cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: isHeaderVisible ? 1 : 0,
            filter: isHeaderVisible ? 'blur(0px)' : 'blur(12px)',
            transform: isHeaderVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
          }}
        >
          {/* Heading with Dual-Tone Italic Accent */}
          <h2 className="font-heading font-serif text-4xl sm:text-5xl lg:text-[54px] font-normal text-[#0A192F] tracking-tight leading-[1.12] mb-3">
            Fabrics <span className="text-[#006DB6] italic font-normal">Portfolio</span>
          </h2>

          {/* Centered Diamond Line Ornament */}
          <div className="relative w-36 h-6 flex items-center justify-center my-1">
            <Image
              src="/assets/uploads/2025/09/title-bottom-line-center.png"
              alt="Divider Ornament"
              width={138}
              height={24}
              className="object-contain"
            />
          </div>

          {/* Subtitle */}
          <p className="font-sans text-[15px] sm:text-[16px] text-slate-600 font-normal leading-[1.8] mt-2 max-w-lg">
            High-speed water-jet weaves crafted for international apparel, available in solid dyed, rotary print, and bespoke digital strike-offs.
          </p>
        </div>

        {/* =========================================================
            ALTERNATING FABRICS LIST (DYNAMICALLY LOADED FROM DB)
           ========================================================= */}
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <p className="text-sm font-medium">Loading fabrics repertoire from mill database...</p>
            </div>
          ) : (
            items.slice(0, visibleCount).map((item, index) => (
              <PortfolioRow key={item.id} item={item} index={index} />
            ))
          )}
        </div>

        {/* =========================================================
            IN-PLACE LOAD MORE QUALITIES (5 BY 5) / EXPLORE ALL BUTTON
           ========================================================= */}
        <div className="mt-16 sm:mt-20 lg:mt-24 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          {hasMore ? (
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="relative inline-flex items-center justify-center gap-3 h-12 pl-8 pr-10 text-[12px] font-semibold tracking-[0.18em] uppercase text-white bg-gradient-to-r from-[#2c4973] via-[#375785] to-[#436b9e] hover:from-[#375785] hover:via-[#436b9e] hover:to-[#5581ba] transition-all duration-300 group shadow-[0_4px_16px_rgba(44,73,115,0.35)] hover:shadow-[0_6px_22px_rgba(44,73,115,0.5)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden disabled:opacity-75"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 89% 100%, 0 100%)',
              }}
            >
              {/* SVG Continuous 1px Border Overlay (Zero line glitch) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon
                  points="0.5,0.5 99.5,0.5 89,99.5 0.5,99.5"
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  strokeLinejoin="miter"
                />
              </svg>

              {/* Smooth Luminous Shine Sweep */}
              <span
                className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none group-hover:translate-x-[250%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                aria-hidden="true"
              />
              {isLoadingMore ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                  <span className="relative z-10 font-sans">LOADING QUALITIES...</span>
                </>
              ) : (
                <>
                  <span className="relative z-10 font-sans">LOAD MORE QUALITIES</span>
                  <ArrowRight className="relative z-10 w-4 h-4 stroke-[2.2] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                </>
              )}
            </button>
          ) : (
            <Link
              href="/fabrics"
              className="relative inline-flex items-center justify-center gap-3 h-12 pl-8 pr-10 text-[12px] font-semibold tracking-[0.18em] uppercase text-white bg-gradient-to-r from-[#2c4973] via-[#375785] to-[#436b9e] hover:from-[#375785] hover:via-[#436b9e] hover:to-[#5581ba] transition-all duration-300 group shadow-[0_4px_16px_rgba(44,73,115,0.35)] hover:shadow-[0_6px_22px_rgba(44,73,115,0.5)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 89% 100%, 0 100%)',
              }}
            >
              {/* SVG Continuous 1px Border Overlay (Zero line glitch) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon
                  points="0.5,0.5 99.5,0.5 89,99.5 0.5,99.5"
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  strokeLinejoin="miter"
                />
              </svg>

              <span
                className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none group-hover:translate-x-[250%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                aria-hidden="true"
              />
              <span className="relative z-10 font-sans">EXPLORE COMPLETE CATALOGUE</span>
              <ArrowRight className="relative z-10 w-4 h-4 stroke-[2.2] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
            </Link>
          )}
        </div>

      </div>
    </section>
  );
};
