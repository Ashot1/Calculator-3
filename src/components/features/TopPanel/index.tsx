import { FC, memo, useState } from 'react'
import styles from './styles.module.css'
import { AnimatePresence } from 'framer-motion'
import Sun from '../../shared/ui/icons/Sun.tsx'
import Title from '../../entities/Title'
import RotatedButton from '../../shared/ui/buttons/RotatedButton'
import { maxVolume, useSettings } from '../../../contexts/Settings.tsx'
import ThemeIsland from '../../entities/ThemeIsland'
import SoundButton from '../../entities/SoundButton'
import SoundIsland from '../../entities/SoundIsland'
import useSound from 'use-sound'
import TopMenuSound from '../../shared/sound/open_menu.ogg'

type IslandState = 'sound' | 'theme' | undefined

const TopPanel: FC = memo(() => {
   const [isOpenIsland, setOpenIsland] = useState<IslandState>()
   const { Volume } = useSettings()
   const [play, { sound }] = useSound(TopMenuSound, { playbackRate: 1 })

   const currentSound = parseInt(Volume)
   const soundStates = {
      full: currentSound > maxVolume / 2,
      default: 0 < currentSound && currentSound <= maxVolume / 2,
      off: currentSound == 0,
   }

   const changeIslandState = (state: IslandState) => {
      const newState = (prev: IslandState) =>
         prev === state ? undefined : state

      return () => {
         sound._volume = parseInt(Volume) / 2
         play()
         setOpenIsland(newState)
      }
   }

   return (
      <div className={styles.wrapper}>
         <SoundButton
            onClick={changeIslandState('sound')}
            soundStates={soundStates}
         />
         <div className={styles.centerContainer}>
            <AnimatePresence mode="wait">
               {!isOpenIsland && <Title key="NoIsland" />}
               {isOpenIsland === 'theme' && <ThemeIsland key="themeIsland" />}
               {isOpenIsland === 'sound' && <SoundIsland key="soundIsland" />}
            </AnimatePresence>
         </div>
         <RotatedButton
            className={styles.SunButton}
            onClick={changeIslandState('theme')}
            aria-label="Изменить цветовую тему"
         >
            <Sun />
         </RotatedButton>
      </div>
   )
})

export default TopPanel
