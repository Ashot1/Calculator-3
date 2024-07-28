import { FC, HTMLAttributes } from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'

export type FlipLetterTextProps = {
   text: string
   additionalDelay?: number
} & HTMLAttributes<HTMLSpanElement>

const FlipLetterText: FC<FlipLetterTextProps> = ({
   text,
   children,
   className,
   additionalDelay = 0.2,
   ...props
}) => {
   return (
      <p className={clsx(styles.flippedText, className)} {...props}>
         {text.split('').map((char, i) => (
            <span
               aria-hidden
               key={char + i}
               style={{ animationDelay: `${0.05 * i + additionalDelay}s` }}
            >
               {char}
            </span>
         ))}
         {children}
      </p>
   )
}

export default FlipLetterText
