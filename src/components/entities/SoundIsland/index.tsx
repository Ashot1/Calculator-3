import { FC } from 'react'
import Island from '../../shared/ui/Island'
import RangeSlider from '../../shared/ui/inputs/RangeSlider'
import styles from './styles.module.css'
import { maxVolume, useSettings } from '../../../contexts/Settings.tsx'
import { animate, motion, useMotionValue } from 'framer-motion'

const SoundIsland: FC = () => {
   const { Volume, setVolume } = useSettings()
   const scaleY = useMotionValue(1)

   return (
      <Island
         customSelfAnimateIn={{ keyframes: { transform: 'translateX(0)' } }}
         customSelfAnimateOut={{
            keyframes: { transform: 'translateX(-100px)' },
         }}
         animateIn={{
            value: 'input',
            keyframes: { scaleX: 1 },
            options: { type: 'spring', stiffness: 40, mass: 1 },
         }}
         animateOut={{
            value: 'input',
            keyframes: { opacity: 0 },
         }}
      >
         <motion.div
            className={styles.wrapper}
            onHoverStart={() => animate(scaleY, 1.5)}
            onHoverEnd={() => animate(scaleY, 1)}
            onTouchStart={() => animate(scaleY, 1.5)}
            onTouchEnd={() => animate(scaleY, 1)}
         >
            <RangeSlider
               autoFocus
               aria-label="Полоса громкости звука"
               initial={{ scaleX: 0 }}
               style={{ scaleY, originX: 0 }}
               defaultValue={Volume}
               onChange={(e) => {
                  setVolume(e.currentTarget.value)
               }}
               min={0}
               max={maxVolume}
               step={0.5}
            />
         </motion.div>
      </Island>
   )
}

export default SoundIsland
