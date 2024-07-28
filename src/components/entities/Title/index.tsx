import { FC } from 'react'
import { BlurredLettersText } from '../../shared/ui/text/BluredLetterText'
import styles from './styles.module.css'

const Title: FC = () => {
   return (
      <h1 className={styles.heading}>
         <BlurredLettersText
            text="Calculator-3"
            className={styles.title}
            pClassName={styles.letter}
            delayMultiple={0.07}
            delayAdditional={0.2}
            exitDelayMultiple={0.02}
         />
      </h1>
   )
}

export default Title
