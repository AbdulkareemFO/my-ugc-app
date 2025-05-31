'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function getAllCreators() {
  const { data, error } = await supabaseAdmin
    .from('creators')
    .select('id, full_name, email, video_count, total_earnings')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching all creators:', error.message)
    return []
  }

  return data || []
}