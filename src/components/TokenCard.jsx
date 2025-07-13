import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid'

export default function TokenCard({ token }) {
  const isPositive = token.change24h >= 0
  
  return (
    <div className="bg-block-secondary-light dark:bg-block-secondary rounded-lg p-4 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
            {token.symbol[0]}
          </div>
          <div>
            <h3 className="font-medium">{token.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{token.symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">${token.price.toFixed(4)}</p>
          <p className={`text-sm flex items-center justify-end ${isPositive ? 'text-success' : 'text-error'}`}>
            {isPositive ? (
              <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
            ) : (
              <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
            )}
            {Math.abs(token.change24h).toFixed(2)}%
          </p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-block-primary-light dark:border-block-primary flex justify-between text-sm">
        <div>
          <p className="text-gray-600 dark:text-gray-400">Volume</p>
          <p>${(token.volume / 1000000).toFixed(2)}M</p>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-400">Market Cap</p>
          <p>${(token.marketCap / 1000000000).toFixed(2)}B</p>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-400">Holders</p>
          <p>{token.holders.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}