import { Dexie, type EntityTable } from 'dexie'

interface Sound {
  id: number
  name: string // display name
  content: string // base64 audio file
  preferences: Record<string, string | number | boolean> // various preferences (for example, if it defaults to being looped)
}

const db = new Dexie('rpg-soundboard') as Dexie & {
  sounds: EntityTable<Sound, 'id'>
}
db.version(1).stores({
  sounds: '++id,&name', // Primary key and indexed props
})

export type { Sound }
export { db }
