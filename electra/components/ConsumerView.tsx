"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import UserMeter from "./UserMeter";

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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass rounded-2xl p-4 md:p-5 border border-electric/30 min-w-[120px] md:min-w-[140px] relative overflow-hidden flex-1 md:flex-none"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-electric/10 to-transparent"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Epic Energy Particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 30}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <Zap className="w-5 h-5 text-electric" />
              </motion.div>
            ))}
            <div className="relative z-10">
              <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Available</div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", bounce: 0.5 }}
                className="text-2xl md:text-3xl font-bold font-mono text-electric"
              >
                <motion.span
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(0, 255, 148, 0.5)",
                      "0 0 20px rgba(0, 255, 148, 0.8)",
                      "0 0 10px rgba(0, 255, 148, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  2,450
                </motion.span>
              </motion.div>
              <div className="text-xs text-gray-500 mt-1">Wh</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass rounded-2xl p-4 md:p-5 border border-cyber/30 min-w-[120px] md:min-w-[140px] relative overflow-hidden flex-1 md:flex-none"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyber/10 to-transparent"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            {/* Floating Orbs */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-cyber"
                style={{
                  left: `${30 + i * 20}%`,
                  top: `${40}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}
            <div className="relative z-10">
              <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Unused</div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
                className="text-2xl md:text-3xl font-bold font-mono text-cyber"
              >
                550
              </motion.div>
              <div className="text-xs text-gray-500 mt-1">Wh</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <UserMeter />
    </div>
  );
}
