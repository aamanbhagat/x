'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GameButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

export function GameButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  type = 'button',
}: GameButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white',
    secondary: 'bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white',
    danger: 'bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(
        'rounded-xl font-semibold shadow-lg transition-all duration-150',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'hover:shadow-xl hover:brightness-110',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </motion.button>
  );
}
