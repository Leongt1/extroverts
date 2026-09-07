import { forwardRef, useId, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/utils/cn'

export type FieldTone = 'helper' | 'error' | 'warning'

const MESSAGE_TONE: Record<FieldTone, string> = {
  // Format/length violations are red; an availability conflict is yellow.
  helper: 'text-fg/85',
  error: 'text-danger',
  warning: 'text-warning',
}

const CONTROL_BASE =
  'h-[52px] w-full rounded-field border bg-transparent px-4 text-[16px] outline-none transition-colors md:h-14'

type FieldShellProps = {
  id: string
  label: ReactNode
  message?: ReactNode
  tone?: FieldTone
  messageId?: string
  children: ReactNode
}

function FieldShell({ id, label, message, tone = 'helper', messageId, children }: FieldShellProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-[13px] tracking-[0.04em] text-fg uppercase">
        {label}
      </label>
      {children}
      {message && (
        <p id={messageId} className={cn('text-[13px] leading-[1.45]', MESSAGE_TONE[tone])}>
          {message}
        </p>
      )}
    </div>
  )
}

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  label: ReactNode
  message?: ReactNode
  tone?: FieldTone
  id?: string
}

/** Labelled text input with an inline message slot (helper / error / warning). */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, message, tone = 'helper', className, id, ...props },
  ref,
) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const messageId = `${fieldId}-message`

  return (
    <FieldShell id={fieldId} label={label} message={message} tone={tone} messageId={messageId}>
      <input
        ref={ref}
        id={fieldId}
        aria-invalid={tone === 'error' || undefined}
        aria-describedby={message ? messageId : undefined}
        className={cn(
          CONTROL_BASE,
          'placeholder:text-placeholder placeholder:uppercase',
          tone === 'error' ? 'border-danger' : 'border-line focus:border-line-strong',
          className,
        )}
        {...props}
      />
    </FieldShell>
  )
})

type SelectFieldProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'value'> & {
  label: ReactNode
  value: string
  placeholder?: string
  message?: ReactNode
  tone?: FieldTone
  id?: string
}

/**
 * Looks like a text input but opens a picker — used for AGE and PRONOUNS,
 * whose values can never be typed by hand. A button, not a readonly input,
 * so it is reachable and operable from the keyboard.
 */
export function SelectField({
  label,
  value,
  placeholder,
  message,
  tone = 'helper',
  className,
  id,
  ...props
}: SelectFieldProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const messageId = `${fieldId}-message`

  return (
    <FieldShell id={fieldId} label={label} message={message} tone={tone} messageId={messageId}>
      <button
        id={fieldId}
        type="button"
        aria-haspopup="dialog"
        aria-describedby={message ? messageId : undefined}
        className={cn(
          CONTROL_BASE,
          'flex items-center text-left',
          value ? 'text-fg' : 'text-placeholder uppercase',
          tone === 'error' ? 'border-danger' : 'border-line hover:border-line-strong',
          className,
        )}
        {...props}
      >
        {value || placeholder}
      </button>
    </FieldShell>
  )
}
