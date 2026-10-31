import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { DownloadPage } from '../src/pages/DownloadPage';

describe('DownloadPage Component', () => {
  it('renders official release version, installer size, and SHA-256 hash', async () => {
    render(
      <BrowserRouter>
        <DownloadPage />
      </BrowserRouter>
    );

    expect(await screen.findByText(/Winter ARC Pro v1.1.0/i)).toBeInTheDocument();
    expect(screen.getByText('74.34 MB')).toBeInTheDocument();
    expect(screen.getByText(/c355eab844b64c96100e2fd5942389128e6489e5d7faa202d2fd8b6dd63305c9/i)).toBeInTheDocument();
  });

  it('renders system requirements and PowerShell verification instructions', async () => {
    render(
      <BrowserRouter>
        <DownloadPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/System Requirements/i)).toBeInTheDocument();
    expect(screen.getByText(/Get-FileHash -Path/i)).toBeInTheDocument();
  });
});
