'use client';

import { motion } from 'framer-motion';
import { categories } from '@/lib/categories';
import { cn } from '@/lib/utils';
import { hapticSelection } from '@/lib/utils/haptics';

interface CategorySelectorProps {
  selected: string;
  onChange: (categoryId: string) => void;
}

export function CategorySelector({ selected, onChange }: CategorySelectorProps) {
  const allCategories = [
    ...categories,
    { id: 'mix', name: 'Mix All', icon: '🔀', words: [] },
  ];

  const handleCategoryClick = async (categoryId: string) => {
    await hapticSelection();
    onChange(categoryId);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {allCategories.map((category) => {
        const isSelected = selected === category.id;
        const isMix = category.id === 'mix';

        return (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05, rotate: isSelected ? 0 : 2 }}
            whileTap={{ scale: 0.95, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17
            }}
            onClick={() => handleCategoryClick(category.id)}
            className={cn(
              'p-4 rounded-xl border-2 transition-all',
              'backdrop-blur-sm flex flex-col items-center gap-2',
              'active:shadow-inner',
              isSelected
                ? isMix
                  ? 'border-transparent bg-gradient-to-br from-red-400 via-yellow-400 to-purple-400 shadow-xl'
                  : 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/30'
                : 'border-white/20 bg-white/10 hover:bg-white/20'
            )}
          >
            <motion.span 
              className="text-3xl"
              animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {category.icon}
            </motion.span>
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
