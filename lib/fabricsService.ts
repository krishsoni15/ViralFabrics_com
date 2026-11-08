import { connectDB } from './mongodb';
import WebsiteFabric from '@/models/WebsiteFabric';
import { FABRICS, type FabricItem } from '@/data/fabrics';

export interface LiveFabric {
  id: string;
  name: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  banner: string;
  isPublished: boolean;
  displayOrder: number;
}

function mapToLiveFabric(doc: any): LiveFabric {
  return {
    id: doc._id?.toString() || doc.id || doc.slug,
    name: doc.name || doc.title,
    title: doc.name || doc.title,
    slug: doc.slug,
    subtitle: doc.subtitle || '',
    description: doc.description || '',
    image: doc.image || '/assets/uploads/2025/09/bsy-fabrics.png',
    banner: doc.banner || '/assets/uploads/2025/09/bsy-fabrics-banner.png',
    isPublished: doc.isPublished !== undefined ? doc.isPublished : true,
    displayOrder: doc.displayOrder || 0,
  };
}

/**
 * Fetch all published fabrics from MongoDB Atlas with fallback
 */
export async function getPublishedFabrics(): Promise<LiveFabric[]> {
  try {
    await connectDB();
    const docs = await WebsiteFabric.find({ isPublished: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();

    if (docs && docs.length > 0) {
      return docs.map(mapToLiveFabric);
    }
  } catch (error) {
    console.warn('[Fabrics Service] MongoDB query failed, falling back to static catalogue:', error);
  }

  // Graceful fallback to static fabrics
  return FABRICS.map((f, i) => ({
    id: f.slug,
    name: f.title,
    title: f.title,
    slug: f.slug,
    subtitle: f.subtitle,
    description: f.description,
    image: f.image,
    banner: f.banner,
    isPublished: true,
    displayOrder: i + 1,
  }));
}

/**
 * Fetch a single fabric by its slug
 */
export async function getFabricBySlug(slug: string): Promise<LiveFabric | null> {
  try {
    await connectDB();
    const doc = await WebsiteFabric.findOne({ slug, isPublished: true }).lean();
    if (doc) {
      return mapToLiveFabric(doc);
    }
  } catch (error) {
    console.warn(`[Fabrics Service] Error fetching slug "${slug}":`, error);
  }

  // Fallback to static catalog
  const staticFound = FABRICS.find((f) => f.slug === slug);
  if (staticFound) {
    return {
      id: staticFound.slug,
      name: staticFound.title,
      title: staticFound.title,
      slug: staticFound.slug,
      subtitle: staticFound.subtitle,
      description: staticFound.description,
      image: staticFound.image,
      banner: staticFound.banner,
      isPublished: true,
      displayOrder: 1,
    };
  }

  return null;
}
