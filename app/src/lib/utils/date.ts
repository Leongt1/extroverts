export type DateParts = { day: number; month: number; year: number }

export const MIN_AGE = 18
const MIN_YEAR = 1900

/** True when the parts describe a real calendar date (rejects 31/02, year 0000, ...). */
export function isRealDate({ day, month, year }: DateParts): boolean {
  if (year < MIN_YEAR || month < 1 || month > 12 || day < 1) return false
  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}

/**
 * Whole years elapsed since `parts`, i.e. the age on `today`.
 * The birthday counts only once it has passed this year.
 * Worked example from the spec: 28/04/2015 on 2026-09-07 -> 11.
 */
export function calculateAge(parts: DateParts, today: Date = new Date()): number {
  const { day, month, year } = parts
  let age = today.getFullYear() - year
  const hasHadBirthday =
    today.getMonth() + 1 > month || (today.getMonth() + 1 === month && today.getDate() >= day)
  if (!hasHadBirthday) age -= 1
  return age
}

export function formatDateParts({ day, month, year }: DateParts): string {
  const pad = (value: number, length: number) => String(value).padStart(length, '0')
  return `${pad(day, 2)}/${pad(month, 2)}/${pad(year, 4)}`
}

export function parseDateParts(value: string): DateParts | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value)
  if (!match) return null
  return { day: Number(match[1]), month: Number(match[2]), year: Number(match[3]) }
}
