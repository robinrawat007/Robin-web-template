# ui-polish-auditor

Run a full polish audit against the 10 aesthetic rules in SKILL.md before any deploy.
Check every section component and the global CSS. Output a pass/fail table.

## What to check

Scan all files in `src/components/` and `src/app/globals.css`.

For each rule below, report PASS or FAIL with the specific file + line if failing.

### Rule 1 — Section spacing
Every `<section>` must use the `.section` class OR have explicit `padding-top`/`padding-bottom` ≥ 64px on mobile and ≥ 96px on desktop.
FAIL if: any section has less padding, or padding is hardcoded below threshold.

### Rule 2 — Headline font-weight
Every `h1`, `h2`, `h3` element: `font-weight` must be ≤ 500. 
FAIL if: any heading has `fontWeight: 600`, `fontWeight: 700`, `font-semibold`, `font-bold`.

### Rule 3 — Primary CTA hover animation
Every element with a primary CTA role (booking link, main action button):
Must have `transition` property AND a hover transform (`translateY` or `scale`).
FAIL if: CTA `<a>` or `<button>` has no `onMouseEnter` handler or no `transition` in style.

### Rule 4 — Image aspect-ratio
Every `<Image fill>` must be inside a container with `aspectRatio` or `aspect-ratio` set.
FAIL if: `<Image fill>` parent has no `aspectRatio` or `aspect-ratio` style.

### Rule 5 — Contrast
No `color: var(--color-text-muted)` text on `background: var(--color-border)` backgrounds.
Check: any element with `textMuted` / `color-text-muted` has `bg-card` or `bg` background minimum.
FAIL if: muted text is placed on a border-colored background.

### Rule 6 — Max 2 fonts
Count unique font families used across all components.
FAIL if: more than 2 font families are referenced anywhere outside of `fontHeading`/`fontBody` CSS vars.

### Rule 7 — Focus states
Do NOT override `:focus-visible` outline in any component inline style.
FAIL if: `outline: none` or `outline: 0` appears anywhere except on elements with a custom visible focus style.

### Rule 8 — No horizontal scroll
Check for any element with `overflow-x: visible` on wide containers, or any element with `width` > `100vw`.
FAIL if: any potential horizontal overflow source found.

### Rule 9 — Image lazy loading
All `<Image>` components except hero: must have `loading="lazy"`.
Hero `<Image>`: must have `priority`.
FAIL if: non-hero images missing `loading="lazy"`, or hero missing `priority`.

### Rule 10 — Mobile nav
In `src/components/navbar.tsx`:
- Must have a hamburger button visible on mobile (check for `md:hidden` or equivalent)
- Mobile menu must call a close handler `onClick` on each nav link
FAIL if: no mobile menu exists, or links don't close the menu.

## Output format

Print a table:

| Rule | Status | File | Note |
|------|--------|------|------|
| 1 — Section spacing | ✅ PASS | — | |
| 2 — Headline weight | ❌ FAIL | src/components/sections/hero.tsx:42 | font-weight: 600 found |
| ... | | | |

After the table:
- If all PASS: "✅ All rules pass. Ready to deploy."
- If any FAIL: List each failure with the exact fix needed (one line per fix).
  Do NOT deploy until all rules pass.

## After running the audit

If fixes are needed, apply them immediately in the same session.
Re-run the audit after fixes to confirm all pass.
Do not ask for permission to apply fixes — just fix them.
