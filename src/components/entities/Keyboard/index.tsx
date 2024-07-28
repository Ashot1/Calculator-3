import { forwardRef } from 'react'
import styles from './styles.module.css'
import TranslucentButton from '../../shared/ui/buttons/TranslucentButton'
import TranslucentButtonsRow from '../../shared/ui/buttons/TranslucentButtonsRow'
import {
   DoubledButtons,
   KeyboardArray,
   Operators,
} from '../../widgets/Calculator/model/Operators.ts'
import useSound from 'use-sound'
import ClickSound from '../../shared/sound/click2.ogg'
import { useSettings } from '../../../contexts/Settings.tsx'
import clsx from 'clsx'

export type KeyboardProps = {
   className?: string
   defaultAction: (value: string) => void
   operatorAction: (value: string) => void
}

const Keyboard = forwardRef<HTMLDivElement, KeyboardProps>(
   ({ className, defaultAction, operatorAction }, ref) => {
      const { Volume } = useSettings()
      const [play, { sound }] = useSound(ClickSound, {
         playbackRate: 2,
      })

      const defaultActionWithSound = (key: string) => {
         if (sound) sound._volume = parseInt(Volume) / 8
         play()
         defaultAction(key)
      }

      const operatorActionWithSound = (key: string) => {
         sound._volume = parseInt(Volume) / 8
         play()
         operatorAction(key)
      }

      return (
         <div ref={ref} className={clsx(styles.keyboard, className)}>
            <div className={styles.numbers}>
               <TranslucentButtonsRow
                  buttons={Operators.slice(0, 3)}
                  className={styles.rowOperators}
                  onClick={operatorActionWithSound}
               />

               {KeyboardArray.map((key) => (
                  <TranslucentButton
                     className={styles.CalcButton}
                     key={key}
                     value={key}
                     id={DoubledButtons.includes(key) ? styles.doubled : ''}
                     onClick={() => defaultActionWithSound(key)}
                  >
                     {key}
                  </TranslucentButton>
               ))}
               <TranslucentButtonsRow
                  buttons={Operators.slice(3, 9)}
                  className={styles.rowOperators}
                  onClick={operatorActionWithSound}
               />

               <TranslucentButtonsRow
                  buttons={Operators.slice(9, 12)}
                  className={styles.rowOperators}
                  onClick={operatorActionWithSound}
               />
            </div>
         </div>
      )
   }
)

export default Keyboard
