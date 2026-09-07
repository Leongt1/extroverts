import { useNavigate } from 'react-router-dom'
import { Screen } from '../../components/layout/Screen'
import { Button } from '../../components/ui/Button'
import { CheckIcon } from '../../components/ui/icons'
import { useWizardStore } from '../../store/wizardStore'
import { ROUTES } from '../../wizard/steps'

/**
 * Explicit success state — the reference redirects silently after SIGN UP.
 */
export function SuccessPage() {
  const navigate = useNavigate()
  const { username, displayName } = useWizardStore((state) => state.values)

  return (
    <Screen>
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <span className="animate-pop-in grid size-20 place-items-center rounded-full bg-accent text-white">
          <CheckIcon width={38} height={38} />
        </span>
        <h1 className="text-[32px] leading-tight font-bold uppercase md:text-[40px]">
          You&apos;re in!
        </h1>
        <p className="max-w-[24rem] text-[16px] leading-[1.6] text-fg/85">
          Welcome, {displayName || username}. Your account is ready — the room is waiting, go make a
          little noise.
        </p>
      </div>

      <Button onClick={() => navigate(ROUTES.feed)}>Take me in</Button>
    </Screen>
  )
}
