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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 border p-4 rounded bg-white">
      <h2 className="font-semibold">Create Event</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" />
      <input name="date" type="date" value={form.date} onChange={handleChange} className="border p-2 rounded" />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="border p-2 rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded self-start">Add Event</button>
    </form>
  )
}
