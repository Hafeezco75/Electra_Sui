'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import WalletConnect from '../../components/WalletConnect';
import { buyToken, getListings } from '../../lib/contract';

interface Listing {
  id: string;
  seller: string;
  quantity: number;
  price: number;
  expiry: string;
}

export default function MarketplacePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  useEffect(() => {
    // Load listings from contract
    const loadListings = async () => {
      try {
        const marketplaceId = process.env.NEXT_PUBLIC_MARKETPLACE_ID;

        if (marketplaceId && marketplaceId !== 'your_deployed_package_id_here') {
          // Contract is deployed, fetch real data
          const marketplaceData = await getListings(marketplaceId);
          // Parse the data (this would need proper parsing of the Sui object)
          // For now, keep mock data as example
          setListings([
            { id: '1', seller: '0x123...abc', quantity: 1000, price: 0.1, expiry: '2025-12-01' },
            { id: '2', seller: '0x456...def', quantity: 500, price: 0.12, expiry: '2025-11-30' },
            { id: '3', seller: '0x789...ghi', quantity: 2000, price: 0.09, expiry: '2025-12-15' },
          ]);
        } else {
          // Contract not deployed, use mock data
          setListings([
            { id: '1', seller: '0x123...abc', quantity: 1000, price: 0.1, expiry: '2025-12-01' },
            { id: '2', seller: '0x456...def', quantity: 500, price: 0.12, expiry: '2025-11-30' },
            { id: '3', seller: '0x789...ghi', quantity: 2000, price: 0.09, expiry: '2025-12-15' },
          ]);
        }
      } catch (error) {
        console.error('Error loading listings:', error);
        // Fallback to mock data on error
        setListings([
          { id: '1', seller: '0x123...abc', quantity: 1000, price: 0.1, expiry: '2025-12-01' },
          { id: '2', seller: '0x456...def', quantity: 500, price: 0.12, expiry: '2025-11-30' },
          { id: '3', seller: '0x789...ghi', quantity: 2000, price: 0.09, expiry: '2025-12-15' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, []);

  const handleBuy = async (listingId: string) => {
    try {
      // Placeholder IDs - should be actual object IDs
      const marketplaceId = '0xplaceholder';
      const buyer = '0xplaceholder'; // Should be from wallet
      const listing = listings.find(l => l.id === listingId);
      if (!listing) return;

      await buyToken(marketplaceId, buyer, listingId, listing.quantity * listing.price, { signAndExecute });
      alert(`Successfully purchased listing ${listingId}!`);
    } catch (error) {
      console.error('Error buying token:', error);
      alert('Error purchasing token. Check console for details.');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading marketplace...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">ELECTRA</h1>
            </Link>
            <WalletConnect />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Energy Token Marketplace</h1>
          <p className="text-gray-600">Trade verified renewable energy tokens securely on the blockchain</p>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-600">📊</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{listings.length}</p>
                <p className="text-sm text-gray-600">Active Listings</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-600">💰</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {listings.reduce((sum, l) => sum + (l.quantity * l.price), 0).toFixed(1)}
                </p>
                <p className="text-sm text-gray-600">Total Value (SUI)</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-yellow-600">⚡</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {listings.reduce((sum, l) => sum + l.quantity, 0)}
                </p>
                <p className="text-sm text-gray-600">Total kWh Available</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-purple-600">🌱</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">100%</p>
                <p className="text-sm text-gray-600">Renewable Energy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 p-6 group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <span className="text-white text-xl">⚡</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">Energy Tokens</h3>
                    <p className="text-sm text-gray-600 font-mono">{listing.seller}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">
                      Verified
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Quantity</span>
                    <span className="font-bold text-gray-900">{listing.quantity.toLocaleString()} kWh</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price per kWh</span>
                    <span className="font-bold text-gray-900">{listing.price} SUI</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="text-gray-600">Total Cost</span>
                    <span className="font-bold text-xl text-gray-900">{(listing.quantity * listing.price).toFixed(2)} SUI</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Expires</span>
                    <span className="text-gray-700">{listing.expiry}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleBuy(listing.id)}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <span className="mr-2">🛒</span>
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        )}

        {listings.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📭</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings available</h3>
            <p className="text-gray-600">Check back later for new energy token listings</p>
          </div>
        )}
      </main>
    </div>
  );
}