'use client';

import { formatTime } from '@/lib/utils/timer';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/lib/store';

interface TimerDisplayProps {
  seconds: number;
  size?: 'sm' | 'md' | 'lg';
}

export function TimerDisplay({ seconds, size = 'md' }: TimerDisplayProps) {
  const { timerDuration } = useGameStore();
  
  const isWarning = seconds <= 60 && seconds > 30;
  const isCritical = seconds <= 30 && seconds > 0;

  // Calculate progress (0 to 1, where 1 is full circle, 0 is empty)
  const progress = timerDuration > 0 ? seconds / timerDuration : 0;
  
  // Use absolute values for accurate circle calculations
  const sizeMap = {
    sm: 96,  // 24 * 4 (w-24 = 96px)
    md: 128, // 32 * 4 (w-32 = 128px)
    lg: 192, // 48 * 4 (w-48 = 192px)
  };
  
  const viewBoxSize = sizeMap[size];
  const center = viewBoxSize / 2;
  const radius = center - 10; // Leave space for stroke
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  const sizes = {
    sm: 'w-24 h-24 text-2xl',
    md: 'w-32 h-32 text-3xl',
    lg: 'w-48 h-48 text-5xl',
  };

  const strokeSizes = {
    sm: 4,
    md: 6,
    lg: 8,
  };

  return (
    <motion.div
      animate={isCritical ? { scale: [1, 1.1, 1] } : {}}
      transition={isCritical ? { duration: 1, repeat: Infinity } : {}}
      className="flex items-center justify-center"
    >
      <div className={cn('relative', sizes[size])}>
        {/* Background circle */}
        <svg 
          className="w-full h-full transform -rotate-90"
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            className="stroke-white/20"
            strokeWidth={strokeSizes[size]}
          />
          {/* Progress circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            className={cn(
              'transition-all duration-1000',
              isCritical
                ? 'stroke-red-500'
                : isWarning
                ? 'stroke-orange-500'
                : 'stroke-purple-500'
            )}
            strokeWidth={strokeSizes[size]}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: 'stroke-dashoffset 1s linear'
            }}
          />
        </svg>

        {/* Time text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={cn(
              'font-bold tabular-nums',
              sizes[size].split(' ')[2],
              isCritical && 'text-red-500',
              isWarning && 'text-orange-500'
            )}
          >
            {formatTime(seconds)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
