import { create } from 'zustand'

export type WizardData = {
  email: string
  newsletterOptIn: boolean
  username: string
  displayName: string
  dateOfBirth: string
  age: number | null
  pronouns: string[]
  customPronoun: string
  inviteCode: string
}

type WizardState = WizardData & {
  furthestStepReached: number
  otpVerified: boolean
  signupSucceeded: boolean
  setEmail: (email: string, newsletterOptIn: boolean) => void
  setStepData: <K extends keyof WizardData>(key: K, value: WizardData[K]) => void
  markStepReached: (step: number) => void
  setOtpVerified: () => void
  setSignupSucceeded: () => void
}

const initialData: WizardData = {
  email: '', newsletterOptIn: false, username: '', displayName: '', dateOfBirth: '', age: null,
  pronouns: [], customPronoun: '', inviteCode: '',
}

export const useWizardStore = create<WizardState>((set) => ({
  ...initialData,
  furthestStepReached: 0,
  otpVerified: false,
  signupSucceeded: false,
  setEmail: (email, newsletterOptIn) => set({ email, newsletterOptIn }),
  setStepData: (key, value) => set({ [key]: value }),
  markStepReached: (step) => set((state) => ({ furthestStepReached: Math.max(state.furthestStepReached, step) })),
  setOtpVerified: () => set({ otpVerified: true, furthestStepReached: 2 }),
  setSignupSucceeded: () => set({ signupSucceeded: true }),
}))
