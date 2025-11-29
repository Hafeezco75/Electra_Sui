"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

export default function ConsumerTopUp() {
  const [meterId, setMeterId] = useState("");
  const [amount, setAmount] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

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
    <div className="glass rounded-2xl p-8 relative overflow-hidden">
      <div className="flex items-center gap-3 mb-8">
        <Send className="w-6 h-6 text-electric" />
        <h2 className="text-2xl font-bold">Consumer Top-Up</h2>
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
  );
}
