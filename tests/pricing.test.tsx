import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { PricingPage } from '../src/pages/PricingPage';
import { AuthProvider } from '../src/hooks/useAuth';

describe('PricingPage Component', () => {
  it('renders all three tiers: Free, Pro Plan A (₹50), and Pro Plan B (₹100)', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <PricingPage />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(await screen.findByText('Free Edition')).toBeInTheDocument();
    expect(await screen.findByText('Pro Plan A')).toBeInTheDocument();
    expect(await screen.findByText('Pro Plan B')).toBeInTheDocument();

    expect(screen.getByText('₹0')).toBeInTheDocument();
    expect(screen.getByText('₹50')).toBeInTheDocument();
    expect(screen.getByText('₹100')).toBeInTheDocument();
  });

  it('displays duration and transparent commercial terms', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <PricingPage />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(await screen.findByText(/Total payable: ₹50.00/i)).toBeInTheDocument();
    expect(await screen.findByText(/Total payable: ₹100.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Payment Security & Entitlement Terms/i)).toBeInTheDocument();
  });
});
