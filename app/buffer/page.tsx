'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { GradientBackground } from '@/components/GradientBackground';
import { GameButton } from '@/components/GameButton';
import { BackButton } from '@/components/BackButton';
import { useGameStore } from '@/lib/store';
import { Users, Play } from 'lucide-react';

export default function BufferPage() {
  const router = useRouter();
  const { players, startDiscussion } = useGameStore();
  const activePlayers = players.filter(p => p.isActive);

  const handleStartDiscussion = () => {
    startDiscussion();
    router.push('/discuss');
  };

  return (
    <GradientBackground>
      <BackButton href="/setup" />
      
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl space-y-8 text-center"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6">
                <Users className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            <h1 className="text-4xl font-bold gradient-text bg-gradient-to-r from-violet-400 via-purple-300 to-pink-300">
              Ready to Begin!
            </h1>
            
            <p className="text-xl opacity-80">
              All players have seen their words
            </p>
          </div>

          {/* Active Players Display */}
          <div className="glass-morphism rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Active Players ({activePlayers.length})
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {activePlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30"
                >
                  <p className="font-semibold">{player.name}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <GameButton
              onClick={handleStartDiscussion}
              size="lg"
              className="w-full animate-pulse-slow"
            >
              <Play className="w-6 h-6 inline mr-2" />
              Start Discussion
            </GameButton>
          </motion.div>

          <p className="text-sm opacity-60">
            The timer will start when you begin the discussion
          </p>
        </motion.div>
      </div>
    </GradientBackground>
  );
}
