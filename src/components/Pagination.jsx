import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = []
  const maxVisiblePages = 5

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-full bg-block-secondary-light dark:bg-block-secondary disabled:opacity-50"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`w-8 h-8 rounded-full ${1 === currentPage ? 'bg-block-accent-light dark:bg-block-accent-dark text-white' : 'bg-block-secondary-light dark:bg-block-secondary'}`}
          >
            1
          </button>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}

      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`w-8 h-8 rounded-full ${number === currentPage ? 'bg-block-accent-light dark:bg-block-accent-dark text-white' : 'bg-block-secondary-light dark:bg-block-secondary'}`}
        >
          {number}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`w-8 h-8 rounded-full ${totalPages === currentPage ? 'bg-block-accent-light dark:bg-block-accent-dark text-white' : 'bg-block-secondary-light dark:bg-block-secondary'}`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full bg-block-secondary-light dark:bg-block-secondary disabled:opacity-50"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  )
}