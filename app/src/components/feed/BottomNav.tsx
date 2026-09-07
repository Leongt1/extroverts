import { ChatIcon, HomeIcon, PersonIcon, PlusIcon } from '../ui/icons'

/** Decorative only — feed navigation is out of scope for this build. */
export function BottomNav() {
  return (
    <nav
      aria-hidden="true"
      className="mt-6 flex items-center justify-around border-t border-line-soft/60 pt-4 text-fg"
    >
      <HomeIcon width={26} height={26} />
      <ChatIcon width={26} height={26} />
      <PlusIcon width={26} height={26} />
      <PersonIcon width={26} height={26} />
    </nav>
  )
}
