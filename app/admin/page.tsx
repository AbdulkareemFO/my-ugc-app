'use client'
import CreatorEditor from './CreatorEditor'
import { useState } from 'react'
import Image from 'next/image'
import { createCreator } from '../actions/create-creator'

export default function AdminPage() {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  const handleAddCreator = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)

    const res = await createCreator({ phone, name })

    if (res?.error) {
      setStatus(`❌ ${res.error}`)
    } else {
      setStatus(`✅ ${res.message}`)
      setPhone('')
      setName('')
    }
  }

 
 
  return (
    <div className="min-h-screen bg-[#084c41] flex items-center justify-center p-6">

        
<div className="bg-white w-full rounded-xl shadow-lg p-6 md:p-8">
                <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="PwP Logo"
            width={80}
            height={80}
          />
        </div>
        <h1 className="text-2xl font-bold text-center text-[#084c41] mb-6">
          🛠️ Admin: Add Creator
        </h1>
        <form onSubmit={handleAddCreator}>
          <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
          <input
            type="text"
            placeholder="e.g. Layla Creator"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#f2c94c]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label className="text-sm font-medium text-gray-700 block mb-1">Phone</label>
          <input
            type="text"
            placeholder="e.g. 0501234567"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#f2c94c]"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#f2c94c] text-[#084c41] font-semibold py-3 rounded hover:bg-[#e6b93f] transition"
          >
            ➕ Add Creator
          </button>
        </form>
        {status && (
          <p className={`mt-4 text-sm ${status.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {status}
          </p>
        )}
      </div>
       {/* Edit Creator */}
       <CreatorEditor />
    </div>
  )
}


