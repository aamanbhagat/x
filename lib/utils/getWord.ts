import { categories, getCategoryById, getAllWords, type WordPair } from '../categories';

interface WordSelection {
  word: string;
  clue: string;
  category: string;
  categoryIcon: string;
}

export function getRandomWord(
  categoryId: string,
  usedWords: string[],
  mixMode: boolean = false
): WordSelection {
  let availableWords: WordPair[] = [];
  let selectedCategory = '';
  let categoryIcon = '';

  if (mixMode || categoryId === 'mix') {
    // Mix All mode: randomly select category
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    availableWords = randomCategory.words;
    selectedCategory = randomCategory.name;
    categoryIcon = randomCategory.icon;
  } else {
    // Specific category
    const category = getCategoryById(categoryId);
    if (!category) {
      // Fallback to animals if category not found
      const fallback = getCategoryById('animals')!;
      availableWords = fallback.words;
      selectedCategory = fallback.name;
      categoryIcon = fallback.icon;
    } else {
      availableWords = category.words;
      selectedCategory = category.name;
      categoryIcon = category.icon;
    }
  }

  // Filter out used words
  const unusedWords = availableWords.filter(
    wp => !usedWords.includes(wp.word)
  );

  // If all words used, reset and use all words
  const wordsToChooseFrom = unusedWords.length > 0 ? unusedWords : availableWords;

  // Random selection
  const selectedPair = wordsToChooseFrom[
    Math.floor(Math.random() * wordsToChooseFrom.length)
  ];

  return {
    word: selectedPair.word,
    clue: selectedPair.clue,
    category: selectedCategory,
    categoryIcon,
  };
}

export function markWordAsUsed(word: string, currentUsedWords: string[]): string[] {
  if (!currentUsedWords.includes(word)) {
    return [...currentUsedWords, word];
  }
  return currentUsedWords;
}

export function clearUsedWords(): void {
  // This will be handled by the store
  if (typeof window !== 'undefined') {
    localStorage.removeItem('used-words');
  }
}
