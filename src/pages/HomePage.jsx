import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import NetworkStats from '../components/NetworkStats'
import LatestBlocks from '../components/LatestBlocks'
import LatestTransactions from '../components/LatestTransactions'
import { motion } from 'framer-motion'
import StatCard from '../components/StatCard'

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-6"
    >
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">ChainSage Explorer</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Explore blocks, transactions, and smart contracts across multiple chains
        </p>
      </div>

      <SearchBar />
      <NetworkStats />
      
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total Blocks" 
          value="18,432,921" 
          link="/blocks"
        />
        <StatCard 
          title="Total Transactions" 
          value="428,921,432" 
          link="/transactions"
        />
        <StatCard 
          title="Wallet Addresses" 
          value="312,421,123" 
          link="/wallet"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LatestBlocks />
        <LatestTransactions />
      </div>

      {/* Chain Support Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Supported Blockchains</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Avalanche'].map((chain) => (
            <div 
              key={chain}
              className="px-6 py-3 bg-block-secondary-light dark:bg-block-secondary rounded-lg hover:shadow-md transition cursor-pointer"
            >
              {chain}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

