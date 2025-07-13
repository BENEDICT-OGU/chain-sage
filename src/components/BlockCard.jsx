import { motion } from 'framer-motion'
import { CubeIcon, ArrowRightIcon } from '@heroicons/react/24/solid'

export default function BlockCard({ block, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-block-secondary-light dark:bg-block-secondary p-4 rounded-lg hover:shadow-md transition cursor-pointer"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <CubeIcon className="h-5 w-5 text-block-accent-light dark:text-block-accent-dark" />
          <span className="font-mono text-block-accent-light dark:text-block-accent-dark">{block.height}</span>
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400">{block.timestamp}</span>
      </div>
      
      <div className="flex justify-between items-center text-sm mb-2">
        <div>
          <span className="text-gray-600 dark:text-gray-400">Miner: </span>
          <span className="font-mono">{block.miner}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-gray-600 dark:text-gray-400">Reward:</span>
          <span className="font-medium">{block.reward}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-2 border-t border-block-primary-light dark:border-block-primary">
        <div className="flex items-center space-x-1">
          <span className="text-gray-600 dark:text-gray-400">{block.transactions} txns</span>
          <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
            {block.uncles > 0 ? `${block.uncles} uncles` : 'No uncles'}
          </span>
        </div>
        <div className="flex items-center text-sm text-block-accent-light dark:text-block-accent-dark">
          <span>Details</span>
          <ArrowRightIcon className="h-4 w-4 ml-1" />
        </div>
      </div>
    </motion.div>
  )
}