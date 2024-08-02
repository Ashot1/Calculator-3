import { FC } from 'react'
import { BlurredLettersText } from '../../shared/ui/text/BluredLetterText'
import styles from './styles.module.css'

const Title: FC<{ text: string; onClick?: () => void }> = ({
   text,
   onClick,
}) => {
   const Component = onClick ? 'button' : 'h1'

   return (
      <Component className={styles.heading} onClick={onClick}>
         <BlurredLettersText
            text={text}
            className={styles.title}
            pClassName={styles.letter}
            delayMultiple={0.07}
            delayAdditional={0.2}
            exitDelayMultiple={0.02}
         />
      </Component>
   )
}

export default Title
