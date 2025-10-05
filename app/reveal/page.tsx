'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { GradientBackground } from '@/components/GradientBackground';
import { WordCard } from '@/components/WordCard';
import { GameButton } from '@/components/GameButton';
import { useGameStore } from '@/lib/store';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function RevealPage() {
  const router = useRouter();
  const {
    players,
    currentRevealIndex,
    currentWord,
    currentClue,
    wordCategory,
    showRoleOnReveal,
    nextReveal,
  } = useGameStore();

  const [wordRevealed, setWordRevealed] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);

  const currentPlayer = players[currentRevealIndex];
  const isLastPlayer = currentRevealIndex === players.length - 1;

  const handleShowWord = () => {
    setWordRevealed(true);
  };

  const handleNextPlayer = () => {
    setWordRevealed(false);
    setHoldProgress(0);
    
    if (isLastPlayer) {
      // Immediately navigate to buffer - no delay
      router.push('/buffer');
    } else {
      nextReveal();
    }
  };

  if (!currentPlayer) {
    router.push('/setup');
    return null;
  }

  const categoryIcon = useGameStore.getState().wordCategory 
    ? '🔀' 
    : '';

  return (
    <GradientBackground>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          {!wordRevealed ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-6"
            >
              <h1 className="text-4xl font-bold">
                {currentPlayer.name}&apos;s Turn
              </h1>
              <p className="text-xl opacity-80">
                Player {currentRevealIndex + 1} of {players.length}
              </p>

              <div className="glass-morphism rounded-2xl p-12 border border-white/20">
                <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-8">
                  Make sure only <strong>{currentPlayer.name}</strong> can see the screen
                </p>
                
                <GameButton
                  onClick={handleShowWord}
                  size="lg"
                  className="w-full"
                >
                  <Eye className="w-5 h-5 inline mr-2" />
                  Show My Word
                </GameButton>
              </div>

              <p className="text-sm opacity-60">
                Tap and hold to reveal your word
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="word"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <WordCard
                word={currentWord}
                clue={currentClue}
                role={currentPlayer.isSpy ? 'spy' : 'civilian'}
                category={wordCategory}
                categoryIcon={categoryIcon}
                showRole={showRoleOnReveal}
                size="lg"
              />

              <div className="text-center space-y-4">
                <p className="text-sm opacity-70">
                  Remember your word. Don&apos;t let others see it!
                </p>
                
                <GameButton
                  onClick={handleNextPlayer}
                  size="lg"
                  className="w-full"
                >
                  {isLastPlayer ? (
                    <>Continue to Game</>
                  ) : (
                    <>
                      Next Player <ArrowRight className="w-5 h-5 inline ml-2" />
                    </>
                  )}
                </GameButton>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </GradientBackground>
  );
}
