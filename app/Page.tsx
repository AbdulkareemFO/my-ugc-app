// app/page.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#084c41] text-white flex flex-col items-center justify-center p-8">
      <Image src="/logo.png" alt="PwP Logo" width={100} height={100} className="mb-6" />

      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to PwP</h1>
      <p className="text-lg text-center max-w-md mb-8">
        Your platform for managing creator partnerships and tracking performance.
      </p>

      <div className="flex gap-4">
        <Link href="/login">
          <button className="bg-[#f2c94c] text-[#084c41] font-semibold py-2 px-6 rounded hover:bg-[#e6b93f] transition">
            Creator Login
          </button>
        </Link>
        <Link href="/admin">
          <button className="border border-white py-2 px-6 rounded hover:bg-white hover:text-[#084c41] transition">
            Admin Access
          </button>
        </Link>
      </div>
    </div>
  )
}