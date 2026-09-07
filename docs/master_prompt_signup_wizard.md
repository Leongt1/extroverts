# Master Prompt — Signup Wizard Replication (Frontend Assessment)

> Paste this as the first message to your AI coding assistant.
> All screens have now been captured from the reference app ("E" / party-social app,
> internal name unknown) — this version has concrete details for every step.

---

## 1. Context & Goal

Replicate the signup flow of a reference mobile app as a **responsive web
application**. This is a technical assessment. Priorities, in order:

1. Functional correctness of validation, state handling, and error/loading UX.
2. Visual fidelity to the reference app (typography, spacing, color, component behavior).
3. Identifying and fixing real UX/bugs found in the reference while keeping the
   overall experience consistent (see Section 8 — the full list of issues found).

**Front-end only** — no real backend. All async operations (OTP send/verify,
username/name availability, final submission) simulated with realistic
artificial latency (600–1500ms) and occasional simulated failure paths so
loading/error states are actually exercised.

## 2. Tech Stack

- **React + TypeScript** (Vite), **Tailwind CSS**
- **Zustand** — wizard-level state: current step index, collected form data
  across all steps, navigation history (so "back" repopulates prior values).
- **React Query** — simulated async mutations (OTP send/verify, step
  submissions, final signup) — pure async/loading/error-state simulator.
- **React Hook Form + Zod** — per-step field validation (real-time,
  on-blur/on-change, schema-driven). Zustand only stores already-validated
  committed values; RHF+Zod owns validation.
- A toast library (sonner / react-hot-toast) for global error banners.
- **Google Fonts — Poppins** throughout.

Boundary: RHF+Zod validates & commits a step → push into Zustand store →
advance step index. Going back repopulates RHF defaultValues from the store.

## 3. Visual Design Tokens

