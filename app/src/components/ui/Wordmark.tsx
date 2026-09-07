import { cn } from '../../lib/utils/cn'

const SIZES = {
  sm: 'text-[38px] md:text-[42px]',
  md: 'text-[44px] md:text-[48px]',
  lg: 'text-[56px] md:text-[64px]',
} as const

type WordmarkProps = {
  size?: keyof typeof SIZES
  className?: string
}

/** The serif "E" with its superscript dot. */
export function Wordmark({ size = 'sm', className }: WordmarkProps) {
  return (
    <span
      className={cn('relative inline-block w-fit self-start font-serif leading-none select-none', SIZES[size], className)}
      role="img"
      aria-label="Extroverts"
    >
      <span aria-hidden="true">E</span>
      <span
        aria-hidden="true"
        className="absolute top-[0.04em] -right-[0.18em] block size-[0.18em] rounded-full bg-current"
      />
    </span>
  )
}
