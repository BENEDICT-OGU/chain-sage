
import React from 'react'
import { Link } from 'react-router-dom'
function StatCard({ title, value, link }) {
  return (
    <Link to={link}>
      <div className="bg-block-primary-light dark:bg-block-primary rounded-lg shadow p-6 hover:shadow-md transition cursor-pointer h-full">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-3xl font-bold text-block-accent-light dark:text-block-accent-dark">
          {value}
        </p>
        <div className="mt-4 text-sm text-block-accent-light dark:text-block-accent-dark flex items-center">
          View all
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
export default StatCard

