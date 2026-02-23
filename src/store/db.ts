import { Dexie, type EntityTable } from 'dexie'

interface Sound {
  id: number
  name: string // display name
  index: number
  content: string // base64 audio file
}
interface Preference {
  id: number
  correlationId: number // correlation can be a list, userId, etc.
  soundId: number
  content: Record<string, string | number | boolean> // various preferences for a specific sound (for example, if it defaults to being looped)
}

const db = new Dexie('rpg-soundboard') as Dexie & {
  sounds: EntityTable<Sound, 'id'>
  preferences: EntityTable<Preference, 'id'>
}
db.version(1).stores({
  sounds: '++id,&name', // Primary key and indexed props
  preferences: '++id, soundId, correlationId',
})

export type { Preference, Sound }
export { db }
