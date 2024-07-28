import { FC, HTMLAttributes } from 'react'
import styles from './styles.module.css'
import { motion, MotionProps } from 'framer-motion'
import clsx from 'clsx'

export type MenuButtonProps = Omit<
   HTMLAttributes<HTMLButtonElement>,
   'children'
> & { isActive?: boolean } & MotionProps

const MenuButton: FC<MenuButtonProps> = ({ className, isActive, ...props }) => {
   const nonActiveAnimations = {
      initial: { x: -40, opacity: 0 },
      animate: { x: 0, opacity: 1 },
   }

   return (
      <motion.button
         animate={{
            rotateZ: isActive ? 90 : 0,
            scale: isActive ? [0, 1] : 1,
         }}
         className={clsx(styles.MenuButton, className)}
         data-isactive={isActive}
         {...props}
      >
         <motion.span
            initial="initial"
            animate="animate"
            variants={nonActiveAnimations}
            transition={{ delay: 0.1 }}
         />
         <motion.span
            initial="initial"
            animate="animate"
            variants={nonActiveAnimations}
            transition={{ delay: 0.2 }}
         />
         {isActive && <motion.span />}
         {isActive && <motion.span />}
      </motion.button>
   )
}

export default MenuButton
