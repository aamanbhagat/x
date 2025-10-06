'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { GradientBackground } from '@/components/GradientBackground';
import { TimerDisplay } from '@/components/TimerDisplay';
import { GameButton } from '@/components/GameButton';
import { useGameStore } from '@/lib/store';
import { Users, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { hapticLight, hapticMedium } from '@/lib/utils/haptics';

export default function VotePage() {
  const router = useRouter();
  const {
    players,
    timerRemaining,
    votes,
    castVote,
    removeVote,
    clearVotes,
    processElimination,
    checkWinCondition,
    resumeTimer,
  } = useGameStore();

  const [eliminationResult, setEliminationResult] = useState<any>(null);
  const [showConfirmElimination, setShowConfirmElimination] = useState(false);
  const [showVoteLimitWarning, setShowVoteLimitWarning] = useState(false);
  const [showNoVotesWarning, setShowNoVotesWarning] = useState(false);

  const activePlayers = players.filter((p: any) => p.isActive);
  const totalVotes = Object.values(votes).reduce((sum: number, count: any) => sum + (count as number), 0);
  const maxVotes = activePlayers.length; // Maximum votes = number of active players

  const handlePlayerClick = (playerName: string) => {
    // Check if we've reached the vote limit
    if (totalVotes >= maxVotes) {
      hapticMedium();
      setShowVoteLimitWarning(true);
      setTimeout(() => setShowVoteLimitWarning(false), 3000);
      return;
    }
    hapticLight();
    castVote(playerName);
  };

  const handleRemoveVote = (playerName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    hapticLight();
    removeVote(playerName);
  };

  const handleProcessElimination = () => {
    if (totalVotes === 0) {
      setShowNoVotesWarning(true);
      setTimeout(() => setShowNoVotesWarning(false), 3000);
      return;
    }
    const result = processElimination();
    setEliminationResult(result);
    setShowConfirmElimination(false);
  };

  const handleContinue = () => {
    if (!eliminationResult) return;

    // If a spy was eliminated, civilians win immediately
    if (eliminationResult.wasSpyEliminated) {
      router.push('/result');
      return;
    }

    // Check if we've reached the critical endgame state (2 civilians + 1 spy)
    const winCondition = checkWinCondition();
    
    if (winCondition === 'spies') {
      // Spies have won (civilian eliminated at critical state)
      router.push('/result');
    } else {
      // Civilian was eliminated but game continues
      // Return to discussion with remaining players
      clearVotes();
      resumeTimer();
      router.push('/discuss');
    }
  };

  const getVoteCount = (playerName: string): number => {
    return votes[playerName] || 0;
  };

  if (eliminationResult) {
    const winCondition = checkWinCondition();
    const activeCivilians = players.filter((p: any) => p.isActive && !p.isSpy).length;
    const activeSpies = players.filter((p: any) => p.isActive && p.isSpy).length;
    
    return (
      <GradientBackground>
        <div className="min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl space-y-6 text-center"
          >
            <div
              className={cn(
                'glass-morphism rounded-2xl p-8 border-2',
                eliminationResult.wasSpyEliminated
                  ? 'border-green-500/50'
                  : 'border-red-500/50'
              )}
            >
              <h1 className="text-4xl font-bold mb-4">
                {eliminationResult.eliminated.name} Eliminated!
              </h1>
              <p className="text-2xl mb-4">
                {eliminationResult.wasSpyEliminated ? '🕵️ Was a SPY!' : '👤 Was a CIVILIAN'}
              </p>
              <p className="text-lg opacity-80">
                Received {getVoteCount(eliminationResult.eliminated.name)} vote(s)
              </p>
              
              {/* Game State Info */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm opacity-70 mb-2">Remaining Players</p>
                <div className="flex justify-center gap-4 text-lg">
                  <span>👤 {activeCivilians} Civilians</span>
                  <span>🕵️ {activeSpies} Spies</span>
                </div>
                
                {/* Status message */}
                {eliminationResult.wasSpyEliminated ? (
                  <p className="mt-4 text-green-400 font-semibold">
                    ✅ Spy caught! Civilians win!
                  </p>
                ) : winCondition === 'spies' ? (
                  <p className="mt-4 text-red-400 font-semibold">
                    ⚠️ Only 2 civilians remain! Spies win!
                  </p>
                ) : (
                  <p className="mt-4 text-yellow-400 font-semibold">
                    ⚡ Game continues! Return to discussion.
                  </p>
                )}
              </div>
            </div>

            <GameButton
              onClick={handleContinue}
              size="lg"
              className="w-full"
            >
              {eliminationResult.wasSpyEliminated || winCondition ? 'View Results' : 'Continue Discussion'}
            </GameButton>
          </motion.div>
        </div>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      {/* Vote Limit Warning */}
      <AnimatePresence>
        {showVoteLimitWarning && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 glass-morphism rounded-xl p-4 border-2 border-yellow-500/50 bg-yellow-500/10 max-w-md"
          >
            <p className="text-center font-semibold text-yellow-400">
              ⚠️ Maximum votes reached! You can only cast {maxVotes} votes (one per player).
            </p>
            <p className="text-center text-sm opacity-70 mt-1">
              Remove votes to change them.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Votes Warning */}
      <AnimatePresence>
        {showNoVotesWarning && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 glass-morphism rounded-xl p-4 border-2 border-red-500/50 bg-red-500/10 max-w-md"
          >
            <p className="text-center font-semibold text-red-400">
              ⚠️ No votes cast! Click on players to vote.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen flex items-center justify-center p-4 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <TimerDisplay seconds={timerRemaining} size="sm" />
            <h1 className="text-3xl font-bold">Voting Phase</h1>
            <p className="text-lg opacity-80">
              Click on players to add votes
            </p>
          </div>

          {/* Total Votes */}
          <div className="glass-morphism rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <span className="text-sm opacity-70">Total Votes Cast</span>
              <span className="text-2xl font-bold">
                {totalVotes} / {maxVotes}
              </span>
            </div>
            {totalVotes >= maxVotes && (
              <p className="text-xs text-yellow-400 mt-2 text-center">
                ⚠️ Maximum votes reached! Remove votes to change them.
              </p>
            )}
          </div>

          {/* Voting Grid */}
          <div className="glass-morphism rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Vote to Eliminate
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              {activePlayers.map((player: any) => {
                const voteCount = getVoteCount(player.name);

                return (
                  <motion.div
                    key={player.id}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17
                    }}
                    onClick={() => handlePlayerClick(player.name)}
                    className={cn(
                      'relative p-4 rounded-xl border-2 transition-all cursor-pointer',
                      voteCount > 0
                        ? 'border-purple-500 bg-purple-500/30 shadow-lg shadow-purple-500/30'
                        : 'border-white/20 bg-white/10 hover:bg-white/20'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold mb-1">{player.name}</p>
                        <p className="text-sm opacity-70">
                          {voteCount} vote{voteCount !== 1 ? 's' : ''}
                        </p>
                      </div>
                      
                      {voteCount > 0 && (
                        <motion.button
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          onClick={(e) => handleRemoveVote(player.name, e)}
                          className="p-2 rounded-full bg-red-500/30 border border-red-500/50 hover:bg-red-500/50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                    
                    {/* Vote count badge */}
                    {voteCount > 0 && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-500 border-2 border-purple-300 flex items-center justify-center">
                        <span className="text-sm font-bold">{voteCount}</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Instructions */}
          <div className="glass-morphism rounded-xl p-4 border border-white/20 text-sm opacity-70 text-center">
            <p>💡 Click any player to add a vote • Click the (-) button to remove a vote</p>
            <p className="mt-1">Total votes limited to {maxVotes} (one per player)</p>
          </div>
        </motion.div>
      </div>

      {/* Floating Eliminate Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-sm">
        <div className="max-w-2xl mx-auto">
          {showConfirmElimination ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-morphism rounded-2xl p-4 border border-white/20 mb-3"
            >
              <p className="text-center mb-3 font-semibold">
                Eliminate player with most votes?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <GameButton
                  onClick={() => setShowConfirmElimination(false)}
                  variant="secondary"
                  size="md"
                >
                  Cancel
                </GameButton>
                <GameButton
                  onClick={handleProcessElimination}
                  size="md"
                >
                  Confirm
                </GameButton>
              </div>
            </motion.div>
          ) : (
            <>
              {totalVotes < maxVotes && totalVotes > 0 && (
                <p className="text-center text-sm text-yellow-400 mb-2">
                  ⚠️ Only {totalVotes} / {maxVotes} votes cast. You can add more or continue.
                </p>
              )}
              <GameButton
                onClick={() => setShowConfirmElimination(true)}
                size="lg"
                className="w-full"
                disabled={totalVotes === 0}
              >
                Reveal Elimination
              </GameButton>
            </>
          )}
        </div>
      </div>
    </GradientBackground>
  );
}
