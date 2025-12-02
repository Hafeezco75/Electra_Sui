"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import MarketplaceGrid from "./MarketplaceGrid";
import ElectricityReceipt from "./ElectricityReceipt";

export default function MarketplaceView() {
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  const handlePurchase = (listing: any) => {
    setReceiptData({
      id: `RCP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      amount: listing.amount,
      price: listing.price,
      seller: listing.seller,
    });
    setShowReceipt(true);
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <MarketplaceGrid onPurchase={handlePurchase} />
      
      <AnimatePresence>
        {showReceipt && receiptData && (
          <ElectricityReceipt
            data={receiptData}
            onClose={() => setShowReceipt(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
