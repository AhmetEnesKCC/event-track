'use client'

import { useState } from 'react'
import { Event } from '@/types'
import { loadUser, loadEvents, saveEvents } from '@/lib/storage'

interface Props {
  event: Event
  onUpdate: (ev: Event) => void
}

export default function CommentList({ event, onUpdate }: Props) {
  const [text, setText] = useState('')
  const user = loadUser()

  const addComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text) return
    const updated: Event = { ...event, comments: [...event.comments, { user, text }] }
    const events = loadEvents().map(ev => ev.id === event.id ? updated : ev)
    saveEvents(events)
    onUpdate(updated)
    setText('')
  }

  return (
    <div className="animate-fade-in">
      <h2 className="font-semibold mt-4 mb-2">Comments</h2>
      <ul className="space-y-2 mb-4">
        {event.comments.map((c, i) => (
          <li
            key={i}
            className="border border-gray-300 p-2 rounded bg-gray-50"
          >
            <strong>{c.user}: </strong>
            {c.text}
          </li>
        ))}
      </ul>
      <form onSubmit={addComment} className="flex gap-2">
        <input
          className="border border-gray-300 bg-white p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Add a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>
    </div>
  )
}
