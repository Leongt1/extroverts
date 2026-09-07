import { create } from 'zustand'

type WizardData = {
  email: string
  newsletterOptIn: boolean
}

type WizardState = WizardData & {
  setEmail: (email: string, newsletterOptIn: boolean) => void
}

export const useWizardStore = create<WizardState>((set) => ({
  email: '',
  newsletterOptIn: false,
  setEmail: (email, newsletterOptIn) => set({ email, newsletterOptIn }),
}))
