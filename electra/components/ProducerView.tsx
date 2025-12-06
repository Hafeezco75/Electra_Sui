"use client";

import { motion } from "framer-motion";
import { Zap, DollarSign, ArrowRight, Users } from "lucide-react";
import MintingConsole from "./MintingConsole";
import ConsumerTopUp from "./ConsumerTopUp";

interface ProducerViewProps {
  walletConnected: boolean;
}

export default function ProducerView({ walletConnected }: ProducerViewProps) {
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
            Please connect your wallet to access the producer dashboard
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 max-w-[1400px] mx-auto">
      {/* Enhanced Header with Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 md:gap-6"
      >
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white via-cyber to-blue-400 bg-clip-text text-transparent">
            Producer Dashboard
          </h1>
          <p className="text-gray-400 text-base md:text-lg">Mint energy tokens and manage distribution</p>
        </div>
        
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass rounded-2xl p-4 md:p-5 border border-electric/30 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-electric/10 to-transparent"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Minting Sparkles */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${30 + (i % 2) * 30}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <Zap className="w-4 h-4 text-electric" />
              </motion.div>
            ))}
            <div className="relative z-10">
              <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Total Minted</div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="text-2xl md:text-3xl font-bold font-mono text-electric"
              >
                15,000
              </motion.div>
              <div className="text-xs text-gray-500 mt-1">Wh</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass rounded-2xl p-4 md:p-5 border border-cyber/30 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyber/10 to-transparent"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            {/* Money Rain */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{
                  left: `${30 + i * 20}%`,
                  top: "10%",
                }}
                animate={{
                  y: [0, 60],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                <DollarSign className="w-5 h-5 text-cyber" />
              </motion.div>
            ))}
            <div className="relative z-10">
              <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Revenue</div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="text-2xl md:text-3xl font-bold font-mono text-cyber"
              >
                2.4
              </motion.div>
              <div className="text-xs text-gray-500 mt-1">ETH</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass rounded-2xl p-4 md:p-5 border border-electric/30 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-electric/10 to-transparent"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            {/* Transfer Arrows */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{
                  left: "20%",
                  top: `${30 + i * 15}%`,
                }}
                animate={{
                  x: [0, 40],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <ArrowRight className="w-4 h-4 text-electric" />
              </motion.div>
            ))}
            <div className="relative z-10">
              <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Transfers</div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-2xl md:text-3xl font-bold font-mono text-electric"
              >
                47
              </motion.div>
              <div className="text-xs text-gray-500 mt-1">Total</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass rounded-2xl p-4 md:p-5 border border-cyber/30 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyber/10 to-transparent"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            />
            {/* Active User Pulses */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{
                  left: `${25 + i * 25}%`,
                  top: "40%",
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <Users className="w-4 h-4 text-cyber" />
              </motion.div>
            ))}
            <div className="relative z-10">
              <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Consumers</div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="text-2xl md:text-3xl font-bold font-mono text-cyber"
              >
                12
              </motion.div>
              <div className="text-xs text-gray-500 mt-1">Active</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Workflow Steps */}
      <div className="space-y-6 md:space-y-8">
        {/* Step 1: Mint Energy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-electric/20 border-2 border-electric flex items-center justify-center font-bold text-electric">
              1
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-300">Mint Energy Tokens</h2>
          </div>
          <MintingConsole />
        </motion.div>

        {/* Step 2: Transfer to Consumers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-cyber/20 border-2 border-cyber flex items-center justify-center font-bold text-cyber">
              2
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-300">Transfer to Consumers</h2>
          </div>
          <ConsumerTopUp />
        </motion.div>
      </div>
    </div>
  );
}
