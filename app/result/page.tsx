'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { GradientBackground } from '@/components/GradientBackground';
import { GameButton } from '@/components/GameButton';
import { useGameStore } from '@/lib/store';
import { Trophy, RotateCcw } from 'lucide-react';

export default function ResultPage() {
  const router = useRouter();
  const {
    players,
    currentWord,
    currentClue,
    wordCategory,
    eliminatedPlayers,
    checkWinCondition,
    resetGame,
  } = useGameStore();

  const winner = checkWinCondition();
  const spies = players.filter(p => p.isSpy);
  const civilians = players.filter(p => !p.isSpy);

  const handlePlayAgain = () => {
    resetGame();
    router.push('/setup');
  };

  return (
    <GradientBackground>
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl space-y-6"
        >
          {/* Winner Announcement */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="text-center space-y-4"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
              <Trophy className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-5xl font-bold gradient-text bg-gradient-to-r from-yellow-400 via-orange-300 to-red-400">
              {winner === 'civilians' ? 'Civilians Win! 🎉' : 'Spies Win! 🕵️'}
            </h1>

            <p className="text-xl opacity-80">
              {winner === 'civilians' 
                ? 'All spies have been eliminated!'
                : 'The spies have survived!'}
            </p>
          </motion.div>

          {/* Word Disclosure */}
          <div className="glass-morphism rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-center">The Words Were...</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-green-500/20 border border-green-500/30">
                <p className="text-sm opacity-70 mb-2">Civilian Word</p>
                <p className="text-3xl font-bold">{currentWord}</p>
              </div>
              
              <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/30">
                <p className="text-sm opacity-70 mb-2">Spy Clue</p>
                <p className="text-3xl font-bold">{currentClue}</p>
              </div>
            </div>

            {wordCategory && (
              <p className="text-center mt-4 text-sm opacity-70">
                Category: {wordCategory}
              </p>
            )}
          </div>

          {/* Spy Reveal - PROMINENT */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5, delay: 0.3 }}
            className="glass-morphism rounded-3xl p-8 md:p-12 border-2 border-red-500/50 bg-red-500/10"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center flex items-center justify-center gap-3">
              🕵️ The Spies Were...
            </h2>
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              {spies.map((spy: any, index: number) => (
                <motion.div
                  key={spy.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                  className="px-6 py-5 rounded-2xl bg-red-500/30 border-2 border-red-400/50 text-center shadow-lg shadow-red-500/20"
                >
                  <p className="text-3xl md:text-4xl font-bold">{spy.name}</p>
                  {!spy.isActive && (
                    <p className="text-lg opacity-80 mt-2">(Eliminated)</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Game Statistics */}
          <div className="glass-morphism rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold mb-4">📊 Game Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm opacity-70">Total Players</p>
                <p className="text-2xl font-bold">{players.length}</p>
              </div>
              <div>
                <p className="text-sm opacity-70">Players Eliminated</p>
                <p className="text-2xl font-bold">{eliminatedPlayers.length}</p>
              </div>
              <div>
                <p className="text-sm opacity-70">Spies</p>
                <p className="text-2xl font-bold">{spies.length}</p>
              </div>
              <div>
                <p className="text-sm opacity-70">Civilians</p>
                <p className="text-2xl font-bold">{civilians.length}</p>
              </div>
            </div>
          </div>

          {/* Action Button - Play Again Only */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <GameButton
              onClick={handlePlayAgain}
              size="lg"
              variant="primary"
              className="w-full text-xl py-6"
            >
              <RotateCcw className="w-6 h-6 inline mr-3" />
              Play Again
            </GameButton>
          </motion.div>
        </motion.div>
      </div>
    </GradientBackground>
  );
}
