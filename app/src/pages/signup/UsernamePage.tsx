import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { InfoStep } from '../../components/wizard/InfoStep'
import { TextField } from '../../components/ui/Field'
import { useApiMutation } from '../../hooks/useApiMutation'
import { checkUsernameAvailability } from '../../lib/api/signup'
import { usernameSchema, type UsernameFormValues } from '../../lib/validation'
import { useWizardStore } from '../../store/wizardStore'
import { ROUTES, STEP } from '../../wizard/steps'
import { useStepNavigation } from '../../wizard/useStepNavigation'

type Availability = { username: string; available: boolean }

export function UsernamePage() {
  const { goForward } = useStepNavigation()
  const values = useWizardStore((state) => state.values)
  const completeStep = useWizardStore((state) => state.completeStep)
  const [availability, setAvailability] = useState<Availability | null>(null)

  const {
    register,
    control,
    formState: { errors, isValid },
  } = useForm<UsernameFormValues>({
    resolver: zodResolver(usernameSchema),
    mode: 'onChange',
    defaultValues: { username: values.username },
  })

  const username = useWatch({ control, name: 'username' }).trim()
  const check = useApiMutation(checkUsernameAvailability, { onSuccess: setAvailability })

  // The result only applies to the value that was checked.
  const checked = availability?.username === username ? availability : null
  const isTaken = checked?.available === false
  const isAvailable = checked?.available === true

  const commit = () => {
    completeStep(STEP.username, { username })
    goForward(ROUTES.name)
  }

  const handleNext = () => {
    if (isAvailable) commit()
    else if (isValid) check.mutate(username)
  }

  const { onBlur: registerBlur, ...usernameField } = register('username')

  return (
    <InfoStep
      step={STEP.username}
      headline="Create a username that fits your vibe!"
      onNext={handleNext}
      nextDisabled={!isValid || isTaken}
      nextLoading={check.isPending}
      backTo={ROUTES.verify}
    >
      <TextField
        label="Username"
        autoFocus
        maxLength={40}
        message={
          errors.username?.message ??
          (isTaken
            ? 'This username is already taken. Try another one.'
            : isAvailable
              ? `${username} is available.`
              : 'All your Superlatives and Invites will come your way with this name, so make it unforgettable!')
        }
        // Red is reserved for format/length violations; an availability
        // conflict is a different kind of problem, so it reads yellow.
        tone={errors.username ? 'error' : isTaken ? 'warning' : 'helper'}
        {...usernameField}
        onBlur={(event) => {
          void registerBlur(event)
          if (!errors.username && username) check.mutate(username)
        }}
        onChange={(event) => {
          setAvailability(null)
          void usernameField.onChange(event)
        }}
      />
    </InfoStep>
  )
}
