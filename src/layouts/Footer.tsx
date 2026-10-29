import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, HardDrive, Mail, ExternalLink } from 'lucide-react';
import { config } from '../config/env';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-brand-border bg-brand-surface/40 pt-16 pb-12 text-sm text-brand-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-brand-border">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/icons/winterarc.png" alt="Winter ARC Pro" className="w-8 h-8 object-contain" />
              <span className="text-xl font-bold text-white tracking-tight">Winter ARC Pro</span>
            </div>
            <p className="text-brand-muted max-w-sm leading-relaxed text-sm">
              The premier Windows productivity and discipline suite. Master the 90-day consistency protocol with local SQLite privacy, Pomodoro focus blocks, DSA interview prep, and cryptographic Ed25519 entitlements.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-brand-dim">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-card border border-brand-border text-brand-text">
                <HardDrive className="w-3.5 h-3.5 text-brand-emerald" /> 100% Local SQLite
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-card border border-brand-border text-brand-text">
                <Lock className="w-3.5 h-3.5 text-brand-primary" /> Ed25519 Verification
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-card border border-brand-border text-brand-text">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-purple" /> Razorpay Verified
              </span>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/features" className="hover:text-brand-primary transition-colors">
                  Desktop Modules
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-brand-primary transition-colors">
                  Pricing Plans (₹50 / ₹100)
                </Link>
              </li>
              <li>
                <Link to="/download" className="hover:text-brand-primary transition-colors">
                  Windows Installer (v{config.appVersion})
                </Link>
              </li>
              <li>
                <Link to="/guide" className="hover:text-brand-primary transition-colors">
                  Activation Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-brand-primary transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Account */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Account & Support</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/account" className="hover:text-brand-primary transition-colors">
                  Subscription Portal
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-brand-primary transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-primary transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <a
                  href={config.githubReleaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-brand-primary transition-colors"
                >
                  GitHub Releases <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${config.contactEmail}`}
                  className="inline-flex items-center gap-1 hover:text-brand-primary transition-colors"
                >
                  <Mail className="w-3 h-3" /> {config.contactEmail}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Compliance */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Legal & Compliance</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/privacy" className="hover:text-brand-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-brand-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-brand-primary transition-colors">
                  Cancellation & Refund
                </Link>
              </li>
              <li>
                <span className="text-xs text-brand-dim block pt-2">
                  Compliant with Razorpay Merchant Onboarding Standards
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-dim">
          <p>© {new Date().getFullYear()} Winter ARC Pro. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Windows is a registered trademark of Microsoft Corporation. Winter ARC Pro is an independent software application.
          </p>
        </div>
      </div>
    </footer>
  );
};
