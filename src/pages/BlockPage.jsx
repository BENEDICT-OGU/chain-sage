import { useParams } from 'react-router-dom'
import BlockDetails from '../components/BlockDetails'

export default function BlockPage() {
  const { blockHeight } = useParams()
  
  // In a real app, you would fetch block details based on blockHeight
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Block #{blockHeight}</h1>
      <BlockDetails blockHeight={blockHeight} />
    </div>
  )
}