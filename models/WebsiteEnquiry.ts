import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWebsiteEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  product: string;
  message: string;
  status: 'new' | 'connected' | 'contacted' | 'sampling' | 'quoted' | 'closed';
  source?: string;
  clientIp?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const WebsiteEnquirySchema = new Schema<IWebsiteEnquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, required: true, trim: true },
    product: { type: String, required: true, trim: true, index: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['new', 'connected', 'contacted', 'sampling', 'quoted', 'closed'],
      default: 'new',
      index: true,
    },
    source: { type: String, default: 'web-enquiry-form' },
    clientIp: { type: String, default: '' },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

const modelName = 'WebsiteEnquiry';
const WebsiteEnquiry: Model<IWebsiteEnquiry> =
  mongoose.models[modelName] ||
  mongoose.model<IWebsiteEnquiry>(modelName, WebsiteEnquirySchema);

export default WebsiteEnquiry;

