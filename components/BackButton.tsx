'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface BackButtonProps {
  href?: string;
  onClick?: () => void;
}

export function BackButton({ href, onClick }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="fixed top-4 left-4 z-50 p-3 rounded-full glass-morphism border border-white/20"
      aria-label="Go back"
    >
      <ArrowLeft className="w-5 h-5" />
    </motion.button>
  );
}
