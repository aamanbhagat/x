# Voting System - Complete Guide

## 🎯 How It Works

The new voting system allows **instant, direct voting** on players. No more sequential "Player 1's turn, Player 2's turn" - everyone votes together by clicking player cards.

## 📱 User Interface

### Main Voting Screen

```
┌─────────────────────────────────────┐
│        ⏱️ 02:48                      │
│     Voting Phase                    │
│  Click on players to add votes      │
├─────────────────────────────────────┤
│  Total Votes Cast: 7               │
├─────────────────────────────────────┤
│  Vote to Eliminate                  │
│                                      │
│  ┌──────────┐  ┌──────────┐        │
│  │ Player 1 │  │ Player 2 │  [3]   │
│  │ 0 votes  │  │ 3 votes  │   (-)  │
│  └──────────┘  └──────────┘        │
│                                      │
│  ┌──────────┐  ┌──────────┐        │
│  │ Player 3 │  │ Player 4 │  [4]   │
│  │ 1 vote   │  │ 4 votes  │   (-)  │
│  └──────────┘  └──────────┘        │
│                                      │
│  💡 Click player to add vote        │
│  💡 Click (-) to remove vote        │
├─────────────────────────────────────┤
│    [Reveal Elimination]             │
└─────────────────────────────────────┘
```

## 🎮 Usage Examples

### Example 1: Simple Voting (5 players, each votes once)

**Scenario**: 5 players vote, all vote for Player 3

**Steps**:
1. Player 1 votes Player 3 → Click "Player 3" card (shows 1 vote)
2. Player 2 votes Player 3 → Click "Player 3" card (shows 2 votes)
3. Player 3 can't vote for themselves (skip)
4. Player 4 votes Player 3 → Click "Player 3" card (shows 3 votes)
5. Player 5 votes Player 3 → Click "Player 3" card (shows 4 votes)

**Result**: Player 3 has 4 votes total

### Example 2: Vote Switching

**Scenario**: 7 players initially vote for Player 7, then 1 person changes to Player 3

**Steps**:
1. Click "Player 7" **7 times** → Player 7 shows "7 votes"
2. Someone changes their mind about Player 3
3. Click (-) on Player 7 → Player 7 now shows "6 votes"
4. Click "Player 3" → Player 3 now shows "1 vote"

**Result**: 
- Player 7: 6 votes
- Player 3: 1 vote
- Total: 7 votes

### Example 3: Multiple Suspects

**Scenario**: Votes are split between 3 players

**Steps**:
1. Click "Player 2" **3 times** → Player 2 shows "3 votes"
2. Click "Player 5" **2 times** → Player 5 shows "2 votes"
3. Click "Player 8" **2 times** → Player 8 shows "2 votes"

**Result**: Player 2 will be eliminated (most votes)

## 🔄 How Vote Counting Works

### Adding Votes
```javascript
// Click Player 2's card
votes = { "Player 2": 1 }

// Click Player 2's card again
votes = { "Player 2": 2 }

// Click Player 5's card
votes = { "Player 2": 2, "Player 5": 1 }
```

### Removing Votes
```javascript
// Current state
votes = { "Player 2": 2, "Player 5": 1 }

// Click (-) on Player 2
votes = { "Player 2": 1, "Player 5": 1 }

// Click (-) on Player 5
votes = { "Player 2": 1 }
// (Player 5 removed from votes object when reaches 0)
```

## 🎨 Visual Indicators

### Player Card States

**No Votes (Default)**
```
┌─────────────────┐
│   Player 1      │
│   0 votes       │
└─────────────────┘
Border: White/20
Background: White/10
```

**Has Votes (Selected)**
```
┌─────────────────┐ [3]
│   Player 1      │ (-)
│   3 votes       │
└─────────────────┘
Border: Purple/500
Background: Purple/500/30
Badge: Purple circle with count
Button: Red (-) to remove
```

## ⌨️ Interactions

### Click Actions

| Action | Result |
|--------|--------|
| Click player card | Add +1 vote to that player |
| Click (-) button | Remove -1 vote from that player |
| Click "Reveal Elimination" | Show confirmation dialog |
| Click "Confirm" | Process elimination |

### Visual Feedback

| Element | Feedback |
|---------|----------|
| Player card | Scale animation on click |
| Vote badge | Appears with animation when first vote added |
| Total counter | Updates immediately |
| (-) button | Only shows when player has votes |

## 🎯 Game Flow

```
1. Timer expires / Players navigate to Vote page
   ↓
2. Vote screen shows all active players
   ↓
3. Players discuss and click player cards to vote
   - Each click = 1 vote
   - Can click multiple times
   - Can remove votes with (-) button
   ↓
4. When ready, click "Reveal Elimination"
   ↓
5. Confirmation dialog appears
   ↓
6. Click "Confirm" to process
   ↓
7. Player with most votes is eliminated
   ↓
8. Check win condition:
   - Spy eliminated? → Civilians win (go to results)
   - Critical state (2 civilians + 1 spy)? → Spies win (go to results)
   - Otherwise → Return to discussion
```

## 💡 Tips for Players

1. **Count Participants**: Make sure total votes = number of active players
2. **Discuss First**: Use discussion phase before voting
3. **Watch the Count**: Total votes counter helps track if everyone voted
4. **Change Your Mind**: Easy to adjust votes before confirming
5. **Visual Clarity**: Player with most votes has highest number

## 🔧 Technical Details

### State Management
```typescript
// Zustand store structure
votes: Record<string, number> // playerName -> voteCount

// Example state
{
  votes: {
    "Player 2": 3,
    "Player 5": 2,
    "Player 7": 2
  }
}
```

### Functions
```typescript
// Add vote
castVote(target: string): void
  - Increments vote count for target
  - Creates entry if doesn't exist

// Remove vote
removeVote(target: string): void
  - Decrements vote count for target
  - Removes entry if reaches 0

// Process elimination
processElimination(): { eliminated: Player, wasSpyEliminated: boolean }
  - Finds player with most votes
  - Marks as inactive
  - Returns elimination details
```

## 🎨 Styling Classes

```css
/* Player card with votes */
.border-purple-500
.bg-purple-500/30
.shadow-lg shadow-purple-500/30

/* Vote badge */
.absolute.-top-2.-right-2
.w-8.h-8.rounded-full
.bg-purple-500
.border-2.border-purple-300

/* Remove button */
.p-2.rounded-full
.bg-red-500/30
.border.border-red-500/50
```

## 📊 Comparison: Old vs New

| Feature | Old System | New System |
|---------|-----------|------------|
| **Voting Method** | Sequential (one at a time) | Direct (all at once) |
| **User Action** | Select + Click button | Click player card |
| **Vote Display** | After all votes cast | Real-time |
| **Vote Changes** | Can't change | Easy with (-) button |
| **Speed** | Slow (wait for each player) | Fast (instant) |
| **UI Elements** | "Cast Vote" button | Direct click cards |
| **Vote Count** | Hidden until end | Always visible |
| **Multiple Votes** | Not supported | Click multiple times |

---

## 🚀 Quick Start

1. Navigate to Vote page (after discussion timer expires)
2. See all active players displayed as cards
3. Click any player card to add a vote
4. Click multiple times to add multiple votes
5. Click (-) button to remove votes if needed
6. Click "Reveal Elimination" when ready
7. Confirm to see results

That's it! The new system is intuitive and fast. 🎉
