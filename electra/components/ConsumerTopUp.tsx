"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Rocket, Flame, Zap, Wind, ArrowUpRight } from "lucide-react";

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
      {/* Full-Screen Rocket Launch Animation Overlay */}
      <AnimatePresence>
        {isSending && (
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
                  background: "radial-gradient(circle at center, rgba(0, 217, 255, 0.1) 0%, transparent 70%)",
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

              {/* Professional Launch Pad with Details */}
              <motion.div
                className="absolute bottom-1/3 left-1/2 -translate-x-1/2"
                initial={{ scale: 0, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              >
                <div className="relative">
                  {/* Launch Platform */}
                  <div className="w-64 h-8 bg-gradient-to-b from-gray-300 via-gray-500 to-gray-800 rounded-t-3xl shadow-2xl border-t-4 border-gray-200" />
                  {/* Platform Base */}
                  <div className="w-56 h-3 mx-auto bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-xl" />
                  {/* Launch Glow */}
                  <motion.div
                    className="absolute inset-0 bg-cyan-400/40 rounded-t-3xl blur-2xl"
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.9, 1.3, 0.9],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  />
                </div>
              </motion.div>
              
              {/* Professional Rocket with Advanced Effects */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 bottom-1/3"
                initial={{ y: 0, x: 0, rotate: 0, scale: 1 }}
                animate={{
                  y: [-30, -450],
                  x: [0, 220],
                  rotate: [0, 28],
                  scale: [1.8, 1.2],
                }}
                transition={{
                  duration: 2,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                <div className="relative">
                  {/* Rocket Body with Glow */}
                  <motion.div
                    className="relative"
                    animate={{
                      filter: [
                        "drop-shadow(0 0 30px rgba(0, 217, 255, 0.6))",
                        "drop-shadow(0 0 50px rgba(0, 217, 255, 1))",
                        "drop-shadow(0 0 30px rgba(0, 217, 255, 0.6))",
                      ],
                    }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <Rocket className="w-40 h-40 text-cyan-400 stroke-[1.5]" />
                  </motion.div>
                  
                  {/* Rocket Exhaust Flames */}
                  <motion.div
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2"
                    animate={{
                      scale: [1, 1.6, 1],
                      opacity: [0.9, 1, 0.9],
                    }}
                    transition={{
                      duration: 0.12,
                      repeat: Infinity,
                    }}
                  >
                    <Flame className="w-24 h-24 text-orange-500" />
                  </motion.div>
                  
                  {/* Secondary Flames */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`flame-${i}`}
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2"
                      animate={{
                        scale: [0.8, 1.4, 0.8],
                        opacity: [0.5, 0.8, 0.5],
                        y: [0, 10, 0],
                      }}
                      transition={{
                        duration: 0.15,
                        repeat: Infinity,
                        delay: i * 0.05,
                      }}
                    >
                      <Flame className="w-20 h-20 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Advanced Smoke Trail with Turbulence */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`smoke-${i}`}
                  className="absolute left-1/2 bottom-1/3"
                  animate={{
                    y: [0, -140 - i * 18],
                    x: [0, 120 + i * 10 + Math.sin(i) * 20],
                    opacity: [0.8, 0.4, 0],
                    scale: [0.6, 3, 3.5],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Wind className="w-12 h-12 text-gray-400 opacity-60" />
                </motion.div>
              ))}
              
              {/* Energy Particles with Trails */}
              {[...Array(35)].map((_, i) => {
                const randomX = (Math.random() - 0.5) * 400;
                const randomY = -180 - Math.random() * 120;
                return (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute left-1/2 bottom-1/3"
                    animate={{
                      y: [0, randomY],
                      x: [0, randomX],
                      opacity: [0, 1, 0.8, 0],
                      scale: [0.5, 2, 1.5, 0],
                    }}
                    transition={{
                      duration: 1.8 + Math.random() * 0.7,
                      delay: i * 0.03,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Zap className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                );
              })}
              
              {/* Velocity Indicators - Speed Lines */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`velocity-${i}`}
                  className="absolute"
                  style={{
                    top: `${25 + i * 4}%`,
                    left: 0,
                    right: 0,
                  }}
                  animate={{
                    x: ["-100%", "100%"],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.06,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                </motion.div>
              ))}
              
              {/* Directional Arrows */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`arrow-${i}`}
                  className="absolute left-1/4 bottom-1/3"
                  animate={{
                    y: [0, -200],
                    x: [0, 100],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.15,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                >
                  <ArrowUpRight className="w-8 h-8 text-cyan-400" />
                </motion.div>
              ))}

              {/* Launch Text */}
              <motion.div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <motion.h2
                  className="text-6xl font-bold mb-4"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(0, 217, 255, 0.5)",
                      "0 0 40px rgba(0, 217, 255, 1)",
                      "0 0 20px rgba(0, 217, 255, 0.5)",
                    ],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <span className="bg-gradient-to-r from-cyan-400 via-electric to-cyan-400 bg-clip-text text-transparent">
                    LAUNCHING
                  </span>
                </motion.h2>
                <motion.p
                  className="text-2xl text-gray-400 font-mono"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Transferring {amount} Wh...
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

        <div className="relative z-10 p-4 sm:p-6 md:p-8">
          {/* Futuristic Header */}
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            {/* Holographic Send Icon */}
            <motion.div
              className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0"
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
                  <Send className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-electric" />
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

            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-electric via-cyan-400 to-electric bg-clip-text text-transparent truncate">
                QUANTUM TRANSFER
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-px w-6 sm:w-8 bg-gradient-to-r from-electric to-transparent" />
                <p className="text-[10px] sm:text-xs text-gray-500 font-mono uppercase tracking-wider truncate">
                  Instant Transmission Protocol
                </p>
              </div>
            </div>
          </div>

        <div className="space-y-6 sm:space-y-8">
        {/* Futuristic Meter ID Input */}
        <div className="relative">
          <label className="text-xs sm:text-sm text-gray-400 mb-3 block font-mono uppercase tracking-wider flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            Consumer Meter ID
          </label>
          <div className="relative group">
            {/* Input Glow Effect */}
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-r from-electric via-cyan-400 to-electric rounded-xl opacity-0 group-focus-within:opacity-30 blur transition-opacity"
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
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-focus-within:opacity-100"
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
              type="text"
              value={meterId}
              onChange={(e) => setMeterId(e.target.value)}
              disabled={isSending}
              placeholder="MTR-XXXXXXXX"
              className="relative w-full bg-dark-base/80 backdrop-blur-sm border-2 border-dark-border rounded-xl px-4 sm:px-6 py-3 sm:py-4 font-mono text-base sm:text-lg focus:border-electric focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed group-focus-within:bg-dark-base/90 group-focus-within:shadow-lg group-focus-within:shadow-electric/20"
            />
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400 rounded-tl-xl opacity-50" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400 rounded-br-xl opacity-50" />
          </div>
        </div>

        {/* Futuristic Amount Input */}
        <div className="relative">
          <label className="text-xs sm:text-sm text-gray-400 mb-3 block font-mono uppercase tracking-wider flex items-center gap-2">
            <div className="w-2 h-2 bg-electric rounded-full animate-pulse" />
            Amount (Wh)
          </label>
          <div className="relative group">
            {/* Input Glow Effect */}
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-r from-electric via-cyan-400 to-electric rounded-xl opacity-0 group-focus-within:opacity-30 blur transition-opacity"
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
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isSending}
              placeholder="0000"
              className="relative w-full bg-dark-base/80 backdrop-blur-sm border-2 border-dark-border rounded-xl px-4 sm:px-6 py-3 sm:py-4 font-mono text-base sm:text-lg focus:border-electric focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed group-focus-within:bg-dark-base/90 group-focus-within:shadow-lg group-focus-within:shadow-electric/20"
            />
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-electric rounded-tl-xl opacity-50" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-electric rounded-br-xl opacity-50" />
          </div>
        </div>

        {/* Epic Launch Button */}
        <motion.button
          onClick={handleSend}
          disabled={!meterId || !amount || isSending}
          whileHover={!isSending ? { scale: 1.02 } : {}}
          whileTap={!isSending ? { scale: 0.98 } : {}}
          className="relative w-full group overflow-hidden"
        >
          {!isSending && (
            <>
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
              
              {/* Animated Particles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
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
            </>
          )}
          
          <div className={`relative ${isSending ? 'bg-gradient-to-r from-electric via-cyan-400 to-electric' : 'bg-gradient-to-r from-electric via-cyan-400 to-electric'} rounded-xl px-4 sm:px-6 py-3 sm:py-4 font-bold text-sm sm:text-base text-dark-base flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed`}>
            {isSending ? (
              <>
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
                  className="relative z-10 font-mono tracking-wider flex items-center gap-2"
                  animate={{
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                  }}
                >
                  <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
                  LAUNCHING...
                </motion.span>
              </>
            ) : (
              <>
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-mono tracking-wider">LAUNCH TRANSFER</span>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </>
            )}
          </div>
          
          {/* Corner Indicators */}
          {!isSending && (
            <>
              <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-electric rounded-tl" />
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-electric rounded-br" />
            </>
          )}
        </motion.button>

        {/* Info */}
        <div className="glass rounded-xl p-3 sm:p-4 border border-electric/30 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-electric/5 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <div className="relative text-xs sm:text-sm text-gray-400 leading-relaxed">
            <div className="flex items-start gap-2">
              <Rocket className="w-4 h-4 text-electric flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-electric">Producer Top-Up:</strong> After a consumer
                purchases energy units, producers can top up their meter's initial_energy_units.
                Only the registry owner (producer) can perform this operation.
              </div>
            </div>
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
