import { useCallback, useState } from 'react'

/**
 * A boolean kept in sessionStorage, so a refresh mid-wizard doesn't replay the
 * intro screens. Deliberately session-scoped: nothing here implies an account.
 */
export function useSessionFlag(key: string) {
  const read = () => {
    try {
      return sessionStorage.getItem(key) === 'true'
    } catch {
      return false
    }
  }

  const [value, setValue] = useState(read)

  const set = useCallback(() => {
    try {
      sessionStorage.setItem(key, 'true')
    } catch {
      /* private mode — the flag simply doesn't persist */
    }
    setValue(true)
  }, [key])

  return [value, set] as const
}
