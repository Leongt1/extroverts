import type { ReactNode } from 'react'
import { cn } from '../../lib/utils/cn'
import { BrandPanel } from './BrandPanel'

type ScreenProps = {
  children: ReactNode
  /** The feed sits on the lighter surface colour; every other screen is pure black. */
  tone?: 'ink' | 'surface'
  /** Screens that paint their own full-bleed background (splash) opt out of padding. */
  padded?: boolean
  /**
   * How the screen frames itself on desktop (lg+). Mobile/tablet are identical
   * across all three.
   * - `card`  centred phone-width card floating on black (feed).
   * - `split` decorative brand panel beside a centred form (wizard, terms, success).
   * - `bleed` full-bleed; the screen paints its own background edge-to-edge (splash).
   */
  desktop?: 'card' | 'split' | 'bleed'
  className?: string
}

const PADDING = 'px-6 pt-12 pb-8 sm:px-8'

/**
 * Responsive shell shared by every screen.
 * Mobile: edge-to-edge. Tablet: centred 600px column. Desktop: see `desktop`.
 */
export function Screen({ children, tone = 'ink', padded = true, desktop = 'card', className }: ScreenProps) {
  const background = tone === 'surface' ? 'bg-surface' : 'bg-ink'

  if (desktop === 'bleed') {
    return (
      <div className={cn('relative flex min-h-[100svh] w-full flex-col', padded && PADDING, background, className)}>
        {children}
      </div>
    )
  }

  if (desktop === 'split') {
    return (
      <div className="flex min-h-[100svh] flex-col bg-black lg:flex-row">
        <BrandPanel className="hidden lg:flex lg:w-[44%] xl:w-1/2" />
        <div className="flex min-h-[100svh] w-full justify-center lg:min-h-0 lg:flex-1 lg:items-center lg:py-10">
          <div
            className={cn(
              'relative flex min-h-[100svh] w-full flex-col md:max-w-[600px] lg:min-h-0 lg:max-w-[440px]',
              padded && cn(PADDING, 'lg:py-0'),
              background,
              className,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    )
  }

  // desktop === 'card' — a focused phone-width card, vertically centred.
  return (
    <div className="flex min-h-[100svh] justify-center bg-black lg:items-center lg:py-10">
      <div
        className={cn(
          'relative flex min-h-[100svh] w-full flex-col md:max-w-[600px] lg:max-w-[480px]',
          'lg:h-[min(820px,calc(100svh-80px))] lg:min-h-0 lg:overflow-y-auto lg:rounded-[28px] lg:border lg:border-line-soft',
          padded && PADDING,
          background,
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
