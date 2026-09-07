import { useSimulatedMutation } from './useSimulatedMutation'

export function useSendOtp() {
  return useSimulatedMutation({
    action: async (email: string) => ({ email, sentAt: new Date().toISOString() }),
    delay: 900,
    failureRate: 0.15,
  })
}
