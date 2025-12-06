"use client";

import { motion } from "framer-motion";
import { Zap, Shield, ArrowRight, Activity } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const mockTrades = [
  "1000Wh sold by Producer_0x12a4...8f3c for 0.05 ETH",
  "2500Wh sold by Producer_0x9b7e...2d1a for 0.12 ETH",
  "750Wh sold by Producer_0x4c8f...6e9b for 0.03 ETH",
  "3200Wh sold by Producer_0x7d2a...1f4e for 0.15 ETH",
  "1800Wh sold by Producer_0x3e5b...9c7d for 0.08 ETH",
];

export default function LandingPage() {
  const [currentTrade, setCurrentTrade] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentTrade((prev) => (prev + 1) % mockTrades.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden py-20">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-base via-dark-card to-dark-base">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(#00FF94 1px, transparent 1px),
                linear-gradient(90deg, #00FF94 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              animation: "pulse 4s ease-in-out infinite"
            }} />
          </div>
          
          {/* Glowing Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          {/* Floating Energy Particles */}
          {mounted && Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-electric rounded-full"
              style={{
                left: `${(i * 12.5 + 10)}%`,
                top: `${(i * 11 + 15)}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + (i * 0.3),
                repeat: Infinity,
                delay: i * 0.25,
              }}
            />
          ))}

          {/* Lightning Strikes - Multiple Locations */}
          {mounted && (
            <>
              {/* Lightning Strike 1 - Left Side */}
              <motion.svg
                className="absolute top-0 left-[10%] w-32 h-full pointer-events-none"
                viewBox="0 0 100 800"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 1, 0] }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatDelay: 5,
                  times: [0, 0.1, 0.2, 0.3, 0.4],
                }}
              >
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <motion.path
                  d="M 50 0 L 45 80 L 55 80 L 40 160 L 50 160 L 35 240 L 48 240 L 30 320 L 45 320 L 25 400 L 40 400 L 20 500 L 35 500 L 15 600 L 30 600 L 10 700 L 25 700 L 5 800"
                  stroke="#00FF94"
                  strokeWidth="3"
                  fill="none"
                  filter="url(#glow)"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0] }}
                  transition={{
                    duration: 0.4,
                    repeat: Infinity,
                    repeatDelay: 5,
                    times: [0, 0.15, 0.35, 0.4],
                  }}
                />
                <motion.path
                  d="M 40 160 L 60 200 L 55 240"
                  stroke="#00FF94"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#glow)"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0] }}
                  transition={{
                    duration: 0.4,
                    repeat: Infinity,
                    repeatDelay: 5,
                    delay: 0.05,
                    times: [0, 0.15, 0.35, 0.4],
                  }}
                />
              </motion.svg>

              {/* Lightning Strike 2 - Center Left */}
              <motion.svg
                className="absolute top-0 left-[30%] w-32 h-full pointer-events-none"
                viewBox="0 0 100 800"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 6,
                  delay: 1.5,
                }}
              >
                <motion.path
                  d="M 50 0 L 55 70 L 45 70 L 60 140 L 48 140 L 65 210 L 50 210 L 70 280 L 55 280 L 75 350 L 60 350 L 80 420 L 65 420 L 85 500"
                  stroke="#2979FF"
                  strokeWidth="2.5"
                  fill="none"
                  filter="url(#glow)"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatDelay: 6,
                    delay: 1.5,
                  }}
                />
              </motion.svg>

              {/* Lightning Strike 3 - Right Side */}
              <motion.svg
                className="absolute top-0 right-[15%] w-32 h-full pointer-events-none"
                viewBox="0 0 100 800"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 1, 0] }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatDelay: 7,
                  delay: 2,
                  times: [0, 0.1, 0.2, 0.3, 0.4],
                }}
              >
                <motion.path
                  d="M 50 0 L 55 90 L 45 90 L 60 180 L 50 180 L 65 270 L 52 270 L 70 360 L 55 360 L 75 450 L 60 450 L 80 550 L 65 550 L 85 650 L 70 650 L 90 750 L 75 750 L 95 800"
                  stroke="#2979FF"
                  strokeWidth="3"
                  fill="none"
                  filter="url(#glow)"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0] }}
                  transition={{
                    duration: 0.4,
                    repeat: Infinity,
                    repeatDelay: 7,
                    delay: 2,
                    times: [0, 0.15, 0.35, 0.4],
                  }}
                />
                <motion.path
                  d="M 60 180 L 40 220 L 45 270"
                  stroke="#2979FF"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#glow)"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0] }}
                  transition={{
                    duration: 0.4,
                    repeat: Infinity,
                    repeatDelay: 7,
                    delay: 2.05,
                    times: [0, 0.15, 0.35, 0.4],
                  }}
                />
              </motion.svg>

              {/* Lightning Strike 4 - Far Right */}
              <motion.svg
                className="absolute top-0 right-[5%] w-24 h-96 pointer-events-none"
                viewBox="0 0 80 400"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 8,
                  delay: 3.5,
                }}
              >
                <motion.path
                  d="M 40 0 L 35 60 L 45 60 L 30 120 L 40 120 L 25 180 L 38 180 L 20 240 L 35 240 L 15 300 L 30 300 L 10 360 L 25 360 L 5 400"
                  stroke="#00FF94"
                  strokeWidth="2.5"
                  fill="none"
                  filter="url(#glow)"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatDelay: 8,
                    delay: 3.5,
                  }}
                />
              </motion.svg>

              {/* Lightning Strike 5 - Middle Short */}
              <motion.svg
                className="absolute top-1/3 left-[50%] w-20 h-64 pointer-events-none"
                viewBox="0 0 60 300"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.25,
                  repeat: Infinity,
                  repeatDelay: 5.5,
                  delay: 2.8,
                }}
              >
                <motion.path
                  d="M 30 0 L 25 50 L 35 50 L 20 100 L 32 100 L 18 150 L 30 150 L 15 200 L 28 200 L 10 250 L 22 250 L 5 300"
                  stroke="#00FF94"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#glow)"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{
                    duration: 0.25,
                    repeat: Infinity,
                    repeatDelay: 5.5,
                    delay: 2.8,
                  }}
                />
              </motion.svg>

              {/* Lightning Strike 6 - Bottom Left */}
              <motion.svg
                className="absolute bottom-1/4 left-[20%] w-24 h-80 pointer-events-none"
                viewBox="0 0 80 350"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 1, 0] }}
                transition={{
                  duration: 0.35,
                  repeat: Infinity,
                  repeatDelay: 6.5,
                  delay: 4.2,
                  times: [0, 0.1, 0.2, 0.3, 0.35],
                }}
              >
                <motion.path
                  d="M 40 0 L 45 55 L 35 55 L 50 110 L 38 110 L 55 165 L 42 165 L 60 220 L 45 220 L 65 275 L 50 275 L 70 330 L 55 330 L 75 350"
                  stroke="#2979FF"
                  strokeWidth="2.5"
                  fill="none"
                  filter="url(#glow)"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0] }}
                  transition={{
                    duration: 0.35,
                    repeat: Infinity,
                    repeatDelay: 6.5,
                    delay: 4.2,
                    times: [0, 0.15, 0.3, 0.35],
                  }}
                />
              </motion.svg>

              {/* Lightning Strike 7 - Bottom Right */}
              <motion.svg
                className="absolute bottom-1/3 right-[25%] w-28 h-72 pointer-events-none"
                viewBox="0 0 90 320"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 7.5,
                  delay: 5,
                }}
              >
                <motion.path
                  d="M 45 0 L 40 60 L 50 60 L 35 120 L 48 120 L 30 180 L 45 180 L 25 240 L 40 240 L 20 300 L 35 300 L 10 320"
                  stroke="#00FF94"
                  strokeWidth="2.5"
                  fill="none"
                  filter="url(#glow)"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatDelay: 7.5,
                    delay: 5,
                  }}
                />
              </motion.svg>
            </>
          )}

          {/* Electric Zaps - Horizontal */}
          {mounted && Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`zap-${i}`}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-electric to-transparent"
              style={{
                top: `${20 + i * 30}%`,
                left: 0,
                right: 0,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 4 + i * 1.5,
                delay: i * 0.8,
              }}
            />
          ))}
        </div>

        {/* Content - Asymmetric Layout */}
        <div className="relative z-10 px-8 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-electric/30"
            >
              <div className="w-2 h-2 bg-electric rounded-full animate-pulse" />
              <span className="text-sm text-electric font-mono">Live on Mainnet</span>
            </motion.div>

            {/* Main Heading */}
            <div className="relative">
              {/* Electric Glow Behind Text */}
              {mounted && (
                <motion.div
                  className="absolute -inset-4 bg-electric/20 blur-3xl rounded-full"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
              )}

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-6xl lg:text-7xl font-bold mb-4 leading-tight relative z-10"
              >
                <span className="text-white">Decentralized</span>
                <br />
                <motion.span
                  className="bg-gradient-to-r from-electric via-cyan-400 to-cyber bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  Power Trading
                </motion.span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="h-1 w-24 bg-gradient-to-r from-electric to-cyber rounded-full relative z-10"
              >
                {/* Animated Spark */}
                {mounted && (
                  <motion.div
                    className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full"
                    animate={{
                      x: [0, 96, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      boxShadow: "0 0 10px #00FF94",
                    }}
                  />
                )}
              </motion.div>
            </div>
            
            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-gray-300 leading-relaxed max-w-lg"
            >
              Tokenize your wattage. Trade peer-to-peer on-chain. 
              Every transaction verified by decentralized oracles.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-8"
            >
              <div>
                <div className="text-3xl font-bold font-mono text-electric">2.4M</div>
                <div className="text-sm text-gray-400">kWh Traded</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-mono text-cyber">1,247</div>
                <div className="text-sm text-gray-400">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-mono text-white">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/dashboard">
                <motion.button
                  className="group relative px-8 py-4 bg-electric text-dark-base font-bold text-lg rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative flex items-center gap-3">
                    Launch App
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </span>
                </motion.button>
              </Link>
              
              <motion.button
                className="px-8 py-4 glass border border-white/20 font-bold text-lg rounded-xl hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Docs
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Electric Zaps Around Cards */}
            {mounted && (
              <>
                {/* Circular Electric Zaps */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={`circle-zap-${i}`}
                    className="absolute w-3 h-3 rounded-full bg-electric"
                    style={{
                      left: `${50 + 40 * Math.cos((i * Math.PI) / 3)}%`,
                      top: `${50 + 40 * Math.sin((i * Math.PI) / 3)}%`,
                      boxShadow: "0 0 20px #00FF94",
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}

                {/* Connecting Zap Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <motion.line
                    x1="10%"
                    y1="20%"
                    x2="90%"
                    y2="80%"
                    stroke="#00FF94"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: [0, 1, 0],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                  <motion.line
                    x1="90%"
                    y1="20%"
                    x2="10%"
                    y2="80%"
                    stroke="#2979FF"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: [0, 1, 0],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      delay: 1,
                    }}
                  />
                </svg>
              </>
            )}

            {/* 3D Card Stack */}
            <div className="relative h-[500px]">
              {/* Card 1 - Back */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotateY: [0, 5, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-0 right-0 w-80 h-96 glass rounded-2xl p-6 border border-electric/30"
                style={{ transform: "rotateY(-10deg) translateZ(-50px)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-electric" />
                  <span className="font-bold">Energy Producer</span>
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-electric/20 rounded-full w-3/4" />
                  <div className="h-2 bg-electric/20 rounded-full w-1/2" />
                  <div className="h-2 bg-electric/20 rounded-full w-2/3" />
                </div>
                <div className="mt-8 text-4xl font-bold font-mono text-electric">
                  3,500 Wh
                </div>
              </motion.div>

              {/* Card 2 - Middle */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotateY: [0, -5, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute top-12 right-12 w-80 h-96 glass rounded-2xl p-6 border border-cyber/30"
                style={{ transform: "rotateY(5deg)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-cyber" />
                  <span className="font-bold">Oracle Verified</span>
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-cyber/20 rounded-full w-2/3" />
                  <div className="h-2 bg-cyber/20 rounded-full w-3/4" />
                  <div className="h-2 bg-cyber/20 rounded-full w-1/2" />
                </div>
                <div className="mt-8">
                  <div className="text-sm text-gray-400 mb-1">Trust Score</div>
                  <div className="text-4xl font-bold font-mono text-cyber">98%</div>
                </div>
              </motion.div>

              {/* Card 3 - Front */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute top-24 right-24 w-80 h-96 glass rounded-2xl p-6 border-2 border-white/30 glow-electric"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-6 h-6 text-white" />
                  <span className="font-bold">Live Trading</span>
                </div>
                <div className="space-y-4 mt-6">
                  {mounted && [
                    { addr: "a4f3e2", amount: 850 },
                    { addr: "7d2a1f", amount: 1200 },
                    { addr: "9b7e2d", amount: 650 },
                  ].map((trade, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.3, repeat: Infinity, repeatDelay: 3 }}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                    >
                      <span className="text-sm font-mono">0x{trade.addr}</span>
                      <span className="text-electric font-mono">+{trade.amount} Wh</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Live Ticker */}
        <div className="absolute bottom-0 left-0 right-0 bg-dark-card/80 backdrop-blur-xl border-t border-white/10 py-4 overflow-hidden">
          <motion.div
            key={currentTrade}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex items-center justify-center gap-3 text-electric font-mono"
          >
            <Activity className="w-5 h-5 animate-pulse" />
            <span>{mockTrades[currentTrade]}</span>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-electric to-cyber bg-clip-text text-transparent"
          >
            How It Works
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Smart Meter Reads Usage",
                description: "Your IoT-enabled smart meter continuously monitors energy production and consumption in real-time.",
                icon: Activity,
                color: "electric",
              },
              {
                step: "02",
                title: "Oracle Signs & Verifies",
                description: "Decentralized oracles cryptographically sign and verify your meter readings for on-chain trust.",
                icon: Shield,
                color: "cyber",
              },
              {
                step: "03",
                title: "Trade Tokens Instantly",
                description: "Buy and sell tokenized energy on the marketplace with instant settlement and transparent pricing.",
                icon: Zap,
                color: "electric",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="glass glass-hover rounded-2xl p-8 relative group overflow-hidden"
              >
                {/* Electric Border Effect on Hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    background: `linear-gradient(90deg, transparent, ${item.color === "electric" ? "#00FF94" : "#2979FF"}, transparent)`,
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "200% 0%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />

                {/* Corner Zaps */}
                <motion.div
                  className={`absolute top-0 right-0 w-2 h-2 rounded-full bg-${item.color}`}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                  style={{
                    boxShadow: `0 0 10px ${item.color === "electric" ? "#00FF94" : "#2979FF"}`,
                  }}
                />
                <motion.div
                  className={`absolute bottom-0 left-0 w-2 h-2 rounded-full bg-${item.color}`}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5 + 1,
                  }}
                  style={{
                    boxShadow: `0 0 10px ${item.color === "electric" ? "#00FF94" : "#2979FF"}`,
                  }}
                />

                <div className={`absolute top-0 right-0 text-8xl font-bold opacity-5 text-${item.color} z-0`}>
                  {item.step}
                </div>
                
                <div className={`relative z-10 w-16 h-16 rounded-full bg-${item.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-8 h-8 text-${item.color}`} />
                </div>
                
                <h3 className="relative z-10 text-2xl font-bold mb-4">{item.title}</h3>
                <p className="relative z-10 text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
