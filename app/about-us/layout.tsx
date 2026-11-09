import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Viral Fabrics Surat - Textile Heritage & Infrastructure',
  description: 'Learn about Viral Fabrics, established in 2012 in Surat, Gujarat by Mr. Viral A. Patel. Producing 6 Lac meters/month of water-jet export fabrics with state-of-the-art weaving looms.',
  alternates: {
    canonical: 'https://viralfabrics.com/about-us',
  },
  openGraph: {
    title: 'About Us | Viral Fabrics Surat',
    description: 'Surat export synthetic textile manufacturer with 600,000 meters/month capacity.',
    url: 'https://viralfabrics.com/about-us',
    siteName: 'Viral Fabrics',
    images: [
      {
        url: '/images/about/viral-fabrics-team.jpg',
        width: 1200,
        height: 630,
        alt: 'Viral Fabrics Manufacturing Team in Surat Loom Shed',
      },
    ],
  },
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

