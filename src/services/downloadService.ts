import { request } from './apiClient';
import { DownloadReleaseInfo } from '../types';
import { config } from '../config/env';

export const VERIFIED_RELEASE_METADATA: DownloadReleaseInfo = {
  productName: 'Winter ARC Pro Desktop',
  version: config.appVersion,
  releaseDate: '2026-10-29',
  installerFilename: 'Winter ARC Pro-1.0.1.msi',
  fileSizeBytes: 76425545,
  fileSizeFormatted: '72.88 MB',
  sha256: '96374a521f746bd238eadb0a94b6934ebe4ae92cd7ebc615dda081400cc770c2',
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
    'Integrated Razorpay order checkout and cryptographic verification',
    'Enhanced Ed25519 offline entitlement signing with 14-day grace period',
    'High-DPI display enhancements and Pomodoro focus timer audio updates',
    'LeetCode & DSA placement prep roadmap tracker',
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
