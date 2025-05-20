'use client'

import { useState } from 'react'
import { Event } from '../lib/storage'

interface Props {
  onAdd: (event: Event) => void
}

export default function EventForm({ onAdd }: Props) {
  const [form, setForm] = useState({ title: '', description: '', date: '', location: '', image: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement
    if (name === 'image' && files && files[0]) {
      const reader = new FileReader()
      reader.onload = () => {
        setForm((f) => ({ ...f, image: reader.result as string }))
      }
      reader.readAsDataURL(files[0])
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title) return
    const newEvent: Event = {
      id: Date.now().toString(),
      title: form.title,
      description: form.description,
      date: form.date,
      location: form.location,
      image: form.image || undefined,
      participants: [],
      comments: [],
    }
    onAdd(newEvent)
    setForm({ title: '', description: '', date: '', location: '', image: '' })
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2 border p-4 rounded bg-white shadow">
      <h2 className="font-semibold">Create Event</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" />
      <input name="date" value={form.date} onChange={handleChange} type="date" className="border p-2 rounded" />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="border p-2 rounded" />
      <input name="image" type="file" accept="image/*" onChange={handleChange} className="border p-2 rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded self-start">Add Event</button>
    </form>
  )
}
