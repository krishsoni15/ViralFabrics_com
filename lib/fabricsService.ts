import { connectDB } from './mongodb';
import WebsiteFabric from '@/models/WebsiteFabric';
import { FABRICS } from '@/data/fabrics';
import type { LiveFabric } from '@/types';

export type { LiveFabric };

function cleanDescription(desc: string): string {
  return (desc || '')
    .replace(/\.h+$/i, '.')
    .replace(/[hH]{3,}$/g, '')
    .trim();
}

interface FabricDocumentLike {
  _id?: unknown;
  id?: string;
  name?: string;
  title?: string;
  slug: string;
  subtitle?: string;
  shortDesc?: string;
  description?: string;
  gsmRange?: string;
  applications?: string[];
  features?: string[];
  weaveType?: string;
  finishing?: string[];
  image?: string;
  images?: string[];
  banner?: string;
  isPublished?: boolean;
  showInCatalog?: boolean;
  showInMenu?: boolean;
  showOnHomepage?: boolean;
  showInEnquiry?: boolean;
  displayOrder?: number;
  menuOrder?: number;
}

function mapToLiveFabric(doc: FabricDocumentLike): LiveFabric {
  const staticFound = FABRICS.find((f) => f.slug === doc.slug);
  return {
    id: doc._id ? String(doc._id) : (doc.id || doc.slug),
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
    images: (doc.images && doc.images.length > 0)
      ? doc.images
      : (doc.image ? [doc.image] : (staticFound?.image ? [staticFound.image] : ['/assets/uploads/2025/09/bsy-fabrics.png'])),
    banner: doc.banner || staticFound?.banner || '/assets/uploads/2025/09/bsy-fabrics-banner.png',
    isPublished: doc.isPublished !== undefined ? doc.isPublished : true,
    showInCatalog: doc.showInCatalog !== undefined ? doc.showInCatalog : true,
    showInMenu: doc.showInMenu !== undefined ? doc.showInMenu : true,
    showOnHomepage: doc.showOnHomepage !== undefined ? doc.showOnHomepage : true,
    showInEnquiry: doc.showInEnquiry !== undefined ? doc.showInEnquiry : true,
    displayOrder: doc.displayOrder || 0,
    menuOrder: doc.menuOrder || 0,
  };
}

function sortFabricsBySequence<T extends FabricDocumentLike>(docs: T[]): T[] {
  return [...docs].sort((a, b) => {
    // If menuOrder is defined and > 0, it takes highest precedence, then displayOrder
    const orderA = (typeof a.menuOrder === 'number' && a.menuOrder > 0)
      ? a.menuOrder
      : ((typeof a.displayOrder === 'number' && a.displayOrder > 0) ? a.displayOrder : 9999);
    const orderB = (typeof b.menuOrder === 'number' && b.menuOrder > 0)
      ? b.menuOrder
      : ((typeof b.displayOrder === 'number' && b.displayOrder > 0) ? b.displayOrder : 9999);

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    const dateA = (a as any).createdAt ? new Date((a as any).createdAt).getTime() : 0;
    const dateB = (b as any).createdAt ? new Date((b as any).createdAt).getTime() : 0;
    return dateB - dateA;
  });
}

/**
 * Fetch all published fabrics from MongoDB Atlas with fallback
 */
export async function getPublishedFabrics(): Promise<LiveFabric[]> {
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const docs = await WebsiteFabric.find({ isPublished: true })
        .sort({ menuOrder: 1, displayOrder: 1, createdAt: -1 })
        .lean();

      if (docs && docs.length > 0) {
        return sortFabricsBySequence(docs).map(mapToLiveFabric);
      }
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
    images: [f.image],
    banner: f.banner,
    isPublished: true,
    showInCatalog: true,
    showInMenu: true,
    showOnHomepage: true,
    showInEnquiry: true,
    displayOrder: i + 1,
    menuOrder: i + 1,
  }));
}

/**
 * Fetch fabrics for main catalog directory (/fabrics)
 */
export async function getCatalogFabrics(): Promise<LiveFabric[]> {
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const docs = await WebsiteFabric.find({
        isPublished: true,
        showInCatalog: { $ne: false },
      })
        .sort({ menuOrder: 1, displayOrder: 1, createdAt: -1 })
        .lean();

      if (docs && docs.length > 0) {
        return sortFabricsBySequence(docs).map(mapToLiveFabric);
      }
    }
  } catch (error) {
    console.warn('[Fabrics Service] Catalog query failed, falling back to published fabrics:', error);
  }

  const all = await getPublishedFabrics();
  return all.filter((f) => f.showInCatalog !== false);
}

/**
 * Fetch fabrics designated for navbar & footer menu dropdown with fallback
 */
export async function getMenuFabrics(): Promise<LiveFabric[]> {
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const docs = await WebsiteFabric.find({ 
        isPublished: true, 
        showInMenu: { $ne: false } 
      })
        .sort({ menuOrder: 1, displayOrder: 1, createdAt: -1 })
        .lean();

      if (docs && docs.length > 0) {
        return sortFabricsBySequence(docs).map(mapToLiveFabric);
      }
    }
  } catch (error) {
    console.warn('[Fabrics Service] Menu MongoDB query failed, falling back to published fabrics:', error);
  }

  const all = await getPublishedFabrics();
  return all.filter((f) => f.showInMenu !== false);
}

/**
 * Fetch fabrics for homepage portfolio section
 */
export async function getHomepageFabrics(): Promise<LiveFabric[]> {
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const docs = await WebsiteFabric.find({ 
        isPublished: true, 
        showOnHomepage: { $ne: false } 
      })
        .sort({ menuOrder: 1, displayOrder: 1, createdAt: -1 })
        .lean();

      if (docs && docs.length > 0) {
        return sortFabricsBySequence(docs).map(mapToLiveFabric);
      }
    }
  } catch (error) {
    console.warn('[Fabrics Service] Homepage query failed, falling back to published fabrics:', error);
  }

  const all = await getPublishedFabrics();
  return all.filter((f) => f.showOnHomepage !== false);
}

/**
 * Fetch fabrics for enquiry form dropdown
 */
export async function getEnquiryFabrics(): Promise<LiveFabric[]> {
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const docs = await WebsiteFabric.find({ 
        isPublished: true, 
        showInEnquiry: { $ne: false } 
      })
        .sort({ menuOrder: 1, displayOrder: 1, createdAt: -1 })
        .lean();

      if (docs && docs.length > 0) {
        return sortFabricsBySequence(docs).map(mapToLiveFabric);
      }
    }
  } catch (error) {
    console.warn('[Fabrics Service] Enquiry query failed, falling back to published fabrics:', error);
  }

  const all = await getPublishedFabrics();
  return all.filter((f) => f.showInEnquiry !== false);
}

/**
 * Fetch a single fabric by its slug
 */
export async function getFabricBySlug(slug: string): Promise<LiveFabric | null> {
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const doc = await WebsiteFabric.findOne({ slug, isPublished: true }).lean();
      if (doc) {
        return mapToLiveFabric(doc);
      }
    }
  } catch (error) {
    console.warn(`[Fabrics Service] Error fetching slug "${slug}":`, error);
  }

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
      showInCatalog: true,
      showInMenu: true,
      showOnHomepage: true,
      showInEnquiry: true,
      displayOrder: 1,
      menuOrder: 1,
    };
  }

  return null;
}
