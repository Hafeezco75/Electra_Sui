"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Shield, AlertTriangle, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

interface Listing {
  id: string;
  seller: string;
  amount: number;
  price: string;
  trustScore: number;
  isSuspicious?: boolean;
}

interface MarketplaceFeedProps {
  onPurchase: (listing: Listing) => void;
}

export default function MarketplaceFeed({ onPurchase }: MarketplaceFeedProps) {
  const [hoveredListing, setHoveredListing] = useState<string | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);

  // Initialize mock data with useState
  useEffect(() => {
    setListings([
      {
        id: "1",
        seller: "0x742d35a3f8b2c1e9",
        amount: 1500,
        price: "0.075",
        trustScore: 98,
      },
      {
        id: "2",
        seller: "0x9e3f1a7c2d8b4e6f",
        amount: 2200,
        price: "0.110",
        trustScore: 95,
      },
      {
        id: "3",
        seller: "0x4b8e2f9a1c7d3e5f",
        amount: 3500,
        price: "0.168",
        trustScore: 72,
        isSuspicious: true,
      },
      {
        id: "4",
        seller: "0x1c9d4e7f2a8b3c6e",
        amount: 1800,
        price: "0.090",
        trustScore: 99,
      },
    ]);
  }, []);

  const suspiciousCount = listings.filter(l => l.isSuspicious).length;

  return (
    <div className="relative">
      {/* Futuristic Container */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-cyber/30 bg-gradient-to-br from-dark-card via-dark-base to-dark-card">
        {/* Animated Circuit Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(#2979FF 1px, transparent 1px),
              linear-gradient(90deg, #2979FF 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }} />
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-cyber/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400/20 blur-3xl" />
        
        {/* Animated Data Stream */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyber to-transparent"
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        <div className="relative z-10 p-8">
          {/* Futuristic Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              {/* Holographic Icon */}
              <motion.div
                className="relative w-16 h-16"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyber to-blue-400 opacity-20 blur-xl" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyber/20 to-blue-400/20 border-2 border-cyber/50 flex items-center justify-center backdrop-blur-sm">
                  <ShoppingCart className="w-7 h-7 text-cyber" />
                </div>
                {/* Corner Brackets */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyber" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyber" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyber" />
              </motion.div>

              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyber via-blue-400 to-cyber bg-clip-text text-transparent">
                  ENERGY EXCHANGE
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-px w-8 bg-gradient-to-r from-cyber to-transparent" />
                  <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                    Decentralized Trading Protocol
                  </p>
                </div>
              </div>
            </div>

            {/* Holographic Stats */}
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="relative px-5 py-3 rounded-xl bg-cyber/10 border border-cyber/50 backdrop-blur-sm overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber/20 to-transparent"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <div className="relative flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyber" />
                  <span className="text-sm font-mono">
                    <span className="text-cyber font-bold text-lg">{listings.length}</span>
                    <span className="text-gray-400 ml-1 text-xs">ACTIVE</span>
                  </span>
                </div>
              </motion.div>

              {suspiciousCount > 0 && (
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="relative px-5 py-3 rounded-xl bg-alert/10 border border-alert/50 backdrop-blur-sm overflow-hidden"
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(255, 152, 0, 0.3)",
                      "0 0 20px rgba(255, 152, 0, 0.5)",
                      "0 0 10px rgba(255, 152, 0, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <div className="relative flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-alert animate-pulse" />
                    <span className="text-sm font-mono">
                      <span className="text-alert font-bold text-lg">{suspiciousCount}</span>
                      <span className="text-gray-400 ml-1 text-xs">THREAT</span>
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

        {/* Fraud Warning Banner */}
        {suspiciousCount > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-6 glass rounded-xl p-4 border-2 border-alert/50 bg-alert/10"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-alert animate-pulse" />
            <div>
              <div className="font-bold text-alert">
                {suspiciousCount} Suspicious {suspiciousCount === 1 ? "Listing" : "Listings"} Detected
              </div>
              <div className="text-sm text-gray-300 mt-1">
                Our fraud detection system has flagged potentially fraudulent activity. Flagged listings are dimmed and disabled.
              </div>
            </div>
          </div>
        </motion.div>
        )}

        <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-border">
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">
                Seller Address
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">
                Amount (Wh)
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">
                Price (ETH)
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">
                Trust Score
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing, index) => (
              <motion.tr
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: listing.isSuspicious ? 0.4 : 1, 
                  y: 0 
                }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredListing(listing.id)}
                onMouseLeave={() => setHoveredListing(null)}
                className={`border-b border-dark-border/50 transition-all ${
                  listing.isSuspicious 
                    ? "bg-alert/10 border-alert/30 cursor-not-allowed" 
                    : "hover:bg-white/5 cursor-pointer"
                }`}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm">{listing.seller}</span>
                    {listing.isSuspicious && (
                      <div className="relative group">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-alert/20 border border-alert/50">
                          <AlertTriangle className="w-4 h-4 text-alert animate-pulse" />
                          <span className="text-xs font-bold text-alert uppercase tracking-wide">
                            Fraud Alert
                          </span>
                        </div>
                        {hoveredListing === listing.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute left-0 top-10 z-10 glass rounded-lg p-4 w-72 border-2 border-alert/70 bg-alert/10"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-alert/30 flex items-center justify-center flex-shrink-0">
                                <AlertTriangle className="w-5 h-5 text-alert" />
                              </div>
                              <div>
                                <div className="font-bold text-alert text-base mb-2">
                                  ⚠️ Suspicious Anomaly Detected
                                </div>
                                <div className="text-sm text-gray-300 mb-2">
                                  Off-chain anomaly detected: Unusual meter spike pattern
                                </div>
                                <div className="text-xs text-gray-400 italic">
                                  This listing has been flagged by our fraud detection system. Purchase at your own risk.
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="font-mono font-bold">{listing.amount.toLocaleString()}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="font-mono text-electric">{listing.price}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <Shield
                      className={`w-4 h-4 ${
                        listing.trustScore >= 90
                          ? "text-electric"
                          : listing.trustScore >= 75
                          ? "text-cyber"
                          : "text-alert"
                      }`}
                    />
                    <span className="font-mono">{listing.trustScore}%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <motion.button
                    onClick={() => !listing.isSuspicious && onPurchase(listing)}
                    whileHover={!listing.isSuspicious ? { scale: 1.05 } : {}}
                    whileTap={!listing.isSuspicious ? { scale: 0.95 } : {}}
                    disabled={listing.isSuspicious}
                    className={`px-6 py-2 rounded-lg font-bold transition-colors ${
                      listing.isSuspicious
                        ? "bg-alert/10 text-alert/50 border border-alert/30 cursor-not-allowed"
                        : "bg-cyber/20 text-cyber border border-cyber/50 hover:bg-cyber/30"
                    }`}
                  >
                    {listing.isSuspicious ? "Flagged" : "Buy"}
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
      </div>
    </div>
  );
}
