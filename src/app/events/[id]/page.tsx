'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { Event } from '@/types'
import { loadEvents, saveEvents } from '@/lib/storage'
import ParticipantList from '@/app/components/ParticipantList'
import CommentList from '@/app/components/CommentList'


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

const loadUser = () => (typeof window !== 'undefined' ? localStorage.getItem('username') || '' : '')


export default function EventPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [event, setEvent] = useState<Event | null>(null)

  const [comment, setComment] = useState('')
  const user = loadUser()

  useEffect(() => {
    const events = loadEvents()
    const ev = events.find((e) => e.id === params.id)
    if (!ev) {
      router.push('/')
      return
    }
    setEvent(ev)
  }, [params.id, router])

  const updateEvent = (ev: Event) => {

    const events = loadEvents().map((e) => (e.id === ev.id ? ev : e))

    saveEvents(events)
    setEvent(ev)
  }


  const toggleJoin = () => {
    if (!event) return
    let participants = event.participants
    if (participants.includes(user)) {
      participants = participants.filter((p) => p !== user)
    } else {
      participants = [...participants, user]
    }
    updateEvent({ ...event, participants })
  }

  const addComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!event || !comment) return
    const comments = [...event.comments, { user, text: comment }]
    setComment('')
    updateEvent({ ...event, comments })
  }


  if (!event) return null

  return (
    <div className="p-4 flex flex-col gap-4 max-w-xl mx-auto">
      <Link href="/" className="text-blue-600 underline">
        ← Back
      </Link>
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p>{event.description}</p>
      <p>
        <strong>Date:</strong> {event.date}
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <button onClick={toggleJoin} className="bg-green-600 text-white px-4 py-2 rounded w-fit">
        {event.participants.includes(user) ? 'Leave' : 'Join'} Event
      </button>
      <div>
        <h2 className="font-semibold mt-4">Participants ({event.participants.length})</h2>
        <ul className="list-disc pl-4">
          {event.participants.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-semibold mt-4 mb-2">Comments</h2>
        <ul className="space-y-2 mb-4">
          {event.comments.map((c, i) => (
            <li key={i} className="border p-2 rounded">
              <strong>{c.user}: </strong>
              {c.text}
            </li>
          ))}
        </ul>
        <form onSubmit={addComment} className="flex gap-2">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            className="border p-2 rounded flex-1"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Add
          </button>
        </form>
      </div>
    </div>
  )
}
