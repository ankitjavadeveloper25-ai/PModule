import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { config } from '../config/env';
import { AlertCircle, Sparkles, X, Check, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: 'outline' | 'filled_blue' | 'filled_black';
              size?: 'large' | 'medium' | 'small';
              text?: 'signin_with' | 'signup_with' | 'continue_with';
              shape?: 'rectangular' | 'pill' | 'circle' | 'square';
              logo_alignment?: 'left' | 'center';
              width?: number | string;
            }
          ) => void;
          prompt: () => void;
        };
      };
    };
  }
}

interface GoogleSignInButtonProps {
  mode?: 'signin' | 'signup';
  returnTo?: string;
  onError?: (error: string) => void;
  className?: string;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  mode = 'signin',
  returnTo = '/account',
  onError,
  className = '',
}) => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showDevModal, setShowDevModal] = useState(false);
  const [testEmail, setTestEmail] = useState('alex.challenger@gmail.com');
  const googleBtnRef = useRef<HTMLDivElement>(null);

  const isRealGoogleConfigured = Boolean(
    config.googleClientId &&
    config.googleClientId !== 'YOUR_GOOGLE_CLIENT_ID' &&
    config.googleClientId.trim().length > 0
  );

  // Initialize official Google Identity Services if client ID is configured
  useEffect(() => {
    if (!isRealGoogleConfigured) return;

    const checkAndInitGoogle = () => {
      if (window.google?.accounts?.id && googleBtnRef.current) {
        try {
          window.google.accounts.id.initialize({
            client_id: config.googleClientId,
            callback: handleGoogleCredentialResponse,
          });

          // Render the official Google Sign-In button
          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: 'filled_black',
            size: 'large',
            text: mode === 'signup' ? 'signup_with' : 'continue_with',
            shape: 'rectangular',
            width: '100%',
          });
        } catch (err) {
          console.warn('Google Identity Services initialization error:', err);
        }
      }
    };

    if (window.google?.accounts?.id) {
      checkAndInitGoogle();
    } else {
      const timer = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(timer);
          checkAndInitGoogle();
        }
      }, 300);
      return () => clearInterval(timer);
    }
  }, [config.googleClientId, isRealGoogleConfigured, mode]);

  const handleGoogleCredentialResponse = async (response: { credential: string }) => {
    if (!response?.credential) return;
    await processCredential(response.credential);
  };

  const processCredential = async (credential: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await loginWithGoogle(credential);
      navigate(returnTo);
    } catch (err: any) {
      const msg = err?.message || 'Google authentication failed. Please try again.';
      setErrorMessage(msg);
      if (onError) onError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (isRealGoogleConfigured && window.google?.accounts?.id) {
      // Trigger Google One Tap prompt
      window.google.accounts.id.prompt();
    } else {
      // Open developer / demo modal for seamless offline / test authentication
      setShowDevModal(true);
    }
  };

  const handleDevLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowDevModal(false);
    const mockToken = `mock-google-${testEmail.trim()}`;
    await processCredential(mockToken);
  };

  return (
    <div className={`w-full ${className}`}>
      {errorMessage && (
        <div className="mb-3 p-3 rounded-xl bg-brand-rose/10 border border-brand-rose/30 text-xs text-brand-rose flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Official Google Button Container if loaded and configured */}
      {isRealGoogleConfigured && (
        <div ref={googleBtnRef} className="w-full flex justify-center min-h-[44px]" />
      )}

      {/* Branded Google Sign-In Button */}
      {(!isRealGoogleConfigured || isLoading) && (
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={isLoading}
          aria-label={mode === 'signup' ? 'Sign up with Google' : 'Sign in with Google'}
          className="w-full relative flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-brand-surface hover:bg-brand-surface-hover active:bg-brand-card text-white text-sm font-semibold border border-brand-border hover:border-brand-border-light transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:opacity-60 shadow-sm group"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-brand-primary animate-spin" />
              <span>Connecting to Google...</span>
            </div>
          ) : (
            <>
              {/* Official Google 'G' SVG Logo */}
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>

              <span>
                {mode === 'signup' ? 'Sign up with Google' : 'Continue with Google'}
              </span>
            </>
          )}
        </button>
      )}

      {/* Development / Testing Google Sign-In Modal */}
      {showDevModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-brand-card border border-brand-border rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <div className="p-1.5 rounded-lg bg-brand-surface border border-brand-border">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>
                <span>Google Account Sign-In</span>
              </div>
              <button
                type="button"
                onClick={() => setShowDevModal(false)}
                className="text-brand-dim hover:text-white p-1 rounded-lg hover:bg-brand-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-brand-muted leading-relaxed">
              Authenticate instantly using a Google account. The backend will verify the account, generate your Spring Boot JWT, and link your Free or Pro subscription.
            </p>

            <form onSubmit={handleDevLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-text">
                  Google Account Email
                </label>
                <input
                  type="email"
                  required
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="developer@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-bg border border-brand-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              <div className="p-3 rounded-xl bg-brand-surface/60 border border-brand-border text-[11px] text-brand-dim space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-brand-primary">
                  <Sparkles className="w-3.5 h-3.5" /> Production Note:
                </div>
                <p>
                  To enable live Google OAuth popup, set <code className="text-white">VITE_GOOGLE_CLIENT_ID</code> in <code className="text-white">website/.env</code> and <code className="text-white">GOOGLE_CLIENT_ID</code> in the Spring Boot backend.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDevModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-brand-muted hover:text-white rounded-xl hover:bg-brand-surface transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-brand-primary text-brand-bg hover:bg-brand-primary-hover rounded-xl shadow-glow transition-all"
                >
                  <Check className="w-3.5 h-3.5" />
                  Continue with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
