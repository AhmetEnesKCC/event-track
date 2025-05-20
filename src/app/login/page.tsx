'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { saveUser } from '@/lib/storage'

export default function Login() {
  const router = useRouter()
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) return
    saveUser(name)
    router.push('/')
  }

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Continue
        </button>
      </form>
    </div>
  )
}
