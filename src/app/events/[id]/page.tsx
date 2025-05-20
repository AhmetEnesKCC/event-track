'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Event } from '@/types'
import { loadEvents, saveEvents } from '@/lib/storage'
import ParticipantList from '@/app/components/ParticipantList'
import CommentList from '@/app/components/CommentList'

export default function EventPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [event, setEvent] = useState<Event | null>(null)

  useEffect(() => {
    const ev = loadEvents().find(e => e.id === params.id)
    if (!ev) {
      router.push('/')
      return
    }
    setEvent(ev)
  }, [params.id, router])

  const updateEvent = (ev: Event) => {
    const events = loadEvents().map(e => (e.id === ev.id ? ev : e))
    saveEvents(events)
    setEvent(ev)
  }

  if (!event) return null

  return (
    <div className="p-4 flex flex-col gap-4 max-w-xl mx-auto">
      <Link href="/" className="text-blue-600 underline">← Back</Link>
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <ParticipantList event={event} onUpdate={updateEvent} />
      <CommentList event={event} onUpdate={updateEvent} />
    </div>
  )
}
