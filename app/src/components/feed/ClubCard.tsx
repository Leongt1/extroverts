import { TierIcon } from '../ui/icons'

type ClubCardProps = {
  tier: 'bronze' | 'silver'
  /** 0-1 share of the tier bar that is filled. */
  progress: number
  tokens: number
}

export function ClubCard({ tier, progress, tokens }: ClubCardProps) {
  const label = tier === 'silver' ? 'Silver Club Member' : 'Bronze Club Member'

  return (
    <section className="grid gap-3">
      <h2 className="text-[13px] tracking-[0.02em] uppercase">Your club</h2>

      <div className="overflow-hidden rounded-[10px] border border-fg">
        <div className="flex items-center justify-between gap-3 px-4 py-3.5">
          <span className="text-[15px] font-semibold">{label}</span>
          <TierIcon tier={tier} />
        </div>
        <div className="h-[7px] w-full bg-fg/15" aria-hidden="true">
          <span className="block h-full bg-fg" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      <p className="flex items-center gap-2 text-[13px] font-semibold tracking-[0.01em] uppercase">
        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-gold text-[11px] text-black">
          ★
        </span>
        You have {tokens} honorary vibe tokens!
      </p>
    </section>
  )
}
