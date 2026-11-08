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

// Fabric product categories
const FABRIC_OPTIONS = [
  'Polyester Dobby / Jacquard Fabrics',
  'BSY Fabrics (Bi-Shrinkage Yarn)',
  'Crepe Fabrics (Heavy Crepe, Moss Crepe)',
  'Recycled Fabrics (Eco PET Certified)',
  'Satin Fabrics (Silk Finish & Micro Satin)',
  'Chiffon Fabrics',
  'Georgette Fabrics',
  'Viscose & Rayon Fabrics',
  'Poly Knit Fabrics',
  'Net & Mesh Fabrics',
  'Custom Make-to-Order Weave',
];

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

function EnquiryForm() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams ? searchParams.get('product') || '' : '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    message: ''
  });

  const [captchaToken, setCaptchaToken] = useState('');
  const [humanVerified, setHumanVerified] = useState(false);
  const [useGoogleRecaptcha, setUseGoogleRecaptcha] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const widgetIdRef = useRef<number | null>(null);
  const recaptchaContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-fill product from URL query params
  useEffect(() => {
    if (initialProduct) {
      const matched =
        FABRIC_OPTIONS.find((opt) => opt.toLowerCase().includes(initialProduct.toLowerCase())) ||
        initialProduct;
      setFormData((prev) => ({ ...prev, product: matched }));
    }
  }, [initialProduct]);

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
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          captchaToken: token || 'verified-human'
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', product: '', message: '' });
      setCaptchaToken('');
      setHumanVerified(false);
      if (window.grecaptcha && widgetIdRef.current !== null) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    } catch (err: any) {
      setErrorMsg(
        err.message || 'Error transmitting your request. Please call our Surat mill desk directly.'
      );
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-[13.5px] font-semibold text-white bg-[#0E3B68] hover:bg-[#0A2E52] transition-colors cursor-pointer shadow-md"
          >
            Submit Another Enquiry
            <ArrowRight className="w-4 h-4 stroke-[2]" />
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
          <label className="block text-[12.5px] font-semibold text-slate-800 tracking-wide">
            Product Enquiry <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Layers className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              required
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              className="w-full h-12 bg-white border border-slate-200/90 rounded-xl pl-10 pr-10 text-[14px] text-slate-800 appearance-none focus:outline-none focus:border-[#1E5FA8] focus:ring-2 focus:ring-[#1E5FA8]/15 transition-all cursor-pointer"
            >
              <option value="" disabled className="text-slate-400">
                Select Product Enquiry
              </option>
              {FABRIC_OPTIONS.map((fabric) => (
                <option key={fabric} value={fabric} className="text-slate-800 py-1.5">
                  {fabric}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2]" />
          </div>
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
            clipPath: 'polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
          }}
        >
          {/* Razor-Sharp 1px Border Overlay Following Angled Cut */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <line x1="100%" y1="0" x2="calc(100% - 12px)" y2="100%" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
            <line x1="calc(100% - 12px)" y1="calc(100% - 0.5px)" x2="0" y2="calc(100% - 0.5px)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <line x1="0.5" y1="100%" x2="0.5" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
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
  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      
      {/* =====================================================================
          1. TOP BANNER WITH FABRIC ROLLS & TRUST BADGES (Matching Reference)
         ===================================================================== */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 flex items-center overflow-hidden bg-[#0A192F]">
        
        {/* Banner Graphic: Stacked folded luxury fabrics on right, deep navy silk on left */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/enquiry/enquiry-hero-bg.jpg"
            alt="Viral Fabrics Sourcing & Sampling Desk"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Subtle top scrim for crystal-clear contrast of transparent navbar links */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#061426]/75 via-[#061426]/20 to-transparent pointer-events-none" />
        </div>

        {/* Content Aligned with Main Container */}
        <div className="relative z-10 w-full max-w-[1440px] xl:max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl text-white">
            
            {/* Title with Vertical Blue Accent Bar */}
            <div className="flex items-start gap-3 sm:gap-3.5">
              <div className="w-[3.5px] sm:w-1 h-9 sm:h-11 bg-[#0084D1] rounded-full flex-shrink-0 mt-0.5 shadow-[0_0_10px_rgba(0,132,209,0.7)]" />
              <div className="space-y-0.5 sm:space-y-1">
                <h1 className="font-heading font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-white tracking-tight leading-none drop-shadow-sm">
                  Enquiry
                </h1>
                <p className="font-sans text-[12.5px] sm:text-[13.5px] text-white/90 font-light tracking-wide drop-shadow-sm">
                  From Around The Fabrics World
                </p>
              </div>
            </div>

            {/* 3 Trust Badges with Dividers */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 sm:mt-5 text-[11.5px] sm:text-[12.5px] font-sans font-medium text-white/90">
              <div className="flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-white stroke-[2.2]" />
                <span>Quick Response</span>
              </div>
              <span className="text-white/30 select-none text-xs">|</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-white stroke-[2.2]" />
                <span>Confidential Discussion</span>
              </div>
              <span className="text-white/30 select-none text-xs">|</span>
              <div className="flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-white stroke-[2.2]" />
                <span>Expert Support</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* =====================================================================
          2. MINIMALIST BREADCRUMBS BAR (Home > Enquiry)
         ===================================================================== */}
      <div className="bg-white border-b border-slate-200/70 py-2 sm:py-2.5 shadow-sm">
        <div className="max-w-[1440px] xl:max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 text-left">
          <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1.5 sm:gap-2 text-[12px] sm:text-[12.5px] font-sans">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-[#006DB6] hover:text-brand-blue-hover transition-colors font-medium tracking-wide"
            >
              <Home className="w-3.5 h-3.5 fill-[#006DB6] text-[#006DB6]" />
              <span>Home</span>
            </Link>
            <span className="text-slate-400 select-none text-[11px]">&gt;</span>
            <span className="text-[#006DB6] font-medium tracking-wide" aria-current="page">
              Enquiry
            </span>
          </nav>
        </div>
      </div>

      {/* =====================================================================
          3. LUXURY SILK CANVAS BODY (Centered Form in Middle)
         ===================================================================== */}
      <section className="relative min-h-[calc(100vh-360px)] overflow-hidden py-12 sm:py-16 lg:py-20">
        
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
          <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-8 sm:mb-10">
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
          <div className="max-w-2xl sm:max-w-[760px] mx-auto">
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
