"use client";

import { motion } from "framer-motion";
import { Wallet, User, Zap } from "lucide-react";
import { UserRole } from "@/app/dashboard/page";

interface TopBarProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  walletConnected: boolean;
  setWalletConnected: (connected: boolean) => void;
}

export default function TopBar({
  role,
  setRole,
  walletConnected,
  setWalletConnected,
}: TopBarProps) {
  return (
    <header className="h-20 bg-dark-card border-b border-dark-border flex items-center justify-between px-8">
      {/* Role Display & Switcher (Demo Mode) */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">Demo Mode - Switch Role:</span>
        <div className="glass rounded-full p-1 flex">
          <button
            onClick={() => setRole("consumer")}
            className={`px-6 py-2 rounded-full transition-all ${
              role === "consumer"
                ? "bg-electric text-dark-base font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Consumer
            </span>
          </button>
          <button
            onClick={() => setRole("producer")}
            className={`px-6 py-2 rounded-full transition-all ${
              role === "producer"
                ? "bg-cyber text-white font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Producer
            </span>
          </button>
        </div>
        <span className="text-xs text-gray-500 italic">
          (In production, role is set at registration)
        </span>
      </div>

      {/* Wallet Connection */}
      <motion.button
        onClick={() => setWalletConnected(!walletConnected)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-3 px-6 py-3 rounded-full font-bold transition-all ${
          walletConnected
            ? "glass border-electric/50 text-electric"
            : "bg-electric text-dark-base hover:bg-electric/90"
        }`}
      >
        <Wallet className="w-5 h-5" />
        {walletConnected ? (
          <span className="font-mono">0x742d...35a3</span>
        ) : (
          <span>Connect Wallet</span>
        )}
      </motion.button>
    </header>
  );
}
