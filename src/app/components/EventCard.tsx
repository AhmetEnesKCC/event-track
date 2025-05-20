'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Event } from '@/types'
import { loadUser, loadEvents, saveEvents } from '@/lib/storage'

interface Props {
  event: Event
  onUpdate?: (events: Event[]) => void
}

export default function EventCard({ event, onUpdate }: Props) {
  const [user, setUser] = useState('')

  useEffect(() => {
    setUser(loadUser())
  }, [])

  const toggleJoin = () => {
    const events = loadEvents().map(ev => {
      if (ev.id === event.id) {
        let participants = ev.participants
        if (participants.includes(user)) {
          participants = participants.filter(p => p !== user)
        } else {
          participants = [...participants, user]
        }
        ev = { ...ev, participants }
      }
      return ev
    })
    saveEvents(events)
    onUpdate?.(events)
  }

  return (
    <li className="neu p-4 transition-transform hover:scale-105 animate-fade-in">
      <h3 className="font-semibold text-lg">
        <Link href={`/events/${event.id}`} className="hover:underline">
          {event.title}
        </Link>
      </h3>
      <p className="text-sm text-gray-600">
        {event.date} - {event.location}
      </p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={toggleJoin}
          className="neu px-2 py-1"
        >
          {event.participants.includes(user) ? 'Leave' : 'Join'}
        </button>
        <span className="text-sm self-center">{event.participants.length} going</span>
      </div>
    </li>
  )
}
