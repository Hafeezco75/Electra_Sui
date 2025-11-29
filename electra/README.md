# VoltChain - Decentralized Energy Trading Platform

A high-fidelity, animated prototype for a decentralized energy trading platform built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

### Landing Page
- Full-screen hero section with animated power grid background
- Live trading ticker with smooth transitions
- Three glassmorphic cards explaining the platform
- Glowing CTA button with gradient animation

### Dashboard (Consumer View)
- **UserMeter Component**: Circular SVG gauge with breathing animation
  - Displays Meter ID, Energy Balance, and Initial Units
  - Real-time usage percentage
- **Marketplace Feed**: Data grid with energy listings
  - Trust scores with shield icons
  - Fraud detection with suspicious anomaly warnings
  - Hover tooltips for detailed information
- **Purchase Flow**: Holographic receipt modal with QR code

### Dashboard (Producer View)
- **Minting Console**: Complex multi-step flow
  - Oracle verification animation (2-second loading state)
  - Success state with confirmation
  - Progress bar during verification
- **Consumer Top-Up Panel**: 
  - Send tokens to specific meter IDs
  - Particle animation on successful transfer

### Meter Registry
- Search functionality for any wallet address
- Detailed meter information display
- 30-day activity chart with animated bars
- Trust scores and energy statistics

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Design System

### Colors
- **Electric Green** (#00FF94): Available energy, safe transactions
- **Cyber Blue** (#2979FF): Oracle verifications
- **Alert Orange** (#FF9800): Fraud detection, anomalies
- **Dark Base** (#0A0E1A): Background
- **Dark Card** (#131824): Card backgrounds

### Visual Style
- Heavy glassmorphism (translucent cards with backdrop blur)
- Thin borders with subtle glow effects
- Monospace fonts for data values
- Physics-based animations with Framer Motion

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

Navigate to [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to access the dApp.

### Build

```bash
npm run build
npm start
```

## Usage

1. **Landing Page**: Click "Launch App" to enter the dashboard
2. **Connect Wallet**: Click the "Connect Wallet" button in the top bar
3. **Switch Roles**: Use the role switcher to toggle between Consumer and Producer views
4. **Consumer Actions**:
   - View your smart meter with real-time data
   - Browse marketplace listings
   - Purchase energy tokens
   - List unused tokens for sale
5. **Producer Actions**:
   - Mint new energy tokens (with oracle verification)
   - Send tokens to consumers
6. **Meter Registry**: Search for any registered meter by address

## Key Components

- `app/page.tsx` - Landing page with hero and how-it-works sections
- `app/dashboard/page.tsx` - Main dashboard with AnimatePresence role switching
- `components/UserMeter.tsx` - Circular gauge with breathing animation
- `components/MarketplaceFeed.tsx` - Energy listings with enhanced fraud detection (useState managed)
- `components/ElectricityReceipt.tsx` - Holographic purchase receipt modal
- `components/MintingConsole.tsx` - Multi-step minting flow with oracle verification
- `components/ConsumerTopUp.tsx` - Token transfer with particle animation
- `components/MeterRegistry.tsx` - Meter lookup and statistics (useState managed database)

## Animations

- Breathing pulse on the UserMeter gauge
- Particle effects on token transfers
- Loading states with progress bars
- Smooth page transitions with AnimatePresence
- Smooth role switching (Consumer ↔ Producer) with AnimatePresence
- Hover effects on all interactive elements
- Glowing buttons and borders

## Design Features

### Typography Hierarchy
- **Sans-serif fonts** for UI elements (headings, labels, buttons)
- **Monospace fonts** for data values (addresses, hashes, amounts)
- Clear visual distinction between labels and data

### Enhanced Fraud Detection
- Fraudulent listings dimmed to 40% opacity
- Prominent "FRAUD ALERT" badge with pulsing icon
- Detailed warning tooltips on hover
- Disabled purchase buttons for flagged items
- Warning banner showing suspicious listing count
- Visual discouragement from interacting with fraudulent listings

### State Management
- Mock data managed with `useState` hooks
- Marketplace listings dynamically managed
- Meter registry database in component state
- Easy to extend with real API integration

## License

MIT
