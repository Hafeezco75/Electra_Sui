# VoltChain Visual Guide

## Typography Hierarchy

### Labels (Sans-serif)
```
Font: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto
Used for:
- Headings (h1, h2, h3, etc.)
- Button text
- Labels ("Meter ID", "Amount", "Price", etc.)
- Descriptions and body text
- Navigation items
```

### Data Values (Monospace)
```
Font: Courier New, Consolas, Monaco
Used for:
- Wallet addresses (0x742d...)
- Meter IDs (0x8f3c2a1b...)
- Energy amounts (2,450 Wh)
- Prices (0.075 ETH)
- Trust scores (98%)
- All numeric values
- Input fields
```

## Fraud Detection Visual States

### Normal Listing
```
Opacity: 100%
Background: transparent
Border: border-dark-border/50
Hover: bg-white/5
Cursor: pointer
Button: "Buy" (enabled, cyber blue)
```

### Fraudulent Listing
```
Opacity: 40% (DIMMED)
Background: bg-alert/10 (orange tint)
Border: border-alert/30 (orange border)
Hover: no effect
Cursor: not-allowed
Button: "Flagged" (disabled, faded orange)
Badge: "FRAUD ALERT" with pulsing icon
```

### Fraud Warning Tooltip
```
Trigger: Hover over fraud badge
Size: 288px wide (w-72)
Border: 2px solid alert/70
Background: glass with alert/10 tint
Content:
  - ⚠️ Suspicious Anomaly Detected (bold, alert color)
  - Description of the anomaly
  - Disclaimer text (italic, smaller)
Animation: Fade in from top
```

### Fraud Warning Banner
```
Position: Top of marketplace
Visibility: Only when suspicious listings exist
Background: glass with alert/10 tint
Border: 2px solid alert/50
Icon: Pulsing AlertTriangle
Content: Count of suspicious listings + explanation
```

## Animation Timings

### Role Switching (Consumer ↔ Producer)
```
Duration: 300ms
Type: Fade + Slide
Exit: opacity 0, x: -20
Enter: opacity 1, x: 0
Mode: wait (one exits before other enters)
```

### Marketplace Listing Stagger
```
Each row: 100ms delay increment
Row 1: 0ms
Row 2: 100ms
Row 3: 200ms
Row 4: 300ms
```

### Oracle Verification
```
Progress bar: 2000ms (2 seconds)
Fade in: 200ms
Success state: Instant
```

### Particle Animation (Token Transfer)
```
Particles: 12 total
Duration: 1500ms
Spread: Random 200px radius
Opacity: 1 → 0
Scale: 1 → 0
```

## Color Usage

### Electric Green (#00FF94)
- Available energy
- Safe transactions
- Success states
- Primary CTAs
- Meter balance display

### Cyber Blue (#2979FF)
- Oracle verifications
- Producer role
- Secondary actions
- Trust indicators

### Alert Orange (#FF9800)
- Fraud detection
- Warnings
- Anomalies
- Disabled states for suspicious items

### Dark Palette
- Base: #0A0E1A (background)
- Card: #131824 (card backgrounds)
- Border: #1E2433 (borders)

## Glassmorphism Effect

```css
Background: rgba(255, 255, 255, 0.05)
Backdrop Filter: blur(48px)
Border: 1px solid rgba(255, 255, 255, 0.1)

On Hover:
Background: rgba(255, 255, 255, 0.1)
Border: 1px solid rgba(255, 255, 255, 0.2)
```

## Component States

### UserMeter Gauge
- Breathing animation: 3s ease-in-out infinite
- Pulse scale: 1 → 1.02 → 1
- SVG circle animation: 2s ease-out

### Minting Console States
1. **Idle**: Input enabled, "Prepare Mint" button
2. **Verifying**: Loading spinner, progress bar, 2s duration
3. **Verified**: Green checkmark, "Mint Energy Tokens" button
4. **Minting**: Loading state, disabled
5. **Complete**: Success message, auto-reset after 2s

### Marketplace Interaction
- Normal listing: Full opacity, hover effects, clickable
- Fraudulent listing: 40% opacity, no hover, disabled
- Tooltip: Appears on badge hover, detailed warning
- Banner: Always visible when fraud detected

## Responsive Breakpoints

```
Mobile: < 768px (single column)
Tablet: 768px - 1024px (2 columns)
Desktop: > 1024px (full layout with sidebar)
```

## Accessibility

- All interactive elements have focus states
- Disabled buttons have reduced opacity + cursor-not-allowed
- Color contrast meets WCAG AA standards
- Fraud warnings use multiple indicators (color, icon, text, opacity)
- Animations respect prefers-reduced-motion (can be added)
