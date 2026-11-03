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

    expect(await screen.findByText(/Winter ARC Pro v1.02/i)).toBeInTheDocument();
    expect(screen.getByText('74.73 MB')).toBeInTheDocument();
    expect(screen.getByText(/2d1cdd0476108bfa7fd69b823ffee80dc9add3f66b33aac38ee676e62a0d528e/i)).toBeInTheDocument();
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
