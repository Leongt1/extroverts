import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActionButton } from '../components/ActionButton'
import { Wordmark } from '../components/Wordmark'

export function SplashPage() {
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('hasSeenSplash') === 'true') {
      navigate(sessionStorage.getItem('hasAcceptedTerms') === 'true' ? '/feed' : '/terms', { replace: true })
    }
  }, [navigate])

  return <main className="relative isolate h-[100svh] overflow-hidden bg-[linear-gradient(132deg,#fe4d45_0%,#ff9142_30%,#3b82f6_72%,#2dd4bf_100%)]">
    <div className="absolute -left-[16%] -top-[22%] h-[72vw] w-[72vw] max-h-[720px] max-w-[720px] animate-[drift_12s_ease-in-out_infinite_alternate] rounded-full border border-white/20" />
    <div className="absolute -bottom-[12%] -right-[40%] h-[72vw] w-[72vw] max-h-[720px] max-w-[720px] animate-[drift_12s_ease-in-out_infinite_alternate] rounded-full border border-white/20 [animation-delay:-4s]" />
    <div className="absolute -bottom-px -left-[5%] z-[-1] h-[37%] w-[110%] bg-[#090909] [clip-path:polygon(0_75%,12%_57%,19%_68%,33%_30%,43%_58%,55%_42%,65%_65%,80%_23%,91%_55%,100%_38%,100%_100%,0_100%)]" aria-hidden="true" />
    <div className="relative z-[2] mx-auto flex h-[100svh] w-[calc(100%-48px)] max-w-[480px] flex-col justify-between py-12">
      <Wordmark />
      <div className="m-auto mb-[54px] text-center"><p className="mb-3 text-[17px] font-bold leading-tight text-white">AN APP ONLY FOR</p><h1 className="m-0 text-[clamp(38px,11vw,52px)] font-bold leading-[1.12] tracking-[.01em] text-white">EXTROVERTS</h1><p className="mx-auto mt-[42px] max-w-[340px] text-[14px] leading-[1.4] text-white/[.88]"><strong className="font-normal text-[#ff8276]">Warning:</strong> Entering may lead to spontaneous dancing and unsolicited high-fives!</p></div>
      <ActionButton onClick={() => { sessionStorage.setItem('hasSeenSplash', 'true'); navigate('/terms') }}>Continue</ActionButton>
    </div>
  </main>
}
