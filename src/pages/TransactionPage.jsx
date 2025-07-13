import { useParams } from 'react-router-dom'
import TransactionDetails from '../components/TransactionDetails'
import TransactionLogs from '../components/TransactionLogs'
import TokenTransfers from '../components/TokenTransfers'
import { motion } from 'framer-motion'

export default function TransactionPage() {
  const { txHash } = useParams()
  
  // Mock data - in real app this would come from API
  const transaction = {
    hash: txHash,
    status: 'Success',
    block: 1843292,
    timestamp: '2023-05-15 14:32:45 UTC',
    from: '0x3f5a7b2c4d6e8f1a9b3c5d7e2f4a6b8c1d3e5f7',
    to: '0x1b4d3e5f7a9b2c4d6e8f1a3b5c7d9e2f4a6b8c1',
    value: '1.42 ETH',
    fee: '0.0032 ETH',
    gasPrice: '45 Gwei',
    gasLimit: '21000',
    gasUsed: '21000',
    nonce: '123',
    inputData: '0xa9059cbb0000000000000000000000001b4d3e5f7a9b2c4d6e8f1a3b5c7d9e2f4a6b8c1000000000000000000000000000000000000000000000000000de0b6b3a7640000',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-6"
    >
      <h1 className="text-2xl font-bold mb-6 break-all">
        Transaction <span className="text-block-accent-light dark:text-block-accent-dark">{txHash.slice(0, 12)}...{txHash.slice(-10)}</span>
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionDetails transaction={transaction} />
          <TransactionLogs txHash={txHash} />
        </div>
        <div>
          <TokenTransfers txHash={txHash} />
        </div>
      </div>
    </motion.div>
  )
}