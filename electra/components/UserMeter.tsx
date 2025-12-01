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
    <div className="relative">
      {/* Futuristic Container */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-electric/30 bg-gradient-to-br from-dark-card via-dark-base to-dark-card">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(#00FF94 1px, transparent 1px),
              linear-gradient(90deg, #00FF94 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }} />
        </div>

        {/* Glowing Corner Accents */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-electric/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-400/20 blur-3xl" />
        
        {/* Animated Scan Line */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent"
          animate={{
            top: ["0%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="relative z-10 p-8">
          {/* Header with Holographic Effect */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              {/* Hexagonal Icon Container */}
              <motion.div
                className="relative w-16 h-16"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric to-cyan-400 opacity-20 blur-xl" />
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <motion.polygon
                    points="50 1 95 25 95 75 50 99 5 75 5 25"
                    fill="none"
                    stroke="url(#hexGradient)"
                    strokeWidth="2"
                    animate={{
                      strokeDashoffset: [0, 400],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    strokeDasharray="200 200"
                  />
                  <defs>
                    <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00FF94" />
                      <stop offset="100%" stopColor="#00D9FF" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Activity className="w-7 h-7 text-electric" />
                </div>
              </motion.div>

              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-electric via-cyan-400 to-electric bg-clip-text text-transparent">
                  SMART METER
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-px w-8 bg-gradient-to-r from-electric to-transparent" />
                  <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                    Neural Link Active
                  </p>
                </div>
              </div>
            </div>

            {/* Futuristic Status Display */}
            <div className="flex flex-col items-end gap-2">
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 border border-electric/50"
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(0, 255, 148, 0.3)",
                    "0 0 20px rgba(0, 255, 148, 0.6)",
                    "0 0 10px rgba(0, 255, 148, 0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-electric"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                />
                <span className="text-xs font-mono text-electric font-bold tracking-wider">
                  ONLINE
                </span>
              </motion.div>
              <div className="text-xs text-gray-500 font-mono">
                ID: {meterData.meter_id}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Holographic Gauge */}
            <div className="flex items-center justify-center relative">
              {/* Outer Glow Rings */}
              <motion.div
                className="absolute w-80 h-80 rounded-full border border-electric/20"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <motion.div
                className="absolute w-72 h-72 rounded-full border border-cyan-400/20"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              />

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
      </div>
    </div>
  );
}
