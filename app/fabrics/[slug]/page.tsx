import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getFabricBySlug, getPublishedFabrics } from '@/lib/fabricsService';
import { FabricDetailClient } from '@/components/FabricDetailClient';

export const revalidate = 10; // Incremental Static Regeneration every 10s
export const dynamicParams = true; // Allow new fabrics created dynamically to render

export async function generateStaticParams() {
  const fabrics = await getPublishedFabrics();
  return fabrics.map((fabric) => ({
    slug: fabric.slug,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const fabric = await getFabricBySlug(slug);
  
  if (!fabric) {
    return { title: 'Fabric Not Found - Viral Fabrics' };
  }

  const title = `${fabric.name} | Viral Fabrics Surat`;
  const description = fabric.description.slice(0, 160);
  const fullImageUrl = fabric.image.startsWith('http')
    ? fabric.image
    : `https://viralfabrics.com${fabric.image.startsWith('/') ? '' : '/'}${fabric.image}`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://viralfabrics.com/fabrics/${fabric.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://viralfabrics.com/fabrics/${fabric.slug}`,
      siteName: 'Viral Fabrics',
      images: [
        {
          url: fullImageUrl,
          width: 800,
          height: 600,
          alt: fabric.name,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
    },
  };
}

export default async function FabricDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const fabric = await getFabricBySlug(slug);

  if (!fabric) {
    notFound();
  }

  const jsonLdImageUrl = fabric.image.startsWith('http')
    ? fabric.image
    : `https://viralfabrics.com${fabric.image.startsWith('/') ? '' : '/'}${fabric.image}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `https://viralfabrics.com/fabrics/${fabric.slug}#product`,
        name: fabric.name,
        description: fabric.description,
        image: jsonLdImageUrl,
        brand: {
          '@type': 'Brand',
          name: 'Viral Fabrics',
        },
        manufacturer: {
          '@type': 'Organization',
          name: 'Viral Fabrics Pvt. Ltd.',
          url: 'https://viralfabrics.com',
        },
        category: 'Textiles & Export Fabrics',
        material: fabric.weaveType || 'Polyester Synthetic Weave',
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'Organization',
            name: 'Viral Fabrics Pvt. Ltd.',
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://viralfabrics.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Fabrics Portfolio',
            item: 'https://viralfabrics.com/fabrics',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: fabric.name,
            item: `https://viralfabrics.com/fabrics/${fabric.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Dynamic Single Fabric Quality Showcase (No Redundant Banner) */}
      <FabricDetailClient fabric={fabric} />
    </div>
  );
}
