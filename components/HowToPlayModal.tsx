'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Eye, MessageCircle, Vote, Trophy, Zap, Info } from 'lucide-react';
import { GameButton } from './GameButton';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-morphism rounded-3xl border-2 border-purple-500/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 glass-morphism border-b border-white/10 px-6 py-4 flex items-center justify-between rounded-t-3xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Info className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold">How to Play</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Introduction */}
                <div className="text-center space-y-2">
                  <h3 className="text-3xl font-bold gradient-text bg-gradient-to-r from-violet-400 to-pink-400">
                    🕵️ Who&apos;s The Spy?
                  </h3>
                  <p className="text-lg opacity-80">
                    A thrilling social deduction party game where you identify hidden spies through clever discussion!
                  </p>
                </div>

                {/* Game Setup */}
                <div className="glass-morphism rounded-2xl p-5 border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/30 flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-bold">🎮 Game Setup</h4>
                  </div>
                  <ul className="space-y-2 text-sm opacity-90">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span><strong>Players:</strong> 4-12 players recommended for best experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span><strong>Spies:</strong> Choose 1-3 spies (fewer spies = harder for them)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span><strong>Timer:</strong> Set discussion time (3-5 minutes recommended)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span><strong>Categories:</strong> Pick from Animals, Sports, Celebrities, and more!</span>
                    </li>
                  </ul>
                </div>

                {/* Game Flow */}
                <div className="space-y-4">
                  <h4 className="text-xl font-bold flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Game Flow
                  </h4>

                  {/* Step 1 */}
                  <div className="glass-morphism rounded-xl p-4 border border-green-500/20 bg-green-500/5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center flex-shrink-0">
                        <Eye className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-bold text-lg mb-1">1. Word Reveal Phase</h5>
                        <p className="text-sm opacity-80 mb-2">
                          Each player views their word/clue privately. Pass the device around!
                        </p>
                        <div className="grid md:grid-cols-2 gap-3 mt-3">
                          <div className="bg-green-600/20 rounded-lg p-3 border border-green-500/30">
                            <p className="text-xs font-semibold text-green-400 mb-1">👤 CIVILIANS</p>
                            <p className="text-sm">Get the <strong>SECRET WORD</strong></p>
                            <p className="text-xs opacity-70 mt-1">Example: &quot;Basketball&quot;</p>
                          </div>
                          <div className="bg-red-600/20 rounded-lg p-3 border border-red-500/30">
                            <p className="text-xs font-semibold text-red-400 mb-1">🕵️ SPIES</p>
                            <p className="text-sm">Get a <strong>RELATED CLUE</strong></p>
                            <p className="text-xs opacity-70 mt-1">Example: &quot;Ball Sport&quot;</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="glass-morphism rounded-xl p-4 border border-blue-500/20 bg-blue-500/5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-bold text-lg mb-1">2. Discussion Phase</h5>
                        <p className="text-sm opacity-80 mb-2">
                          Describe your word WITHOUT saying it directly. Listen carefully to others!
                        </p>
                        <div className="space-y-2 mt-3">
                          <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                            <p className="text-xs font-semibold mb-1">💡 Strategy for Civilians:</p>
                            <p className="text-xs opacity-80">Give specific details only real word-holders would know. Catch spies being vague!</p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                            <p className="text-xs font-semibold mb-1">🎭 Strategy for Spies:</p>
                            <p className="text-xs opacity-80">Stay general, mimic civilian patterns, and blend in. Don&apos;t get caught!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="glass-morphism rounded-xl p-4 border border-purple-500/20 bg-purple-500/5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center flex-shrink-0">
                        <Vote className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-bold text-lg mb-1">3. Voting Phase</h5>
                        <p className="text-sm opacity-80 mb-2">
                          Vote to eliminate suspects! Click players to add votes.
                        </p>
                        <ul className="space-y-1 text-xs opacity-80">
                          <li>• Click any player&apos;s card to add a vote</li>
                          <li>• Click multiple times = multiple votes (e.g., 7 clicks = 7 people voting)</li>
                          <li>• Click (-) button to remove votes</li>
                          <li>• Player with most votes gets eliminated</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="glass-morphism rounded-xl p-4 border border-orange-500/20 bg-orange-500/5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-500/30 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-bold text-lg mb-1">4. Elimination & Continue</h5>
                        <p className="text-sm opacity-80 mb-2">
                          See who was eliminated and whether to continue or end the game.
                        </p>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10 mt-2">
                          <p className="text-xs font-semibold mb-2">🔄 Game Continuation:</p>
                          <ul className="space-y-1 text-xs opacity-80">
                            <li>✓ Eliminated a civilian? Game continues!</li>
                            <li>✓ Return to discussion with remaining players</li>
                            <li>✓ Keep voting until win condition is met</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Win Conditions */}
                <div className="glass-morphism rounded-2xl p-5 border-2 border-yellow-500/30 bg-yellow-500/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/30 flex items-center justify-center">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-bold">🏆 Win Conditions</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-green-600/20 rounded-xl p-4 border border-green-500/30">
                      <h5 className="font-bold text-green-400 mb-2">👤 Civilians Win</h5>
                      <p className="text-sm opacity-90">
                        Successfully eliminate a spy during any voting round!
                      </p>
                      <p className="text-xs opacity-70 mt-2">
                        Game ends immediately when a spy is caught ✓
                      </p>
                    </div>
                    <div className="bg-red-600/20 rounded-xl p-4 border border-red-500/30">
                      <h5 className="font-bold text-red-400 mb-2">🕵️ Spies Win</h5>
                      <p className="text-sm opacity-90">
                        Survive until only 2 civilians + 1 spy remain, then a civilian is eliminated
                      </p>
                      <p className="text-xs opacity-70 mt-2">
                        Critical state! Spies win at final civilian vote ✓
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="glass-morphism rounded-xl p-4 border border-cyan-500/20">
                  <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                    💡 Pro Tips
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="space-y-2">
                      <p className="opacity-80">
                        <strong className="text-cyan-400">For Civilians:</strong>
                      </p>
                      <ul className="space-y-1 text-xs opacity-70">
                        <li>• Be specific but not too obvious</li>
                        <li>• Watch for vague answers</li>
                        <li>• Build on others&apos; descriptions</li>
                        <li>• Don&apos;t reveal the word directly!</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="opacity-80">
                        <strong className="text-pink-400">For Spies:</strong>
                      </p>
                      <ul className="space-y-1 text-xs opacity-70">
                        <li>• Mirror civilian speech patterns</li>
                        <li>• Use the clue to sound informed</li>
                        <li>• Don&apos;t be the first to speak</li>
                        <li>• Accuse others to deflect suspicion</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Categories Preview */}
                <div className="glass-morphism rounded-xl p-4 border border-pink-500/20">
                  <h4 className="text-lg font-bold mb-3">📚 Available Categories</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <p className="mb-1">🐾</p>
                      <p className="text-xs font-semibold">Animals</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <p className="mb-1">🧱</p>
                      <p className="text-xs font-semibold">Objects</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <p className="mb-1">🌟</p>
                      <p className="text-xs font-semibold">Celebrities</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <p className="mb-1">⚽</p>
                      <p className="text-xs font-semibold">Sports</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <p className="mb-1">🍔</p>
                      <p className="text-xs font-semibold">Food & Drinks</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <p className="mb-1">🚗</p>
                      <p className="text-xs font-semibold">Vehicles</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <p className="mb-1">🏢</p>
                      <p className="text-xs font-semibold">Brands</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <p className="mb-1">📺</p>
                      <p className="text-xs font-semibold">YouTubers</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 glass-morphism border-t border-white/10 px-6 py-4 rounded-b-3xl">
                <GameButton
                  onClick={onClose}
                  size="lg"
                  className="w-full"
                >
                  Got It! Let&apos;s Play 🎮
                </GameButton>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
