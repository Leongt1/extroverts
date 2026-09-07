import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountGateSheet } from '../components/feed/AccountGateSheet'
import { BottomNav } from '../components/feed/BottomNav'
import { ClubCard } from '../components/feed/ClubCard'
import { EventCard } from '../components/feed/EventCard'
import { FeedHeader } from '../components/feed/FeedHeader'
import { SAMPLE_EVENT } from '../lib/feedContent'
import { Screen } from '../components/layout/Screen'
import { useWizardStore } from '../store/wizardStore'
import { ROUTES } from '../wizard/steps'

/**
 * Teaser feed — a static visual placeholder in both states.
 * Pre-auth the only live control is JOIN, which opens the account gate;
 * post-auth the same layout shows the real starting state of a new account.
 */
export function FeedPage() {
  const navigate = useNavigate()
  const isAuthenticated = useWizardStore((state) => state.isAuthenticated)
  const [isGateOpen, setIsGateOpen] = useState(false)

  return (
    <Screen tone="surface" padded={false}>
      <div className="flex flex-1 flex-col gap-4 px-4 pt-8 pb-8">
        <FeedHeader unreadCount={isAuthenticated ? 3 : 0} />

        <ClubCard
          tier={isAuthenticated ? 'bronze' : 'silver'}
          progress={isAuthenticated ? 0 : 0.68}
          tokens={isAuthenticated ? 0 : 160}
        />

        <EventCard
          event={SAMPLE_EVENT}
          isAuthenticated={isAuthenticated}
          onJoin={() => !isAuthenticated && setIsGateOpen(true)}
        />

        {isAuthenticated && <BottomNav />}
      </div>

      <AccountGateSheet
        open={isGateOpen}
        onClose={() => setIsGateOpen(false)}
        onGetStarted={() => navigate(ROUTES.email)}
      />
    </Screen>
  )
}
