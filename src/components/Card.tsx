import React from 'react';
import { clsx } from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: 'none' | 'blue' | 'purple';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  glow = 'none',
  hoverEffect = false,
  ...props
}) => {
  const glowClasses = {
    none: '',
    blue: 'border-brand-primary/30 shadow-glow',
    purple: 'border-brand-purple/30 shadow-glow-purple',
  };

  return (
    <div
      className={clsx(
        'bg-brand-card/90 backdrop-blur-md border border-brand-border rounded-2xl p-6 transition-all duration-300',
        hoverEffect && 'hover:border-brand-border-light hover:bg-brand-card-hover hover:translate-y-[-2px]',
        glowClasses[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
