import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { FeaturesPage } from '../src/pages/FeaturesPage';
import { AuthProvider } from '../src/hooks/useAuth';

describe('FeaturesPage Component', () => {
  it('renders headline and desktop feature cards from JavaFX client', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <FeaturesPage />
        </AuthProvider>
      </BrowserRouter>
    );

    // Verify header and description
    expect(screen.getByText(/Every Screen Built for Unbroken Focus/i)).toBeInTheDocument();
    expect(screen.getByText(/Authentic Desktop Features/i)).toBeInTheDocument();

    // Verify key desktop module cards derived from JavaFX source code
    expect(screen.getByText(/Unified Command Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Multi-Frequency Habit System/i)).toBeInTheDocument();
    expect(screen.getByText(/Pomodoro Deep Work Timer/i)).toBeInTheDocument();
    expect(screen.getByText(/Technical Interview & DSA Roadmap/i)).toBeInTheDocument();
    expect(screen.getByText(/Local SQLite Database Sovereignty/i)).toBeInTheDocument();
  });

  it('renders bottom call to action and buttons', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <FeaturesPage />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Experience the Desktop Client in Action/i)).toBeInTheDocument();
    expect(screen.getByText(/Download MSI Installer/i)).toBeInTheDocument();
    expect(screen.getByText(/View Pricing \(₹50 \/ ₹100\)/i)).toBeInTheDocument();
  });
});
