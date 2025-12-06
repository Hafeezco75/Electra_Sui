"use client";

import { motion } from "framer-motion";
import { X, Check, Zap, Sparkles, Star } from "lucide-react";

interface ReceiptData {
  id: string;
  timestamp: string;
  amount: number;
  price: string;
  seller: string;
  paymentMethod?: "SUI" | "USDC";
  sellerName?: string;
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
        {/* Epic Celebration Particles */}
        {[...Array(20)].map((_, i) => {
          const Icon = i % 3 === 0 ? Zap : i % 3 === 1 ? Sparkles : Star;
          return (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                x: Math.cos((i * 18) * Math.PI / 180) * 150,
                y: Math.sin((i * 18) * Math.PI / 180) * 150,
                rotate: [0, 360],
              }}
              transition={{
                duration: 1.5,
                delay: 0.2,
                ease: "easeOut",
              }}
            >
              <Icon className={`w-6 h-6 ${i % 3 === 0 ? 'text-electric' : i % 3 === 1 ? 'text-cyan-400' : 'text-yellow-400'}`} />
            </motion.div>
          );
        })}

        {/* Holographic Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-electric/20 via-cyber/20 to-purple-500/20 rounded-2xl blur-xl"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        
        <div className="relative glass rounded-2xl p-5 border-2 border-electric/30">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Epic Success Icon with Rings */}
          <div className="relative mx-auto mb-3 w-12 h-12">
            {/* Expanding Rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-electric"
                initial={{ scale: 1, opacity: 1 }}
                animate={{
                  scale: [1, 2.5],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.2 + i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            ))}
            
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
              className="relative w-12 h-12 rounded-full bg-electric/20 border-2 border-electric flex items-center justify-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                <Check className="w-6 h-6 text-electric" />
              </motion.div>
            </motion.div>
          </div>

          {/* Compact Title */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-bold text-center mb-1 bg-gradient-to-r from-electric to-cyber bg-clip-text text-transparent"
          >
            Purchase Complete
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-gray-400 text-xs mb-4"
          >
            Energy tokens transferred successfully
          </motion.p>

          {/* Compact Receipt Details */}
          <div className="space-y-2.5 mb-5">
            {/* Amount and Price in 2 columns */}
            <div className="grid grid-cols-2 gap-2.5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="glass rounded-lg p-2.5 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-electric/20 to-transparent"
                  animate={{ x: [-100, 200] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <div className="relative z-10">
                  <div className="text-[10px] text-gray-400 mb-0.5">Amount</div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="font-mono font-bold text-base"
                  >
                    {data.amount.toLocaleString()} Wh
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="glass rounded-lg p-2.5 relative overflow-hidden"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${
                    data.paymentMethod === "USDC" ? "from-electric/20" : "from-cyber/20"
                  } to-transparent`}
                  animate={{ x: [-100, 200] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.5 }}
                />
                <div className="relative z-10">
                  <div className="text-[10px] text-gray-400 mb-0.5">Price Paid</div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className={`font-mono font-bold text-base ${
                      data.paymentMethod === "USDC" ? "text-electric" : "text-cyber"
                    }`}
                  >
                    {data.paymentMethod === "USDC" ? "$" : ""}{data.price} {data.paymentMethod || "SUI"}
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Seller and Payment Method in 2 columns */}
            <div className="grid grid-cols-2 gap-2.5">
              {data.sellerName && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="glass rounded-lg p-2.5"
                >
                  <div className="text-[10px] text-gray-400 mb-0.5">Seller</div>
                  <div className="font-bold text-white text-sm truncate">{data.sellerName}</div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="glass rounded-lg p-2.5"
              >
                <div className="text-[10px] text-gray-400 mb-0.5">Payment</div>
                <div className={`font-bold text-sm ${
                  data.paymentMethod === "USDC" ? "text-electric" : "text-cyber"
                }`}>
                  {data.paymentMethod === "USDC" ? "USDC" : "SUI"}
                </div>
              </motion.div>
            </div>

            {/* Receipt ID and Timestamp combined */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass rounded-lg p-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-gray-400 mb-0.5">Receipt ID</div>
                  <div className="font-mono text-electric text-xs truncate">{data.id}</div>
                </div>
                <div className="flex-1 min-w-0 text-right">
                  <div className="text-[10px] text-gray-400 mb-0.5">Date</div>
                  <div className="font-mono text-xs text-gray-300">
                    {new Date(data.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Epic Action Button */}
          <motion.button
            onClick={onClose}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0, 255, 148, 0.5)" }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full bg-electric text-dark-base py-2.5 rounded-lg font-bold overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: [-200, 200] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <span className="relative z-10">Done</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
