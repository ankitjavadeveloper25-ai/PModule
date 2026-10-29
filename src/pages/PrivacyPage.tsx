import React from 'react';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { HardDrive, Lock, ShieldCheck } from 'lucide-react';
import { config } from '../config/env';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-4 text-center">
        <Badge variant="primary">Data Privacy & Sovereignty</Badge>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-brand-muted">Last Updated: October 29, 2026</p>
      </div>

      <Card className="p-8 sm:p-10 space-y-8 text-sm text-brand-muted leading-relaxed">
        {/* Core Principles */}
        <div className="p-5 rounded-xl bg-brand-surface border border-brand-border space-y-2">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <HardDrive className="w-4 h-4 text-brand-emerald" />
            <span>Our Unbreakable Privacy Promise</span>
          </div>
          <p className="text-xs text-brand-dim">
            Winter ARC Pro is intentionally architected as an <strong className="text-white">offline-first application</strong>. Your personal habit logs, daily reflections, focus timer sessions, and placement prep notes are stored exclusively in your local SQLite database on your Windows PC. They are never uploaded to our servers, sold, or shared with third parties.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
          <p>We only collect the minimum information required to operate user authentication and process paid subscriptions:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li>
              <strong className="text-white">Account Information:</strong> When you register on our website or desktop app, we store your email address, full name, and a salted, cryptographically hashed representation of your password (using BCrypt).
            </li>
            <li>
              <strong className="text-white">Transaction Metadata:</strong> When you purchase Pro Plan A (₹50) or Pro Plan B (₹100), our payment processor (Razorpay) transmits transaction identifiers (Payment ID, Order ID, amount in paise, currency, and payment timestamp). We do not collect or store full credit card numbers, debit card PINs, CVVs, or bank netbanking credentials on our servers.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Desktop Application Local Storage</h2>
          <p>
            When you run the Winter ARC Pro Windows application:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li>All habit entries, challenge calendars, Pomodoro logs, and journal reflections are written directly to your local file system at <code className="text-brand-primary">winterarc.db</code>.</li>
            <li>License verification creates a local file named <code className="text-brand-primary">license.token</code> containing your Ed25519 signed entitlement.</li>
            <li>You can export or delete your local database at any time using the in-app Backup/Restore feature.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. How We Use Collected Data</h2>
          <p>We use account and transaction data strictly to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li>Authenticate your login across our website and desktop application.</li>
            <li>Verify Razorpay payment completion and maintain your Pro entitlement status.</li>
            <li>Generate Ed25519 cryptographically signed tokens for offline desktop verification.</li>
            <li>Provide customer support and resolve payment reconciliation issues.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Third-Party Service Providers</h2>
          <p>
            We partner exclusively with reputable infrastructure and payment providers:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li>
              <strong className="text-white">Razorpay Software Private Limited:</strong> Handles payment gateway processing, UPI collection, card authorization, and merchant payouts. Please refer to Razorpay's Privacy Policy for details regarding their security certifications and data retention.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">5. Data Retention & Deletion</h2>
          <p>
            We retain account metadata for as long as your account remains active. You may request permanent deletion of your account and associated transaction history at any time by contacting our support team at <a href={`mailto:${config.contactEmail}`} className="text-brand-primary underline">{config.contactEmail}</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">6. Changes to this Policy</h2>
          <p>
            Any material updates to our privacy practices will be announced through our official release notes and posted to this URL with an updated revision date.
          </p>
        </section>
      </Card>
    </div>
  );
};
