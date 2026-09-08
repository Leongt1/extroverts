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
  primary: 'bg-fg text-ink hover:bg-fg/90 disabled:text-quiet disabled:hover:bg-fg',
  secondary:
    'border border-fg/75 text-fg hover:border-fg hover:bg-fg/5 disabled:text-fg/40 disabled:border-fg/25 disabled:hover:bg-transparent',
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
        'flex h-[52px] w-full select-none items-center justify-center gap-2.5 rounded-control px-5',
        'text-[15px] font-semibold tracking-[0.06em] uppercase transition duration-150',
        'md:h-14 md:text-base',
        'cursor-pointer active:scale-[0.99] disabled:cursor-not-allowed disabled:active:scale-100',
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
