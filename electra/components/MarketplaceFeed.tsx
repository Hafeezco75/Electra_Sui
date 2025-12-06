"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Shield, AlertTriangle, TrendingUp, MapPin, BadgeCheck, Zap, DollarSign } from "lucide-react";
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

interface MarketplaceFeedProps {
  onPurchase: (listing: Listing) => void;
}

export default function MarketplaceFeed({ onPurchase }: MarketplaceFeedProps) {
  const [hoveredListing, setHoveredListing] = useState<string | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<"SUI" | "USDC">("SUI");

  // Initialize mock data with useState
  useEffect(() => {
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



        <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-border">
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">
                Seller
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">
                Location
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">
                Amount (Wh)
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">
                Price (SUI)
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">
                Price (USDC)
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">
                Trust
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
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{listing.sellerName}</span>
                        {listing.verified && (
                          <BadgeCheck className="w-4 h-4 text-electric" />
                        )}
                      </div>
                      {listing.isSuspicious && (
                        <div className="relative group">
                          <div className="flex items-center gap-1 mt-1">
                            <AlertTriangle className="w-3 h-3 text-alert animate-pulse" />
                            <span className="text-xs font-bold text-alert">FLAGGED</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5 text-sm text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span>{listing.location}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-electric" />
                    <span className="font-mono font-bold">{listing.amount.toLocaleString()}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-cyber" />
                    <span className="font-mono text-cyber font-bold">{listing.totalPriceSUI.toFixed(3)}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-electric" />
                    <span className="font-mono text-electric font-bold">${listing.totalPriceUSDC.toFixed(2)}</span>
                  </div>
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
                    <span className="font-mono font-bold">{listing.trustScore}%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <motion.button
                    onClick={() => {
                      if (!listing.isSuspicious) {
                        setSelectedListing(listing);
                        setShowPaymentModal(true);
                      }
                    }}
                    whileHover={!listing.isSuspicious ? { scale: 1.05 } : {}}
                    whileTap={!listing.isSuspicious ? { scale: 0.95 } : {}}
                    disabled={listing.isSuspicious}
                    className={`relative px-6 py-2 rounded-lg font-bold transition-colors overflow-hidden ${
                      listing.isSuspicious
                        ? "bg-alert/10 text-alert/50 border border-alert/30 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyber to-electric text-white border border-cyber/50 hover:shadow-lg hover:shadow-cyber/50"
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {listing.isSuspicious ? (
                        <>
                          <AlertTriangle className="w-4 h-4" />
                          Flagged
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          Buy
                        </>
                      )}
                    </span>
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
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
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-cyber/40 via-electric/40 to-cyber/40 rounded-2xl opacity-50 blur-2xl"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="relative glass rounded-2xl p-6 border-2 border-white/10">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyber to-electric bg-clip-text text-transparent">
                    Select Payment Method
                  </h3>
                  <p className="text-sm text-gray-400">Choose your preferred currency</p>
                </div>

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

                <div className="space-y-3 mb-6">
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
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
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
