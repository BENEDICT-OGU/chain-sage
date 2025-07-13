import { useAccount, useBalance, useDisconnect } from 'wagmi' // Using wagmi hooks
import { ConnectButton } from '@rainbow-me/rainbowkit' // Wallet connection UI
// import PortfolioOverview from './PortfolioOverview'
// import WalletTransactions from '../components/wallet/WalletTransactions'
// import TokenBalances from '../components/TokenBalances'
// import NFTGallery from './NFTGallery'
import  Tabs  from '../components/Tabs'

export default function WalletPage() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const tabs = [
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'tokens', label: 'Tokens' },
    { id: 'nfts', label: 'NFTs' },
  ]

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          View your portfolio, transaction history, and token balances by connecting a wallet.
        </p>
        <div className="flex justify-center">
          <ConnectButton />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Wallet</h1>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white transition"
        >
          Disconnect
        </button>
      </div>

      <Tabs tabs={tabs} defaultTab="portfolio">
        <div id="portfolio">
          <PortfolioOverview address={address} />
        </div>
        <div id="transactions">
          <WalletTransactions address={address} />
        </div>
        <div id="tokens">
          <TokenBalances address={address} />
        </div>
        <div id="nfts">
          <NFTGallery address={address} />
        </div>
      </Tabs>
    </div>
  )
}