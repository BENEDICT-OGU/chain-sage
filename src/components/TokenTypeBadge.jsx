export function TokenTypeBadge({ type }) {
  const badgeConfig = {
    erc20: { label: 'ERC-20', color: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' },
    erc721: { label: 'NFT', color: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' },
    erc1155: { label: 'Multi-Token', color: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' }
  }

  const config = badgeConfig[type] || { label: type, color: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200' }

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${config.color}`}>
      {config.label}
    </span>
  )
}