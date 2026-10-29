import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Download, ShieldCheck, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isPro = profile?.subscription?.isPro;

  const navLinks = [
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Download', path: '/download' },
    { name: 'Setup Guide', path: '/guide' },
    { name: 'FAQ', path: '/faq' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-brand-border bg-brand-bg/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-xl p-1">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-brand-surface to-brand-card border border-brand-border group-hover:border-brand-primary/50 transition-colors shadow-glow">
              <img src="/icons/winterarc.png" alt="Winter ARC Pro Logo" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-brand-primary transition-colors">
                  Winter ARC
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md font-bold bg-brand-primary/10 text-brand-primary border border-brand-primary/30 uppercase tracking-widest">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-brand-dim hidden sm:block">Windows Discipline Suite</p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'text-brand-primary bg-brand-card border border-brand-border'
                    : 'text-brand-muted hover:text-white hover:bg-brand-card/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action CTAs & Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/account">
                  <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-brand-card border border-brand-border hover:border-brand-primary/50 transition-all">
                    <UserIcon className="w-4 h-4 text-brand-primary" />
                    <span className="text-sm font-semibold text-white">
                      {user?.fullName?.split(' ')[0] || 'Account'}
                    </span>
                    {isPro && (
                      <Badge variant="primary" size="sm" className="hidden lg:inline-flex">
                        <ShieldCheck className="w-3 h-3 mr-1 inline" /> PRO
                      </Badge>
                    )}
                  </div>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-brand-muted hover:text-white hover:bg-brand-card border border-transparent hover:border-brand-border transition-colors"
                  title="Sign Out"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}

            <Link to="/download">
              <Button variant="primary" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                Download for Windows
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <Link to="/download">
              <Button variant="primary" size="sm" className="px-3 py-1.5 text-xs">
                Download
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-brand-muted hover:text-white bg-brand-card border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-primary"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-brand-border bg-brand-bg px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-base font-medium ${
                isActive(link.path)
                  ? 'bg-brand-card text-brand-primary border border-brand-border'
                  : 'text-brand-muted hover:text-white hover:bg-brand-card/40'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-brand-border space-y-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-brand-card text-white font-medium"
                >
                  <span className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-brand-primary" /> {user?.fullName || 'My Account'}
                  </span>
                  {isPro && <Badge variant="primary">PRO ACTIVE</Badge>}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-brand-rose hover:bg-brand-card/40 rounded-xl"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="md" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" size="md" className="w-full">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
