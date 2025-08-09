
import React, { useState, useEffect } from 'react'
import Navheader from './components/Navheader'
import Footer from './components/footer'
import { Cart } from './components/cart'
import { setInitDatainlocalStorage } from './utils/setData'
import { catalogMockData } from './mockData/catalogMockData'
import type { CatalogItem } from './modals/catalog'
import { filterItemsBySearch } from './utils/searchUtils'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredItems, setFilteredItems] = useState<CatalogItem[]>(catalogMockData)

  // Initialize localStorage data only once on component mount
  useEffect(() => {
    setInitDatainlocalStorage()
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = filterItemsBySearch(catalogMockData, query)
    setFilteredItems(filtered)
  }

  return (
    <>
     <Navheader onSearch={handleSearch} searchQuery={searchQuery} />
     <Cart catalogItems={filteredItems} />
     <Footer />
    </>
  )
}

export default App
