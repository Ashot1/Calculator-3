import { useState } from 'react'

export function useStorage(
   StorageType: typeof localStorage | typeof sessionStorage,
   name: string,
   initialValue = ''
) {
   const [data, setData] = useState<string>(() => {
      try {
         const localStore = StorageType.getItem(name)

         return localStore ? localStore : initialValue
      } catch (e) {
         console.error(e)
         return initialValue
      }
   })

   const setStorage = (value: string) => {
      try {
         StorageType.setItem(name, value)
         setData(value)
      } catch (e) {
         console.error(e)
      }
   }

   return [data, setStorage] as const
}
