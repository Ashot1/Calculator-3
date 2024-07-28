import { createContext, ReactNode, useContext } from 'react'
import { useStorage } from '../hooks/BrowserStorage.ts'

type SettingsContextReturn = {
   Volume: string
   setVolume: (value: string) => void
}

export const maxVolume = 20
export const defaultVolume = 1

const checkSoundValue = (value: string) => {
   const parsedValue = parseInt(value)

   if (parsedValue > maxVolume) return `${maxVolume}`
   if (parsedValue < 0) return `${0}`
   if (isNaN(parsedValue)) return `${defaultVolume}`

   return value
}

const SettingsContext = createContext<SettingsContextReturn>({
   Volume: `${defaultVolume}`,
   setVolume: () => {},
})

export default function SettingsProvider({
   children,
}: {
   children: ReactNode
}) {
   const [Sound, setSound] = useStorage(
      localStorage,
      'Sound',
      `${defaultVolume}`
   )

   const checkedSound = (value: string) => setSound(checkSoundValue(value))

   return (
      <SettingsContext.Provider
         value={{ Volume: checkSoundValue(Sound), setVolume: checkedSound }}
      >
         {children}
      </SettingsContext.Provider>
   )
}

export const useSettings = () => useContext(SettingsContext)
