import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global Export Network | Viral Fabrics Surat - Distribution Corridors',
  description: 'Explore the global export corridors of Viral Fabrics from Surat, Gujarat across 5+ continents including the Middle East, Europe, Southeast Asia, and the Americas.',
  alternates: {
    canonical: 'https://viralfabrics.com/network',
  },
  openGraph: {
    title: 'Global Export Network | Viral Fabrics Surat',
    description: 'Exporting synthetic textiles from Surat, Gujarat across 5+ continents.',
    url: 'https://viralfabrics.com/network',
    siteName: 'Viral Fabrics',
    images: [
      {
        url: '/images/network/network-routes-map.png',
        width: 1200,
        height: 630,
        alt: 'Viral Fabrics Global Export Network Map',
      },
    ],
  },
};

export default function NetworkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

