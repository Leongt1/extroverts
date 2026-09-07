import { BellIcon, MailIcon, StarIcon } from '../ui/icons'
import { Wordmark } from '../ui/Wordmark'

/** Static feed chrome — decorative for this build, per the placeholder scope. */
export function FeedHeader({ unreadCount }: { unreadCount: number }) {
  return (
    <header className="flex items-center justify-between">
      <Wordmark size="sm" className="text-[32px]" />
      <div className="flex items-center gap-4" aria-hidden="true">
        <span className="flex items-center gap-2 rounded-full border border-fg/70 px-3 py-1.5">
          <MailIcon width={18} height={18} className="text-accent" />
          <span className="text-[15px] font-medium">{unreadCount}</span>
        </span>
        <BellIcon width={26} height={26} />
        <StarIcon width={26} height={26} />
      </div>
    </header>
  )
}
