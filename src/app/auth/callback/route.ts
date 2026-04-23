// src/app/auth/callback/route.ts
// FIXES: redirect loop after OAuth sign-in / sign-up.
// Supabase sends the user here with ?code= after Google OAuth or magic link.
// This route exchanges the code for a session, then redirects to `next` (default: '/').
//
// In your Supabase dashboard → Authentication → URL Configuration:
//   Site URL:           http://localhost:3000  (prod: https://yourdomain.com)
//   Redirect URLs:      http://localhost:3000/auth/callback
//                       https://yourdomain.com/auth/callback
//
// When calling signInWithOAuth, always pass:
//   redirectTo: `${window.location.origin}/auth/callback`

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  // Auth errors from Supabase (e.g. email not confirmed)
  if (error) {
    const params = new URLSearchParams({ error, ...(errorDescription ? { error_description: errorDescription } : {}) })
    return NextResponse.redirect(`${origin}/auth/error?${params}`)
  }

  if (code) {
    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (!exchangeError) {
      // Redirect to intended destination after successful auth
      return NextResponse.redirect(`${origin}${next}`)
    }

    console.error('[auth/callback] exchangeCodeForSession error:', exchangeError.message)
  }

  // Something went wrong — redirect to error page, never loop back to /auth
  return NextResponse.redirect(`${origin}/auth/error?error=callback_failed`)
}
