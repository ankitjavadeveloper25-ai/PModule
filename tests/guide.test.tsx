import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { GuidePage } from '../src/pages/GuidePage';
import { AuthProvider } from '../src/hooks/useAuth';

describe('GuidePage Component', () => {
  it('renders 5-step installation and offline activation instructions', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <GuidePage />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Installation & Activation Guide/i)).toBeInTheDocument();
    expect(screen.getByText(/Download the Official Windows MSI Package/i)).toBeInTheDocument();
    expect(screen.getByText(/Verify Installer Integrity/i)).toBeInTheDocument();
    expect(screen.getByText(/Run the Windows Installation Wizard/i)).toBeInTheDocument();
    expect(screen.getByText(/Launch & Access Subscription Settings/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign In & Synchronize Ed25519 License/i)).toBeInTheDocument();
  });

  it('renders offline licensing details and troubleshooting', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <GuidePage />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Cryptographic Verification Process/i)).toBeInTheDocument();
    expect(screen.getByText(/Troubleshooting Common Activation Questions/i)).toBeInTheDocument();
    expect(screen.getAllByText(/14-day offline grace period/i).length).toBeGreaterThan(0);
  });
});
