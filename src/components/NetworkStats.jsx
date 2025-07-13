import { Line, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js'
import {useTheme} from "../context/ThemeContext"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

export default function NetworkStats() {
  const { theme } = useTheme()
  
  const blockTimeData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: 'Block Time (sec)',
        data: Array.from({ length: 24 }, () => Math.random() * 5 + 10),
        borderColor: theme === 'dark' ? '#0ea5e9' : '#0369a1',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        tension: 0.4,
      }
    ]
  }

  const gasPriceData = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [
      {
        label: 'Gas Price (Gwei)',
        data: [32, 45, 68],
        backgroundColor: [
          theme === 'dark' ? 'rgba(16, 185, 129, 0.8)' : 'rgba(16, 185, 129, 0.6)',
          theme === 'dark' ? 'rgba(245, 158, 11, 0.8)' : 'rgba(245, 158, 11, 0.6)',
          theme === 'dark' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(239, 68, 68, 0.6)',
        ],
      }
    ]
  }

  return (
    <div className="bg-block-primary-light dark:bg-block-primary rounded-lg shadow p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-block-accent-light dark:text-block-accent-dark">Network Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Current Height" 
          value="1,843,292" 
          change="+342" 
          icon="📈" 
          trend="up" 
        />
        <StatCard 
          title="Transactions" 
          value="42.8M" 
          change="+12.4%" 
          icon="🔄" 
          trend="up" 
        />
        <StatCard 
          title="Avg. Block Time" 
          value="13.2s" 
          change="-0.4s" 
          icon="⏱️" 
          trend="down" 
        />
        <StatCard 
          title="Network Hashrate" 
          value="245.6 TH/s" 
          change="+5.2%" 
          icon="⚡" 
          trend="up" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-block-secondary-light dark:bg-block-secondary p-4 rounded-lg">
          <h3 className="font-medium mb-2">Block Time (Last 24h)</h3>
          <Line 
            data={blockTimeData} 
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                x: {
                  grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
                },
                y: {
                  grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
                }
              }
            }} 
          />
        </div>
        
        <div className="bg-block-secondary-light dark:bg-block-secondary p-4 rounded-lg">
          <h3 className="font-medium mb-2">Current Gas Prices</h3>
          <Bar 
            data={gasPriceData} 
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                x: {
                  grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
                },
                y: {
                  grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
                }
              }
            }} 
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, change, icon, trend }) {
  const changeColor = trend === 'up' ? 'text-success' : 'text-error'
  
  return (
    <div className="bg-block-secondary-light dark:bg-block-secondary p-4 rounded-lg flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        <p className={`text-sm ${changeColor}`}>
          {change} {trend === 'up' ? '↑' : '↓'}
        </p>
      </div>
      <span className="text-2xl">{icon}</span>
    </div>
  )
}