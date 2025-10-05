'use client';

import { ReactNode } from 'react';
import { useThemeStore, gradients } from '@/lib/theme-store';
import { cn } from '@/lib/utils';

interface GradientBackgroundProps {
  children: ReactNode;
  className?: string;
  scheme?: 'primary' | 'secondary' | 'accent';
}

export function GradientBackground({ 
  children, 
  className,
  scheme 
}: GradientBackgroundProps) {
  const { gradientScheme } = useThemeStore();
  const activeScheme = scheme || gradientScheme;
  const gradient = gradients[activeScheme];

  return (
    <div className={cn(
      'min-h-screen w-full bg-gradient-to-br',
      gradient,
      className
    )}>
      {children}
    </div>
  );
}
