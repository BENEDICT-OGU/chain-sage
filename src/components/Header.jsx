// import { Link } from 'react-router-dom'
// import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
// import { useTheme } from '../context/ThemeContext'

// export default function Header() {
//   const { theme, toggleTheme } = useTheme()
  
//   return (
//     <header className="bg-block-primary-light dark:bg-block-dark text-gray-900 dark:text-white shadow-lg">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//         <Link to="/" className="flex items-center space-x-2">
//           <span className="text-2xl font-bold text-block-accent-light dark:text-block-accent-dark">ChainSage</span>
//           <span className="text-xs bg-block-accent-light dark:bg-block-accent-dark px-2 py-1 rounded text-white">v2.0</span>
//         </Link>
        
//         <nav className="hidden md:flex space-x-6">
//           <Link to="/" className="hover:text-block-accent-light dark:hover:text-block-accent-dark transition">Home</Link>
//           <Link to="/blocks" className="hover:text-block-accent-light dark:hover:text-block-accent-dark transition">Blocks</Link>
//           <Link to="/transactions" className="hover:text-block-accent-light dark:hover:text-block-accent-dark transition">Transactions</Link>
//           <Link to="/tokens" className="hover:text-block-accent-light dark:hover:text-block-accent-dark transition">Tokens</Link>
//           <Link to="/nfts" className="hover:text-block-accent-light dark:hover:text-block-accent-dark transition">NFTs</Link>
//           <Link to="/analytics" className="hover:text-block-accent-light dark:hover:text-block-accent-dark transition">Analytics</Link>
//         </nav>
        
//         <div className="flex items-center space-x-4">
//           <button 
//             onClick={toggleTheme}
//             className="p-2 rounded-full bg-block-secondary-light dark:bg-block-secondary-dark hover:bg-opacity-80 transition"
//             aria-label="Toggle dark mode"
//           >
//             {theme === 'dark' ? (
//               <SunIcon className="w-5 h-5 text-yellow-400" />
//             ) : (
//               <MoonIcon className="w-5 h-5 text-indigo-700" />
//             )}
//           </button>
          
//           <button className="bg-block-accent-light dark:bg-block-accent-dark hover:bg-opacity-90 px-4 py-2 rounded transition flex items-center space-x-2">
//             <span>Connect Wallet</span>
//             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
//           </button>
//         </div>
//       </div>
//     </header>
//   )
// }


import { Link, NavLink, useNavigate } from 'react-router-dom'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import { useTheme } from '../context/ThemeContext'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  
  // Navigation items with their paths
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Blocks', path: '/blocks' },
    { name: 'Transactions', path: '/transactions' },
    { name: 'Tokens', path: '/tokens' },
    { name: 'NFTs', path: '/nfts' },
    { name: 'Wallet', path: '/wallet' }
  ]

  return (
    <header className="bg-block-primary-light dark:bg-block-dark text-gray-900 dark:text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo with Home link */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-block-accent-light dark:text-block-accent-dark">ChainSage</span>
          {/* <span className="text-xs bg-block-accent-light dark:bg-block-accent-dark px-2 py-1 rounded text-white">v2.0</span> */}
        </Link>
        
        {/* Main Navigation */}
        <nav className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive 
                    ? 'bg-block-accent-light dark:bg-block-accent-dark text-white' 
                    : 'hover:bg-block-secondary-light dark:hover:bg-block-secondary text-gray-700 dark:text-gray-300'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        {/* Right-side buttons */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-block-secondary-light dark:bg-block-secondary-dark hover:bg-opacity-80 transition"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? (
              <SunIcon className="w-5 h-5 text-yellow-400" />
            ) : (
              <MoonIcon className="w-5 h-5 text-indigo-700" />
            )}
          </button>
          
          <ConnectButton 
            showBalance={false}
            accountStatus="address"
            chainStatus="icon"
          />
        </div>
      </div>
    </header>
  )
}