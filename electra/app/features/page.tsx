import Link from 'next/link';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 bg-white shadow-sm border-b">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">⚡</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">ELECTRA</h1>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
            How It Works
          </Link>
          <Link href="/marketplace" className="text-gray-600 hover:text-blue-600 transition-colors">
            Marketplace
          </Link>
        </div>
      </nav>

      {/* Features Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Platform Features</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the powerful features that make ELECTRA the leading platform for tokenized electricity trading.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">🔒</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Blockchain Security</h3>
            <p className="text-gray-600 mb-4">
              Every energy token is secured by Sui blockchain technology, ensuring immutable and transparent transactions.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>• Cryptographic verification</li>
              <li>• Decentralized ledger</li>
              <li>• Tamper-proof records</li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">🌱</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Sustainable Energy</h3>
            <p className="text-gray-600 mb-4">
              Support renewable energy producers and track your environmental impact with verified green energy tokens.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>• Renewable source verification</li>
              <li>• Carbon footprint tracking</li>
              <li>• Green energy incentives</li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Real-time Trading</h3>
            <p className="text-gray-600 mb-4">
              Instant energy token trading on our decentralized marketplace with competitive pricing and liquidity.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>• Instant settlements</li>
              <li>• Competitive pricing</li>
              <li>• Global accessibility</li>
            </ul>
          </div>

          {/* Feature 4 */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Smart Meter Integration</h3>
            <p className="text-gray-600 mb-4">
              Automated meter reading and token minting with fraud detection and anomaly monitoring.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>• Automated data collection</li>
              <li>• Fraud prevention</li>
              <li>• Real-time monitoring</li>
            </ul>
          </div>

          {/* Feature 5 */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Transparency Dashboard</h3>
            <p className="text-gray-600 mb-4">
              Complete visibility into energy production, consumption, and transaction history.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>• Production tracking</li>
              <li>• Consumption analytics</li>
              <li>• Transaction history</li>
            </ul>
          </div>

          {/* Feature 6 */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">💰</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Token Redemption</h3>
            <p className="text-gray-600 mb-4">
              Easy redemption of energy tokens for electricity consumption with instant settlement.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>• Instant redemption</li>
              <li>• Flexible usage</li>
              <li>• Cost savings</li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-lg p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience These Features?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join ELECTRA today and be part of the energy revolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Explore Marketplace
            </Link>
            <Link href="/producer" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Become a Producer
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">⚡</span>
            </div>
            <h3 className="text-xl font-bold">ELECTRA</h3>
          </div>
          <p className="text-gray-400 mb-4">Powering the future with blockchain technology</p>
          <p className="text-sm text-gray-500">© 2024 ELECTRA. Built on Sui blockchain.</p>
        </div>
      </footer>
    </div>
  );
}