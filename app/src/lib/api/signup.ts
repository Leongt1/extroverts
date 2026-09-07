import { simulate } from './client'
import type { WizardValues } from '../../store/wizardStore'

/** Usernames the fake directory already has, for the availability check. */
const TAKEN_USERNAMES = ['partyking', 'rahulxkumar', 'extrovert', 'admin', 'thehost']

/** The only code the simulated verifier accepts. Surfaced in the UI as a demo hint. */
export const DEMO_OTP = '123456'

export function sendOtp(email: string) {
  return simulate({ email, sentAt: Date.now() }, {
    failureRate: 0.15,
    errorMessage: "We couldn't send your code. Please try again.",
  })
}

export function verifyOtp(code: string) {
  // A wrong code is a *result*, not a failure: it belongs inline on the field.
  // A dropped request is a failure: it belongs in the global toast.
  return simulate(() => ({ verified: code === DEMO_OTP }), {
    failureRate: 0.08,
    errorMessage: "We couldn't reach the verifier. Please try again.",
  })
}

export function checkUsernameAvailability(username: string) {
  return simulate(() => ({
    username,
    available: !TAKEN_USERNAMES.includes(username.trim().toLowerCase()),
  }))
}

export function submitSignup(values: WizardValues) {
  return simulate(() => ({ id: `usr_${Date.now().toString(36)}`, username: values.username }), {
    failureRate: 0.2,
    errorMessage: "Sign up didn't go through. Please try again.",
  })
}
