'use client'


import { useRouter } from 'next/navigation'
import { Event } from '@/types'
import { loadUser, loadEvents } from '@/lib/storage'
import EventForm from './components/EventForm'
import EventCard from './components/EventCard'

import { useEffect, useState } from 'react'


export default function Home() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const u = loadUser()
    if (!u) {
      router.push('/login')
      return
    }
    setEvents(loadEvents())
  }, [router])

  return (
    <div className="p-4 neu flex flex-col gap-8 max-w-xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold">Events</h1>
      <EventForm onCreate={setEvents} />
      <ul className="space-y-4">
        {events.map((ev) => (
          <EventCard key={ev.id} event={ev} onUpdate={setEvents} />
        ))}
      </ul>
    </div>
  )
}
