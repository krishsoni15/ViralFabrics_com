import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/Footer';

describe('Footer Component', () => {
  it('renders Surat contact information and address', () => {
    render(<Footer />);

    // Check phone number presence
    expect(screen.getAllByText(/\+91\s*94279\s*88999/i).length).toBeGreaterThan(0);

    // Check email presence
    expect(screen.getAllByText(/viralfabrics@yahoo\.com/i).length).toBeGreaterThan(0);

    // Check copyright notice
    expect(screen.getAllByText(/All rights reserved/i).length).toBeGreaterThan(0);
  });

  it('renders quick navigation links to all main pages', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: /About Us/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact Us/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Network/i })).toBeInTheDocument();
  });
});
