'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

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

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'crepe',
    slug: 'crepe-fabrics',
    title: 'Crepe Fabrics',
    description:
      'Soft/silky fabrics with smooth feel. used for designing garments, scarves, textile products The weight falls in the range of 75-120 grams / meter. Our fabrics are available in solid dyed or printed forms by Make to order base.',
    gsm: '75 – 120 GSM',
    imageSrc: '/assets/uploads/2025/09/crepe-fabrics-1.png',
    circleColor: '#E25C6A', // Coral Red Accent
    circlePosition: 'top-right',
    imageOnLeft: true,
  },
  {
    id: 'georgette',
    slug: 'georgette-fabrics',
    title: 'Georgette Fabrics',
    description:
      'The georgette fabrics are plain weave with a crinkle effect, excellent feel and good drapability. The weight falls in the range of 35-130 grams / meter. It is most preferred in garment industry for designer top wear, dresses, gowns. This fabrics available in various solid and prints.',
    gsm: '35 – 130 GSM',
    imageSrc: '/assets/uploads/2025/09/georgette-fabrics-1.png',
    circleColor: '#9A74D4', // Lavender Purple Accent
    circlePosition: 'top-left',
    imageOnLeft: false,
  },
  {
    id: 'chiffon',
    slug: 'chiffon-fabrics',
    title: 'Chiffon Fabrics',
    description:
      'Chiffon is a Crinkle - light weight and fine fabric. The weight falls in the range of 30 - 90 grams / meter. Poly Chiffon Fabric is used in garments, stoles, scarves.',
    gsm: '30 – 90 GSM',
    imageSrc: '/assets/uploads/2025/09/chiffon-fabrics-1.png',
    circleColor: '#80C342', // Fresh Lime Accent
    circlePosition: 'top-right',
    imageOnLeft: true,
  },
  {
    id: 'satin',
    slug: 'satin-fabrics',
    title: 'Satin Fabrics',
    description:
      'The Polyester Satin Fabrics is ideally used for designing home decors, garments and scarves. The satin is not the raw material, its the weave of the fabric. The polyester satin is the luxurious smooth, silky and glossy fabric having one shiny and one dull side. It is appreciated for colour fastness, various colour pattern, skin friendliness and soft texture. The weight falls in the range of 80-170 grams / meter.',
    gsm: '80 – 170 GSM',
    imageSrc: '/assets/uploads/2025/09/satin-fabrics-1.png',
    circleColor: '#F2B73F', // Golden Sun Accent
    circlePosition: 'top-left',
    imageOnLeft: false,
  },
  {
    id: 'poly-knit',
    slug: 'poly-knit-fabrics',
    title: 'Poly Knit Fabrics',
    description:
      'Knitted Fabrics are widely used in lingerie, sportswear, dresses, lining and other winter garments. The fabrics are highly valued for their outstanding features like comfortable to wear, soft texture. The weight falls in the range of 80-200 grams / meter.',
    gsm: '80 – 200 GSM',
    imageSrc: '/assets/uploads/2025/09/poly-knit-fabrics-1.png',
    circleColor: '#0074BC', // Deep Blue Accent
    circlePosition: 'top-right',
    imageOnLeft: true,
  },
];

