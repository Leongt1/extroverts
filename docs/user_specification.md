# User Specification — Signup Wizard Replication

Companion to `master_prompt_signup_wizard.md`. This doc specifies *what*
the product must do, screen by screen, independent of visual styling
(covered separately in `design_doc.md`).

## 1. User Goal

A new visitor discovers the app via a teaser feed, decides to sign up,
verifies their email, provides profile details across a guided wizard,
and reaches a fully-created account — with clear feedback at every step
about what's valid, what's wrong, and what's happening.

## 2. Flow Overview

```
Intro splash → Terms & Conditions → Teaser feed (unauthenticated)
   → [user attempts a gated action] → Account-required sheet
      → GET STARTED → Step 1: Email → Step 1b: OTP verify
      → Step 2: Username → Step 3: Display name → Step 4: Age (DOB)
      → Step 5: Pronouns → Step 6: Invite code (optional) + Sign Up
      → Success state → Authenticated home feed
```

Any step's BACK button returns to the previous step with that step's
previously entered value still populated (no data loss on back nav).

## 3. Screen-by-Screen Specification

### 3.1 Intro Splash
- **Trigger**: app/site first load.
- **Content**: wordmark, headline, playful warning subhead, single
  CONTINUE action.
- **Action**: CONTINUE → Terms & Conditions.
- **No validation** (static screen).

### 3.2 Terms & Conditions
- **Precondition**: came from splash.
- **Content**: T&C summary copy, link to full terms, ACCEPT action.
- **Rule**: ACCEPT is the only way to proceed; there is no explicit
  reject/decline button in the reference (implicit decline = leave/close).
- **Action**: ACCEPT → Teaser feed.

### 3.3 Teaser Feed (unauthenticated) — PLACEHOLDER SCOPE
- **Purpose**: a static visual placeholder matching the reference
  screenshot's layout (club tier bar, token count, event card) — not a
  functional feed. Scrolling multiple posts, real nav-bar destinations,
  and icon behaviors (bell, star) are out of scope for this build.
- **Only interactive element**: the JOIN button on the event card, which
  triggers the Account-Required sheet.
- **Non-gated interaction**: "MAYBE LATER" dismisses the sheet and returns
  to the static placeholder feed — no forced signup.

### 3.4 Account-Required Sheet
- **Trigger**: any gated interaction on the teaser feed.
- **Content**: headline "YOU NEED AN ACCOUNT", value-prop body copy, two
  actions.
- **Actions**:
  - GET STARTED → enters wizard at Step 1 (Email).
  - MAYBE LATER → dismiss, return to teaser feed, no state change.

### 3.5 Step 1a — Email Entry
- **Field**: Email (required).
- **Validation**:
  - Required, non-empty, non-whitespace-only.
  - Must match a valid email format, validated in real time (on blur
    and/or on change).
  - Inline error shown beneath the field on invalid format.
- **Secondary control**: "Subscribe to newsletter" checkbox — optional,
  unchecked by default, no validation.
- **Action**: PROCEED — disabled until email is valid. On submit,
  simulate an OTP-send async call (loading state on button) → Step 1b.
- **Failure case**: simulate an occasional OTP-send failure → show a
  global error toast/banner, keep user on this screen, do not advance.

### 3.6 Step 1b — OTP Verification
- **Field**: 6-digit numeric OTP, one digit per box.
- **Validation**:
  - Numeric only, exactly 6 digits before VERIFY is enabled.
  - On incorrect code: inline error state on the OTP boxes (not just a
    toast) — "Incorrect code, try again" or similar, boxes clear or
    highlight red.
- **Resend**: "Resend OTP" control.
  - **Requirement (fix over reference)**: must have a cooldown/timer
    (e.g. 30–60s) after each send; control disabled and shows countdown
    during cooldown, re-enabled after.
- **Actions**:
  - VERIFY — disabled until 6 digits entered; on success, advance to
    Step 2. On simulated failure, show inline invalid-code error, stay
    on screen.
  - GO BACK — returns to Step 1a, email value retained.
