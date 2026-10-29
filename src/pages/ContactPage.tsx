import React, { useState } from 'react';
import { Mail, Clock, ShieldCheck, CheckCircle2, Send, MessageSquare } from 'lucide-react';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { config } from '../config/env';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Payment / Activation Support');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <Badge variant="primary">Official Support & Enquiries</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Contact Our Team
        </h1>
        <p className="text-base text-brand-muted leading-relaxed">
          Need assistance with your Razorpay transaction, desktop MSI installation, or Ed25519 license activation? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Card */}
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3 text-white font-bold text-base">
              <Mail className="w-5 h-5 text-brand-primary" />
              <span>Direct Support Email</span>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              For priority support, licensing queries, and payment reconciliation:
            </p>
            <a
              href={`mailto:${config.contactEmail}`}
              className="text-sm font-semibold text-brand-primary hover:underline block break-all font-mono"
            >
              {config.contactEmail}
            </a>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center gap-3 text-white font-bold text-base">
              <Clock className="w-5 h-5 text-brand-purple" />
              <span>Response Window</span>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              We respond to all technical support tickets within <strong className="text-white">24 to 48 business hours</strong> (Monday through Friday, 9:00 AM – 6:00 PM IST).
            </p>
          </Card>

          <Card className="p-6 space-y-3 bg-brand-surface/40">
            <div className="flex items-center gap-2 text-xs text-brand-dim">
              <ShieldCheck className="w-4 h-4 text-brand-emerald" />
              <span className="font-semibold text-white">Merchant Details:</span>
            </div>
            <p className="text-[11px] text-brand-dim leading-relaxed">
              Winter ARC Pro is an independent commercial desktop software product. Payments are processed securely via Razorpay Software Private Limited.
            </p>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="p-8 space-y-6">
            <h2 className="text-xl font-bold text-white">Send Us a Message</h2>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-brand-surface/60 rounded-xl border border-brand-emerald/30 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-brand-emerald mx-auto" />
                <h3 className="text-lg font-bold text-white">Inquiry Received</h3>
                <p className="text-xs text-brand-muted max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{name}</strong>. Your message has been logged. Our engineering support desk will reply to <span className="text-brand-primary font-mono">{email}</span> shortly.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-semibold text-brand-text">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent placeholder:text-brand-dim"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-semibold text-brand-text">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent placeholder:text-brand-dim"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-semibold text-brand-text">
                    Inquiry Topic
                  </label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  >
                    <option value="Payment / Activation Support">Payment / Activation Support</option>
                    <option value="Desktop MSI Installation Issue">Desktop MSI Installation Issue</option>
                    <option value="Feature Request & Feedback">Feature Request & Feedback</option>
                    <option value="Refund Request">Refund Request</option>
                    <option value="Other Commercial Question">Other Commercial Question</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-semibold text-brand-text">
                    Your Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please include your Windows version and Razorpay Payment ID if reporting an activation problem..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent placeholder:text-brand-dim resize-none"
                  />
                </div>

                <Button variant="primary" size="md" type="submit" leftIcon={<Send className="w-4 h-4" />}>
                  Submit Support Ticket
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
