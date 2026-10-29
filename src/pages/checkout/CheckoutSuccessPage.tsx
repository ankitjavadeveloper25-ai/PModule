import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Download, HardDrive, ArrowRight } from 'lucide-react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';

export const CheckoutSuccessPage: React.FC = () => {
  const [params] = useSearchParams();
  const orderId = params.get('orderId') || 'rzp_order_verified';
  const paymentId = params.get('paymentId') || 'pay_verified';
  const tier = params.get('tier') || 'PRO';

  return (
    <div className="py-12 md:py-24 max-w-2xl mx-auto px-4 sm:px-6">
      <Card glow="blue" className="p-8 sm:p-12 text-center space-y-8 bg-gradient-to-b from-brand-card via-brand-surface to-brand-card">
        <div className="w-16 h-16 rounded-2xl bg-brand-emerald/10 border border-brand-emerald/30 flex items-center justify-center mx-auto text-brand-emerald shadow-glow">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <Badge variant="success">Transaction Authoritatively Verified</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Payment Successful! Pro Access Activated
          </h1>
          <p className="text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
            Your Razorpay transaction was verified server-side with HMAC-SHA256 cryptography. Your account is now provisioned with active Pro entitlements.
          </p>
        </div>

        {/* Verification Summary Card */}
        <div className="p-4 rounded-xl bg-brand-bg/90 border border-brand-border text-xs text-brand-dim space-y-2 text-left font-mono">
          <div className="flex justify-between py-1 border-b border-brand-border">
            <span>Payment ID:</span>
            <span className="text-brand-text font-bold select-all">{paymentId}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-brand-border">
            <span>Order ID:</span>
            <span className="text-brand-text select-all">{orderId}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Entitlement Status:</span>
            <span className="text-brand-emerald font-bold">ACTIVE & SIGNED</span>
          </div>
        </div>

        {/* Next Steps for Desktop Activation */}
        <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border text-left space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-brand-primary" /> How to Activate in Desktop App:
          </h3>
          <ol className="text-xs text-brand-muted space-y-2.5 list-decimal pl-4 leading-relaxed">
            <li>
              Launch <strong className="text-white">Winter ARC Pro</strong> on your Windows PC.
            </li>
            <li>
              In the sidebar, navigate to <strong className="text-white">Account / Subscription</strong>.
            </li>
            <li>
              Log in with your registered email and click <strong className="text-brand-primary">"Sync License"</strong>.
            </li>
            <li>
              The desktop will download and cryptographically verify your new signed token with 14-day offline grace!
            </li>
          </ol>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link to="/download" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto" leftIcon={<Download className="w-4 h-4" />}>
              Download Windows App
            </Button>
          </Link>
          <Link to="/account" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Go to Account Portal
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
