import {
   createContext,
   ReactNode,
   useCallback,
   useContext,
   useEffect,
} from 'react'
import { useStorage } from '../hooks/BrowserStorage.ts'
import { useMatchMedia } from '../hooks/MatchMedia.ts'

export type Theme = 'dark' | 'light' | 'system'
const ThemeList = ['system', 'dark', 'light']

type ThemeContextReturn = {
   forcedTheme: Theme
   setTheme: (forcedTheme: Theme) => void
   theme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextReturn>({
   forcedTheme: 'system',
   setTheme: () => {},
   theme: 'light',
})

export default function ThemeProvider({ children }: { children: ReactNode }) {
   const [ThemeStorage, setThemeStorage] = useStorage(
      localStorage,
      'theme',
      'system'
   )

   const isDarkMode = useMatchMedia('(prefers-color-scheme: dark)')

   const getTheme = useCallback((): 'dark' | 'light' => {
      if (ThemeStorage === 'system') {
         return isDarkMode ? 'dark' : 'light'
      }

      return ThemeStorage as 'dark' | 'light'
   }, [isDarkMode, ThemeStorage])

   useEffect(() => {
      if (!ThemeList.includes(ThemeStorage)) {
         setThemeStorage('system')
      }

      const doc = document.documentElement
      const metaTag = document.querySelector('meta[name="theme-color"]')
      const SelectedTheme = getTheme()
      doc.className = SelectedTheme
      if (metaTag)
         metaTag.setAttribute(
            'content',
            SelectedTheme === 'dark' ? '#0a0524' : '#f9f9f9'
         )
   }, [getTheme])

   const setTheme = (forcedTheme: Theme) => setThemeStorage(forcedTheme)

   return (
      <ThemeContext.Provider
         value={{
            forcedTheme: ThemeStorage as Theme,
            setTheme,
            theme: getTheme(),
         }}
      >
         {children}
      </ThemeContext.Provider>
   )
}

export const useTheme = () => useContext(ThemeContext)
