import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enquiry & Quotations | Viral Fabrics Surat - Request Fabric Swatches',
  description: 'Submit your make-to-order fabric requirements, request fabric swatches, or enquire about custom dye and print runs from Viral Fabrics in Surat, Gujarat.',
};

export default function EnquiryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

