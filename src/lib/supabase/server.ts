// src/lib/supabase/server.ts
// Server-side Supabase client. Use in Server Components, Server Actions, Route Handlers.
// NEVER use this in Client Components — it reads cookies() which is server-only.

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // setAll called from a Server Component — safe to ignore.
            // Middleware handles session refresh in that case.
          }
        },
      },
    }
  )
}
