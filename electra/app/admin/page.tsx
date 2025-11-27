'use client';

import { useState } from 'react';
import Link from 'next/link';
import WalletConnect from '../../components/WalletConnect';

const mockAlerts = [
  { id: 1, meterId: 'SOLAR-123', type: 'Fraud Detected', message: 'Sudden spike in production', timestamp: '2025-11-22 10:00', severity: 'high', status: 'unresolved' },
  { id: 2, meterId: 'WIND-456', type: 'Anomaly', message: 'Production below threshold', timestamp: '2025-11-22 09:30', severity: 'medium', status: 'investigating' },
  { id: 3, meterId: 'HYDRO-789', type: 'Tamper Alert', message: 'Meter bypass detected', timestamp: '2025-11-22 08:45', severity: 'critical', status: 'resolved' },
];

const mockProducers = [
  { id: 1, name: 'Green Solar Co.', wallet: '0x1234...abcd', meters: 5, totalTokens: 12500, status: 'Active', revenue: 1250.50, lastActive: '2 hours ago' },
  { id: 2, name: 'Wind Power Inc.', wallet: '0x5678...efgh', meters: 3, totalTokens: 8900, status: 'Active', revenue: 890.25, lastActive: '1 hour ago' },
  { id: 3, name: 'Hydro Electric Ltd.', wallet: '0x9abc...ijkl', meters: 2, totalTokens: 6200, status: 'Suspended', revenue: 0, lastActive: '3 days ago' },
];

const mockConsumers = [
  { id: 1, name: 'Eco Home Corp.', wallet: '0xdef0...mnop', tokensHeld: 2500, redeemed: 1800, status: 'Active', spent: 250.00, lastActive: '30 min ago' },
  { id: 2, name: 'Sustainable Office', wallet: '0xqrst...uvwx', tokensHeld: 1200, redeemed: 950, status: 'Active', spent: 120.00, lastActive: '1 hour ago' },
  { id: 3, name: 'Green Apartments', wallet: '0xyz12...3456', tokensHeld: 0, redeemed: 3200, status: 'Inactive', spent: 320.00, lastActive: '1 week ago' },
];

