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
    <Screen tone="surface" padded={false} desktop="bleed">
      {/* Top bar: inline on mobile (reference), a full-bleed sticky nav on desktop. */}
      <div className="pt-8 md:pt-10 lg:sticky lg:top-0 lg:z-20 lg:border-b lg:border-line-soft/60 lg:bg-surface/90 lg:pt-0 lg:backdrop-blur">
        <div className="mx-auto w-full px-4 pb-4 md:max-w-[640px] lg:max-w-[1000px] lg:px-8 lg:py-4">
          <FeedHeader unreadCount={isAuthenticated ? 3 : 0} />
        </div>
      </div>

      {/* Feed body: one column on mobile/tablet, feed + sticky sidebar on desktop. */}
      <div className="mx-auto grid w-full gap-4 px-4 pb-8 md:max-w-[640px] lg:max-w-[1000px] lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8 lg:px-8 lg:pt-8 lg:pb-12">
        {/* Club card: kept first for the mobile order; moves to the right rail on desktop. */}
        <div className="lg:col-start-2 lg:row-start-1">
          <div className="lg:sticky lg:top-24">
            <ClubCard
              tier={isAuthenticated ? 'bronze' : 'silver'}
              progress={isAuthenticated ? 0 : 0.68}
              tokens={isAuthenticated ? 0 : 160}
            />
          </div>
        </div>

        {/* Main feed column. */}
        <div className="lg:col-start-1 lg:row-start-1">
          <EventCard
            event={SAMPLE_EVENT}
            isAuthenticated={isAuthenticated}
            onJoin={() => !isAuthenticated && setIsGateOpen(true)}
          />
        </div>

        {/* Bottom nav is a mobile idiom, so it stays off the desktop layout. */}
        {isAuthenticated && (
          <div className="lg:hidden">
            <BottomNav />
          </div>
        )}
      </div>

      <AccountGateSheet
        open={isGateOpen}
        onClose={() => setIsGateOpen(false)}
        onGetStarted={() => navigate(ROUTES.email)}
      />
    </Screen>
  )
}
