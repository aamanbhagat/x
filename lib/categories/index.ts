import { animals } from './animals';
import { objects } from './objects';
import { celebrities } from './celebrities';
import { sports } from './sports';
import { foodDrinks } from './foodDrinks';
import { vehicles } from './vehicles';
import { brands } from './brands';
import { youtubers } from './youtubers';

export interface WordPair {
  word: string;
  clue: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  words: WordPair[];
}

export const categories: Category[] = [
  { id: 'animals', name: 'Animals', icon: '🐾', words: animals },
  { id: 'objects', name: 'Objects', icon: '🧱', words: objects },
  { id: 'celebrities', name: 'Celebrities', icon: '🌟', words: celebrities },
  { id: 'sports', name: 'Sports', icon: '⚽', words: sports },
  { id: 'foodDrinks', name: 'Food & Drinks', icon: '🍔', words: foodDrinks },
  { id: 'vehicles', name: 'Vehicles', icon: '🚗', words: vehicles },
  { id: 'brands', name: 'Brands', icon: '🏷️', words: brands },
  { id: 'youtubers', name: 'YouTubers', icon: '🎥', words: youtubers },
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(cat => cat.id === id);
};

export const getAllWords = (): WordPair[] => {
  return categories.flatMap(cat => cat.words);
};
