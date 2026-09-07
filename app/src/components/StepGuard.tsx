import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useWizardStore } from '../store/wizardStore'

type StepGuardProps = { requiredStep: number; children: ReactNode }

export function StepGuard({ requiredStep, children }: StepGuardProps) {
  const { furthestStepReached, email, otpVerified, age, pronouns, signupSucceeded } = useWizardStore()
  const canEnter = (requiredStep === 2 && Boolean(email)) || (requiredStep === 3 && otpVerified) || (requiredStep === 4 && furthestStepReached >= 3) || (requiredStep === 5 && furthestStepReached >= 4) || (requiredStep === 6 && furthestStepReached >= 5 && Boolean(age && age >= 18)) || (requiredStep === 7 && furthestStepReached >= 5 && pronouns.length > 0) || (requiredStep === 8 && signupSucceeded)

  if (!canEnter) {
    const fallback = furthestStepReached >= 5 ? '/signup/pronouns' : furthestStepReached >= 4 ? '/signup/age' : furthestStepReached >= 3 ? '/signup/name' : furthestStepReached >= 2 ? '/signup/username' : furthestStepReached >= 1 ? '/signup/verify' : '/signup/email'
    return <Navigate replace to={fallback} />
  }

  return children
}
