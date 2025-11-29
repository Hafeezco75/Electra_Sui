"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserMeter from "./UserMeter";
import MarketplaceFeed from "./MarketplaceFeed";
import ElectricityReceipt from "./ElectricityReceipt";
import ContractInfo from "./ContractInfo";

interface ConsumerViewProps {
  walletConnected: boolean;
}

export default function ConsumerView({ walletConnected }: ConsumerViewProps) {
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

  if (!walletConnected) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-12 text-center max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-400">
            Please connect your wallet to access the consumer dashboard
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">Consumer Dashboard</h1>
        <p className="text-gray-400">Monitor your energy consumption and purchase tokens</p>
      </motion.div>

      <ContractInfo />
      <UserMeter />
      <MarketplaceFeed onPurchase={handlePurchase} />
      
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
