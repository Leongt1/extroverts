import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { WizardScreen } from '../../components/layout/WizardScreen'
import { WizardHeader } from '../../components/wizard/WizardHeader'
import { Button } from '../../components/ui/Button'
import { Checkbox } from '../../components/ui/Checkbox'
import { TextField } from '../../components/ui/Field'
import { useApiMutation } from '../../hooks/useApiMutation'
import { sendOtp } from '../../lib/api/signup'
import { emailSchema, type EmailFormValues } from '../../lib/validation'
import { useWizardStore } from '../../store/wizardStore'
import { ROUTES, STEP } from '../../wizard/steps'
import { useStepNavigation } from '../../wizard/useStepNavigation'

export function EmailPage() {
  const { goForward } = useStepNavigation()
  const values = useWizardStore((state) => state.values)
  const completeStep = useWizardStore((state) => state.completeStep)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    mode: 'onChange',
    defaultValues: { email: values.email, newsletterOptIn: values.newsletterOptIn },
  })

  const requestOtp = useApiMutation(
    (formValues: EmailFormValues) => sendOtp(formValues.email),
    {
      onSuccess: (_data, formValues) => {
        completeStep(STEP.email, formValues)
        goForward(ROUTES.verify)
      },
    },
  )

  const onSubmit = handleSubmit((formValues) =>
    requestOtp.mutate({ ...formValues, email: formValues.email.trim() }),
  )

  return (
    <WizardScreen>
      <WizardHeader />

      <form className="mt-12 grid gap-6 md:mt-16" onSubmit={onSubmit} noValidate>
        <h1 className="text-[26px] leading-[1.25] font-bold tracking-[-0.01em] md:text-[32px]">
          Enter your email
        </h1>

        <TextField
          label="Email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          autoFocus
          message={errors.email?.message}
          tone={errors.email ? 'error' : 'helper'}
          {...register('email')}
        />

        <Button type="submit" disabled={!isValid} isLoading={requestOtp.isPending}>
          {requestOtp.isPending ? 'Sending code' : 'Proceed'}
        </Button>

        <Controller
          control={control}
          name="newsletterOptIn"
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onChange={field.onChange}
              label="I'd like to subscribe to your newsletter"
            />
          )}
        />
      </form>
    </WizardScreen>
  )
}
