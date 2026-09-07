import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { toast } from 'sonner'

/**
 * useMutation with the app's shared failure policy: a request that fails
 * (as opposed to a request that succeeds with a negative result) always
 * surfaces as one global error toast.
 */
export function useApiMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn'> = {},
) {
  return useMutation<TData, Error, TVariables>({
    mutationFn,
    ...options,
    onError: (error, variables, onMutateResult, context) => {
      toast.error(error.message)
      options.onError?.(error, variables, onMutateResult, context)
    },
  })
}
