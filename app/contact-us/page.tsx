import React from 'react';
import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Surat Facility | Viral Fabrics Surat - Manufacturing Plant & Sales',
  description: 'Contact Viral Fabrics Pvt. Ltd. at Krishna Industrial Society, Bamroli, Surat. Direct Phone: +91 94279 88999, Email: viralfabrics@yahoo.com.',
  alternates: {
    canonical: 'https://viralfabrics.com/contact-us',
  },
  openGraph: {
    title: 'Contact Surat Facility | Viral Fabrics Surat',
    description: 'Direct Surat Mill Desk: +91 94279 88999, viralfabrics@yahoo.com.',
    url: 'https://viralfabrics.com/contact-us',
    siteName: 'Viral Fabrics',
    images: [
      {
        url: '/assets/brand/logo.png',
        width: 600,
        height: 315,
        alt: 'Viral Fabrics Contact',
      },
    ],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
