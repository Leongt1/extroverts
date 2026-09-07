import { describe, expect, it } from 'vitest'
import { displayNameSchema, emailSchema, usernameSchema } from '../validation'

const messageFor = (schema: { safeParse: (value: unknown) => { success: boolean; error?: { issues: Array<{ message: string }> } } }, value: unknown) => {
  const result = schema.safeParse(value)
  return result.success ? null : result.error!.issues[0].message
}

describe('emailSchema', () => {
  it('rejects an empty or whitespace-only address', () => {
    expect(messageFor(emailSchema, { email: '   ', newsletterOptIn: false })).toBe('Email is required')
  })

  it('rejects a malformed address', () => {
    expect(messageFor(emailSchema, { email: 'noel@', newsletterOptIn: false })).toBe(
      'Enter a valid email address',
    )
  })

  it('accepts a valid address', () => {
    expect(emailSchema.safeParse({ email: 'noel@example.com', newsletterOptIn: true }).success).toBe(
      true,
    )
  })
})

describe('usernameSchema', () => {
  it('states the real limit rather than a generic message', () => {
    expect(messageFor(usernameSchema, { username: 'ab' })).toBe(
      'Username must be 3-20 characters',
    )
    expect(messageFor(usernameSchema, { username: 'a'.repeat(21) })).toBe(
      'Username must be 3-20 characters',
    )
  })

  it('rejects whitespace-only input', () => {
    expect(messageFor(usernameSchema, { username: '     ' })).toBe('Username is required')
  })

  it('accepts a valid handle', () => {
    expect(usernameSchema.safeParse({ username: 'noel.thomas_28' }).success).toBe(true)
  })
})

describe('displayNameSchema', () => {
  it('rejects whitespace-only input', () => {
    expect(messageFor(displayNameSchema, { displayName: '  ' })).toBe('Name is required')
  })

  it('caps the length', () => {
    expect(messageFor(displayNameSchema, { displayName: 'x'.repeat(41) })).toBe(
      'Name must be 40 characters or fewer',
    )
  })
})
