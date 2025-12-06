"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Shield, AlertTriangle, Zap, TrendingUp, MapPin, BadgeCheck, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";

interface Listing {
  id: string;
  seller: string;
  sellerName: string;
  amount: number;
  pricePerWh: number;
  totalPriceSUI: number;
  totalPriceUSDC: number;
  trustScore: number;
  isSuspicious?: boolean;
  location: string;
  verified: boolean;
}

interface MarketplaceGridProps {
  onPurchase: (listing: Listing) => void;
}

export default function MarketplaceGrid({ onPurchase }: MarketplaceGridProps) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<"SUI" | "USDC">("SUI");

  useEffect(() => {
    setMounted(true);
    setListings([
      {
        id: "1",
        seller: "0x742d35a3f8b2c1e9",
        sellerName: "SolarFarm Pro",
        amount: 1500,
        pricePerWh: 0.00005,
        totalPriceSUI: 0.075,
        totalPriceUSDC: 4.50,
        trustScore: 98,
        location: "California, USA",
        verified: true,
      },
      {
        id: "2",
        seller: "0x9e3f1a7c2d8b4e6f",
        sellerName: "GreenEnergy Co",
        amount: 2200,
        pricePerWh: 0.00005,
        totalPriceSUI: 0.110,
        totalPriceUSDC: 6.60,
        trustScore: 95,
        location: "Texas, USA",
        verified: true,
      },
      {
        id: "3",
        seller: "0x4b8e2f9a1c7d3e5f",
        sellerName: "QuickPower",
        amount: 3500,
        pricePerWh: 0.000048,
        totalPriceSUI: 0.168,
        totalPriceUSDC: 10.08,
        trustScore: 72,
        isSuspicious: true,
        location: "Unknown",
        verified: false,
      },
      {
        id: "4",
        seller: "0x1c9d4e7f2a8b3c6e",
        sellerName: "EcoGrid Systems",
        amount: 1800,
        pricePerWh: 0.00005,
        totalPriceSUI: 0.090,
        totalPriceUSDC: 5.40,
        trustScore: 99,
        location: "New York, USA",
        verified: true,
      },
      {
        id: "5",
        seller: "0x5d3a2f8c1b9e4a7d",
        sellerName: "WindPower Ltd",
        amount: 2800,
        pricePerWh: 0.000048,
        totalPriceSUI: 0.135,
        totalPriceUSDC: 8.10,
        trustScore: 96,
        location: "Oregon, USA",
        verified: true,
      },
      {
        id: "6",
        seller: "0x8f2e1c9d4a7b3e6f",
        sellerName: "HydroEnergy",
        amount: 1200,
        pricePerWh: 0.000048,
        totalPriceSUI: 0.058,
        totalPriceUSDC: 3.48,
        trustScore: 94,
        location: "Washington, USA",
        verified: true,
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
                  {/* Seller Info Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-white truncate">{listing.sellerName}</h3>
                        {listing.verified && (
                          <BadgeCheck className="w-5 h-5 text-electric flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{listing.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-electric/10 border border-electric/30">
                      <Shield className="w-3 h-3 text-electric" />
                      <span className="text-xs font-bold text-electric">{listing.trustScore}%</span>
                    </div>
                  </div>

                  {/* Energy Amount */}
                  <div className="mb-4 pb-4 border-b border-white/10">
                    <div className="text-xs text-gray-400 mb-2">Available Energy</div>
                    <div className="flex items-baseline gap-2">
                      <Zap className="w-5 h-5 text-electric" />
                      <span className="text-3xl font-bold font-mono text-electric">
                        {listing.amount.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-400">Wh</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 font-mono">
                      @ {listing.pricePerWh.toFixed(8)} per Wh
                    </div>
                  </div>

                  {/* Dual Currency Pricing */}
                  <div className="mb-4 space-y-2">
                    <div className="text-xs text-gray-400 mb-2">Total Price</div>
                    
                    {/* SUI Price */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-cyber/10 border border-cyber/30">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-cyber/20 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-cyber" />
                        </div>
                        <span className="text-sm font-medium text-gray-300">SUI</span>
                      </div>
                      <span className="text-lg font-bold font-mono text-cyber">
                        {listing.totalPriceSUI.toFixed(3)}
                      </span>
                    </div>

                    {/* USDC Price */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-electric/10 border border-electric/30">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-electric/20 flex items-center justify-center">
                          <DollarSign className="w-4 h-4 text-electric" />
                        </div>
                        <span className="text-sm font-medium text-gray-300">USDC</span>
                      </div>
                      <span className="text-lg font-bold font-mono text-electric">
                        ${listing.totalPriceUSDC.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Buy Button */}
                  <motion.button
                    onClick={() => {
                      if (!listing.isSuspicious) {
                        setSelectedListing(listing);
                        setShowPaymentModal(true);
                      }
                    }}
                    whileHover={!listing.isSuspicious ? { scale: 1.02 } : {}}
                    whileTap={!listing.isSuspicious ? { scale: 0.98 } : {}}
                    disabled={listing.isSuspicious}
                    className={`w-full py-3 rounded-xl font-bold transition-all relative overflow-hidden ${
                      listing.isSuspicious
                        ? "bg-alert/10 text-alert/50 border border-alert/30 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyber via-electric to-cyber text-white hover:shadow-lg hover:shadow-cyber/50"
                    }`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {listing.isSuspicious ? (
                        <>
                          <AlertTriangle className="w-4 h-4" />
                          FLAGGED
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          BUY NOW
                        </>
                      )}
                    </span>
                  </motion.button>

                  {/* Seller Address */}
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <div className="text-[10px] text-gray-500 mb-1">Seller Address</div>
                    <div className="font-mono text-xs text-gray-400 truncate">
                      {listing.seller}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedListing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full"
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-cyber/40 via-electric/40 to-cyber/40 rounded-2xl opacity-50 blur-2xl"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              <div className="relative glass rounded-2xl p-6 border-2 border-white/10">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyber to-electric bg-clip-text text-transparent">
                    Select Payment Method
                  </h3>
                  <p className="text-sm text-gray-400">Choose your preferred currency</p>
                </div>

                {/* Listing Summary */}
                <div className="mb-6 p-4 rounded-xl bg-dark-base/50 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">Seller</span>
                    <span className="text-sm font-bold text-white">{selectedListing.sellerName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Energy</span>
                    <span className="text-sm font-bold text-electric">{selectedListing.amount.toLocaleString()} Wh</span>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="space-y-3 mb-6">
                  {/* SUI Option */}
                  <motion.button
                    onClick={() => setSelectedPayment("SUI")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      selectedPayment === "SUI"
                        ? "border-cyber/50 bg-cyber/10 shadow-lg shadow-cyber/20"
                        : "border-white/10 bg-dark-base/30 hover:border-cyber/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          selectedPayment === "SUI" ? "bg-cyber/20" : "bg-cyber/10"
                        }`}>
                          <Zap className="w-6 h-6 text-cyber" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-white">Pay with SUI</div>
                          <div className="text-xs text-gray-400">Sui Network Token</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold font-mono text-cyber">
                          {selectedListing.totalPriceSUI.toFixed(3)}
                        </div>
                        <div className="text-xs text-gray-400">SUI</div>
                      </div>
                    </div>
                  </motion.button>

                  {/* USDC Option */}
                  <motion.button
                    onClick={() => setSelectedPayment("USDC")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      selectedPayment === "USDC"
                        ? "border-electric/50 bg-electric/10 shadow-lg shadow-electric/20"
                        : "border-white/10 bg-dark-base/30 hover:border-electric/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          selectedPayment === "USDC" ? "bg-electric/20" : "bg-electric/10"
                        }`}>
                          <DollarSign className="w-6 h-6 text-electric" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-white">Pay with USDC</div>
                          <div className="text-xs text-gray-400">USD Coin Stablecoin</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold font-mono text-electric">
                          ${selectedListing.totalPriceUSDC.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-400">USDC</div>
                      </div>
                    </div>
                  </motion.button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => setShowPaymentModal(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 rounded-xl border-2 border-white/10 text-gray-400 font-bold hover:border-white/20 hover:text-white transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setIsPurchasing(true);
                      setPurchasingId(selectedListing.id);
                      setShowPaymentModal(false);
                      setTimeout(() => {
                        onPurchase({
                          ...selectedListing,
                          paymentMethod: selectedPayment,
                        } as any);
                        setIsPurchasing(false);
                        setPurchasingId(null);
                        setSelectedListing(null);
                      }, 1500);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 py-3 rounded-xl font-bold text-white relative overflow-hidden ${
                      selectedPayment === "SUI"
                        ? "bg-gradient-to-r from-cyber/80 to-blue-500/80"
                        : "bg-gradient-to-r from-electric/80 to-cyan-400/80"
                    }`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    />
                    <span className="relative z-10">Confirm Purchase</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
