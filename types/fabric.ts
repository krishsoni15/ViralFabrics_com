/**
 * Domain types for Fabric items and catalog representations.
 */

export interface FabricItem {
  slug: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  description: string;
  gsmRange: string;
  applications: string[];
  image: string;
  images?: string[];
  banner: string;
  features: string[];
  weaveType: string;
  finishing: string[];
  showInCatalog?: boolean;
  showInMenu?: boolean;
  showOnHomepage?: boolean;
  showInEnquiry?: boolean;
  menuOrder?: number;
}

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
  images?: string[];
  banner: string;
  isPublished: boolean;
  showInCatalog?: boolean;
  showInMenu?: boolean;
  showOnHomepage?: boolean;
  showInEnquiry?: boolean;
  displayOrder: number;
  menuOrder?: number;
}
