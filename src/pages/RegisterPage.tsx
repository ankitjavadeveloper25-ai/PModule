import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { GoogleSignInButton } from '../components/GoogleSignInButton';

export const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as { returnTo?: string; selectedPlan?: string } | null;
  const returnTo = state?.returnTo || '/account';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      await register(email.trim(), password, fullName.trim());
      navigate(returnTo);
    } catch (err: any) {
      setError(err?.message || 'Registration failed. Email may already be registered.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-24 max-w-md mx-auto px-4 sm:px-6">
      <Card className="p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black text-white tracking-tight">Create Your Account</h1>
          <p className="text-xs text-brand-muted">
            Join the Winter ARC discipline protocol and synchronize your Pro licenses.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-brand-rose/10 border border-brand-rose/30 text-xs text-brand-rose flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Google Sign-In / Register */}
        <div className="space-y-4">
          <GoogleSignInButton
            mode="signup"
            returnTo={returnTo}
            onError={(msg) => setError(msg)}
          />

          <div className="relative flex items-center justify-center">
            <div className="border-t border-brand-border w-full" />
            <span className="bg-brand-card px-3 text-[11px] font-bold tracking-wider uppercase text-brand-dim shrink-0">
              Or register with email
            </span>
            <div className="border-t border-brand-border w-full" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="reg-name" className="text-xs font-semibold text-brand-text">
              Full Name
            </label>
            <div className="relative">
              <input
                id="reg-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Developer Challenger"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary placeholder:text-brand-dim"
              />
              <User className="w-4 h-4 text-brand-dim absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="reg-email" className="text-xs font-semibold text-brand-text">
              Email Address
            </label>
            <div className="relative">
              <input
                id="reg-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@winterarc.pro"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary placeholder:text-brand-dim"
              />
              <Mail className="w-4 h-4 text-brand-dim absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="reg-pwd" className="text-xs font-semibold text-brand-text">
              Password (min 6 characters)
            </label>
            <div className="relative">
              <input
                id="reg-pwd"
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

          <div className="space-y-1.5">
            <label htmlFor="reg-confirm" className="text-xs font-semibold text-brand-text">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="reg-confirm"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary placeholder:text-brand-dim"
              />
              <Lock className="w-4 h-4 text-brand-dim absolute left-3.5 top-3.5" />
            </div>
          </div>

          <Button variant="primary" size="lg" type="submit" className="w-full mt-2" isLoading={loading}>
            Create Account
          </Button>
        </form>

        <div className="pt-4 border-t border-brand-border text-center text-xs text-brand-muted">
          Already have an account?{' '}
          <Link to="/login" state={state} className="text-brand-primary font-semibold hover:underline">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
};
