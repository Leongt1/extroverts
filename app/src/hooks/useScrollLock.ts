import { useEffect } from 'react'

/** Freezes background scrolling while an overlay is open. */
export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [isLocked])
}
