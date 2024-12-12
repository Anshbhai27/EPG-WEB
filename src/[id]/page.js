'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { channels } from '@/data/channels'
import Image from 'next/image'
import Link from 'next/link'

export default function ChannelPage() {
  const params = useParams()
  const [epgData, setEpgData] = useState([])
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const channel = channels.find(c => c.id === Number(params.id))

  useEffect(() => {
    const fetchEPG = async () => {
      try {
        setLoading(true)
        const res = await fetch(
          `https://tata-ka-epg.vercel.app/api/epg?date=${date}&channel=${params.id}`
        )
        if (!res.ok) throw new Error('Failed to fetch EPG data')
        const data = await res.json()
        setEpgData(data.data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEPG()
  }, [params.id, date])

  if (!channel) return <div>Channel not found</div>

  return (
    <div className="container mx-auto p-4">
      <nav className="mb-8">
        <Link 
          href="/"
          className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
        >
          ← Back to Channels
        </Link>
      </nav>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image 
            src={channel.channel_logo}
            alt={channel.channel_name}
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold">{channel.channel_name}</h1>
      </div>

      <select 
        className="w-full md:w-auto mb-6 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setDate(e.target.value)}
        value={date}
      >
        {[...Array(7)].map((_, i) => {
          const d = new Date()
          d.setDate(d.getDate() - i)
          const dateStr = d.toISOString().split('T')[0]
          return (
            <option key={dateStr} value={dateStr}>
              {d.toLocaleDateString()}
            </option>
          )
        })}
      </select>

      {loading && (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center py-10">
          Error: {error}
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-4">
          {epgData.map(show => (
            <div 
              key={show.startTime} 
              className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold text-lg">{show.title}</h3>
              <p className="text-gray-600">
                {new Date(show.startTime).toLocaleTimeString()} - 
                {new Date(show.endTime).toLocaleTimeString()}
              </p>
            </div>
          ))}
          {epgData.length === 0 && (
            <p className="text-center text-gray-500 py-10">
              No shows scheduled for this date
            </p>
          )}
        </div>
      )}
    </div>
  )
}
