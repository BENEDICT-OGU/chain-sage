// import { useTokenBalances } from '../hooks/useTokenBalances'

export default function TokenBalances({ address }) {
  const { balances, isLoading } = useTokenBalances(address)

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Token Balances</h2>
        <button className="text-sm text-block-accent-light dark:text-block-accent-dark hover:underline">
          Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-block-secondary-light dark:bg-block-secondary rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left border-b border-block-secondary-light dark:border-block-secondary">
                <th className="pb-2">Token</th>
                <th className="pb-2">Balance</th>
                <th className="pb-2">Value</th>
                <th className="pb-2">Price</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {balances.map((token) => (
                <tr key={token.address} className="border-b border-block-secondary-light dark:border-block-secondary hover:bg-block-secondary-light dark:hover:bg-block-secondary">
                  <td className="py-3 flex items-center space-x-2">
                    <img src={token.logo} alt={token.symbol} className="w-6 h-6 rounded-full" />
                    <span>{token.name}</span>
                    <span className="text-gray-500">{token.symbol}</span>
                  </td>
                  <td className="py-3">{token.balance}</td>
                  <td className="py-3">${token.value}</td>
                  <td className="py-3">${token.price}</td>
                  <td className="py-3">
                    <button className="text-sm px-3 py-1 bg-block-accent-light dark:bg-block-accent-dark rounded hover:bg-opacity-90 transition">
                      Send
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}