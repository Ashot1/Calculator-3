import { FC, InputHTMLAttributes } from 'react'
import styles from './styles.module.css'
import { motion, MotionProps } from 'framer-motion'
import clsx from 'clsx'

export type RangeSliderProps = Omit<
   InputHTMLAttributes<HTMLInputElement>,
   'children'
> &
   MotionProps

const RangeSlider: FC<RangeSliderProps> = ({ className, ...props }) => {
   return (
      <motion.input
         type="range"
         className={clsx(styles.RangeSlider, className)}
         {...props}
      />
   )
}

export default RangeSlider
