import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { HomePage } from '../src/pages/HomePage';
import { AuthProvider } from '../src/hooks/useAuth';

describe('HomePage Component', () => {
  it('renders headline, CTAs, and Windows compatibility badge', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <HomePage />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Master Your 90-Day Discipline Challenge on/i)).toBeInTheDocument();
    expect(screen.getByText(/Download Free Installer/i)).toBeInTheDocument();
    expect(screen.getByText(/View Plans \(from ₹50\)/i)).toBeInTheDocument();
  });

  it('renders core pillars and Free vs Pro comparison', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <HomePage />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/90-Day Challenge Matrix/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Pomodoro Deep Work Timer/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Placement & DSA Prep Tracker/i)).toBeInTheDocument();
    expect(screen.getByText(/Free Edition vs\. Pro Access/i)).toBeInTheDocument();
  });
});
