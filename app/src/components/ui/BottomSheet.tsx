import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useScrollLock } from '../../hooks/useScrollLock'
import { cn } from '../../lib/utils/cn'
import { CloseIcon } from './icons'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

type BottomSheetProps = {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: ReactNode
  children: ReactNode
  /** Tapping the scrim closes by default; turn off for destructive confirmations. */
  dismissOnScrim?: boolean
  className?: string
}

/**
 * The one sheet used for the account gate, the date-of-birth picker, the
 * pronoun picker and the irreversible-field confirmation.
 * Handles Escape, scrim dismissal, scroll lock and focus containment.
 */
export function BottomSheet({
  open,
  onClose,
  title,
  subtitle,
  children,
  dismissOnScrim = true,
  className,
}: BottomSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className={cn('animate-fade-in absolute inset-0 bg-black/75', dismissOnScrim && 'cursor-pointer')}
        onClick={dismissOnScrim ? onClose : undefined}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          'animate-sheet-in relative flex max-h-[88svh] w-full flex-col overflow-y-auto',
          'rounded-t-sheet bg-surface px-6 pt-3 pb-8 sm:px-8',
          'md:max-w-[600px] lg:max-w-[480px] lg:rounded-b-sheet lg:mb-8',
          className,
        )}
      >
        <span aria-hidden="true" className="mx-auto mb-5 h-1 w-10 rounded-full bg-fg/80" />
        <div className="flex items-start justify-between gap-4">
          <div className="grid gap-1">
            <h2 id={titleId} className="text-[22px] leading-tight font-bold tracking-[-0.01em] uppercase md:text-[26px]">
              {title}
            </h2>
            {subtitle && <p className="text-[15px] text-fg/85">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 grid size-9 shrink-0 cursor-pointer place-items-center rounded-full text-fg/80 transition-colors hover:text-fg"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="mt-6 grid gap-5">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
