import { ButtonHTMLAttributes, FC } from 'react'
import styles from './styles.module.css'
import { AnimatePresence } from 'framer-motion'
import SoundFull from '../../shared/ui/icons/SoundFull.tsx'
import SoundOff from '../../shared/ui/icons/SoundOff.tsx'
import SoundOn from '../../shared/ui/icons/SoundOn.tsx'
import clsx from 'clsx'

type SoundButtonProps = {
   soundStates: {
      full: boolean
      default: boolean
      off: boolean
   }
} & ButtonHTMLAttributes<HTMLButtonElement>

const SoundButton: FC<SoundButtonProps> = ({
   onClick,
   soundStates,
   className,
   ...props
}) => {
   return (
      <button
         className={clsx(styles.SoundButton, className)}
         onClick={onClick}
         {...props}
         aria-label="Изменить громкость звуковых эффектов"
      >
         <AnimatePresence mode="wait">
            {soundStates.full && (
               <SoundFull
                  key="SoundFullIcon"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
               />
            )}
            {soundStates.default && (
               <SoundOn
                  key="SoundOnIcon"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
               />
            )}
            {soundStates.off && (
               <SoundOff
                  key="SoundOffIcon"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
               />
            )}
         </AnimatePresence>
      </button>
   )
}

export default SoundButton
