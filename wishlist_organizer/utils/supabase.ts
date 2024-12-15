import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string = 'https://udeoscdqsqggqmsutaor.supabase.co'
const supabaseKey: string = process.env.SUPABASE_KEY as string

if (!supabaseKey) {
  throw new Error('Missing SUPABASE_KEY environment variable')
}

export const supabase = createClient(supabaseUrl, supabaseKey)