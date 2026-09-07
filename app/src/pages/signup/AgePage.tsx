import { useState } from 'react'
import { DateOfBirthSheet } from '../../components/wizard/DateOfBirthSheet'
import { InfoStep } from '../../components/wizard/InfoStep'
import { SelectField } from '../../components/ui/Field'
import { calculateAge, formatDateParts, parseDateParts, MIN_AGE } from '../../lib/utils/date'
import { useWizardStore } from '../../store/wizardStore'
import { ROUTES, STEP } from '../../wizard/steps'
import { useStepNavigation } from '../../wizard/useStepNavigation'

export function AgePage() {
  const { goForward } = useStepNavigation()
  const { dateOfBirth, age } = useWizardStore((state) => state.values)
  const setValues = useWizardStore((state) => state.setValues)
  const completeStep = useWizardStore((state) => state.completeStep)
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  const isUnderage = age !== null && age < MIN_AGE

  return (
    <InfoStep
      step={STEP.age}
      headline="How many years have you been partying?"
      onNext={() => {
        completeStep(STEP.age)
        goForward(ROUTES.pronouns)
      }}
      nextDisabled={age === null || isUnderage}
      backTo={ROUTES.name}
      sheet={
        <DateOfBirthSheet
          open={isPickerOpen}
          onClose={() => setIsPickerOpen(false)}
          initial={parseDateParts(dateOfBirth)}
          onConfirm={(parts) => {
            setValues({ dateOfBirth: formatDateParts(parts), age: calculateAge(parts) })
            setIsPickerOpen(false)
          }}
        />
      }
    >
      {/* Age is computed from the picker and never typed by hand. */}
      <SelectField
        label="Age"
        value={age === null ? '' : String(age)}
        placeholder="Age"
        onClick={() => setIsPickerOpen(true)}
        message={
          isUnderage
            ? // Fix over the reference, which disables NEXT and explains nothing.
              `You must be ${MIN_AGE} or older to join. You entered ${dateOfBirth}, which makes you ${age}.`
            : "We need your age to verify you're eligible and help others know who they're connecting with."
        }
        tone={isUnderage ? 'error' : 'helper'}
      />
    </InfoStep>
  )
}
