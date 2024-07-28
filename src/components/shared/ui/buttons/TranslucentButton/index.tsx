import { ButtonHTMLAttributes, FC } from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'

export type TranslucentButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const TranslucentButton: FC<TranslucentButtonProps> = ({
   className,
   children,
   ...props
}) => {
   return (
      <button className={clsx(styles.TranslucentButton, className)} {...props}>
         {children}
      </button>
   )
}

export default TranslucentButton