- **Helper text**: confirms destination email ("A 6-digit OTP has been
  sent to {email}").

### 3.7 Step 2 — Username
- **Field**: Username (required).
- **Validation**:
  - Required, minimum length enforced (e.g. 3 characters) and maximum
    length enforced (e.g. 20 characters) before NEXT enables.
  - **Length error message** (red, standard format-error style): must
    state the actual limit, e.g. "Username must be 3–20 characters" — not
    a generic "invalid" message.
  - Reject whitespace-only input.
  - **Username-taken check** (simulated): on blur or on NEXT attempt,
    simulate an async availability check (React Query mutation with
    artificial delay) against a small hardcoded list of "taken" usernames
    for demo purposes. If taken, show "This username is already taken" (or
    similar) directly below the field in **yellow/warning** styling — this
    is visually distinct from the red length-error style; see `design_doc.md`
    Section 6 for the exact token. NEXT stays disabled until resolved.
- **Actions**: NEXT (disabled until valid AND available) / BACK.

### 3.8 Step 3 — Display Name
- **Field**: Name (required).
- **Validation**: required, non-whitespace-only, reasonable max length.
- **Special rule**: helper text states this name **cannot be changed
  later**.
  - **Requirement (fix over reference)**: before committing this field
    (on NEXT), show a confirmation dialog ("Are you sure? This can't be
    changed.") with Confirm / Cancel. Only advance on Confirm.
- **Actions**: NEXT (disabled until valid, gated by confirmation) / BACK.

### 3.9 Step 4 — Age (via Date of Birth)
- **Field**: Age, populated only via a Date of Birth picker (day/month/
  year), never freely typed.
- **Validation**:
  - DOB picker: each of day/month/year validated independently; an
    invalid value in any one turns that specific input red inline.
  - A complete, valid DOB computes an age value, which populates the
    Age field (read-only).
  - **Under-18 rule**: if computed age < 18, NEXT remains disabled AND an
    inline message must explain why ("You must be 18 or older to
    continue" or similar) — this explanation is a fix over the
    reference, which disables NEXT with no explanation.
  - **Worked test case** (confirmed): entering DOB `28/04/2015` on a
    system date in September 2026 must compute age = **11** (birthday
    already passed this year: 2026 − 2015 = 11) and populate the AGE
    field with `11`, with NEXT disabled and the explanatory message shown.
    Use this as a concrete unit-test case for the age-calculation logic.
- **Actions**: NEXT (disabled until a valid 18+ DOB is set) / BACK.

### 3.10 Step 5 — Pronouns
- **Field**: Pronouns, selected via a checkbox-list bottom sheet.
- **Validation/Rules**:
  - Selection limit: up to 3 pronouns. Once 3 are selected, remaining
    checkboxes are disabled (not silently ignored) until the user
    deselects one.
  - A "Did we miss anything?" affordance allows a custom free-text entry
    in addition to/instead of the checkbox list (confirm exact behavior
    against the app; if it reveals a text input, that input has no
    special validation beyond standard text constraints).
  - Selected pronouns render back in the main field as plain,
    comma-joined text.
- **Actions**: NEXT (disabled until at least one pronoun/custom entry is
  selected — confirm this minimum against the reference) / BACK.

### 3.11 Step 6 — Invite Code + Sign Up
- **Field**: Invite code (optional, no format validation beyond basic
  whitespace trimming).
- **Action**: SIGN UP — always enabled (invite code is optional). Submits
  the full collected wizard state as a single simulated signup mutation.
  - **Loading**: button shows spinner, disabled, prevents duplicate
    submits.
  - **Failure**: simulate an occasional failure → global error toast,
    remain on this screen, allow retry.
  - **Success**: proceed to Section 3.12.
- **Actions**: BACK also available, returns to Step 5.

### 3.12 Success State (new — not present in reference)
- **Requirement (fix over reference)**: on successful signup, show an
  explicit success state (toast, checkmark animation, or a brief
  "You're in!" interstitial) before redirecting to the authenticated
  home experience. The reference app redirects silently; this is a
  required improvement per the assessment brief's success-feedback
  requirement.

## 4. Cross-Cutting Rules

- **No skipping ahead**: a step cannot be reached via direct navigation
  (e.g. URL) until all prior steps are validly completed.
- **Back preserves data**: navigating back to any prior step must show
  that step's previously entered value, not a blank field.
- **One error surface per situation**: field-level errors are always
  inline beneath/within the field; submission-level failures use a
  global toast/banner. Don't use both for the same error.
- **Loading states never allow double-submit**: any in-flight action
  disables its triggering button until resolved.
- **Session boundary**: the entire wizard is client-side/simulated state
  only — refreshing the page may reasonably reset progress (no
  requirement to persist across reloads for this assessment).

## 5. Explicit Fixes Over the Reference App (Summary)

These are required improvements, not optional polish — call them out in
your submission:

1. OTP resend gets a cooldown/timer (was: unrestricted text link).
2. OTP entry gets a real invalid-code inline error state (was: none
   visible).
3. Display name gets a confirmation step before it's locked in (was:
   none, despite being stated as unchangeable).
4. Under-18 block gets an explanatory inline message (was: silent
   disabled button with no explanation).
5. Successful signup gets an explicit success state (was: silent
   redirect).
6. (Component-level, not user-facing) the shared step header's layout
   bug (BACK clipping behind the progress label) is fixed at the
   component level.
