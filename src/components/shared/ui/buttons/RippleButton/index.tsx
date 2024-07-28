import { ButtonHTMLAttributes, FC, MouseEvent, TouchEvent } from 'react'
import styles from './styles.module.css'
import { motion, MotionProps, useAnimate } from 'framer-motion'
import { getMouseCoords, getStartTouchCoords } from '../../../model/utils.ts'
import clsx from 'clsx'

export type RippleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
   MotionProps

const RippleButton: FC<RippleButtonProps> = ({
   children,
   className,
   onTouchStart,
   onTouchEnd,
   onMouseEnter,
   onMouseLeave,
   ...props
}) => {
   const [scope, animate] = useAnimate()

   const changeCoords = (
      e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
   ) => {
      let x, y

      if (e.type === 'mouseenter' || e.type === 'mouseleave') {
         const { x: coordX, y: coordY } = getMouseCoords(
            e as MouseEvent<HTMLButtonElement>
         )
         x = coordX
         y = coordY
      }

      if (e.type === 'touchstart' || e.type === 'touchend') {
         const { x: coordX, y: coordY } = getStartTouchCoords(
            e as TouchEvent<HTMLButtonElement>
         )
         x = coordX
         y = coordY
      }

      scope.current.style.left = x
      scope.current.style.top = y
   }

   const additionalFunctions = (
      e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
   ) => {
      if (e.type === 'mouseenter' && onMouseEnter)
         onMouseEnter(e as MouseEvent<HTMLButtonElement>)

      if (e.type === 'mouseleave' && onMouseLeave)
         onMouseLeave(e as MouseEvent<HTMLButtonElement>)

      if (e.type === 'touchstart' && onTouchStart)
         onTouchStart(e as TouchEvent<HTMLButtonElement>)

      if (e.type === 'touchend' && onTouchEnd)
         onTouchEnd(e as TouchEvent<HTMLButtonElement>)
   }

   const onEnter = (
      e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
   ) => {
      changeCoords(e)

      animate(
         scope.current,
         {
            height: ['10px', '600px', '1000px', '1500px', '300%'],
            width: ['10px', '600px', '1000px', '1500px', '300%'],
         },
         { ease: 'circIn', duration: 0.7 }
      )
      additionalFunctions(e)
   }

   const onLeave = (
      e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
   ) => {
      changeCoords(e)

      animate(
         scope.current,
         { height: 0, width: 0 },
         { duration: 0.3, ease: 'circOut' }
      )

      additionalFunctions(e)
   }

   return (
      <motion.button
         className={clsx(styles.rippleButton, className)}
         onMouseEnter={onEnter}
         onMouseLeave={onLeave}
         onTouchStart={onEnter}
         onTouchEnd={onLeave}
         {...props}
      >
         {children}
         <motion.span
            ref={scope}
            id="ripple"
            initial={{ width: 0, height: 0 }}
            className={styles.ripple}
         />
      </motion.button>
   )
}

export default RippleButton
