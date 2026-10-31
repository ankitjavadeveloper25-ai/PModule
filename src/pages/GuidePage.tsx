import React from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  Terminal,
  CheckCircle2,
  Key,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  HardDrive,
  Laptop,
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { config } from '../config/env';

export const GuidePage: React.FC = () => {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="primary">Setup & License Documentation</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Installation & Activation Guide
        </h1>
        <p className="text-base text-brand-muted max-w-xl mx-auto leading-relaxed">
          Step-by-step walkthrough to install Winter ARC Pro on Windows and synchronize your verified Ed25519 Pro entitlement.
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-10">
        {/* Step 1 */}
        <Card className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary text-brand-bg font-extrabold text-sm">
              1
            </span>
            <h2 className="text-xl font-bold text-white">Download the Official Windows MSI Package</h2>
          </div>
          <p className="text-sm text-brand-muted leading-relaxed">
            Download the official <strong className="text-white">Winter ARC Pro-1.1.0.msi</strong> installer. The installer includes an embedded Java 21 JRE, meaning you do not need to install Java, JDK, or any runtime dependencies manually.
          </p>
          <div className="pt-2">
            <Link to="/download">
              <Button variant="primary" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                Go to Official Download Page
              </Button>
            </Link>
          </div>
        </Card>

        {/* Step 2 */}
        <Card className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary text-brand-bg font-extrabold text-sm">
              2
            </span>
            <h2 className="text-xl font-bold text-white">Verify Installer Integrity (Optional)</h2>
          </div>
          <p className="text-sm text-brand-muted leading-relaxed">
            Ensure the downloaded installer has not been altered or corrupted. Open PowerShell and run:
          </p>
          <div className="bg-brand-bg p-3.5 rounded-xl font-mono text-xs text-brand-primary border border-brand-border select-all overflow-x-auto">
            Get-FileHash -Path "$HOME\Downloads\Winter-ARC-Pro-1.1.0.msi" -Algorithm SHA256
          </div>
          <p className="text-xs text-brand-dim">
            Expected SHA-256 Hash:{' '}
            <span className="text-brand-text font-mono select-all">
              a3450987f79081c04a8f71a3baf53950e2de096bdcd4f3aada28ebef806ca316
            </span>
          </p>
        </Card>

        {/* Step 3 */}
        <Card className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary text-brand-bg font-extrabold text-sm">
              3
            </span>
            <h2 className="text-xl font-bold text-white">Run the Windows Installation Wizard</h2>
          </div>
          <p className="text-sm text-brand-muted leading-relaxed">
            Double-click the MSI package. The Windows installer will install the application to your local Program Files directory and place a convenient shortcut on your desktop and Start Menu.
          </p>
          <div className="p-4 rounded-xl bg-brand-surface border border-brand-border text-xs text-brand-dim space-y-1">
            <span className="font-semibold text-brand-text block">Default Installation Directory:</span>
            <span className="font-mono text-brand-muted select-all">C:\Program Files\Winter ARC Pro\</span>
          </div>
        </Card>

        {/* Step 4 */}
        <Card className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary text-brand-bg font-extrabold text-sm">
              4
            </span>
            <h2 className="text-xl font-bold text-white">Launch & Access Subscription Settings</h2>
          </div>
          <p className="text-sm text-brand-muted leading-relaxed">
            Open Winter ARC Pro. By default, the application runs in <strong className="text-white">Free Edition</strong> mode with full core tracking capabilities for up to 5 habits and local SQLite persistence.
          </p>
          <p className="text-sm text-brand-muted leading-relaxed">
            To activate Pro access, click on <strong className="text-white">Account / Subscription</strong> in the bottom left sidebar navigation of the desktop application.
          </p>
        </Card>

        {/* Step 5 */}
        <Card glow="purple" className="p-6 sm:p-8 space-y-4 border-brand-purple/40">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-purple text-white font-extrabold text-sm">
              5
            </span>
            <h2 className="text-xl font-bold text-white">Sign In & Synchronize Ed25519 License</h2>
          </div>
          <p className="text-sm text-brand-muted leading-relaxed">
            Enter the exact email and password associated with your account on this website. Click <strong className="text-white">"Sync License"</strong>.
          </p>
          <div className="p-4 rounded-xl bg-brand-surface/70 border border-brand-border space-y-3">
            <div className="flex items-center gap-2 text-brand-primary font-semibold text-xs">
              <ShieldCheck className="w-4 h-4" /> Cryptographic Verification Process:
            </div>
            <ul className="text-xs text-brand-muted space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                <span>The desktop app authenticates with the Spring Boot backend (`POST /api/auth/login`).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                <span>It fetches the official signed token (`GET /api/entitlements/verify`).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                <span>The desktop app verifies the Ed25519 signature offline using its embedded public key (`ed25519-2026-v1`).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                <span>The verified token is saved to `license.token` on your local drive with a 14-day offline grace period.</span>
              </li>
            </ul>
          </div>
        </Card>

        {/* Step 6: Troubleshooting */}
        <Card className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-lg">
            <AlertCircle className="w-5 h-5" />
            <span>Troubleshooting Common Activation Questions</span>
          </div>
          <div className="space-y-4 text-xs text-brand-muted divide-y divide-brand-border pt-2">
            <div className="pt-3 space-y-1">
              <span className="font-semibold text-white block">Paid on website but desktop shows Free?</span>
              <p>
                In the desktop app, go to Settings &gt; Account, ensure your email matches your website purchase, and click "Refresh License". If behind a corporate firewall, verify port 8080 or HTTPS connectivity.
              </p>
            </div>
            <div className="pt-3 space-y-1">
              <span className="font-semibold text-white block">Does the app work without internet?</span>
              <p>
                Yes! All habit tracking, pomodoro blocks, placement prep, and reflections run 100% offline via local SQLite. Once your Pro license is synchronized, you enjoy a 14-day offline grace period before an online check-in is requested.
              </p>
            </div>
            <div className="pt-3 space-y-1">
              <span className="font-semibold text-white block">Can I copy the signed token manually?</span>
              <p>
                Yes. In your website account dashboard, you can view and copy the raw signed entitlement token JSON and paste it directly into your local `license.token` file if running an isolated machine.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
