'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface WordCardProps {
  word?: string;
  clue?: string;
  role?: 'civilian' | 'spy';
  category?: string;
  categoryIcon?: string;
  showRole?: boolean;
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function WordCard({
  word,
  clue,
  role,
  category,
  categoryIcon,
  showRole = false,
  children,
  size = 'md',
}: WordCardProps) {
  const isSpy = role === 'spy';
  const displayWord = isSpy ? clue : word;

  const sizes = {
    sm: 'p-6 text-2xl',
    md: 'p-8 text-4xl',
    lg: 'p-12 text-6xl',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: 180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'relative rounded-3xl backdrop-blur-md shadow-2xl',
        'bg-gradient-to-br from-white/20 to-white/5',
        'border-2 border-white/30',
        sizes[size]
      )}
    >
      {/* Category badge */}
      {category && categoryIcon && (
        <div className="absolute top-4 right-4">
          <div className="px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-sm flex items-center gap-2">
            <span className="text-lg">{categoryIcon}</span>
            <span className="text-sm font-medium">{category}</span>
          </div>
        </div>
      )}

      {/* Role indicator */}
      {showRole && role && (
        <div className="absolute top-4 left-4">
          <div
            className={cn(
              'px-4 py-2 rounded-full backdrop-blur-sm font-semibold text-sm',
              isSpy
                ? 'bg-red-500/30 text-red-100 border border-red-400/50'
                : 'bg-green-500/30 text-green-100 border border-green-400/50'
            )}
          >
            {isSpy ? '🕵️ You are a Spy' : '✅ You are a Civilian'}
          </div>
        </div>
      )}

      {/* Word display */}
      <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
        {displayWord && (
          <h2
            className={cn(
              'font-bold gradient-text bg-gradient-to-r text-center',
              'from-violet-400 via-purple-300 to-pink-300',
              'dark:from-violet-200 dark:via-purple-100 dark:to-pink-100',
              'px-4 leading-tight break-words max-w-full'
            )}
            style={{
              fontSize: displayWord.length > 15 ? '2rem' : displayWord.length > 10 ? '2.5rem' : '3rem',
            }}
          >
            {displayWord}
          </h2>
        )}
        {children}
      </div>
    </motion.div>
  );
}
