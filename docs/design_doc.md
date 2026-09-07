# Design Doc — Signup Wizard Replication

Companion to `master_prompt_signup_wizard.md` and `user_specification.md`.
This doc specifies visual design tokens and responsive rules.

> **Note on precision**: color/spacing values below are estimated from
> screenshots, not sampled pixel-exact. They're chosen to be internally
> consistent and buildable on a standard 4px scale (maps directly to
> Tailwind's default spacing scale). Fine-tune against the real screenshots
> with a color picker if exact-match grading matters.

## 1. Approach: Mobile-First

Build and finalize the mobile layout (base styles, no breakpoint prefix)
first, matching the reference app's phone screens exactly. Then adapt
upward:

- **Base (mobile)**: 0–767px — phone portrait, matches reference 1:1.
- **`md:` (tablet)**: 768–1023px — widen content, introduce a centered
  max-width container instead of edge-to-edge padding.
- **`lg:` (desktop)**: 1024px+ — centered card layout; the wizard should
  NOT stretch full-width on large monitors.

Tailwind breakpoint prefixes used throughout: unprefixed = mobile,
`md:` = tablet, `lg:` = desktop.

## 2. Color Tokens

| Token | Value | Usage |
|---|---|---|
| `bg-base` | `#0A0A0A` | Page background (near-black, all screens except splash) |
| `bg-surface` | `#161616` | Bottom sheet / elevated surface background |
| `border-default` | `#2E2E2E` | Input outlines, secondary button borders |
| `border-focus` | `#5A5A5A` | Input outline on focus |
| `text-primary` | `#FFFFFF` | Headlines, primary body text, filled-button labels |
| `text-secondary` | `#9CA3AF` | Helper text, placeholders, uppercase field labels |
| `text-disabled` | `#6B6B6B` | Disabled button label (on white bg) |
| `accent` | `#8B5CF6` | Emphasis words, active/selected states, links |
| `warning` | `#EAB308` | Non-format inline warnings — e.g. "username taken" (distinct from `error`, which is for format/length violations) |
| `error` | `#EF4444` | Invalid field borders, format/length error text |
| `scrim` | `rgba(0,0,0,0.6)` | Overlay behind bottom sheets |
| Splash gradient | red `#FF4D4D` → orange `#FF9142` → blue `#3B82F6` → teal `#2DD4BF` | Intro screen only, animated mesh gradient |

Buttons:
- Primary filled: `bg-white`, `text-black` (label), dims to `text-disabled`
  color on `#FFFFFF` bg when disabled — background stays white, never grey.
- Secondary outlined: `border border-default`, `text-white`, transparent
  background.

## 3. Typography

Font family: **Poppins** (Google Fonts), weights 400/500/600/700.

| Style | Size (mobile) | Size (md:+) | Weight | Line height | Usage |
|---|---|---|---|---|---|
| Display | 32px | 40px | 700 | 1.15 | Splash headline |
| H1 (step headline) | 26px | 32px | 700 | 1.25 | "Create a username...", etc. |
| Body | 15px | 16px | 400 | 1.5 | Helper paragraphs |
| Label | 12px | 13px | 500 | 1.4 | Uppercase field labels ("EMAIL", "AGE") — `letter-spacing: 0.05em` |
| Button | 15px | 16px | 600 | 1 | All button labels, uppercase |
| Caption | 13px | 13px | 400 | 1.4 | Helper text under OTP/inputs (e.g. "sent to {email}") |

## 4. Spacing Scale (4px base unit)

Use consistently instead of arbitrary values — maps to Tailwind spacing
(`space-1` = 4px, etc.):

| Token | px | Tailwind | Usage |
|---|---|---|---|
| `space-1` | 4px | `1` | Icon-to-label gaps |
| `space-2` | 8px | `2` | Tight vertical rhythm (label → input) |
| `space-3` | 12px | `3` | Input internal vertical padding |
| `space-4` | 16px | `4` | Default gap between stacked elements |
| `space-6` | 24px | `6` | Screen horizontal padding (mobile), section gaps |
| `space-8` | 32px | `8` | Gap between headline and first field |
| `space-10` | 40px | `10` | Gap above button stack from content |
| `space-12` | 48px | `12` | Screen top padding (below status bar/header) |

## 5. Layout — Screen Container

**Mobile (base)**:
- Horizontal padding: `space-6` (24px) both sides.
- Top padding: `space-12` (48px) above the wordmark/header row.
- Content is a single vertical stack, full width within the padded
  container, no max-width constraint.
- Button stack pinned toward the bottom with `space-10`+ gap above it,
  but not fixed/sticky unless content overflows (allow natural scroll).

**Tablet (`md:`)**:
- Introduce a centered container: `max-width: 600px`, `mx-auto`.
- Horizontal padding can reduce to `space-4` inside that container since
  the container itself provides the margin.
- Headline sizes step up per Section 3.

**Desktop (`lg:`)**:
- Centered container: `max-width: 480px` (narrower than tablet — a wizard
  should read as a focused card, not stretch to justify a wide monitor).
- Vertically center the card in the viewport (`min-h-screen flex
  items-center justify-center`) rather than pinning to the top.
- Optional (not required): a decorative half-screen panel or the splash
  gradient treatment on the unused side, if time allows — skip if it
  risks the core functional requirements.

## 6. Component Specs

### Buttons
- Height: 52px (mobile), 56px (md:+).
- Border radius: 16px (`rounded-2xl`) — moderately rounded, not a full
  pill.
- Full width within their container at all breakpoints (don't shrink to
  content width — matches reference).
- Gap between stacked buttons (e.g. NEXT + BACK): `space-3` (12px).

### Text Inputs
- Height: 52px (mobile), 56px (md:+).
- Border radius: 12px (`rounded-xl`).
- Border: 1px solid `border-default`, `border-focus` on focus (no color
  change on focus beyond that — keep it subtle, matches the reference's
  minimal style).
- Horizontal padding: `space-4` (16px).
- Uppercase placeholder text using `text-secondary`.
- Error state: border color → `error`, plus an inline message in `error`
  color, `space-2` (8px) below the input, at Caption size.
- **Availability-conflict state** (e.g. username taken, confirmed by user
  testing — not directly captured in a screenshot): border stays neutral
  (`border-default`), message text uses `warning` (yellow) instead of
  `error` (red), same `space-2` position below the input. This is a
  distinct visual language from a format/length violation — don't reuse
  the red error style for both cases.

### OTP Input (6-box)
- Each box: ~44px wide × 52px tall (mobile), gap `space-2` (8px) between
  boxes.
- Underline-only style (border-bottom only, no full border box) matching
  reference — `border-b-2 border-default`, `border-b-error` on invalid.

### Bottom Sheet (shared component — DOB picker, pronoun picker, account
gate)
- Background: `bg-surface`.
- Top corners: 24px radius (`rounded-t-3xl`), bottom corners square
  (flush with viewport bottom on mobile).
