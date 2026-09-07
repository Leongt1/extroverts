import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { InfoStep } from '../../components/wizard/InfoStep'
import { TextField } from '../../components/ui/Field'
import { useApiMutation } from '../../hooks/useApiMutation'
import { submitSignup } from '../../lib/api/signup'
import { inviteSchema, type InviteFormValues } from '../../lib/validation'
import { useWizardStore } from '../../store/wizardStore'
import { ROUTES, STEP } from '../../wizard/steps'
import { useStepNavigation } from '../../wizard/useStepNavigation'

/** House rules block: [text before the accent word, accent word, text after]. */
const MANIFESTO: Array<[string, string, string]> = [
  ['Kindness = good ', 'hair', ' day'],
  ['Sip in? ', 'chip', ' in.'],
  ['Ghosting is for ', 'halloween', '.'],
  ['Outfits loud, ', 'intentions', ' clear.'],
  ['Joining? Free. Hosting? ', 'also', ' free.'],
  // The typo is the joke — the next line owns it.
  ['Earlly is ', 'iconic', '.'],
  ['Yes. ', 'spelling', ' mistake.'],
]

export function InvitePage() {
  const { goForward } = useStepNavigation()
  const values = useWizardStore((state) => state.values)
  const completeStep = useWizardStore((state) => state.completeStep)
  const finishSignup = useWizardStore((state) => state.finishSignup)

  const {
    register,
    control,
    formState: { errors },
  } = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    mode: 'onChange',
    defaultValues: { inviteCode: values.inviteCode },
  })

  const inviteCode = useWatch({ control, name: 'inviteCode' }).trim()

  const signUp = useApiMutation(submitSignup, {
    onSuccess: () => {
      finishSignup()
      toast.success("You're in! Welcome to the party.")
      goForward(ROUTES.success)
    },
  })

  const submit = () => {
    completeStep(STEP.invite, { inviteCode })
    signUp.mutate({ ...values, inviteCode })
  }

  return (
    <InfoStep
      step={STEP.invite}
      headline={
        <span className="grid gap-1 text-[16px] leading-[1.5] tracking-[-0.01em] uppercase md:text-[18px]">
          {MANIFESTO.map(([before, accent, after]) => (
            <span key={accent}>
              {before}
              <span className="text-accent">{accent}</span>
              {after}
            </span>
          ))}
        </span>
      }
      onNext={submit}
      nextLabel="Sign up"
      nextLoading={signUp.isPending}
      backTo={ROUTES.pronouns}
    >
      <TextField
        label={
          <>
            Enter invite code <span className="text-muted lowercase">(optional)</span>
          </>
        }
        maxLength={16}
        message={errors.inviteCode?.message ?? 'Enter invite code and get up to +30 HVTs!'}
        tone={errors.inviteCode ? 'error' : 'helper'}
        {...register('inviteCode')}
      />
    </InfoStep>
  )
}
