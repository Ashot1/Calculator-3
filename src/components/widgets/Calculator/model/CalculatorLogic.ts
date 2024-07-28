// type Operators = '+' | '-' | '*' | '/' | '(' | ')' | '√'

const OperatorsRegExp = /(\(|\)|\+|\-|\*|\/|\√)/

// функция для получения ответа из обработанной строки
const Calculate = (value: string): string => {
   try {
      return new Function('return ' + value)().toString()
   } catch (e) {
      console.error('Ошибка вычисления: \n', e)
      return `Ошибка`
   }
}

// функция для преобразования знака '√' в '**(1/2)'
const transformSQRT = (Numbers: (string | number)[], indexSQRT: number) => {
   const deleteSQRTSymbol = () => {
      // Убираем знак корня. Если до него было число, то заменяем на знак умножения (2√2)
      Numbers[indexSQRT] = ''
      if (typeof Numbers.at(indexSQRT - 1) == 'number') {
         Numbers[indexSQRT] = '*'
      }
   }

   // если после корня число, то оборачиваем в скобки
   if (Numbers.at(indexSQRT + 1) !== '(' && Numbers.at(indexSQRT + 2) !== '(') {
      Numbers.splice(indexSQRT + 1, 0, '(')
      Numbers.splice(indexSQRT + 3, 0, ')')
      Numbers.splice(indexSQRT + 4, 0, '**(1/2)')
      deleteSQRTSymbol()
      return Numbers
   }

   // если после знака корня сложное выражение, то считаем количество скобок
   // после последней закрывающей добавляем **(1/2)
   let BracketsCount = 0
   for (let g = 0; g < Numbers.length - indexSQRT; g++) {
      if (Numbers.at(indexSQRT + g) === '(') BracketsCount++

      if (Numbers.at(indexSQRT + g) === ')') {
         BracketsCount--
         if (!BracketsCount) {
            Numbers.splice(indexSQRT + 1, 0, '(')
            Numbers.splice(indexSQRT + g + 2, 0, '**(1/2)')
            Numbers.splice(indexSQRT + g + 3, 0, ')')
            break
         }
      }
   }

   deleteSQRTSymbol()
   return Numbers
}

// основная функция расчета
export const getResult = (value: string) => {
   // деление приходящей строки на математические операторы и преобразованные числа
   // при наличии лишних символов заменяем их на пустую строку
   let Numbers = value.split(OperatorsRegExp).map((inp) => {
      const parsed = parseFloat(inp)
      if (isNaN(parsed) && !OperatorsRegExp.test(inp)) return ''
      if (!parsed) return inp
      return parsed
   })

   for (let i = 0; i < Numbers.length; i++) {
      // проверка на корень
      if (Numbers.at(i) === '√') {
         Numbers = transformSQRT(Numbers, i)
      }

      // если текущий символ - открывающая скобка, которая находится сразу после числа или закрывающей скобки,
      // то добавляем перед ней знак умножения
      if (
         (Numbers.at(i) === '(' && typeof Numbers.at(i - 1) == 'number') ||
         (Numbers.at(i) === '(' && Numbers.at(i - 2) === ')')
      ) {
         Numbers.splice(i, 0, '*')
      }

      // если текущий символ - закрывающая скобка, сразу после которой находится число,
      // то добавляем после неё знак умножения
      if (Numbers.at(i) === ')' && typeof Numbers.at(i + 1) == 'number') {
         Numbers.splice(i + 1, 0, '*')
      }
   }

   return Calculate(Numbers.join(''))
}
