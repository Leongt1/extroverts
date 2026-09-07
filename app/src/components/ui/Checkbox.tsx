import type { ReactNode } from 'react'
import { cn } from '../../lib/utils/cn'

type CheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label: ReactNode
  disabled?: boolean
  className?: string
}

/** Rounded-square checkbox: outlined when off, solid white when on. */
export function Checkbox({ checked, onChange, label, disabled = false, className }: CheckboxProps) {
  return (
    <label
      className={cn(
        'flex w-fit items-center gap-3.5 text-[15px]',
        disabled ? 'cursor-not-allowed text-fg/35' : 'cursor-pointer text-fg',
        className,
      )}
    >
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span
        aria-hidden="true"
        className={cn(
          'size-[22px] shrink-0 rounded-[7px] border transition-colors',
          'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent',
          checked ? 'border-fg bg-fg' : 'border-line-strong',
          disabled && !checked && 'border-line',
        )}
      />
      {label}
    </label>
  )
}
