import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export type StepDirection = 'forward' | 'back'

/**
 * Wizard navigation that records its direction in the route state, so the next
 * screen can animate in from the side it was travelled from.
 */
export function useStepNavigation() {
  const navigate = useNavigate()

  return useMemo(
    () => ({
      goForward: (path: string) => navigate(path, { state: { direction: 'forward' } }),
      goBack: (path: string) => navigate(path, { state: { direction: 'back' } }),
    }),
    [navigate],
  )
}
