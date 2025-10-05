# Changelog - Who's The Spy Game

## Version 2.0 - Dark Mode Only & Direct Voting System

### 🎨 UI/UX Changes

#### Removed Light Mode
- **Removed** light mode completely - game is now **dark mode only**
- Removed `ThemeToggle` component from layout
- Updated theme store to only support dark mode gradients
- Simplified gradient system - removed light mode gradient definitions
- Updated HTML root to always use `dark` class

#### New Voting System
Complete redesign of the voting mechanism for better user experience:

**Old System:**
- Sequential voting (each player votes one by one)
- Select player → Click "Cast Vote" button
- Tracked individual voter choices
- Required "Player X's Vote" screens

**New System:**
- **Direct voting**: Click any player button to add a vote instantly
- **Multiple votes per player**: Click multiple times to simulate multiple players voting for same person
- **Visual vote counter**: See vote count on each player card
- **Easy vote removal**: Click (-) button to remove one vote
- **Vote switching**: Click different player to move vote from one to another
- **Live vote total**: See total votes cast at top of screen
- **No "Cast Vote" button**: Instant feedback, faster gameplay

### 🎮 Voting Page Features

1. **Player Cards**:
   - Click to add vote (no confirmation needed)
   - Vote count badge appears in top-right corner
   - Purple highlight when has votes
   - (-) minus button appears to remove votes
   - Each click adds +1 vote

2. **Vote Management**:
   - Click player → adds 1 vote
   - Click (-) button → removes 1 vote
   - Click different player → vote switches (removes from old, adds to new)
   - Can click same player 7 times = 7 votes (simulates 7 players voting)

3. **UI Elements**:
   - Total Votes Cast counter at top
   - Vote count displayed under each player name
   - Floating "Reveal Elimination" button at bottom
   - Confirmation dialog before processing elimination
   - Instructions: "💡 Click any player to add a vote • Click the (-) button to remove a vote"

### 📝 Technical Changes

#### Store Updates (`lib/store.ts`)
```typescript
// Old
votes: Record<string, string[]>; // target -> array of voters
castVote: (voter: string, target: string) => void;

// New
votes: Record<string, number>; // target -> vote count
castVote: (target: string) => void;
removeVote: (target: string) => void;
```

#### Vote Page (`app/vote/page.tsx`)
- Removed: currentVoterIndex, selectedTarget, allVotesCast state
- Added: Direct click handlers for add/remove votes
- Added: Floating elimination button with confirmation
- Added: Vote count badges on player cards
- Simplified: No more sequential voting flow

### 🎯 Benefits

1. **Faster Gameplay**: No need to go through each player one by one
2. **More Flexible**: Easy to handle situations where players vote together
3. **Clearer UI**: See all votes at once instead of waiting for sequential reveals
4. **Better UX**: Instant feedback when clicking players
5. **Simpler Code**: Removed complex voter tracking logic

### 📖 Documentation Updates

- Updated README.md with new voting instructions
- Removed light mode references from features
- Added voting system explanation
- Updated "How to Play" section

### 🚀 Migration Notes

If updating from v1.0:
1. Clear browser localStorage (voting data structure changed)
2. Refresh page to load new voting system
3. ThemeToggle component can be deleted (no longer used)

---

## Version 1.0 - Initial Release

- Full PWA with offline support
- 8 categories with 400+ word pairs
- Light/Dark mode toggle
- Sequential voting system
- Multi-round elimination
- Win condition detection
- Settings persistence
