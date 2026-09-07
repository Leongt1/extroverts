import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { ConfirmSheet } from '../../components/wizard/ConfirmSheet'
import { InfoStep } from '../../components/wizard/InfoStep'
import { TextField } from '../../components/ui/Field'
import { DISPLAY_NAME_MAX, displayNameSchema, type DisplayNameFormValues } from '../../lib/validation'
import { useWizardStore } from '../../store/wizardStore'
import { ROUTES, STEP } from '../../wizard/steps'
import { useStepNavigation } from '../../wizard/useStepNavigation'

export function DisplayNamePage() {
  const { goForward } = useStepNavigation()
  const values = useWizardStore((state) => state.values)
  const completeStep = useWizardStore((state) => state.completeStep)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const {
    register,
    control,
    formState: { errors, isValid },
  } = useForm<DisplayNameFormValues>({
    resolver: zodResolver(displayNameSchema),
    mode: 'onChange',
    defaultValues: { displayName: values.displayName },
  })

  const displayName = useWatch({ control, name: 'displayName' }).trim()

  return (
    <InfoStep
      step={STEP.name}
      headline={'"Name, please, for the party check!"'}
      onNext={() => setIsConfirmOpen(true)}
      nextDisabled={!isValid}
      backTo={ROUTES.username}
      sheet={
        // Fix over the reference: the field says it can never be changed, so
        // confirm it before it is locked in.
        <ConfirmSheet
          open={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={() => {
            completeStep(STEP.name, { displayName })
            goForward(ROUTES.age)
          }}
          title="Are you sure?"
          body={`You're joining as "${displayName}". This is the name other members see, and it cannot be changed later.`}
        />
      }
    >
      <TextField
        label="Name"
        autoFocus
        maxLength={DISPLAY_NAME_MAX}
        message={
          errors.displayName?.message ??
          'This is the name shown as on members and requests. Cannot be changed later.'
        }
        tone={errors.displayName ? 'error' : 'helper'}
        {...register('displayName')}
      />
    </InfoStep>
  )
}
