export default function BlockDetails({ blockHeight }) {
  // Mock data - in a real app, this would come from an API
  const block = {
    height: blockHeight,
    hash: '0x4a8b3c2d6e9f1a7b5c3d8e2f4a6b9c1d3e5f7a8b2c4d6e8f1a3b5c7d9e2f4a6',
    timestamp: '2023-05-15 14:32:45 UTC',
    transactions: 142,
    miner: '0x3f5a7b2c4d6e8f1a9b3c5d7e2f4a6b8c1d3e5f7',
    difficulty: '12,345,678',
    totalDifficulty: '1,234,567,890,123',
    gasUsed: '12,345,678',
    gasLimit: '15,000,000',
    nonce: '0x123456789abcdef0',
    parentHash: '0x3b5a7d2c4e6f8a1b9c3d5e7f2a4b6c8d1e3f5a7',
    reward: '2.5 ETH',
    fees: '0.42 ETH',
  }

  return (
    <div className="bg-block-primary rounded-lg shadow p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-block-accent">Block Information</h2>
          <DetailItem label="Block Height" value={block.height} />
          <DetailItem label="Timestamp" value={block.timestamp} />
          <DetailItem label="Transactions" value={`${block.transactions} transactions`} />
          <DetailItem label="Mined by" value={block.miner} isAddress />
          <DetailItem label="Block Reward" value={block.reward} />
          <DetailItem label="Total Fees" value={block.fees} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-block-accent">Technical Details</h2>
          <DetailItem label="Difficulty" value={block.difficulty} />
          <DetailItem label="Total Difficulty" value={block.totalDifficulty} />
          <DetailItem label="Gas Used" value={block.gasUsed} />
          <DetailItem label="Gas Limit" value={block.gasLimit} />
          <DetailItem label="Nonce" value={block.nonce} isCode />
          <DetailItem label="Parent Hash" value={block.parentHash} isHash />
        </div>
      </div>
    </div>
  )
}

function DetailItem({ label, value, isAddress = false, isHash = false, isCode = false }) {
  let valueClass = ""
  if (isAddress || isHash) valueClass = "font-mono text-block-accent"
  if (isCode) valueClass = "font-mono bg-block-secondary px-2 py-1 rounded"

  return (
    <div className="mb-3">
      <p className="text-sm text-gray-400">{label}</p>
      <p className={valueClass}>{value}</p>
    </div>
  )
}