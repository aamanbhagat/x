'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { hapticLight } from '@/lib/utils/haptics';

interface BackButtonProps {
  href?: string;
  onClick?: () => void;
}

export function BackButton({ href, onClick }: BackButtonProps) {
  const router = useRouter();

  const handleClick = async () => {
    await hapticLight();
    
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: -5 }}
      whileTap={{ scale: 0.9, rotate: -10 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      onClick={handleClick}
      className="fixed top-4 left-4 z-50 p-3 rounded-full glass-morphism border border-white/20 hover:bg-white/10 active:bg-white/20 transition-colors"
      aria-label="Go back"
    >
      <ArrowLeft className="w-5 h-5" />
    </motion.button>
  );
}
