import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { EmailPage } from './pages/EmailPage'
import { AgePage, InfoPage, InvitePage, OtpPage, PronounsPage, SuccessPage } from './pages/SignupPages'

const Wordmark = () => (
  <div className="wordmark" aria-label="E club">
    E<span>.</span>
  </div>
)

const PrimaryButton = ({ children, onClick }: { children: string; onClick?: () => void }) => (
  <button className="button button-primary" type="button" onClick={onClick}>
    {children}
  </button>
)

function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('hasSeenSplash') === 'true') {
      navigate(sessionStorage.getItem('hasAcceptedTerms') === 'true' ? '/feed' : '/terms', {
        replace: true,
      })
    }
  }, [navigate])

  return (
    <main className="splash-screen">
      <div className="splash-orbit splash-orbit-one" />
      <div className="splash-orbit splash-orbit-two" />
      <div className="mountains" aria-hidden="true" />
      <div className="splash-content">
        <div className="splash-wordmark"><Wordmark /></div>
        <div className="splash-copy">
          <p className="splash-kicker">AN APP ONLY FOR</p>
          <h1>EXTROVERTS</h1>
          <p className="splash-warning"><strong>Warning:</strong> Entering may lead to spontaneous dancing and unsolicited high-fives!</p>
        </div>
        <PrimaryButton onClick={() => {
          sessionStorage.setItem('hasSeenSplash', 'true')
          navigate('/terms')
        }}>Continue</PrimaryButton>
      </div>
    </main>
  )
}

function Terms() {
  const navigate = useNavigate()

  return (
    <main className="page-shell">
      <div className="page-frame terms-frame">
        <Wordmark />
        <div className="terms-copy">
          <p className="terms-lead">BY USING THIS APP, YOU&apos;RE AGREEING TO KEEP THINGS FUN, SAFE, AND RESPECTFUL... AND ALSO AGREEING TO OUR TERMS AND CONDITIONS. POLITENESS IS A MUST—TREAT OTHERS HOW YOU&apos;D WANT TO BE TREATED. EVERYONE HERE IS LOOKING FOR REASONS TO <em>PARTY</em>, SO BRING YOUR BEST VIBE AND EXPECT THE SAME FROM OTHERS. LET&apos;S PARTY RESPONSIBLY AND MAKE EVERY EXPERIENCE A GREAT ONE!</p>
        </div>
        <div className="page-actions">
          <p className="helper-copy">To proceed, accept <a href="#terms">Terms and Conditions</a></p>
          <PrimaryButton onClick={() => {
            sessionStorage.setItem('hasAcceptedTerms', 'true')
            navigate('/feed')
          }}>Accept</PrimaryButton>
        </div>
      </div>
    </main>
  )
}

function Feed() {
  const [isGateOpen, setIsGateOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <main className="page-shell feed-shell">
      <div className="page-frame feed-frame">
        <header className="feed-header"><Wordmark /><span className="feed-actions">[ ] * ☆</span></header>
        <div className="club-label">YOUR CLUB</div><div className="club-status"><strong>Bronze Club Member</strong><span>⬡</span></div>
        <div className="progress-track"><span /></div>
        <p className="token-line">🟡 YOU HAVE 0 HONORARY VIBE TOKENS!</p>
        <section className="event-card">
          <div className="event-image"><span>THE ROYAL FITNESS CLUB</span></div>
          <div className="event-details"><div><h1>Hi</h1><p className="event-type">PRIVATE PARTY</p><p className="event-host">@rahulxkumar <b>Coffee Break</b></p><div className="event-meta"><span>2:41 PM -</span><span>03/10/26 -</span><p>K2 Resto Lounge (Dine Out Cafe And Restaurant Bhopal), Kahjuri Sadak, Kol...</p></div></div><button className="button button-primary" type="button" onClick={() => setIsGateOpen(true)}>Join</button></div>
        </section>
        <nav className="feed-nav" aria-label="Decorative navigation"><span>Home</span><span>Discover</span><span>Profile</span></nav>
      </div>
      {isGateOpen && <div className="sheet-layer" role="presentation"><button className="sheet-scrim" aria-label="Close account prompt" onClick={() => setIsGateOpen(false)} /><section className="bottom-sheet" role="dialog" aria-modal="true" aria-labelledby="gate-title"><div className="sheet-handle" /><button className="sheet-close" type="button" aria-label="Close" onClick={() => setIsGateOpen(false)}>×</button><p className="eyebrow">One tiny step</p><h2 id="gate-title">You need<br /><em>an account.</em></h2><p className="body-copy">Join the room, save your spots, and keep the good nights coming.</p><PrimaryButton onClick={() => navigate('/signup/email')}>Get started</PrimaryButton><button className="button button-secondary" type="button" onClick={() => setIsGateOpen(false)}>Maybe later</button></section></div>}
    </main>
  )
}

function App() {
  return <BrowserRouter><Routes><Route path="/" element={<Splash />} /><Route path="/terms" element={<Terms />} /><Route path="/feed" element={<Feed />} /><Route path="/signup/email" element={<EmailPage />} /><Route path="/signup/verify" element={<OtpPage />} /><Route path="/signup/username" element={<InfoPage title="Create a username that fits your vibe!" label="Username" helper="All your Superlatives and Invites will come your way with this name, so make it unforgettable!" next="/signup/name" route="/signup/username" />} /><Route path="/signup/name" element={<InfoPage title={'Name, please, for the party check!'} label="Name" helper="This is the name shown as on members and requests. Cannot be changed later." next="/signup/age" route="/signup/name" />} /><Route path="/signup/age" element={<AgePage />} /><Route path="/signup/pronouns" element={<PronounsPage />} /><Route path="/signup/invite" element={<InvitePage />} /><Route path="/signup/success" element={<SuccessPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></BrowserRouter>
}

export default App
