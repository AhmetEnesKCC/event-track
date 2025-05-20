'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Event, loadUser, loadEvents } from '../../lib/storage'

export default function ProfilePage() {
  const [user, setUser] = useState('')
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    setUser(loadUser())
    setEvents(loadEvents())
  }, [])

  const joined = events.filter((e) => e.participants.includes(user))
  const created = events.filter((e) => e.comments.some(() => false)) // placeholder: no field for creator

  return (
    <div className="p-4 max-w-xl mx-auto flex flex-col gap-4 bg-white shadow rounded mt-4">
      <Link href="/" className="text-blue-600 underline">
        ← Back to Events
      </Link>
      <h1 className="text-2xl font-bold">{user}'s Profile</h1>
      <div>
        <h2 className="font-semibold mt-4 mb-2">Joined Events</h2>
        <ul className="list-disc pl-4">
          {joined.map((e) => (
            <li key={e.id}>{e.title}</li>
          ))}
        </ul>
      </div>
      {created.length > 0 && (
        <div>
          <h2 className="font-semibold mt-4 mb-2">Created Events</h2>
          <ul className="list-disc pl-4">
            {created.map((e) => (
              <li key={e.id}>{e.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