// Single Item Component with Directional Unblur and Hover Lift
const PortfolioRow: React.FC<{
  item: PortfolioItem;
  index: number;
}> = ({ item, index }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center will-change-[transform,opacity,filter] ${
        index > 0 ? 'mt-16 sm:mt-24 lg:mt-28' : ''
      }`}
      style={{
        transition: `opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1), transform 1000ms cubic-bezier(0.16, 1, 0.3, 1), filter 1000ms cubic-bezier(0.16, 1, 0.3, 1)`,
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0px)' : 'blur(14px)',
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30px, 0)',
      }}
    >
      {/* -------------------------------------------------------------
          IMAGE CONTAINER WITH REFINED ACCENT CIRCLE BEHIND CORNER
         ------------------------------------------------------------- */}
      <div
        className={`lg:col-span-6 relative flex justify-center ${
          item.imageOnLeft ? 'order-1' : 'order-1 lg:order-2'
        }`}
      >
        <div className="relative w-full max-w-[560px] group">
          
          {/* Subtle Aesthetic Accent Circle (matching user reference mockup with modern softness) */}
          <div
            className={`absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110 z-0 ${
              item.circlePosition === 'top-right'
                ? '-top-6 -right-5 sm:-top-7 sm:-right-6'
                : '-top-6 -left-5 sm:-top-7 sm:-left-6'
            }`}
            style={{
              backgroundColor: item.circleColor,
              opacity: 0.88,
              boxShadow: `0 12px 30px -6px ${item.circleColor}55`,
            }}
            aria-hidden="true"
          />

          {/* Main Card Frame with Rounded Corners */}
          <div className="relative z-10 w-full aspect-[3/2] rounded-[22px] sm:rounded-[26px] overflow-hidden bg-white shadow-[0_12px_36px_rgba(15,23,42,0.08)] border border-slate-200/80 transition-all duration-500 group-hover:shadow-[0_20px_48px_rgba(15,23,42,0.14)] group-hover:-translate-y-1">
            <Image
              src={item.imageSrc}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
            />
            {/* Subtle Inner Ring */}
            <div className="absolute inset-0 rounded-[22px] sm:rounded-[26px] ring-1 ring-inset ring-black/5 pointer-events-none" />

            {/* GSM Badge Pill */}
            <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/90 shadow-sm">
              <span className="font-sans text-[11px] sm:text-[11.5px] font-semibold text-[#1E3A5F] tracking-wide">
                {item.gsm}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* -------------------------------------------------------------
          TEXT BLOCK: TITLE, BLUE UNDERLINE BAR, DESCRIPTION, READ MORE
         ------------------------------------------------------------- */}
      <div
        className={`lg:col-span-6 flex flex-col justify-center ${
          item.imageOnLeft ? 'order-2 pl-0 lg:pl-4 xl:pl-8' : 'order-2 lg:order-1 pr-0 lg:pr-4 xl:pr-8'
        }`}
      >
        <div className="max-w-xl space-y-4 sm:space-y-5">
          
          {/* Fabric Heading */}
          <div>
            <h3 className="font-heading text-3xl sm:text-4xl lg:text-[40px] font-medium text-[#0F172A] tracking-tight leading-[1.12]">
              {item.title}
            </h3>

            {/* Cyan/Blue Left Border Line Accent */}
            <div className="w-12 h-[2.5px] bg-[#1E5FA8] mt-3 rounded-full" />
          </div>

          {/* Description Body */}
          <p className="font-sans text-[14px] sm:text-[15px] lg:text-[15.5px] text-slate-700 font-normal leading-[1.72]">
            {item.description}
          </p>

          {/* READ MORE Polygon Action Button */}
          <div className="pt-2">
            <Link
              href={`/fabrics/${item.slug}`}
              className="relative inline-flex items-center gap-2.5 h-10 sm:h-10.5 pl-5 pr-7 text-[11px] sm:text-[11.5px] font-semibold tracking-[0.16em] uppercase text-[#1E5FA8] hover:text-white bg-white hover:bg-[#1E5FA8] border border-[#1E5FA8]/50 hover:border-[#1E5FA8] transition-all duration-300 group shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden"
              style={{
                clipPath: 'polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
              }}
            >
              <span className="relative z-10 font-sans">READ MORE</span>
              <ArrowRight className="relative z-10 w-3.5 h-3.5 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export const FabricsPortfolioSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      id="fabrics-portfolio"
      className="relative z-10 w-full py-20 sm:py-24 lg:py-28 xl:py-32 bg-[#F5F5F5] text-[#0F172A] border-b border-slate-200/70 overflow-hidden selection:bg-[#1E5FA8] selection:text-white"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">

        {/* =========================================================
            SECTION HEADER: FABRICS PORTFOLIO + DIAMOND DIVIDER
           ========================================================= */}
        <div
          className="max-w-2xl mx-auto text-center flex flex-col items-center mb-16 sm:mb-20 lg:mb-24 will-change-[transform,opacity,filter]"
          style={{
            transition: 'opacity 1100ms cubic-bezier(0.16, 1, 0.3, 1), transform 1100ms cubic-bezier(0.16, 1, 0.3, 1), filter 1100ms cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: isHeaderVisible ? 1 : 0,
            filter: isHeaderVisible ? 'blur(0px)' : 'blur(12px)',
            transform: isHeaderVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
          }}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 text-[#1E5FA8] mb-2 sm:mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#1E5FA8]" />
            <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.24em] uppercase text-[#1E5FA8]">
              OUR REPERTOIRE
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#1E5FA8]" />
          </div>

          {/* Heading */}
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-[54px] font-normal text-[#0F172A] tracking-tight leading-[1.08] mb-3">
            Fabrics Portfolio
          </h2>

          {/* Centered Diamond Line Ornament (as in reference screenshot) */}
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
          <p className="font-sans text-[14px] sm:text-[15px] text-slate-600 font-light leading-relaxed mt-2 max-w-lg">
            High-speed water-jet weaves crafted for international apparel, available in solid dyed, rotary print, and bespoke digital strike-offs.
          </p>
        </div>

        {/* =========================================================
            ALTERNATING FABRICS LIST (CREPE, GEORGETTE, CHIFFON, SATIN, POLY KNIT)
           ========================================================= */}
        <div className="space-y-4">
          {PORTFOLIO_ITEMS.map((item, index) => (
            <PortfolioRow key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* =========================================================
            LOAD MORE / EXPLORE ALL BUTTON AT BOTTOM
           ========================================================= */}
        <div className="mt-16 sm:mt-20 lg:mt-24 text-center">
          <Link
            href="/fabrics"
            className="relative inline-flex items-center justify-center gap-3 h-12 pl-8 pr-10 text-[12px] font-semibold tracking-[0.18em] uppercase text-white bg-[#1E5FA8] hover:bg-[#16467D] transition-all duration-300 group shadow-[0_4px_16px_rgba(30,95,168,0.3)] hover:shadow-[0_6px_22px_rgba(30,95,168,0.45)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden"
            style={{
              clipPath: 'polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)',
            }}
          >
            {/* Smooth Luminous Shine Sweep */}
            <span
              className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none group-hover:translate-x-[250%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
              aria-hidden="true"
            />
            <span className="relative z-10 font-sans">LOAD MORE QUALITIES</span>
            <ArrowRight className="relative z-10 w-4 h-4 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
};

