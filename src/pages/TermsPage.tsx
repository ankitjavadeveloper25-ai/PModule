import React from 'react';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { config } from '../config/env';

export const TermsPage: React.FC = () => {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-4 text-center">
        <Badge variant="primary">Legal Terms of Service</Badge>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Terms & Conditions</h1>
        <p className="text-sm text-brand-muted">Last Updated: October 29, 2026</p>
      </div>

      <Card className="p-8 sm:p-10 space-y-8 text-sm text-brand-muted leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Agreement to Terms</h2>
          <p>
            By accessing or downloading <strong className="text-white">Winter ARC Pro</strong> ("Application"), purchasing a subscription through our website, or using our licensing services, you agree to be bound by these Terms and Conditions. If you do not agree, do not download or use the software.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. License Grant & Permitted Use</h2>
          <p>
            Subject to these terms, Winter ARC Pro grants you a personal, non-exclusive, non-transferable, revocable license to install and execute the Windows desktop software for your personal productivity and habit tracking.
          </p>
          <p className="text-xs">
            You agree not to modify, reverse engineer, decompile, or disassemble the binary distribution, or attempt to bypass or falsify cryptographic Ed25519 entitlement verification signatures.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Subscription Plans & Pricing</h2>
          <p>
            Winter ARC Pro offers both Free and Paid subscriptions:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li><strong className="text-white">Free Edition (₹0):</strong> Provides core habit tracking for up to 5 habits and local SQLite persistence with no payment required.</li>
            <li><strong className="text-white">Pro Plan A (₹50):</strong> Unlocks unlimited habits, full 90-day challenge matrix, and 14-day offline grace period. Duration is currently configured for 30 days pending final commercial determination.</li>
            <li><strong className="text-white">Pro Plan B (₹100):</strong> Unlocks all Pro Plan A features plus the Technical Interview Placement Roadmap. Duration is currently configured for a 90-day cycle pending final commercial determination.</li>
          </ul>
          <p className="text-xs">
            All prices are stated in Indian Rupees (INR) and are billed via Razorpay. We reserve the right to modify future plan pricing upon notice. Active paid subscriptions retain their agreed terms for the duration of the purchased period.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Payment Processing & Razorpay Terms</h2>
          <p>
            All financial transactions are conducted through Razorpay Software Private Limited. You agree to comply with Razorpay's terms of service and acceptable use policies. Pro entitlement is granted only after server-side confirmation that the payment is in state <code className="text-brand-primary">captured</code> and verified via HMAC-SHA256 signature.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">5. Intellectual Property</h2>
          <p>
            All code, designs, graphics, badges, trademark names, and branding associated with Winter ARC Pro are the exclusive intellectual property of the product owner.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">6. Limitation of Liability & Disclaimer</h2>
          <p className="text-xs">
            WINTER ARC PRO IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOSS OF DATA RESULTING FROM HARDWARE FAILURES, ACCIDENTAL LOCAL DATABASE DELETION, OR OPERATING SYSTEM INCOMPATIBILITIES.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">7. Governing Law & Contact</h2>
          <p>
            These terms are governed by the laws of India. For commercial inquiries or legal notices, please reach out to <a href={`mailto:${config.contactEmail}`} className="text-brand-primary underline">{config.contactEmail}</a>.
          </p>
        </section>
      </Card>
    </div>
  );
};
