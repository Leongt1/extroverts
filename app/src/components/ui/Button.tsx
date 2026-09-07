import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils/cn'
import { Spinner } from './Spinner'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
  children: ReactNode
}

const VARIANTS = {
  // Disabled dims the label only — the filled shape never turns grey.
  primary: 'bg-fg text-ink disabled:text-quiet',
  secondary: 'border border-fg/75 text-fg disabled:text-fg/40 disabled:border-fg/25',
} as const

/** Full-width uppercase action button — the only button shape in the app. */
export function Button({
  variant = 'primary',
  isLoading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={cn(
        'flex h-[52px] w-full items-center justify-center gap-2.5 rounded-control px-5',
        'text-[15px] font-semibold tracking-[0.06em] uppercase transition-colors duration-150',
        'md:h-14 md:text-base',
        'disabled:cursor-not-allowed',
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  )
}
