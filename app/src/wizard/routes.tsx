import type { ReactNode } from 'react'
import { AgePage } from '../pages/signup/AgePage'
import { DisplayNamePage } from '../pages/signup/DisplayNamePage'
import { EmailPage } from '../pages/signup/EmailPage'
import { InvitePage } from '../pages/signup/InvitePage'
import { PronounsPage } from '../pages/signup/PronounsPage'
import { SuccessPage } from '../pages/signup/SuccessPage'
import { UsernamePage } from '../pages/signup/UsernamePage'
import { VerifyPage } from '../pages/signup/VerifyPage'
import { ROUTES, STEP, type StepIndex } from './steps'

/** Every wizard route, in order, each guarded by the step it belongs to. */
export const WIZARD_ROUTES: Array<{ path: string; step: StepIndex; element: ReactNode }> = [
  { path: ROUTES.email, step: STEP.email, element: <EmailPage /> },
  { path: ROUTES.verify, step: STEP.verify, element: <VerifyPage /> },
  { path: ROUTES.username, step: STEP.username, element: <UsernamePage /> },
  { path: ROUTES.name, step: STEP.name, element: <DisplayNamePage /> },
  { path: ROUTES.age, step: STEP.age, element: <AgePage /> },
  { path: ROUTES.pronouns, step: STEP.pronouns, element: <PronounsPage /> },
  { path: ROUTES.invite, step: STEP.invite, element: <InvitePage /> },
  { path: ROUTES.success, step: STEP.success, element: <SuccessPage /> },
]
