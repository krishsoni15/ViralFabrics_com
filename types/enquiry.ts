/**
 * Enquiry and lead capture request/response contracts.
 */

export interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  product?: string;
  message: string;
}

export interface EnquiryResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    name: string;
    email: string;
    phone: string;
    product: string;
  };
}

