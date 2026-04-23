## ── APPEND THIS TO YOUR EXISTING CLAUDE.md ──────────────────────────────────

## Website Factory

This repo is a client website factory. Read SKILL.md before any build task.
SKILL.md is the single source of truth for: content.json schema, section props,
aesthetic rules, runbooks, and what NOT to touch.

**The only files that change per client:** `content.json` + `/public/` images.
Everything else is the factory. Don't touch the factory for client-specific needs.

## New dependencies added in Step 01

```bash
pnpm add zod @supabase/supabase-js @supabase/ssr
```

Run this before starting any build if the lockfile doesn't have these.

## Auth — quick reference

Full runbook in SKILL.md under "Runbook: Supabase auth".

TL;DR of what was breaking and why it's fixed:
- **Redirect loop:** was missing `/src/app/auth/callback/route.ts`. Now exists. Always use
  `redirectTo: ${origin}/auth/callback` in signInWithOAuth calls.
- **OTP stuck:** was missing `type: 'email'` in verifyOtp call + no manual router.push after.
  Now: `verifyOtp({ email, token, type: 'email' })` → `router.push('/dashboard')`.
- **Session not refreshing:** fixed by `middleware.ts` calling `supabase.auth.getUser()` on every request.

Never use `supabase.auth.getSession()` on the server. Always `getUser()`.

## Per-client build prompt (150 tokens)

Once SKILL.md + content.json are in place, this is the entire prompt needed:

```
Read SKILL.md. Client [slug] — content.json is already filled.
Build the full site. Use the [industry] variant aesthetic.
Run ui-polish-auditor when done and fix any fails before reporting complete.
```

That's it. No re-explaining the stack, the rules, or the schema.

## Section order

Controlled by `content.sections` array order. Don't hardcode section order in page.tsx.
Reordering = move objects in content.json. Zero code change.

## Adding a new industry variant

1. Create a filled `content.json` for a real client in that industry
2. Note any section types missing from the current 13 — add them via the "add section" runbook in SKILL.md
3. There is no separate variant system — the content.json IS the variant
