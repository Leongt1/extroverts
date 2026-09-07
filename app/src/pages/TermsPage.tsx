import { useNavigate } from 'react-router-dom'
import { ActionButton } from '../components/ActionButton'
import { Wordmark } from '../components/Wordmark'

export function TermsPage() {
  const navigate = useNavigate()

  return <main className="h-[100svh] overflow-hidden bg-app-base"><div className="relative z-[1] mx-auto flex h-[100svh] w-[calc(100%-48px)] max-w-[480px] flex-col py-12">
    <Wordmark />
    <div className="mt-[164px] mb-auto grid max-w-[390px] gap-6"><p className="text-[16px] font-bold leading-[1.62] text-app-text">BY USING THIS APP, YOU&apos;RE AGREEING TO KEEP THINGS FUN, SAFE, AND RESPECTFUL... AND ALSO AGREEING TO OUR TERMS AND CONDITIONS. POLITENESS IS A MUST—TREAT OTHERS HOW YOU&apos;D WANT TO BE TREATED. EVERYONE HERE IS LOOKING FOR REASONS TO <em className="not-italic text-app-accent">PARTY</em>, SO BRING YOUR BEST VIBE AND EXPECT THE SAME FROM OTHERS. LET&apos;S PARTY RESPONSIBLY AND MAKE EVERY EXPERIENCE A GREAT ONE!</p></div>
    <div className="mt-auto grid gap-[18px]"><p className="text-[12px] leading-[1.5] text-app-muted">To proceed, accept <a className="text-app-text no-underline" href="#terms">Terms and Conditions</a></p><ActionButton onClick={() => { sessionStorage.setItem('hasAcceptedTerms', 'true'); navigate('/feed') }}>Accept</ActionButton></div>
  </div></main>
}
