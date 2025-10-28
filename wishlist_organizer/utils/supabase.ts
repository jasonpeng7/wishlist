// utils/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const customFetch = (input: RequestInfo | URL, init?: RequestInit) => {
  return fetch(input, {
    ...init,
    cache: 'no-store',
    // @ts-expect-error - revalidate is a Next.js extension
    revalidate: 0, 
  });
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    fetch: customFetch,
  },
});

// Function to clear Supabase cache
export const clearSupabaseCache = () => {
  // @ts-expect-error - accessing internal cache
  if (supabase.channel) {
    supabase.removeAllChannels()
  }
}