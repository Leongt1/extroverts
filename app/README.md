# Extroverts — signup wizard replication

A responsive web replication of the "E" party-app signup flow: intro splash →
terms → teaser feed → account gate → six-step wizard → success state →
authenticated feed.

Front-end only. Every network call is simulated with realistic latency
(600–1500 ms) and a failure rate, so loading, error and retry states are real
paths through the UI rather than decoration.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm test         # unit tests (age maths, validation schemas)
npm run lint
```

Demo shortcuts: the OTP screen accepts `123456` (shown on screen); the
usernames `partyking`, `rahulxkumar`, `extrovert`, `admin` and `thehost` are
treated as taken.

## Stack

| Concern | Choice |
|---|---|
| UI | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS v4, design tokens in `src/styles/index.css` |
| Wizard state | Zustand (`src/store/wizardStore.ts`) |
| Per-step validation | React Hook Form + Zod (`src/lib/validation.ts`) |
| Async simulation | React Query mutations over `src/lib/api/` |
| Global errors | sonner toasts |
| Fonts | Poppins (UI) + Playfair Display (the serif wordmark) |

**State boundary**: RHF + Zod own in-progress input and validation for one
step. Only validated values are committed to Zustand, which holds the
collected profile and `furthestStep`. Going back re-seeds each form's
`defaultValues` from the store, so no data is lost.

## Structure

```
src/
  wizard/          steps.ts (routes + order), routes.tsx, useStepNavigation.ts
  store/           wizardStore.ts — committed values, progress, auth flag
  lib/
    api/           client.ts (latency + failure simulator), signup.ts (endpoints)
    utils/         date.ts (age maths), cn.ts
    validation.ts  Zod schemas and the shared field limits
  hooks/           useApiMutation (toast-on-failure policy), useCountdown,
                   useScrollLock, useSessionFlag
  components/
    ui/            Button, Field (TextField + SelectField), Checkbox,
                   OtpInput, BottomSheet, Wordmark, Spinner, icons
    layout/        Screen (responsive shell), WizardScreen (step transition)
    wizard/        WizardHeader, InfoStep (the steps 2–5 template), StepGuard,
                   DateOfBirthSheet, PronounSheet, ConfirmSheet
    feed/          FeedHeader, ClubCard, EventCard, EventFlyer, BottomNav,
                   AccountGateSheet
  pages/           SplashPage, TermsPage, FeedPage, signup/*
```

Three ideas carry most of the reuse:

- **`InfoStep`** — the shared template behind username, name, age, pronouns and
  invite. Each page supplies a headline, one field and a submit handler.
- **`BottomSheet`** — one sheet component for the account gate, the DOB picker,
  the pronoun picker, the full terms and the name confirmation. It owns
  Escape-to-close, scrim dismissal, scroll lock and focus containment.
- **`StepGuard`** — one guard, applied from the route table, comparing the
  route's step index against `furthestStep`. Pasting `/signup/pronouns` before
  finishing the earlier steps redirects to where you actually are.

## Responsive behaviour

Mobile-first (matches the reference 1:1), then a centred 600 px column at
`md:`, and at `lg:` a focused 480 px card that is vertically centred and
scrolls internally — the wizard never stretches across a wide monitor. Bottom
sheets cap to the same widths instead of going edge-to-edge.

## Fixes and improvements over the reference app

1. **Resend OTP cooldown** — the reference has a bare, spammable text link.
   Now a 30 s countdown that disables the control and says when it returns.
2. **Real invalid-OTP state** — the reference shows nothing. Now the boxes
   shake, the underlines turn red, and an inline message explains it. A wrong
   code is treated as a *result* (inline), a dropped request as a *failure*
   (toast) — one error surface per situation.
3. **Shared header layout bug** — in the reference a stray "BACK" label sits
   behind "GETTING READY" and renders clipped on all four info steps. That was
   one broken shared component, not four broken screens: `WizardHeader` is a
   plain two-column row and back navigation lives in the button stack.
4. **Confirmation before an irreversible field** — the name step says it can
   never be changed, then commits silently. Now a confirm sheet quotes the name
   back before locking it in.
5. **Under-18 is explained** — the reference disables NEXT with no reason. The
   block stays; the message is new, and it quotes the entered date and the
   computed age.
6. **Explicit success state** — the reference redirects silently after SIGN UP.
   Now a success toast plus a "You're in!" screen before entering the feed.
7. **Pronoun limit is communicated** — the max-3 rule (a good piece of the
   original design, kept as is) now says why the remaining boxes went quiet.
8. Accessibility: labelled fields with `aria-describedby` error wiring, visible
   focus rings, OTP paste-to-fill and arrow-key navigation, sheets as real
   dialogs with focus trapping, and `prefers-reduced-motion` support.

Noted but deliberately not "fixed": the teaser feed's sample data (Silver /
160 tokens for a brand-new account) is reproduced as placeholder content, per
the brief.

## Scope notes

- The feed is a **static visual placeholder** in both states. Only JOIN is
  interactive pre-auth; the nav bar, bell and star are decoration.
- The event flyer is drawn in CSS rather than shipped as stock imagery.
- Progress is session-scoped: `sessionStorage` remembers that the splash and
  terms were seen, wizard data lives in memory only. Nothing implies a real
  account.
