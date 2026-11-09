'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Phone, Mail, Check, ArrowRight } from 'lucide-react';
import { FABRICS } from '@/data/fabrics';
import { COMPANY_INFO } from '@/data/company';
import { fetchPublishedFabrics } from '@/services/fabricsApi';

interface FabricNavItem {
  title: string;
  slug: string;
  image?: string;
}

export function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileFabricsOpen, setMobileFabricsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [copiedField, setCopiedField] = useState<'phone' | 'email' | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const tabletDropdownRef = React.useRef<HTMLDivElement>(null);
  const isHomePage = pathname === '/';

  // Close desktop and tablet dropdown on outside click, escape key, scroll, or route change
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      const inDesktop = dropdownRef.current && dropdownRef.current.contains(target);
      const inTablet = tabletDropdownRef.current && tabletDropdownRef.current.contains(target);
      if (!inDesktop && !inTablet) {
        setDesktopDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDesktopDropdownOpen(false);
      }
    };

    const handleScrollClose = () => {
      setDesktopDropdownOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScrollClose, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScrollClose);
    };
  }, []);

  // Close dropdown and mobile drawer whenever route changes
  useEffect(() => {
    setDesktopDropdownOpen(false);
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open (prevents behind scroll)
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Copy to clipboard helper with bulletproof fallback & tooltip feedback
  const handleCopy = async (type: 'phone' | 'email', text: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    let copied = false;
    try {
      if (navigator?.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        copied = true;
      }
    } catch {
      // Fallback below
    }

    if (!copied) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        copied = true;
      } catch (err2) {
        console.warn('Fallback copy failed:', err2);
      }
    }

    if (copied) {
      setCopiedField(type);
      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    }
  };

  // Dynamic fabrics state with static initial fallback
  const [liveFabrics, setLiveFabrics] = useState<FabricNavItem[]>(
    FABRICS.map((f) => ({ title: f.title, slug: f.slug, image: f.image }))
  );

  useEffect(() => {
    let lastY = typeof window !== 'undefined' ? window.scrollY : 0;
    let ticking = false;

    const updateScroll = (currentY: number) => {
      // Always dismiss any open dropdown on scroll
      setDesktopDropdownOpen(false);

      const isScrolledNow = currentY > 30;
      setScrolled((prev) => (prev !== isScrolledNow ? isScrolledNow : prev));

      const deltaY = currentY - lastY;

      if (currentY <= 40) {
        setIsHidden((prev) => (prev ? false : prev));
      } else if (deltaY > 6 && currentY > 80 && !isOpen) {
        setIsHidden((prev) => (!prev ? true : prev));
      } else if (deltaY < -4 && !isOpen) {
        setIsHidden((prev) => (prev ? false : prev));
      }

      lastY = currentY;
      ticking = false;
    };

    // On mount, immediately synchronize with actual scroll position (fixes refresh bug when scrolled down)
    const initScrollSync = () => {
      const curY = typeof window !== 'undefined' ? window.scrollY : 0;
      const isScrolledNow = curY > 30;
      setScrolled((prev) => (prev !== isScrolledNow ? isScrolledNow : prev));
      if (curY > 80 && !isOpen) {
        setIsHidden((prev) => (!prev ? true : prev));
      } else {
        setIsHidden((prev) => (prev ? false : prev));
      }
      lastY = curY;
    };

    initScrollSync();

    // Re-check on next animation frame and timeouts in case browser restores scroll position asynchronously
    const rafId = window.requestAnimationFrame(initScrollSync);
    const t1 = setTimeout(initScrollSync, 80);

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScroll(window.scrollY);
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      clearTimeout(t1);
      window.removeEventListener('scroll', onScroll);
    };
  }, [isOpen]);

  // Fetch live fabrics list from database/API using centralized service
  useEffect(() => {
    let mounted = true;
    fetchPublishedFabrics(true).then((fabrics) => {
      if (mounted && fabrics.length > 0) {
        setLiveFabrics(
          fabrics.map((item) => ({
            title: item.name || item.title,
            slug: item.slug,
            image: item.image,
          }))
        );
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const navLinks = [
    { name: 'About Us', href: '/about-us' },
    {
      name: 'Fabrics',
      href: '/fabrics',
      hasDropdown: true
    },
    { name: 'Network', href: '/network' },
    { name: 'Contact Us', href: '/contact-us' }
  ];

  // Up to 15 items in navbar menu: exactly 3 columns of 5 items max (5-5-5 layout, zero scroll)
  const menuFabrics = liveFabrics.slice(0, 15);
  const col1 = menuFabrics.slice(0, 5);
  const col2 = menuFabrics.slice(5, 10);
  const col3 = menuFabrics.slice(10, 15);

  // Reusable 15-item 3-column Mega-Flyout for Desktop & Tablet
  const renderFabricsFlyout = () => (
    <div
      className="border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.25)] rounded-2xl p-5 text-slate-900"
      style={{ backgroundColor: '#ffffff', color: '#0f172a' }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#006DB6]" />
          <span className="text-[11px] font-bold text-slate-800 tracking-[0.16em] uppercase font-sans">
            Export Textile Qualities
          </span>
        </div>
      </div>

      {/* 3-Column Fabric Grid (5 - 5 - 5 Layout, No Scroll) */}
      <div className="grid grid-cols-3 gap-x-3 sm:gap-x-4 gap-y-1">
        {/* Column 1 (Items 1 - 5) */}
        <div className="space-y-1">
          {col1.map((item) => (
            <Link
              key={item.slug}
              href={`/fabrics/${item.slug}`}
              onClick={() => setDesktopDropdownOpen(false)}
              className="group/item flex items-center gap-2.5 py-1.5 px-2 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 hover:shadow-2xs"
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-2xs group-hover/item:border-[#006DB6] transition-all">
                <img
                  src={item.image || '/assets/uploads/2025/09/bsy-fabrics.png'}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/uploads/2025/09/bsy-fabrics.png';
                  }}
                />
              </div>
              <span className="text-[13px] font-medium text-slate-800 group-hover/item:text-[#006DB6] transition-colors truncate flex-1">
                {item.title}
              </span>
              <span className="text-[12px] text-[#006DB6] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all shrink-0 font-bold">
                &rarr;
              </span>
            </Link>
          ))}
        </div>

        {/* Column 2 (Items 6 - 10) */}
        <div className="space-y-1">
          {col2.map((item) => (
            <Link
              key={item.slug}
              href={`/fabrics/${item.slug}`}
              onClick={() => setDesktopDropdownOpen(false)}
              className="group/item flex items-center gap-2.5 py-1.5 px-2 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 hover:shadow-2xs"
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-2xs group-hover/item:border-[#006DB6] transition-all">
                <img
                  src={item.image || '/assets/uploads/2025/09/bsy-fabrics.png'}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/uploads/2025/09/bsy-fabrics.png';
                  }}
                />
              </div>
              <span className="text-[13px] font-medium text-slate-800 group-hover/item:text-[#006DB6] transition-colors truncate flex-1">
                {item.title}
              </span>
              <span className="text-[12px] text-[#006DB6] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all shrink-0 font-bold">
                &rarr;
              </span>
            </Link>
          ))}
        </div>

        {/* Column 3 (Items 11 - 15) */}
        <div className="space-y-1">
          {col3.map((item) => (
            <Link
              key={item.slug}
              href={`/fabrics/${item.slug}`}
              onClick={() => setDesktopDropdownOpen(false)}
              className="group/item flex items-center gap-2.5 py-1.5 px-2 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 hover:shadow-2xs"
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-2xs group-hover/item:border-[#006DB6] transition-all">
                <img
                  src={item.image || '/assets/uploads/2025/09/bsy-fabrics.png'}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/uploads/2025/09/bsy-fabrics.png';
                  }}
                />
              </div>
              <span className="text-[13px] font-medium text-slate-800 group-hover/item:text-[#006DB6] transition-colors truncate flex-1">
                {item.title}
              </span>
              <span className="text-[12px] text-[#006DB6] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all shrink-0 font-bold">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Flyout Footer Action */}
      <div
        className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between -mx-5 -mb-5 px-5 py-3 rounded-b-2xl"
        style={{ backgroundColor: '#f8fafc' }}
      >
        <span className="text-[11px] sm:text-[12px] text-slate-600 font-sans truncate mr-3">
          Custom weaves on Make-To-Order basis &bull; High-speed water-jet looms
        </span>
        <Link
          href="/fabrics"
          onClick={() => setDesktopDropdownOpen(false)}
          className="relative inline-flex items-center justify-center gap-2 h-9 pl-4 pr-6 text-[11px] font-semibold tracking-[0.16em] uppercase text-white bg-gradient-to-r from-[#2c4973] via-[#375785] to-[#436b9e] hover:from-[#375785] hover:via-[#436b9e] hover:to-[#5581ba] transition-all duration-300 group shadow-[0_2px_10px_rgba(55,87,133,0.25)] hover:shadow-[0_4px_16px_rgba(55,87,133,0.4)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer overflow-hidden shrink-0"
          style={{
            clipPath: 'polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
          }}
        >
          {/* Smooth Luminous Shine Sweep */}
          <span
            className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none group-hover:translate-x-[250%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
            aria-hidden="true"
          />
          <span className="relative z-10 font-sans">Explore All Fabrics ({liveFabrics.length})</span>
          <ArrowRight className="relative z-10 w-3.5 h-3.5 stroke-[2.2] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );

  // Is the navbar currently transparent over the hero?
  const isHeroTransparentPage =
    pathname === '/' ||
    pathname === '/about-us' ||
    pathname === '/contact-us' ||
    pathname === '/network' ||
    pathname === '/fabrics';
  const isTransparent = isHeroTransparentPage && !scrolled;

  return (
    <>
      <header
      className={`fixed top-0 left-0 right-0 z-50 anim-nav-enter transition-transform duration-500 ease-agnes border-0 shadow-none will-change-transform ${isHidden ? '-translate-y-full' : 'translate-y-0'
        } ${isTransparent
          ? 'bg-transparent py-5 sm:py-6 lg:py-7 text-white'
          : 'bg-white/90 backdrop-blur-[20px] py-3.5 sm:py-4 text-slate-800 shadow-sm'
        }`}
      style={{
        WebkitBackdropFilter: isTransparent ? 'none' : 'blur(20px)',
      }}
    >
      <div className="max-w-[1720px] mx-auto px-3.5 sm:px-8 lg:px-14 flex items-center justify-between">

        {/* 1. LEFT COLUMN: Mobile Hamburger & Desktop Navigation Links (Symmetrical on Tablet) */}
        <div className="flex-1 flex items-center justify-start gap-2 sm:gap-2.5">
          {/* Mobile & Tablet Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`xl:hidden p-1.5 -ml-1 transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95 focus:outline-none cursor-pointer ${
              isTransparent
                ? 'text-white/90 hover:text-white'
                : 'text-slate-800 hover:text-brand-blue'
            }`}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5 stroke-[2]" /> : <Menu className="w-5 h-5 stroke-[2]" />}
          </button>

          {/* Tablet "FABRICS" Dropdown Button (Opens Flyout Menu on Tablet Instead of Navigating) */}
          <div ref={tabletDropdownRef} className="relative hidden sm:inline-flex xl:hidden items-center">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDesktopDropdownOpen((prev) => !prev);
              }}
              className={`inline-flex items-center gap-1.5 h-8 px-2 text-[12px] font-medium tracking-[0.14em] uppercase whitespace-nowrap transition-colors duration-200 cursor-pointer focus:outline-none ${
                pathname.startsWith('/fabrics')
                  ? isTransparent
                    ? 'text-white font-semibold'
                    : 'text-brand-blue font-semibold'
                  : isTransparent
                    ? 'text-white/90 hover:text-white'
                    : 'text-slate-700 hover:text-brand-blue'
              }`}
              aria-expanded={desktopDropdownOpen}
              aria-haspopup="true"
            >
              <span>Fabrics</span>
              <ChevronDown
                className={`w-3.5 h-3.5 stroke-[1.75] transition-transform duration-300 ${
                  desktopDropdownOpen ? 'rotate-180' : ''
                } ${isTransparent ? 'text-white/70' : 'text-slate-400'}`}
              />
            </button>

            {/* Tablet Fabrics Mega-Flyout */}
            {desktopDropdownOpen && (
              <div className="absolute top-full left-0 pt-2.5 w-[min(840px,calc(100vw-80px))] z-50 animate-fade-in">
                {renderFabricsFlyout()}
              </div>
            )}
          </div>

          {/* Desktop Navigation Links (Visible on Laptop & Desktop >= 1280px) */}
          <nav className="hidden xl:flex items-center gap-3.5 2xl:gap-7">
            <Link
              href="/"
              className={`text-[12.5px] xl:text-[13px] 2xl:text-[13.5px] font-medium tracking-[0.14em] uppercase whitespace-nowrap transition-all duration-300 ${pathname === '/'
                ? isTransparent ? 'text-white font-semibold' : 'text-brand-blue font-semibold'
                : isTransparent ? 'text-white/90 hover:text-white' : 'text-slate-700 hover:text-brand-blue'
                }`}
            >
              Home
            </Link>

            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    ref={dropdownRef}
                    className="relative py-2"
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setDesktopDropdownOpen((prev) => !prev);
                      }}
                      className={`flex items-center gap-1.5 text-[13px] xl:text-[13.5px] font-medium tracking-[0.14em] uppercase whitespace-nowrap transition-all duration-300 focus:outline-none cursor-pointer ${isActive
                        ? isTransparent ? 'text-white font-semibold' : 'text-brand-blue font-semibold'
                        : isTransparent ? 'text-white/90 hover:text-white' : 'text-slate-700 hover:text-brand-blue'
                        }`}
                      aria-expanded={desktopDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-3.5 h-3.5 stroke-[1.75] transition-transform duration-300 ${desktopDropdownOpen ? 'rotate-180' : ''
                        } ${isTransparent ? 'text-white/70' : 'text-slate-400'}`} />
                    </button>

                    {/* Agnes Haute Couture Fabrics Mega-Flyout with Quality Images (3 Columns of 5, Max 15 Items, Zero Scroll) */}
                    {desktopDropdownOpen && (
                      <div
                        className="absolute top-full left-0 pt-2.5 w-[840px] max-w-[95vw] transition-all duration-200 z-50 animate-fade-in"
                      >
                        {renderFabricsFlyout()}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[12.5px] xl:text-[13px] 2xl:text-[13.5px] font-medium tracking-[0.14em] uppercase whitespace-nowrap transition-all duration-300 ${isActive
                    ? isTransparent ? 'text-white font-semibold' : 'text-brand-blue font-semibold'
                    : isTransparent ? 'text-white/90 hover:text-white' : 'text-slate-700 hover:text-brand-blue'
                    }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 2. CENTER COLUMN: Brand Logo (Centered on both Mobile & Desktop, Refined Proportions) */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <Link
            href="/"
            className="relative flex items-center justify-center transition-opacity hover:opacity-90 py-1"
          >
            <div className="relative w-[112px] sm:w-[155px] md:w-[175px] lg:w-[190px] xl:w-[215px] 2xl:w-[245px] h-[28px] sm:h-[36px] md:h-[40px] lg:h-[44px] xl:h-[48px] 2xl:h-[52px]">
              <Image
                src={isTransparent ? "/assets/uploads/2025/08/footer-logo.png" : "/assets/uploads/2025/08/logo.png"}
                alt="Viral Fabrics"
                fill
                className="object-contain object-center transition-all duration-500"
                priority
              />
            </div>
          </Link>
        </div>

        {/* 3. RIGHT COLUMN: Phone Icon + Email Icon + Enquire Button (Mobile, Tablet, Desktop) */}
        <div className="flex-1 flex items-center justify-end gap-2 sm:gap-2.5 lg:gap-3 xl:gap-3.5 2xl:gap-6 flex-shrink-0">

          {/* Phone Link (Haute Couture Minimalist Style: Naked Icon + Direct Dial Text on Desktop >= 1280px) */}
          <a
            href={`tel:${COMPANY_INFO.phoneTel}`}
            className={`flex items-center gap-1.5 sm:gap-2 p-1.5 transition-all duration-200 group/phone flex-shrink-0 cursor-pointer focus:outline-none ${
              isTransparent
                ? 'text-white/90 hover:text-white'
                : 'text-slate-700 hover:text-brand-blue'
            }`}
            title={`Call ${COMPANY_INFO.phoneDisplay}`}
            aria-label={`Call ${COMPANY_INFO.phoneDisplay}`}
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.8] transition-transform duration-200 group-hover/phone:scale-110" />
            <span className="text-[12px] 2xl:text-[13.5px] font-medium tracking-wide whitespace-nowrap hidden xl:inline group-hover/phone:underline underline-offset-4">
              {COMPANY_INFO.phoneDisplay}
            </span>
          </a>

          {/* Email Link (Haute Couture Minimalist Style: Naked Icon + Direct Email Text on Desktop >= 1280px) */}
          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className={`flex items-center gap-1.5 sm:gap-2 p-1.5 transition-all duration-200 group/email flex-shrink-0 cursor-pointer focus:outline-none ${
              isTransparent
                ? 'text-white/90 hover:text-white'
                : 'text-slate-700 hover:text-brand-blue'
            }`}
            title={`Email ${COMPANY_INFO.email}`}
            aria-label={`Email ${COMPANY_INFO.email}`}
          >
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.8] transition-transform duration-200 group-hover/email:scale-110" />
            <span className="text-[12px] 2xl:text-[13.5px] font-medium tracking-wide whitespace-nowrap hidden xl:inline group-hover/email:underline underline-offset-4">
              {COMPANY_INFO.email}
            </span>
          </a>

          {/* Minimalist Cut-Corner Button (Seamless Single Closed Polygon Border, Zero Stray Line Glitch) */}
          <Link
            href="/enquiry"
            className={`relative hidden sm:inline-flex items-center justify-center h-8 sm:h-8.5 lg:h-9 px-4 sm:px-4.5 lg:px-5.5 text-[10px] sm:text-[10.5px] lg:text-[11px] font-semibold tracking-[0.18em] uppercase whitespace-nowrap transition-all duration-300 group cursor-pointer flex-shrink-0 hover:-translate-y-0.5 active:translate-y-0 ${
              isTransparent
                ? 'text-white'
                : 'text-[#203a61] hover:text-white'
            }`}
            style={{
              clipPath: 'polygon(0 0, 100% 0, 89% 100%, 0 100%)',
            }}
          >
            {/* SVG Cut-Corner Continuous 1px Border & Background (Single closed shape, zero stray line leak) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon
                points="0.5,0.5 99.5,0.5 89,99.5 0.5,99.5"
                className={`transition-colors duration-300 ${
                  isTransparent
                    ? 'fill-white/[0.08] group-hover:fill-white/[0.2] stroke-white/80 group-hover:stroke-white'
                    : 'fill-transparent group-hover:fill-[#375785] stroke-[#375785]/75 group-hover:stroke-[#375785]'
                }`}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                strokeLinejoin="miter"
              />
            </svg>

            {/* Smooth Luminous Shine Sweep */}
            <span
              className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/45 to-transparent -skew-x-12 pointer-events-none group-hover:translate-x-[250%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
              aria-hidden="true"
            />

            <span className="relative z-10 font-sans">ENQUIRE</span>
          </Link>
        </div>

      </div>
    </header>

    {/* ================================================================= */}
    {/* LUXURY LEFT-HAND SLIDE-IN MOBILE DRAWER (PORTALED DIRECTLY TO BODY) */}
    {/* ================================================================= */}
    {mounted && typeof document !== 'undefined' && createPortal(
      <div
        className={`fixed inset-0 z-[999999] transition-opacity duration-300 ${
          isOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
        }`}
        aria-hidden={!isOpen}
      >
        {/* 1. Backdrop Scrim Overlay with Dark Frosted Blur */}
        <div
          onClick={() => setIsOpen(false)}
          onTouchMove={(e) => e.preventDefault()}
          className={`fixed inset-0 bg-[#071120]/75 backdrop-blur-md transition-opacity duration-500 ease-out touch-none ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* 2. Left Slide-In Drawer Panel (Clean Luxury Light Theme matching Website) */}
        <aside
          className={`fixed top-0 left-0 bottom-0 w-[320px] sm:w-[380px] max-w-[85vw] h-screen bg-[#FAF8F5] text-slate-800 border-r border-slate-200/80 shadow-[0_0_60px_rgba(10,25,47,0.18)] flex flex-col justify-between overflow-y-auto overscroll-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-[1000000] ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Top Bar: Brand Logo & Close Icon Button */}
          <div className="p-5 sm:p-6 border-b border-slate-200/80 flex items-center justify-between bg-white/95 backdrop-blur-md sticky top-0 z-10">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="relative w-[140px] h-[34px]"
            >
              <Image
                src="/assets/uploads/2025/08/logo.png"
                alt="Viral Fabrics"
                fill
                className="object-contain object-left"
                priority
              />
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors cursor-pointer focus:outline-none"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>
          </div>

          {/* Navigation Links List */}
          <div className="p-5 sm:p-6 flex-1 space-y-2 overflow-y-auto">
            <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#006DB6] block mb-3 font-sans">
              NAVIGATION
            </span>

            <nav className="flex flex-col space-y-1">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-lg text-[14.5px] font-medium tracking-wide transition-all ${
                  pathname === '/'
                    ? 'bg-[#006DB6]/10 text-[#006DB6] font-semibold border-l-2 border-[#006DB6] pl-3'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-[#006DB6]'
                }`}
              >
                <span>Home</span>
                {pathname === '/' && <span className="w-2 h-2 rounded-full bg-[#006DB6]" />}
              </Link>

              <Link
                href="/about-us"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-lg text-[14.5px] font-medium tracking-wide transition-all ${
                  pathname === '/about-us'
                    ? 'bg-[#006DB6]/10 text-[#006DB6] font-semibold border-l-2 border-[#006DB6] pl-3'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-[#006DB6]'
                }`}
              >
                <span>About Us</span>
                {pathname === '/about-us' && <span className="w-2 h-2 rounded-full bg-[#006DB6]" />}
              </Link>

              {/* Fabrics Accordion (Collapsed by Default) */}
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => setMobileFabricsOpen(!mobileFabricsOpen)}
                  className="flex items-center justify-between w-full py-2.5 px-3.5 rounded-lg text-[14.5px] font-medium tracking-wide text-slate-700 hover:bg-slate-100 hover:text-[#006DB6] transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>Fabrics</span>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#006DB6]/10 text-[#006DB6]">
                      {liveFabrics.length}
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                      mobileFabricsOpen ? 'rotate-180 text-[#006DB6]' : ''
                    }`}
                  />
                </button>

                {mobileFabricsOpen && (
                  <div className="mt-1 ml-3.5 pl-3 border-l-2 border-[#006DB6]/30 space-y-1 animate-in fade-in duration-300 max-h-[360px] overflow-y-auto pr-1">
                    {liveFabrics.map((fabric) => (
                      <Link
                        key={fabric.slug}
                        href={`/fabrics/${fabric.slug}`}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-2.5 py-1.5 px-2 text-[13px] rounded-lg transition-colors ${
                          pathname === `/fabrics/${fabric.slug}`
                            ? 'text-[#006DB6] font-semibold bg-[#006DB6]/10'
                            : 'text-slate-700 hover:text-[#006DB6] hover:bg-slate-100/70'
                        }`}
                      >
                        <div className="relative w-7 h-7 rounded-md overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          <img
                            src={fabric.image || '/assets/uploads/2025/09/bsy-fabrics.png'}
                            alt={fabric.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/assets/uploads/2025/09/bsy-fabrics.png';
                            }}
                          />
                        </div>
                        <span className="truncate flex-1">{fabric.title}</span>
                      </Link>
                    ))}
                    <Link
                      href="/fabrics"
                      onClick={() => setIsOpen(false)}
                      className="block pt-2 pb-1 px-2 text-[12px] font-semibold uppercase tracking-wider text-[#006DB6] hover:text-[#005187] hover:underline"
                    >
                      Explore All Fabrics ({liveFabrics.length}) →
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/network"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-lg text-[14.5px] font-medium tracking-wide transition-all ${
                  pathname === '/network'
                    ? 'bg-[#006DB6]/10 text-[#006DB6] font-semibold border-l-2 border-[#006DB6] pl-3'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-[#006DB6]'
                }`}
              >
                <span>Network</span>
                {pathname === '/network' && <span className="w-2 h-2 rounded-full bg-[#006DB6]" />}
              </Link>

              <Link
                href="/contact-us"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-lg text-[14.5px] font-medium tracking-wide transition-all ${
                  pathname === '/contact-us'
                    ? 'bg-[#006DB6]/10 text-[#006DB6] font-semibold border-l-2 border-[#006DB6] pl-3'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-[#006DB6]'
                }`}
              >
                <span>Contact Us</span>
                {pathname === '/contact-us' && <span className="w-2 h-2 rounded-full bg-[#006DB6]" />}
              </Link>
            </nav>
          </div>

          {/* Drawer Bottom Bar: Direct Contact Info & Signature Polygon Cut Enquire Button */}
          <div className="p-5 sm:p-6 border-t border-slate-200/80 bg-white/95 backdrop-blur-md space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[12.5px]">
                <a
                  href={`tel:${COMPANY_INFO.phoneTel}`}
                  className="flex items-center gap-2 text-slate-700 hover:text-[#006DB6] font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-[#006DB6]" />
                  <span>{COMPANY_INFO.phoneDisplay}</span>
                </a>
                <a
                  href={`tel:${COMPANY_INFO.phoneTel}`}
                  className="text-[11px] text-[#006DB6] hover:text-white hover:bg-[#006DB6] font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-[#006DB6]/10 transition-colors"
                >
                  Call
                </a>
              </div>

              <div className="flex items-center justify-between text-[12.5px]">
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-2 text-slate-700 hover:text-[#006DB6] font-medium truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-[#006DB6] flex-shrink-0" />
                  <span className="truncate">{COMPANY_INFO.email}</span>
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-[11px] text-[#006DB6] hover:text-white hover:bg-[#006DB6] font-semibold uppercase tracking-wider flex-shrink-0 ml-2 px-2.5 py-1 rounded bg-[#006DB6]/10 transition-colors"
                >
                  Email
                </a>
              </div>
            </div>

            {/* Signature Brand Polygon Cut Enquire Button */}
            <Link
              href="/enquiry"
              onClick={() => setIsOpen(false)}
              className="relative w-full inline-flex items-center justify-center gap-2.5 h-11 px-6 text-[11.5px] font-semibold tracking-[0.16em] uppercase text-white bg-gradient-to-r from-[#113259] via-[#164273] to-[#1C518C] hover:from-[#0A223E] hover:to-[#143B66] transition-all duration-300 group shadow-[0_2px_12px_rgba(17,50,89,0.25)] hover:shadow-[0_4px_18px_rgba(17,50,89,0.35)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer overflow-hidden"
              style={{
                clipPath: 'polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)',
              }}
            >
              {/* Smooth Luminous Shine Sweep */}
              <span
                className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none group-hover:translate-x-[250%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                aria-hidden="true"
              />
              <span className="relative z-10 font-sans">ENQUIRE NOW</span>
              <ArrowRight className="relative z-10 w-3.5 h-3.5 stroke-[2.2] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
            </Link>
          </div>
        </aside>
      </div>,
      document.body
    )}
  </>
  );
}
