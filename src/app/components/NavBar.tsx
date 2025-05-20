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
    <nav className="backdrop-blur bg-white/10 text-white p-4 flex justify-between sticky top-0 z-10 border-b border-white/20">
      <Link href="/" className="font-semibold text-lg transition hover:text-blue-300">EventTrack</Link>
      <Link href="/profile" className="transition hover:text-blue-300">{name ? `Hi, ${name}` : 'Profile'}</Link>
    </nav>
  )
}
