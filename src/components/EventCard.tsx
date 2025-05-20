'use client'

import Link from 'next/link'
import { Event, loadUser } from '../lib/storage'

interface Props {
  event: Event
  onToggleJoin: (id: string) => void
}

export default function EventCard({ event, onToggleJoin }: Props) {
  const user = loadUser()
  const joined = event.participants.includes(user)

  return (
    <li className="border rounded shadow p-4 flex flex-col gap-2">
      {event.image && (
        <img src={event.image} alt="event" className="w-full h-40 object-cover rounded" />
      )}
      <h3 className="font-semibold text-xl">
        <Link href={`/events/${event.id}`}>{event.title}</Link>
      </h3>
      <p className="text-sm text-gray-600">
        {event.date} - {event.location}
      </p>
      <div className="flex gap-2 mt-2 items-center">
        <button
          onClick={() => onToggleJoin(event.id)}
          className={`px-3 py-1 rounded text-white ${joined ? 'bg-red-600' : 'bg-green-600'}`}
        >
          {joined ? 'Leave' : 'Join'}
        </button>
        <span className="text-sm">{event.participants.length} going</span>
      </div>
    </li>
  )
}
