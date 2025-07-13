import { useQuery } from 'react-query'
import { DocumentDuplicateIcon, QrCodeIcon } from '@heroicons/react/24/outline'
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'

async function fetchAddressDetails(address) {
  // Mock data - replace with actual API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        balance: '42.85 ETH',
        usdValue: '$78,432.50',
        txCount: 1243,
        firstSeen: '2021-03-15',
        isContract: false,
        tokens: 12,
        nfts: 5,
        change24h: 2.4,
      })
    }, 500)
  })
}

export default function AddressInfo({ address }) {
  const { data: addressDetails, isLoading } = useQuery(
    ['address', address],
    () => fetchAddressDetails(address)
  )

  if (isLoading) {
    return (
      <div className="bg-block-primary-light dark:bg-block-primary rounded-lg shadow p-6 mb-6 animate-pulse">
        <div className="h-8 bg-block-secondary-light dark:bg-block-secondary rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-block-secondary-light dark:bg-block-secondary rounded w-full"></div>
          <div className="h-4 bg-block-secondary-light dark:bg-block-secondary rounded w-4/5"></div>
          <div className="h-4 bg-block-secondary-light dark:bg-block-secondary rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  const isPositive = addressDetails.change24h >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-block-primary-light dark:bg-block-primary rounded-lg shadow p-6 mb-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
            {address.slice(2, 4).toUpperCase()}
          </div>
          <div>
            <h2 className="font-mono break-all">{address}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {addressDetails.isContract ? 'Contract' : 'EOA'} • First seen: {addressDetails.firstSeen}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="p-2 rounded-full bg-block-secondary-light dark:bg-block-secondary hover:bg-opacity-80 transition">
            <DocumentDuplicateIcon className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full bg-block-secondary-light dark:bg-block-secondary hover:bg-opacity-80 transition">
            <QrCodeIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InfoCard 
          title="Balance" 
          value={addressDetails.balance} 
          subValue={addressDetails.usdValue}
          trend={isPositive ? 'up' : 'down'}
          change={Math.abs(addressDetails.change24h).toFixed(2) + '%'}
        />
        <InfoCard title="Transactions" value={addressDetails.txCount.toLocaleString()} />
        <InfoCard title="Tokens" value={addressDetails.tokens} />
        <InfoCard title="NFTs" value={addressDetails.nfts} />
      </div>
    </motion.div>
  )
}

function InfoCard({ title, value, subValue, trend, change }) {
  return (
    <div className="bg-block-secondary-light dark:bg-block-secondary p-4 rounded-lg">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
      <p className="text-xl font-bold mb-1">{value}</p>
      {subValue && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">{subValue}</p>
          {trend && change && (
            <p className={`text-sm flex items-center ${trend === 'up' ? 'text-success' : 'text-error'}`}>
              {trend === 'up' ? (
                <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              ) : (
                <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
              )}
              {change}
            </p>
          )}
        </div>
      )}
    </div>
  )
}