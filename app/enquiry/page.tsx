'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  User,
  Mail,
  Phone,
  ChevronDown,
  Layers,
  FileText,
  Send,
  ArrowRight,
  Check,
  Loader2,
  ShieldCheck,
  Gauge,
  Headphones,
  Home
} from 'lucide-react';
import gsap from 'gsap';
import { submitEnquiry } from '@/services/enquiryApi';
import { fetchPublishedFabrics } from '@/services/fabricsApi';
import type { LiveFabric } from '@/types';
import { CheckCircle2, Sparkles, Search, X } from 'lucide-react';

// Production Google reCAPTCHA v2 Key for viralfabrics.com
const PRODUCTION_RECAPTCHA_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6Lee0xMtAAAAACCQ9hcE7lqDYlO7p_Wz9VsLqpVH';

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: string | HTMLElement,
        parameters: {
          sitekey: string;
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
          theme?: 'light' | 'dark';
        }
      ) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
    onRecaptchaLoad?: () => void;
  }
}

// Helper to find best matching fabric option from URL query params
function matchFabricOption(param: string): string {
  if (!param) return '';
  return param.trim();
}

function EnquiryForm() {
  const searchParams = useSearchParams();
  const initialProductParam = searchParams
    ? searchParams.get('product') || searchParams.get('fabric') || searchParams.get('quality') || ''
    : '';
  const matchedInitial = matchFabricOption(initialProductParam);

  const [liveFabrics, setLiveFabrics] = useState<LiveFabric[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: matchedInitial,
    message: ''
  });

  // State for Searchable Product Combobox
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const productDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close product dropdown on outside click or escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (productDropdownRef.current && !productDropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Auto-focus search input when dropdown opens
  useEffect(() => {
    if (isDropdownOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 60);
    } else {
      setSearchTerm('');
    }
  }, [isDropdownOpen]);

  // Fetch live dynamic fabrics catalog from MongoDB Atlas
  useEffect(() => {
    let mounted = true;
    fetchPublishedFabrics('enquiry').then((fabrics) => {
      if (mounted && fabrics && fabrics.length > 0) {
        setLiveFabrics(fabrics);

        // If an initial param is present, attempt an exact match on live names/slugs
        if (initialProductParam) {
          const pLower = initialProductParam.toLowerCase().trim();
          const liveMatch = fabrics.find(
            (f) =>
              f.slug.toLowerCase() === pLower ||
              (f.name && f.name.toLowerCase() === pLower) ||
              (f.title && f.title.toLowerCase() === pLower) ||
              (f.name && f.name.toLowerCase().includes(pLower)) ||
              pLower.includes(f.slug.toLowerCase())
          );
          if (liveMatch) {
            setFormData((prev) => ({ ...prev, product: liveMatch.name || liveMatch.title }));
          }
        }
      }
    });
    return () => {
      mounted = false;
    };
  }, [initialProductParam]);

  const [captchaToken, setCaptchaToken] = useState('');
  const [humanVerified, setHumanVerified] = useState(false);
  const [useGoogleRecaptcha, setUseGoogleRecaptcha] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const widgetIdRef = useRef<number | null>(null);
  const recaptchaContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-fill product if query param updates dynamically
  useEffect(() => {
    if (initialProductParam) {
      const matched = matchFabricOption(initialProductParam);
      setFormData((prev) => ({ ...prev, product: matched }));
    }
  }, [initialProductParam]);

  // Google reCAPTCHA v2 initialization
  // Only activate real Google widget on production domain or when configured
  useEffect(() => {
    const isLocal =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

    // On localhost, default to clean instant Human Verification (no "testing only" watermark)
    // On production domain viralfabrics.com, load the real Google reCAPTCHA v2 widget
    if (!isLocal) {
      setUseGoogleRecaptcha(true);

      const renderWidget = () => {
        if (!window.grecaptcha || !recaptchaContainerRef.current) return;
        if (widgetIdRef.current !== null) return;

        try {
          const id = window.grecaptcha.render(recaptchaContainerRef.current, {
            sitekey: PRODUCTION_RECAPTCHA_KEY,
            callback: (token: string) => {
              setCaptchaToken(token);
              setHumanVerified(true);
              setErrorMsg('');
            },
            'expired-callback': () => {
              setCaptchaToken('');
              setHumanVerified(false);
            },
            'error-callback': () => {
              console.warn('Google reCAPTCHA domain check or network error. Switching to fallback.');
              setUseGoogleRecaptcha(false);
            }
          });
          widgetIdRef.current = id;
        } catch (err) {
          console.warn('reCAPTCHA render error:', err);
          setUseGoogleRecaptcha(false);
        }
      };

      if (typeof window !== 'undefined' && typeof window.grecaptcha?.render === 'function') {
        renderWidget();
      } else {
        window.onRecaptchaLoad = renderWidget;
        const scriptId = 'google-recaptcha-v2-script';
        if (!document.getElementById(scriptId)) {
          const script = document.createElement('script');
          script.id = scriptId;
          script.src =
            'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
        }
      }
    } else {
      setUseGoogleRecaptcha(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check verification
    let token = captchaToken;
    if (useGoogleRecaptcha && !token && typeof window !== 'undefined' && window.grecaptcha && widgetIdRef.current !== null) {
      try {
        token = window.grecaptcha.getResponse(widgetIdRef.current) || '';
      } catch (err) {
        // ignore
      }
    }

    const isVerified = Boolean(token || humanVerified);
    if (!isVerified) {
      setErrorMsg('Please complete the verification checkbox ("I am a human").');
      return;
    }

    if (!formData.product) {
      setErrorMsg('Please select a product enquiry category.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const result = await submitEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        product: formData.product,
        message: formData.message,
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit enquiry');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', product: '', message: '' });
      setCaptchaToken('');
      setHumanVerified(false);
      if (window.grecaptcha && widgetIdRef.current !== null) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error transmitting your request. Please call our Surat mill desk directly.';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white/95 backdrop-blur-md rounded-[28px] sm:rounded-[32px] p-8 sm:p-14 border border-white/90 shadow-[0_20px_50px_rgba(15,23,42,0.08)] text-center space-y-6 animate-fade-in max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <Check className="w-8 h-8 stroke-[2.2]" />
        </div>
        <div className="space-y-2.5">
          <span className="font-sans text-[11px] font-bold tracking-[0.24em] uppercase text-emerald-700">
            TRANSMISSION VERIFIED
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
            Enquiry Received Successfully
          </h2>
          <p className="font-sans text-[14px] sm:text-[15px] text-slate-600 max-w-lg mx-auto font-normal leading-relaxed">
            Thank you for reaching out. Our Surat loom technical desk has received your specifications and our sourcing specialists will contact you within 24 business hours.
          </p>
        </div>
        <div className="pt-3">
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="relative inline-flex items-center justify-center gap-2.5 h-12 pl-7 pr-9 text-[12.5px] sm:text-[13px] font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-[#0C2D50] via-[#0E3B68] to-[#164E87] hover:from-[#081F38] hover:via-[#0A2E52] hover:to-[#0F3B66] active:scale-[0.98] transition-all duration-300 shadow-[0_6px_20px_rgba(14,59,104,0.35)] hover:shadow-[0_8px_26px_rgba(14,59,104,0.5)] cursor-pointer group overflow-hidden"
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

            <span className="relative z-10 font-sans">Submit Another Enquiry</span>
            <ArrowRight className="relative z-10 w-4 h-4 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/95 backdrop-blur-md rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 border border-white/90 shadow-[0_20px_50px_rgba(15,23,42,0.08)] space-y-6"
    >
      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-xl flex items-center gap-2 animate-fade-in">
          <span className="font-semibold">Notice:</span> {errorMsg}
        </div>
      )}

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        <div className="space-y-2">
          <label className="block text-[12.5px] font-semibold text-slate-800 tracking-wide">
            Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              required
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-12 bg-white border border-slate-200/90 rounded-xl pl-10 pr-4 text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1E5FA8] focus:ring-2 focus:ring-[#1E5FA8]/15 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[12.5px] font-semibold text-slate-800 tracking-wide">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full h-12 bg-white border border-slate-200/90 rounded-xl pl-10 pr-4 text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1E5FA8] focus:ring-2 focus:ring-[#1E5FA8]/15 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Row 2: Phone / WhatsApp & Product Enquiry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        <div className="space-y-2">
          <label className="block text-[12.5px] font-semibold text-slate-800 tracking-wide">
            Phone / WhatsApp <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full h-12 bg-white border border-slate-200/90 rounded-xl pl-10 pr-4 text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1E5FA8] focus:ring-2 focus:ring-[#1E5FA8]/15 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-[12.5px] font-semibold text-slate-800 tracking-wide">
              Product Enquiry <span className="text-red-500">*</span>
            </label>
            {formData.product && (
              <span className="text-[11px] font-semibold text-[#1E5FA8] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Quality Selected
              </span>
            )}
          </div>

          {/* Custom Searchable Product Combobox */}
          {(() => {
            const cleanSearch = searchTerm.toLowerCase().trim();
            const filteredCatalogFabrics = liveFabrics.filter((f) => {
              const title = (f.name || f.title || '').toLowerCase();
              return title.includes(cleanSearch);
            });

            const isExactFabricMatch = liveFabrics.some(
              (f) => (f.name || f.title || '').toLowerCase() === cleanSearch
            );

            const showCustomOption = !cleanSearch || 'custom'.includes(cleanSearch);

            return (
              <div ref={productDropdownRef} className="relative">
                {/* Hidden input for form submission & validation */}
                <input
                  type="text"
                  name="product"
                  required
                  readOnly
                  value={formData.product}
                  className="sr-only"
                  tabIndex={-1}
                  aria-hidden="true"
                />

                {/* Dropdown Toggle Trigger Button */}
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className={`w-full h-12 bg-white border rounded-xl pl-10 pr-10 text-[14px] text-left transition-all cursor-pointer shadow-2xs flex items-center justify-between relative ${
                    isDropdownOpen
                      ? 'border-[#1E5FA8] ring-2 ring-[#1E5FA8]/15'
                      : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="listbox"
                >
                  <Layers className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <span
                    className={`truncate ${
                      formData.product ? 'text-slate-800 font-medium' : 'text-slate-400'
                    }`}
                  >
                    {formData.product || 'Select Product Enquiry'}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 transition-transform duration-200 stroke-[2] ${
                      isDropdownOpen ? 'rotate-180 text-[#1E5FA8]' : ''
                    }`}
                  />
                </button>

                {/* Searchable Combobox Popover */}
                {isDropdownOpen && (
                  <div
                    data-lenis-prevent
                    className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-[0_16px_36px_rgba(15,23,42,0.12)] z-50 overflow-hidden animate-in fade-in duration-150"
                    style={{ backgroundColor: '#ffffff' }}
                  >
                    {/* Live Search Bar */}
                    <div className="p-2 border-b border-slate-100 bg-slate-50/80 sticky top-0 z-10">
                      <div className="relative flex items-center">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search fabric or choose Custom..."
                          className="w-full h-9 pl-9 pr-8 text-[13px] bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1E5FA8] focus:ring-1 focus:ring-[#1E5FA8] transition-all"
                        />
                        {searchTerm && (
                          <button
                            type="button"
                            onClick={() => setSearchTerm('')}
                            className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors cursor-pointer"
                            title="Clear search"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Scrollable Options List - Scroll isolated from main screen */}
                    <div
                      data-lenis-prevent
                      onWheel={(e) => e.stopPropagation()}
                      className="max-h-[260px] overflow-y-auto p-1.5 overscroll-contain"
                      style={{ overscrollBehavior: 'contain', touchAction: 'pan-y' }}
                    >
                      {/* Typed Custom Option (if typed text does not match any existing fabric) */}
                      {cleanSearch && !isExactFabricMatch && cleanSearch !== 'custom' && (
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, product: searchTerm.trim() }));
                            setIsDropdownOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left bg-blue-50/70 hover:bg-blue-100/80 text-[#1E5FA8] font-medium transition-colors cursor-pointer mb-1"
                        >
                          <span className="text-[13.5px] truncate">Custom: &quot;{searchTerm.trim()}&quot;</span>
                          <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-2 text-[#1E5FA8]" />
                        </button>
                      )}

                      {/* Filtered Fabric Names: Only Name, No Images, No Subtitles */}
                      {filteredCatalogFabrics.map((fabric) => {
                        const title = fabric.name || fabric.title;
                        const isSelected = formData.product === title;
                        return (
                          <button
                            key={fabric.id || fabric.slug}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, product: title }));
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#1E5FA8]/10 text-[#1E5FA8] font-semibold'
                                : 'hover:bg-slate-50 text-slate-700 font-normal'
                            }`}
                          >
                            <span className="text-[13.5px] truncate">{title}</span>
                            {isSelected && (
                              <Check className="w-4 h-4 text-[#1E5FA8] shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}

                      {/* Single "Custom" Option */}
                      {showCustomOption && (
                        <div className={filteredCatalogFabrics.length > 0 ? "pt-1 mt-1 border-t border-slate-100" : ""}>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, product: 'Custom' }));
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                              formData.product === 'Custom'
                                ? 'bg-[#1E5FA8]/10 text-[#1E5FA8] font-semibold'
                                : 'hover:bg-slate-50 text-slate-700 font-normal'
                            }`}
                          >
                            <span className="text-[13.5px]">Custom</span>
                            {formData.product === 'Custom' && (
                              <Check className="w-4 h-4 text-[#1E5FA8] shrink-0 ml-2" />
                            )}
                          </button>
                        </div>
                      )}

                      {/* Empty State */}
                      {filteredCatalogFabrics.length === 0 && !showCustomOption && !cleanSearch && (
                        <div className="py-4 text-center text-slate-400 text-[13px]">
                          No qualities found.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Row 3: Describe requirement in detail */}
      <div className="space-y-2">
        <label className="block text-[12.5px] font-semibold text-slate-800 tracking-wide">
          Describe your requirement in detail <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <textarea
            required
            rows={4}
            maxLength={500}
            placeholder="e.g. Fabric type, GSM, width, quantity, color, weave structure, application, etc."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full min-h-[110px] bg-white border border-slate-200/90 rounded-xl pl-10 pr-4 pt-3 pb-8 text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1E5FA8] focus:ring-2 focus:ring-[#1E5FA8]/15 resize-none transition-all leading-relaxed"
          />
          <span className="absolute bottom-2.5 right-3.5 text-[11px] text-slate-400 font-mono select-none">
            {formData.message.length} / 500
          </span>
        </div>
      </div>

      {/* Row 4: Security Verification & Haute-Couture Submit Action */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        
        {/* Verification Component */}
        <div className="flex items-center">
          {useGoogleRecaptcha ? (
            <div ref={recaptchaContainerRef} id="google-recaptcha-box" className="overflow-hidden min-h-[78px]" />
          ) : (
            /* Clean, Reliable Human Verification Box (No ugly "Testing Purposes Only" red banner) */
            <label
              htmlFor="human-verification-checkbox"
              className="inline-flex items-center gap-3.5 px-4 py-2.5 bg-slate-50/90 hover:bg-slate-100/90 border border-slate-200 rounded-xl cursor-pointer transition-all select-none shadow-xs group"
            >
              <input
                type="checkbox"
                id="human-verification-checkbox"
                checked={humanVerified}
                onChange={(e) => {
                  setHumanVerified(e.target.checked);
                  if (e.target.checked) setErrorMsg('');
                }}
                className="w-5 h-5 rounded border-slate-300 accent-[#0E3B68] cursor-pointer"
              />
              <span className="text-[13px] font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                I am a human
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-600 stroke-[2] ml-0.5" />
            </label>
          )}
        </div>

        {/* Haute-Couture Submit Button with Luminous Shine Sweep & Angled Cut */}
        <button
          type="submit"
          disabled={loading}
          className="relative inline-flex items-center justify-center gap-2.5 h-12 pl-7 pr-9 text-[13.5px] font-semibold text-white bg-gradient-to-r from-[#0C2D50] via-[#0E3B68] to-[#164E87] hover:from-[#081F38] hover:via-[#0A2E52] hover:to-[#0F3B66] active:scale-[0.98] transition-all duration-300 shadow-[0_6px_20px_rgba(14,59,104,0.35)] hover:shadow-[0_8px_26px_rgba(14,59,104,0.5)] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group overflow-hidden"
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

          <span className="relative z-10 flex items-center gap-2.5">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transmitting...</span>
              </>
            ) : (
              <>
                <span className="tracking-wide font-medium">Submit Enquiry</span>
                <ArrowRight className="w-4 h-4 stroke-[2.2] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
              </>
            )}
          </span>
        </button>

      </div>

    </form>
  );
}

export default function EnquiryPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);

  // Agnes Toth aesthetic unblur and float-in entrance for Enquiry page
  useEffect(() => {
    let ctx: gsap.Context | null = null;
    ctx = gsap.context(() => {
      // 1. Editorial Header Entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, filter: 'blur(14px)', y: 22 },
          { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.0, delay: 0.2, ease: 'power2.out', clearProps: 'transform,filter' }
        );
      }

      // 2. Form Container Entrance
      if (formWrapRef.current) {
        gsap.fromTo(
          formWrapRef.current,
          { opacity: 0, filter: 'blur(16px)', y: 26, scale: 0.98 },
          { opacity: 1, filter: 'blur(0px)', y: 0, scale: 1, duration: 1.1, delay: 0.35, ease: 'power2.out', clearProps: 'transform,filter' }
        );
      }
    }, sectionRef);

    return () => ctx?.revert();
  }, []);

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      
      {/* =====================================================================
          LUXURY SILK CANVAS BODY & DIRECT CONSULTATION DESK
         ===================================================================== */}
      <section ref={sectionRef} className="relative min-h-screen overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24">
        
        {/* Authentic Silk Waves Background Canvas (Blue Drape at Bottom-Left, Ivory Drape at Top-Right) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/enquiry-silk-bg.jpg"
            alt="Viral Fabrics Sourcing & Sampling Silk Canvas"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-95"
            priority
          />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] xl:max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12">
          
          {/* Centered Editorial Header */}
          <div ref={headerRef} className="text-center max-w-2xl mx-auto space-y-2.5 mb-8 sm:mb-10 will-change-[transform,opacity,filter]">
            <div className="inline-flex items-center gap-2 justify-center">
              <div className="w-6 h-[1.5px] bg-[#1E5FA8]" />
              <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.24em] uppercase text-[#1E5FA8]">
                DIRECT MILL CONSULTATION &amp; SAMPLING
              </span>
              <div className="w-6 h-[1.5px] bg-[#1E5FA8]" />
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-normal text-slate-900 tracking-tight leading-[1.15]">
              Enquiry &amp; <span className="text-[#1E5FA8] italic font-normal">Sampling</span>
            </h2>

            <p className="font-sans text-[13.5px] sm:text-[14.5px] text-slate-600 font-normal leading-relaxed max-w-xl mx-auto">
              Share your fabric requirements and our sourcing team will get back to you within 24 business hours.
            </p>
          </div>

          {/* Centered Form Container (Middle of Page) */}
          <div ref={formWrapRef} className="max-w-2xl sm:max-w-[760px] mx-auto will-change-[transform,opacity,filter]">
            <Suspense
              fallback={
                <div className="bg-white/95 rounded-[28px] p-12 text-center text-slate-400">
                  Loading enquiry form...
                </div>
              }
            >
              <EnquiryForm />
            </Suspense>
          </div>

        </div>
      </section>

    </main>
  );
}
