'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../src/lib/supabase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Dashboard() {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [videoCount, setVideoCount] = useState<number | null>(null)
  const [earnings, setEarnings] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchCreatorData = async () => {
      // Get authenticated user
      const { data: userData, error: userError } = await supabase.auth.getUser()

      if (userError || !userData.user) {
        console.error('User not authenticated:', userError?.message)
        router.push('/login')
        return
      }

      const userId = userData.user.id
      setEmail(userData.user.email || '')
      console.log('Authenticated userId:', userId)

      // Query creator data
      const { data: creator, error: creatorError } = await supabase
        .from('creators')
        .select('full_name, video_count, total_earnings')
        .eq('id', userId)
        .maybeSingle()

      if (creatorError) {
        console.error('Error fetching creator data:', creatorError.message)
        return
      }

      if (!creator) {
        console.error('No creator found for userId:', userId)
        return
      }

      setFullName(creator.full_name || '')
      setVideoCount(creator.video_count)
      setEarnings(creator.total_earnings)
      setLoading(false)
    }

    fetchCreatorData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-500">
        Loading your dashboard...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <Image
          src="/logo.png"
          alt="App Logo"
          width={120}
          height={60}
          className="mb-4 mx-auto"
        />
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          👋 Welcome Back, <span className="text-blue-600">{fullName || email}</span>
        </h1>

        <div className="grid gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-gray-500 text-sm mb-1">🎥 Videos Completed</p>
            <p className="text-3xl font-bold text-blue-600">{videoCount}</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-gray-500 text-sm mb-1">💰 Total Earnings</p>
            <div className="flex items-center space-x-1">
              <Image src="/riyalsign.png" alt="SAR" width={24} height={24} />
              <span className="text-3xl font-bold text-green-600">{earnings?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}