import { describe, expect, it } from 'vitest'
import { calculateAge, formatDateParts, isRealDate, parseDateParts } from '../date'

describe('calculateAge', () => {
  const today = new Date('2026-09-07T12:00:00Z')

  it('matches the worked case from the spec: 28/04/2015 in September 2026 is 11', () => {
    expect(calculateAge({ day: 28, month: 4, year: 2015 }, today)).toBe(11)
  })

  it('does not count a birthday that has not happened yet this year', () => {
    expect(calculateAge({ day: 25, month: 12, year: 2000 }, today)).toBe(25)
  })

  it('counts the birthday on the day itself', () => {
    expect(calculateAge({ day: 7, month: 9, year: 2008 }, today)).toBe(18)
  })

  it('is one year short the day before an 18th birthday', () => {
    expect(calculateAge({ day: 8, month: 9, year: 2008 }, today)).toBe(17)
  })

  it('handles a leap-day birthday in a non-leap year', () => {
    expect(calculateAge({ day: 29, month: 2, year: 2000 }, today)).toBe(26)
  })
})

describe('isRealDate', () => {
  it('accepts real dates', () => {
    expect(isRealDate({ day: 29, month: 2, year: 2024 })).toBe(true)
  })

  it('rejects a day that overflows the month', () => {
    expect(isRealDate({ day: 31, month: 2, year: 2001 })).toBe(false)
    expect(isRealDate({ day: 29, month: 2, year: 2023 })).toBe(false)
  })

  it('rejects out-of-range months and implausible years', () => {
    expect(isRealDate({ day: 1, month: 13, year: 2000 })).toBe(false)
    expect(isRealDate({ day: 1, month: 1, year: 1300 })).toBe(false)
  })
})

describe('date part formatting', () => {
  it('pads to DD/MM/YYYY and round-trips', () => {
    const parts = { day: 8, month: 4, year: 2001 }
    expect(formatDateParts(parts)).toBe('08/04/2001')
    expect(parseDateParts('08/04/2001')).toEqual(parts)
  })

  it('returns null for anything that is not DD/MM/YYYY', () => {
    expect(parseDateParts('')).toBeNull()
    expect(parseDateParts('2001-04-08')).toBeNull()
  })
})
