import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowPathIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  DocumentDuplicateIcon, 
  ArrowTopRightOnSquareIcon, 
  CubeIcon, 
  CurrencyDollarIcon, 
  ScaleIcon, 
  ChartBarIcon, 
  LinkIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { useTheme } from '../context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Pie, Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js'

// Register ChartJS components
ChartJS.register(
  ArcElement, Tooltip, Legend, CategoryScale, 
  LinearScale, BarElement, PointElement, LineElement
)

const BlockPage = () => {
  const { blockNumber } = useParams()
  const { theme } = useTheme()
  const [block, setBlock] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [timeAgo, setTimeAgo] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [blocksData, setBlocksData] = useState([])
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0)

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Mock block data
        const mockBlock = {
          number: parseInt(blockNumber),
          hash: '0x9a8f92a3d9b5e5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0',
          parentHash: '0x8a7f92a3d9b5e5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0',
          miner: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1',
          difficulty: '3,124,531,214,531',
          size: 9876,
          gasLimit: 12453125,
          gasUsed: 12453125,
          timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          transactions: Array(15).fill().map((_, i) => 
            `0x${Math.random().toString(16).slice(2, 34)}${Math.random().toString(16).slice(2, 34)}`.slice(0, 64)
          ),
          baseFeePerGas: '32.5 Gwei',
          rewards: '2.05 ETH',
          uncles: ['0x123...', '0x456...'],
          transactionStats: {
            types: {
              normal: 10,
              contract: 3,
              token: 2
            },
            gasDistribution: {
              low: 20,
              medium: 60,
              high: 20
            },
            valueDistribution: [
              0.1, 0.5, 1.0, 2.5, 5.0
            ]
          }
        }
        
        // Mock recent blocks data
        const mockBlocks = Array(10).fill().map((_, i) => ({
          number: mockBlock.number - 10 + i,
          hash: `0x${Math.random().toString(16).slice(2, 34)}${Math.random().toString(16).slice(2, 34)}`.slice(0, 64),
          transactionCount: Math.floor(Math.random() * 50) + 5,
          miner: `0x${Math.random().toString(16).slice(2, 22)}`,
          timestamp: new Date(Date.now() - (i * 120000)).toISOString()
        }))
        
        setBlock(mockBlock)
        setBlocksData(mockBlocks)
        
        // Calculate time ago
        const blockDate = new Date(mockBlock.timestamp)
        const now = new Date()
        const diffInSeconds = Math.floor((now - blockDate) / 1000)
        
        if (diffInSeconds < 60) {
          setTimeAgo(`${diffInSeconds} seconds ago`)
        } else if (diffInSeconds < 3600) {
          setTimeAgo(`${Math.floor(diffInSeconds / 60)} minutes ago`)
        } else if (diffInSeconds < 86400) {
          setTimeAgo(`${Math.floor(diffInSeconds / 3600)} hours ago`)
        } else {
          setTimeAgo(`${Math.floor(diffInSeconds / 86400)} days ago`)
        }
      } catch (err) {
        setError('Failed to fetch block details')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [blockNumber])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Chart data configurations
  const txTypeData = {
    labels: ['Normal', 'Contract', 'Token'],
    datasets: [{
      data: block ? Object.values(block.transactionStats.types) : [],
      backgroundColor: [
        '#3b82f6',
        '#6366f1',
        '#8b5cf6'
      ],
      borderWidth: 0
    }]
  }

  const gasDistributionData = {
    labels: ['Low (<30 Gwei)', 'Medium (30-100 Gwei)', 'High (>100 Gwei)'],
    datasets: [{
      data: block ? Object.values(block.transactionStats.gasDistribution) : [],
      backgroundColor: [
        '#93c5fd',
        '#60a5fa',
        '#3b82f6'
      ],
      borderWidth: 0
    }]
  }

  const valueDistributionData = {
    labels: ['<0.1 ETH', '0.1-0.5 ETH', '0.5-1 ETH', '1-5 ETH', '>5 ETH'],
    datasets: [{
      label: 'Transaction Values',
      data: block ? block.transactionStats.valueDistribution : [],
      backgroundColor: '#3b82f6',
      borderColor: '#1d4ed8',
      borderWidth: 1,
      borderRadius: 4
    }]
  }

  const blocksTimelineData = {
    labels: blocksData.map(b => `#${b.number}`).reverse(),
    datasets: [{
      label: 'Transactions',
      data: blocksData.map(b => b.transactionCount).reverse(),
      backgroundColor: '#3b82f6',
      borderColor: '#1d4ed8',
      tension: 0.3,
      fill: true
    }]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ArrowPathIcon className="w-12 h-12 mx-auto text-blue-500 animate-spin" />
          <p className="mt-4 text-lg font-medium text-blue-600 dark:text-blue-400">Loading block details...</p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md"
        >
          <ExclamationTriangleIcon className="w-12 h-12 mx-auto text-red-500" />
          <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-white">Error Loading Block</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center mx-auto"
          >
            <ArrowPathIcon className="w-5 h-5 mr-2" />
            Try Again
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4">
                <Link 
                  to={`/block/${block.number - 1}`}
                  className="p-2 rounded-full bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-gray-600 transition"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Block #{block.number.toLocaleString()}</h1>
                <Link 
                  to={`/block/${block.number + 1}`}
                  className="p-2 rounded-full bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-gray-600 transition"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </Link>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  <CheckCircleIcon className="w-4 h-4 mr-1" />
                  Finalized
                </span>
                <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {new Date(block.timestamp).toLocaleString()} ({timeAgo})
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition flex items-center">
                <ArrowTopRightOnSquareIcon className="w-5 h-5 mr-2" />
                View All Blocks
              </button>
            </div>
          </div>
        </motion.div>

        {/* Block Hash */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-1">Block Hash</h2>
              <div className="flex items-center">
                <p className="text-lg font-mono text-blue-600 dark:text-blue-400 break-all">
                  {block.hash}
                </p>
                <button 
                  onClick={() => copyToClipboard(block.hash)}
                  className="ml-2 p-1 text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 rounded hover:bg-blue-50 dark:hover:bg-gray-700"
                  aria-label="Copy block hash"
                >
                  <DocumentDuplicateIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition flex items-center">
                <DocumentDuplicateIcon className="w-5 h-5 mr-2" />
                Copy Hash
              </button>
              <button className="px-3 py-2 bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition flex items-center">
                <LinkIcon className="w-5 h-5 mr-2" />
                Share
              </button>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex border-b border-gray-200 dark:border-gray-700 mb-6"
        >
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'overview' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            <CubeIcon className="w-4 h-4 mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'transactions' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            {/* <LightningBoltIcon className="w-4 h-4 mr-2" /> */}
            Transactions ({block.transactions.length})
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'analytics' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            <ChartBarIcon className="w-4 h-4 mr-2" />
            Analytics
          </button>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Overview Cards */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
                  >
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
                        <CubeIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Block Height</p>
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">{block.number.toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
                  >
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
                        <CurrencyDollarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Block Reward</p>
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">{block.rewards}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
                  >
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
                        <ScaleIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Difficulty</p>
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">{block.difficulty}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
                  >
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
                        {/* <LightningBoltIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" /> */}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Gas Used</p>
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">
                          {block.gasUsed.toLocaleString()} ({((block.gasUsed / block.gasLimit) * 100).toFixed(2)}%)
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Miner Details */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Miner Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Miner Address</p>
                      <div className="flex items-center mt-1">
                        <Link 
                          to={`/address/${block.miner}`} 
                          className="text-blue-600 dark:text-blue-400 hover:underline break-all font-mono"
                        >
                          {block.miner}
                        </Link>
                        <button 
                          onClick={() => copyToClipboard(block.miner)}
                          className="ml-2 p-1 text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 rounded hover:bg-blue-50 dark:hover:bg-gray-700"
                          aria-label="Copy miner address"
                        >
                          <DocumentDuplicateIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Parent Hash</p>
                      <div className="flex items-center mt-1">
                        <Link 
                          to={`/block/${block.number - 1}`} 
                          className="text-blue-600 dark:text-blue-400 hover:underline break-all font-mono"
                        >
                          {block.parentHash.substring(0, 24)}...{block.parentHash.substring(block.parentHash.length - 8)}
                        </Link>
                        <button 
                          onClick={() => copyToClipboard(block.parentHash)}
                          className="ml-2 p-1 text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 rounded hover:bg-blue-50 dark:hover:bg-gray-700"
                          aria-label="Copy parent hash"
                        >
                          <DocumentDuplicateIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Size</p>
                      <p className="text-gray-900 dark:text-white">{block.size.toLocaleString()} bytes</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Base Fee</p>
                      <p className="text-gray-900 dark:text-white">{block.baseFeePerGas}</p>
                    </div>
                  </div>
                </div>

                {/* Recent Blocks Timeline */}
                <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Blocks Timeline</h3>
                  <div className="h-64">
                    <Line 
                      data={blocksTimelineData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                          tooltip: {
                            callbacks: {
                              label: (context) => `${context.parsed.y} transactions`
                            }
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            title: {
                              display: true,
                              text: 'Transaction Count'
                            }
                          },
                          x: {
                            title: {
                              display: true,
                              text: 'Block Number'
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Transactions</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {block.transactions.length} transactions in this block
                  </p>
                </div>

                {block.transactions.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Transaction Hash
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            From
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            To
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Value
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {block.transactions.map((tx, index) => (
                          <motion.tr 
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Link 
                                to={`/tx/${tx}`} 
                                className="text-blue-600 dark:text-blue-400 hover:underline font-mono text-sm"
                              >
                                {tx.substring(0, 16)}...{tx.substring(tx.length - 8)}
                              </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                Normal
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-500 dark:text-gray-400">
                              0x7a...2488D
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-500 dark:text-gray-400">
                              0x71...8976F
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900 dark:text-white">
                              {(Math.random() * 5).toFixed(2)} ETH
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No transactions in this block</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Transaction Types Pie Chart */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Transaction Types</h3>
                  <div className="h-64">
                    <Pie 
                      data={txTypeData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'right',
                          },
                          tooltip: {
                            callbacks: {
                              label: (context) => {
                                const label = context.label || ''
                                const value = context.raw || 0
                                const total = context.dataset.data.reduce((a, b) => a + b, 0)
                                const percentage = Math.round((value / total) * 100)
                                return `${label}: ${value} (${percentage}%)`
                              }
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </motion.div>

                {/* Gas Distribution Pie Chart */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Gas Price Distribution</h3>
                  <div className="h-64">
                    <Pie 
                      data={gasDistributionData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'right',
                          },
                          tooltip: {
                            callbacks: {
                              label: (context) => {
                                const label = context.label || ''
                                const value = context.raw || 0
                                return `${label}: ${value}%`
                              }
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </motion.div>

                {/* Value Distribution Bar Chart */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Transaction Value Distribution</h3>
                  <div className="h-64">
                    <Bar 
                      data={valueDistributionData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false
                          },
                          tooltip: {
                            callbacks: {
                              label: (context) => `${context.parsed.y} ETH`
                            }
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            title: {
                              display: true,
                              text: 'Number of Transactions'
                            }
                          },
                          x: {
                            title: {
                              display: true,
                              text: 'Value Range (ETH)'
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Raw Data Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Raw Data</h2>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm font-mono text-gray-800 dark:text-gray-200">
              {JSON.stringify(block, null, 2)}
            </pre>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default BlockPage