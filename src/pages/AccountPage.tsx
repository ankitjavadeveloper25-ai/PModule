import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  ShieldCheck,
  Key,
  HardDrive,
  Download,
  Calendar,
  Clock,
  Copy,
  Check,
  CreditCard,
  RefreshCw,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import { EntitlementToken } from '../types';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { config } from '../config/env';

export const AccountPage: React.FC = () => {
  const { user, profile, isAuthenticated, isLoading, refreshProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [entitlementToken, setEntitlementToken] = useState<EntitlementToken | null>(null);
  const [tokenLoading, setTokenLoading] = useState(false);
  const [tokenCopied, setTokenCopied] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { state: { returnTo: '/account' } });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const loadEntitlement = async () => {
    setTokenLoading(true);
    try {
      const token = await authService.getSignedEntitlement();
      setEntitlementToken(token);
    } catch (err) {
      console.error('Failed to retrieve signed entitlement:', err);
    } finally {
      setTokenLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadEntitlement();
    }
  }, [isAuthenticated]);

  const copyTokenJson = () => {
    if (!entitlementToken) return;
    navigator.clipboard.writeText(JSON.stringify(entitlementToken, null, 2));
    setTokenCopied(true);
    setTimeout(() => setTokenCopied(false), 2500);
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading account dashboard..." />;
  }

  const sub = profile?.subscription;
  const isPro = sub?.isPro;
  const payments = profile?.payments || [];

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome, {user?.fullName || 'Challenger'}
            </h1>
            {isPro ? (
              <Badge variant="primary">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> PRO ACTIVE
              </Badge>
            ) : (
              <Badge variant="neutral">Free Edition</Badge>
            )}
          </div>
          <p className="text-xs text-brand-dim mt-1">
            Registered: {profile?.startingDate || 'Recently'} • Email:{' '}
            <span className="text-brand-text font-mono">{user?.email}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/download">
            <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
              Download MSI
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={logout}>
            Sign Out
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subscription Status Card */}
        <div className="lg:col-span-2 space-y-8">
          <Card glow={isPro ? 'blue' : 'none'} className="p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-brand-dim uppercase tracking-wider">
                  Active Subscription Tier
                </span>
                <h2 className="text-2xl font-black text-white mt-1">
                  {sub?.tierDisplayName || 'Free Edition'}
                </h2>
              </div>
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    sub?.status === 'ACTIVE'
                      ? 'bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/30'
                      : 'bg-brand-rose/10 text-brand-rose border border-brand-rose/30'
                  }`}
                >
                  Status: {sub?.status || 'ACTIVE'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-brand-surface border border-brand-border">
                <span className="text-xs text-brand-dim block">Provider</span>
                <span className="text-base font-bold text-white mt-1 block">
                  {sub?.provider || 'MANUAL'}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-brand-surface border border-brand-border">
                <span className="text-xs text-brand-dim block">Days Remaining</span>
                <span className="text-base font-bold text-brand-primary mt-1 block">
                  {sub?.isLifetime ? 'Lifetime' : sub?.daysRemaining ? `${sub.daysRemaining} Days` : 'N/A'}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-brand-surface border border-brand-border">
                <span className="text-xs text-brand-dim block">Valid Until</span>
                <span className="text-xs font-mono font-semibold text-brand-muted mt-2 block truncate">
                  {sub?.currentPeriodEnd ? new Date(sub.currentPeriodEnd).toLocaleDateString() : 'Continuous'}
                </span>
              </div>
            </div>

            {!isPro && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-brand-primary/10 to-brand-purple/10 border border-brand-primary/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Upgrade to Pro starting at ₹50</h4>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Unlock unlimited habits, full 90-day matrix, and interview placement prep.
                  </p>
                </div>
                <Link to="/pricing">
                  <Button variant="primary" size="sm">
                    View Pro Plans
                  </Button>
                </Link>
              </div>
            )}
          </Card>

          {/* Cryptographic Entitlement Card */}
          <Card className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Key className="w-5 h-5 text-brand-primary" />
                <h3 className="text-lg font-bold text-white">Ed25519 Offline Entitlement</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={loadEntitlement}
                isLoading={tokenLoading}
                leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
              >
                Refresh Token
              </Button>
            </div>

            <p className="text-xs text-brand-muted leading-relaxed">
              Winter ARC Pro uses asymmetric Ed25519 cryptography. The signed token below can be validated completely offline by your desktop application without connecting to our servers for up to 14 days.
            </p>

            {entitlementToken ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-brand-surface border border-brand-border">
                    <span className="text-brand-dim block">Key Identifier</span>
                    <span className="font-mono text-brand-primary font-bold">{entitlementToken.keyId}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-brand-surface border border-brand-border">
                    <span className="text-brand-dim block">Target Product</span>
                    <span className="font-mono text-white font-bold">{entitlementToken.productId}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-brand-surface border border-brand-border">
                    <span className="text-brand-dim block">Offline Grace</span>
                    <span className="font-mono text-brand-emerald font-bold">14 Days (1,209,600s)</span>
                  </div>
                </div>

                <div className="relative">
                  <pre className="p-4 rounded-xl bg-brand-bg text-[11px] font-mono text-brand-dim overflow-x-auto border border-brand-border max-h-48">
                    {JSON.stringify(entitlementToken, null, 2)}
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-3 right-3 text-xs"
                    onClick={copyTokenJson}
                    leftIcon={tokenCopied ? <Check className="w-3 h-3 text-brand-emerald" /> : <Copy className="w-3 h-3" />}
                  >
                    {tokenCopied ? 'Copied Token JSON' : 'Copy JSON'}
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-brand-dim">No entitlement token generated yet.</p>
            )}
          </Card>
        </div>

        {/* Sidebar Info & Payment History */}
        <div className="space-y-8">
          {/* Quick Activation Guide */}
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-brand-primary" /> Desktop Activation
            </h3>
            <ol className="text-xs text-brand-muted space-y-2.5 list-decimal pl-4">
              <li>Open Winter ARC Pro desktop app.</li>
              <li>Navigate to <strong className="text-white">Account / Subscription</strong>.</li>
              <li>Sign in with <span className="text-brand-primary font-mono">{user?.email}</span>.</li>
              <li>Click <strong className="text-white">"Sync License"</strong> to activate Pro features.</li>
            </ol>
            <div className="pt-2">
              <Link to="/guide">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  Read Full Setup Guide →
                </Button>
              </Link>
            </div>
          </Card>

          {/* Payment Transaction Records */}
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-brand-purple" /> Payment History
            </h3>

            {payments.length === 0 ? (
              <p className="text-xs text-brand-dim">No transactions recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {payments.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-xl bg-brand-surface border border-brand-border text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">
                        ₹{(p.amountCents / 100).toFixed(2)}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-brand-emerald/10 text-brand-emerald">
                        {p.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-brand-dim font-mono truncate">
                      {p.eventId || p.id}
                    </div>
                    <div className="text-[10px] text-brand-dim">
                      {new Date(p.createdAt).toLocaleString()} via {p.provider}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
