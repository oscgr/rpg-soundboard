import { Dexie, type EntityTable } from 'dexie'

interface Sound {
  id: number
  name: string // display name
  content: string // base64 audio file
  preferences: {
    loop?: boolean
    mute?: boolean
    rate?: number
    volume?: number
  }
}

const db = new Dexie('rpg-soundboard') as Dexie & {
  sounds: EntityTable<Sound, 'id'>
}
db.version(1).stores({
  sounds: '++id,&name', // Primary key and indexed props
})

export type { Sound }
export { db }