- Wordmark: serif "E" with a small superscript dot, white
- Palette: pure/near-black backgrounds (~#0a0a0a) everywhere except the
  intro splash; single violet/purple accent (~#7c3aed range) used sparingly
  for emphasis words in copy
- Typography: bold, uppercase-heavy headlines and buttons; Poppins Bold/
  SemiBold as the substitute
- Buttons: full-width, rounded-rectangle/pill.
  - Primary = filled white bg, black uppercase label
  - Secondary = outlined white border, transparent fill, white uppercase label
  - Disabled = same filled-white shape, but label text dimmed to grey (never
    hide/collapse the button — mute the label only)
- Modals: bottom sheet pattern — dark surface one shade off background,
  rounded top corners, drag-handle bar, × close icon top-right, dimmed scrim
  over the page behind it. **Reuse ONE BottomSheet component** for: the
  "you need an account" gate, the DOB picker, and the pronoun picker.
- Copy tone: playful/cheeky throughout ("Warning: Entering may lead to
  spontaneous dancing...") — preserve this tone rather than genericizing it.

## 4. App Structure / Screens (in order)

### 4.1 Intro splash
Full-bleed animated gradient mesh background (red/orange/blue/teal) with a
dark mountain silhouette across the lower third. Centered wordmark, bold
headline + subhead, playful warning copy, single CONTINUE button.

### 4.2 Terms & Conditions
Black background, wordmark top-left, bold uppercase paragraph of T&C copy
with the accent color on a couple of key words, "To proceed, accept Terms
and Conditions" helper line with an inline T&C link, ACCEPT button.

### 4.3 Landing / teaser feed (pre-auth) — PLACEHOLDER SCOPE
Build this as a static visual placeholder matching the reference
screenshot's outline — not a functional feed. Replicate the visual
structure (club tier badge/progress bar, token count line, image card,
event details block with JOIN button) with placeholder/sample content,
but do NOT build feed logic (scrolling multiple posts, real nav-bar
destinations, bell/star icon behavior, etc.) — that's out of scope for
this assessment.

**The only interactive element on this screen is the JOIN button**, which
triggers the account-gate bottom sheet (unchanged):
- Headline "YOU NEED AN ACCOUNT", body copy explaining the value prop,
  primary button "GET STARTED" (→ enters wizard), secondary outlined button
  "MAYBE LATER" (dismiss, stay on teaser feed)
- Background feed is dimmed/scrimmed but still visible behind the sheet

Everything else on this screen (icons, other feed content, nav bar if
included) is static decoration — no click handlers, no real navigation.
Note: the reference screenshot's sample numbers ("Silver Club Member",
"160 tokens") don't match a real new user's actual starting state — just
reproduce them as-is for the placeholder, no need to reconcile.

### 4.4 Step 1 — Email + OTP verification
**Email screen**: wordmark, bold headline "Enter your email", single
outlined text input (uppercase placeholder "EMAIL"), full-width PROCEED
button, unchecked newsletter-opt-in checkbox below.

**OTP screen**: wordmark centered, "ENTER OTP" label, 6 separate
underline-style numeric boxes (dot placeholder), "Resend OTP" as a bare
text link, VERIFY (primary) + GO BACK (secondary) buttons, helper text
confirming destination ("A 6-digit OTP has been sent to {email}").

### 4.5 Step 2 — Username
Shared "info step" template used for steps 2–5 (see Section 5 for the
template + its bug). Headline "Create a username that fits your vibe!",
single outlined USERNAME input, helper copy explaining stakes, NEXT
(disabled/dimmed until filled) + BACK buttons.

**Validation (confirmed by direct testing)**:
- Enforce min/max character limits (e.g. 3–20); the inline error message
  must state the actual limit ("Username must be 3–20 characters"), not a
  generic message — this is a real red/`error`-styled inline error.
- Simulate a "username taken" availability check (React Query mutation,
  artificial delay, check against a small hardcoded taken-list). If taken,
  show the message in **yellow/`warning`** styling below the field —
  visually distinct from the red length-error style. See `design_doc.md`
  Section 2/6 for exact tokens. NEXT stays disabled until the name is both
  valid-length AND available.

### 4.6 Step 3 — Display name
Same template. Headline in quotes: "Name, please, for the party check!",
NAME input, helper text explicitly states **"Cannot be changed later."**
with no confirmation step before NEXT locks it in.

### 4.7 Step 4 — Age (via Date of Birth)
Same template. Headline "How many years have you been partying?", field
labeled AGE but tapping it opens a bottom-sheet **Date of Birth picker**
(DD / MM / YYYY inputs + PROCEED). On proceed, DOB is converted to a
computed age number and populates the AGE field as plain text (e.g. "20").

**Confirmed reference-app behavior** (tested directly):
- An invalid day/month/year value turns that specific input box red
  (per-field inline error, not a banner) — replicate this exact pattern.
- If computed age is under 18, the reference app DOES block progression —
  but only by silently leaving NEXT disabled, with **no message explaining
  why**. This is the real gap the assessment brief names ("age less than 18
  is not prompted") — the logic exists, the communication doesn't.

Your build MUST:
- Compute age from DOB, not accept a freely-typed override; keep the AGE
  display field read-only (populated only via the DOB picker)
- Per-field red-border validation on the DOB sheet for invalid day/month/year
- On under-18: still disable NEXT, but ADD a clear inline message explaining
  the restriction (this communication fix is the deliverable — not
  inventing a gate that didn't exist)
- **Worked test case**: DOB `28/04/2015` on a system date in September
  2026 → computed age = **11**, AGE field shows `11`, NEXT disabled, and
  the explanatory message shown. Use this as the concrete check that your
  age-calculation logic is correct (year difference, adjusted for whether
  the birthday has occurred yet this year).

### 4.8 Step 5 — Pronouns
Same template. Headline "Which pronouns feel right for you?", PRONOUNS
input opens a bottom sheet: "SELECT PRONOUNS", "Select upto 3" subhead,
checkbox list (he, him, his, she, her, hers, they, them, theirs, ze, zir,
zirs, ve, ver, vis), PROCEED button, and a "Did we miss anything?" free-text
affordance for custom entries. Enforce the max-3 selection by disabling
remaining checkboxes once 3 are picked (don't silently no-op the 4th tap).
Selected values render back in the main field as comma-joined plain text.

### 4.9 Step 6 — Invite code + final signup
Departs from the shared template (no header bug here — confirms the bug is
scoped to that one component). Stylized marketing-copy block with
alternating white/accent-colored emphasis words, then an optional "ENTER
INVITE CODE" field with an incentive line, then SIGN UP (primary) + BACK
(secondary). This submits the whole wizard.

### 4.10 Success / completion
The reference app does not show a distinct success screen — it silently
redirects to the (now-authenticated) home feed after SIGN UP. Per the
brief's explicit requirement for clear success feedback, **add one**: a
brief success toast, checkmark animation, or interstitial before landing
the user on a simple "You're in!" completion screen.

## 5. Shared "Info Step" Template (Steps 2–5)

Common layout: wordmark top-left, step-progress label top-right ("GETTING
READY" — text-based progress indicator, not numeric), a "BACK" element
positioned directly behind/under the header row, bold multi-line headline,
single labeled input, helper paragraph, then NEXT (disabled/dimmed until
valid) + BACK (always enabled, outlined) stacked at the bottom.

**Known bug in the reference app, confirmed across all 4 of these
screens**: the "BACK" text element z-index/positions incorrectly, causing
it to render clipped and overlapping the "GETTING READY" label at the top.
This is a genuine layout defect (not a design choice) — build the shared
header component once, correctly, and note in your submission that you
identified this as a systemic bug in one shared component rather than a
per-screen issue.

## 6. Validation & Error Handling Requirements

- Real-time validation on blur/change: email format, required fields,
  character/length limits, numeric-only (OTP, age/DOB digits), reject
  whitespace-only input.
- Confirmed pattern: NEXT stays disabled (dimmed label) until each step's
  minimum length/required-field condition is met — applies to username,
  name, and any other required text field.
- Confirmed pattern: on the DOB sheet, an invalid day/month/year value
  turns that specific box red — per-field inline error, not a banner.
- Inline contextual error messages beneath each field.
- Global toast/banner for failed submissions — distinct from inline errors.
- Age gate per Section 4.7 — the fix here is adding an explanatory message,
  not the block itself (which already exists in the reference app). Make
  this the most visibly polished, clearly-explained fix in your walkthrough.
- Irreversible-field confirmation: add a lightweight "Are you sure? This
  can't be changed" dialog before locking in the display name (Section 4.6).

## 7. Loading & Submission States

- Buttons show a spinner and disable during any in-flight mutation; prevent
  duplicate submits.
- OTP screen improvements (see Section 8) — add resend cooldown/timer and a
  real invalid-code error state, since the reference has neither.

## 8. Full UX-Issues List (for submission notes)

Call these out explicitly in your recording/notes — they're your evidence
of critical evaluation, not just replication:

1. **Resend OTP has no cooldown/timer** — bare text link, could be spammed.
   Fix: countdown timer, disable until expired.
2. **No invalid-OTP error state visible** — design one (shake + red
   underline + inline message).
3. **Shared header layout bug** — "BACK" text clips behind "GETTING READY"
   across steps 2–5 (Section 5). Fixed once at the component level.
4. **No confirmation before locking an irreversible field** (display name,
   Section 4.6) — add a confirm dialog.
5. **Under-18 block exists but is never explained** (Section 4.7) — NEXT
   silently disables with no message. This is the exact gap the assessment
   brief names. Fix: add a clear inline explanation, don't just re-invent
   the block that's already there.
6. **No visible success state after final signup** (Section 4.10) — silent
   redirect. Add a completion screen/toast.
7. **Teaser feed shows sample data inconsistent with a real new account's
   starting state** (Silver/160 tokens vs. actual Bronze/0) — note only;
   just use clearly-fake placeholder data in your build, don't need to fix.

Also worth noting as a **positive** observation (shows balanced evaluation,
not just fault-finding): the pronoun picker's max-3 selection limit and
"Did we miss anything?" custom-entry affordance are well-designed and
should be replicated faithfully as-is.

## 9. Responsive Design

Fully usable and visually correct at mobile (~375px), tablet (~768px), and
desktop (~1280px+). Wizard content, progress label, bottom sheets, and
nav controls must all adapt cleanly, not just reflow.

## 10. Deliverables

- Clean, readable component structure (may need to explain code in a
  follow-up technical discussion).
- Working local dev setup covering: full wizard flow, errors, validation,
  loading states, back navigation with data retention, and the new success
  state — this is what you'll screen-record for submission.

## 11. Routing & Navigation

### 11.1 Route Table (React Router)

| Path | Screen | Guard |
|---|---|---|
| `/` | Splash — redirects to `/terms` or `/feed` if already seen this session | none |
| `/terms` | Terms & Conditions | none |
| `/feed` | Teaser feed (or authenticated home, depending on auth state) | none |
| `/signup/email` | Step 1a | none (wizard entry point) |
| `/signup/verify` | Step 1b (OTP) | requires email submitted in store |
| `/signup/username` | Step 2 | requires OTP verified |
| `/signup/name` | Step 3 | requires username committed |
| `/signup/age` | Step 4 | requires name committed |
| `/signup/pronouns` | Step 5 | requires valid 18+ age committed |
| `/signup/invite` | Step 6 | requires pronouns committed |
| `/signup/success` | Success state | requires signup mutation succeeded |

Route names above are a reasonable default — rename freely if you prefer a
different convention, the guard mechanism (11.2) doesn't depend on the
exact paths.

### 11.2 Guard Mechanism

Keep a single `furthestStepReached: number` in the Zustand store alongside
the per-step data. Every wizard route wraps in one `<StepGuard
requiredStep={n}>` component: if `n > furthestStepReached + 1`, redirect
to whatever route corresponds to `furthestStepReached`. This is what
prevents typing `/signup/pronouns` directly into the URL bar before
completing earlier steps — one guard component, reused across all six
wizard routes, not per-screen logic.

### 11.3 Splash / T&C Persistence

No real backend, so use `sessionStorage` flags (`hasSeenSplash`,
`hasAcceptedTerms`) so a page refresh mid-wizard doesn't force the user
back through the intro screens every time. Resets on a fresh tab/session —
acceptable for a front-end-only assessment; do not use `localStorage` or
imply persistent account state.

### 11.4 Account-Gate Sheet Is Not a Route

The "you need an account" sheet (Section 4.3–4.4) is UI state
(`isAccountGateOpen: boolean`) layered on top of whichever route the
teaser feed is on — it is not a page transition and should not appear in
the router at all. "Get started" navigates to `/signup/email`; "Maybe
later" just closes the sheet, no navigation occurs.

### 11.5 Full Navigation Diagram (for reference)

```
Splash → Terms & Conditions → Teaser feed
                                   │
                         [gated action tapped]
                                   ▼
                            Account gate ──(Maybe later)──▶ back to Teaser feed
                                   │
                            (Get started)
                                   ▼
   Step 1: Email + OTP → Step 2: Username → Step 3: Display name
        → Step 4: Age (DOB) → Step 5: Pronouns → Step 6: Invite + Sign up
                                   ▼
                            Success state (new)
                                   ▼
                          Authenticated home
```

Note: follow clean coding patterns with reusable components and folder structure.
and also search the web for any info you are not sure of in working a library