import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Tabs({ tabs, defaultTab, children, className = '' }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id)

  return (
    <div className={className}>
      <div className="flex border-b border-block-secondary-light dark:border-block-secondary">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 relative ${activeTab === tab.id ? 'text-block-accent-light dark:text-block-accent-dark' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-block-accent-light dark:bg-block-accent-dark"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>
      
      <div className="mt-4">
        {React.Children.map(children, child => {
          if (child.props.id === activeTab) {
            return child
          }
          return null
        })}
      </div>
    </div>
  )
}