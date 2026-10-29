import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  ShieldCheck,
  Lock,
  Zap,
  HelpCircle,
  AlertCircle,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { usePlans } from '../hooks/usePlans';
import { useAuth } from '../hooks/useAuth';
import { useRazorpay } from '../hooks/useRazorpay';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const PricingPage: React.FC = () => {
  const { plans, loading, error, isFallback, retry } = usePlans();
  const { isAuthenticated, user } = useAuth();
  const { openCheckout, isProcessing } = useRazorpay();
  const navigate = useNavigate();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedPlanForAuth, setSelectedPlanForAuth] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    setCheckoutError(null);

    // Free edition does not require payment
    if (planId === 'FREE') {
      navigate('/download');
      return;
    }

    // Razorpay orders require authenticated user on Spring Boot backend
    if (!isAuthenticated) {
      setSelectedPlanForAuth(planId);
      setAuthModalOpen(true);
      return;
    }

    // Trigger Razorpay Checkout
    openCheckout({
      planId,
      userEmail: user?.email,
      userName: user?.fullName,
      onSuccess: (res) => {
        navigate(`/checkout/success?orderId=${res.orderId}&paymentId=${res.paymentId}&tier=${res.tier || ''}`);
      },
      onCancel: () => {
        navigate('/checkout/cancel');
      },
      onError: (errMsg) => {
        setCheckoutError(errMsg);
      },
    });
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="primary">Authoritative Server Pricing</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Transparent, Fair Pricing for Disciplined Minds
        </h1>
        <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
          Start free with core habit tracking, or upgrade to Pro for the price of a cup of coffee. Secure 256-bit encrypted transactions via Razorpay UPI, Cards & Netbanking.
        </p>

        {isFallback && (
          <div className="inline-flex items-center gap-2 p-3 rounded-xl bg-brand-card border border-brand-amber/30 text-xs text-brand-amber text-left max-w-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              Backend catalog connection is being cached locally. Official prices are maintained strictly on the server: ₹50 for Plan A, ₹100 for Plan B.
            </span>
          </div>
        )}

        {checkoutError && (
          <div className="p-4 rounded-xl bg-brand-rose/10 border border-brand-rose/30 text-sm text-brand-rose text-left flex items-start gap-3 max-w-xl mx-auto">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">Checkout Notice:</span>
              <p>{checkoutError}</p>
            </div>
          </div>
        )}
      </div>

      {/* Loading state */}
      {loading ? (
        <LoadingSpinner message="Fetching authoritative plan catalog from server..." />
      ) : error && plans.length === 0 ? (
        <div className="p-8 rounded-2xl bg-brand-card border border-brand-rose/30 text-center space-y-4 max-w-md mx-auto">
          <AlertCircle className="w-8 h-8 text-brand-rose mx-auto" />
          <h3 className="text-lg font-bold text-white">Could Not Load Pricing</h3>
          <p className="text-xs text-brand-muted">{error}</p>
          <Button variant="outline" size="sm" onClick={retry} leftIcon={<RefreshCw className="w-4 h-4" />}>
            Retry Server Request
          </Button>
        </div>
      ) : (
        /* Pricing Cards Grid */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const isPopular = plan.popular;
            const isFree = plan.id === 'FREE';

            return (
              <Card
                key={plan.id}
                glow={isPopular ? 'blue' : 'none'}
                hoverEffect
                className={`relative flex flex-col justify-between p-8 ${
                  isPopular
                    ? 'border-brand-primary/60 bg-gradient-to-b from-brand-card via-brand-surface to-brand-card'
                    : 'bg-brand-card'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-brand-primary text-brand-bg shadow-glow flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Recommended
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    <p className="text-xs text-brand-muted mt-2 min-h-[36px] leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="pb-6 border-b border-brand-border">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-white">
                        {isFree ? '₹0' : `₹${plan.priceInr}`}
                      </span>
                      {!isFree && (
                        <span className="text-xs text-brand-dim uppercase tracking-wider font-mono">
                          / {plan.billingPeriod}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-brand-dim block mt-1">
                      {isFree
                        ? 'No credit card required'
                        : `Total payable: ₹${plan.priceInr}.00 (inclusive of taxes)`}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3">
                    <span className="text-xs font-semibold text-white uppercase tracking-wider block">
                      Included Capabilities:
                    </span>
                    <ul className="space-y-2.5 text-xs text-brand-muted">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Unresolved Duration Notice */}
                  {plan.commercialNotice && !isFree && (
                    <div className="p-3 rounded-xl bg-brand-surface border border-brand-border text-[11px] text-brand-dim leading-relaxed">
                      {plan.commercialNotice}
                    </div>
                  )}
                </div>

                {/* Purchase Button */}
                <div className="pt-8">
                  <Button
                    variant={isPopular ? 'primary' : isFree ? 'outline' : 'secondary'}
                    size="lg"
                    className="w-full"
                    isLoading={isProcessing}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    {isFree ? 'Download Free Edition' : `Select ${plan.name} (₹${plan.priceInr})`}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Commercial Terms & Razorpay Security Assurance */}
      <div className="p-6 sm:p-8 rounded-2xl bg-brand-surface/60 border border-brand-border space-y-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-2.5 text-white font-bold text-sm">
          <ShieldCheck className="w-5 h-5 text-brand-primary" />
          <span>Payment Security & Entitlement Terms</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-brand-muted leading-relaxed">
          <div>
            <span className="font-semibold text-white block mb-1">Server-Side Validation:</span>
            All payment orders and amounts are derived strictly on the server-side in integer paise (₹50 = 5000 paise; ₹100 = 10000 paise). Client-side amounts are never trusted.
          </div>
          <div>
            <span className="font-semibold text-white block mb-1">Razorpay Verified:</span>
            Transactions are processed through official Razorpay Orders API with constant-time HMAC-SHA256 signature verification and automated capture confirmation.
          </div>
          <div>
            <span className="font-semibold text-white block mb-1">Duration Transparency:</span>
            Billing durations for ₹50 and ₹100 are currently set to 30 days and 90 days by default, subject to final commercial policy determination prior to live billing.
          </div>
        </div>
      </div>

      {/* Authentication Prompt Modal if user clicks plan while unauthenticated */}
      <Modal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="Sign In to Complete Purchase"
        maxWidth="md"
      >
        <div className="space-y-4 text-center">
          <p className="text-sm text-brand-muted leading-relaxed">
            To link your verified Razorpay subscription to your account and generate your offline Ed25519 desktop license, you must be signed in.
          </p>
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => {
                setAuthModalOpen(false);
                navigate('/login', { state: { returnTo: '/pricing', selectedPlan: selectedPlanForAuth } });
              }}
            >
              Sign In to Account
            </Button>
            <Button
              variant="outline"
              size="md"
              className="w-full"
              onClick={() => {
                setAuthModalOpen(false);
                navigate('/register', { state: { returnTo: '/pricing', selectedPlan: selectedPlanForAuth } });
              }}
            >
              Create New Account
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
