# Marketplace Implementation Guide

## Changes Made:

### 1. Updated Listing Interface
```typescript
interface Listing {
  id: string;
  seller: string;
  sellerName: string;          // NEW: Display name
  amount: number;
  pricePerWh: number;           // NEW: Price per Wh
  totalPriceSUI: number;        // NEW: Total in SUI
  totalPriceUSDC: number;       // NEW: Total in USDC
  trustScore: number;
  isSuspicious?: boolean;
  location: string;             // NEW: Geographic location
  verified: boolean;            // NEW: Verification status
}
```

### 2. New State Variables
```typescript
const [showPaymentModal, setShowPaymentModal] = useState(false);
const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
const [selectedPayment, setSelectedPayment] = useState<"SUI" | "USDC">("SUI");
```

### 3. Payment Modal Component
Create a modal that shows:
- Listing details
- Payment method selector (SUI/USDC tabs)
- Price in selected currency
- Confirm/Cancel buttons

### 4. Card Redesign
Each card should show:
- Seller name with verification badge
- Location with map pin
- Energy amount
- Price per Wh
- Total price in both currencies
- Trust score
- Buy button

### 5. Responsive Design
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

## Next Steps:

1. Add payment modal component
2. Update card layout with new fields
3. Add SUI/USDC icons
4. Implement payment selection logic
5. Update receipt to show payment method

## Icons Needed:
- BadgeCheck (verification)
- MapPin (location)
- DollarSign (USDC)
- Zap (SUI logo placeholder)
