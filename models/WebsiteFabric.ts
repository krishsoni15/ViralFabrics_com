import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWebsiteFabric extends Document {
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  image: string;
  banner?: string;
  isPublished: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const WebsiteFabricSchema = new Schema<IWebsiteFabric>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    subtitle: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    banner: { type: String, default: '/assets/uploads/2025/09/bsy-fabrics-banner.png' },
    isPublished: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const modelName = 'WebsiteFabric';
const WebsiteFabric: Model<IWebsiteFabric> =
  mongoose.models[modelName] ||
  mongoose.model<IWebsiteFabric>(modelName, WebsiteFabricSchema);

export default WebsiteFabric;
