'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
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
  // 1. Crepe Fabrics (Coral Rose)
  {
    id: 'crepe',
    slug: 'crepe-fabrics',
    title: 'Crepe Fabrics',
    description:
      'Soft/silky fabrics with smooth feel. Used for designing garments, scarves, and textile products. The weight falls in the range of 75-120 grams / meter. Our fabrics are available in solid dyed or printed forms on Make-to-Order base.',
    gsm: '75 – 120 GSM',
    imageSrc: '/assets/uploads/2025/09/crepe-fabrics-1.png',
    circleColor: '#E25C6A',
    circlePosition: 'top-right',
    imageOnLeft: true,
  },
  // 2. Georgette Fabrics (Lavender Purple)
  {
    id: 'georgette',
    slug: 'georgette-fabrics',
    title: 'Georgette Fabrics',
    description:
      'The georgette fabrics are plain weave with a crinkle effect, excellent feel and good drapability. The weight falls in the range of 35-130 grams / meter. It is most preferred in garment industry for designer top wear, dresses, and gowns.',
    gsm: '35 – 130 GSM',
    imageSrc: '/assets/uploads/2025/09/georgette-fabrics-1.png',
    circleColor: '#8B5CF6',
    circlePosition: 'top-left',
    imageOnLeft: false,
  },
  // 3. Chiffon Fabrics (Fresh Emerald)
  {
    id: 'chiffon',
    slug: 'chiffon-fabrics',
    title: 'Chiffon Fabrics',
    description:
      'Chiffon is a crinkle, lightweight, and fine translucent fabric. The weight falls in the range of 30-90 grams / meter. Poly Chiffon Fabric is used extensively in stoles, scarves, bridal wear, and layered apparel.',
    gsm: '30 – 90 GSM',
    imageSrc: '/assets/uploads/2025/09/chiffon-fabrics-1.png',
    circleColor: '#10B981',
    circlePosition: 'top-right',
    imageOnLeft: true,
  },
  // 4. Satin Fabrics (Champagne Gold)
  {
    id: 'satin',
    slug: 'satin-fabrics',
    title: 'Satin Fabrics',
    description:
      'Polyester Satin Fabrics are ideally used for designing home decors, garments, and scarves. Luxurious smooth, silky, and glossy weave having one shiny and one dull side, appreciated for color fastness, vibrant patterns, and soft texture.',
    gsm: '80 – 170 GSM',
    imageSrc: '/assets/uploads/2025/09/satin-fabrics-1.png',
    circleColor: '#F59E0B',
    circlePosition: 'top-left',
    imageOnLeft: false,
  },
  // 5. Poly Knit Fabrics (Electric Ocean Blue)
  {
    id: 'poly-knit',
    slug: 'poly-knit-fabrics',
    title: 'Poly Knit Fabrics',
    description:
      'Knitted Fabrics are widely used in lingerie, sportswear, dresses, lining, and winter garments. Highly valued for outstanding features like 4-way stretch elasticity, skin comfort, soft texture, and quick-dry breathability.',
    gsm: '80 – 200 GSM',
    imageSrc: '/assets/uploads/2025/09/poly-knit-fabrics-1.png',
    circleColor: '#0284C7',
    circlePosition: 'top-right',
    imageOnLeft: true,
  },
  // 6. BSY Fabrics (Deep Teal)
  {
    id: 'bsy',
    slug: 'bsy-fabrics',
    title: 'BSY Fabrics',
    description:
      'BSY (Bi-Shrinkage Yarn) fabrics combine two filament yarns of differential shrinkage rates, producing a distinctive peach-skin touch, deep jet-black dye absorption, and superior drape retention for high-end modest fashion and abayas.',
    gsm: '80 – 180 GSM',
    imageSrc: '/assets/uploads/2025/09/bsy-fabrics.png',
    circleColor: '#0D9488',
    circlePosition: 'top-left',
    imageOnLeft: false,
  },
  // 7. Poly Dobby Fabrics (Royal Indigo)
  {
    id: 'poly-dobby',
    slug: 'poly-dobby-fabrics-jacquard',
    title: 'Poly Dobby Fabrics',
    description:
      'Elegantly patterned Dobby & Jacquard weaves manufactured on advanced high-speed dobby water-jet looms. Features intricate geometric self-patterns, crisp structural hand-feel, and consistent dye absorption for shirts and textured kurtas.',
    gsm: '70 – 160 GSM',
    imageSrc: '/assets/uploads/2025/09/poly-dobby.png',
    circleColor: '#6366F1',
    circlePosition: 'top-right',
    imageOnLeft: true,
  },
  // 8. Net & Mesh Fabrics (Rose Magenta)
  {
    id: 'net-mesh',
    slug: 'net-mesh-fabrics',
    title: 'Net & Mesh Fabrics',
    description:
      'Openwork geometric mesh engineered for maximum breathability, dimensional shape retention, and tear resistance. Suitable for activewear inserts, gown petticoats, interlinings, athletic apparel, and luxury decorative apparel.',
    gsm: '40 – 150 GSM',
    imageSrc: '/assets/uploads/2025/09/net-fabrics.png',
    circleColor: '#EC4899',
    circlePosition: 'top-left',
    imageOnLeft: false,
  },
  // 9. Recycled Fabrics (Eco Forest Emerald)
  {
    id: 'recycled',
    slug: 'recycled-fabrics',
    title: 'Recycled Fabrics',
    description:
      'Eco-conscious sustainable synthetic textiles manufactured from GRS & OEKO-TEX certified post-consumer recycled PET bottle filament yarns. Delivering identical silky touch, high tensile strength, and reduced carbon footprint.',
    gsm: '60 – 180 GSM',
    imageSrc: '/assets/uploads/2025/09/recycled-fabrics.png',
    circleColor: '#059669',
    circlePosition: 'top-right',
    imageOnLeft: true,
  },
  // 10. Viscose Fabrics (Amber Copper)
  {
    id: 'viscose',
    slug: 'viscose-fabrics',
    title: 'Viscose Fabrics',
    description:
      'Premium cellulose-blend weaves engineered for superior breathability, moisture absorption, and flowing drape. Favored for summer dresses, kurtis, tunics, and luxury scarves in compliance with international quality norms.',
    gsm: '85 – 160 GSM',
    imageSrc: '/assets/uploads/2025/09/viscose-fabrics.png',
    circleColor: '#D97706',
    circlePosition: 'top-left',
    imageOnLeft: false,
  },
];

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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
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
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center will-change-[transform,opacity,filter] ${
        index > 0 ? 'mt-16 sm:mt-24 lg:mt-28' : ''
      }`}
    >
      {/* -------------------------------------------------------------
          IMAGE CONTAINER WITH LIVING 3D ORB BEHIND CORNER
         ------------------------------------------------------------- */}
      <div
        ref={imageColRef}
        className={`lg:col-span-6 relative flex justify-center will-change-[transform,opacity,filter] ${
          item.imageOnLeft ? 'order-1' : 'order-1 lg:order-2'
        }`}
        style={{
          opacity: 0,
          filter: 'blur(14px)',
          transform: `translate3d(${item.imageOnLeft ? -45 : 45}px, 0, 0)`,
        }}
      >
        <div className="relative w-full max-w-[560px] group">
          
          {/* Living 3D Orb with Diffuse Radial Gradient & Ambient Float */}
          <div
            className={`absolute w-32 h-32 sm:w-44 sm:h-44 rounded-full pointer-events-none transition-transform duration-700 ease-out group-hover:scale-115 z-0 animate-pulse ${
              item.circlePosition === 'top-right'
                ? '-top-7 -right-6 sm:-top-9 sm:-right-8'
                : '-top-7 -left-6 sm:-top-9 sm:-left-8'
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

            {/* GSM Badge Pill with Glassmorphic Depth */}
            <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-20 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: item.circleColor }}
              />
              <span className="font-sans text-[11.5px] sm:text-[12px] font-bold text-[#0A192F] tracking-wide">
                {item.gsm}
              </span>
            </div>
          </Interactive3DCard>

        </div>
      </div>

      {/* -------------------------------------------------------------
          TEXT BLOCK: TITLE (CHARACTER SWEEP), ACCENT COLOR BAR, DESCRIPTION, READ MORE
         ------------------------------------------------------------- */}
      <div
        ref={textColRef}
        className={`lg:col-span-6 flex flex-col justify-center will-change-[transform,opacity,filter] ${
          item.imageOnLeft ? 'order-2 pl-0 lg:pl-4 xl:pl-8' : 'order-2 lg:order-1 pr-0 lg:pr-4 xl:pr-8'
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

            {/* Polygon Cut Brand Navy READ MORE Button (matching Who We Are standard) */}
            <div className="pt-2">
              <Link
                href={`/fabrics/${item.slug}`}
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

        </div>
      </div>
    </div>
  );
};

export const FabricsPortfolioSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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
      const nextCount = Math.min(visibleCount + 5, PORTFOLIO_ITEMS.length);
      setVisibleCount(nextCount);
      setIsLoadingMore(false);

      // Smooth scroll gently to the first newly loaded quality
      setTimeout(() => {
        const newlyRevealedEl = document.getElementById(`fabric-item-${visibleCount}`);
        if (newlyRevealedEl) {
          const y = newlyRevealedEl.getBoundingClientRect().top + window.scrollY - 100;
          if ((window as any).__lenis) {
            (window as any).__lenis.scrollTo(y, { duration: 1.2 });
          } else {
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }
      }, 120);
    }, 300);
  };

  const hasMore = visibleCount < PORTFOLIO_ITEMS.length;

  return (
    <section
      ref={sectionRef}
      id="fabrics-portfolio"
      className="relative w-full pt-6 sm:pt-8 lg:pt-10 pb-20 sm:pb-24 lg:pb-28 xl:pb-32 bg-[#FAF8F5] text-[#0A192F] overflow-hidden selection:bg-[#006DB6] selection:text-white"
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
            ALTERNATING FABRICS LIST (CREPE, GEORGETTE, CHIFFON, SATIN, POLY KNIT, BSY, DOBBY, NET, RECYCLED, VISCOSE)
           ========================================================= */}
        <div className="space-y-4">
          {PORTFOLIO_ITEMS.slice(0, visibleCount).map((item, index) => (
            <PortfolioRow key={item.id} item={item} index={index} />
          ))}
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
                clipPath: 'polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)',
              }}
            >
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
                clipPath: 'polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)',
              }}
            >
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
