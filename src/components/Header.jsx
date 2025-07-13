import { Link, NavLink } from 'react-router-dom'
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { useTheme } from '../context/ThemeContext'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useState, useEffect } from 'react'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Blocks', path: '/blocks' },
    { name: 'Transactions', path: '/transactions' },
    { name: 'Tokens', path: '/tokens' },
    { name: 'NFTs', path: '/nfts' },
    { name: 'Wallet', path: '/wallet' }
  ]

  useEffect(() => {
    const handleRouteChange = () => setIsOpen(false)
    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' 
          : 'bg-block-primary-light dark:bg-block-dark shadow-lg'
      }`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 z-50"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                ChainSage
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-lg text-sm font-medium transition ${
                      isActive 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' 
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? (
                  <SunIcon className="w-5 h-5 text-yellow-400" />
                ) : (
                  <MoonIcon className="w-5 h-5 text-indigo-700" />
                )}
              </button>
              
              <div className="hidden md:block">
                <ConnectButton 
                  showBalance={false}
                  accountStatus="address"
                  chainStatus="icon"
                />
              </div>

              <button
                className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - Now positioned below the header */}
      <div className={`md:hidden fixed inset-0 z-40 bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-y-0 mt-16' : '-translate-y-full'
      }`}>
        <div className="container mx-auto px-4 py-4 overflow-y-auto h-[calc(100vh-4rem)]">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `px-4 py-3 rounded-lg text-base font-medium transition ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="mt-6">
            <ConnectButton 
              showBalance={false}
              accountStatus="full"
              chainStatus="full"
            />
          </div>
        </div>
      </div>
    </>
  )
}