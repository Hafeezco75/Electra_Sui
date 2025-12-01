"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Shield, Check, Loader2 } from "lucide-react";

type MintState = "idle" | "verifying" | "verified" | "minting" | "complete";

export default function MintingConsole() {
  const [energyAmount, setEnergyAmount] = useState("");
  const [mintState, setMintState] = useState<MintState>("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrepareMint = async () => {
    setMintState("verifying");
    
    // Simulate oracle verification
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setMintState("verified");
  };

  const handleMint = async () => {
    setMintState("minting");
    
    // Simulate minting
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setMintState("complete");
    
    // Reset after showing success
    setTimeout(() => {
      setMintState("idle");
      setEnergyAmount("");
    }, 2000);
  };

  return (
    <div className="relative">
      {/* Cyberpunk Container */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-cyber/40 bg-gradient-to-br from-dark-card via-dark-base to-dark-card">
        {/* Tech Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, #2979FF 0px, transparent 1px, transparent 20px),
              repeating-linear-gradient(90deg, #2979FF 0px, transparent 1px, transparent 20px)
            `,
          }} />
        </div>

        {/* Energy Particles */}
        {mounted && [...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyber rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Corner Glow */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-cyber/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-electric/20 blur-3xl" />

        <div className="relative z-10 p-8">
          {/* Futuristic Header */}
          <div className="flex items-center gap-4 mb-8">
            {/* Animated Power Icon */}
            <motion.div
              className="relative w-16 h-16"
            >
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyber/30 to-electric/30 border-2 border-cyber/50 flex items-center justify-center backdrop-blur-sm"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(41, 121, 255, 0.5)",
                    "0 0 40px rgba(0, 255, 148, 0.5)",
                    "0 0 20px rgba(41, 121, 255, 0.5)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Zap className="w-7 h-7 text-cyber" />
                </motion.div>
              </motion.div>
              {/* Energy Rings */}
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-electric/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.div>

            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyber via-electric to-cyan-400 bg-clip-text text-transparent">
                ENERGY FORGE
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-px w-8 bg-gradient-to-r from-cyber to-transparent" />
                <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                  Quantum Minting Protocol
                </p>
              </div>
            </div>
          </div>

      <div className="space-y-6">
        {/* Input */}
        <div>
          <label className="text-sm text-gray-400 mb-2 block">
            Energy Generated (Wh)
          </label>
          <input
            type="number"
            value={energyAmount}
            onChange={(e) => setEnergyAmount(e.target.value)}
            disabled={mintState !== "idle"}
            placeholder="Enter amount"
            className="w-full bg-dark-base border border-dark-border rounded-lg px-4 py-3 font-mono focus:border-cyber focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>

        {/* Oracle Verification Status */}
        <AnimatePresence mode="wait">
          {mintState === "verifying" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass rounded-xl p-6 border border-cyber/50"
            >
              <div className="flex items-center gap-3">
                <Loader2 className="w-6 h-6 text-cyber animate-spin" />
                <div>
                  <div className="font-bold text-cyber">Oracle Verifying...</div>
                  <div className="text-sm text-gray-400">
                    Checking signed meter readings
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4 h-2 bg-dark-base rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyber to-electric"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                />
              </div>
            </motion.div>
          )}

          {mintState === "verified" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-xl p-6 border border-electric/50 bg-electric/5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-electric/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-electric" />
                </div>
                <div>
                  <div className="font-bold text-electric">Verification Complete</div>
                  <div className="text-sm text-gray-400">
                    Oracle signature confirmed
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {mintState === "complete" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-xl p-6 border border-electric/50 bg-electric/5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-electric/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-electric" />
                </div>
                <div>
                  <div className="font-bold text-electric">Tokens Minted!</div>
                  <div className="text-sm text-gray-400">
                    {energyAmount} Wh added to your balance
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="space-y-3">
          {mintState === "idle" && (
            <motion.button
              onClick={handlePrepareMint}
              disabled={!energyAmount}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-cyber/20 text-cyber border border-cyber/50 font-bold py-3 rounded-lg hover:bg-cyber/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Shield className="w-5 h-5" />
              Prepare Mint (Oracle Check)
            </motion.button>
          )}

          {mintState === "verified" && (
            <motion.button
              onClick={handleMint}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-electric text-dark-base font-bold py-3 rounded-lg hover:bg-electric/90 transition-colors flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Mint Energy Tokens
            </motion.button>
          )}

          {mintState === "minting" && (
            <motion.button
              disabled
              className="w-full bg-electric/50 text-dark-base font-bold py-3 rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              Minting...
            </motion.button>
          )}
        </div>

        {/* Info Box */}
        <div className="glass rounded-xl p-4 border border-cyber/30">
          <div className="text-sm text-gray-400 space-y-2">
            <div>
              <strong className="text-cyber">Attestation Flow:</strong>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-xs">
              <li>Smart meter records energy generation (kWh)</li>
              <li>Oracle signs attestation with ED25519 signature</li>
              <li>System validates: attestor address, signature, timestamp</li>
              <li>Only registered producers can mint after validation</li>
              <li>Energy tokens created with attestation proof</li>
            </ol>
          </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}
