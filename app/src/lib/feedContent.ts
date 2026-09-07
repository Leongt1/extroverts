/** Clearly-fake sample content: the feed is a visual placeholder, not a real feed. */
export type FeedEvent = {
  title: string
  kind: string
  description: string
  host: string
  vibe: string
  time: string
  date: string
  place: string
  spotsLeft: number
}

export const SAMPLE_EVENT: FeedEvent = {
  title: 'Hi',
  kind: 'Private party',
  description: 'Hi',
  host: '@rahulxkumar',
  vibe: 'Coffee Break',
  time: '2:41 PM',
  date: '03/10/26',
  place: 'K2 Resto Lounge (Dine Out Cafe And Restaurant Bhopal), Kahjuri Sadak, Kol...',
  spotsLeft: 3,
}
