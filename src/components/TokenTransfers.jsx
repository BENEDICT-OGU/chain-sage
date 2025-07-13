import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'

export default function TokenTransfers({ txHash }) {
  // Mock data
  const transfers = [
    { token: 'USDC', from: '0x3f5...5f7', to: '0x1b4...8c1', value: '1,250.00', direction: 'out' },
    { token: 'DAI', from: '0x7a2...9f1', to: '0x3f5...5f7', value: '850.50', direction: 'in' },
    { token: 'WETH', from: '0x1b4...8c1', to: '0x9c3...e7b', value: '2.75', direction: 'out' },
  ]

  return (
    <div className="bg-block-primary-light dark:bg-block-primary rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Token Transfers</h2>
      
      {transfers.length > 0 ? (
        <div className="space-y-4">
          {transfers.map((transfer, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-block-secondary-light dark:bg-block-secondary rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${transfer.direction === 'out' ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300' : 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300'}`}>
                  {transfer.direction === 'out' ? (
                    <ArrowUpIcon className="h-5 w-5" />
                  ) : (
                    <ArrowDownIcon className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{transfer.value} {transfer.token}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {transfer.direction === 'out' ? 'To' : 'From'}: {transfer.from}
                  </p>
                </div>
              </div>
              <span className="text-sm font-mono">{transfer.token}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">No token transfers for this transaction</p>
      )}
    </div>
  )
}