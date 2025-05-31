'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)

    const email = `${phone}@postwithpassion.com`

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setStatus(`❌ ${error.message}`)
    } else {
      setStatus('✅ Successfully logged in!')
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-[#084c41] flex items-center justify-center px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="PwP Logo" width={80} height={80} />
        </div>
        <h1 className="text-2xl font-bold text-center text-[#084c41] mb-6">
          📲 Login to PwP
        </h1>
        <form onSubmit={handleLogin}>
          <label className="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            placeholder="e.g. 0501234567"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#f2c94c]"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Your password"
            className="w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-[#f2c94c]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#f2c94c] text-[#084c41] font-semibold py-3 rounded hover:bg-[#e6b93f] transition"
          >
            Log In
          </button>
        </form>
        {status && (
          <p className={`mt-4 text-sm ${status.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {status}
          </p>
        )}
      </div>
    </div>
  )
}