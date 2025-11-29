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
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-6xl lg:text-7xl font-bold mb-4 leading-tight"
              >
                <span className="text-white">Decentralized</span>
                <br />
                <span className="bg-gradient-to-r from-electric via-cyan-400 to-cyber bg-clip-text text-transparent">
                  Power Trading
                </span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="h-1 w-24 bg-gradient-to-r from-electric to-cyber rounded-full"
              />
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
                className="glass glass-hover rounded-2xl p-8 relative group"
              >
                <div className={`absolute top-0 right-0 text-8xl font-bold opacity-5 text-${item.color}`}>
                  {item.step}
                </div>
                
                <div className={`w-16 h-16 rounded-full bg-${item.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-8 h-8 text-${item.color}`} />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
