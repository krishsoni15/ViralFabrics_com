/**
 * Company metadata, plant address, and quality inspection stages.
 */

export interface AddressInfo {
  line1: string;
  line2: string;
  line3: string;
  city: string;
  state: string;
  pin: string;
  country: string;
}

export interface QualityStage {
  level: string;
  checks: string[];
}

export interface CompanyInfo {
  name: string;
  brandName: string;
  established: number;
  founder: string;
  location: string;
  capacity: string;
  tagline: string;
  headline: string;
  phone: string;
  phoneDisplay: string;
  phoneTel: string;
  email: string;
  address: AddressInfo;
  mapsUrl: string;
  qualityStages: QualityStage[];
}

