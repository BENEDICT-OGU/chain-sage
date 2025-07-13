import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import BlockPage from './pages/BlockPage'
import TransactionPage from './pages/TransactionPage'
import AddressPage from './pages/AddressPage'
import WalletPage from './pages/WalletPage'
import NotFound from './pages/NotFound'
import '@rainbow-me/rainbowkit/styles.css'

// 1. Configure chains and providers
const { chains, provider } = configureChains(
  [mainnet],
  [publicProvider()]
)

// 2. Set up wallets (MetaMask, WalletConnect, etc.)
const { connectors } = getDefaultWallets({
  appName: 'ChainSage',
  chains,
})

// 3. Create wagmi client
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export default function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Router>
          <ThemeProvider>
            <div className="min-h-screen flex flex-col bg-block-light dark:bg-block-dark">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/blocks" element={<BlockPage />} />
                  <Route path="/transactions" element={<TransactionPage />} />
                  <Route path="/address/:address" element={<AddressPage />} />
                  <Route path="/wallet" element={<WalletPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
