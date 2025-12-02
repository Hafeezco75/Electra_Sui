"use client";

import { motion } from "framer-motion";
import { Zap, LayoutDashboard, Search, ShoppingCart } from "lucide-react";

interface SidebarProps {
  activeView: "dashboard" | "marketplace" | "registry";
  setActiveView: (view: "dashboard" | "marketplace" | "registry") => void;
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "marketplace", label: "Marketplace", icon: ShoppingCart },
    { id: "registry", label: "Meter Registry", icon: Search },
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-72 bg-dark-card border-r border-dark-border flex flex-col h-screen sticky top-0"
    >
      {/* Logo */}
      <div className="p-6 border-b border-dark-border relative overflow-hidden">
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-electric/5 to-cyber/5"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
        <div className="flex items-center gap-3 relative z-10">
          <motion.div
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric/20 to-cyber/20 flex items-center justify-center border border-electric/30"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring" }}
          >
            <Zap className="w-7 h-7 text-electric" />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-electric to-cyber bg-clip-text text-transparent">
              VoltChain
            </h1>
            <p className="text-xs text-gray-500 font-mono">Energy Protocol</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="mb-3 px-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Navigation
          </span>
        </div>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <motion.button
                onClick={() => setActiveView(item.id as any)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden ${
                  activeView === item.id
                    ? "bg-electric/10 text-electric border border-electric/30 shadow-lg shadow-electric/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
                }`}
              >
                {activeView === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-electric/10 to-cyber/10"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <item.icon className="w-5 h-5 relative z-10" />
                <span className="font-medium relative z-10">{item.label}</span>
                {activeView === item.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-2 h-2 rounded-full bg-electric relative z-10"
                  />
                )}
              </motion.button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-dark-border space-y-3">
        <div className="glass rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-electric animate-pulse" />
            <span className="text-xs text-gray-400">Network Status</span>
          </div>
          <p className="text-sm font-mono text-electric">Sui Testnet</p>
        </div>
        
        <div className="text-xs text-gray-400 text-center">
          <div className="mb-1">Powered by Sui Move</div>
          <div className="font-mono text-cyber">electras::electras</div>
        </div>
      </div>
    </motion.aside>
  );
}
