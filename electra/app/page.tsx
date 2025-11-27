import Link from 'next/link';
import WalletConnect from '../components/WalletConnect';

export default function Home() {
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
          <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
            How It Works
          </Link>
          <WalletConnect />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 py-24 px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Decentralized Energy Trading Platform
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Powering the Future
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Token by Token
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Join the revolution in sustainable energy trading. Producers tokenize verified renewable energy production,
            while consumers access transparent, blockchain-secured electricity markets.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link href="/marketplace" className="group">
              <div className="bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl p-6 transition-all duration-300 shadow-sm hover:shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <span className="text-2xl">🛒</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Marketplace</h3>
                <p className="text-sm text-gray-600">Trade energy tokens</p>
              </div>
            </Link>

            <Link href="/producer" className="group">
              <div className="bg-white hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-xl p-6 transition-all duration-300 shadow-sm hover:shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Producer</h3>
                <p className="text-sm text-gray-600">Generate & sell energy</p>
              </div>
            </Link>

            <Link href="/consumer" className="group">
              <div className="bg-white hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-xl p-6 transition-all duration-300 shadow-sm hover:shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Consumer</h3>
                <p className="text-sm text-gray-600">Buy & redeem tokens</p>
              </div>
            </Link>

            <Link href="/admin" className="group">
              <div className="bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-xl p-6 transition-all duration-300 shadow-sm hover:shadow-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                  <span className="text-2xl">⚙️</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Admin</h3>
                <p className="text-sm text-gray-600">Platform management</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ELECTRA?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built on blockchain technology for transparent, secure, and sustainable energy trading
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
              <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl text-white">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Secure & Transparent</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Every energy transaction is recorded on the blockchain with cryptographic verification,
                ensuring complete transparency and preventing fraud.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
              <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl text-white">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Sustainable Energy</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Support renewable energy producers worldwide. Track your environmental impact
                and contribute to a greener future with every token traded.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl border border-yellow-200 hover:border-yellow-300 transition-all duration-300 hover:shadow-lg">
              <div className="w-14 h-14 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl text-white">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Real-time Trading</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Instant peer-to-peer energy trading with smart contracts ensuring fair prices
                and immediate settlement on the Sui blockchain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Connect Your Wallet</h3>
              <p className="text-gray-600">Link your Sui wallet to access the ELECTRA platform securely.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Choose Your Role</h3>
              <p className="text-gray-600">Register as a producer to tokenize energy or as a consumer to purchase tokens.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Trade Energy</h3>
              <p className="text-gray-600">Buy, sell, or redeem energy tokens on our transparent marketplace.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Join the Energy Revolution?</h2>
          <p className="text-xl text-blue-100 mb-8">Start tokenizing electricity and be part of sustainable energy future.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                Browse Marketplace
              </button>
            </Link>
            <Link href="/producer">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Become a Producer
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
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
