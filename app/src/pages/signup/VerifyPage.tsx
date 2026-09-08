import { useState } from 'react'
import { toast } from 'sonner'
import { WizardScreen } from '../../components/layout/WizardScreen'
import { WizardHeader } from '../../components/wizard/WizardHeader'
import { Button } from '../../components/ui/Button'
import { InfoIcon } from '../../components/ui/icons'
import { OtpInput } from '../../components/ui/OtpInput'
import { useApiMutation } from '../../hooks/useApiMutation'
import { useCountdown } from '../../hooks/useCountdown'
import { DEMO_OTP, sendOtp, verifyOtp } from '../../lib/api/signup'
import { OTP_LENGTH } from '../../lib/validation'
import { useWizardStore } from '../../store/wizardStore'
import { ROUTES, STEP } from '../../wizard/steps'
import { useStepNavigation } from '../../wizard/useStepNavigation'

const RESEND_COOLDOWN_SECONDS = 30

export function VerifyPage() {
  const { goForward, goBack } = useStepNavigation()
  const email = useWizardStore((state) => state.values.email)
  const completeStep = useWizardStore((state) => state.completeStep)

  const [code, setCode] = useState('')
  const [isCodeWrong, setIsCodeWrong] = useState(false)
  // A code was sent on the previous screen, so the resend timer starts armed.
  const { secondsLeft, isActive: isCoolingDown, start: startCooldown } = useCountdown(
    RESEND_COOLDOWN_SECONDS,
  )

  const verify = useApiMutation(verifyOtp, {
    onSuccess: ({ verified }) => {
      if (!verified) {
        setIsCodeWrong(true)
        return
      }
      completeStep(STEP.verify)
      goForward(ROUTES.username)
    },
  })

  const resend = useApiMutation(sendOtp, {
    onSuccess: () => {
      startCooldown(RESEND_COOLDOWN_SECONDS)
      setCode('')
      setIsCodeWrong(false)
      toast.success(`A new code is on its way to ${email}.`)
    },
  })

  const handleChange = (value: string) => {
    setCode(value)
    setIsCodeWrong(false)
  }

  return (
    <WizardScreen>
      <WizardHeader align="center" />

      <div className="mt-14 grid gap-8 md:mt-20">
        <p className="text-[16px] tracking-[0.02em] uppercase">Enter OTP</p>

        <div className="grid gap-4">
          <OtpInput
            value={code}
            onChange={handleChange}
            length={OTP_LENGTH}
            invalid={isCodeWrong}
            disabled={verify.isPending}
            autoFocus
            aria-describedby="otp-message"
          />

          <button
            type="button"
            onClick={() => resend.mutate(email)}
            disabled={isCoolingDown || resend.isPending}
            className="ml-auto cursor-pointer text-[15px] text-muted transition-colors hover:text-fg disabled:cursor-not-allowed disabled:text-muted/70"
          >
            {isCoolingDown ? `Resend OTP in ${secondsLeft}s` : 'Resend OTP'}
          </button>
        </div>
      </div>

      <div className="mt-12 grid gap-3 sm:mt-auto">
        <Button
          onClick={() => verify.mutate(code)}
          disabled={code.length !== OTP_LENGTH}
          isLoading={verify.isPending}
        >
          {verify.isPending ? 'Verifying' : 'Verify'}
        </Button>
        <Button variant="secondary" onClick={() => goBack(ROUTES.email)}>
          Go back
        </Button>

        <p
          id="otp-message"
          role={isCodeWrong ? 'alert' : undefined}
          className={`flex items-start justify-center gap-2 text-center text-[14px] ${
            isCodeWrong ? 'text-danger' : 'text-muted'
          }`}
        >
          <InfoIcon className="mt-0.5 shrink-0" />
          {isCodeWrong
            ? 'That code is incorrect. Check it and try again.'
            : `A ${OTP_LENGTH}-digit OTP has been sent to ${email}.`}
        </p>

        {/* Demo build: there is no mail server behind this screen. */}
        <p className="text-center text-[13px] text-muted/80">Demo code: {DEMO_OTP}</p>
      </div>
    </WizardScreen>
  )
}
