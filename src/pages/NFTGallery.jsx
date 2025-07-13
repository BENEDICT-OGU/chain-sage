import { useNFTs } from '../hooks/useNFTs'

export default function NFTGallery({ address }) {
  const { nfts, isLoading } = useNFTs(address)

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">NFT Collection</h2>
      
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-block-secondary-light dark:bg-block-secondary rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : nfts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {nfts.map((nft) => (
            <div key={`${nft.contractAddress}-${nft.tokenId}`} className="border border-block-secondary-light dark:border-block-secondary rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer">
              <img 
                src={nft.image} 
                alt={nft.name} 
                className="w-full aspect-square object-cover"
                onError={(e) => e.target.src = '/placeholder-nft.png'}
              />
              <div className="p-3">
                <h3 className="font-medium truncate">{nft.name || `#${nft.tokenId}`}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{nft.collectionName}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No NFTs found in this wallet</p>
        </div>
      )}
    </div>
  )
}