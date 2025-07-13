import { useQuery } from 'react-query'
import TransactionCard from './TransactionCard'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

async function fetchAddressTransactions(address) {
  // Mock data - replace with API call
  return new Promise(resolve => {
    setTimeout(() => {
      const mockTxs = Array.from({ length: 10 }, (_, i) => ({
        hash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
        block: 1843292 - i,
        timestamp: `${i * 3} hours ago`,
        from: address,
        to: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
        value: `${(Math.random() * 5).toFixed(3)} ETH`,
        fee: `${(Math.random() * 0.01).toFixed(5)} ETH`,
        direction: Math.random() > 0.5 ? 'in' : 'out'
      }))
      resolve(mockTxs)
    }, 800)
  })
}

export default function AddressTransactions({ address }) {
  const { data: transactions, isLoading, refetch } = useQuery(
    ['addressTransactions', address],
    () => fetchAddressTransactions(address)
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Transactions</h2>
        <button 
          onClick={() => refetch()}
          className="flex items-center text-sm text-block-accent-light dark:text-block-accent-dark hover:underline"
        >
          <ArrowPathIcon className="h-4 w-4 mr-1" />
          Refresh
        </button>
      </div>
      
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-block-secondary-light dark:bg-block-secondary p-4 rounded-lg animate-pulse h-24"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx, i) => (
            <TransactionCard key={i} tx={tx} index={i} />
          ))}
        </div>
      )}
      
      <div className="mt-6 flex justify-center">
        <button className="px-4 py-2 bg-block-secondary-light dark:bg-block-secondary rounded-lg hover:bg-opacity-80 transition">
          Load More
        </button>
      </div>
    </div>
  )
}