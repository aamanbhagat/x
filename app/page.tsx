'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { GradientBackground } from '@/components/GradientBackground';
import { GameButton } from '@/components/GameButton';
import { HowToPlayModal } from '@/components/HowToPlayModal';
import { Info } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  return (
    <GradientBackground>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-8 safe-area-inset">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-auto space-y-6 text-center"
        >
          {/* Logo/Title - More Compact */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-2"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-2 gradient-text bg-gradient-to-r from-violet-200 via-purple-100 to-pink-100">
              🕵️ Who&apos;s The Spy?
            </h1>
            <p className="text-base md:text-lg opacity-80">
              Find the spy among your friends!
            </p>
          </motion.div>

          {/* Navigation Cards - Proper Spacing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 px-2"
          >
            <GameButton
              onClick={() => router.push('/setup')}
              size="lg"
              className="w-full"
            >
              🎮 Start Game
            </GameButton>

            <GameButton
              onClick={() => setShowHowToPlay(true)}
              variant="secondary"
              size="md"
              className="w-full"
            >
              <Info className="w-5 h-5 inline mr-2" />
              How to Play
            </GameButton>
          </motion.div>

          {/* Footer - Compact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-2 pt-4"
          >
            <p className="text-xs opacity-60">
              A social deduction party game
            </p>
            <p className="text-sm opacity-70 font-medium">
              Made by <span className="gradient-text bg-gradient-to-r from-pink-400 to-purple-400">Aman Bhagat</span> with ❤️
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* How to Play Modal */}
      <HowToPlayModal
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />
    </GradientBackground>
  );
}
