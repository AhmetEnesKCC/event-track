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

    if (typeof window !== 'undefined') {
      localStorage.setItem('username', name)
    }

    router.push('/')
  }

  return (
    <div className="p-4 neu flex flex-col items-center gap-6 max-w-md mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="neu flex flex-col gap-4 w-full p-6"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="neu p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="neu px-4 py-2"
        >
          Continue
        </button>
      </form>
    </div>
  )
}
