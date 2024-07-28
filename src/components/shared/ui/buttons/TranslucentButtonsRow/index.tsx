import { FC, HTMLAttributes } from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'

export type TranslucentButtonsRowProps = {
   buttons: string[]
   onClick?: (value: string) => void
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onClick'>

const TranslucentButtonsRow: FC<TranslucentButtonsRowProps> = ({
   className,
   buttons,
   onClick,
   ...props
}) => {
   return (
      <div className={clsx(styles.TranslucentButtonsRow, className)} {...props}>
         {buttons.map((btn, idx) => {
            const click = () => {
               if (onClick) onClick(btn)
            }

            return (
               <button key={btn + idx} value={btn} onClick={click}>
                  {btn}
               </button>
            )
         })}
      </div>
   )
}

export default TranslucentButtonsRow
