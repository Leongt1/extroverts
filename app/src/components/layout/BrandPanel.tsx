import { cn } from '../../lib/utils/cn'
import { BrandBackdrop } from '../ui/BrandBackdrop'
import { Wordmark } from '../ui/Wordmark'

/**
 * Desktop-only decorative column that sits beside the form on large screens,
 * turning the empty margin into branded space. Hidden below `lg`; pass the
 * `hidden lg:flex` visibility and width in `className` from the shell.
 */
export function BrandPanel({ className }: { className?: string }) {
  return (
    <div className={cn('relative flex-col items-center justify-center overflow-hidden bg-black p-12', className)}>
      <BrandBackdrop />
      <div className="relative flex flex-col items-center gap-5 text-center">
        <Wordmark size="lg" />
        <p className="mt-2 text-[15px] font-bold tracking-[0.06em] uppercase text-white/90">An app only for</p>
        <h2 className="text-[44px] leading-none font-bold tracking-[0.01em] uppercase xl:text-5xl">Extroverts</h2>
        <p className="max-w-[22rem] text-[15px] leading-[1.5] text-white/85">
          <span className="text-[#ff7a6b]">Warning:</span> Entering may lead to spontaneous dancing and
          unsolicited high-fives!
        </p>
      </div>
    </div>
  )
}
