import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

const baseClasses = 'min-h-[54px] w-full cursor-pointer rounded-2xl px-5 py-3.5 text-[14px] font-bold uppercase tracking-[.1em] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-app-accent focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:transform-none'

export function ActionButton({ children, variant = 'primary', className = '', ...props }: ActionButtonProps) {
  const variantClasses = variant === 'primary'
    ? 'border border-transparent bg-app-text text-app-base disabled:text-app-disabled'
    : 'border border-app-border bg-transparent text-app-text'

  return <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>{children}</button>
}
