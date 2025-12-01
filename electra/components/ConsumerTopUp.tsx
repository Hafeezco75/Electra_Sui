"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

export default function ConsumerTopUp() {
  const [meterId, setMeterId] = useState("");
  const [amount, setAmount] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSend = async () => {
    setIsSending(true);

    // Create particle animation
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
    }));
    setParticles(newParticles);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSending(false);
    setMeterId("");
    setAmount("");
    setParticles([]);
  };

  return (
    <div className="relative">
      {/* Futuristic Container */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-electric/40 bg-gradient-to-br from-dark-card via-dark-base to-dark-card">
        {/* Digital Rain Effect */}
        <div className="absolute inset-0 opacity-5">
          {mounted && [...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-electric to-transparent"
              style={{
                left: `${i * 10}%`,
                height: "100%",
              }}
              animate={{
                y: ["-100%", "100%"],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Energy Beam */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent"
          animate={{
            top: ["0%", "100%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Corner Glows */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-electric/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400/20 blur-3xl" />

        <div className="relative z-10 p-8">
          {/* Futuristic Header */}
          <div className="flex items-center gap-4 mb-8">
            {/* Holographic Send Icon */}
            <motion.div
              className="relative w-16 h-16"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-electric/30 to-cyan-400/30 border-2 border-electric/50 flex items-center justify-center backdrop-blur-sm"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0, 255, 148, 0.5)",
                    "0 0 40px rgba(0, 217, 255, 0.5)",
                    "0 0 20px rgba(0, 255, 148, 0.5)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <motion.div
                  animate={{
                    x: [0, 3, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <Send className="w-7 h-7 text-electric" />
                </motion.div>
              </motion.div>
              {/* Transmission Waves */}
              {mounted && [...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-xl border-2 border-electric/30"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              ))}
            </motion.div>

            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-electric via-cyan-400 to-electric bg-clip-text text-transparent">
                QUANTUM TRANSFER
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-px w-8 bg-gradient-to-r from-electric to-transparent" />
                <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                  Instant Transmission Protocol
                </p>
              </div>
            </div>
          </div>

        <div className="space-y-6">
        <div>
          <label className="text-sm text-gray-400 mb-2 block">
            Consumer Meter ID
          </label>
          <input
            type="text"
            value={meterId}
            onChange={(e) => setMeterId(e.target.value)}
            disabled={isSending}
            placeholder="0x..."
            className="w-full bg-dark-base border border-dark-border rounded-lg px-4 py-3 font-mono focus:border-electric focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-2 block">
            Amount (Wh)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isSending}
            placeholder="Enter amount"
            className="w-full bg-dark-base border border-dark-border rounded-lg px-4 py-3 font-mono focus:border-electric focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>

        <motion.button
          onClick={handleSend}
          disabled={!meterId || !amount || isSending}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-electric text-dark-base font-bold py-3 rounded-lg hover:bg-electric/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSending ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" />
              Sending Tokens...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Tokens
            </>
          )}
        </motion.button>

        {/* Info */}
        <div className="glass rounded-xl p-4 border border-electric/30">
          <div className="text-sm text-gray-400">
            <strong className="text-electric">Producer Top-Up:</strong> After a consumer
            purchases energy units, producers can top up their meter's initial_energy_units.
            Only the registry owner (producer) can perform this operation.
          </div>
        </div>
        </div>
      </div>

      {/* Particle Animation */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: particle.x,
              y: particle.y,
              opacity: 0,
              scale: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 w-3 h-3 bg-electric rounded-full pointer-events-none"
            style={{
              boxShadow: "0 0 10px #00FF94",
            }}
          />
        ))}
      </AnimatePresence>
      </div>
    </div>
  );
}
