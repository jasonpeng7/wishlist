import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string = 'https://udeoscdqsqggqmsutaor.supabase.co'
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_KEY as string

if (!supabaseKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_KEY environment variable')
}

export const supabase = createClient(supabaseUrl, supabaseKey)