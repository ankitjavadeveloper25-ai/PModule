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
    expect(screen.getByText('74.37 MB')).toBeInTheDocument();
    expect(screen.getByText(/aa00266b14503f180195832813809a07a739a619eeb1b39758ef9791d75d2f35/i)).toBeInTheDocument();
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
