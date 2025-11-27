'use client';

import { useConnectWallet, useWallets, useCurrentWallet, useDisconnectWallet } from '@mysten/dapp-kit';

export default function WalletConnect() {
  const wallets = useWallets();
  const { connectionStatus, currentWallet } = useCurrentWallet();
  const { mutate: connect } = useConnectWallet();
  const { mutate: disconnect } = useDisconnectWallet();

  const handleConnect = () => {
    if (wallets.length > 0) {
      connect({ wallet: wallets[0] });
    }
  };

  if (connectionStatus === 'connected') {
    return (
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-600">
          Connected: {currentWallet?.name}
        </div>
        <button
          onClick={() => disconnect()}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="text-sm text-gray-600" suppressHydrationWarning>
        Wallets detected: {wallets.length}
      </div>
      <button
        onClick={handleConnect}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        Connect Wallet
      </button>
    </div>
  );
}