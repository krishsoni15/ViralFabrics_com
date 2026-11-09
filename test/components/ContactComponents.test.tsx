import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LogisticsTransitGrid } from '@/components/contact/LogisticsTransitGrid';
import { ContactQrModal } from '@/components/contact/ContactQrModal';

describe('LogisticsTransitGrid Component', () => {
  it('renders connectivity metrics for STV Airport, Hazira Ocean Port, and Surat Station', () => {
    render(<LogisticsTransitGrid />);

    expect(screen.getByText(/Surat Airport \(STV\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Hazira Ocean Port/i)).toBeInTheDocument();
    expect(screen.getByText(/Surat Railway Station/i)).toBeInTheDocument();
    expect(screen.getByText(/14 km • 25 mins direct via Ring Road/i)).toBeInTheDocument();
  });
});

describe('ContactQrModal Component', () => {
  const dummyQrUrls = {
    location: 'data:image/png;base64,locationQrMock',
    phone: 'data:image/png;base64,phoneQrMock',
    email: 'data:image/png;base64,emailQrMock',
  };

  it('renders nothing when activeQrModal is null', () => {
    const { container } = render(
      <ContactQrModal
        activeQrModal={null}
        onClose={vi.fn()}
        qrUrls={dummyQrUrls}
        copiedField={null}
        onCopy={vi.fn()}
        fullAddress="Surat Facility"
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders location modal correctly when activeQrModal is location', () => {
    const handleClose = vi.fn();
    render(
      <ContactQrModal
        activeQrModal="location"
        onClose={handleClose}
        qrUrls={dummyQrUrls}
        copiedField={null}
        onCopy={vi.fn()}
        fullAddress="Surat Facility"
      />
    );

    expect(screen.getByText(/Surat Mill Location QR/i)).toBeInTheDocument();
    expect(screen.getByText(/Surat Mill Turn-by-Turn Navigation/i)).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /Close QR Modal/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('triggers copy callback when Copy button is clicked', () => {
    const handleCopy = vi.fn();
    render(
      <ContactQrModal
        activeQrModal="phone"
        onClose={vi.fn()}
        qrUrls={dummyQrUrls}
        copiedField={null}
        onCopy={handleCopy}
        fullAddress="Surat Facility"
      />
    );

    expect(screen.getByText(/Commercial Sales & WhatsApp Desk/i)).toBeInTheDocument();
    const copyBtn = screen.getByRole('button', { name: /Copy/i });
    fireEvent.click(copyBtn);
    expect(handleCopy).toHaveBeenCalledWith('modal-phone', '91-9427988999');
  });
});

