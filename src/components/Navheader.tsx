import React from 'react'

type NavheaderProps = {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Navheader = ({ onSearch, searchQuery }: NavheaderProps) => {

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
  }

  return (
    <nav className="w-full flex items-center justify-between px-4 py-2 bg-white shadow">
      {/* Left: Logo or placeholder */}
      <div className="flex-1 flex items-center">
        <span className="font-bold text-xl text-gray-800">Shop</span>
      </div>
      {/* Center: Search */}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search for item..."
          value={searchQuery}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleSearchChange}
        />
      </div>
      {/* Right: Cart Icon */}
      <div className="flex-1 flex justify-end items-center">
        <button className="relative">
          {/* Heroicons Shopping Cart SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.272 1.017m0 0l1.357 5.086m-.001 0A2.25 2.25 0 008.25 12.75h7.5a2.25 2.25 0 002.199-1.812l1.35-6A1.125 1.125 0 0018.75 3H5.25m1.545 1.852L5.25 3m1.545 1.852l1.357 5.086m0 0l.272 1.017m0 0A2.25 2.25 0 008.25 12.75h7.5a2.25 2.25 0 002.199-1.812l1.35-6A1.125 1.125 0 0018.75 3H5.25" />
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Navheader