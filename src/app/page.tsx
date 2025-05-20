'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Event, loadEvents, saveEvents, loadUser } from '../lib/storage'
import EventForm from '../components/EventForm'
import EventCard from '../components/EventCard'

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

  const addEvent = (ev: Event) => {
    const updated = [...events, ev]
    setEvents(updated)
    saveEvents(updated)
  }

  const toggleJoin = (id: string) => {
    const updated = events.map((ev) => {
      if (ev.id === id) {
        let participants = ev.participants
        if (participants.includes(user)) {
          participants = participants.filter((p) => p !== user)
        } else {
          participants = [...participants, user]
        }
        return { ...ev, participants }
      }
      return ev
    })
    setEvents(updated)
    saveEvents(updated)
  }

  return (
    <div className="p-4 flex flex-col gap-8 max-w-xl mx-auto bg-white shadow rounded mt-4">
      <h1 className="text-2xl font-bold">Events</h1>
      <EventForm onAdd={addEvent} />
      <ul className="space-y-4">
        {events.map((ev) => (
          <EventCard key={ev.id} event={ev} onToggleJoin={toggleJoin} />
        ))}
      </ul>
    </div>
  )
}
