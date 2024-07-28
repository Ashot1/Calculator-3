import { FC, HTMLAttributes } from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'

export type RotatedButtonProps = HTMLAttributes<HTMLButtonElement>

const RotatedButton: FC<RotatedButtonProps> = ({
   children,
   className,
   ...props
}) => {
   return (
      <button className={clsx(styles.RotatedButton, className)} {...props}>
         {children}
      </button>
   )
}

export default RotatedButton
