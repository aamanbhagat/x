export interface SavedSettings {
  playerNames: string[];
  timerMinutes: number;
  timerSeconds: number;
  lastCategory: string;
  showRoleEnabled: boolean;
  usedWords: string[];
  theme: 'light' | 'dark';
  lastPlayed: string;
}

const STORAGE_KEY = 'whos-the-spy-settings';

export function saveSettings(settings: Partial<SavedSettings>): void {
  if (typeof window === 'undefined') return;
  
  try {
    const current = loadSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): SavedSettings {
  if (typeof window === 'undefined') {
    return getDefaultSettings();
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...getDefaultSettings(), ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
  
  return getDefaultSettings();
}

export function getDefaultSettings(): SavedSettings {
  return {
    playerNames: ['Player 1', 'Player 2', 'Player 3', 'Player 4'],
    timerMinutes: 3,
    timerSeconds: 0,
    lastCategory: 'animals',
    showRoleEnabled: false,
    usedWords: [],
    theme: 'light',
    lastPlayed: new Date().toISOString(),
  };
}

export function clearSettings(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
