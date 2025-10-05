'use client';

import { useThemeStore } from '@/lib/theme-store';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { mode, toggleMode } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(mode);
    }
  }, [mode, mounted]);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleMode}
      className="fixed top-4 right-4 z-50 p-3 rounded-full glass-morphism border border-white/20 hover:scale-110 transition-transform"
      aria-label="Toggle theme"
    >
      {mode === 'light' ? (
        <Moon className="w-5 h-5 text-purple-600" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  );
}
