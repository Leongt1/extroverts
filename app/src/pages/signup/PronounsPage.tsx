import { useState } from 'react'
import { InfoStep } from '../../components/wizard/InfoStep'
import { PronounSheet } from '../../components/wizard/PronounSheet'
import { SelectField } from '../../components/ui/Field'
import { useWizardStore } from '../../store/wizardStore'
import { ROUTES, STEP } from '../../wizard/steps'
import { useStepNavigation } from '../../wizard/useStepNavigation'

export function PronounsPage() {
  const { goForward } = useStepNavigation()
  const { pronouns, customPronoun } = useWizardStore((state) => state.values)
  const setValues = useWizardStore((state) => state.setValues)
  const completeStep = useWizardStore((state) => state.completeStep)
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  const chosen = [...pronouns, ...(customPronoun ? [customPronoun] : [])]

  return (
    <InfoStep
      step={STEP.pronouns}
      headline="Which pronouns feel right for you?"
      onNext={() => {
        completeStep(STEP.pronouns)
        goForward(ROUTES.invite)
      }}
      nextDisabled={chosen.length === 0}
      backTo={ROUTES.age}
      sheet={
        <PronounSheet
          open={isPickerOpen}
          onClose={() => setIsPickerOpen(false)}
          initial={{ pronouns, customPronoun }}
          onConfirm={(selection) => {
            setValues(selection)
            setIsPickerOpen(false)
          }}
        />
      }
    >
      <SelectField
        label="Pronouns"
        value={chosen.join(', ')}
        placeholder="Pronouns"
        onClick={() => setIsPickerOpen(true)}
        message="Select the pronouns that feel right for you."
      />
    </InfoStep>
  )
}
