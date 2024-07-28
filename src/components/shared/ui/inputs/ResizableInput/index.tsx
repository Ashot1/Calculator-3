import { ChangeEvent, forwardRef, InputHTMLAttributes, useState } from 'react'
import { ControlledInput, UncontrolledInput } from '../../../model/types.ts'
import styles from './styles.module.css'
import { useMatchMedia } from '../../../../../hooks/MatchMedia.ts'
import clsx from 'clsx'

export type ResizableInputProps = InputHTMLAttributes<HTMLInputElement> &
   (ControlledInput | UncontrolledInput)

const ResizableInput = forwardRef<HTMLInputElement, ResizableInputProps>(
   ({ className, style, value, setValue, onChange, ...props }, ref) => {
      const isMobile = useMatchMedia(768)
      const [LettersCount, setLettersCount] = useState(0)

      const MaxInputLen = isMobile ? 10 : 25

      const lettersCount = () => {
         if (value)
            return value.length > MaxInputLen ? value.length / MaxInputLen : 1
         return LettersCount > MaxInputLen ? LettersCount / MaxInputLen : 1
      }

      const controlledChange = (e: ChangeEvent<HTMLInputElement>) => {
         if (setValue) setValue(e.currentTarget.value)
      }

      const uncontrolledChange = (e: ChangeEvent<HTMLInputElement>) => {
         setLettersCount(e.currentTarget.value.length)
         if (onChange) onChange(e)
      }

      return (
         <input
            ref={ref}
            className={clsx(styles.resizableInput, className)}
            style={{
               fontSize: `${
                  lettersCount() < 2 ? 36 / lettersCount() : 36 / 2
               }px`,
               ...style,
            }}
            onChange={setValue ? controlledChange : uncontrolledChange}
            value={value}
            {...props}
         />
      )
   }
)

export default ResizableInput
