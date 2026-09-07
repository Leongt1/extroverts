import { useState } from 'react'
import { MAX_PRONOUNS, PRONOUN_OPTIONS, type PronounSelection } from '../../lib/pronouns'
import { BottomSheet } from '../ui/BottomSheet'
import { Button } from '../ui/Button'
import { Checkbox } from '../ui/Checkbox'
import { TextField } from '../ui/Field'

type PronounSheetProps = {
  open: boolean
  onClose: () => void
  initial: PronounSelection
  onConfirm: (selection: PronounSelection) => void
}

/** Mounted only while the sheet is open, so it always opens on the saved values. */
function PronounPicker({ initial, onConfirm }: Omit<PronounSheetProps, 'open' | 'onClose'>) {
  const [selected, setSelected] = useState(initial.pronouns)
  const [custom, setCustom] = useState(initial.customPronoun)
  const [isCustomOpen, setIsCustomOpen] = useState(Boolean(initial.customPronoun))

  const isFull = selected.length >= MAX_PRONOUNS

  const toggle = (option: string) =>
    setSelected((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option].slice(0, MAX_PRONOUNS),
    )

  return (
    <>
      <div className="grid gap-4">
        {PRONOUN_OPTIONS.map((option) => (
          <Checkbox
            key={option}
            label={option}
            checked={selected.includes(option)}
            disabled={isFull && !selected.includes(option)}
            onChange={() => toggle(option)}
          />
        ))}
      </div>

      {/* Says why the remaining boxes went quiet instead of ignoring the tap. */}
      {isFull && (
        <p className="-mt-2 text-[13px] text-warning" role="status">
          That&apos;s {MAX_PRONOUNS} — deselect one to pick another.
        </p>
      )}

      <Button
        disabled={selected.length === 0 && custom.trim() === ''}
        onClick={() => onConfirm({ pronouns: selected, customPronoun: custom.trim() })}
      >
        Proceed
      </Button>

      {isCustomOpen ? (
        <TextField
          label="Your pronouns"
          value={custom}
          maxLength={30}
          autoFocus
          placeholder="Add your own"
          onChange={(event) => setCustom(event.target.value)}
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsCustomOpen(true)}
          className="w-fit text-[15px] text-fg underline-offset-4 hover:underline"
        >
          Did we miss anything?
        </button>
      )}
    </>
  )
}

export function PronounSheet({ open, onClose, initial, onConfirm }: PronounSheetProps) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Select pronouns"
      subtitle={`Select upto ${MAX_PRONOUNS}`}
    >
      <PronounPicker initial={initial} onConfirm={onConfirm} />
    </BottomSheet>
  )
}
