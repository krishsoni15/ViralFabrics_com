import { connectDB } from './mongodb';
import WebsiteFabric from '@/models/WebsiteFabric';
import { FABRICS, type FabricItem } from '@/data/fabrics';

export interface LiveFabric {
  id: string;
  name: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDesc?: string;
  description: string;
  gsmRange: string;
  applications: string[];
  features: string[];
  weaveType: string;
  finishing: string[];
  image: string;
  banner: string;
  isPublished: boolean;
  displayOrder: number;
}

function cleanDescription(desc: string): string {
  return (desc || '')
    .replace(/\.h+$/i, '.')
    .replace(/[hH]{3,}$/g, '')
    .trim();
}

function mapToLiveFabric(doc: any): LiveFabric {
  const staticFound = FABRICS.find((f) => f.slug === doc.slug);
  return {
    id: doc._id?.toString() || doc.id || doc.slug,
    name: doc.name || doc.title || staticFound?.title || '',
    title: doc.name || doc.title || staticFound?.title || '',
    slug: doc.slug,
    subtitle: doc.subtitle || staticFound?.subtitle || '',
    shortDesc: doc.shortDesc || staticFound?.shortDesc || '',
    description: cleanDescription(doc.description || staticFound?.description || ''),
    gsmRange: doc.gsmRange || staticFound?.gsmRange || '',
    applications: (doc.applications && doc.applications.length > 0) ? doc.applications : (staticFound?.applications || []),
    features: (doc.features && doc.features.length > 0) ? doc.features : (staticFound?.features || []),
    weaveType: doc.weaveType || staticFound?.weaveType || '',
    finishing: (doc.finishing && doc.finishing.length > 0) ? doc.finishing : (staticFound?.finishing || []),
    image: doc.image || staticFound?.image || '/assets/uploads/2025/09/bsy-fabrics.png',
    banner: doc.banner || staticFound?.banner || '/assets/uploads/2025/09/bsy-fabrics-banner.png',
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
    shortDesc: f.shortDesc,
    description: cleanDescription(f.description),
    gsmRange: f.gsmRange,
    applications: f.applications,
    features: f.features,
    weaveType: f.weaveType,
    finishing: f.finishing,
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
      shortDesc: staticFound.shortDesc,
      description: cleanDescription(staticFound.description),
      gsmRange: staticFound.gsmRange,
      applications: staticFound.applications,
      features: staticFound.features,
      weaveType: staticFound.weaveType,
      finishing: staticFound.finishing,
      image: staticFound.image,
      banner: staticFound.banner,
      isPublished: true,
      displayOrder: 1,
    };
  }

  return null;
}
