export default {
  toBase64 (file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      const cleanup = () => {
        reader.removeEventListener('load', onLoad)
        reader.removeEventListener('error', onError)
      }

      const onLoad = () => {
        cleanup()
        resolve(reader.result as string) // readAsDataURL returns a string
      }

      const onError = () => {
        cleanup()
        reject(reader.error)
      }

      reader.addEventListener('load', onLoad)
      reader.addEventListener('error', onError)

      reader.readAsDataURL(file)
    })
  },
}
