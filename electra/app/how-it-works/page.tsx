import Link from 'next/link';

export default function HowItWorksPage() {
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
          <Link href="/features" className="text-gray-600 hover:text-blue-600 transition-colors">
            Features
          </Link>
          <Link href="/marketplace" className="text-gray-600 hover:text-blue-600 transition-colors">
            Marketplace
          </Link>
        </div>
      </nav>

      {/* How It Works Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">How ELECTRA Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive guide to tokenizing electricity and trading energy on the blockchain.
          </p>
        </div>

        {/* Step by Step Process */}
        <div className="space-y-16">
          {/* Step 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                1
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
              <p className="text-lg text-gray-600 mb-6">
                Start by connecting your Sui-compatible wallet. We support popular wallets like Sui Wallet and Ethos Wallet.
                This secure connection allows you to interact with the ELECTRA platform.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                <p className="text-blue-800">
                  <strong>Security First:</strong> Your wallet connection is encrypted and you maintain full control of your funds.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🔗</span>
                </div>
                <p className="text-gray-600">Wallet Connection Interface</p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                2
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Role</h2>
              <p className="text-lg text-gray-600 mb-6">
                Select whether you want to be an energy producer or consumer. Producers tokenize their electricity generation,
                while consumers purchase and redeem tokens for sustainable energy usage.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">For Producers:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Submit meter readings</li>
                    <li>• Mint energy tokens</li>
                    <li>• List tokens for sale</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">For Consumers:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Browse marketplace</li>
                    <li>• Purchase tokens</li>
                    <li>• Redeem for electricity</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="flex justify-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white">🏭</span>
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white">🏠</span>
                  </div>
                </div>
                <p className="text-gray-600">Producer vs Consumer Roles</p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="w-20 h-20 bg-yellow-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                3
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tokenize & Trade</h2>
              <p className="text-lg text-gray-600 mb-6">
                Producers submit verified meter readings to mint energy tokens. These tokens represent 1 kWh of electricity
                and can be traded on our decentralized marketplace.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4">
                <p className="text-yellow-800">
                  <strong>1 Token = 1 kWh:</strong> Each energy token represents one verified kilowatt-hour of electricity production.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">⚡</span>
                </div>
                <p className="text-gray-600">Energy Token Creation</p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                4
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Consume & Redeem</h2>
              <p className="text-lg text-gray-600 mb-6">
                Consumers purchase energy tokens and redeem them for electricity consumption. The redemption process
                burns the tokens and credits the equivalent energy to the consumers account.
              </p>
              <div className="bg-purple-50 border-l-4 border-purple-600 p-4">
                <p className="text-purple-800">
                  <strong>Instant Redemption:</strong> Token redemption happens instantly on the blockchain with no intermediaries.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🔄</span>
                </div>
                <p className="text-gray-600">Token Redemption Process</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="mt-20 bg-gray-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Powered by Advanced Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🔗</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sui Blockchain</h3>
              <p className="text-gray-600">High-performance blockchain for fast, secure transactions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Contracts</h3>
              <p className="text-gray-600">Automated token minting and trading logic</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Oracle Integration</h3>
              <p className="text-gray-600">Verified meter readings from trusted data sources</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-600 rounded-lg p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join the ELECTRA platform and be part of the sustainable energy revolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Explore Marketplace
            </Link>
            <Link href="/producer" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Start Producing
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