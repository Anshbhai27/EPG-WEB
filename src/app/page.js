'use client'
import { useState } from 'react'
import ChannelGrid from '@/components/ChannelGrid'
import SearchBar from '@/components/SearchBar'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={setSearchQuery} />
      <ChannelGrid searchQuery={searchQuery} />
    </div>
  )
}
