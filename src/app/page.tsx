'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Comment {
  user: string
  text: string
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  participants: string[]
  comments: Comment[]
}

const loadUser = () => (typeof window !== 'undefined' ? localStorage.getItem('username') || '' : '')

const loadEvents = (): Event[] => {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem('events') || '[]') as Event[]
  } catch {
    return []
  }
}

const saveEvents = (events: Event[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('events', JSON.stringify(events))
  }
}

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState('')
  const [events, setEvents] = useState<Event[]>([])
  const [form, setForm] = useState({ title: '', description: '', date: '', location: '' })

  useEffect(() => {
    const u = loadUser()
    if (!u) {
      router.push('/login')
      return
    }
    setUser(u)
    setEvents(loadEvents())
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title) return
    const newEvent: Event = {
      id: Date.now().toString(),
      title: form.title,
      description: form.description,
      date: form.date,
      location: form.location,
      participants: [],
      comments: [],
    }
    const updated = [...events, newEvent]
    setEvents(updated)
    saveEvents(updated)
    setForm({ title: '', description: '', date: '', location: '' })
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
    <div className="p-4 flex flex-col gap-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Events</h1>
      <form onSubmit={addEvent} className="flex flex-col gap-2 border p-4 rounded">
        <h2 className="font-semibold">Create Event</h2>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" />
        <input name="date" value={form.date} onChange={handleChange} placeholder="Date" type="date" className="border p-2 rounded" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded self-start">Add Event</button>
      </form>
      <ul className="space-y-4">
        {events.map((ev) => (
          <li key={ev.id} className="border p-4 rounded">
            <h3 className="font-semibold text-lg">
              <Link href={`/events/${ev.id}`}>{ev.title}</Link>
            </h3>
            <p>{ev.date} - {ev.location}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => toggleJoin(ev.id)} className="bg-green-600 text-white px-2 py-1 rounded">
                {ev.participants.includes(user) ? 'Leave' : 'Join'}
              </button>
              <span className="text-sm self-center">{ev.participants.length} going</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
