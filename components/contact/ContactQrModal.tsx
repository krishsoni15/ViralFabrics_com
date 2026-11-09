'use client';

import React from 'react';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Copy,
  Check,
  QrCode,
  X,
} from 'lucide-react';
import { COMPANY_INFO } from '@/data/company';

interface ContactQrModalProps {
  activeQrModal: 'location' | 'phone' | 'email' | null;
  onClose: () => void;
  qrUrls: { location: string; phone: string; email: string };
  copiedField: string | null;
  onCopy: (field: string, text: string) => void;
  fullAddress: string;
}

export const ContactQrModal: React.FC<ContactQrModalProps> = ({
  activeQrModal,
  onClose,
  qrUrls,
  copiedField,
  onCopy,
  fullAddress,
}) => {
  if (!activeQrModal) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 text-center space-y-5 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1665C1]/10 flex items-center justify-center text-[#1665C1]">
              {activeQrModal === 'location' && <MapPin className="w-4 h-4" />}
              {activeQrModal === 'phone' && <Phone className="w-4 h-4" />}
              {activeQrModal === 'email' && <Mail className="w-4 h-4" />}
            </div>
            <span className="font-heading font-serif text-lg font-bold text-[#113259]">
              {activeQrModal === 'location' && 'Surat Mill Location QR'}
              {activeQrModal === 'phone' && 'Sales & WhatsApp QR'}
              {activeQrModal === 'email' && 'Official Email QR'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close QR Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Display Canvas */}
        <div className="relative w-64 h-64 mx-auto p-4 bg-white rounded-2xl border-2 border-slate-200/80 shadow-inner flex items-center justify-center">
          {qrUrls[activeQrModal] ? (
            <div className="relative w-full h-full">
              <Image
                src={qrUrls[activeQrModal]}
                alt={`Viral Fabrics ${activeQrModal} QR code`}
                fill
                className="object-contain"
              />
              {/* Central Branded Seal with Official Emblem */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-xl bg-white p-1.5 shadow-md border-2 border-[#1665C1]/30 flex items-center justify-center">
                  <Image
                    src="/assets/brand/viral-mark.png"
                    alt="Viral Fabrics Emblem"
                    width={26}
                    height={26}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
              <QrCode className="w-8 h-8 animate-spin" />
              <span className="text-xs">Generating QR...</span>
            </div>
          )}
        </div>

        {/* Detail Explanation & Direct Actions */}
        <div className="space-y-3 text-left bg-slate-50 p-4 rounded-2xl border border-slate-100">
          {activeQrModal === 'location' && (
            <div>
              <p className="font-sans text-[12.5px] font-bold text-[#113259]">
                Surat Mill Turn-by-Turn Navigation
              </p>
              <p className="font-sans text-[11.5px] text-slate-600 leading-relaxed mt-0.5">
                Krishna Industrial Society, Bamroli, Pandesara, Surat. Launches directly in Google Maps.
              </p>
              <div className="flex items-center gap-2 pt-3">
                <a
                  href={COMPANY_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#113259] text-white text-[11.5px] font-semibold hover:bg-[#0C2544] transition-colors"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  type="button"
                  onClick={() => onCopy('modal-address', fullAddress)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11.5px] font-medium hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {copiedField === 'modal-address' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedField === 'modal-address' ? 'Copied' : 'Copy Address'}</span>
                </button>
              </div>
            </div>
          )}

          {activeQrModal === 'phone' && (
            <div>
              <p className="font-sans text-[12.5px] font-bold text-[#113259]">
                Commercial Sales &amp; WhatsApp Desk
              </p>
              <p className="font-sans text-[11.5px] text-slate-600 leading-relaxed mt-0.5">
                +91 94279 88999 &bull; Scans directly into WhatsApp chat with Viral Fabrics export team.
              </p>
              <div className="flex items-center gap-2 pt-3">
                <a
                  href={`tel:${COMPANY_INFO.phoneTel}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#113259] text-white text-[11.5px] font-semibold hover:bg-[#0C2544] transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call Now</span>
                </a>
                <a
                  href="https://wa.me/919427988999?text=Hello%20Viral%20Fabrics%2C%20I%20would%20like%20to%20inquire%20about%20export%20fabrics."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-[11.5px] font-semibold hover:bg-[#1EBE5D] transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white" aria-hidden="true">
                    <path d="M17.472 14.382c-.301-.15-1.777-.877-2.052-.977-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.413-1.488-.893-.796-1.496-1.78-1.671-2.08-.175-.3-.019-.462.131-.611.135-.134.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.585-.492-.505-.675-.515-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375s-1.05 1.025-1.05 2.5 1.075 2.9 1.225 3.1c.15.2 2.117 3.233 5.129 4.534.716.31 1.275.495 1.71.634.72.23 1.375.197 1.893.12.578-.087 1.777-.726 2.027-1.426.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35zm-5.465 7.618h-.006a9.97 9.97 0 01-5.083-1.39l-.364-.216-3.778.99.99-3.68-.236-.375A9.97 9.97 0 012.015 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm0-22C5.383 0 0 5.383 0 12c0 2.112.553 4.18 1.603 6.008L0 24l6.166-1.564A11.954 11.954 0 0012.007 24C18.625 24 24 18.617 24 12 24 5.383 18.625 0 12.007 0z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => onCopy('modal-phone', '91-9427988999')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11.5px] font-medium hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {copiedField === 'modal-phone' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedField === 'modal-phone' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          )}

          {activeQrModal === 'email' && (
            <div>
              <p className="font-sans text-[12.5px] font-bold text-[#113259]">
                Corporate Email Correspondence
              </p>
              <p className="font-sans text-[11.5px] text-slate-600 leading-relaxed mt-0.5">
                viralfabrics@yahoo.com &bull; Scans directly into your mobile mail app ready to send.
              </p>
              <div className="flex items-center gap-2 pt-3">
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#113259] text-white text-[11.5px] font-semibold hover:bg-[#0C2544] transition-colors"
                >
                  <Mail className="w-3 h-3" />
                  <span>Compose Mail</span>
                </a>
                <button
                  type="button"
                  onClick={() => onCopy('modal-email', COMPANY_INFO.email)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11.5px] font-medium hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {copiedField === 'modal-email' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedField === 'modal-email' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
