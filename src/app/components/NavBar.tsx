'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { loadUser } from '@/lib/storage'

export default function NavBar() {
  const [name, setName] = useState('')

  useEffect(() => {
    setName(loadUser())
  }, [])

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link href="/" className="font-semibold">EventTrack</Link>
      <Link href="/profile">{name ? `Hi, ${name}` : 'Profile'}</Link>
    </nav>
  )
}
