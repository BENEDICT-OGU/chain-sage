import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid'
import {useTheme} from "../context/ThemeContext"

async function fetchSearchSuggestions(query) {
  // In a real app, this would call your API
  return new Promise(resolve => {
    setTimeout(() => {
      const mockResults = [
        { type: 'block', value: `Block #${Math.floor(Math.random() * 1000000)}` },
        { type: 'transaction', value: '0x' + Math.random().toString(16).slice(2, 10) + '...' },
        { type: 'address', value: '0x' + Math.random().toString(16).slice(2, 10) + '...' },
        { type: 'token', value: 'Token ' + String.fromCharCode(65 + Math.floor(Math.random() * 26)) },
      ]
      resolve(mockResults)
    }, 300)
  })
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const { theme } = useTheme()

  const { data: suggestions, isLoading } = useQuery(
    ['search', query],
    () => fetchSearchSuggestions(query),
    {
      enabled: query.length > 2,
    }
  )

  const handleClear = () => {
    setQuery('')
  }

  return (
    <div className="relative max-w-3xl mx-auto my-6">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search by block height, transaction hash, address, or token..."
          className={`w-full pl-10 pr-8 py-3 rounded-lg bg-block-secondary-light dark:bg-block-secondary text-gray-900 dark:text-white border border-block-primary-light dark:border-block-primary focus:border-block-accent-light dark:focus:border-block-accent-dark focus:outline-none ${isLoading ? 'animate-pulse' : ''}`}
        />
        {query && (
          <button 
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {isFocused && suggestions?.length > 0 && (
        <div className={`absolute z-10 w-full mt-1 rounded-lg shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-block-primary-dark' : 'bg-white'}`}>
          {suggestions.map((item, index) => (
            <div 
              key={index}
              className={`px-4 py-2 hover:bg-block-secondary-light dark:hover:bg-block-secondary cursor-pointer flex items-center ${index < suggestions.length - 1 ? 'border-b border-block-primary-light dark:border-block-primary' : ''}`}
            >
              <span className={`inline-block w-6 h-6 rounded-full mr-3 flex items-center justify-center text-xs ${
                item.type === 'block' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                item.type === 'transaction' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                item.type === 'address' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
              }`}>
                {item.type[0].toUpperCase()}
              </span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}