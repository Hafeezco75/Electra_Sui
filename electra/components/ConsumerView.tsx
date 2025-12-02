"use client";

import { motion } from "framer-motion";
import UserMeter from "./UserMeter";
import ContractInfo from "./ContractInfo";

interface ConsumerViewProps {
  walletConnected: boolean;
}

export default function ConsumerView({ walletConnected }: ConsumerViewProps) {

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
    <div className="space-y-6 md:space-y-8 max-w-[1600px] mx-auto">
      {/* Enhanced Header with Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-start md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white via-electric to-cyan-400 bg-clip-text text-transparent">
            Consumer Dashboard
          </h1>
          <p className="text-gray-400 text-base md:text-lg">Monitor your energy consumption</p>
        </div>
        
        {/* Quick Stats Cards - Top Right */}
        <div className="flex gap-3 md:gap-4">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass rounded-2xl p-4 md:p-5 border border-electric/30 min-w-[120px] md:min-w-[140px] relative overflow-hidden flex-1 md:flex-none"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-electric/10 to-transparent"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative z-10">
              <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Available</div>
              <div className="text-2xl md:text-3xl font-bold font-mono text-electric">2,450</div>
              <div className="text-xs text-gray-500 mt-1">Wh</div>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass rounded-2xl p-4 md:p-5 border border-cyber/30 min-w-[120px] md:min-w-[140px] relative overflow-hidden flex-1 md:flex-none"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyber/10 to-transparent"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <div className="relative z-10">
              <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Unused</div>
              <div className="text-2xl md:text-3xl font-bold font-mono text-cyber">550</div>
              <div className="text-xs text-gray-500 mt-1">Wh</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <ContractInfo />
      <UserMeter />
    </div>
  );
}
