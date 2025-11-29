"use client";

import { motion } from "framer-motion";
import { ExternalLink, Network, Package } from "lucide-react";
import { CONTRACT_ADDRESS, NETWORK } from "@/types/contract";

export default function ContractInfo() {
  const explorerUrl = `https://suiscan.xyz/${NETWORK}/object/${CONTRACT_ADDRESS}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-4 border border-cyber/30"
    >
      <div className="flex items-center gap-2 mb-3">
        <Package className="w-5 h-5 text-cyber" />
        <h3 className="font-bold">Smart Contract</h3>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Network:</span>
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-electric" />
            <span className="font-mono text-electric uppercase">{NETWORK}</span>
          </div>
        </div>
        
        <div>
          <div className="text-gray-400 mb-1">Package ID:</div>
          <div className="flex items-center gap-2">
            <code className="font-mono text-xs text-cyber break-all bg-dark-base px-2 py-1 rounded">
              {CONTRACT_ADDRESS}
            </code>
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyber hover:text-electric transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
