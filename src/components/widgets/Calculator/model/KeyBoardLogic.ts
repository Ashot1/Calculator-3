import { MaskedOperators, Operators } from './Operators.ts'
import { getResult } from './CalculatorLogic.ts'

// функция для добавления символа в строку на указанной позиции
export const appendToString = (
   string: string,
   index: number,
   value: string
) => {
   if (index < 0 || index > string.length) return string

   if (index === string.length) return string + value

   return string.slice(0, index) + value + string.slice(index)
}

// функция для изменения input с созданием event и перемещением курсора
type changeInputWithEventProps = {
   input: HTMLInputElement
   newValue: string
   cursorIndex: number
}

export const changeInputWithEvent = ({
   newValue,
   input,
   cursorIndex,
}: changeInputWithEventProps) => {
   const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
   )
   if (!nativeInputValueSetter?.set) return

   nativeInputValueSetter.set.call(input, newValue)
   const event = new Event('input', { bubbles: true })
   input.dispatchEvent(event)
   input.focus()
   input.setSelectionRange(cursorIndex, cursorIndex)
   input.blur()
}

// функция для добавления оператора в input
export type AddOperatorProps = {
   input: HTMLInputElement
   operator: string
   putToHistory?: (expression: string) => void
}

export const AddOperator = ({
   input,
   operator,
   putToHistory,
}: AddOperatorProps) => {
   const currentValue = input.value
   const currentCursorIndex = input.selectionStart ?? 0

   let newValue = currentValue
   let newCursorIndex = currentCursorIndex

   const prevSymbol = currentValue[currentCursorIndex - 1]
   const nextSymbol = currentValue[currentCursorIndex]

   const isMaskedOperator =
      MaskedOperators.includes(prevSymbol) ||
      MaskedOperators.includes(nextSymbol)

   const isOperator =
      Operators.includes(prevSymbol) || Operators.includes(nextSymbol)

   const OperatorApproved = !!currentValue && !isMaskedOperator && !isOperator

   // присвоение каждому оператору своей функции для изменения нового значения
   const defaultFunction = (value: string, Condition = OperatorApproved) => {
      if (!Condition) return
      newValue = appendToString(newValue, newCursorIndex, value)
      newCursorIndex += value.length
   }

   switch (operator) {
      case 'C':
         newValue = ''
         newCursorIndex = 0
         break

      case '⌫':
         if (!prevSymbol) break
         newValue =
            currentValue.slice(0, newCursorIndex - 1) +
            currentValue.slice(newCursorIndex)
         newCursorIndex--
         break

      case '(':
         defaultFunction('(', true)
         break

      case ')':
         defaultFunction(')', OperatorApproved || prevSymbol === ')')
         break

      case '-':
         defaultFunction(
            '-',
            OperatorApproved ||
               prevSymbol === '(' ||
               prevSymbol === ')' ||
               !currentValue
         )
         break

      case '+':
         defaultFunction(
            '+',
            OperatorApproved || prevSymbol === '(' || prevSymbol === ')'
         )
         break

      case '×':
         defaultFunction('*')
         break

      case '÷':
         defaultFunction('/')
         break

      case '^':
         defaultFunction('**')
         break

      case '√':
         defaultFunction('√', prevSymbol !== '√')
         break

      case '.':
         defaultFunction('.')
         break

      case '=':
         if (
            !Operators.includes(newValue.slice(-1)) ||
            newValue.slice(-1) === ')'
         ) {
            const answer = getResult(newValue)
            putToHistory?.(`${currentValue} = ${answer}`)
            newValue = answer
            newCursorIndex = newValue.length
         }
         break
   }

   // выполнение преобразования на основе новых данных
   changeInputWithEvent({ newValue, input, cursorIndex: newCursorIndex })
}
