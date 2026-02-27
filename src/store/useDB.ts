import { db, type Sound } from '@/store/db.ts'

function useDB () {
  const addSound = async (sound: Omit<Sound, 'id'>) => {
    const createdSoundId = await db.sounds.add(sound)
    const createdSound = await db.sounds.get(createdSoundId)
    if (!createdSound) {
      throw new Error('Not found')
    }
    console.debug(`[db] created sound (id=${createdSoundId})`)
    return createdSound
  }

  const patchSound = async (soundId: number, changes: Partial<Omit<Sound, 'id'>>) => {
    await db.sounds.update(soundId, changes)
    const updatedSound = await db.sounds.get(soundId)
    if (!updatedSound) {
      throw new Error('Not found')
    }
    console.debug(`[db] patched sound (id=${soundId}, preferences=${JSON.stringify(changes)})`)
    return updatedSound
  }

  const patchSoundPreferences = async (soundId: number, changes: Partial<Sound['preferences']>) => {
    const soundToUpdate = await db.sounds.get(soundId)
    if (!soundToUpdate || !soundToUpdate.preferences) {
      throw new Error('Not found')
    }

    await db.sounds.update(soundId, { preferences: {
      ...soundToUpdate?.preferences,
      ...changes,
    } })
    const updatedSound = await db.sounds.get(soundId)
    if (!updatedSound) {
      throw new Error('Not found')
    }
    console.debug(`[db] patched sound preferences (id=${soundId}, preferences=${JSON.stringify(changes)})`)
    return updatedSound
  }

  const deleteSound = async (soundId: number) => {
    await db.sounds.delete(soundId)
    console.debug(`[db] deleted sound (id=${soundId})`)
  }

  return {
    addSound,
    patchSound,
    deleteSound,
    patchSoundPreferences,
  }
}
export default useDB
