'use client'

import { Event } from '@/types'
import { loadUser, loadEvents, saveEvents } from '@/lib/storage'

interface Props {
  event: Event
  onUpdate: (ev: Event) => void
}

export default function ParticipantList({ event, onUpdate }: Props) {
  const user = loadUser()

  const toggleJoin = () => {
    let participants = event.participants
    if (participants.includes(user)) {
      participants = participants.filter(p => p !== user)
    } else {
      participants = [...participants, user]
    }
    const updated: Event = { ...event, participants }
    const events = loadEvents().map(ev => ev.id === event.id ? updated : ev)
    saveEvents(events)
    onUpdate(updated)
  }

  return (
    <div className="neu p-4 animate-fade-in">
      <button
        onClick={toggleJoin}
        className="neu px-4 py-2 w-fit"
      >
        {event.participants.includes(user) ? 'Leave' : 'Join'} Event
      </button>
      <h2 className="font-semibold mt-4">Participants ({event.participants.length})</h2>
      <ul className="list-disc pl-4 space-y-1">
        {event.participants.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  )
}
