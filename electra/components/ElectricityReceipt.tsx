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
        className="relative max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Holographic Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-electric/20 via-cyber/20 to-purple-500/20 rounded-3xl blur-xl" />
        
        <div className="relative glass rounded-3xl p-8 border-2 border-electric/30">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 rounded-full bg-electric/20 border-2 border-electric flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-electric" />
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-electric to-cyber bg-clip-text text-transparent">
            Purchase Complete
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Your energy tokens have been transferred
          </p>

          {/* Receipt Details */}
          <div className="space-y-4 mb-8">
            <div className="glass rounded-xl p-4">
              <div className="text-sm text-gray-400 mb-1">Receipt ID</div>
              <div className="font-mono text-electric font-bold">{data.id}</div>
            </div>

            <div className="glass rounded-xl p-4">
              <div className="text-sm text-gray-400 mb-1">Timestamp</div>
              <div className="font-mono">
                {new Date(data.timestamp).toLocaleString()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-xl p-4">
                <div className="text-sm text-gray-400 mb-1">Amount</div>
                <div className="font-mono font-bold text-xl">
                  {data.amount.toLocaleString()} Wh
                </div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-sm text-gray-400 mb-1">Price</div>
                <div className="font-mono font-bold text-xl text-electric">
                  {data.price} ETH
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-4">
              <div className="text-sm text-gray-400 mb-1">Seller</div>
              <div className="font-mono text-sm break-all">{data.seller}</div>
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="glass rounded-xl p-6 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center mb-3">
                <QrCode className="w-24 h-24 text-dark-base" />
              </div>
              <p className="text-xs text-gray-400 text-center">
                Scan to verify on blockchain
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 glass hover:bg-white/10 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download
            </motion.button>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-electric text-dark-base py-3 rounded-lg font-bold"
            >
              Done
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
