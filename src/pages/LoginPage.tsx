import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { GoogleSignInButton } from '../components/GoogleSignInButton';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as { returnTo?: string; selectedPlan?: string } | null;
  const returnTo = state?.returnTo || '/account';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email.trim(), password);
      navigate(returnTo);
    } catch (err: any) {
      setError(err?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-24 max-w-md mx-auto px-4 sm:px-6">
      <Card className="p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center mx-auto mb-2 shadow-glow">
            <Lock className="w-6 h-6 text-brand-primary" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Sign In to Winter ARC</h1>
          <p className="text-xs text-brand-muted">
            Access your subscription, offline Ed25519 license tokens, and payment history.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-brand-rose/10 border border-brand-rose/30 text-xs text-brand-rose flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Google Sign-In */}
        <div className="space-y-4">
          <GoogleSignInButton
            mode="signin"
            returnTo={returnTo}
            onError={(msg) => setError(msg)}
          />

          <div className="relative flex items-center justify-center">
            <div className="border-t border-brand-border w-full" />
            <span className="bg-brand-card px-3 text-[11px] font-bold tracking-wider uppercase text-brand-dim shrink-0">
              Or continue with email
            </span>
            <div className="border-t border-brand-border w-full" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="login-email" className="text-xs font-semibold text-brand-text">
              Email Address
            </label>
            <div className="relative">
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary placeholder:text-brand-dim"
              />
              <Mail className="w-4 h-4 text-brand-dim absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="login-password" className="text-xs font-semibold text-brand-text">
                Password
              </label>
            </div>
            <div className="relative">
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary placeholder:text-brand-dim"
              />
              <Lock className="w-4 h-4 text-brand-dim absolute left-3.5 top-3.5" />
            </div>
          </div>

          <Button variant="primary" size="lg" type="submit" className="w-full mt-2" isLoading={loading}>
            Sign In
          </Button>
        </form>

        <div className="pt-4 border-t border-brand-border text-center text-xs text-brand-muted">
          Don't have an account yet?{' '}
          <Link to="/register" state={state} className="text-brand-primary font-semibold hover:underline">
            Register here
          </Link>
        </div>
      </Card>
    </div>
  );
};
