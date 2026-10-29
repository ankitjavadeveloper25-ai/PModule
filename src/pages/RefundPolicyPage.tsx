import React from 'react';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { ShieldCheck, HelpCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { config } from '../config/env';

export const RefundPolicyPage: React.FC = () => {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-4 text-center">
        <Badge variant="primary">Customer Protection</Badge>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Cancellation & Refund Policy
        </h1>
        <p className="text-sm text-brand-muted">Last Updated: October 29, 2026</p>
      </div>

      <Card className="p-8 sm:p-10 space-y-8 text-sm text-brand-muted leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Overview</h2>
          <p>
            At <strong className="text-white">Winter ARC Pro</strong>, we take customer satisfaction and fair business practices seriously. Because our application is a downloadable desktop software product that verifies entitlements via asymmetric Ed25519 cryptography, we provide clear rules regarding cancellations and refunds.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Cancellation Policy</h2>
          <p>
            Purchases of Pro Plan A (₹50) and Pro Plan B (₹100) are currently structured as fixed-duration one-time purchases (e.g. 30-day sprint or 90-day cycle).
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>There are no recurring surprise renewals or automatic card charges without your prior explicit authorization.</li>
            <li>When your purchased period expires, your desktop app gracefully returns to the Free Edition tier. Your local SQLite data, streak records, and journal entries are permanently preserved.</li>
            <li>If recurring subscription billing is introduced in the future, you will have the ability to cancel future renewals at any time directly through your account dashboard.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Refund Eligibility Criteria</h2>
          <p>
            We offer full refunds within <strong className="text-white">7 days</strong> of transaction date under the following circumstances:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-brand-surface border border-brand-border space-y-1.5">
              <span className="font-semibold text-white block text-xs">Technical Incompatibility:</span>
              <p className="text-xs text-brand-dim">
                The desktop client fails to launch or operate on a certified 64-bit Windows 10/11 system, and our engineering support is unable to resolve the issue within 48 hours.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-brand-surface border border-brand-border space-y-1.5">
              <span className="font-semibold text-white block text-xs">Duplicate or Erroneous Charges:</span>
              <p className="text-xs text-brand-dim">
                You were charged more than once for the same plan due to a payment gateway timeout or network retry error.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Non-Refundable Situations</h2>
          <p>Refunds will not be granted in cases where:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>The 7-day refund window from the date of purchase has elapsed.</li>
            <li>The software has been actively used throughout the full subscription duration without reporting any technical defects.</li>
            <li>The purchase was made on non-supported operating systems (e.g. 32-bit Windows, macOS, or Linux).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">5. How to Request a Refund</h2>
          <p>To initiate a refund request:</p>
          <ol className="list-decimal pl-5 space-y-2 text-xs">
            <li>
              Send an email to <a href={`mailto:${config.contactEmail}`} className="text-brand-primary underline font-mono">{config.contactEmail}</a> from the email address registered with your account.
            </li>
            <li>Include your <strong className="text-white">Razorpay Payment ID</strong> (e.g. <code className="text-brand-primary">pay_Kxxxxxxxxxx</code>) and Order ID.</li>
            <li>Briefly state the reason for your refund request along with any error logs if technical difficulties were encountered.</li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">6. Processing Timeline & Reversal</h2>
          <p className="text-xs leading-relaxed">
            Approved refund requests are submitted to Razorpay immediately. Depending on your banking institution, funds will reflect in your original payment method (UPI account, Credit Card, or Bank Account) within <strong className="text-white">5 to 7 business days</strong>. Once refunded, our backend automatically synchronizes with Razorpay webhook events to revoke the associated Pro license token.
          </p>
        </section>
      </Card>
    </div>
  );
};
