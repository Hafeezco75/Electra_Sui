"use client";

import { motion } from "framer-motion";
import { Wallet, User, Zap, Menu } from "lucide-react";
import { UserRole } from "@/app/dashboard/page";

interface TopBarProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  walletConnected: boolean;
  setWalletConnected: (connected: boolean) => void;
  onMenuClick?: () => void;
}

export default function TopBar({
  role,
  setRole,
  walletConnected,
  setWalletConnected,
  onMenuClick,
}: TopBarProps) {
  return (
    <header className="h-16 sm:h-20 bg-dark-card border-b border-dark-border flex items-center justify-between px-3 sm:px-6 md:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        {/* Hamburger Menu Button */}
        <motion.button
          onClick={onMenuClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="lg:hidden w-10 h-10 rounded-xl bg-dark-base border border-dark-border flex items-center justify-center text-gray-400 hover:text-electric hover:border-electric/50 transition-colors relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-electric/10 to-cyber/10 opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <Menu className="w-5 h-5 relative z-10" />
        </motion.button>

        {/* Role Display & Switcher (Demo Mode) */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          <span className="hidden md:block text-xs sm:text-sm text-gray-400 whitespace-nowrap">Demo Mode:</span>
          <div className="glass rounded-full p-0.5 sm:p-1 flex">
            <button
              onClick={() => setRole("consumer")}
              className={`px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full transition-all text-xs sm:text-sm ${
                role === "consumer"
                  ? "bg-electric text-dark-base font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-1 sm:gap-2">
                <User className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Consumer</span>
                <span className="sm:hidden">C</span>
              </span>
            </button>
            <button
              onClick={() => setRole("producer")}
              className={`px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full transition-all text-xs sm:text-sm ${
                role === "producer"
                  ? "bg-cyber text-white font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-1 sm:gap-2">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Producer</span>
                <span className="sm:hidden">P</span>
              </span>
            </button>
          </div>
          <span className="hidden xl:block text-xs text-gray-500 italic whitespace-nowrap">
            (In production, role is set at registration)
          </span>
        </div>
      </div>

      {/* Wallet Connection */}
      <motion.button
        onClick={() => setWalletConnected(!walletConnected)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full font-bold transition-all text-xs sm:text-sm relative overflow-hidden group ${
          walletConnected
            ? "glass border-electric/50 text-electric"
            : "bg-electric text-dark-base hover:bg-electric/90"
        }`}
      >
        {walletConnected && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-electric/20 to-cyber/20"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
        <Wallet className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
        {walletConnected ? (
          <span className="font-mono relative z-10 hidden sm:inline">0x742d...35a3</span>
        ) : (
          <span className="relative z-10">
            <span className="hidden sm:inline">Connect Wallet</span>
            <span className="sm:hidden">Connect</span>
          </span>
        )}
      </motion.button>
    </header>
  );
}
