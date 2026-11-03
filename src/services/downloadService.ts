import { request } from './apiClient';
import { DownloadReleaseInfo } from '../types';
import { config } from '../config/env';

export const VERIFIED_RELEASE_METADATA: DownloadReleaseInfo = {
  productName: 'Winter ARC Pro Desktop',
  version: config.appVersion,
  releaseDate: '2026-11-03',
  installerFilename: 'Winter-ARC-Pro-1.02.msi',
  fileSizeBytes: 78364672,
  fileSizeFormatted: '74.73 MB',
  sha256: '2d1cdd0476108bfa7fd69b823ffee80dc9add3f66b33aac38ee676e62a0d528e',
  architecture: 'x64 (64-bit)',
  operatingSystem: 'Windows 10 / Windows 11 (64-bit)',
  bundledJre: 'Java 21 JRE Embedded (Zero installation required)',
  downloadUrl: config.downloadUrl,
  githubReleaseUrl: `${config.githubReleaseUrl}/tag/v${config.appVersion}`,
  status: 'STABLE',
  systemRequirements: {
    os: 'Windows 10 (1809+) or Windows 11 (x64)',
    processor: '1.6 GHz or faster 64-bit (x64) processor',
    memory: '4 GB RAM (8 GB recommended)',
    storage: '250 MB free disk space for local SQLite storage',
    display: '1280 x 720 minimum screen resolution with High-DPI support',
  },
  releaseNotes: [
    'Subscription Activation & Tier Gating: Full support for ₹50 Pro Plan A and ₹100 Pro Plan B',
    'Exclusive Technical Placement Prep Roadmap & DSA Tracker for Pro Plan B',
    '90-Day Challenge Matrix, Analytics & SQLite Backup unlocked for Pro Plan A',
    'Blossom Theme (Girl Mode 🌸) with Japanese Sakura palette, study illustrations & customized kitten companion',
    'Fixed input text visibility across dark mode and refined high-contrast light mode UI',
    'Custom timer durations (25m, 50m, custom) with automatic audio chime completion alert',
    'Native Windows MSI installer with automatic desktop shortcuts',
  ],
};

export const downloadService = {
  async getLatestRelease(): Promise<{ release: DownloadReleaseInfo; isFallback?: boolean }> {
    try {
      const data = await request<DownloadReleaseInfo>('/api/downloads/latest');
      // Only accept backend metadata if it is on the current release version (v1.02 or newer), never stale v1.1.0
      if (data && data.version && data.version !== '1.1.0') {
        return { release: data, isFallback: false };
      }
      return { release: VERIFIED_RELEASE_METADATA, isFallback: true };
    } catch (err) {
      console.warn('Backend download metadata endpoint unavailable, using verified release:', err);
      return { release: VERIFIED_RELEASE_METADATA, isFallback: true };
    }
  },
};
