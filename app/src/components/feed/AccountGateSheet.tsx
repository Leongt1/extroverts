import { BottomSheet } from '../ui/BottomSheet'
import { Button } from '../ui/Button'

type AccountGateSheetProps = {
  open: boolean
  onClose: () => void
  onGetStarted: () => void
}

/**
 * UI state layered over the feed, not a route: "Maybe later" simply closes it.
 */
export function AccountGateSheet({ open, onClose, onGetStarted }: AccountGateSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} title="You need an account">
      <p className="text-center text-[16px] leading-[1.5] text-fg">
        Create an account to join events, earn HVTs, and party with extroverts near you- all for
        free!
      </p>
      <Button onClick={onGetStarted}>Get started</Button>
      <Button variant="secondary" onClick={onClose}>
        Maybe later
      </Button>
    </BottomSheet>
  )
}
