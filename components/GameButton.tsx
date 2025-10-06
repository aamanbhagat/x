'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { hapticMedium } from '@/lib/utils/haptics';

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

  const handleClick = async () => {
    if (disabled) return;
    
    // Trigger haptic feedback
    await hapticMedium();
    
    // Call the onClick handler
    if (onClick) {
      onClick();
    }
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ 
        scale: disabled ? 1 : 0.92,
        rotate: disabled ? 0 : [0, -1, 1, -1, 0],
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      onClick={handleClick}
      type={type}
      disabled={disabled}
      className={cn(
        'rounded-xl font-semibold shadow-lg transition-all duration-150',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'hover:shadow-xl hover:brightness-110',
        'active:shadow-inner',
        'relative overflow-hidden',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {/* Ripple effect overlay */}
      <motion.span
        className="absolute inset-0 bg-white/20"
        initial={{ scale: 0, opacity: 0.5 }}
        whileTap={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
