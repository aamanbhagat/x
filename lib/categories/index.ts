import { animals } from './animals';
import { objects } from './objects';
import { celebrities } from './celebrities';
import { sports } from './sports';
import { foodDrinks } from './foodDrinks';
import { vehicles } from './vehicles';
import { brands } from './brands';
import { youtubers } from './youtubers';
import { cricketers } from './cricketers';
import { movies } from './movies';
import { tvShows } from './tvShows';
import { cartoonCharacters } from './cartoonCharacters';
import { superheroes } from './superheroes';
import { bollywoodMovies } from './bollywoodMovies';
import { hollywoodMovies } from './hollywoodMovies';
import { kpopCelebrities } from './kpopCelebrities';
import { videoGames } from './videoGames';
import { adultStars } from './adultStars';

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
  { id: 'cricketers', name: 'Cricketers', icon: '🏏', words: cricketers },
  { id: 'foodDrinks', name: 'Food & Drinks', icon: '🍔', words: foodDrinks },
  { id: 'vehicles', name: 'Vehicles', icon: '🚗', words: vehicles },
  { id: 'brands', name: 'Brands', icon: '🏷️', words: brands },
  { id: 'youtubers', name: 'YouTubers', icon: '🎥', words: youtubers },
  { id: 'movies', name: 'Movies', icon: '🎬', words: movies },
  { id: 'tvShows', name: 'TV Shows', icon: '📺', words: tvShows },
  { id: 'cartoonCharacters', name: 'Cartoon Characters', icon: '🎨', words: cartoonCharacters },
  { id: 'superheroes', name: 'Superheroes', icon: '🦸', words: superheroes },
  { id: 'bollywoodMovies', name: 'Bollywood Movies', icon: '🎭', words: bollywoodMovies },
  { id: 'hollywoodMovies', name: 'Hollywood Movies', icon: '🎞️', words: hollywoodMovies },
  { id: 'kpopCelebrities', name: 'K-Pop & Celebrities', icon: '🎤', words: kpopCelebrities },
  { id: 'videoGames', name: 'Video Games', icon: '🎮', words: videoGames },
  { id: 'adultStars', name: 'Adult Stars', icon: '🌶️', words: adultStars },
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(cat => cat.id === id);
};

export const getAllWords = (): WordPair[] => {
  return categories.flatMap(cat => cat.words);
};
