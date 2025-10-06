'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { GradientBackground } from '@/components/GradientBackground';
import { TimerDisplay } from '@/components/TimerDisplay';
import { GameButton } from '@/components/GameButton';
import { useGameStore } from '@/lib/store';
import { Users, Pause, X } from 'lucide-react';

export default function DiscussPage() {
  const router = useRouter();
  const {
    players,
    timerRemaining,
    isTimerPaused,
    pauseTimer,
    tickTimer,
  } = useGameStore();

  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const activePlayers = players.filter(p => p.isActive);
  const activeCivilians = activePlayers.filter(p => !p.isSpy).length;
  const activeSpies = activePlayers.filter(p => p.isSpy).length;

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      tickTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [tickTimer]);

  // Auto-navigate when timer expires
  useEffect(() => {
    if (timerRemaining === 0 && !isTimerPaused) {
      router.push('/vote');
    }
  }, [timerRemaining, isTimerPaused, router]);

  const handlePauseAndVote = () => {
    pauseTimer();
    router.push('/vote');
  };

  const handleExitGame = () => {
    useGameStore.getState().resetGame();
    router.push('/');
  };

  return (
    <GradientBackground>
      <button
        onClick={() => setShowExitConfirm(true)}
        className="fixed top-4 right-4 z-50 p-3 rounded-full glass-morphism border border-white/20 hover:bg-red-500/20"
        aria-label="Exit game"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-morphism rounded-2xl p-6 border border-white/20 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4">Exit Game?</h2>
            <p className="mb-6 opacity-80">
              All progress will be lost. Are you sure you want to exit?
            </p>
            <div className="flex gap-3">
              <GameButton
                onClick={() => setShowExitConfirm(false)}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </GameButton>
              <GameButton
                onClick={handleExitGame}
                variant="danger"
                className="flex-1"
              >
                Exit
              </GameButton>
            </div>
          </motion.div>
        </div>
      )}

      <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl space-y-8"
        >
          {/* Timer */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold">Discussion Phase</h2>
            <TimerDisplay seconds={timerRemaining} size="lg" />
          </div>

          {/* Active Players */}
          <div className="glass-morphism rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Active Players ({activePlayers.length})
            </h3>
            
            {/* Game State Info */}
            <div className="mb-4 pb-4 border-b border-white/20">
              <div className="flex justify-center gap-6 text-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">{activeCivilians}</div>
                  <div className="text-sm opacity-70">👤 Civilians</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{activeSpies}</div>
                  <div className="text-sm opacity-70">🕵️ Spies</div>
                </div>
              </div>
              {activeCivilians === 1 && activeSpies === 1 && (
                <p className="mt-3 text-center text-red-400 font-semibold text-sm animate-pulse">
                  🔥 FINAL ROUND! This elimination decides the winner!
                </p>
              )}
              {activeCivilians === 2 && activeSpies === 1 && (
                <p className="mt-3 text-center text-yellow-400 font-semibold text-sm">
                  ⚠️ Critical State! One more wrong vote leads to final round!
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {activePlayers.map((player) => (
                <div
                  key={player.id}
                  className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 text-center"
                >
                  <p className="font-semibold">{player.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <GameButton
            onClick={handlePauseAndVote}
            size="lg"
            className="w-full"
            variant="secondary"
          >
            <Pause className="w-5 h-5 inline mr-2" />
            Pause & Vote
          </GameButton>

          {/* Instructions */}
          <div className="glass-morphism rounded-2xl p-6 border border-white/20">
            <h3 className="font-semibold mb-3">💬 Discussion Tips</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>• Describe your word without saying it directly</li>
              <li>• Listen carefully to what others say</li>
              <li>• Look for inconsistencies in descriptions</li>
              <li>• The spy must blend in!</li>
              <li>• Game continues until spy is caught or final 1v1 round</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </GradientBackground>
  );
}
