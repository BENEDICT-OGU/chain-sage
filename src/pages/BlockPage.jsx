import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowPathIcon, CheckCircleIcon, ClockIcon, DocumentDuplicateIcon, ArrowTopRightOnSquareIcon, CubeIcon, CurrencyDollarIcon, ScaleIcon,  ChartBarIcon, LinkIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../context/ThemeContext'

const BlockPage = () => {
  const { blockNumber } = useParams()
  const { theme } = useTheme()
  const [block, setBlock] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [timeAgo, setTimeAgo] = useState('')

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchBlock = async () => {
      try {
        setLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Mock data
        const mockBlock = {
          number: parseInt(blockNumber),
          hash: '0x9a8f92a3d9b5e5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0',
          parentHash: '0x8a7f92a3d9b5e5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0',
          nonce: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
          sha3Uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
          logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
          transactionsRoot: '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
          stateRoot: '0xf7135b656a6513846894dad825c7a1e2f6f2a1d6329ca01b5c1b175f5a6b3ff',
          miner: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1',
          difficulty: '3,124,531,214,531',
          totalDifficulty: '54,312,124,531,214,531',
          size: 9876,
          gasLimit: 12453125,
          gasUsed: 12453125,
          timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          transactions: [
            '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7',
            '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5',
            '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4',
            '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3',
            '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2'
          ],
          uncles: [],
          baseFeePerGas: '32.5 Gwei',
          rewards: '2.05 ETH'
        }
        setBlock(mockBlock)
        
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

    fetchBlock()
  }, [blockNumber])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900">
        <div className="text-center">
          <ArrowPathIcon className="w-12 h-12 mx-auto text-blue-500 animate-spin" />
          <p className="mt-4 text-lg font-medium text-blue-600 dark:text-blue-400">Loading block details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md">
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
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Block #{block.number.toLocaleString()}</h1>
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
        </div>

        {/* Block Hash */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
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
        </div>

        {/* Main Block Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Overview Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 lg:col-span-2">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full mr-3">
                      <CubeIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Block Height</p>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">{block.number.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full mr-3">
                      <CurrencyDollarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Block Reward</p>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">{block.rewards}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full mr-3">
                      <ScaleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Difficulty</p>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">{block.difficulty}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full mr-3">
                      {/* <LightningBoltIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" /> */}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Gas Used</p>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {block.gasUsed.toLocaleString()} ({((block.gasUsed / block.gasLimit) * 100).toFixed(2)}%)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full mr-3">
                      <ChartBarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Gas Limit</p>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">{block.gasLimit.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full mr-3">
                      <CurrencyDollarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Base Fee</p>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">{block.baseFeePerGas}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* More Details Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Block Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Parent Hash</p>
                <div className="flex items-center mt-1">
                  <Link 
                    to={`/block/${block.number - 1}`} 
                    className="text-blue-600 dark:text-blue-400 hover:underline break-all font-mono"
                  >
                    {block.parentHash}
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
                <p className="text-sm text-gray-500 dark:text-gray-400">Mined by</p>
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
                <p className="text-sm text-gray-500 dark:text-gray-400">Size</p>
                <p className="text-gray-900 dark:text-white">{block.size.toLocaleString()} bytes</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">State Root</p>
                <p className="text-gray-900 dark:text-white font-mono break-all text-sm">{block.stateRoot}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Transactions Root</p>
                <p className="text-gray-900 dark:text-white font-mono break-all text-sm">{block.transactionsRoot}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Transactions</h2>
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
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
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
                        0.5 ETH
                      </td>
                    </tr>
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

        {/* Raw Data Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Raw Data</h2>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm font-mono text-gray-800 dark:text-gray-200">
              {JSON.stringify(block, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlockPage