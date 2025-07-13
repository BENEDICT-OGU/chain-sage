import { useParams } from 'react-router-dom'
import AddressInfo from '../components/AddressInfo'
import AddressTransactions from '../components/AddressTransactions'
// import AddressTokens from '../components/AddressToken'
// import AddressNFTs from '../components/'
import Tabs  from '../components/Tabs'

export default function AddressPage() {
  const { address } = useParams()
  
  const tabs = [
    { id: 'transactions', label: 'Transactions' },
    { id: 'tokens', label: 'Tokens' },
    { id: 'nfts', label: 'NFTs' },
    { id: 'analytics', label: 'Analytics' },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 break-all">
        Address <span className="text-block-accent-light dark:text-block-accent-dark">{address.slice(0, 8)}...{address.slice(-6)}</span>
      </h1>
      
      <AddressInfo address={address} />
      
      <Tabs tabs={tabs} defaultTab="transactions" className="my-6">
        <div id="transactions">
          <AddressTransactions address={address} />
        </div>
        {/* <div id="tokens">
          <AddressTokens address={address} />
        </div> */}
        {/* <div id="nfts">
          <AddressNFTs address={address} />
        </div> */}
        <div id="analytics">
          <div className="bg-block-primary-light dark:bg-block-primary rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <p>Advanced analytics for this address will be available in the next update.</p>
          </div>
        </div>
      </Tabs>
    </div>
  )
}