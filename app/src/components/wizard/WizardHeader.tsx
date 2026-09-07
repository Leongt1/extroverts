import { PROGRESS_LABEL, TOTAL_STEPS, type StepIndex } from '../../wizard/steps'
import { Wordmark } from '../ui/Wordmark'

type WizardHeaderProps = {
  /** Omit to render the wordmark alone (email + OTP screens). */
  step?: StepIndex
  align?: 'start' | 'center'
}

/**
 * Wordmark + progress indicator.
 *
 * Reference bug fixed here: in the app a stray "BACK" label is positioned
 * behind the "GETTING READY" text and renders clipped on every step that uses
 * this header. Back navigation belongs to the button stack at the bottom, so
 * this header is a plain two-column row with nothing overlapping.
 */
export function WizardHeader({ step, align = 'start' }: WizardHeaderProps) {
  if (align === 'center') {
    return (
      <header className="flex justify-center">
        <Wordmark />
      </header>
    )
  }

  return (
    <header className="grid gap-3">
      <div className="flex items-center justify-between gap-4">
        <Wordmark />
        {step !== undefined && (
          <span className="shrink-0 text-[15px] font-bold tracking-[0.02em] uppercase md:text-base">
            {PROGRESS_LABEL}
          </span>
        )}
      </div>
      {step !== undefined && (
        <div
          className="h-[3px] w-full overflow-hidden rounded-full bg-fg/12"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
          aria-valuenow={step + 1}
          aria-label={`Step ${step + 1} of ${TOTAL_STEPS}`}
        >
          <span
            className="block h-full rounded-full bg-accent transition-[width] duration-300"
            style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      )}
    </header>
  )
}
