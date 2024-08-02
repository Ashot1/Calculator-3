import { CSSProperties, forwardRef } from 'react'
import styles from './styles.module.css'
import { AnimatePresence, motion } from 'framer-motion'
import RippleButton from '../../shared/ui/buttons/RippleButton'
import useSound from 'use-sound'
import HistorySound from '../../shared/sound/history_hover.ogg'
import DeleteSound from '../../shared/sound/delete.mp3'
import { useSettings } from '../../../contexts/Settings.tsx'
import clsx from 'clsx'
import Cross from '../../shared/ui/icons/Cross.tsx'
import TranslucentButton from '../../shared/ui/buttons/TranslucentButton'

export type HistoryProps = {
   className?: string
   history: string[]
   setHistory: (expression: string) => void
   elementClick: (expression: string) => void
   deleteFromHistory: (expression: number) => void
}

const History = forwardRef<HTMLDivElement, HistoryProps>(
   (
      { className, history, setHistory, elementClick, deleteFromHistory },
      ref
   ) => {
      const { Volume } = useSettings()
      const [play, { sound }] = useSound(HistorySound)
      const [deletePlay, { sound: deleteSound }] = useSound(DeleteSound)

      const clearHistory = () => {
         playDeleteSound()
         setHistory('')
      }

      const playSound = () => {
         sound._volume = parseInt(Volume)
         play()
      }

      const playDeleteSound = () => {
         deleteSound._volume = parseInt(Volume) / 5
         deletePlay()
      }

      return (
         <motion.div
            initial={{ opacity: 0, transform: 'scale(0.85)' }}
            animate={{ opacity: 1, transform: 'scale(1)' }}
            exit={{ opacity: 0, transform: 'scale(0.9)' }}
            className={clsx(styles.wrapper, className)}
            ref={ref}
         >
            <h2 className={styles.heading}>История</h2>

            <ul
               aria-label="Список предыдущих вычислений"
               className={styles.List}
               style={{ '--number': `${history.length + 1}` } as CSSProperties}
            >
               {history.length <= 0 && <li aria-label="Список пуст"></li>}
               <AnimatePresence>
                  {history.map((item, index) => {
                     const Serial = history.length - index
                     return (
                        <li key={Serial} aria-label={item}>
                           <RippleButton
                              aria-label="Повторить вычисление"
                              className={styles.listItem}
                              onHoverStart={playSound}
                              onTouchStart={playSound}
                              initial={{ opacity: 0, y: -40 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ x: -100, opacity: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 * index }}
                              onClick={() => elementClick(item)}
                           >
                              {item}
                           </RippleButton>
                           <motion.button
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{
                                 duration: 0.3,
                                 delay: 0.15 * index,
                              }}
                              exit={{ opacity: 0 }}
                              aria-label="Удалить из списка"
                              onClick={() => {
                                 playDeleteSound()
                                 deleteFromHistory(index)
                              }}
                              className={styles.deleteButton}
                           >
                              <Cross />
                           </motion.button>
                        </li>
                     )
                  })}
               </AnimatePresence>
            </ul>
            {history.length > 0 && (
               <div className={styles.buttonPosition}>
                  <TranslucentButton
                     aria-label="Очистить историю"
                     onClick={clearHistory}
                     className={styles.clearButton}
                  >
                     Очистить
                  </TranslucentButton>
               </div>
            )}
         </motion.div>
      )
   }
)

export default History
