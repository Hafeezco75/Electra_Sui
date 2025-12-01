"use client";

import { motion } from "framer-motion";
import { ExternalLink, Network, Package, Copy, CheckCircle2 } from "lucide-react";
import { CONTRACT_ADDRESS, NETWORK } from "@/types/contract";
import { useState } from "react";

export default function ContractInfo() {
  const [copied, setCopied] = useState(false);
  const explorerUrl = `https://suiscan.xyz/${NETWORK}/object/${CONTRACT_ADDRESS}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 border border-cyber/30 relative overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyber/5 via-electric/5 to-cyber/5"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        style={{
          backgroundSize: "200% 100%",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber/20 to-electric/20 flex items-center justify-center border border-cyber/30"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              <Package className="w-5 h-5 text-cyber" />
            </motion.div>
            <div>
              <h3 className="font-bold text-lg">Smart Contract</h3>
              <p className="text-xs text-gray-500">VoltChain Protocol</p>
            </div>
          </div>

          {/* Network Badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 glass px-4 py-2 rounded-full border border-electric/30"
          >
            <div className="w-2 h-2 rounded-full bg-electric animate-pulse" />
            <Network className="w-4 h-4 text-electric" />
            <span className="font-mono text-sm text-electric uppercase font-bold">
              {NETWORK}
            </span>
          </motion.div>
        </div>

        {/* Package ID Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400 uppercase tracking-wide">Package ID</span>
            <div className="flex items-center gap-2">
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                title="Copy to clipboard"
              >
                {copied ? (
                  <CheckCircle2 className="w-4 h-4 text-electric" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400 hover:text-electric" />
                )}
              </motion.button>
              <motion.a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                title="View on explorer"
              >
                <ExternalLink className="w-4 h-4 text-gray-400 hover:text-cyber" />
              </motion.a>
            </div>
          </div>

          <div className="glass rounded-xl p-4 border border-dark-border bg-dark-base/50">
            <code className="font-mono text-sm text-cyber break-all leading-relaxed">
              {CONTRACT_ADDRESS}
            </code>
          </div>

          {/* Module Info */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <motion.div
              whileHover={{ y: -2 }}
              className="glass rounded-lg p-3 border border-electric/20 text-center"
            >
              <div className="text-xs text-gray-400 mb-1">Smart Meter</div>
              <div className="font-mono text-sm text-electric">electras</div>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              className="glass rounded-lg p-3 border border-cyber/20 text-center"
            >
              <div className="text-xs text-gray-400 mb-1">Energy Market</div>
              <div className="font-mono text-sm text-cyber">marketplace</div>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              className="glass rounded-lg p-3 border border-electric/20 text-center"
            >
              <div className="text-xs text-gray-400 mb-1">Oracle</div>
              <div className="font-mono text-sm text-electric">attestation</div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
