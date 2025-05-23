'use client'

import { useState } from 'react'
import { loadEvents, saveEvents } from '@/lib/storage'
import { Event } from '@/types'

interface Props {
  onCreate?: (e: Event[]) => void
}

export default function EventForm({ onCreate }: Props) {
  const [form, setForm] = useState({ title: '', description: '', date: '', location: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title) return
    const newEvent: Event = {
      id: Date.now().toString(),
      title: form.title,
      description: form.description,
      date: form.date,
      location: form.location,
      participants: [],
      comments: []
    }
    const events = [...loadEvents(), newEvent]
    saveEvents(events)
    onCreate?.(events)
    setForm({ title: '', description: '', date: '', location: '' })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="neu flex flex-col gap-2 p-4 animate-fade-in"
    >
      <h2 className="font-semibold">Create Event</h2>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="neu p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="neu p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="neu p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
        className="neu p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button
        type="submit"
        className="neu px-4 py-2 self-start"
      >
        Add Event
      </button>
    </form>
  )
}
