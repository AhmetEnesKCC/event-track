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
    <div className="p-4 flex flex-col items-center gap-6 max-w-md mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full bg-white p-6 rounded-lg shadow-md"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="border border-gray-300 bg-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded"
        >
          Continue
        </button>
      </form>
    </div>
  )
}
