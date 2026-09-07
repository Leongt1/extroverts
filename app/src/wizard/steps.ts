/** Route table and step ordering — the single source of truth for wizard navigation. */
export const ROUTES = {
  splash: '/',
  terms: '/terms',
  feed: '/feed',
  email: '/signup/email',
  verify: '/signup/verify',
  username: '/signup/username',
  name: '/signup/name',
  age: '/signup/age',
  pronouns: '/signup/pronouns',
  invite: '/signup/invite',
  success: '/signup/success',
} as const

export const STEP = {
  email: 0,
  verify: 1,
  username: 2,
  name: 3,
  age: 4,
  pronouns: 5,
  invite: 6,
  success: 7,
} as const

export type StepIndex = (typeof STEP)[keyof typeof STEP]

/** Ordered list of wizard routes, indexed by StepIndex. */
export const STEP_ROUTES = [
  ROUTES.email,
  ROUTES.verify,
  ROUTES.username,
  ROUTES.name,
  ROUTES.age,
  ROUTES.pronouns,
  ROUTES.invite,
  ROUTES.success,
] as const

/** Steps 2-5 share the "GETTING READY" template; the progress label counts those. */
export const PROGRESS_LABEL = 'Getting ready'
export const TOTAL_STEPS = STEP_ROUTES.length - 1
