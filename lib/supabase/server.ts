import { createServerClient as createClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!

export function createServerClient() {
  const cookieStore = cookies()

  return createClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return (cookieStore as any).getAll ? (cookieStore as any).getAll() : []
        },
        setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              (cookieStore as any).set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}

export function createServiceRoleClient() {
  return createClient(
    NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_KEY,
    {
      auth: { persistSession: false },
      global: { headers: { 'x-supabase-source': 'service-role' } },
    }
  )
}
