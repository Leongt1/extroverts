import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useWizardStore } from '../../store/wizardStore'
import { STEP_ROUTES, type StepIndex } from '../../wizard/steps'

/**
 * One guard for every wizard route: a step opens only once the store says the
 * previous ones were completed, so a pasted URL can't skip ahead.
 */
export function StepGuard({ step, children }: { step: StepIndex; children: ReactNode }) {
  const furthestStep = useWizardStore((state) => state.furthestStep)

  if (step > furthestStep) {
    return <Navigate to={STEP_ROUTES[furthestStep]} replace />
  }

  return children
}
