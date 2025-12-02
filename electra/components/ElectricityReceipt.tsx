"use client";

import { motion } from "framer-motion";
import { X, Check, QrCode, Download } from "lucide-react";

interface ReceiptData {
  id: string;
  timestamp: string;
  amount: number;
  price: string;
  seller: string;
}

interface ElectricityReceiptProps {
  data: ReceiptData;
  onClose: () => void;
}

export default function ElectricityReceipt({ data, onClose }: ElectricityReceiptProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-sm w-full"
      >
        {/* Holographic Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-electric/20 via-cyber/20 to-purple-500/20 rounded-2xl blur-xl" />
        
        <div className="relative glass rounded-2xl p-6 border-2 border-electric/30">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Compact Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-14 h-14 rounded-full bg-electric/20 border-2 border-electric flex items-center justify-center mx-auto mb-4"
          >
            <Check className="w-7 h-7 text-electric" />
          </motion.div>

          {/* Compact Title */}
          <h2 className="text-2xl font-bold text-center mb-1 bg-gradient-to-r from-electric to-cyber bg-clip-text text-transparent">
            Purchase Complete
          </h2>
          <p className="text-center text-gray-400 text-sm mb-6">
            Energy tokens transferred
          </p>

          {/* Compact Receipt Details */}
          <div className="space-y-3 mb-6">
            {/* Compact Grid Layout */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass rounded-lg p-3">
                <div className="text-xs text-gray-400 mb-1">Amount</div>
                <div className="font-mono font-bold text-lg">
                  {data.amount.toLocaleString()} Wh
                </div>
              </div>
              <div className="glass rounded-lg p-3">
                <div className="text-xs text-gray-400 mb-1">Price</div>
                <div className="font-mono font-bold text-lg text-electric">
                  {data.price} ETH
                </div>
              </div>
            </div>

            <div className="glass rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Receipt ID</div>
              <div className="font-mono text-electric text-sm">{data.id}</div>
            </div>

            <div className="glass rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Timestamp</div>
              <div className="font-mono text-sm">
                {new Date(data.timestamp).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Single Action Button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-electric text-dark-base py-3 rounded-lg font-bold"
          >
            Done
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
