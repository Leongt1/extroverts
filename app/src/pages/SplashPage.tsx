import { Navigate, useNavigate } from 'react-router-dom'
import { Screen } from '../components/layout/Screen'
import { Button } from '../components/ui/Button'
import { Wordmark } from '../components/ui/Wordmark'
import { useSessionFlag } from '../hooks/useSessionFlag'
import { ROUTES } from '../wizard/steps'

/** Animated mesh-gradient backdrop with the mountain silhouette. */
function SplashBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden bg-black">
      {/* Mesh gradient: warm on the left, cool on the right, black by the bottom. */}
      <div className="absolute -top-[16%] -left-[30%] size-[80%] rounded-full bg-[#ff3b30] blur-[80px]" />
      <div className="absolute -top-[6%] -left-[12%] size-[62%] rounded-full bg-[#ff9142] blur-[80px]" />
      <div className="absolute -top-[16%] -right-[26%] size-[86%] rounded-full bg-[#1d7fff] blur-[80px]" />
      <div className="absolute top-[8%] -right-[22%] size-[62%] rounded-full bg-[#0fdcd6] blur-[80px]" />
      <div className="absolute top-[20%] -left-[10%] size-[52%] rounded-full bg-[#ff2f6e] opacity-80 blur-[90px]" />
      <div className="absolute top-[30%] left-[34%] size-[42%] rounded-full bg-[#1fc98b] opacity-45 blur-[100px]" />

      {/* Mountain silhouette across the lower third: a soft, rounded ridge. */}
      <svg
        viewBox="0 0 100 34"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-[34%] h-[40%] w-full blur-[7px]"
      >
        <defs>
          <linearGradient id="ridge" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="#3a2f52" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#14101f" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
        </defs>
        <path
          d="M-8 34 C 10 33.2 24 29.5 35 21 C 41 16.5 45 10 50 8 C 55 10 60 17 66 21.5 C 78 30 92 33.4 108 34 Z"
          fill="url(#ridge)"
        />
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-b from-transparent via-black/80 to-black" />
    </div>
  )
}

export function SplashPage() {
  const navigate = useNavigate()
  const [hasSeenSplash, markSplashSeen] = useSessionFlag('hasSeenSplash')
  const [hasAcceptedTerms] = useSessionFlag('hasAcceptedTerms')

  if (hasSeenSplash) {
    return <Navigate to={hasAcceptedTerms ? ROUTES.feed : ROUTES.terms} replace />
  }

  return (
    <Screen padded={false} className="overflow-hidden">
      <SplashBackdrop />

      <div className="relative flex flex-1 flex-col px-6 pt-12 pb-[12svh] sm:px-8">
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
