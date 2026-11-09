import type { EnquiryPayload, EnquiryResponse } from '@/types';

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResponse> {
  try {
    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data: EnquiryResponse = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: data.error || `Enquiry request failed with status ${res.status}`,
      };
    }

    return data;
  } catch (error) {
    console.error('[Enquiry API Client] Network failure:', error);
    return {
      success: false,
      error: 'Network error. Please verify your internet connection or reach our sales desk directly via WhatsApp.',
    };
  }
}

