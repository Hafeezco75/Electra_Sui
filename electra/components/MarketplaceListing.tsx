"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Zap, DollarSign, Check, Sparkles, TrendingUp } from "lucide-react";

export default function MarketplaceListing() {
  const [amount, setAmount] = useState("");
  const [pricePerWh, setPricePerWh] = useState("");
  const [isListing, setIsListing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const calculatePrices = () => {
    if (!amount || !pricePerWh) return { sui: 0, usdc: 0 };
    const total = parseFloat(amount) * parseFloat(pricePerWh);
    return {
      sui: total,
      usdc: total * 60, // Assuming 1 SUI = $60
    };
  };

  const prices = calculatePrices();

  const handleList = async () => {
    setIsListing(true);
    
    // Simulate listing process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsListing(false);
    setShowSuccess(true);
    
    // Reset after showing success
    setTimeout(() => {
      setShowSuccess(false);
      setAmount("");
      setPricePerWh("");
    }, 3000);
  };

  return (
    <div className="relative">
      {/* Success Alert Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              className="relative"
            >
              {/* Success Particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1.5, 0],
                    x: Math.cos((i * 18) * Math.PI / 180) * 150,
                    y: Math.sin((i * 18) * Math.PI / 180) * 150,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut",
                  }}
                >
                  <Sparkles className="w-6 h-6 text-electric" />
                </motion.div>
              ))}

              {/* Success Card */}
              <motion.div
                className="relative glass rounded-2xl p-8 border-2 border-electric/50 max-w-md"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0, 255, 148, 0.5)",
                    "0 0 40px rgba(0, 255, 148, 0.8)",
                    "0 0 20px rgba(0, 255, 148, 0.5)",
                  ],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {/* Success Icon */}
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-electric/20 border-2 border-electric flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.6 }}
                >
                  <Check className="w-10 h-10 text-electric" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-electric to-cyan-400 bg-clip-text text-transparent"
                >
                  Listed Successfully!
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-gray-400 mb-4"
                >
                  Your energy tokens are now available on the marketplace
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="glass rounded-xl p-4 space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Amount:</span>
                    <span className="font-bold text-electric">{amount} Wh</span>
                  </div>
           