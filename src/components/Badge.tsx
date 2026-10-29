import React from 'react';
import { clsx } from 'clsx';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'neutral' | 'danger';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
}) => {
  const base = 'inline-flex items-center font-semibold rounded-full uppercase tracking-wider';

  const variants = {
    primary: 'bg-brand-primary/10 text-brand-primary border border-brand-primary/30',
    secondary: 'bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/30',
    success: 'bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/30',
    warning: 'bg-brand-amber/10 text-brand-amber border border-brand-amber/30',
    neutral: 'bg-brand-border/40 text-brand-muted border border-brand-border-light',
    danger: 'bg-brand-rose/10 text-brand-rose border border-brand-rose/30',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return <span className={clsx(base, variants[variant], sizes[size], className)}>{children}</span>;
};
