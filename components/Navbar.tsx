'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Phone, Mail, Check, ArrowRight } from 'lucide-react';
import { FABRICS } from '@/data/fabrics';
import { COMPANY_INFO } from '@/data/company';

interface FabricNavItem {
  title: string;
  slug: string;
}

export function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileFabricsOpen, setMobileFabricsOpen] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [copiedField, setCopiedField] = useState<'phone' | 'email' | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const isHomePage = pathname === '/';

  // Close desktop dropdown on outside click, escape key, scroll, or route change
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
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
    FABRICS.map((f) => ({ title: f.title, slug: f.slug }))
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

  // Fetch live fabrics list from database/API
  useEffect(() => {
    let mounted = true;
    fetch('/api/fabrics')
      .then((res) => res.json())
      .then((data) => {
        if (mounted && data.success && Array.isArray(data.data) && data.data.length > 0) {
          setLiveFabrics(
            data.data.map((item: any) => ({
              title: item.name || item.title,
              slug: item.slug,
            }))
          );
        }
      })
      .catch((err) => console.warn('Could not load live fabrics for navbar:', err));

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

  // Divide into 2 columns for the mega-dropdown
  const half = Math.ceil(liveFabrics.length / 2);
  const col1 = liveFabrics.slice(0, half);
  const col2 = liveFabrics.slice(half);

  // Is the navbar currently transparent over the hero?
  const isHeroTransparentPage =
    pathname === '/' ||
    pathname === '/about-us' ||
    pathname === '/enquiry' ||
    pathname === '/contact-us' ||
    pathname.startsWith('/fabrics');
  const isTransparent = isHeroTransparentPage && !scrolled;

  return (
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
      <div className="max-w-[1720px] mx-auto px-5 sm:px-8 lg:px-14 flex items-center justify-between">

        {/* 1. LEFT COLUMN: Mobile Hamburger (Agnes Toth Style) & Desktop Navigation Links */}
        <div className="flex-1 flex items-center justify-start">
          {/* Mobile Hamburger Menu Button (Left aligned, matching agnestoth.com) */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-1.5 -ml-1.5 transition-colors focus:outline-none cursor-pointer ${isTransparent ? 'text-white hover:text-white/80' : 'text-slate-800 hover:text-brand-blue'
              }`}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6 stroke-[1.8]" /> : <Menu className="w-6 h-6 stroke-[1.8]" />}
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8">
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

                    {/* Agnes Haute Couture Fabrics Mega-Flyout */}
                    {desktopDropdownOpen && (
                      <div
                        className="absolute top-full left-0 pt-3 w-[600px] transition-all duration-300 z-50 animate-fade-in"
                      >
                        <div className="bg-white/90 backdrop-blur-[20px] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-sm p-6 overflow-hidden text-slate-900">

                          {/* Header bar */}
                          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
                            <span className="agnes-eyebrow text-[11px]">
                              Synthetic Textile Portfolio
                            </span>
                            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">
                              Surat Water-Jet Looms
                            </span>
                          </div>

                          {/* 2-Column Fabric Grid */}
                          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                            <div className="space-y-1">
                              {col1.map((item) => (
                                <Link
                                  key={item.slug}
                                  href={`/fabrics/${item.slug}`}
                                  onClick={() => setDesktopDropdownOpen(false)}
                                  className="group/item flex items-center justify-between py-1.5 px-2 rounded hover:bg-slate-50 transition-colors"
                                >
                                  <span className="text-[13px] font-medium text-slate-800 group-hover/item:text-brand-blue transition-colors">
                                    {item.title}
                                  </span>
                                  <span className="text-[11px] text-slate-400 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all">
                                    →
                                  </span>
                                </Link>
                              ))}
                            </div>

                            <div className="space-y-1">
                              {col2.map((item) => (
                                <Link
                                  key={item.slug}
                                  href={`/fabrics/${item.slug}`}
                                  onClick={() => setDesktopDropdownOpen(false)}
                                  className="group/item flex items-center justify-between py-1.5 px-2 rounded hover:bg-slate-50 transition-colors"
                                >
                                  <span className="text-[13px] font-medium text-slate-800 group-hover/item:text-brand-blue transition-colors">
                                    {item.title}
                                  </span>
                                  <span className="text-[11px] text-slate-400 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all">
                                    →
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Flyout Footer Action */}
                          <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/70 -mx-6 -mb-6 px-6 py-3">
                            <span className="text-[12px] text-slate-500">
                              Custom specs available on Make-To-Order basis
                            </span>
                            <Link
                              href="/fabrics"
                              onClick={() => setDesktopDropdownOpen(false)}
                              className="agnes-textlink text-[11px] text-brand-blue"
                            >
                              Explore All Fabrics
                            </Link>
                          </div>

                        </div>
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
            <div className="relative w-[130px] sm:w-[155px] md:w-[175px] lg:w-[190px] xl:w-[215px] 2xl:w-[245px] h-[32px] sm:h-[36px] md:h-[40px] lg:h-[44px] xl:h-[48px] 2xl:h-[52px]">
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

        {/* 3. RIGHT COLUMN: Modern Minimalist Phone + Email + Enquire (No 1280px Overflow) */}
        <div className="flex-1 flex items-center justify-end gap-2.5 sm:gap-3 xl:gap-3.5 2xl:gap-6 flex-shrink-0">

          {/* Phone Link: Minimalist Bare Icon to Copy / Text to Call */}
          <div className="hidden lg:flex items-center gap-1.5 group/phone flex-shrink-0">
            <button
              type="button"
              onClick={(e) => handleCopy('phone', COMPANY_INFO.phoneDisplay, e)}
              className="relative group/copy p-1 flex items-center justify-center focus:outline-none cursor-pointer transition-transform hover:scale-110"
              title="Click icon to copy phone number"
              aria-label="Copy phone number"
            >
              {copiedField === 'phone' ? (
                <Check className="w-4 h-4 text-emerald-400 stroke-[2.4]" />
              ) : (
                <Phone className={`w-4 h-4 stroke-[1.65] transition-colors ${isTransparent
                  ? 'text-white/80 group-hover/copy:text-white'
                  : 'text-slate-500 group-hover/copy:text-brand-blue'
                  }`} />
              )}

              {/* Minimalist Floating Tooltip */}
              <span className={`absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-sans font-medium whitespace-nowrap shadow-md pointer-events-none transition-all duration-200 z-50 ${copiedField === 'phone'
                ? 'bg-emerald-600 text-white opacity-100 translate-y-0'
                : 'bg-slate-900/90 text-white backdrop-blur-sm opacity-0 -translate-y-1 group-hover/copy:opacity-100 group-hover/copy:translate-y-0'
                }`}>
                {copiedField === 'phone' ? 'Copied!' : 'Copy'}
              </span>
            </button>

            {/* Direct Dial Link */}
            <a
              href={`tel:${COMPANY_INFO.phoneTel}`}
              className={`text-[12.5px] xl:text-[13px] 2xl:text-[13.5px] font-medium tracking-wide whitespace-nowrap transition-colors hover:underline underline-offset-4 hidden xl:inline ${isTransparent ? 'text-white/95 hover:text-white' : 'text-slate-700 hover:text-brand-blue'
                }`}
              title="Click to dial directly"
            >
              <span>{COMPANY_INFO.phoneDisplay}</span>
            </a>
          </div>

          {/* Email Link: Minimalist Bare Icon to Copy / Text to Email */}
          <div className="hidden lg:flex items-center gap-1.5 group/email flex-shrink-0">
            <button
              type="button"
              onClick={(e) => handleCopy('email', COMPANY_INFO.email, e)}
              className="relative group/copy p-1 flex items-center justify-center focus:outline-none cursor-pointer transition-transform hover:scale-110"
              title="Click icon to copy email address"
              aria-label="Copy email address"
            >
              {copiedField === 'email' ? (
                <Check className="w-4 h-4 text-emerald-400 stroke-[2.4]" />
              ) : (
                <Mail className={`w-4 h-4 stroke-[1.65] transition-colors ${isTransparent
                  ? 'text-white/80 group-hover/copy:text-white'
                  : 'text-slate-500 group-hover/copy:text-brand-blue'
                  }`} />
              )}

              {/* Minimalist Floating Tooltip */}
              <span className={`absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-sans font-medium whitespace-nowrap shadow-md pointer-events-none transition-all duration-200 z-50 ${copiedField === 'email'
                ? 'bg-emerald-600 text-white opacity-100 translate-y-0'
                : 'bg-slate-900/90 text-white backdrop-blur-sm opacity-0 -translate-y-1 group-hover/copy:opacity-100 group-hover/copy:translate-y-0'
                }`}>
                {copiedField === 'email' ? 'Copied!' : 'Copy'}
              </span>
            </button>

            {/* Direct Email Compose Link (Shown on 2xl+ to guarantee zero overflow on 1280px-1440px) */}
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className={`text-[12.5px] xl:text-[13px] 2xl:text-[13.5px] font-medium tracking-wide whitespace-nowrap transition-colors hover:underline underline-offset-4 hidden 2xl:inline ${isTransparent ? 'text-white/95 hover:text-white' : 'text-slate-700 hover:text-brand-blue'
                }`}
              title="Click to compose email"
            >
              <span>{COMPANY_INFO.email}</span>
            </a>
          </div>

          {/* Subtle Hairline Separator (Shown on 2xl+) */}
          <div className={`h-4 w-[1px] hidden 2xl:block transition-colors ${isTransparent ? 'bg-white/25' : 'bg-slate-300/80'
            }`} />

          {/* Minimalist Transparent Glass Button with Angled Cut & Luminous Shine Sweep (Mobile & Desktop) */}
          <Link
            href="/enquiry"
            className={`relative inline-flex items-center justify-center h-8 sm:h-8.5 lg:h-9 pl-3.5 pr-5 sm:pl-4 sm:pr-6 lg:pl-5 lg:pr-7 text-[10px] sm:text-[10.5px] lg:text-[11px] font-medium tracking-[0.16em] lg:tracking-[0.18em] uppercase whitespace-nowrap transition-all duration-300 group cursor-pointer overflow-hidden flex-shrink-0 hover:-translate-y-0.5 active:translate-y-0 ${isTransparent
                ? 'text-white bg-white/[0.06] hover:bg-white/[0.16] backdrop-blur-[8px]'
                : 'text-[#203a61] bg-transparent hover:bg-[#375785] hover:text-white'
              }`}
            style={{
              clipPath: 'polygon(0 0, 100% 0, calc(100% - 11px) 100%, 0 100%)',
            }}
          >
            {/* 100% Transparent Center with Razor-Sharp 1px Border Following Cut Corner */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
              <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke={isTransparent ? 'rgba(255,255,255,0.75)' : 'rgba(55,87,133,0.75)'} strokeWidth="1" />
              <line x1="100%" y1="0" x2="calc(100% - 11px)" y2="100%" stroke={isTransparent ? 'rgba(255,255,255,0.75)' : 'rgba(55,87,133,0.75)'} strokeWidth="1.2" />
              <line x1="calc(100% - 11px)" y1="calc(100% - 0.5px)" x2="0" y2="calc(100% - 0.5px)" stroke={isTransparent ? 'rgba(255,255,255,0.75)' : 'rgba(55,87,133,0.75)'} strokeWidth="1" />
              <line x1="0.5" y1="100%" x2="0.5" y2="0" stroke={isTransparent ? 'rgba(255,255,255,0.75)' : 'rgba(55,87,133,0.75)'} strokeWidth="1" />
            </svg>

            {/* Smooth Luminous Shine Sweep (matching READ MORE and SUBSCRIBE) */}
            <span
              className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/45 to-transparent -skew-x-12 pointer-events-none group-hover:translate-x-[250%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
              aria-hidden="true"
            />

            <span className="relative z-10 font-sans">Enquire</span>
          </Link>
        </div>

      </div>

      {/* ================================================================= */}
      {/* LUXURY LEFT-HAND SLIDE-IN MOBILE DRAWER (AGNES TOTH HAUTE-COUTURE) */}
      {/* ================================================================= */}
      <div
        className={`lg:hidden fixed inset-0 z-[100] transition-opacity duration-300 ${isOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
          }`}
        aria-hidden={!isOpen}
      >
        {/* 1. Backdrop Scrim Overlay with Dark Frosted Blur */}
        <div
          onClick={() => setIsOpen(false)}
          onTouchMove={(e) => e.preventDefault()}
          className={`absolute inset-0 bg-[#071120]/70 backdrop-blur-md transition-opacity duration-500 ease-out touch-none ${isOpen ? 'opacity-100' : 'opacity-0'
            }`}
        />

        {/* 2. Left Slide-In Drawer Panel (Solid Prestigious #FAF4F0 Silk Canvas) */}
        <aside
          className={`relative w-[320px] sm:w-[380px] max-w-[85vw] h-full bg-[#FAF4F0] text-slate-900 shadow-[0_0_60px_rgba(0,0,0,0.35)] flex flex-col justify-between overflow-y-auto overscroll-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          {/* Top Bar: Brand Logo & Close Icon Button */}
          <div className="p-6 border-b border-slate-200/80 flex items-center justify-between bg-white/60 backdrop-blur-sm sticky top-0 z-10">
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
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#006DB6] hover:text-white flex items-center justify-center text-slate-700 transition-all cursor-pointer focus:outline-none"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>
          </div>

          {/* Navigation Links List */}
          <div className="p-6 flex-1 space-y-2 overflow-y-auto">
            <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#006DB6] block mb-3 font-sans">
              NAVIGATION
            </span>

            <nav className="flex flex-col space-y-1">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-[14.5px] font-medium tracking-wide transition-colors ${pathname === '/'
                    ? 'bg-[#006DB6]/10 text-[#006DB6] font-semibold'
                    : 'text-slate-800 hover:bg-slate-100/80 hover:text-[#006DB6]'
                  }`}
              >
                <span>Home</span>
                {pathname === '/' && <span className="w-1.5 h-1.5 rounded-full bg-[#006DB6]" />}
              </Link>

              <Link
                href="/about-us"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-[14.5px] font-medium tracking-wide transition-colors ${pathname === '/about-us'
                    ? 'bg-[#006DB6]/10 text-[#006DB6] font-semibold'
                    : 'text-slate-800 hover:bg-slate-100/80 hover:text-[#006DB6]'
                  }`}
              >
                <span>About Us</span>
                {pathname === '/about-us' && <span className="w-1.5 h-1.5 rounded-full bg-[#006DB6]" />}
              </Link>

              {/* Fabrics Accordion */}
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => setMobileFabricsOpen(!mobileFabricsOpen)}
                  className="flex items-center justify-between w-full py-2.5 px-3 rounded-lg text-[14.5px] font-medium tracking-wide text-slate-800 hover:bg-slate-100/80 hover:text-[#006DB6] transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>Fabrics</span>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#006DB6]/15 text-[#006DB6]">
                      {liveFabrics.length}
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${mobileFabricsOpen ? 'rotate-180 text-[#006DB6]' : ''
                      }`}
                  />
                </button>

                {mobileFabricsOpen && (
                  <div className="mt-1 ml-3 pl-3 border-l-2 border-[#006DB6]/30 space-y-1">
                    {liveFabrics.map((fabric) => (
                      <Link
                        key={fabric.slug}
                        href={`/fabrics/${fabric.slug}`}
                        onClick={() => setIsOpen(false)}
                        className={`block py-1.5 px-2 text-[13px] rounded transition-colors ${pathname === `/fabrics/${fabric.slug}`
                            ? 'text-[#006DB6] font-semibold bg-[#006DB6]/5'
                            : 'text-slate-600 hover:text-[#006DB6] hover:bg-slate-100/60'
                          }`}
                      >
                        {fabric.title}
                      </Link>
                    ))}
                    <Link
                      href="/fabrics"
                      onClick={() => setIsOpen(false)}
                      className="block pt-2 pb-1 px-2 text-[12px] font-semibold uppercase tracking-wider text-[#006DB6] hover:underline"
                    >
                      View All Fabrics →
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/network"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-[14.5px] font-medium tracking-wide transition-colors ${pathname === '/network'
                    ? 'bg-[#006DB6]/10 text-[#006DB6] font-semibold'
                    : 'text-slate-800 hover:bg-slate-100/80 hover:text-[#006DB6]'
                  }`}
              >
                <span>Network</span>
                {pathname === '/network' && <span className="w-1.5 h-1.5 rounded-full bg-[#006DB6]" />}
              </Link>

              <Link
                href="/contact-us"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-[14.5px] font-medium tracking-wide transition-colors ${pathname === '/contact-us'
                    ? 'bg-[#006DB6]/10 text-[#006DB6] font-semibold'
                    : 'text-slate-800 hover:bg-slate-100/80 hover:text-[#006DB6]'
                  }`}
              >
                <span>Contact Us</span>
                {pathname === '/contact-us' && <span className="w-1.5 h-1.5 rounded-full bg-[#006DB6]" />}
              </Link>
            </nav>
          </div>

          {/* Drawer Bottom Bar: Direct Contact Info & Enquire Button */}
          <div className="p-6 border-t border-slate-200/80 bg-white/70 backdrop-blur-sm space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[12.5px]">
                <a
                  href={`tel:${COMPANY_INFO.phoneTel}`}
                  className="flex items-center gap-2 text-slate-800 hover:text-[#006DB6] font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-[#006DB6]" />
                  <span>{COMPANY_INFO.phoneDisplay}</span>
                </a>
                <button
                  type="button"
                  onClick={(e) => handleCopy('phone', COMPANY_INFO.phoneDisplay, e)}
                  className="text-[11px] text-slate-500 hover:text-[#006DB6] font-medium cursor-pointer"
                >
                  {copiedField === 'phone' ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <div className="flex items-center justify-between text-[12.5px]">
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-2 text-slate-800 hover:text-[#006DB6] font-medium truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-[#006DB6] flex-shrink-0" />
                  <span className="truncate">{COMPANY_INFO.email}</span>
                </a>
                <button
                  type="button"
                  onClick={(e) => handleCopy('email', COMPANY_INFO.email, e)}
                  className="text-[11px] text-slate-500 hover:text-[#006DB6] font-medium cursor-pointer flex-shrink-0 ml-2"
                >
                  {copiedField === 'email' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <Link
              href="/enquiry"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#006DB6] hover:bg-[#0A192F] text-white rounded-xl text-[12px] font-semibold tracking-wider uppercase transition-colors shadow-md"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </aside>
      </div>

    </header>
  );
}
