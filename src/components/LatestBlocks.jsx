export default function LatestBlocks() {
  const blocks = [
    { height: 1843292, timestamp: '2 min ago', transactions: 142, miner: '0x3f...d4c2', reward: '2.5 ETH' },
    { height: 1843291, timestamp: '5 min ago', transactions: 87, miner: '0x7a...e9f1', reward: '2.5 ETH' },
    { height: 1843290, timestamp: '8 min ago', transactions: 203, miner: '0x1b...5d2a', reward: '2.5 ETH' },
    { height: 1843289, timestamp: '11 min ago', transactions: 56, miner: '0x9c...3e7b', reward: '2.5 ETH' },
    { height: 1843288, timestamp: '14 min ago', transactions: 178, miner: '0x4d...f6c8', reward: '2.5 ETH' },
  ]

  return (
    <div className="bg-block-primary rounded-lg shadow p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-block-accent">Latest Blocks</h2>
        <button className="text-sm text-block-accent hover:underline">View All</button>
      </div>
      <div className="space-y-3">
        {blocks.map((block, index) => (
          <BlockCard key={index} block={block} />
        ))}
      </div>
    </div>
  )
}

function BlockCard({ block }) {
  return (
    <div className="bg-block-secondary p-3 rounded-lg hover:bg-opacity-80 transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">Height</p>
          <p className="font-mono text-block-accent">{block.height}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Timestamp</p>
          <p>{block.timestamp}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Transactions</p>
          <p>{block.transactions}</p>
        </div>
        <div className="hidden md:block">
          <p className="text-sm text-gray-400">Miner</p>
          <p className="font-mono">{block.miner}</p>
        </div>
        <div className="hidden md:block">
          <p className="text-sm text-gray-400">Reward</p>
          <p>{block.reward}</p>
        </div>
      </div>
    </div>
  )
}