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

    expect(await screen.findByText(/Winter ARC Pro v1.0.1/i)).toBeInTheDocument();
    expect(screen.getByText('72.88 MB')).toBeInTheDocument();
    expect(screen.getByText(/96374a521f746bd238eadb0a94b6934ebe4ae92cd7ebc615dda081400cc770c2/i)).toBeInTheDocument();
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
