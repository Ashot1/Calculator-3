import { FC, MouseEvent } from 'react'
import Island from '../../shared/ui/Island'
import { Theme, useTheme } from '../../../contexts/Theme.tsx'
import { AnimatePresence, motion, stagger } from 'framer-motion'
import Sun from '../../shared/ui/icons/Sun.tsx'
import Moon from '../../shared/ui/icons/Moon.tsx'
import Desktop from '../../shared/ui/icons/Desktop.tsx'
import styles from './styles.module.css'
import { useSettings } from '../../../contexts/Settings.tsx'
import useSound from 'use-sound'
import ChangeThemeSound from '../../shared/sound/change_theme.ogg'

const buttons = [
   { label: 'light', icon: <Sun /> },
   { label: 'dark', icon: <Moon /> },
   { label: 'system', icon: <Desktop /> },
]

const ThemeIsland: FC = () => {
   const { forcedTheme, setTheme } = useTheme()

   const { Volume } = useSettings()
   const [play, { sound }] = useSound(ChangeThemeSound)

   const changeTheme = (e: MouseEvent<HTMLButtonElement>) => {
      if (sound) {
         sound._volume = parseFloat(Volume) / 3
         play()
      }
      navigator.vibrate(100)
      setTheme(e.currentTarget.value as Theme)
   }

   return (
      <Island
         animateIn={{
            value: 'button',
            keyframes: { opacity: 1 },
            options: { delay: stagger(0.1) },
         }}
         animateOut={{ value: 'button', keyframes: { opacity: 0 } }}
         customSelfAnimateIn={{ keyframes: { transform: 'translateX(0)' } }}
         customSelfAnimateOut={{
            keyframes: { transform: 'translateX(100px)' },
         }}
      >
         {buttons.map((item) => (
            <motion.button
               className={styles.ThemeButton}
               key={item.label}
               initial={{ opacity: 0 }}
               onClick={changeTheme}
               value={item.label}
               data-ison={item.label === forcedTheme}
               aria-label={`Изменить цветовую тему на "${item.label}"`}
               autoFocus={item.label === forcedTheme}
            >
               {item.icon}
               <AnimatePresence>
                  {item.label === forcedTheme && (
                     <motion.span layoutId="CurrentThemeBackground" />
                  )}
               </AnimatePresence>
            </motion.button>
         ))}
      </Island>
   )
}

export default ThemeIsland
