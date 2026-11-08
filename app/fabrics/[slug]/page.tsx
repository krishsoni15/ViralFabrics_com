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
          url: fabric.image,
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
      images: [fabric.image],
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

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Single Fabric Quality Showcase (No Redundant Banner) */}
      <FabricDetailClient fabric={fabric} />
    </div>
  );
}
