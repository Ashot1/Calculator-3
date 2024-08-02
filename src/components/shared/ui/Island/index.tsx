import { FC, ReactNode, useEffect } from 'react'
import {
   DOMKeyframesDefinition,
   DynamicAnimationOptions,
   ElementOrSelector,
   motion,
   useAnimate,
   usePresence,
} from 'framer-motion'
import styles from './styles.module.css'

type CustomAnimate = {
   value: ElementOrSelector
   keyframes: DOMKeyframesDefinition
   options?: DynamicAnimationOptions | undefined
}

export type IslandProps = {
   children?: ReactNode
   animateIn?: CustomAnimate
   animateOut?: CustomAnimate
   customSelfAnimateIn?: Omit<CustomAnimate, 'value'>
   customSelfAnimateOut?: Omit<CustomAnimate, 'value'>
}

const Island: FC<IslandProps> = ({
   children,
   animateOut,
   animateIn,
   customSelfAnimateIn,
   customSelfAnimateOut,
}) => {
   const [isPresence, SafeToRemove] = usePresence()
   const [scope, animate] = useAnimate()

   useEffect(() => {
      const createMenu = async () => {
         await animate(
            scope.current,
            { scale: 1, opacity: 1, ...customSelfAnimateIn?.keyframes },
            customSelfAnimateIn?.options
         )
         await animate('#island', { width: 'auto', height: 'auto' })
         if (animateIn)
            await animate(
               animateIn.value,
               animateIn.keyframes,
               animateIn.options
            )
      }

      if (isPresence) {
         createMenu()
         return
      }

      const deleteMenu = async () => {
         if (animateOut)
            await animate(
               animateOut.value,
               animateOut.keyframes,
               animateOut.options
            )
         await animate('#island', { width: 50, height: 20 })
         await animate(
            scope.current,
            { scale: 0.8, opacity: 0, ...customSelfAnimateOut?.keyframes },
            customSelfAnimateOut?.options
         )

         SafeToRemove()
      }

      deleteMenu()
   }, [isPresence])

   return (
      <motion.div
         ref={scope}
         className={styles.Wrapper}
         /*
         // @ts-ignore */
         initial={{
            scale: 0.8,
            opacity: 0.5,
            ...customSelfAnimateOut?.keyframes,
         }}
      >
         <motion.div
            initial={{ width: 50, height: 20 }}
            id="island"
            className={styles.Island}
         >
            {children}
         </motion.div>
      </motion.div>
   )
}

export default Island
