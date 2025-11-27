'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSignAndExecuteTransaction, useCurrentAccount, useCurrentWallet } from '@mysten/dapp-kit';
import WalletConnect from '../../components/WalletConnect';
import { TransactionBlock } from '@mysten/sui.js/transactions';
// import { MeterAttestation } from '../../lib/contract';

interface MeterAttestation {
  user_meter: string;
  attestor: string;
  attestor_signature: number[];
  kwh: number;
  timestamp: number;
}

export default function ProducerPage() {
  const [meterId, setMeterId] = useState('');
  const [kwh, setKwh] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const account = useCurrentAccount();
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create attestation (this is simplified - in real implementation,
      // you'd get the user_meter ID from the registry and create proper signature)
      const attestation: MeterAttestation = {
        user_meter: '0x' + '0'.repeat(64), // Placeholder - should be actual meter object ID
        attestor: '0x' + '0'.repeat(64), // Placeholder - should be attestor address
        attestor_signature: [], // Placeholder - should be actual signature
        kwh: parseFloat(kwh),
        timestamp: parseInt(timestamp),
      };

      // Real contract call - now that contract is deployed!
      const txb = new TransactionBlock();
      const packageId = process.env.NEXT_PUBLIC_CONTRACT_PACKAGE_ID!;

      // Create UID for the attestation
      const uid = txb.moveCall({
        target: '0x2::object::new',
        arguments: [txb.pure.address(account?.address || '')],
      });

      // Dummy public key for testing (32 bytes for Ed25519)
      const dummyPublicKey = new Uint8Array(32).fill(1);

      // Create attestation struct properly
      const userAddress = account?.address || '';

      // Use a dummy but valid-looking object ID
      const dummyMeterId = '0x0000000000000000000000000000000000000000000000000000000000000001';

      const attestationStruct = {
        user_meter: txb.object(dummyMeterId),
        attestor: txb.pure.address(userAddress),
        attestor_signature: txb.pure(attestation.attestor_signature),
        kwh: txb.pure.u64(attestation.kwh),
        timestamp: txb.pure.u64(attestation.timestamp),
      };

      txb.moveCall({
        target: `${packageId}::electras::post_attestation`,
        arguments: [
          attestationStruct as any,
          uid,
          txb.pure.address(userAddress),
          txb.pure.u64(attestation.kwh),
          txb.pure.u64(attestation.timestamp),
          txb.pure(dummyPublicKey),
        ],
      });

      // If the current wallet supports the `sui:signAndExecuteTransactionBlock` feature,
      // call that directly (it accepts a TransactionBlock). Otherwise, fall back to the
      // `useSignAndExecuteTransaction` hook which expects a transaction with `toJSON`.
      // Execute the transaction. The dapp-kit `useSignAndExecuteTransaction` hook expects
      // an object with a `toJSON` method (or a serialized string). TransactionBlock
      // builders don't always expose `toJSON` directly depending on SDK version, so
      // wrap it in an object that implements `toJSON` and `setSenderIfNotSet` and
      // internally builds the transaction using the client provided to the wallet.
        await signAndExecute({
        transaction: {
          // `setSenderIfNotSet` is used by dapp-kit to inject the current signer address
          setSenderIfNotSet: (sender: string) => txb.setSenderIfNotSet(sender),
          // toJSON will be called by the wallet with `{ supportedIntents, client }`.
          // We simply build the transaction block using the provided client and
          // return the transaction's JSON representation.
          async toJSON({ client }: { client: any; supportedIntents?: string[] }) {
            const bytes = await txb.build({ client });
            // Import Transaction at runtime so we don't rely on a specific TS export
            // signature in different SDK versions.
            const txModule = await import('@mysten/sui.js/transactions');
            const txModuleAny: any = txModule;
            const txClass = txModuleAny.Transaction ?? txModuleAny.Transactions ?? txModuleAny.default?.Transactions ?? txModuleAny.default?.Transaction;
            const tx = txClass.from(bytes as Uint8Array);
            return tx.toJSON({ client });
          },
        } as any,
        });

      alert('Meter reading submitted successfully!');
      setMeterId('');
      setKwh('');
      setTimestamp('');
    } catch (error) {
      console.error('Error submitting reading:', error);
      alert('Error submitting reading. Check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">⚡</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">ELECTRA Producer</h1>
                  <p className="text-sm text-gray-500">Energy Production Dashboard</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">All Systems Operational</span>
              </div>
              <WalletConnect />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Producer!</h1>
          <p className="text-gray-600 mt-2">Monitor your energy production, manage tokens, and track your impact.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Token Balance</p>
                <p className="text-3xl font-bold text-gray-900">2,450</p>
                <p className="text-xs text-gray-500">Available to sell</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🪙</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">+12%</span>
              <span className="text-gray-500 ml-2">from last week</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Production</p>
                <p className="text-3xl font-bold text-gray-900">8,320</p>
                <p className="text-xs text-gray-500">kWh generated</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">+8%</span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-3xl font-bold text-gray-900">$1,247</p>
                <p className="text-xs text-gray-500">This month</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">+15%</span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Carbon Offset</p>
                <p className="text-3xl font-bold text-gray-900">4.2</p>
                <p className="text-xs text-gray-500">Tons CO₂</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">+6%</span>
              <span className="text-gray-500 ml-2">environmental impact</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Production Submission */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Submit Production Data</h2>
                    <p className="text-sm text-gray-600 mt-1">Record your energy generation for token minting</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Ready to submit</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="meterId" className="block text-sm font-medium text-gray-700 mb-2">
                        Meter ID
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="meterId"
                          value={meterId}
                          onChange={(e) => setMeterId(e.target.value)}
                          placeholder="e.g., SOLAR-123"
                          className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                        <div className="absolute right-3 top-3 w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-xs">🔢</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="kwh" className="block text-sm font-medium text-gray-700 mb-2">
                        Energy Produced (kWh)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          id="kwh"
                          value={kwh}
                          onChange={(e) => setKwh(e.target.value)}
                          placeholder="e.g., 5300"
                          min="0"
                          step="0.01"
                          className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                        <div className="absolute right-3 top-3 text-gray-500 text-sm">kWh</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="timestamp" className="block text-sm font-medium text-gray-700 mb-2">
                      Reading Timestamp
                    </label>
                    <input
                      type="datetime-local"
                      id="timestamp"
                      value={timestamp}
                      onChange={(e) => setTimestamp(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs">ℹ️</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-blue-900">Token Minting Preview</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          This reading will generate approximately <strong>{kwh ? Math.floor(parseFloat(kwh) * 0.1) : 0} tokens</strong> once attested.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing Submission...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">📤</span>
                        Submit Production Data
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { type: 'Production Submitted', amount: '2,450 kWh', time: '2 hours ago', status: 'pending' },
                    { type: 'Tokens Minted', amount: '245 tokens', time: '1 day ago', status: 'completed' },
                    { type: 'Tokens Sold', amount: '150 tokens', time: '2 days ago', status: 'completed' },
                    { type: 'Payment Received', amount: '$187.50', time: '2 days ago', status: 'completed' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.status === 'completed' ? 'bg-green-100' :
                          activity.status === 'pending' ? 'bg-yellow-100' : 'bg-gray-100'
                        }`}>
                          <span className={`text-sm ${
                            activity.status === 'completed' ? 'text-green-600' :
                            activity.status === 'pending' ? 'text-yellow-600' : 'text-gray-600'
                          }`}>
                            {activity.status === 'completed' ? '✓' :
                             activity.status === 'pending' ? '⏳' : '○'}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{activity.amount}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                          activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View full activity log →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center">
                  <span className="mr-2">🛒</span>
                  List Tokens for Sale
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors flex items-center">
                  <span className="mr-2">📊</span>
                  View Analytics
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors flex items-center">
                  <span className="mr-2">⚙️</span>
                  Settings
                </button>
              </div>
            </div>

            {/* Production Goals */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Goals</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Production Target</span>
                    <span className="text-gray-900">8,320 / 10,000 kWh</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '83%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Revenue Goal</span>
                    <span className="text-gray-900">$1,247 / $1,500</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '83%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Blockchain</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Smart Contract</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Marketplace</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Online
                  </span>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-600">💬</span>
                </div>
                <h3 className="font-semibold text-gray-900">Need Help?</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Get support for production tracking, token management, or technical issues.
              </p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}