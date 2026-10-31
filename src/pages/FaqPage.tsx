import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Mail } from 'lucide-react';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { config } from '../config/env';

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      category: 'Product & Compatibility',
      q: 'What is Winter ARC Pro?',
      a: 'Winter ARC Pro is a standalone Windows desktop productivity application designed for deep work, habit consistency, 90-day transformation protocols, and technical placement prep. Built directly in Java & JavaFX, it uses a local SQLite database to ensure your personal logs and routines remain entirely private and accessible offline.',
    },
    {
      category: 'Product & Compatibility',
      q: 'Which versions of Windows are supported?',
      a: 'Winter ARC Pro supports 64-bit Windows 10 (version 1809 or higher) and all versions of Windows 11. It is distributed as an official Windows MSI installer package with an embedded Java 21 runtime.',
    },
    {
      category: 'Pricing & Payments',
      q: 'What payment methods does Razorpay support for Plan A and B?',
      a: 'Through our integrated Razorpay checkout, you can pay using all major Indian payment rails: UPI (Google Pay, PhonePe, Paytm, BHIM), RuPay/Visa/Mastercard credit and debit cards, Netbanking across 50+ banks, and supported mobile wallets.',
    },
    {
      category: 'Pricing & Payments',
      q: 'What are the durations for Pro Plan A (₹50) and Pro Plan B (₹100)?',
      a: 'Pro Plan A (₹50) provides a 30-day discipline sprint, while Pro Plan B (₹100) covers a full 90-day Winter ARC cycle and includes the Technical Interview & DSA Placement Roadmap. Note: Exact commercial billing durations remain configurable on the server pending final business determination.',
    },
    {
      category: 'Pricing & Payments',
      q: 'What happens immediately after completing payment?',
      a: 'Once Razorpay confirms the transaction, our Spring Boot backend cryptographically verifies the payment signature using HMAC-SHA256 and activates your Pro subscription. You will receive an immediate confirmation on the website, and you can open your desktop app to synchronize your signed Ed25519 license.',
    },
    {
      category: 'Offline & Security',
      q: 'How does offline license verification work?',
      a: 'Winter ARC Pro utilizes asymmetric Ed25519 cryptography. When you synchronize your subscription, the server signs a license token using its private key. The desktop app stores this token in a local `license.token` file and verifies it offline using its embedded public key (`ed25519-2026-v1`), giving you a 14-day offline grace period.',
    },
    {
      category: 'Offline & Security',
      q: 'Does Winter ARC Pro send my habits or reflections to the cloud?',
      a: 'No. All habits, focus timer logs, interview notes, and journal entries are stored strictly in a local SQLite file (`winterarc.db`) on your Windows drive. The server only handles authentication, payments, and license signing.',
    },
    {
      category: 'Account & Support',
      q: 'What should I do if I paid but my desktop app still shows Free?',
      a: '1. Ensure you are signed in with the same email you used during checkout. 2. In the desktop application, navigate to Account / Subscription and click "Sync License". 3. If the problem persists, copy your signed token from your website Account dashboard or email ankitjavadeveloper85@gmail.com with your Razorpay Payment ID.',
    },
    {
      category: 'Account & Support',
      q: 'What is your refund policy?',
      a: 'We provide a 7-day support-driven refund policy if the desktop application is fundamentally incompatible with your verified 64-bit Windows hardware or if a technical payment error occurred. Please review our full Cancellation & Refund Policy page for instructions.',
    },
    {
      category: 'Account & Support',
      q: 'Can I reinstall the desktop app on a new Windows computer?',
      a: 'Yes. Simply download the latest installer from this website, log in with your credentials, and click "Sync License". Your active subscription will be recognized immediately.',
    },
  ];

  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="primary">Frequently Asked Questions</Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Got Questions? We Have Honest Answers.
        </h1>
        <p className="text-base text-brand-muted max-w-xl mx-auto leading-relaxed">
          Clear, accurate information regarding Windows compatibility, Razorpay transactions, and offline Ed25519 entitlements.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <Card
              key={index}
              className={`p-6 cursor-pointer transition-colors ${
                isOpen ? 'border-brand-primary/40 bg-brand-card' : 'hover:border-brand-border-light'
              }`}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-left">
                  <span className="text-sm sm:text-base font-bold text-white">{faq.q}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-brand-dim transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-brand-primary' : ''
                  }`}
                />
              </div>

              {isOpen && (
                <div className="mt-4 pt-4 border-t border-brand-border/60 text-xs sm:text-sm text-brand-muted leading-relaxed animate-in fade-in duration-200">
                  <p>{faq.a}</p>
                  <span className="inline-block mt-3 text-[10px] font-semibold text-brand-dim uppercase tracking-wider">
                    Category: {faq.category}
                  </span>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Contact prompt */}
      <div className="p-8 rounded-2xl bg-brand-surface border border-brand-border text-center space-y-3">
        <h3 className="text-lg font-bold text-white">Have a question not listed here?</h3>
        <p className="text-xs text-brand-muted">
          Our engineering support team is available to assist you with installation, payments, or activation.
        </p>
        <div className="pt-2">
          <a
            href={`mailto:${config.contactEmail}`}
            className="inline-flex items-center gap-2 text-sm text-brand-primary font-semibold hover:underline"
          >
            <Mail className="w-4 h-4" /> {config.contactEmail}
          </a>
        </div>
      </div>
    </div>
  );
};
