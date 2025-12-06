"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MarketplaceGrid from "./MarketplaceGrid";
import MarketplaceCarousel from "./MarketplaceCarousel";
import MarketplaceFeed from "./MarketplaceFeed";
import ElectricityReceipt from "./ElectricityReceipt";

export default function MarketplaceView() {
  const [viewMode, setViewMode] = useState<"carousel" | "grid" | "feed">("carousel");
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  const handlePurchase = (listing: any) => {
    const paymentMethod = listing.paymentMethod || "SUI";
    const price = paymentMethod === "USDC" 
      ? listing.totalPriceUSDC.toFixed(2)
      : listing.totalPriceSUI.toFixed(3);
    
    setReceiptData({
      id: `RCP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      amount: listing.amount,
      price: price,
      seller: listing.seller,
      paymentMethod: paymentMethod,
      sellerName: listing.sellerName,
    });
    setShowReceipt(true);
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* View Toggle */}
      <div className="flex items-center gap-2 mb-6">
        <motion.button
          onClick={() => setViewMode("carousel")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
            viewMode === "carousel"
              ? "bg-electric text-dark-base"
              : "bg-dark-base text-gray-400 hover:text-white"
          }`}
        >
          Carousel
        </motion.button>
        <motion.button
          onClick={() => setViewMode("grid")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
            viewMode === "grid"
              ? "bg-electric text-dark-base"
              : "bg-dark-base text-gray-400 hover:text-white"
          }`}
        >
          Grid View
        </motion.button>
        <motion.button
          onClick={() => setViewMode("feed")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
            viewMode === "feed"
              ? "bg-electric text-dark-base"
              : "bg-dark-base text-gray-400 hover:text-white"
          }`}
        >
          Feed View
        </motion.button>
      </div>

      {/* Content */}
      {viewMode === "carousel" ? (
        <MarketplaceCarousel onPurchase={handlePurchase} />
      ) : viewMode === "grid" ? (
        <MarketplaceGrid onPurchase={handlePurchase} />
      ) : (
        <MarketplaceFeed onPurchase={handlePurchase} />
      )}
      
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
