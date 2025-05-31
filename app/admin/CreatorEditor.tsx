'use client'
import { useState, useEffect } from 'react'
import { updateCreator } from '../actions/update-creator' // adjust the path if needed

export default function CreatorEditor() {
  const [creators, setCreators] = useState<any[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [videoCount, setVideoCount] = useState(0)
  const [earnings, setEarnings] = useState(0)
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    const loadCreators = async () => {
      const res = await fetch('/api/creators')
      const data = await res.json()
      setCreators(data)
    }

    loadCreators()
  }, [])

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value
    const creator = creators.find(c => c.id === id)

    if (creator) {
      setSelectedId(id)
      setVideoCount(creator.video_count || 0)
      setEarnings(creator.total_earnings || 0)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    setStatus(null)

    console.log('🛠 Updating creator:', selectedId, {
      video_count: videoCount,
      total_earnings: earnings
    })

    const res = await updateCreator({
      id: selectedId,
      video_count: videoCount,
      total_earnings: earnings
    })

    if (res.error) {
      console.error('Update error:', res.error)
      setStatus(`❌ ${res.error}`)
    } else {
      setStatus('✅ Creator updated!')
    }
  }

  return (
    <div className="mt-6 bg-white p-16 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-[#084c41]">✏️ Update Creator Info</h2>

      <form onSubmit={handleUpdate}>
       <div className="relative z-10">
  <label className="block mb-2 text-sm font-medium text-gray-700">Select Creator</label>
  <select
    className="w-full p-2 border border-gray-300 rounded mb-4 text-black placeholder:text-gray-500"
    value={selectedId}
    onChange={handleSelect}
    required
  >
    <option value="" disabled>Select a creator</option>
    {creators.map(creator => (
      <option key={creator.id} value={creator.id}>
        {creator.full_name || creator.email}
      </option>
    ))}
  </select>
</div>

        <label className="block text-sm text-gray-600">🎥 Videos Completed</label>
        <input
          type="number"
          value={videoCount}
          onChange={(e) => setVideoCount(Number(e.target.value))}
          className="w-full border p-2 rounded mb-4"
        />

        <label className="block text-sm text-gray-600">💰 Total Earnings (SAR)</label>
        <input
          type="number"
          step="0.01"
          value={earnings}
          onChange={(e) => setEarnings(Number(e.target.value))}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          type="submit"
          className="bg-[#f2c94c] text-[#084c41] font-semibold py-3 px-4 rounded w-full hover:bg-[#e6b93f] transition"
        >
          Save Changes
        </button>
      </form>

      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  )
}