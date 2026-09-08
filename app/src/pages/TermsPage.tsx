import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Screen } from '../components/layout/Screen'
import { BottomSheet } from '../components/ui/BottomSheet'
import { Button } from '../components/ui/Button'
import { Wordmark } from '../components/ui/Wordmark'
import { useSessionFlag } from '../hooks/useSessionFlag'
import { ROUTES } from '../wizard/steps'

const FULL_TERMS = [
  'This is a front-end demo. No account is created, no data leaves your browser, and every request on the next screens is simulated.',
  'Be kind. Show up when you say you will. Treat the people you meet the way you would want to be treated.',
  'Hosting is free, joining is free, and nobody is selling your night out to anyone.',
]

export function TermsPage() {
  const navigate = useNavigate()
  const [, markTermsAccepted] = useSessionFlag('hasAcceptedTerms')
  const [isTermsOpen, setIsTermsOpen] = useState(false)

  return (
    <Screen>
      <Wordmark />

      <p className="mt-16 text-[15px] leading-[1.6] font-bold tracking-[0.01em] uppercase md:mt-20 md:text-[17px]">
        By using this app, you&apos;re agreeing to keep things fun, safe, and respectful... and also
        agreeing to our terms and conditions. Politeness is a must—treat others how you&apos;d want
        to be treated. Everyone here is looking for reasons to <span className="text-accent">party</span>,
        so bring your best vibe and expect the same from others. Let&apos;s party responsibly and make
        every experience a great one!
      </p>

      <div className="mt-auto grid gap-4 pt-12">
        <p className="text-[15px] text-muted">
          To proceed, accept{' '}
          <button
            type="button"
            onClick={() => setIsTermsOpen(true)}
            className="cursor-pointer text-fg underline-offset-4 hover:underline"
          >
            Terms and Conditions
          </button>
        </p>
        <Button
          onClick={() => {
            markTermsAccepted()
            navigate(ROUTES.feed)
          }}
        >
          Accept
        </Button>
      </div>

      <BottomSheet
        open={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="Terms and conditions"
      >
        {FULL_TERMS.map((paragraph) => (
          <p key={paragraph} className="text-[15px] leading-[1.6] text-fg/85">
            {paragraph}
          </p>
        ))}
        <Button variant="secondary" onClick={() => setIsTermsOpen(false)}>
          Close
        </Button>
      </BottomSheet>
    </Screen>
  )
}