const mockStats = {
  totalUsers: 1247,
  activeProducers: 89,
  activeConsumers: 1158,
  totalTransactions: 15420,
  totalVolume: 154200.50,
  fraudAlerts: 12,
  systemHealth: 98.5
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFreeze = (meterId: string) => {
    alert(`Freezing meter ${meterId}`);
  };

  const filteredProducers = mockProducers.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.wallet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredConsumers = mockConsumers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.wallet.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  <h1 className="text-xl font-bold text-gray-900">ELECTRA Admin</h1>
                  <p className="text-sm text-gray-500">Platform Management Dashboard</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">System Healthy</span>
              </div>
              <WalletConnect />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'producers', label: 'Producers', icon: '🏭' },
              { id: 'consumers', label: 'Consumers', icon: '🏠' },
              { id: 'security', label: 'Security', icon: '🛡️' },
              { id: 'analytics', label: 'Analytics', icon: '📈' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900">{mockStats.totalUsers.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-600 font-medium">+12%</span>
                  <span className="text-gray-500 ml-2">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Producers</p>
                    <p className="text-3xl font-bold text-gray-900">{mockStats.activeProducers}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🏭</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-600 font-medium">+5%</span>
                  <span className="text-gray-500 ml-2">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Trading Volume</p>
                    <p className="text-3xl font-bold text-gray-900">{mockStats.totalVolume.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">SUI</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-600 font-medium">+18%</span>
                  <span className="text-gray-500 ml-2">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">System Health</p>
                    <p className="text-3xl font-bold text-gray-900">{mockStats.systemHealth}%</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">❤️</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-600 font-medium">Excellent</span>
                  <span className="text-gray-500 ml-2">all systems operational</span>
                </div>
              </div>
            </div>

            {/* Recent Activity & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Security Alerts */}
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Security Alerts</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {mockStats.fraudAlerts} Active
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {mockAlerts.slice(0, 3).map((alert) => (
                      <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          alert.severity === 'critical' ? 'bg-red-500' :
                          alert.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{alert.type}</p>
                          <p className="text-sm text-gray-600">{alert.message}</p>
                          <p className="text-xs text-gray-500">{alert.timestamp}</p>
                        </div>
                        <button
                          onClick={() => handleFreeze(alert.meterId)}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Review
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View all alerts →
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      { id: 'TX-001', type: 'Token Purchase', amount: '500 kWh', value: '50 SUI', time: '2 min ago' },
                      { id: 'TX-002', type: 'Token Minting', amount: '1000 kWh', value: '0 SUI', time: '5 min ago' },
                      { id: 'TX-003', type: 'Token Redemption', amount: '200 kWh', value: '20 SUI', time: '8 min ago' },
                    ].map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{tx.type}</p>
                          <p className="text-xs text-gray-500">{tx.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{tx.amount}</p>
                          <p className="text-xs text-gray-500">{tx.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View transaction log →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Producers Tab */}
        {activeTab === 'producers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Producer Management</h2>
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Search producers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                  Export Data
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wallet</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meters</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tokens</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducers.map((producer) => (
                      <tr key={producer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-green-600 text-sm">🏭</span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{producer.name}</div>
                              <div className="text-sm text-gray-500">Last active {producer.lastActive}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                          {producer.wallet}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {producer.meters}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {producer.totalTokens.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${producer.revenue.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            producer.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {producer.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">View Details</button>
                          {producer.status === 'Active' ? (
                            <button className="text-red-600 hover:text-red-900">Suspend</button>
                          ) : (
                            <button className="text-green-600 hover:text-green-900">Activate</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Consumers Tab */}
        {activeTab === 'consumers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Consumer Management</h2>
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Search consumers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                  Export Data
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consumer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wallet</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tokens Held</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Redeemed</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredConsumers.map((consumer) => (
                      <tr key={consumer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-blue-600 text-sm">🏠</span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{consumer.name}</div>
                              <div className="text-sm text-gray-500">Last active {consumer.lastActive}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                          {consumer.wallet}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {consumer.tokensHeld.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {consumer.redeemed.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${consumer.spent.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            consumer.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {consumer.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">View History</button>
                          <button className="text-red-600 hover:text-red-900">Block</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Security & Fraud Prevention</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Fraud Alerts */}
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Active Fraud Alerts</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {mockAlerts.filter(a => a.status === 'unresolved').length} Critical
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {mockAlerts.map((alert) => (
                      <div key={alert.id} className={`p-4 rounded-lg border ${
                        alert.severity === 'critical' ? 'border-red-200 bg-red-50' :
                        alert.severity === 'high' ? 'border-orange-200 bg-orange-50' :
                        'border-yellow-200 bg-yellow-50'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className={`inline-block w-2 h-2 rounded-full ${
                                alert.severity === 'critical' ? 'bg-red-500' :
                                alert.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                              }`}></span>
                              <span className="text-sm font-medium text-gray-900">{alert.type}</span>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                alert.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                alert.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {alert.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 mb-1">{alert.message}</p>
                            <p className="text-xs text-gray-500">Meter: {alert.meterId} • {alert.timestamp}</p>
                          </div>
                          <div className="ml-4 flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Investigate
                            </button>
                            <button
                              onClick={() => handleFreeze(alert.meterId)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Freeze
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Fraud Detection</h4>
                      <p className="text-sm text-gray-500">Automatically detect suspicious activities</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-green-600 transition-colors duration-200 ease-in-out focus:outline-none">
                      <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out"></span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Real-time Monitoring</h4>
                      <p className="text-sm text-gray-500">Monitor transactions in real-time</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-green-600 transition-colors duration-200 ease-in-out focus:outline-none">
                      <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out"></span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Auto-suspension</h4>
                      <p className="text-sm text-gray-500">Automatically suspend suspicious accounts</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none">
                      <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out"></span>
                    </button>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Generate Security Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Platform Analytics</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Transaction Volume Chart Placeholder */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Volume</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📊</span>
                    </div>
                    <p className="text-gray-600">Chart visualization would go here</p>
                    <p className="text-sm text-gray-500">Integration with charting library needed</p>
                  </div>
                </div>
              </div>

              {/* User Growth Chart Placeholder */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📈</span>
                    </div>
                    <p className="text-gray-600">Growth metrics visualization</p>
                    <p className="text-sm text-gray-500">Real-time data integration</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Analytics</h3>
              <div className="flex space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Download PDF Report
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Export CSV Data
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Schedule Reports
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}