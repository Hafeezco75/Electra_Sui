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

  // Initialize mock database with useState
  useEffect(() => {
    setMockDatabase({
      "0x742d35a3f8b2c1e9": {
        meterId: "0x8f3c2a1b9e7d6c5a4f3e2d1c0b9a8f7e6d5c4b3a",
        owner: "0x742d35a3f8b2c1e9",
        balance: 2450,
        totalGenerated: 15000,
        totalConsumed: 12550,
        registeredDate: "2024-01-15",
        trustScore: 98,
      },
      "0x9e3f1a7c2d8b4e6f": {
        meterId: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Look up address in mock database
    const result = mockDatabase[searchAddress] || mockDatabase["0x742d35a3f8b2c1e9"];
    setSearchResult(result);
    setIsSearching(false);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">Meter Registry</h1>
        <p className="text-gray-400">
          Look up any registered smart meter by address
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="glass rounded-2xl p-8">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Enter wallet address (0x...)"
              className="w-full bg-dark-base border border-dark-border rounded-lg px-4 py-3 font-mono focus:border-electric focus:outline-none transition-colors"
            />
          </div>
          <motion.button
            onClick={handleSearch}
            disabled={!searchAddress || isSearching}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-electric text-dark-base font-bold rounded-lg hover:bg-electric/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            {isSearching ? "Searching..." : "Search"}
          </motion.button>
        </div>
      </div>

      {/* Search Results */}
      {searchResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <Activity className="w-6 h-6 text-electric" />
            <h2 className="text-2xl font-bold">Meter Information</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Meter ID */}
            <div className="glass rounded-xl p-6 col-span-2">
              <div className="flex items-center gap-2 mb-2 text-gray-400">
                <Hash className="w-4 h-4" />
                <span className="text-sm">Meter ID</span>
              </div>
              <p className="font-mono text-electric break-all">
                {searchResult.meterId}
              </p>
            </div>

            {/* Owner */}
            <div className="glass rounded-xl p-6">
              <div className="text-sm text-gray-400 mb-2">Owner Address</div>
              <p className="font-mono text-lg">{searchResult.owner}</p>
            </div>

            {/* Registration Date */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Registered</span>
              </div>
              <p className="font-mono text-lg">
                {new Date(searchResult.registeredDate).toLocaleDateString()}
              </p>
            </div>

            {/* Current Balance */}
            <div className="glass rounded-xl p-6 border border-electric/30">
              <div className="text-sm text-gray-400 mb-2">Current Balance</div>
              <p className="font-mono text-3xl font-bold text-electric">
                {searchResult.balance.toLocaleString()} Wh
              </p>
            </div>

            {/* Trust Score */}
            <div className="glass rounded-xl p-6 border border-cyber/30">
              <div className="flex items-center gap-2 mb-2 text-gray-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Trust Score</span>
              </div>
              <p className="font-mono text-3xl font-bold text-cyber">
                {searchResult.trustScore}%
              </p>
            </div>

            {/* Total Generated */}
            <div className="glass rounded-xl p-6">
              <div className="text-sm text-gray-400 mb-2">Total Generated</div>
              <p className="font-mono text-2xl font-bold">
                {searchResult.totalGenerated.toLocaleString()} Wh
              </p>
            </div>

            {/* Total Consumed */}
            <div className="glass rounded-xl p-6">
              <div className="text-sm text-gray-400 mb-2">Total Consumed</div>
              <p className="font-mono text-2xl font-bold">
                {searchResult.totalConsumed.toLocaleString()} Wh
              </p>
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
