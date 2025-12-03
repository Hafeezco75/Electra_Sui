"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import ConsumerView from "@/components/ConsumerView";
import ProducerView from "@/components/ProducerView";
import MeterRegistry from "@/components/MeterRegistry";
import MarketplaceView from "@/components/MarketplaceView";

export type UserRole = "consumer" | "producer";

export default function Dashboard() {
  const [role, setRole] = useState<UserRole>("consumer");
  const [walletConnected, setWalletConnected] = useState(false);
  const [activeView, setActiveView] = useState<"dashboard" | "marketplace" | "registry">("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-dark-base overflow-hidden">
      {/* Desktop Sidebar - Always visible on lg+ */}
      <div className="hidden lg:block">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
      </div>

      {/* Mobile Sidebar - Toggleable */}
      <div className="lg:hidden">
        <Sidebar 
          activeView={activeView} 
          setActiveView={setActiveView}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden w-full lg:w-auto">
        <TopBar
          role={role}
          setRole={setRole}
          walletConnected={walletConnected}
          setWalletConnected={setWalletConnected}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeView === "dashboard" ? (
              <AnimatePresence mode="wait">
                {role === "consumer" ? (
                  <motion.div
                    key="consumer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ConsumerView walletConnected={walletConnected} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="producer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProducerView walletConnected={walletConnected} />
                  </motion.div>
                )}
              </AnimatePresence>
            ) : activeView === "marketplace" ? (
              <motion.div
                key="marketplace"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MarketplaceView />
              </motion.div>
            ) : (
              <motion.div
                key="registry"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MeterRegistry />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
