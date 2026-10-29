import React, { useState, useEffect } from 'react';
import {
  Download,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  HardDrive,
  Cpu,
  Monitor,
  Terminal,
  ExternalLink,
  FileCode,
} from 'lucide-react';
import { downloadService, VERIFIED_RELEASE_METADATA } from '../services/downloadService';
import { DownloadReleaseInfo } from '../types';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { config } from '../config/env';

export const DownloadPage: React.FC = () => {
  const [releaseInfo, setReleaseInfo] = useState<DownloadReleaseInfo>(VERIFIED_RELEASE_METADATA);
  const [copiedHash, setCopiedHash] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    downloadService.getLatestRelease().then((res) => {
      setReleaseInfo(res.release);
    });
  }, []);

  const copyChecksum = () => {
    navigator.clipboard.writeText(releaseInfo.sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2500);
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="primary">Official Windows Release</Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Download Winter ARC Pro for Windows
        </h1>
        <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
          Get the standalone native Windows MSI installer with bundled Java 21 runtime and local SQLite engine. Zero external dependencies required.
        </p>
      </div>

      {/* Main Download Card */}
      <div className="max-w-3xl mx-auto">
        <Card glow="blue" className="p-8 sm:p-10 space-y-8 bg-gradient-to-b from-brand-card via-brand-surface to-brand-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Winter ARC Pro v{releaseInfo.version}
                </h2>
                <Badge variant="success">Stable Channel</Badge>
              </div>
              <p className="text-xs text-brand-dim mt-1">
                Release Date: {releaseInfo.releaseDate} • Architecture: {releaseInfo.architecture}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xl sm:text-2xl font-black text-brand-primary">
                {releaseInfo.fileSizeFormatted}
              </span>
              <span className="text-xs text-brand-dim block">MSI Installer Package</span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="space-y-4 text-center">
            <a href={releaseInfo.downloadUrl} download className="block">
              <Button
                variant="primary"
                size="lg"
                className="w-full text-base py-4 shadow-glow"
                leftIcon={<Download className="w-5 h-5" />}
              >
                Download MSI Installer (v{releaseInfo.version})
              </Button>
            </a>
            <p className="text-xs text-brand-dim">
              Compatible with 64-bit Windows 10 (1809+) and Windows 11. Built with JavaFX 21.0.6.
            </p>
          </div>

          {/* SHA-256 Checksum Card */}
          <div className="p-4 rounded-xl bg-brand-bg/90 border border-brand-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-brand-muted flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-brand-primary" /> SHA-256 Verified Checksum:
              </span>
              <button
                onClick={copyChecksum}
                className="inline-flex items-center gap-1 text-xs text-brand-primary hover:text-white transition-colors"
                title="Copy SHA-256 Checksum"
              >
                {copiedHash ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-brand-emerald" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Hash
                  </>
                )}
              </button>
            </div>
            <div className="font-mono text-[11px] sm:text-xs text-brand-dim break-all bg-brand-surface p-2.5 rounded-lg border border-brand-border select-all">
              {releaseInfo.sha256}
            </div>
          </div>

          {/* Release Notes */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Release Notes (v{releaseInfo.version}):
            </h3>
            <ul className="text-xs text-brand-muted space-y-2">
              {releaseInfo.releaseNotes.map((note, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      {/* System Requirements */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h3 className="text-xl font-bold text-white text-center">System Requirements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 space-y-2 text-center">
            <Monitor className="w-5 h-5 text-brand-primary mx-auto" />
            <span className="text-xs font-bold text-white block">Operating System</span>
            <span className="text-xs text-brand-muted block">
              {releaseInfo.systemRequirements.os}
            </span>
          </Card>
          <Card className="p-5 space-y-2 text-center">
            <Cpu className="w-5 h-5 text-brand-purple mx-auto" />
            <span className="text-xs font-bold text-white block">Processor</span>
            <span className="text-xs text-brand-muted block">
              {releaseInfo.systemRequirements.processor}
            </span>
          </Card>
          <Card className="p-5 space-y-2 text-center">
            <HardDrive className="w-5 h-5 text-brand-emerald mx-auto" />
            <span className="text-xs font-bold text-white block">Memory & Storage</span>
            <span className="text-xs text-brand-muted block">
              {releaseInfo.systemRequirements.memory} • {releaseInfo.systemRequirements.storage}
            </span>
          </Card>
          <Card className="p-5 space-y-2 text-center">
            <ShieldCheck className="w-5 h-5 text-brand-amber mx-auto" />
            <span className="text-xs font-bold text-white block">Java Runtime</span>
            <span className="text-xs text-brand-muted block">
              Embedded JRE Included (No Java install needed)
            </span>
          </Card>
        </div>
      </div>

      {/* Checksum Verification PowerShell Tutorial */}
      <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-brand-card border border-brand-border space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <Terminal className="w-4 h-4 text-brand-primary" />
          <span>How to Verify Package Authenticity on Windows:</span>
        </div>
        <p className="text-xs text-brand-muted leading-relaxed">
          Open Windows PowerShell and verify the cryptographic integrity of your downloaded installer before running:
        </p>
        <div className="bg-brand-bg p-3.5 rounded-xl font-mono text-xs text-brand-primary border border-brand-border select-all overflow-x-auto">
          Get-FileHash -Path "$HOME\Downloads\Winter-ARC-Pro-1.0.1.msi" -Algorithm SHA256
        </div>
        <p className="text-[11px] text-brand-dim">
          Compare the computed hash with the official hash published above to ensure zero file tampering or corruption during download.
        </p>
      </div>
    </div>
  );
};
