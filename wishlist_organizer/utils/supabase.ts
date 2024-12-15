// utils/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // This prevents session persistence
    autoRefreshToken: true,
  },
  // Add cache configuration
  db: {
    schema: 'public'
  },
  global: {
    headers: {
    }
  }
})

// Function to clear Supabase cache
export const clearSupabaseCache = () => {
  // @ts-ignore - accessing internal cache
  if (supabase.channel) {
    supabase.removeAllChannels()
  }
}