import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type GradientScheme = 'primary' | 'secondary' | 'accent';

export interface ThemeState {
  mode: 'dark'; // Always dark mode
  gradientScheme: GradientScheme;
  
  setGradientScheme: (scheme: GradientScheme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'dark',
      gradientScheme: 'primary',
      
      setGradientScheme: (scheme) => set({ gradientScheme: scheme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

// Only dark mode gradients
export const gradients = {
  primary: 'from-violet-900 via-purple-800 to-indigo-900',
  secondary: 'from-blue-900 via-cyan-800 to-teal-900',
  accent: 'from-orange-800 via-red-800 to-pink-900',
};
