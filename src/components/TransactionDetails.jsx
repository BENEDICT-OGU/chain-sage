import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'
import { decodeFunctionData } from 'viem' // Would need to install viem

export default function TransactionDetails({ transaction }) {
  const { theme } = useTheme()
  const isSuccess = transaction.status === 'Success'
  
  // Try to decode input data
//   let decodedInput = null
//   try {
//     decodedInput = decodeFunctionData({
//       abi: /* your ABI here */,
//       data: transaction.inputData
//     })
//   } catch (e) {
//     console.log("Couldn't decode input data")
//   }

  return (
    <div className="bg-block-primary-light dark:bg-block-primary rounded-lg shadow p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          {isSuccess ? (
            <CheckCircleIcon className="h-8 w-8 text-success" />
          ) : (
            <XCircleIcon className="h-8 w-8 text-error" />
          )}
          <h2 className="text-xl font-semibold">
            {transaction.status}
          </h2>
        </div>
        <div className="text-sm bg-block-secondary-light dark:bg-block-secondary px-3 py-1 rounded">
          Block #{transaction.block}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <DetailSection 
          title="From" 
          value={transaction.from} 
          icon={<ArrowUpIcon className="h-5 w-5" />}
          isAddress
        />
        <DetailSection 
          title="To" 
          value={transaction.to} 
          icon={<ArrowDownIcon className="h-5 w-5" />}
          isAddress
        />
        <DetailSection title="Value" value={transaction.value} />
        <DetailSection title="Transaction Fee" value={transaction.fee} />
        <DetailSection title="Gas Price" value={transaction.gasPrice} />
        <DetailSection title="Gas Limit" value={transaction.gasLimit} />
      </div>

      {decodedInput && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Decoded Input</h3>
          <div className="bg-block-secondary-light dark:bg-block-secondary p-4 rounded">
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(decodedInput, null, 2)}
            </pre>
          </div>
        </div>
      )}

      <div>
        <h3 className="font-medium mb-2">Raw Input Data</h3>
        <div className="bg-block-secondary-light dark:bg-block-secondary p-4 rounded font-mono text-sm overflow-x-auto">
          {transaction.inputData}
        </div>
      </div>
    </div>
  )
}

function DetailSection({ title, value, icon, isAddress = false }) {
  return (
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
      <div className="flex items-center space-x-2">
        {icon && <div className="text-block-accent-light dark:text-block-accent-dark">{icon}</div>}
        <p className={`break-all ${isAddress ? 'font-mono text-block-accent-light dark:text-block-accent-dark' : ''}`}>
          {value}
        </p>
      </div>
    </div>
  )
}