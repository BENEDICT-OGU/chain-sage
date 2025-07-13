import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowPathIcon, CheckCircleIcon, ExclamationTriangleIcon, ArrowDownTrayIcon, LinkIcon, DocumentDuplicateIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../context/ThemeContext'

const TransactionPage = () => {
  const { txHash } = useParams()
  const { theme } = useTheme()
  const [transaction, setTransaction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Mock data
        const mockTx = {
          hash: txHash,
          status: 'confirmed',
          block: 17438291,
          timestamp: new Date().toISOString(),
          from: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
          to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
          value: '1.25 ETH',
          fee: '0.003421 ETH',
          gasPrice: '45.2 Gwei',
          gasUsed: 75643,
          gasLimit: 100000,
          nonce: 42,
          inputData: '0xa9059cbb0000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d00000000000000000000000000000000000000000000001158e460913d00000',
          logs: [
            {
              address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
              topics: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
              data: '0x0000000000000000000000000000000000000000000000000000000000002710'
            }
          ]
        }
        setTransaction(mockTx)
      } catch (err) {
        setError('Failed to fetch transaction details')
      } finally {
        setLoading(false)
      }
    }

    fetchTransaction()
  }, [txHash])

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
          <p className="mt-4 text-lg font-medium text-blue-600 dark:text-blue-400">Loading transaction details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md">
          <ExclamationTriangleIcon className="w-12 h-12 mx-auto text-red-500" />
          <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-white">Error Loading Transaction</h2>
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transaction Details</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              transaction.status === 'confirmed' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
            }`}>
              {transaction.status === 'confirmed' ? (
                <CheckCircleIcon className="w-4 h-4 mr-1" />
              ) : (
                <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
              )}
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Mined in Block #{transaction.block.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Transaction Hash */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-1">Transaction Hash</h2>
              <div className="flex items-center">
                <p className="text-lg font-mono text-blue-600 dark:text-blue-400 break-all">
                  {transaction.hash}
                </p>
                <button 
                  onClick={() => copyToClipboard(transaction.hash)}
                  className="ml-2 p-1 text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 rounded hover:bg-blue-50 dark:hover:bg-gray-700"
                  aria-label="Copy transaction hash"
                >
                  <DocumentDuplicateIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition flex items-center">
                <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                Download
              </button>
              <button className="px-3 py-2 bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition flex items-center">
                <LinkIcon className="w-5 h-5 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Main Transaction Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Overview Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 lg:col-span-2">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Overview</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">From</p>
                  <div className="flex items-center mt-1">
                    <a 
                      href={`/address/${transaction.from}`} 
                      className="text-blue-600 dark:text-blue-400 hover:underline break-all font-mono"
                    >
                      {transaction.from}
                    </a>
                    <button 
                      onClick={() => copyToClipboard(transaction.from)}
                      className="ml-2 p-1 text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 rounded hover:bg-blue-50 dark:hover:bg-gray-700"
                      aria-label="Copy address"
                    >
                      <DocumentDuplicateIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">To</p>
                  <div className="flex items-center mt-1">
                    <a 
                      href={`/address/${transaction.to}`} 
                      className="text-blue-600 dark:text-blue-400 hover:underline break-all font-mono"
                    >
                      {transaction.to}
                    </a>
                    <button 
                      onClick={() => copyToClipboard(transaction.to)}
                      className="ml-2 p-1 text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 rounded hover:bg-blue-50 dark:hover:bg-gray-700"
                      aria-label="Copy address"
                    >
                      <DocumentDuplicateIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Value</p>
                  <p className="text-gray-900 dark:text-white font-medium">{transaction.value}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Transaction Fee</p>
                  <p className="text-gray-900 dark:text-white font-medium">{transaction.fee}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Gas Price</p>
                  <p className="text-gray-900 dark:text-white font-medium">{transaction.gasPrice}</p>
                </div>
              </div>
            </div>
          </div>

          {/* More Details Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">More Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Timestamp</p>
                <p className="text-gray-900 dark:text-white">{new Date(transaction.timestamp).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Nonce</p>
                <p className="text-gray-900 dark:text-white">{transaction.nonce}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Gas Limit</p>
                <p className="text-gray-900 dark:text-white">{transaction.gasLimit.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Gas Used</p>
                <p className="text-gray-900 dark:text-white">{transaction.gasUsed.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Input Data Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Input Data</h2>
            <button 
              onClick={() => copyToClipboard(transaction.inputData)}
              className="px-3 py-1 bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-gray-600 transition flex items-center text-sm"
            >
              <DocumentDuplicateIcon className="w-4 h-4 mr-1" />
              Copy
            </button>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm font-mono text-gray-800 dark:text-gray-200 break-all whitespace-pre-wrap">
              {transaction.inputData}
            </pre>
          </div>
        </div>

        {/* Events Logs Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Event Logs</h2>
          {transaction.logs.length > 0 ? (
            <div className="space-y-4">
              {transaction.logs.map((log, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          Event
                        </span>
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          #{index + 1}
                        </span>
                      </div>
                      <p className="text-sm font-mono text-blue-600 dark:text-blue-400 break-all">
                        {log.address}
                      </p>
                    </div>
                    <button className="p-1 text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 rounded hover:bg-blue-50 dark:hover:bg-gray-700">
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Topics</p>
                    <div className="space-y-1">
                      {log.topics.map((topic, i) => (
                        <p key={i} className="text-xs font-mono text-gray-800 dark:text-gray-200 break-all">
                          [{i}] {topic}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Data</p>
                    <p className="text-xs font-mono text-gray-800 dark:text-gray-200 break-all">
                      {log.data}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No event logs found for this transaction</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TransactionPage