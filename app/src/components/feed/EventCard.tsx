import type { FeedEvent } from '../../lib/feedContent'
import { Button } from '../ui/Button'
import { CalendarIcon, ClockIcon, PinIcon, TierIcon } from '../ui/icons'
import { EventFlyer } from './EventFlyer'

type EventCardProps = {
  event: FeedEvent
  isAuthenticated: boolean
  onJoin: () => void
}

export function EventCard({ event, isAuthenticated, onJoin }: EventCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl bg-card">
      <div className="grid gap-4 p-4">
        <EventFlyer />

        <div className="flex items-start justify-between gap-4">
          <div className="grid gap-1">
            <h3 className="text-[24px] leading-none font-bold">{event.title}</h3>
            <p className="text-[13px] tracking-[0.02em] text-fg/80 uppercase">{event.kind}</p>
          </div>
          <TierIcon tier="silver" width={34} height={34} />
        </div>

        {!isAuthenticated && <p className="text-[13px] text-muted">{event.description}</p>}

        <div className="flex items-center justify-between gap-3">
          <span className="text-[16px] font-semibold">{event.host}</span>
          <span className="rounded-full bg-gold px-4 py-1.5 text-[14px] font-semibold text-white">
            ☕ {event.vibe}
          </span>
        </div>

        <dl className="grid grid-cols-2 overflow-hidden rounded-[10px] border border-line-soft text-[14px]">
          <div className="flex items-center justify-between gap-2 border-b border-line-soft p-3.5">
            <dt className="sr-only">Time</dt>
            <dd>{event.time}</dd>
            <ClockIcon />
          </div>
          <div className="flex items-center justify-between gap-2 border-b border-l border-line-soft p-3.5">
            <dt className="sr-only">Date</dt>
            <dd>{event.date}</dd>
            <CalendarIcon />
          </div>
          <div className="col-span-2 flex items-center justify-between gap-3 p-3.5">
            <dt className="sr-only">Location</dt>
            <dd className="leading-[1.45]">{event.place}</dd>
            <PinIcon className="shrink-0" />
          </div>
        </dl>

        <Button onClick={onJoin}>{isAuthenticated ? 'View flyer' : 'Join'}</Button>
      </div>

      {isAuthenticated && (
        <p className="bg-gold-dim py-2 text-center text-[14px] font-semibold">
          {event.spotsLeft} spots left!
        </p>
      )}
    </article>
  )
}
