import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Clock, RefreshCw, HelpCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { useAuth } from '../../hooks/useAuth';

export const CheckoutPendingPage: React.FC = () => {
  const [params] = useSearchParams();
  const orderId = params.get('orderId') || 'Pending';
  const { refreshProfile } = useAuth();
  const [checking, setChecking] = useState(false);

  const handleCheck = async () => {
    setChecking(true);
    await refreshProfile();
    setTimeout(() => {
      setChecking(false);
    }, 1200);
  };

  return (
    <div className="py-12 md:py-24 max-w-xl mx-auto px-4 sm:px-6">
      <Card className="p-8 sm:p-12 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-brand-amber/10 border border-brand-amber/30 flex items-center justify-center mx-auto text-brand-amber">
          <Clock className="w-10 h-10 animate-pulse" />
        </div>

        <div className="space-y-2">
          <Badge variant="warning">Verification in Progress</Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Payment Processing with Bank
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
            Your transaction has been submitted to Razorpay. We are awaiting final settlement notification from your payment provider.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-brand-surface border border-brand-border text-xs text-brand-dim font-mono">
          <span>Order Reference: </span>
          <span className="text-brand-text select-all">{orderId}</span>
        </div>

        <div className="space-y-3 pt-2">
          <Button
            variant="outline"
            size="md"
            className="w-full"
            onClick={handleCheck}
            isLoading={checking}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Check Status Again
          </Button>
          <Link to="/pricing" className="block">
            <Button variant="ghost" size="sm" className="w-full" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Pricing
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
