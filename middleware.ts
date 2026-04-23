// middleware.ts  (root of project, same level as package.json)
// FIXES: OTP / magic link not advancing to next page after entering code.
// This middleware refreshes the Supabase session on EVERY request so the
// auth cookie stays valid. Without this, session tokens expire mid-flow
// and the user gets stuck on the OTP screen.
//
// HOW OTP FLOW WORKS (with this middleware):
// 1. User enters email → supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } })
// 2. User gets email → clicks link → lands on /auth/callback?code=xxx
// 3. /auth/callback exchanges code → sets session cookie
// 4. Middleware refreshes session on next page load → user is authenticated
//
// If you're using a custom OTP input (6-digit code), call:
//   supabase.auth.verifyOtp({ email, token: otp, type: 'email' })
// Then redirect manually: router.push('/dashboard') after the call resolves.

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Write to request first
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          // Then write to response
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: must call getUser() here to refresh session.
  // Do NOT use getSession() — it reads from cookie without server validation.
  await supabase.auth.getUser()

  return supabaseResponse
}

export const config = {
  matcher: [
    // Run on all routes except static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
