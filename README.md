# Who's The Spy - Social Deduction PWA Game

A fully offline, installable social deduction party game built with Next.js 14+ App Router. Find the spy among your friends!

## 🎮 Features

- **Fully Offline PWA**: Works completely offline after first visit
- **iOS-like Smoothness**: 60fps animations with Framer Motion
- **Beautiful Gradient UI**: Stunning dark mode gradient-first design
- **8 Categories**: 400+ word pairs across diverse categories
- **Mix All Mode**: Random category selection for variety
- **Customizable Settings**: Players, spies, timer, and options
- **Smart Word Rotation**: Never repeats words across sessions
- **Pass-and-Play**: Sequential word reveal for all players
- **Direct Voting System**: Click players to add/remove votes instantly
- **Win Condition Detection**: Automatic game end detection

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### First Time Setup

1. Open [http://localhost:3000](http://localhost:3000)
2. Click "Install" when prompted (on supported browsers)
3. Enjoy the game offline!

## 📱 PWA Installation

### iOS (Safari)
1. Open the game in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Launch from home screen

### Android (Chrome)
1. Open the game in Chrome
2. Tap the menu (⋮)
3. Select "Add to Home Screen"
4. Launch from home screen

### Desktop
1. Open in Chrome/Edge
2. Click install icon in address bar
3. Or use "Install" from menu

## 🎯 How to Play

### Game Setup
1. **Configure Players**: Add 2-12 players with custom names
2. **Set Spy Count**: Choose 1-3 spies (max: players - 2)
3. **Set Timer**: Discussion duration in minutes and seconds
4. **Choose Category**: Select from 8 categories or Mix All
5. **Options**: Toggle role reveal during word display

### Game Flow
1. **Word Reveal**: Each player sees their word secretly
   - Civilians get the SECRET WORD
   - Spies get a RELATED CLUE
2. **Discussion**: Timed discussion phase
   - Describe your word without revealing it
   - Listen for inconsistencies
   - Spies must blend in!
3. **Voting**: Vote to eliminate suspects
   - Click any player to add a vote
   - Click multiple times to add multiple votes (each click = 1 player voting)
   - Click the (-) button to remove a vote
   - Change votes by clicking other players
4. **Elimination**: Reveal eliminated player's role
5. **Continue**: Game continues until win condition met

### Win Conditions
- **Civilians Win**: All spies eliminated (caught during any voting round)
- **Spies Win**: Game reaches critical state (2 civilians + 1 spy) and a civilian is eliminated

### Game Continuation
- Game continues even when civilians are eliminated
- Each eliminated civilian is removed from play
- Discussion timer resumes from where it was paused
- Game only ends when:
  1. A spy is caught (Civilians win immediately), OR
  2. Only 2 civilians and 1 spy remain, then a civilian is voted out (Spies win)

## 📚 Categories

1. **🐾 Animals** - 50+ animal pairs
2. **🧱 Objects** - 50+ everyday objects
3. **🌟 Celebrities** - 50+ famous people
4. **⚽ Sports** - 50+ sports and activities
5. **🍔 Food & Drinks** - 50+ culinary items
6. **🚗 Vehicles** - 50+ transportation
7. **🏷️ Brands** - 50+ well-known brands
8. **🎥 YouTubers** - 50+ content creators
9. **🔀 Mix All** - Random category each round

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React
- **PWA**: next-pwa
- **Font**: Inter (Google Fonts)

## 📁 Project Structure

```
app/
├── layout.tsx          # Root layout with theme
├── page.tsx            # Home screen
├── setup/page.tsx      # Game configuration
├── reveal/page.tsx     # Word reveal phase
├── buffer/page.tsx     # Pre-discussion buffer
├── discuss/page.tsx    # Discussion with timer
├── vote/page.tsx       # Voting interface
└── result/page.tsx     # Game results

lib/
├── store.ts            # Zustand game state
├── theme-store.ts      # Theme management
├── persistence.ts      # LocalStorage utilities
├── categories/         # Word pair data
│   ├── animals.ts
│   ├── objects.ts
│   ├── celebrities.ts
│   ├── sports.ts
│   ├── foodDrinks.ts
│   ├── vehicles.ts
│   ├── brands.ts
│   ├── youtubers.ts
│   └── index.ts
└── utils/
    ├── getWord.ts      # Word selection logic
    ├── timer.ts        # Timer management
    └── utils.ts        # Helper functions

components/
├── ThemeToggle.tsx
├── BackButton.tsx
├── GradientBackground.tsx
├── GameButton.tsx
├── PlayerInputList.tsx
├── TimerDisplay.tsx
├── CategorySelector.tsx
└── WordCard.tsx
```

## 🎨 Design System

### Gradient Schemes

**Light Mode:**
- Primary: `from-violet-400 via-purple-300 to-pink-300`
- Secondary: `from-blue-400 via-cyan-300 to-teal-300`
- Accent: `from-orange-300 via-amber-200 to-yellow-300`

**Dark Mode:**
- Primary: `from-violet-900 via-purple-800 to-indigo-900`
- Secondary: `from-blue-900 via-cyan-800 to-teal-900`
- Accent: `from-orange-800 via-red-800 to-pink-900`

### Animations
- Page transitions: 300ms ease-in-out
- Button interactions: Scale + brightness
- Timer pulse: < 30 seconds warning
- Vote confirmations: Ripple effect

## 💾 Data Persistence

### LocalStorage
- Player names and settings
- Timer configuration
- Last selected category
- Used words history
- Theme preference

### Service Worker
- Offline asset caching
- Category data bundling
- Manifest caching
- Runtime caching

## 🐛 Known Issues & Solutions

### Issue: Word text overflow
**Solution**: Dynamic font sizing based on word length

### Issue: Theme flash on load
**Solution**: Theme applied before hydration

### Issue: Timer not pausing correctly
**Solution**: Exact timestamp tracking on pause/resume

### Issue: Multiple votes per player
**Solution**: Strict vote limit enforcement

## 🔧 Configuration

### Environment Variables
None required - fully static deployment!

### PWA Configuration
Edit `next.config.mjs` for PWA settings:
- Cache strategies
- Offline behavior
- Runtime caching rules

### Adding New Categories
1. Create new file in `lib/categories/`
2. Export `WordPair[]` array
3. Import in `lib/categories/index.ts`
4. Add to `categories` array with icon

## 📈 Performance

- **Lighthouse Score**: 90+ (all metrics)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: Optimized with code splitting

## 🤝 Contributing

This is a portfolio project, but suggestions are welcome!

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📄 License

MIT License - Feel free to use for your own projects!

## 🎯 Roadmap

### Planned Features
- [ ] Sound effects and haptic feedback
- [ ] Game history and statistics
- [ ] Custom word lists
- [ ] Multiplayer sync (WebRTC)
- [ ] Multiple languages (i18n)
- [ ] Achievement system
- [ ] Hard mode variants

### Gameplay Variations
- [ ] Chameleon mode (no word)
- [ ] Team mode (multiple spies)
- [ ] Time attack mode
- [ ] Custom difficulty settings

## 👨‍💻 Author

Built with ❤️ as a portfolio project demonstrating:
- Advanced React patterns
- State management expertise
- PWA implementation
- UI/UX design
- Performance optimization
- Production-ready code

## 🙏 Acknowledgments

- Next.js team for amazing framework
- Tailwind CSS for styling system
- Framer Motion for animations
- Lucide for beautiful icons
- Zustand for simple state management

---

**Enjoy the game! 🎮✨**
