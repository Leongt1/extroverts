import { useCallback, useEffect, useState } from 'react'

/** Counts down to zero once per second; `start` (re)arms it. */
export function useCountdown(initialSeconds = 0) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)

  useEffect(() => {
    if (secondsLeft <= 0) return
    const timer = window.setTimeout(() => setSecondsLeft((current) => current - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [secondsLeft])

  const start = useCallback((seconds: number) => setSecondsLeft(seconds), [])

  return { secondsLeft, isActive: secondsLeft > 0, start }
}
