"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Activity, TrendingUp, Hash, Calendar } from "lucide-react";

interface MeterData {
  meterId: string;
  owner: string;
  balance: number;
  totalGenerated: number;
  totalConsumed: number;
  registeredDate: string;
  trustScore: number;
}

export default function MeterRegistry() {
  const [searchAddress, setSearchAddress] = useState("");
  const [searchResult, setSearchResult] = useState<MeterData | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [mockDatabase, setMockDatabase] = useState<Record<string, MeterData>>({});

  // Initialize mock database with useState - indexed by meter ID
  useEffect(() => {
    setMockDatabase({
      "MTR-8F3C2A1B": {
        meterId: "MTR-8F3C2A1B",
        owner: "0x742d35a3f8b2c1e9",
        balance: 2450,
        totalGenerated: 15000,
        totalConsumed: 12550,
        registeredDate: "2024-01-15",
        trustScore: 98,
      },
      "MTR-1A2B3C4D": {
        meterId: "MTR-1A2B3C4D",
        owner: "0x9e3f1a7c2d8b4e6f",
        balance: 5200,
        totalGenerated: 28000,
        totalConsumed: 22800,
        registeredDate: "2023-11-20",
        trustScore: 95,
      },
    });
  }, []);

  const handleSearch = async () => {
    if (!searchAddress) return;
    
    setIsSearching(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Look up meter ID in mock database
    const result = mockDatabase[searchAddress] || mockDatabase["MTR-8F3C2A1B"];
    setSearchResult(result);
    setIsSearching(false);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-cyber to-electric bg-clip-text text-transparent">
          Meter Registry
        </h1>
        <p className="text-gray-400">
          Look up any registered smart meter by Meter ID
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="glass rounded-2xl p-8 relative overflow-hidden">
        {isSearching && (
          <>
            {/* Futuristic Scanning Animation */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "conic-gradient(from 0deg, transparent 0deg, rgba(41, 121, 255, 0.3) 60deg, transparent 120deg)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Scanning Grid Lines */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-0 right-0 h-px bg-electric/30"
                style={{ top: `${20 + i * 20}%` }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scaleX: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}

            {/* Data Particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-cyber rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: Math.random() * 1,
                }}
              />
            ))}
          </>
        )}
        
        <div className="flex gap-4 relative z-10">
          <div className="flex-1">
            <input
              type="text"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Enter Meter ID (e.g., MTR-8F3C2A1B)"
              className="w-full bg-dark-base border border-dark-border rounded-lg px-4 py-3 font-mono focus:border-electric focus:outline-none transition-colors"
            />
          </div>
          <motion.button
            onClick={handleSearch}
            disabled={!searchAddress || isSearching}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(41, 121, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-3 bg-cyber text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 overflow-hidden"
          >
            {isSearching && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: [-200, 200] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
            <Search className="w-5 h-5 relative z-10" />
            <span className="relative z-10">{isSearching ? "Scanning..." : "Search"}</span>
          </motion.button>
        </div>
      </div>

      {/* Search Results */}
      {searchResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 relative overflow-hidden"
        >
          {/* Holographic Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyber/5 via-electric/5 to-transparent"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                className="w-10 h-10 rounded-full bg-cyber/20 border-2 border-cyber flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(41, 121, 255, 0.3)",
                    "0 0 20px rgba(41, 121, 255, 0.6)",
                    "0 0 10px rgba(41, 121, 255, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Activity className="w-5 h-5 text-cyber" />
              </motion.div>
              <h2 className="text-2xl font-bold">Meter Information</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Meter ID */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-xl p-6 col-span-2 relative overflow-hidden border border-electric/30"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-electric/10 to-transparent"
                  animate={{ x: [-100, 300] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3 text-gray-400">
                    <div className="w-6 h-6 rounded bg-electric/20 flex items-center justify-center">
                      <Hash className="w-4 h-4 text-electric" />
                    </div>
                    <span className="text-sm font-semibold uppercase tracking-wider">Meter ID</span>
                  </div>
                  <p className="font-mono text-2xl text-electric font-bold break-all">
                    {searchResult.meterId}
                  </p>
                </div>
              </motion.div>

              {/* Owner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-xl p-6 relative overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-3 text-gray-400">
                  <div className="w-6 h-6 rounded bg-cyber/20 flex items-center justify-center">
                    <span className="text-xs">👤</span>
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-wider">Owner</span>
                </div>
                <p className="font-mono text-sm break-all">{searchResult.owner}</p>
              </motion.div>

              {/* Registration Date */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass rounded-xl p-6 relative overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-3 text-gray-400">
                  <div className="w-6 h-6 rounded bg-cyber/20 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-cyber" />
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-wider">Registered</span>
                </div>
                <p className="font-mono text-lg">
                  {new Date(searchResult.registeredDate).toLocaleDateString()}
                </p>
              </motion.div>

              {/* Current Balance */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="glass rounded-xl p-6 border border-electric/30 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-electric/10 to-transparent"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {/* Energy Particles */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-lg pointer-events-none"
                    style={{
                      left: `${30 + i * 20}%`,
                      top: "30%",
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                  >
                    ⚡
                  </motion.div>
                ))}
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3 text-gray-400">
                    <div className="w-6 h-6 rounded bg-electric/20 flex items-center justify-center">
                      <span className="text-xs">🔋</span>
                    </div>
                    <span className="text-sm font-semibold uppercase tracking-wider">Balance</span>
                  </div>
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="font-mono text-3xl font-bold text-electric"
                  >
                    {searchResult.balance.toLocaleString()} Wh
                  </motion.p>
                </div>
              </motion.div>

              {/* Trust Score */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="glass rounded-xl p-6 border border-cyber/30 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyber/10 to-transparent"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                {/* Trust Rings */}
                {[...Array(2)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-8 h-8 rounded-full border-2 border-cyber"
                    style={{
                      left: "50%",
                      top: "50%",
                      marginLeft: "-16px",
                      marginTop: "-16px",
                    }}
                    animate={{
                      scale: [1, 2],
                      opacity: [0.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 1,
                    }}
                  />
                ))}
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3 text-gray-400">
                    <div className="w-6 h-6 rounded bg-cyber/20 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-cyber" />
                    </div>
                    <span className="text-sm font-semibold uppercase tracking-wider">Trust Score</span>
                  </div>
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, type: "spring" }}
                    className="font-mono text-3xl font-bold text-cyber"
                  >
                    {searchResult.trustScore}%
                  </motion.p>
                </div>
              </motion.div>

              {/* Total Generated */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass rounded-xl p-6 relative overflow-hidden"
              >
                {/* Generation Sparkles */}
                {[...Array(2)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-sm pointer-events-none"
                    style={{
                      left: `${40 + i * 20}%`,
                      top: "40%",
                    }}
                    animate={{
                      rotate: [0, 360],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3 text-gray-400">
                    <div className="w-6 h-6 rounded bg-electric/20 flex items-center justify-center">
                      <span className="text-xs">⚙️</span>
                    </div>
                    <span className="text-sm font-semibold uppercase tracking-wider">Generated</span>
                  </div>
                  <p className="font-mono text-2xl font-bold">
                    {searchResult.totalGenerated.toLocaleString()} Wh
                  </p>
                </div>
              </motion.div>

              {/* Total Consumed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="glass rounded-xl p-6 relative overflow-hidden"
              >
                {/* Consumption Indicators */}
                {[...Array(2)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-cyber"
                    style={{
                      left: `${45 + i * 15}%`,
                      top: "35%",
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                  />
                ))}
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3 text-gray-400">
                    <div className="w-6 h-6 rounded bg-cyber/20 flex items-center justify-center">
                      <span className="text-xs">📊</span>
                    </div>
                    <span className="text-sm font-semibold uppercase tracking-wider">Consumed</span>
                  </div>
                  <p className="font-mono text-2xl font-bold">
                    {searchResult.totalConsumed.toLocaleString()} Wh
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Activity Chart Placeholder */}
          <div className="mt-8 glass rounded-xl p-6">
            <h3 className="font-bold mb-4">Energy Activity (Last 30 Days)</h3>
            <div className="h-48 flex items-end justify-between gap-2">
              {Array.from({ length: 30 }).map((_, i) => {
                const height = Math.random() * 100;
                return (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.02 }}
                    className="flex-1 bg-gradient-to-t from-electric to-cyber rounded-t opacity-70 hover:opacity-100 transition-opacity"
                  />
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
