'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { GradientBackground } from '@/components/GradientBackground';
import { GameButton } from '@/components/GameButton';
import { BackButton } from '@/components/BackButton';
import { PlayerInputList } from '@/components/PlayerInputList';
import { CategorySelector } from '@/components/CategorySelector';
import { useGameStore } from '@/lib/store';
import { getRandomWord } from '@/lib/utils/getWord';
import { Users, Clock, Target } from 'lucide-react';

export default function SetupPage() {
  const router = useRouter();
  const {
    players,
    spyCount,
    timerDuration,
    category,
    showRoleOnReveal,
    usedWords,
    setPlayers,
    setSpyCount,
    setTimer,
    setCategory,
    toggleShowRole,
    startGame,
  } = useGameStore();

  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [localSpyCount, setLocalSpyCount] = useState(1);
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('animals');

  useEffect(() => {
    setPlayerNames(players.map(p => p.name));
    setLocalSpyCount(spyCount);
    setMinutes(Math.floor(timerDuration / 60));
    setSeconds(timerDuration % 60);
    setSelectedCategory(category);
  }, []);

  const handleStartGame = () => {
    // Update store
    setPlayers(playerNames);
    setSpyCount(localSpyCount);
    setTimer(minutes, seconds);
    setCategory(selectedCategory);

    // Get random word
    const wordData = getRandomWord(selectedCategory, usedWords, selectedCategory === 'mix');
    
    // Store word data
    useGameStore.setState({
      currentWord: wordData.word,
      currentClue: wordData.clue,
      wordCategory: wordData.category,
      usedWords: [...usedWords, wordData.word],
    });

    // Start game
    startGame();
    router.push('/reveal');
  };

  const maxSpies = Math.max(1, playerNames.length - 2);

  return (
    <GradientBackground>
      <BackButton href="/" />
      
      <div className="min-h-screen flex items-center justify-center p-4 pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl space-y-6"
        >
          <h1 className="text-4xl font-bold text-center gradient-text bg-gradient-to-r from-violet-400 via-purple-300 to-pink-300">
            Game Setup
          </h1>

          {/* Players Section */}
          <div className="glass-morphism rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Players</h2>
            </div>
            <PlayerInputList
              players={playerNames}
              onChange={setPlayerNames}
              maxPlayers={12}
              minPlayers={2}
            />
          </div>

          {/* Spy Count */}
          <div className="glass-morphism rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Number of Spies</h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLocalSpyCount(Math.max(1, localSpyCount - 1))}
                className="w-12 h-12 rounded-full bg-purple-500/20 hover:bg-purple-500/30 font-bold text-xl"
              >
                -
              </button>
              <span className="text-3xl font-bold flex-1 text-center">{localSpyCount}</span>
              <button
                onClick={() => setLocalSpyCount(Math.min(maxSpies, localSpyCount + 1))}
                className="w-12 h-12 rounded-full bg-purple-500/20 hover:bg-purple-500/30 font-bold text-xl"
              >
                +
              </button>
            </div>
            <p className="text-sm opacity-70 text-center mt-2">
              Maximum {maxSpies} spies for {playerNames.length} players
            </p>
          </div>

          {/* Timer */}
          <div className="glass-morphism rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Discussion Timer</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm opacity-70 mb-2">Minutes</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-center text-2xl font-bold"
                />
              </div>
              <div>
                <label className="block text-sm opacity-70 mb-2">Seconds</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) => setSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-center text-2xl font-bold"
                />
              </div>
            </div>
            <p className="text-center mt-3 text-lg font-semibold">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </p>
          </div>

          {/* Category */}
          <div className="glass-morphism rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold mb-4">Category</h2>
            <CategorySelector
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>

          {/* Options */}
          <div className="glass-morphism rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold mb-4">Options</h2>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Show Role on Word Reveal</span>
              <input
                type="checkbox"
                checked={showRoleOnReveal}
                onChange={toggleShowRole}
                className="w-6 h-6 rounded accent-purple-500"
              />
            </label>
          </div>

          {/* Start Button */}
          <GameButton
            onClick={handleStartGame}
            size="lg"
            className="w-full"
            disabled={playerNames.length < 2 || (minutes === 0 && seconds === 0)}
          >
            🎯 Start Round
          </GameButton>
        </motion.div>
      </div>
    </GradientBackground>
  );
}
