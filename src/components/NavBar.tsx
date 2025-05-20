'use client'

import Link from 'next/link'
import { loadUser } from '../lib/storage'

export default function NavBar() {
  const user = loadUser()

  return (
    <nav className="bg-gray-800 text-white px-4 py-2 flex justify-between">
      <div className="flex gap-4">
        <Link href="/" className="font-semibold hover:underline">
          Events
        </Link>
        <Link href="/profile" className="hover:underline">
          Profile
        </Link>
      </div>
      <span className="italic">{user && `Hello, ${user}`}</span>
    </nav>
  )
}
