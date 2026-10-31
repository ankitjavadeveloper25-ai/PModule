import { request } from './apiClient';
import { DownloadReleaseInfo } from '../types';
import { config } from '../config/env';

export const VERIFIED_RELEASE_METADATA: DownloadReleaseInfo = {
  productName: 'Winter ARC Pro Desktop',
  version: config.appVersion,
  releaseDate: '2026-10-31',
  installerFilename: 'Winter ARC Pro-1.1.0.msi',
  fileSizeBytes: 77928777,
  fileSizeFormatted: '74.32 MB',
  sha256: '2817b1e04cb1ce508e3df79db045c25630ee8fa5fb036918253b16b4b82633ae',
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
    'Fixed input text visibility across dark mode and refined high-contrast light mode UI',
    'User-defined shelf roadmap with custom milestones and deliverables',
    'Custom timer durations (25m, 50m, custom) with automatic audio chime completion alert',
    'User-defined habit categories, focus subjects, and study block topics',
    'AM / PM task schedule picker in Planner view',
    'High-contrast dropdown menus and enlarged donut analytics charts',
    'Native Windows MSI installer with automatic desktop shortcuts',
  ],
};

export const downloadService = {
  async getLatestRelease(): Promise<{ release: DownloadReleaseInfo; isFallback?: boolean }> {
    try {
      const data = await request<DownloadReleaseInfo>('/api/downloads/latest');
      if (data && data.version) {
        return { release: data, isFallback: false };
      }
      return { release: VERIFIED_RELEASE_METADATA, isFallback: true };
    } catch (err) {
      console.warn('Backend download metadata endpoint unavailable, using verified release:', err);
      return { release: VERIFIED_RELEASE_METADATA, isFallback: true };
    }
  },
};
