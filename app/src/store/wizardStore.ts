import { create } from 'zustand'
import { STEP, type StepIndex } from '../wizard/steps'

/** Values collected across the wizard. Only validated data is committed here. */
export type WizardValues = {
  email: string
  newsletterOptIn: boolean
  username: string
  displayName: string
  /** DD/MM/YYYY, set only through the date-of-birth picker. */
  dateOfBirth: string
  age: number | null
  pronouns: string[]
  customPronoun: string
  inviteCode: string
}

type WizardState = {
  values: WizardValues
  /** Highest step the user is allowed to open; drives <StepGuard>. */
  furthestStep: StepIndex
  isAuthenticated: boolean
  /** Commits a step's validated values and unlocks the next step. */
  completeStep: (step: StepIndex, values?: Partial<WizardValues>) => void
  /** Stores values without changing progress (e.g. a field edited in place). */
  setValues: (values: Partial<WizardValues>) => void
  finishSignup: () => void
  reset: () => void
}

const emptyValues: WizardValues = {
  email: '',
  newsletterOptIn: false,
  username: '',
  displayName: '',
  dateOfBirth: '',
  age: null,
  pronouns: [],
  customPronoun: '',
  inviteCode: '',
}

export const useWizardStore = create<WizardState>((set) => ({
  values: emptyValues,
  furthestStep: STEP.email,
  isAuthenticated: false,
  completeStep: (step, values) =>
    set((state) => ({
      values: values ? { ...state.values, ...values } : state.values,
      furthestStep: Math.max(state.furthestStep, step + 1) as StepIndex,
    })),
  setValues: (values) => set((state) => ({ values: { ...state.values, ...values } })),
  finishSignup: () =>
    set((state) => ({
      isAuthenticated: true,
      furthestStep: Math.max(state.furthestStep, STEP.success) as StepIndex,
    })),
  reset: () => set({ values: emptyValues, furthestStep: STEP.email, isAuthenticated: false }),
}))

/** Selector helpers keep components from re-rendering on unrelated state. */
export const useWizardValues = () => useWizardStore((state) => state.values)
