import { motion } from 'framer-motion'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'

export default function TransactionCard({ tx, index }) {
  const isOutgoing = tx.direction === 'out'
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-block-secondary-light dark:bg-block-secondary p-4 rounded-lg hover:shadow-md transition cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-full ${isOutgoing ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300' : 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300'}`}>
            {isOutgoing ? (
              <ArrowUpIcon className="h-5 w-5" />
            ) : (
              <ArrowDownIcon className="h-5 w-5" />
            )}
          </div>
          <div>
            <h3 className="font-mono text-sm break-all">{tx.hash}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Block #{tx.block} • {tx.timestamp}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">{tx.value}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Fee: {tx.fee}
          </p>
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-3 border-t border-block-primary-light dark:border-block-primary text-sm">
        <div>
          <span className="text-gray-600 dark:text-gray-400">From: </span>
          <span className="font-mono">{tx.from}</span>
        </div>
        <div>
          <span className="text-gray-600 dark:text-gray-400">To: </span>
          <span className="font-mono">{tx.to}</span>
        </div>
      </div>
    </motion.div>
  )
}