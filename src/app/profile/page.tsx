'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { loadUser, loadEvents } from '@/lib/storage'
import { Event } from '@/types'

export default function Profile() {
  const [user, setUser] = useState('')
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const u = loadUser()
    setUser(u)
    setEvents(loadEvents().filter(ev => ev.participants.includes(u)))
  }, [])

  if (!user) return null

  return (
    <div className="p-4 flex flex-col gap-4 max-w-xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">{user}'s Profile</h1>
      <h2 className="font-semibold">Joined Events</h2>
      <ul className="space-y-2">
        {events.map((ev) => (
          <li key={ev.id} className="border border-white/20 p-2 rounded bg-white/10 backdrop-blur">
            <Link href={`/events/${ev.id}`} className="hover:underline">
              {ev.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
