import Calculator from './components/widgets/Calculator'
import ThemeProvider, { useTheme } from './contexts/Theme.tsx'
import { Toaster } from 'sonner'
import SettingsProvider from './contexts/Settings.tsx'

function App() {
   return (
      <ThemeProvider>
         <SettingsProvider>
            <ToasterRoot />
            <main className="mainLayout">
               <Calculator />
            </main>
         </SettingsProvider>
      </ThemeProvider>
   )
}

export default App

const ToasterRoot = () => {
   const { forcedTheme } = useTheme()
   return (
      <Toaster
         position="top-right"
         containerAriaLabel="Уведомления"
         theme={forcedTheme}
         visibleToasts={3}
         richColors
      />
   )
}
