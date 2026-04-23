// src/lib/supabase/client.ts
// Browser-side Supabase client. Use in Client Components only.
// For Server Components / Server Actions / Route Handlers → use server.ts

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
