import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, Download, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';

export const CheckoutCancelPage: React.FC = () => {
  return (
    <div className="py-12 md:py-24 max-w-xl mx-auto px-4 sm:px-6">
      <Card className="p-8 sm:p-12 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-brand-surface border border-brand-border flex items-center justify-center mx-auto text-brand-muted">
          <XCircle className="w-10 h-10 text-brand-dim" />
        </div>

        <div className="space-y-2">
          <Badge variant="neutral">Transaction Dismissed</Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Checkout Was Cancelled
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
            The Razorpay checkout window was closed before completing payment. No charges were made to your account, and your current subscription status remains unchanged.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-brand-surface/60 border border-brand-border text-xs text-brand-dim leading-relaxed">
          You can return to select a plan anytime, or download the Free Edition of Winter ARC Pro to start tracking your core habits at no cost.
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/pricing" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full sm:w-auto" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Try Again with Plan A or B
            </Button>
          </Link>
          <Link to="/download" className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full sm:w-auto" leftIcon={<Download className="w-4 h-4" />}>
              Download Free Edition
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
