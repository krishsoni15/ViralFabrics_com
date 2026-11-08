import React from 'react';
import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Surat Facility | Viral Fabrics Surat - Manufacturing Plant & Sales',
  description: 'Contact Viral Fabrics Pvt. Ltd. at Krishna Industrial Society, Bamroli, Surat. Direct Phone: +91 94279 88999, Email: viralfabrics@yahoo.com.',
};

export default function ContactPage() {
  return <ContactClient />;
}
