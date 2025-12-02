"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Shield, AlertTriangle, Zap, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

interface Listing {
  id: string;
  seller: string;
  amount: number;
  price: string;
  trustScore: number;
  isSuspicious?: boolean;
}

interface MarketplaceGridProps {
  onPurchase: (listing: Listing) => void;
}

export default function MarketplaceGrid({ onPurchase }: MarketplaceGridProps) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      {
        id: "5",
        seller: "0x5d3a2f8c1b9e4a7d",
        amount: 2800,
        price: "0.135",
        trustScore: 96,
      },
      {
        id: "6",
        seller: "0x8f2e1c9d4a7b3e6f",
        amount: 1200,
        price: "0.058",
        trustScore: 94,
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

        {/* Lightning Strikes */}
        {mounted && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.svg
                key={i}
                className="absolute w-24 h-full pointer-events-none"
                style={{
                  left: `${20 + i * 25}%`,
                  top: 0,
                }}
                viewBox="0 0 80 800"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 6 + i * 1.5,
                  delay: i * 0.8,
                }}
              >
                <motion.path
                  d={`M 40 0 L ${35 + i * 2} 100 L ${45 - i} 100 L ${30 + i * 3} 200 L ${42 - i} 200 L ${25 + i * 2} 300 L ${40 - i} 300 L ${20 + i} 400 L ${38 - i * 2} 400 L ${15 + i * 2} 500 L ${35 - i} 500 L ${10 + i} 600 L ${30 - i * 2} 600 L ${5 + i * 3} 700 L ${25 - i} 700 L 0 800`}
                  stroke="#2979FF"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#glow)"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatDelay: 6 + i * 1.5,
                    delay: i * 0.8,
                  }}
                />
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
              </motion.svg>
            ))}
          </>
        )}

        {/* Corner Accents */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-cyber/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400/20 blur-3xl" />

        <div className="relative z-10 p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <motion.div
                key={isPurchasing ? "stopped" : "rotating"}
                className="relative w-16 h-16"
                animate={{
                  rotateY: isPurchasing ? 0 : [0, 360],
                }}
                transition={{
                  duration: isPurchasing ? 0 : 8,
                  repeat: isPurchasing ? 0 : Infinity,
                  ease: "linear",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyber to-blue-400 opacity-20 blur-xl" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyber/20 to-blue-400/20 border-2 border-cyber/50 flex items-center justify-center backdrop-blur-sm">
                  <ShoppingCart className="w-7 h-7 text-cyber" />
                </div>
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyber" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyber" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyber" />
              </motion.div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyber via-blue-400 to-cyber bg-clip-text text-transparent">
                  ENERGY EXCHANGE
                </h2>
                <p className="text-xs md:text-sm text-gray-500 font-mono uppercase tracking-wider">
                  {listings.length} Listings Available
                </p>
              </div>
            </div>

            {suspiciousCount > 0 && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-xl bg-alert/10 border border-alert/50 flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 text-alert" />
                <span className="text-sm font-mono text-alert font-bold">{suspiciousCount} THREAT</span>
              </motion.div>
            )}
          </div>

          {/* Marketplace Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: listing.isSuspicious ? 0.5 : 1,
                  y: 0 
                }}
                transition={{ delay: index * 0.1 }}
                whileHover={!listing.isSuspicious ? { y: -8, scale: 1.02 } : {}}
                className={`relative glass rounded-2xl p-6 border-2 overflow-hidden ${
                  listing.isSuspicious 
                    ? "border-alert/30 bg-alert/5 cursor-not-allowed" 
                    : "border-cyber/30 hover:border-cyber/60 cursor-pointer"
                }`}
              >
                {/* Card Background Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyber/10 to-transparent"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />

                {/* Fraud Badge */}
                {listing.isSuspicious && (
                  <div className="absolute top-4 right-4 z-10">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                      className="px-3 py-1 rounded-full bg-alert/20 border border-alert/50 flex items-center gap-1"
                    >
                      <AlertTriangle className="w-3 h-3 text-alert" />
                      <span className="text-xs font-bold text-alert">FLAGGED</span>
                    </motion.div>
                  </div>
                )}

                <div className="relative z-10">
                  {/* Amount - Large Display */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <Zap className="w-6 h-6 text-electric" />
                      <span className="text-4xl font-bold font-mono text-electric">
                        {listing.amount.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-400">Wh</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4 pb-4 border-b border-white/10">
                    <div className="text-sm text-gray-400 mb-1">Price</div>
                    <div className="text-2xl font-bold font-mono text-cyber">
                      {listing.price} ETH
                    </div>
                  </div>

                  {/* Seller & Trust Score */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Seller</div>
                      <div className="font-mono text-xs text-gray-300 truncate">
                        {listing.seller}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400">Trust Score</div>
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
                        <span className="font-mono font-bold">{listing.trustScore}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Buy Button */}
                  <motion.button
                    onClick={() => {
                      if (!listing.isSuspicious) {
                        setIsPurchasing(true);
                        setPurchasingId(listing.id);
                        setTimeout(() => {
                          onPurchase(listing);
                          setIsPurchasing(false);
                          setPurchasingId(null);
                        }, 800);
                      }
                    }}
                    whileHover={!listing.isSuspicious ? { scale: 1.05 } : {}}
                    whileTap={!listing.isSuspicious ? { scale: 0.95 } : {}}
                    animate={purchasingId === listing.id ? {
                      x: [-2, 2, -2, 2, 0],
                      boxShadow: [
                        "0 0 0px rgba(0, 255, 148, 0)",
                        "0 0 20px rgba(0, 255, 148, 0.8)",
                        "0 0 40px rgba(0, 255, 148, 1)",
                        "0 0 20px rgba(0, 255, 148, 0.8)",
                        "0 0 0px rgba(0, 255, 148, 0)",
                      ],
                    } : {}}
                    transition={{
                      duration: 0.4,
                      times: [0, 0.2, 0.5, 0.8, 1],
                    }}
                    disabled={listing.isSuspicious || isPurchasing}
                    className={`w-full py-3 rounded-xl font-bold transition-all relative overflow-hidden ${
                      listing.isSuspicious
                        ? "bg-alert/10 text-alert/50 border border-alert/30 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyber to-blue-500 text-white hover:from-cyber/90 hover:to-blue-500/90"
                    }`}
                  >
                    {/* Electric Zap Effect */}
                    {purchasingId === listing.id && (
                      <>
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute inset-0 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 0.15,
                              delay: i * 0.1,
                            }}
                          >
                            <svg className="absolute inset-0 w-full h-full">
                              <motion.path
                                d={`M ${Math.random() * 100} 0 L ${Math.random() * 100} ${Math.random() * 50} L ${Math.random() * 100} 100`}
                                stroke="#00FF94"
                                strokeWidth="2"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: [0, 1, 0] }}
                                transition={{ duration: 0.2, delay: i * 0.05 }}
                              />
                            </svg>
                          </motion.div>
                        ))}
                      </>
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {listing.isSuspicious ? (
                        "FLAGGED"
                      ) : purchasingId === listing.id ? (
                        <>⚡ PURCHASING</>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          BUY NOW
                        </>
                      )}
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
