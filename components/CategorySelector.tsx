'use client';

import { motion } from 'framer-motion';
import { categories } from '@/lib/categories';
import { cn } from '@/lib/utils';

interface CategorySelectorProps {
  selected: string;
  onChange: (categoryId: string) => void;
}

export function CategorySelector({ selected, onChange }: CategorySelectorProps) {
  const allCategories = [
    ...categories,
    { id: 'mix', name: 'Mix All', icon: '🔀', words: [] },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {allCategories.map((category) => {
        const isSelected = selected === category.id;
        const isMix = category.id === 'mix';

        return (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(category.id)}
            className={cn(
              'p-4 rounded-xl border-2 transition-all',
              'backdrop-blur-sm flex flex-col items-center gap-2',
              isSelected
                ? isMix
                  ? 'border-transparent bg-gradient-to-br from-red-400 via-yellow-400 to-purple-400 shadow-xl'
                  : 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/30'
                : 'border-white/20 bg-white/10 hover:bg-white/20'
            )}
          >
            <span className="text-3xl">{category.icon}</span>
            <span className={cn(
              'text-sm font-semibold',
              isSelected && isMix && 'text-white'
            )}>
              {category.name}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
