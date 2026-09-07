/**
 * Front-end only "backend".
 * Every call resolves after a realistic delay and can fail, so loading and
 * error states are genuinely exercised in the UI.
 */
const MIN_LATENCY_MS = 600
const MAX_LATENCY_MS = 1500

export class ApiError extends Error {}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const randomLatency = () =>
  MIN_LATENCY_MS + Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS)

type SimulateOptions = {
  /** Probability (0-1) that the call fails with a network-style error. */
  failureRate?: number
  /** Message surfaced in the global error toast. */
  errorMessage?: string
}

export async function simulate<T>(
  result: T | (() => T),
  { failureRate = 0, errorMessage = 'Something went wrong. Please try again.' }: SimulateOptions = {},
): Promise<T> {
  await delay(randomLatency())
  if (Math.random() < failureRate) throw new ApiError(errorMessage)
  return typeof result === 'function' ? (result as () => T)() : result
}
