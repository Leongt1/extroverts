import { Navigate, useNavigate } from 'react-router-dom'
import { Screen } from '../components/layout/Screen'
import { BrandBackdrop } from '../components/ui/BrandBackdrop'
import { Button } from '../components/ui/Button'
import { Wordmark } from '../components/ui/Wordmark'
import { useSessionFlag } from '../hooks/useSessionFlag'
import { ROUTES } from '../wizard/steps'

export function SplashPage() {
  const navigate = useNavigate()
  const [hasSeenSplash, markSplashSeen] = useSessionFlag('hasSeenSplash')
  const [hasAcceptedTerms] = useSessionFlag('hasAcceptedTerms')

  if (hasSeenSplash) {
    return <Navigate to={hasAcceptedTerms ? ROUTES.feed : ROUTES.terms} replace />
  }

  return (
    <Screen padded={false} desktop="bleed" className="overflow-hidden">
      <BrandBackdrop />

      <div className="relative mx-auto flex w-full flex-1 flex-col px-6 pt-12 pb-[12svh] sm:px-8 lg:max-w-[520px] lg:pb-[16svh]">
        <div className="flex flex-1 items-center justify-center pb-[8svh]">
          <Wordmark size="lg" />
        </div>

        <div className="grid gap-3 text-center">
          <p className="text-[17px] font-bold tracking-[0.01em] uppercase">An app only for</p>
          <h1 className="text-[clamp(34px,10vw,44px)] font-bold tracking-[0.01em] uppercase md:text-5xl">
            Extroverts
          </h1>
          <p className="mx-auto mt-6 max-w-[22rem] text-[15px] leading-[1.45] text-white/95">
            <span className="text-[#ff7a6b]">Warning:</span> Entering may lead to spontaneous dancing
            and unsolicited high-fives!
          </p>
        </div>

        <Button
          className="mt-7"
          onClick={() => {
            markSplashSeen()
            navigate(ROUTES.terms)
          }}
        >
          Continue
        </Button>
      </div>
    </Screen>
  )
}
