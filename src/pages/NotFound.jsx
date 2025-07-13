import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page Not Found'
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Animated 404 text */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-indigo-600 opacity-20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-float">
              <svg className="w-40 h-40 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mt-6">Oops! Page Not Found</h2>
        <p className="text-gray-600 mt-3">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Search bar */}
        <div className="mt-8 relative max-w-xs mx-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-500 text-white p-1 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        
        {/* Navigation buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>
        
        {/* Social links */}
        <div className="mt-10">
          <p className="text-gray-500 mb-3">Follow us on</p>
          <div className="flex justify-center gap-4">
            {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-indigo-600 hover:bg-indigo-100 transition duration-300"
                aria-label={social}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d={`M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z`} clipRule="evenodd" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound