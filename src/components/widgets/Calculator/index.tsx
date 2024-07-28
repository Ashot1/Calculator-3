import { FC, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import Display from '../../features/Display'
import Keyboard from '../../entities/Keyboard'
import MenuButton from '../../shared/ui/buttons/MenuButton'
import TopPanel from '../../features/TopPanel'
import { AnimatePresence, useAnimate } from 'framer-motion'
import History from '../../entities/History'
import {
   AddOperator,
   appendToString,
   changeInputWithEvent,
} from './model/KeyBoardLogic.ts'
import { useMatchMedia } from '../../../hooks/MatchMedia.ts'
import { getResult } from './model/CalculatorLogic.ts'
import KeyboardSound from '../../shared/sound/open_keyboard.ogg'
import useSound from 'use-sound'
import { useSettings } from '../../../contexts/Settings.tsx'
import { useHistory } from '../../../hooks/History.ts'

const Calculator: FC = () => {
   const isMobile = useMatchMedia(500)
   const InputElement = useRef<HTMLInputElement>(null)
   const [scope, animate] = useAnimate()

   // history
   const { putToHistory, setHistory, HistoryArray, deleteFromHistory } =
      useHistory()
   const [IsOpenHistory, setIsOpenHistory] = useState(false)
   const [LastExpression, setLastExpression] = useState('')

   const elementHistoryClick = (value: string) => {
      const data = value.split('=')
      setLastExpression(data[0])

      if (!InputElement.current) return
      changeInputWithEvent({
         input: InputElement.current,
         cursorIndex: data.at(1)?.length || 0,
         newValue: data.at(1) || '0',
      })
   }

   const OpenHistory = () =>
      setIsOpenHistory((prev) => {
         sound._volume = parseInt(Volume)
         play()
         animate(scope.current, {
            transform: !prev ? 'translateY(101%)' : 'translateY(0)',
            display: !prev ? 'none' : 'flex',
         })
         return !prev
      })

   useEffect(() => {
      // при window resize изменяем состояния

      if (isMobile == false) {
         setIsOpenHistory(true)
         scope.current.style.transform = 'translateY(0)'
         scope.current.style.display = 'flex'
      }
      if (isMobile == true) setIsOpenHistory(false)
   }, [isMobile])

   // sound
   const { Volume } = useSettings()
   const [play, { sound }] = useSound(KeyboardSound, {
      playbackRate: 3,
   })

   const afterResult = (expression: string) => {
      putToHistory(expression)
      setLastExpression(expression.split('=')[0])
   }
   // нажатие на обычные кнопки, которые просто добавляются
   const addToInput = (value: string) => {
      if (!InputElement.current) return

      const cursorIndex =
         InputElement.current.selectionStart ??
         InputElement.current.value.length

      const prevValue = InputElement.current.value

      const newValue = appendToString(prevValue, cursorIndex, value)

      changeInputWithEvent({
         input: InputElement.current,
         cursorIndex: cursorIndex + value.length,
         newValue,
      })
   }

   // нажатие на кнопки, которые требуют логики
   const operatorsCallback = (operator: string) => {
      if (!InputElement.current) return
      AddOperator({
         operator,
         input: InputElement.current,
         putToHistory: afterResult,
      })
   }

   return (
      <div className={styles.calculator}>
         <TopPanel />
         <Display
            prevValue={LastExpression}
            ref={InputElement}
            className={styles.display}
            resultFunction={(value) => {
               const res = getResult(value)
               afterResult(value + ' = ' + res)
               return res
            }}
         >
            <MenuButton
               isActive={IsOpenHistory}
               onClick={OpenHistory}
               className={styles.hideWhenDesktop}
               aria-label={
                  IsOpenHistory ? 'Открыть клавиатуру' : 'Открыть историю'
               }
            />
         </Display>
         <section className={styles.bottomBlock}>
            <AnimatePresence>
               {IsOpenHistory && (
                  <History
                     history={HistoryArray}
                     setHistory={setHistory}
                     elementClick={elementHistoryClick}
                     deleteFromHistory={deleteFromHistory}
                  />
               )}
            </AnimatePresence>
            <Keyboard
               ref={scope}
               className={styles.keyboard}
               defaultAction={addToInput}
               operatorAction={operatorsCallback}
            />
         </section>
      </div>
   )
}

export default Calculator
