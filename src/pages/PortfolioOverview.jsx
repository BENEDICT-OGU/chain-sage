import { useBalance, useAccount } from 'wagmi'
import { PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function PortfolioOverview({ address }) {
  const { data: ethBalance } = useBalance({ address })
  const { chain } = useAccount()

  // Mock token data (replace with real API calls)
  const portfolioData = [
    { name: 'ETH', value: 4200 },
    { name: 'USDC', value: 1500 },
    { name: 'WBTC', value: 3200 },
    { name: 'Other', value: 800 },
  ]

  return (
    <div className="bg-block-primary-light dark:bg-block-primary rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Balance */}
        <div className="bg-block-secondary-light dark:bg-block-secondary p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Balance</h3>
          <p className="text-3xl font-bold">${(4200 + 1500 + 3200 + 800).toLocaleString()}</p>
          <p className="text-success flex items-center mt-2">
            <ArrowTrendingUpIcon className="h-5 w-5 mr-1" />
            2.4% (24h)
          </p>
        </div>

        {/* Current Network */}
        <div className="bg-block-secondary-light dark:bg-block-secondary p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Current Network</h3>
          <div className="flex items-center space-x-2">
            <img 
              src={`/chains/${chain?.id}.png`} 
              alt={chain?.name} 
              className="h-8 w-8 rounded-full"
            />
            <span>{chain?.name || 'Not connected'}</span>
          </div>
          <p className="mt-2 text-sm">
            ETH Balance: {ethBalance?.formatted.slice(0, 6)} {ethBalance?.symbol}
          </p>
        </div>

        {/* Asset Distribution */}
        <div className="bg-block-secondary-light dark:bg-block-secondary p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Asset Distribution</h3>
          <div className="flex justify-center">
            <PieChart width={160} height={160}>
              <Pie
                data={portfolioData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {portfolioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  )
}