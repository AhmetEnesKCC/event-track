'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Event } from '@/types'
import { loadUser, loadEvents } from '@/lib/storage'
import EventForm from './components/EventForm'
import EventCard from './components/EventCard'

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState('')
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const u = loadUser()
    if (!u) {
      router.push('/login')
      return
    }
    setUser(u)
    setEvents(loadEvents())
  }, [router])

  const updateEvents = (evs: Event[]) => {
    setEvents(evs)
  }

  return (
    <div className="flex flex-col gap-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Events</h1>
      <EventForm onCreate={updateEvents} />
      <ul className="space-y-4">
        {events.map(ev => (
          <EventCard key={ev.id} event={ev} onUpdate={updateEvents} />
        ))}
      </ul>
    </div>
  )
}
