import { z } from 'zod'

export const USERNAME_MIN = 3
export const USERNAME_MAX = 20
export const DISPLAY_NAME_MAX = 40
export const OTP_LENGTH = 6

const requiredText = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)

export const emailSchema = z.object({
  email: requiredText('Email').email('Enter a valid email address'),
  newsletterOptIn: z.boolean(),
})
export type EmailFormValues = z.infer<typeof emailSchema>

export const usernameSchema = z.object({
  username: requiredText('Username')
    .min(USERNAME_MIN, `Username must be ${USERNAME_MIN}-${USERNAME_MAX} characters`)
    .max(USERNAME_MAX, `Username must be ${USERNAME_MIN}-${USERNAME_MAX} characters`)
    .regex(/^[a-zA-Z0-9._]+$/, 'Use letters, numbers, dots or underscores only'),
})
export type UsernameFormValues = z.infer<typeof usernameSchema>

export const displayNameSchema = z.object({
  displayName: requiredText('Name').max(
    DISPLAY_NAME_MAX,
    `Name must be ${DISPLAY_NAME_MAX} characters or fewer`,
  ),
})
export type DisplayNameFormValues = z.infer<typeof displayNameSchema>

export const inviteSchema = z.object({
  inviteCode: z.string().trim().max(16, 'Invite codes are 16 characters or fewer'),
})
export type InviteFormValues = z.infer<typeof inviteSchema>
