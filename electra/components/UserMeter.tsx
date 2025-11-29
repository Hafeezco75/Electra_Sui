"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, TrendingUp, Hash } from "lucide-react";

export default function UserMeter() {
  const [unusedTokens, setUnusedTokens] = useState("");
  const [isListing, setIsListing] = useState(false);

  const meterData = {
    id: "0x8f3c2a1b9e7d6c5a4f3e2d1c0b9a8f7e6d5c4b3a",
    meter_id: "METER_0x8f3c2a1b",
    user_address: "0x742d35a3f8b2c1e9",
    balance: 2450,
    initialUnits: 3000,
    unit_per_hour: 100,
    usagePercent: 18.3,
    timestamp: Date.now(),
  };

  const handleListTokens = async () => {
    setIsListing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsListing(false);
    setUnusedTokens("");
  };

  return (
    <div className="glass rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-8">
        <Activity className="w-6 h-6 text-electric" />
        <h2 className="text-2xl font-bold">Your Smart Meter</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Circular Gauge */}
        <div className="flex items-center justify-center">
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg width="280" height="280" viewBox="0 0 280 280">
              {/* Background Circle */}
              <circle
                cx="140"
                cy="140"
                r="120"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="20"
              />
              
              {/* Progress Circle */}
              <motion.circle
                cx="140"
                cy="140"
                r="120"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 120}`}
                strokeDashoffset={`${2 * Math.PI * 120 * (1 - meterData.balance / meterData.initialUnits)}`}
                transform="rotate(-90 140 140)"
                initial={{ strokeDashoffset: 2 * Math.PI * 120 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 120 * (1 - meterData.balance / meterData.initialUnits) }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00FF94" />
                  <stop offset="100%" stopColor="#2979FF" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                className="text-5xl font-bold font-mono text-electric"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {meterData.balance}
              </motion.div>
              <div className="text-gray-400 text-sm mt-2">Energy Tokens</div>
              <div className="flex items-center gap-2 mt-3 text-cyber">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-mono">{meterData.usagePercent}% efficiency</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Meter Info & Actions */}
        <div className="space-y-6">
          {/* Meter ID */}
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2 text-gray-400">
              <Hash className="w-4 h-4" />
              <span className="text-sm">Unique Meter ID</span>
            </div>
            <p className="font-mono text-sm text-electric break-all">
              {meterData.meter_id}
            </p>
          </div>

          {/* User Address */}
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2 text-gray-400">
              <Hash className="w-4 h-4" />
              <span className="text-sm">User Address</span>
            </div>
            <p className="font-mono text-sm text-cyber break-all">
              {meterData.user_address}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-1">Initial Units</div>
              <div className="text-2xl font-bold font-mono">{meterData.initialUnits} Wh</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-1">Current Balance</div>
              <div className="text-2xl font-bold font-mono text-electric">{meterData.balance} Wh</div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="glass rounded-xl p-4">
            <div className="text-gray-400 text-sm mb-1">Unit Per Hour</div>
            <div className="text-xl font-bold font-mono">{meterData.unit_per_hour} Wh/hr</div>
          </div>

          {/* Sell Widget */}
          <div className="glass rounded-xl p-6 border border-electric/30">
            <h3 className="font-bold mb-4">List Unused Tokens</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Amount (Wh)
                </label>
                <input
                  type="number"
                  value={unusedTokens}
                  onChange={(e) => setUnusedTokens(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full bg-dark-base border border-dark-border rounded-lg px-4 py-3 font-mono focus:border-electric focus:outline-none transition-colors"
                />
              </div>
              
              <motion.button
                onClick={handleListTokens}
                disabled={!unusedTokens || isListing}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-electric text-dark-base font-bold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isListing ? "Listing..." : "List on Marketplace"}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
