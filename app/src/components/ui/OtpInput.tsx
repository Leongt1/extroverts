import { useEffect, useRef, type ClipboardEvent, type KeyboardEvent } from 'react'
import { cn } from '../../lib/utils/cn'

type OtpInputProps = {
  value: string
  onChange: (value: string) => void
  length?: number
  invalid?: boolean
  disabled?: boolean
  autoFocus?: boolean
  'aria-describedby'?: string
}

const digitsOnly = (value: string) => value.replace(/\D/g, '')

/**
 * Underline-style one-digit-per-box code entry.
 * Supports typing, backspace, arrow keys and paste-to-fill.
 */
export function OtpInput({
  value,
  onChange,
  length = 6,
  invalid = false,
  disabled = false,
  autoFocus = false,
  'aria-describedby': describedBy,
}: OtpInputProps) {
  const inputs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    if (autoFocus) inputs.current[0]?.focus()
  }, [autoFocus])

  const setDigit = (index: number, digit: string) => {
    const next = value.padEnd(length, ' ').split('')
    next[index] = digit || ' '
    onChange(next.join('').trimEnd().replace(/ /g, ''))
  }

  const handleChange = (index: number, raw: string) => {
    const digits = digitsOnly(raw)
    if (!digits) {
      setDigit(index, '')
      return
    }
    if (digits.length > 1) {
      onChange((value.slice(0, index) + digits).slice(0, length))
      inputs.current[Math.min(index + digits.length, length - 1)]?.focus()
      return
    }
    setDigit(index, digits)
    inputs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !value[index]) {
      inputs.current[index - 1]?.focus()
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      inputs.current[index - 1]?.focus()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      inputs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const pasted = digitsOnly(event.clipboardData.getData('text')).slice(0, length)
    if (!pasted) return
    onChange(pasted)
    inputs.current[Math.min(pasted.length, length - 1)]?.focus()
  }

  return (
    <div
      className={cn('flex w-full min-w-0 gap-2.5 md:gap-3', invalid && 'animate-shake')}
      role="group"
      aria-label={`${length}-digit verification code`}
      aria-describedby={describedBy}
    >
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(element) => {
            inputs.current[index] = element
          }}
          value={value[index] ?? ''}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          disabled={disabled}
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={length}
          size={1}
          placeholder="•"
          aria-label={`Digit ${index + 1}`}
          aria-invalid={invalid || undefined}
          className={cn(
            'h-[52px] min-w-0 flex-1 border-b-2 bg-transparent pb-1 text-center text-[22px]',
            'outline-none transition-colors placeholder:text-fg/70',
            invalid ? 'border-danger' : 'border-line-soft focus:border-fg',
          )}
        />
      ))}
    </div>
  )
}
