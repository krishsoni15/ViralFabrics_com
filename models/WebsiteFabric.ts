import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWebsiteFabric extends Document {
  name: string;
  slug: string;
  subtitle?: string;
  description: string;
  image: string;
  images?: string[];
  banner?: string;
  isPublished: boolean;     // Master Web Switch
  showInCatalog: boolean;   // 1. Fabrics Page (/fabrics)
  showInMenu: boolean;      // 2. Navbar, Mobile Sidebar & Footer Menu
  showOnHomepage: boolean;  // 3. Homepage Portfolio Showcase
  showInEnquiry: boolean;   // 4. Enquiry Form Dropdown
  displayOrder: number;
  menuOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const WebsiteFabricSchema = new Schema<IWebsiteFabric>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    subtitle: { type: String, default: '', trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    images: { type: [String], default: [] },
    banner: { type: String, default: '/assets/uploads/2025/09/bsy-fabrics-banner.png' },
    isPublished: { type: Boolean, default: true, index: true },
    showInCatalog: { type: Boolean, default: true, index: true },
    showInMenu: { type: Boolean, default: true, index: true },
    showOnHomepage: { type: Boolean, default: true, index: true },
    showInEnquiry: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 0 },
    menuOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const modelName = 'WebsiteFabric';
if (process.env.NODE_ENV !== 'production' && mongoose.models[modelName]) {
  delete (mongoose.models as any)[modelName];
}
const WebsiteFabric: Model<IWebsiteFabric> =
  mongoose.models[modelName] ||
  mongoose.model<IWebsiteFabric>(modelName, WebsiteFabricSchema);

export default WebsiteFabric;
