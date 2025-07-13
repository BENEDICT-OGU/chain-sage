export default function TransactionLogs({ txHash }) {
  // Mock data
  const logs = [
    { address: '0x3f5...5f7', topics: ['Transfer', '0x1b4...8c1', '0x9c3...e7b'], data: '0x000...1000' },
    { address: '0x7a2...9f1', topics: ['Approval'], data: '0x000...2000' },
  ]

  return (
    <div className="bg-block-primary-light dark:bg-block-primary rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Event Logs</h2>
      
      {logs.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-sm text-gray-600 dark:text-gray-400 border-b border-block-secondary-light dark:border-block-secondary">
                <th className="pb-2">Address</th>
                <th className="pb-2">Topics</th>
                <th className="pb-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={i} className="border-b border-block-secondary-light dark:border-block-secondary hover:bg-block-secondary-light dark:hover:bg-block-secondary transition">
                  <td className="py-3 font-mono text-sm">{log.address}</td>
                  <td className="py-3">
                    <div className="flex flex-wrap gap-1">
                      {log.topics.map((topic, j) => (
                        <span key={j} className="px-2 py-1 bg-block-secondary-light dark:bg-block-secondary rounded text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 font-mono text-sm">{log.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">No event logs for this transaction</p>
      )}
    </div>
  )
}