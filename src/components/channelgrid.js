import { channels } from '@/data/channels'
import Image from 'next/image'
import Link from 'next/link'

export default function ChannelGrid({ searchQuery }) {
  const filteredChannels = channels.filter(channel => 
    channel.channel_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {filteredChannels.map(channel => (
        <Link href={`/channel/${channel.id}`} key={channel.id}>
          <div className="channel-card">
            <Image 
              src={channel.channel_logo} 
              alt={channel.channel_name}
              width={100}
              height={100}
              className="rounded-full"
            />
            <p className="mt-2 text-center">{channel.channel_name}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
