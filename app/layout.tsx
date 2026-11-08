import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans, Poppins, Roboto_Slab } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

// Fallback aliases for backward-compatibility
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://viralfabrics.com'),
  title: {
    default: 'Viral Fabrics | Haute Synthetic Textile Manufacturer Surat',
    template: '%s - Viral Fabrics',
  },
  description: 'Viral Fabrics Surat - Premier Manufacturer and Supplier of Export-Grade Fabrics in Surat, Gujarat. Specialist in BSY, Poly Dobby, Satin, Chiffon, Georgette, Crepe, Recycled, and Viscose fabrics on Make-To-Order basis.',
  keywords: [
    'Viral Fabrics',
    'Fabric Manufacturer Surat',
    'BSY Fabrics',
    'Polyester Dyed Fabrics',
    'Digital Printed Fabrics',
    'Georgette Fabrics',
    'Chiffon Fabrics',
    'Satin Fabrics',
    'Surat Textile Export',
    'Water-jet Looms Surat'
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/assets/brand/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/brand/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/brand/favicon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'Viral Fabrics - Manufacturer and Supplier of Export Fabrics',
    description: 'Specialist In Polyester Dyed & Printed Fabrics On Make-To-Order Basis. 6 Lac Meters / Month capacity in Surat, India.',
    url: 'https://viralfabrics.com',
    siteName: 'Viral Fabrics',
    images: [
      {
        url: '/assets/brand/favicon-180x180.png',
        width: 180,
        height: 180,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={`${cormorant.variable} ${jakarta.variable} ${poppins.variable} ${robotoSlab.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/brand/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/assets/brand/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/brand/favicon-180x180.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://viralfabrics.com/#organization',
                  name: 'Viral Fabrics',
                  legalName: 'Viral Fabrics Pvt. Ltd.',
                  url: 'https://viralfabrics.com',
                  logo: 'https://viralfabrics.com/assets/brand/logo.png',
                  founder: {
                    '@type': 'Person',
                    name: 'Viral A. Patel',
                  },
                  foundingDate: '2012',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Plot No. 12, Krishna Industrial Society, Near Bamroli Cross Road, Pandesara',
                    addressLocality: 'Surat',
                    addressRegion: 'Gujarat',
                    postalCode: '394221',
                    addressCountry: 'IN',
                  },
                  contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+91-94279-88999',
                    contactType: 'sales',
                    email: 'viralfabrics@yahoo.com',
                    areaServed: ['IN', 'AE', 'US', 'GB', 'EU'],
                    availableLanguage: ['English', 'Hindi', 'Gujarati'],
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://viralfabrics.com/#website',
                  url: 'https://viralfabrics.com',
                  name: 'Viral Fabrics',
                  description: 'Haute Synthetic Textile Manufacturer Surat',
                  publisher: {
                    '@id': 'https://viralfabrics.com/#organization',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body 
        suppressHydrationWarning 
        className="font-sans antialiased text-[#0F172A] bg-white min-h-screen flex flex-col selection:bg-[#006DB6] selection:text-white"
      >
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
