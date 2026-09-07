export const PRONOUN_OPTIONS = [
  'he', 'him', 'his',
  'she', 'her', 'hers',
  'they', 'them', 'theirs',
  'ze', 'zir', 'zirs',
  've', 'ver', 'vis',
]

export const MAX_PRONOUNS = 3

export type PronounSelection = { pronouns: string[]; customPronoun: string }
