import { useMutation } from '@tanstack/react-query'

const wait = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds))

type MutationOptions<TInput, TResult> = {
  action: (input: TInput) => Promise<TResult>
  delay?: number
  failureRate?: number
}

export function useSimulatedMutation<TInput, TResult>({ action, delay = 900, failureRate = 0 }: MutationOptions<TInput, TResult>) {
  return useMutation({
    mutationFn: async (input: TInput) => {
      await wait(delay)
      if (failureRate > 0 && Math.random() < failureRate) throw new Error('Something went wrong. Please try again.')
      return action(input)
    },
  })
}
