import { forwardRef, ReactNode } from 'react'
import ResizableInput from '../../shared/ui/inputs/ResizableInput'
import styles from './styles.module.css'
import FlipLetterText from '../../shared/ui/text/FlipLetterText'
import { toast } from 'sonner'
import clsx from 'clsx'

export type InputWrapperProps = {
   resultFunction: (value: string) => string
   className?: string
   children?: ReactNode
   prevValue?: string
}

const Display = forwardRef<HTMLInputElement, InputWrapperProps>(
   ({ children, className, resultFunction, prevValue = '' }, ref) => {
      const copyToClipboard = async () => {
         try {
            await navigator.clipboard.writeText(prevValue)
            toast.success('Скопировано в буфер обмена')
         } catch (error) {
            toast.error('Ошибка копирования')
            console.error('Failed to copy: \n', error)
         }
      }

      return (
         <div className={clsx(styles.wrapper, className)}>
            <div className={styles.leftButtonWrapper}>{children}</div>
            <section>
               <div className={styles.prevInfo}>
                  <button
                     onClick={copyToClipboard}
                     aria-label={`Скопировать пример - "${prevValue}"`}
                  >
                     <FlipLetterText text={prevValue} />
                  </button>
               </div>
               <label className={styles.label} aria-label="Поле ввода">
                  <ResizableInput
                     onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                           e.currentTarget.value = resultFunction(
                              e.currentTarget.value
                           )
                        }
                     }}
                     ref={ref}
                     placeholder="0"
                     className={styles.input}
                     maxLength={100}
                     enterKeyHint="done"
                  />
               </label>
            </section>
         </div>
      )
   }
)

export default Display
