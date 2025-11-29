"use client";

import { motion } from "framer-motion";
import { Zap, LayoutDashboard, Search } from "lucide-react";

interface SidebarProps {
  activeView: "dashboard" | "registry";
  setActiveView: (view: "dashboard" | "registry") => void;
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "registry", label: "Meter Registry", icon: Search },
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-72 bg-dark-card border-r border-dark-border flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-dark-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-electric/20 flex items-center justify-center">
            <Zap className="w-6 h-6 text-electric" />
          </div>
          <div>
            <h1 className="text-xl font-bold">VoltChain</h1>
            <p className="text-xs text-gray-500">Energy Protocol</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveView(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeView === item.id
                    ? "bg-electric/10 text-electric border border-electric/30"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
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
