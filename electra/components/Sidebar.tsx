"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Zap, LayoutDashboard, Search, ShoppingCart, X } from "lucide-react";

interface SidebarProps {
  activeView: "dashboard" | "marketplace" | "registry";
  setActiveView: (view: "dashboard" | "marketplace" | "registry") => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ activeView, setActiveView, isOpen = true, onClose }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "marketplace", label: "Marketplace", icon: ShoppingCart },
    { id: "registry", label: "Meter Registry", icon: Search },
  ];

  const handleNavClick = (view: "dashboard" | "marketplace" | "registry") => {
    setActiveView(view);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && onClose && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed lg:sticky top-0 left-0 w-72 bg-dark-card border-r border-dark-border flex flex-col h-screen z-50"
      >
      {/* Logo */}
      <div className="p-4 sm:p-6 border-b border-dark-border relative overflow-hidden">
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
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-electric/20 to-cyber/20 flex items-center justify-center border border-electric/30"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring" }}
            >
              <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-electric" />
            </motion.div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-electric to-cyber bg-clip-text text-transparent">
                VoltChain
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-500 font-mono">Energy Protocol</p>
            </div>
          </div>
          
          {/* Mobile Close Button */}
          {onClose && (
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden w-8 h-8 rounded-lg bg-dark-base border border-dark-border flex items-center justify-center text-gray-400 hover:text-white hover:border-electric/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 sm:p-4 overflow-y-auto">
        <div className="mb-3 px-2">
          <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">
            Navigation
          </span>
        </div>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.button
                onClick={() => handleNavClick(item.id as any)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all relative overflow-hidden ${
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
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                <span className="text-sm sm:text-base font-medium relative z-10">{item.label}</span>
                {activeView === item.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-2 h-2 rounded-full bg-electric relative z-10"
                  />
                )}
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3 sm:p-4 border-t border-dark-border space-y-3">
        <div className="glass rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-electric animate-pulse" />
            <span className="text-[10px] sm:text-xs text-gray-400">Network Status</span>
          </div>
          <p className="text-xs sm:text-sm font-mono text-electric">Sui Testnet</p>
        </div>
        
        <div className="text-[10px] sm:text-xs text-gray-400 text-center">
          <div className="mb-1">Powered by Sui Move</div>
          <div className="font-mono text-cyber text-[9px] sm:text-xs">electras::electras</div>
        </div>
      </div>
    </motion.aside>
    </>
  );
}