- Drag handle: 40px × 4px, `border-default` color, centered, `space-3`
  from top edge.
- Close (×) icon: top-right, `space-4` inset from edges.
- Scrim behind sheet: `scrim` token, covers full viewport, dismiss-on-tap
  optional (confirm against reference; default to allowing it).
- On `md:`+: cap sheet width to match the screen container's max-width
  (600px / 480px) and center it — don't let it stretch edge-to-edge on
  wide viewports.

### Progress Indicator
- Text-based label, uppercase, top-right, `text-primary`, Label-size
  weight 700 (bolder than standard labels to read as an indicator).
- Optional enhancement (not required): a subtle 2–3px progress bar under
  the header row showing step N of 6 — improves on the reference's
  text-only indicator without contradicting its style.

### Toast / Global Error Banner
- Position: top of viewport, `space-4` inset, auto-dismiss ~4s.
- Background: `bg-surface`, left border accent 3px in `error` color for
  error toasts.
- Text: Body size, `text-primary`.

## 7. Motion

- Step transitions: simple fade + slight horizontal slide (~200ms) in the
  direction of travel (forward = slide from right, back = slide from
  left) — subtle, not required by the brief but expected of a polished
  wizard.
- Bottom sheets: slide up from bottom (~250ms ease-out), scrim fades in
  concurrently.
- Button loading spinner: standard indeterminate spin, no custom easing
  needed.
- Disabled → enabled button transition: label color fade only
  (~150ms), no layout shift.

## 8. Accessibility Notes

- All interactive elements need visible focus states (the `border-focus`
  token covers inputs; buttons should get a visible outline ring on
  keyboard focus, not just on the reference's touch-only interactions).
- Error messages must be programmatically associated with their field
  (`aria-describedby`) since they carry meaning beyond the red color
  alone.
- OTP boxes should support paste-to-fill-all (common expected pattern,
  not shown in reference but a reasonable accessibility/usability
  addition).
