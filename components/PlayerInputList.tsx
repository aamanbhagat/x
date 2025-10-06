'use client';

import { useState } from 'react';
import { Plus, Minus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PlayerInputListProps {
  players: string[];
  onChange: (players: string[]) => void;
  maxPlayers?: number;
  minPlayers?: number;
}

export function PlayerInputList({
  players,
  onChange,
  maxPlayers = 12,
  minPlayers = 2,
}: PlayerInputListProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const updatePlayer = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    onChange(newPlayers);
  };

  const handleFocus = (index: number, currentValue: string) => {
    setEditingIndex(index);
    // Clear the input if it's a default "Player X" name
    if (currentValue.match(/^Player \d+$/)) {
      updatePlayer(index, '');
    }
  };

  const addPlayer = () => {
    if (players.length < maxPlayers) {
      onChange([...players, `Player ${players.length + 1}`]);
    }
  };

  const removePlayer = (index: number) => {
    if (players.length > minPlayers) {
      const newPlayers = players.filter((_, i) => i !== index);
      onChange(newPlayers);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Players ({players.length})</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addPlayer}
          disabled={players.length >= maxPlayers}
          className="p-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 text-white disabled:opacity-50"
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>

      <AnimatePresence>
        {players.map((player, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex items-center gap-2"
          >
            <div className="flex-1 relative">
              <input
                type="text"
                value={player}
                onChange={(e) => updatePlayer(index, e.target.value)}
                onFocus={() => handleFocus(index, player)}
                onBlur={() => setEditingIndex(null)}
                className={cn(
                  'w-full px-4 py-3 rounded-xl border-2 transition-all',
                  'bg-white/50 dark:bg-black/30 backdrop-blur-sm',
                  editingIndex === index
                    ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                    : 'border-white/20'
                )}
                maxLength={20}
              />
            </div>
            {players.length > minPlayers && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removePlayer(index)}
                className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-600 dark:text-red-400"
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
