import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navbar } from '@/components/Navbar';

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock global fetch for API calls in test environment
global.fetch = vi.fn().mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true, data: [] }),
  })
);

describe('Navbar Component', () => {
  it('renders primary navigation links and company logo', () => {
    render(<Navbar />);

    expect(screen.getByRole('link', { name: /HOME/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ABOUT US/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /NETWORK/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /CONTACT US/i })).toBeInTheDocument();
  });

  it('renders phone and email quick contacts in header', () => {
    render(<Navbar />);

    expect(screen.getAllByText(/\+91\s*94279\s*88999/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/viralfabrics@yahoo\.com/i).length).toBeGreaterThan(0);
  });
});
