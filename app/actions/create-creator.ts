'use server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function createCreator({ phone, name }: { phone: string, name: string }) {
  const email = `${phone}@postwithpassion.com`
  const password = '123456'

  // 1. Look for existing Auth user
  const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 })
  const existingUser = users?.users.find((user: any) => user.email === email)
  let userId = existingUser ? existingUser.id : ''

  // 2. If not found, create Auth user
  if (!existingUser) {
    const { data: createdUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (authError) return { error: `Auth error: ${authError.message}` }
    userId = createdUser.user?.id
  }

  // 3. Insert or update creators table using userId
  const { data: existingCreator } = await supabaseAdmin
    .from('creators')
    .select('id')
    .eq('id', userId)
    .maybeSingle()

    if (existingCreator) {
      // 🟢 If found, just update
      const { error: updateError } = await supabaseAdmin
        .from('creators')
        .update({ full_name: name, phone })
        .eq('id', userId)
    
      if (updateError) return { error: `DB update error: ${updateError.message}` }
    
      return { success: true, message: '✅ Updated existing creator.' }
    } else {
      // 🔵 Only create new if it doesn't exist
      console.log('📦 Inserting new creator with:', {
        id: userId,
        full_name: name,
        phone,
        email,
      })
    
      const { error: insertError } = await supabaseAdmin
        .from('creators')
        .insert([
          {
            id: userId,
            full_name: name,
            phone,
            email,
            video_count: 0,
            total_earnings: 0,
          },
        ])
    
      if (insertError) return { error: `DB insert error: ${insertError.message}` }
    
      return { success: true, message: '✅ New creator added.' }
    }
}