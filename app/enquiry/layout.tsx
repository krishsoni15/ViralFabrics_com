import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enquiry & Quotations | Viral Fabrics Surat - Request Fabric Swatches',
  description: 'Submit your make-to-order fabric requirements, request fabric swatches, or enquire about custom dye and print runs from Viral Fabrics in Surat, Gujarat.',
  alternates: {
    canonical: 'https://viralfabrics.com/enquiry',
  },
  openGraph: {
    title: 'Enquiry & Quotations | Viral Fabrics Surat',
    description: 'Request fabric swatches, GSM custom runs, and strike-offs from Viral Fabrics.',
    url: 'https://viralfabrics.com/enquiry',
    siteName: 'Viral Fabrics',
  },
};

export default function EnquiryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

