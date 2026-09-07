import { useState } from 'react'
import { isRealDate, type DateParts } from '../../lib/utils/date'
import { cn } from '../../lib/utils/cn'
import { BottomSheet } from '../ui/BottomSheet'
import { Button } from '../ui/Button'

type DateOfBirthSheetProps = {
  open: boolean
  onClose: () => void
  initial: DateParts | null
  onConfirm: (parts: DateParts) => void
}

type PartKey = 'day' | 'month' | 'year'

const PARTS: Array<{ key: PartKey; label: string; placeholder: string; maxLength: number }> = [
  { key: 'day', label: 'Day', placeholder: 'DD', maxLength: 2 },
  { key: 'month', label: 'Month', placeholder: 'MM', maxLength: 2 },
  { key: 'year', label: 'Year', placeholder: 'YYYY', maxLength: 4 },
]

const EARLIEST_YEAR = 1900

const toDraft = (initial: DateParts | null) =>
  initial
    ? {
        day: String(initial.day).padStart(2, '0'),
        month: String(initial.month).padStart(2, '0'),
        year: String(initial.year),
      }
    : { day: '', month: '', year: '' }

/** A value only turns red once it has been typed and is out of range. */
function fieldError(key: PartKey, raw: string): boolean {
  if (!raw) return false
  const value = Number(raw)
  if (key === 'day') return value < 1 || value > 31
  if (key === 'month') return value < 1 || value > 12
  return raw.length === 4 && (value < EARLIEST_YEAR || value > new Date().getFullYear())
}

/** Mounted only while the sheet is open, so it always opens on the saved date. */
function DateOfBirthForm({ initial, onConfirm }: Omit<DateOfBirthSheetProps, 'open' | 'onClose'>) {
  const [draft, setDraft] = useState(() => toDraft(initial))

  const errors = {
    day: fieldError('day', draft.day),
    month: fieldError('month', draft.month),
    year: fieldError('year', draft.year),
  }

  const isComplete = draft.day !== '' && draft.month !== '' && draft.year.length === 4
  const parts: DateParts = {
    day: Number(draft.day),
    month: Number(draft.month),
    year: Number(draft.year),
  }
  const hasFieldError = errors.day || errors.month || errors.year
  const isImpossibleDate = isComplete && !hasFieldError && !isRealDate(parts)

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {PARTS.map(({ key, label, placeholder, maxLength }) => (
          <input
            key={key}
            value={draft[key]}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                [key]: event.target.value.replace(/\D/g, '').slice(0, maxLength),
              }))
            }
            inputMode="numeric"
            placeholder={placeholder}
            aria-label={label}
            aria-invalid={errors[key] || undefined}
            className={cn(
              'h-[52px] w-full rounded-field border bg-transparent px-2 text-center text-[16px]',
              'outline-none transition-colors placeholder:text-placeholder md:h-14',
              errors[key] ? 'border-danger text-danger' : 'border-line focus:border-line-strong',
            )}
          />
        ))}
      </div>

      {(hasFieldError || isImpossibleDate) && (
        <p role="alert" className="-mt-2 text-[13px] text-danger">
          {isImpossibleDate
            ? "That date doesn't exist. Check the day and month."
            : 'Enter a valid date.'}
        </p>
      )}

      <Button
        disabled={!isComplete || hasFieldError || isImpossibleDate}
        onClick={() => onConfirm(parts)}
      >
        Proceed
      </Button>
    </>
  )
}

export function DateOfBirthSheet({ open, onClose, initial, onConfirm }: DateOfBirthSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} title="Date of birth">
      <DateOfBirthForm initial={initial} onConfirm={onConfirm} />
    </BottomSheet>
  )
}
