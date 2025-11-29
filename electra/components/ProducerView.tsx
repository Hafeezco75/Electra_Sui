"use client";

import { motion } from "framer-motion";
import MintingConsole from "./MintingConsole";
import ConsumerTopUp from "./ConsumerTopUp";
import ContractInfo from "./ContractInfo";

interface ProducerViewProps {
  walletConnected: boolean;
}

export default function ProducerView({ walletConnected }: ProducerViewProps) {
  if (!walletConnected) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-12 text-center max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-400">
            Please connect your wallet to access the producer dashboard
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">Producer Dashboard</h1>
        <p className="text-gray-400">Mint energy tokens and manage distribution</p>
      </motion.div>

      <ContractInfo />
      
      <div className="grid lg:grid-cols-2 gap-8">
        <MintingConsole />
        <ConsumerTopUp />
      </div>
    </div>
  );
}
