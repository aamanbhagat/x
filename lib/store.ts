import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Player {
  id: string;
  name: string;
  isActive: boolean;
  isSpy: boolean;
  hasVoted: boolean;
  votedFor: string | null;
}

export interface GameState {
  // Configuration
  players: Player[];
  spyCount: number;
  timerDuration: number; // in seconds
  timerRemaining: number;
  category: string;
  showRoleOnReveal: boolean;
  
  // Game State
  phase: 'setup' | 'reveal' | 'buffer' | 'discuss' | 'vote' | 'result';
  currentRevealIndex: number;
  isTimerPaused: boolean;
  
  // Words
  currentWord: string;
  currentClue: string;
  usedWords: string[];
  wordCategory: string; // for mixed mode
  
  // Voting
  votes: Record<string, number>; // target -> vote count
  eliminatedPlayers: string[];
  
  // Actions
  setPlayers: (names: string[]) => void;
  setSpyCount: (count: number) => void;
  setTimer: (minutes: number, seconds: number) => void;
  setCategory: (category: string) => void;
  toggleShowRole: () => void;
  
  startGame: () => void;
  nextReveal: () => void;
  startDiscussion: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  tickTimer: () => void;
  
  castVote: (target: string) => void;
  removeVote: (target: string) => void;
  clearVotes: () => void;
  processElimination: () => { eliminated: Player; wasSpyEliminated: boolean };
  
  checkWinCondition: () => 'civilians' | 'spies' | null;
  resetGame: () => void;
  
  // Persistence
  saveSettings: () => void;
  loadSettings: () => void;
}

const createInitialPlayers = (count: number): Player[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `player-${i + 1}`,
    name: `Player ${i + 1}`,
    isActive: true,
    isSpy: false,
    hasVoted: false,
    votedFor: null,
  }));
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial state
      players: createInitialPlayers(4),
      spyCount: 1,
      timerDuration: 180, // 3 minutes
      timerRemaining: 180,
      category: 'animals',
      showRoleOnReveal: false,
      
      phase: 'setup',
      currentRevealIndex: 0,
      isTimerPaused: false,
      
      currentWord: '',
      currentClue: '',
      usedWords: [],
      wordCategory: '',
      
      votes: {},
      eliminatedPlayers: [],
      
      // Actions
      setPlayers: (names) => set((state) => {
        const newPlayers = names.map((name, i) => ({
          id: `player-${i + 1}`,
          name,
          isActive: true,
          isSpy: false,
          hasVoted: false,
          votedFor: null,
        }));
        return { players: newPlayers };
      }),
      
      setSpyCount: (count) => set({ spyCount: count }),
      
      setTimer: (minutes, seconds) => {
        const total = minutes * 60 + seconds;
        set({ timerDuration: total, timerRemaining: total });
      },
      
      setCategory: (category) => set({ category }),
      
      toggleShowRole: () => set((state) => ({ showRoleOnReveal: !state.showRoleOnReveal })),
      
      startGame: () => set((state) => {
        // Randomly assign spies
        const activePlayers = [...state.players];
        const shuffled = activePlayers.sort(() => Math.random() - 0.5);
        
        shuffled.forEach((player, index) => {
          player.isSpy = index < state.spyCount;
        });
        
        return {
          players: activePlayers,
          phase: 'reveal',
          currentRevealIndex: 0,
        };
      }),
      
      nextReveal: () => set((state) => {
        const nextIndex = state.currentRevealIndex + 1;
        if (nextIndex >= state.players.length) {
          return { phase: 'buffer' };
        }
        return { currentRevealIndex: nextIndex };
      }),
      
      startDiscussion: () => set((state) => ({
        phase: 'discuss',
        isTimerPaused: false,
        timerRemaining: state.timerRemaining,
      })),
      
      pauseTimer: () => set({ isTimerPaused: true }),
      
      resumeTimer: () => set({ isTimerPaused: false }),
      
      tickTimer: () => set((state) => {
        if (state.isTimerPaused) return state;
        
        const newRemaining = Math.max(0, state.timerRemaining - 1);
        
        if (newRemaining === 0) {
          return {
            timerRemaining: 0,
            phase: 'vote',
            isTimerPaused: true,
          };
        }
        
        return { timerRemaining: newRemaining };
      }),
      
      castVote: (target) => set((state) => {
        const newVotes = { ...state.votes };
        
        // Add vote to target
        if (!newVotes[target]) newVotes[target] = 0;
        newVotes[target]++;
        
        return { votes: newVotes };
      }),
      
      removeVote: (target) => set((state) => {
        const newVotes = { ...state.votes };
        
        // Remove vote from target
        if (newVotes[target] && newVotes[target] > 0) {
          newVotes[target]--;
          if (newVotes[target] === 0) delete newVotes[target];
        }
        
        return { votes: newVotes };
      }),
      
      clearVotes: () => set((state) => ({
        votes: {},
        players: state.players.map(p => ({ ...p, hasVoted: false, votedFor: null })),
      })),
      
      processElimination: () => {
        const state = get();
        const { votes, players } = state;
        
        // Find player with most votes
        let maxVotes = 0;
        let eliminated: Player | null = null;
        
        Object.entries(votes).forEach(([target, count]) => {
          if (count > maxVotes) {
            maxVotes = count;
            eliminated = players.find(p => p.name === target) || null;
          }
        });
        
        if (!eliminated) {
          // Fallback: random elimination if no votes
          const activePlayers = players.filter(p => p.isActive);
          eliminated = activePlayers[Math.floor(Math.random() * activePlayers.length)];
        }
        
        const wasSpyEliminated = eliminated.isSpy;
        
        // Update state
        set((state) => ({
          players: state.players.map(p => 
            p.id === eliminated!.id ? { ...p, isActive: false } : p
          ),
          eliminatedPlayers: [...state.eliminatedPlayers, eliminated!.name],
          votes: {},
        }));
        
        return { eliminated, wasSpyEliminated };
      },
      
      checkWinCondition: () => {
        const state = get();
        const activePlayers = state.players.filter(p => p.isActive);
        const activeSpies = activePlayers.filter(p => p.isSpy).length;
        const activeCivilians = activePlayers.filter(p => !p.isSpy).length;
        
        if (activeSpies === 0) return 'civilians';
        if (activeCivilians <= 2 && activeSpies >= 1) return 'spies';
        
        return null;
      },
      
      resetGame: () => set((state) => ({
        phase: 'setup',
        currentRevealIndex: 0,
        isTimerPaused: false,
        timerRemaining: state.timerDuration,
        currentWord: '',
        currentClue: '',
        wordCategory: '',
        votes: {},
        eliminatedPlayers: [],
        players: state.players.map(p => ({
          ...p,
          isActive: true,
          isSpy: false,
          hasVoted: false,
          votedFor: null,
        })),
      })),
      
      saveSettings: () => {
        // Settings are auto-saved via persist middleware
      },
      
      loadSettings: () => {
        // Settings are auto-loaded via persist middleware
      },
    }),
    {
      name: 'game-storage',
      partialize: (state) => ({
        players: state.players.map(p => ({ ...p, isActive: true, isSpy: false, hasVoted: false, votedFor: null })),
        spyCount: state.spyCount,
        timerDuration: state.timerDuration,
        category: state.category,
        showRoleOnReveal: state.showRoleOnReveal,
        usedWords: state.usedWords,
      }),
    }
  )
);
