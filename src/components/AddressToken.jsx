import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'
import { TokenTypeBadge } from './TokenTypeBadge'
import { Pagination } from './Pagination'
import { useTheme } from '../context/ThemeContext'

const TOKENS_PER_PAGE = 10

export function AddressTokens() {
  const { address } = useParams()
  const { theme } = useTheme()
  const [tokens, setTokens] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState('all') // 'all', 'erc20', 'erc721', 'erc1155'
  const [sortConfig, setSortConfig] = useState({ key: 'value', direction: 'desc' })

  useEffect(() => {
    const fetchTokens = async () => {
      setLoading(true)
      try {
        // In a real app, replace with actual API call (Alchemy, Covalent, etc.)
        const mockTokens = [
          {
            contract: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
            name: 'Uniswap',
            symbol: 'UNI',
            type: 'erc20',
            balance: '42.5',
            value: '245.75',
            price: '5.78'
          },
          {
            contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
            name: 'USD Coin',
            symbol: 'USDC',
            type: 'erc20',
            balance: '1000',
            value: '1000.00',
            price: '1.00'
          },
          {
            contract: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
            name: 'Bored Ape Yacht Club',
            symbol: 'BAYC',
            type: 'erc721',
            balance: '1',
            value: '85.00',
            price: '85.00'
          },
          // More mock tokens...
        ]
        
        setTokens(mockTokens)
      } catch (error) {
        console.error("Failed to fetch tokens:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTokens()
  }, [address])

  const filteredTokens = tokens.filter(token => {
    if (filter === 'all') return true
    return token.type === filter
  })

  const sortedTokens = [...filteredTokens].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1
    }
    return 0
  })

  const requestSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  // Pagination logic
  const indexOfLastToken = currentPage * TOKENS_PER_PAGE
  const indexOfFirstToken = indexOfLastToken - TOKENS_PER_PAGE
  const currentTokens = sortedTokens.slice(indexOfFirstToken, indexOfLastToken)
  const totalPages = Math.ceil(filteredTokens.length / TOKENS_PER_PAGE)

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 bg-block-secondary-light dark:bg-block-secondary rounded-lg animate-pulse"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-block-primary-light dark:bg-block-primary rounded-lg shadow p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold">Token Holdings</h2>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-block-accent-light dark:bg-block-accent-dark text-white' : 'bg-block-secondary-light dark:bg-block-secondary'}`}
          >
            All Tokens
          </button>
          <button
            onClick={() => setFilter('erc20')}
            className={`px-3 py-1 rounded-full text-sm ${filter === 'erc20' ? 'bg-blue-500 text-white' : 'bg-block-secondary-light dark:bg-block-secondary'}`}
          >
            ERC-20
          </button>
          <button
            onClick={() => setFilter('erc721')}
            className={`px-3 py-1 rounded-full text-sm ${filter === 'erc721' ? 'bg-purple-500 text-white' : 'bg-block-secondary-light dark:bg-block-secondary'}`}
          >
            NFTs
          </button>
        </div>
      </div>

      {filteredTokens.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No tokens found for this address</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left border-b border-block-secondary-light dark:border-block-secondary">
                  <th className="pb-2">Token</th>
                  <th className="pb-2">
                    <button 
                      onClick={() => requestSort('balance')}
                      className="flex items-center"
                    >
                      Balance
                      {sortConfig.key === 'balance' && (
                        sortConfig.direction === 'asc' ? 
                          <ArrowUpIcon className="h-3 w-3 ml-1" /> : 
                          <ArrowDownIcon className="h-3 w-3 ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="pb-2">Type</th>
                  <th className="pb-2">
                    <button 
                      onClick={() => requestSort('value')}
                      className="flex items-center"
                    >
                      Value
                      {sortConfig.key === 'value' && (
                        sortConfig.direction === 'asc' ? 
                          <ArrowUpIcon className="h-3 w-3 ml-1" /> : 
                          <ArrowDownIcon className="h-3 w-3 ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="pb-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {currentTokens.map((token, index) => (
                  <tr 
                    key={`${token.contract}-${index}`} 
                    className="border-b border-block-secondary-light dark:border-block-secondary hover:bg-block-secondary-light dark:hover:bg-block-secondary transition"
                  >
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs mr-3">
                          {token.symbol.slice(0, 3)}
                        </div>
                        <div>
                          <p className="font-medium">{token.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{token.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">{token.balance}</td>
                    <td className="py-4">
                      <TokenTypeBadge type={token.type} />
                    </td>
                    <td className="py-4">${token.value}</td>
                    <td className="py-4">${token.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}