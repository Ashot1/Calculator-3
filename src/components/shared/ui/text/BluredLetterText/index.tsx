'use client'

import { FC, useEffect } from 'react'
import { motion, stagger, useAnimate, usePresence } from 'framer-motion'
import styles from './styles.module.css'
import clsx from 'clsx'

export type BlurredLettersTextProps = {
   text: string
   delayMultiple?: number
   exitDelayMultiple?: number
   delayAdditional?: number
   exitDelayAdditional?: number
   className?: string
   pClassName?: string
}
// & HTMLAttributes<HTMLSpanElement> &
//    Pick<MotionProps, 'initial'> &
//    Pick<MotionProps, 'animate'>

export const BlurredLettersText: FC<BlurredLettersTextProps> = ({
   text,
   delayMultiple = 0.1,
   exitDelayMultiple = 0.1,
   delayAdditional = 0,
   exitDelayAdditional = 0,
   className,
   pClassName,
   ...props
}) => {
   const [isPresent, safeToRemove] = usePresence()
   const [scope, animate] = useAnimate()

   useEffect(() => {
      if (isPresent) {
         animate(
            'p',
            { opacity: 1, y: 0, filter: 'blur(0px)' },
            {
               delay: stagger(delayMultiple, { startDelay: delayAdditional }),
            }
         )
         return
      }
      const deleteWord = async () => {
         await animate(
            'p',
            { opacity: 0, y: -20, filter: 'blur(10px)' },
            {
               delay: stagger(exitDelayMultiple, {
                  startDelay: exitDelayAdditional,
               }),
            }
         )

         safeToRemove()
      }

      deleteWord()
   }, [isPresent])

   return (
      <span className={clsx(styles.word, className)} ref={scope} {...props}>
         {text.split('').map((letter, index) => (
            <motion.p
               className={`${styles.letter} ${pClassName}`}
               key={`${letter} ${index}`}
               initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            >
               {letter}
            </motion.p>
         ))}
      </span>
   )
}
