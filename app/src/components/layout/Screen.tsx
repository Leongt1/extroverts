import type { ReactNode } from 'react'
import { cn } from '../../lib/utils/cn'

type ScreenProps = {
  children: ReactNode
  /** The feed sits on the lighter surface colour; every other screen is pure black. */
  tone?: 'ink' | 'surface'
  /** Screens that paint their own full-bleed background (splash) opt out of padding. */
  padded?: boolean
  className?: string
}

/**
 * Responsive shell shared by every screen.
 * Mobile: edge-to-edge. Tablet: centred 600px column.
 * Desktop: a focused 480px card, vertically centred instead of stretched.
 */
export function Screen({ children, tone = 'ink', padded = true, className }: ScreenProps) {
  const background = tone === 'surface' ? 'bg-surface' : 'bg-ink'

  return (
    <div className={cn('flex min-h-[100svh] justify-center bg-black lg:items-center lg:py-10')}>
      <div
        className={cn(
          'relative flex min-h-[100svh] w-full flex-col md:max-w-[600px] lg:max-w-[480px]',
          'lg:h-[min(820px,calc(100svh-80px))] lg:min-h-0 lg:overflow-y-auto lg:rounded-[28px] lg:border lg:border-line-soft',
          padded && 'px-6 pt-12 pb-8 sm:px-8',
          background,
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
