import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import type { StepDirection } from '../../wizard/useStepNavigation'
import { cn } from '../../lib/utils/cn'
import { Screen } from './Screen'

/** A wizard step: the shared shell plus the directional step transition. */
export function WizardScreen({ children, className }: { children: ReactNode; className?: string }) {
  const { pathname, state } = useLocation()
  const direction = (state as { direction?: StepDirection } | null)?.direction ?? 'forward'

  return (
    <Screen className={className}>
      <div
        key={pathname}
        className={cn(
          'flex flex-1 flex-col',
          direction === 'back' ? 'animate-step-back' : 'animate-step-in',
        )}
      >
        {children}
      </div>
    </Screen>
  )
}
