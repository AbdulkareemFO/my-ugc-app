'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function updateCreator({ id, video_count, total_earnings }: {
  id: string
  video_count: number
  total_earnings: number
}) {
  console.log('🛠️ Server action: Updating creator', id, {
    video_count,
    total_earnings,
  })

  const { error } = await supabaseAdmin
    .from('creators')
    .update({ video_count, total_earnings })
    .eq('id', id)

  if (error) {
    console.error('❌ DB update error:', error.message)
    return { error: error.message }
  }

  return { success: true }
}