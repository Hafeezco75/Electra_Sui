'use client';

import { useState } from 'react';
import WalletConnect from '../../components/WalletConnect';

export default function ConsumerPage() {
  const [balance] = useState(1500); // Mock balance
  const [redeemAmount, setRedeemAmount] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(redeemAmount);
    if (amount > balance) {
      alert('Insufficient balance');
      return;
    }
    setIsRedeeming(true);
    // Mock redemption
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert(`Redeemed ${amount} kWh successfully!`);
    setIsRedeeming(false);
    setRedeemAmount('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">⚡</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">ELECTRA</h1>
        </div>
        <WalletConnect />
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Consumer Dashboard</h1>

        {/* Token Balance */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Energy Token Balance</h2>
          <div className="flex items-center">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
              <span className="text-3xl">⚡</span>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900">{balance}</p>
              <p className="text-gray-600">kWh Tokens</p>
            </div>
          </div>
        </div>

        {/* Redemption Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Redeem Tokens</h2>
          <form onSubmit={handleRedeem} className="space-y-6">
            <div>
              <label htmlFor="redeemAmount" className="block text-sm font-medium text-gray-700 mb-2">
                Amount to Redeem (kWh)
              </label>
              <input
                type="number"
                id="redeemAmount"
                value={redeemAmount}
                onChange={(e) => setRedeemAmount(e.target.value)}
                placeholder="e.g., 500"
                min="0"
                max={balance}
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isRedeeming}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              {isRedeeming ? 'Redeeming...' : 'Redeem Tokens'}
            </button>
          </form>
        </div>

        {/* Consumption History Placeholder */}
        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Consumption History</h2>
          <p className="text-gray-600">Redemption history will appear here.</p>
        </div>
      </main>
    </div>
  );
}