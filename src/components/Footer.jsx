import { GlobeAltIcon, CodeBracketIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

export default function Footer() {
  return (
    <footer className="bg-block-primary-light dark:bg-block-dark text-gray-700 dark:text-gray-300 border-t border-block-secondary-light dark:border-block-primary">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-block-accent-light dark:text-block-accent-dark">ChainSage</h3>
            <p className="text-sm">
              The most comprehensive blockchain explorer for Ethereum and EVM chains.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-block-accent-light dark:hover:text-block-accent-dark transition">API Documentation</a></li>
              <li><a href="#" className="hover:text-block-accent-light dark:hover:text-block-accent-dark transition">Knowledge Base</a></li>
              <li><a href="#" className="hover:text-block-accent-light dark:hover:text-block-accent-dark transition">Network Status</a></li>
              <li><a href="#" className="hover:text-block-accent-light dark:hover:text-block-accent-dark transition">Supported Chains</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-block-accent-light dark:hover:text-block-accent-dark transition">About Us</a></li>
              <li><a href="#" className="hover:text-block-accent-light dark:hover:text-block-accent-dark transition">Careers</a></li>
              <li><a href="#" className="hover:text-block-accent-light dark:hover:text-block-accent-dark transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-block-accent-light dark:hover:text-block-accent-dark transition">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="p-2 rounded-full bg-block-secondary-light dark:bg-block-secondary hover:bg-opacity-80 transition">
                <GlobeAltIcon className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-block-secondary-light dark:bg-block-secondary hover:bg-opacity-80 transition">
                <CodeBracketIcon className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-block-secondary-light dark:bg-block-secondary hover:bg-opacity-80 transition">
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              © {new Date().getFullYear()} ChainSage Explorer. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}