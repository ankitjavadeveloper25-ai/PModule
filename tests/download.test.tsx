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
    expect(screen.getByText('74.36 MB')).toBeInTheDocument();
    expect(screen.getByText(/a3450987f79081c04a8f71a3baf53950e2de096bdcd4f3aada28ebef806ca316/i)).toBeInTheDocument();
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
