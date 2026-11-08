import { MetadataRoute } from 'next';
import { FABRICS } from '@/data/fabrics';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://viralfabrics.com';
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fabrics`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/enquiry`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/network`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const fabricRoutes: MetadataRoute.Sitemap = FABRICS.map((fabric) => ({
    url: `${baseUrl}/fabrics/${fabric.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...fabricRoutes];
}

