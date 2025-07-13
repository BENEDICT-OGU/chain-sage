export default function LatestTransactions() {
  const transactions = [
    { hash: '0x4a...3b2c', block: 1843292, from: '0x1f...a4d3', to: '0x8e...f5b2', value: '1.42 ETH' },
    { hash: '0x7b...9e1d', block: 1843292, from: '0x5c...d7e9', to: '0x3a...b8c4', value: '0.85 ETH' },
    { hash: '0x2d...6f8a', block: 1843291, from: '0x9e...2c5b', to: '0x6d...a9f7', value: '3.21 ETH' },
    { hash: '0x1e...4c9d', block: 1843291, from: '0x4f...b8e2', to: '0x2c...7d6a', value: '0.12 ETH' },
    { hash: '0x8a...5b3e', block: 1843290, from: '0x3d...9f1c', to: '0x7b...e4d8', value: '5.67 ETH' },
  ]

  return (
    <div className="bg-block-primary rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-block-accent">Latest Transactions</h2>
        <button className="text-sm text-block-accent hover:underline">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-block-secondary">
              <th className="pb-2">Transaction Hash</th>
              <th className="pb-2">Block</th>
              <th className="pb-2">From</th>
              <th className="pb-2">To</th>
              <th className="pb-2 text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index} className="border-b border-block-secondary hover:bg-block-secondary transition">
                <td className="py-3 font-mono text-block-accent">{tx.hash}</td>
                <td className="py-3">{tx.block}</td>
                <td className="py-3 font-mono">{tx.from}</td>
                <td className="py-3 font-mono">{tx.to}</td>
                <td className="py-3 text-right">{tx.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}