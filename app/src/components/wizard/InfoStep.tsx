import type { ReactNode } from 'react'
import type { StepIndex } from '../../wizard/steps'
import { useStepNavigation } from '../../wizard/useStepNavigation'
import { WizardScreen } from '../layout/WizardScreen'
import { Button } from '../ui/Button'
import { WizardHeader } from './WizardHeader'

type InfoStepProps = {
  step: StepIndex
  headline: ReactNode
  /** The single labelled field this step collects. */
  children: ReactNode
  onNext: () => void
  nextDisabled?: boolean
  nextLoading?: boolean
  nextLabel?: string
  backTo: string
  /** Any bottom sheet this step owns (picker, confirmation). */
  sheet?: ReactNode
}

/**
 * The template behind steps 2-5 (username, name, age, pronouns) and reused by
 * the invite step: header, headline, one field, then NEXT/BACK pinned low.
 */
export function InfoStep({
  step,
  headline,
  children,
  onNext,
  nextDisabled = false,
  nextLoading = false,
  nextLabel = 'Next',
  backTo,
  sheet,
}: InfoStepProps) {
  const { goBack } = useStepNavigation()

  return (
    <WizardScreen>
      <WizardHeader step={step} />

      <div className="mt-11 grid gap-6 md:mt-14">
        <h1 className="text-[26px] leading-[1.25] font-bold tracking-[-0.01em] md:text-[32px]">
          {headline}
        </h1>
        {children}
      </div>

      <div className="mt-auto grid gap-3 pt-12">
        <Button onClick={onNext} disabled={nextDisabled} isLoading={nextLoading}>
          {nextLabel}
        </Button>
        <Button variant="secondary" onClick={() => goBack(backTo)}>
          Back
        </Button>
      </div>

      {sheet}
    </WizardScreen>
  )
}
