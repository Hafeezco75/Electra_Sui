"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Shield, Check, Loader2, Hammer, Sparkles, Coins } from "lucide-react";

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
      {/* Full-Screen Forge Animation Overlay */}
      <AnimatePresence>
        {mintState === "minting" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Animated Background Gradient */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(circle at center, rgba(0, 255, 148, 0.1) 0%, transparent 70%)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              {/* Professional Anvil Base with Glow */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-16"
                initial={{ scale: 0, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              >
                <div className="relative">
                  {/* Anvil Body */}
                  <div className="w-56 h-12 bg-gradient-to-b from-gray-400 via-gray-600 to-gray-800 rounded-t-3xl shadow-2xl border-t-4 border-gray-300" />
                  {/* Anvil Base */}
                  <div className="w-48 h-4 mx-auto bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-lg" />
                  {/* Impact Glow */}
                  <motion.div
                    className="absolute inset-0 bg-electric/30 rounded-t-3xl blur-xl"
                    animate={{
                      opacity: [0, 0.8, 0],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
              
              {/* Professional Hammer with Trail */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                  rotate: [-25, -85, -25],
                  y: [-70, 40, -70],
                  x: [-35, 0, -35],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  ease: [0.45, 0, 0.55, 1],
                }}
              >
                <div className="relative">
                  {/* Hammer Icon with Glow */}
                  <motion.div
                    className="relative"
                    animate={{
                      filter: [
                        "drop-shadow(0 0 20px rgba(0, 255, 148, 0.5))",
                        "drop-shadow(0 0 40px rgba(0, 255, 148, 1))",
                        "drop-shadow(0 0 20px rgba(0, 255, 148, 0.5))",
                      ],
                    }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <Hammer className="w-32 h-32 text-electric stroke-[1.5]" />
                  </motion.div>
                  {/* Motion Blur Trail */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`trail-${i}`}
                      className="absolute inset-0"
                      animate={{
                        opacity: [0, 0.3, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    >
                      <Hammer className="w-32 h-32 text-electric/30 stroke-[1.5]" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Advanced Impact Sparks with Trails */}
              {[...Array(16)].map((_, i) => {
                const angle = (i * 22.5) * Math.PI / 180;
                return (
                  <motion.div
                    key={`spark-${i}`}
                    className="absolute left-1/2 top-1/2"
                    animate={{
                      x: [0, Math.cos(angle) * 180],
                      y: [0, Math.sin(angle) * 180],
                      opacity: [0, 1, 0.5, 0],
                      scale: [0, 1.5, 1, 0],
                    }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      delay: 0.25 + (i * 0.03),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-electric" />
                  </motion.div>
                );
              })}
              
              {/* Energy Waves from Impact */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`wave-${i}`}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-electric rounded-full"
                  style={{ width: 100, height: 100 }}
                  animate={{
                    scale: [0, 3],
                    opacity: [0.8, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: 0.25 + i * 0.3,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Professional Energy Orbs Rising */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`orb-${i}`}
                  className="absolute left-1/2 top-1/2 translate-y-16"
                  animate={{
                    y: [0, -160],
                    x: [0, (i - 6) * 25],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: "easeOut",
                  }}
                >
                  <div className="relative">
                    <div className="w-4 h-4 bg-gradient-to-br from-electric to-cyan-400 rounded-full" />
                    <motion.div
                      className="absolute inset-0 bg-electric rounded-full blur-md"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                      }}
                    />
                  </div>
                </motion.div>
              ))}

              {/* Professional Token Coins with Physics */}
              {[...Array(30)].map((_, i) => {
                const randomX = (Math.random() - 0.5) * 600;
                const randomY = -200 - Math.random() * 150;
                const randomRotation = Math.random() > 0.5 ? 1080 : -1080;
                return (
                  <motion.div
                    key={`coin-${i}`}
                    className="absolute left-1/2 top-1/2"
                    initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
                    animate={{
                      scale: [0, 1.2, 1.2, 1],
                      x: [0, randomX * 0.3, randomX],
                      y: [0, randomY, 400],
                      rotate: [0, randomRotation * 0.5, randomRotation],
                      opacity: [0, 1, 1, 0.8, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      delay: 0.3 + i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="relative">
                      <Coins className="w-12 h-12 text-electric stroke-[1.5]" />
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 0.3,
                          repeat: Infinity,
                        }}
                      >
                        <Coins className="w-12 h-12 text-cyan-400 stroke-[1]" />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Forging Text - Centered at Top */}
              <motion.div
                className="absolute top-[15%] left-1/2 -translate-x-1/2 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <motion.h2
                  className="text-7xl font-bold mb-4"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(0, 255, 148, 0.5)",
                      "0 0 40px rgba(0, 255, 148, 1)",
                      "0 0 20px rgba(0, 255, 148, 0.5)",
                    ],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <span className="bg-gradient-to-r from-electric via-cyan-400 to-electric bg-clip-text text-transparent">
                    FORGING
                  </span>
                </motion.h2>
                <motion.p
                  className="text-3xl text-gray-400 font-mono"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Minting {energyAmount} Wh...
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

        <div className="relative z-10 p-4 sm:p-6 md:p-8">
          {/* Futuristic Header */}
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            {/* Animated Power Icon */}
            <motion.div
              className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0"
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
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-cyber" />
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

            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyber via-electric to-cyan-400 bg-clip-text text-transparent truncate">
                ENERGY FORGE
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-px w-6 sm:w-8 bg-gradient-to-r from-cyber to-transparent" />
                <p className="text-[10px] sm:text-xs text-gray-500 font-mono uppercase tracking-wider truncate">
                  Quantum Minting Protocol
                </p>
              </div>
            </div>
          </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Futuristic Input Field */}
        <div className="relative">
          <label className="text-xs sm:text-sm text-gray-400 mb-3 block font-mono uppercase tracking-wider flex items-center gap-2">
            <div className="w-2 h-2 bg-electric rounded-full animate-pulse" />
            Energy Generated (Wh)
          </label>
          <div className="relative group">
            {/* Input Glow Effect */}
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-r from-cyber via-electric to-cyber rounded-xl opacity-0 group-focus-within:opacity-30 blur transition-opacity"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 100%",
              }}
            />
            
            {/* Scanning Line */}
            <motion.div
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent opacity-0 group-focus-within:opacity-100"
              animate={{
                top: ["0%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            <input
              type="number"
              value={energyAmount}
              onChange={(e) => setEnergyAmount(e.target.value)}
              disabled={mintState !== "idle"}
              placeholder="0000"
              className="relative w-full bg-dark-base/80 backdrop-blur-sm border-2 border-dark-border rounded-xl px-4 sm:px-6 py-3 sm:py-4 font-mono text-base sm:text-lg focus:border-cyber focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed group-focus-within:bg-dark-base/90 group-focus-within:shadow-lg group-focus-within:shadow-cyber/20"
            />
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-electric rounded-tl-xl opacity-50" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-electric rounded-br-xl opacity-50" />
          </div>
        </div>

        {/* Oracle Verification Status */}
        <AnimatePresence mode="wait">
          {mintState === "verifying" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass rounded-xl p-6 border-2 border-cyber relative overflow-hidden"
            >
              {/* Radar Sweep */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "conic-gradient(from 0deg, transparent 0deg, rgba(41, 121, 255, 0.3) 60deg, transparent 120deg)",
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              {/* Scanning Grid */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`scan-${i}`}
                  className="absolute left-0 right-0 h-px bg-cyber"
                  style={{ top: `${i * 20}%` }}
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              ))}
              
              {/* Data Particles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`data-${i}`}
                  className="absolute w-1 h-1 bg-cyber rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.15,
                    repeat: Infinity,
                  }}
                />
              ))}
              
              <div className="flex items-center gap-3 relative z-10">
                <motion.div
                  className="relative"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                >
                  <Shield className="w-8 h-8 text-cyber" />
                  {/* Pulse Rings */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 border-2 border-cyber rounded-full"
                      animate={{
                        scale: [1, 2],
                        opacity: [0.8, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.5,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </motion.div>
                <div>
                  <div className="font-bold text-cyber text-lg flex items-center gap-2">
                    <motion.span
                      animate={{
                        textShadow: [
                          "0 0 10px rgba(41, 121, 255, 0.5)",
                          "0 0 20px rgba(41, 121, 255, 1)",
                          "0 0 10px rgba(41, 121, 255, 0.5)",
                        ],
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ORACLE SCANNING
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ...
                    </motion.span>
                  </div>
                  <div className="text-sm text-gray-400 font-mono">
                    Verifying attestation signature
                  </div>
                </div>
              </div>
              
              {/* Epic Progress Bar */}
              <div className="mt-4 h-4 bg-dark-base rounded-full overflow-hidden border-2 border-cyber relative">
                {/* Background Pulse */}
                <motion.div
                  className="absolute inset-0 bg-cyber/20"
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                />
                
                {/* Progress Fill */}
                <motion.div
                  className="h-full bg-gradient-to-r from-cyber via-electric to-cyan-400 relative"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                  initial={{ width: "0%" }}
                  animate={{
                    width: "100%",
                    backgroundPosition: ["0% 50%", "200% 50%"],
                  }}
                  transition={{
                    width: { duration: 2, ease: "easeInOut" },
                    backgroundPosition: { duration: 1.5, repeat: Infinity, ease: "linear" },
                  }}
                >
                  {/* Progress Sparkles */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"
                      animate={{
                        x: ["0%", "100%"],
                        opacity: [0, 1, 0],
                        scale: [0, 2, 0],
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.2,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </motion.div>
                
                {/* Leading Edge Glow */}
                <motion.div
                  className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-white/80 to-transparent"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                  }}
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
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-xl p-6 border-2 border-electric bg-gradient-to-br from-electric/20 to-cyan-400/20 relative overflow-hidden"
            >
              {/* Explosion Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`ring-${i}`}
                  className="absolute inset-0 border-4 border-electric rounded-xl"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 2],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.2,
                    ease: "easeOut",
                  }}
                />
              ))}
              
              {/* Star Burst */}
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  className="absolute left-1/2 top-1/2"
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos((i * 22.5) * Math.PI / 180) * 100,
                    y: Math.sin((i * 22.5) * Math.PI / 180) * 100,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                  }}
                >
                  <div className="text-3xl">⭐</div>
                </motion.div>
              ))}
              
              {/* Coin Fountain */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`coin-${i}`}
                  className="absolute left-1/2 top-1/2 text-2xl"
                  initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
                  animate={{
                    scale: [0, 1, 1],
                    x: (Math.random() - 0.5) * 200,
                    y: [0, -100 - Math.random() * 50, 100],
                    rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.05,
                    ease: "easeOut",
                  }}
                >
                  ⚡
                </motion.div>
              ))}
              
              {/* Confetti */}
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`confetti-${i}`}
                  className="absolute left-1/2 top-0"
                  initial={{ y: -20, x: 0, rotate: 0 }}
                  animate={{
                    y: 150,
                    x: (Math.random() - 0.5) * 300,
                    rotate: Math.random() * 720,
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.03,
                    ease: "easeIn",
                  }}
                >
                  <div
                    className="w-2 h-3 rounded-sm"
                    style={{
                      backgroundColor: ["#00FF94", "#2979FF", "#00D9FF", "#FFD700"][i % 4],
                    }}
                  />
                </motion.div>
              ))}
              
              <div className="flex items-center gap-4 relative z-10">
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-electric to-cyan-400 flex items-center justify-center shadow-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{
                    scale: [0, 1.3, 1],
                    rotate: [- 180, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <Check className="w-8 h-8 text-dark-base" strokeWidth={3} />
                </motion.div>
                <div>
                  <motion.div
                    className="font-bold text-2xl mb-1"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <span className="bg-gradient-to-r from-electric to-cyan-400 bg-clip-text text-transparent">
                      TOKENS MINTED!
                    </span>
                    <span className="ml-2 text-3xl">🎉</span>
                  </motion.div>
                  <motion.div
                    className="text-lg font-mono text-electric"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                  >
                    +{energyAmount} Wh
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Futuristic Action Buttons */}
        <div className="space-y-3 sm:space-y-4">
          {mintState === "idle" && (
            <motion.button
              onClick={handlePrepareMint}
              disabled={!energyAmount}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full group overflow-hidden"
            >
              {/* Button Background with Animated Border */}
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-cyber via-electric to-cyber rounded-xl opacity-75 group-hover:opacity-100 blur transition-opacity"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 100%",
                }}
              />
              
              <div className="relative bg-dark-base border-2 border-cyber/50 rounded-xl px-4 sm:px-6 py-3 sm:py-4 font-bold text-sm sm:text-base text-cyber group-hover:bg-cyber/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-mono tracking-wider">PREPARE MINT</span>
                <div className="hidden sm:block text-xs opacity-60">(Oracle Check)</div>
              </div>
              
              {/* Corner Indicators */}
              <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-cyber rounded-tl" />
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-cyber rounded-br" />
            </motion.button>
          )}

          {mintState === "verified" && (
            <motion.button
              onClick={handleMint}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full group overflow-hidden"
            >
              {/* Epic Glow Effect */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-electric via-cyan-400 to-electric rounded-xl opacity-75 group-hover:opacity-100 blur-lg"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              
              <div className="relative bg-gradient-to-r from-electric via-cyan-400 to-electric rounded-xl px-4 sm:px-6 py-3 sm:py-4 font-bold text-sm sm:text-base text-dark-base flex items-center justify-center gap-2 sm:gap-3">
                <Hammer className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-mono tracking-wider">FORGE TOKENS</span>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              
              {/* Animated Particles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-electric rounded-full"
                  style={{
                    left: `${25 + i * 20}%`,
                    top: "50%",
                  }}
                  animate={{
                    y: [-10, 10],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.button>
          )}

          {mintState === "minting" && (
            <motion.button
              disabled
              className="relative w-full bg-gradient-to-r from-electric via-cyan-400 to-electric rounded-xl px-4 sm:px-6 py-3 sm:py-4 font-bold text-sm sm:text-base text-dark-base cursor-not-allowed overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.span
                className="relative z-10 font-mono tracking-wider flex items-center justify-center gap-2"
                animate={{
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                }}
              >
                <Hammer className="w-5 h-5 sm:w-6 sm:h-6" />
                FORGING...
              </motion.span>
            </motion.button>
          )}
        </div>

        {/* Info Box */}
        <div className="glass rounded-xl p-3 sm:p-4 border border-cyber/30 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyber/5 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <div className="relative text-xs sm:text-sm text-gray-400 space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyber flex-shrink-0" />
              <strong className="text-cyber">Attestation Flow:</strong>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-[10px] sm:text-xs leading-relaxed">
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
