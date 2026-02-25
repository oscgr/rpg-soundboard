import { db, type Sound } from '@/store/db.ts'

function useDB () {
  const addSound = async (sound: Omit<Sound, 'id'>) => {
    const createdSoundId = await db.sounds.add(sound)
    const createdSound = await db.sounds.get(createdSoundId)
    if (!createdSound) {
      throw new Error('Not found')
    }
    return createdSound
  }

  const patchSound = async (soundId: number, changes: Partial<Omit<Sound, 'id'>>) => {
    await db.sounds.update(soundId, changes)
    const updatedSound = await db.sounds.get(soundId)
    if (!updatedSound) {
      throw new Error('Not found')
    }
    return updatedSound
  }

  const deleteSound = async (soundId: number) => {
    await db.sounds.delete(soundId)
  }

  return {
    addSound,
    patchSound,
    deleteSound,
  }
}
export default useDB
