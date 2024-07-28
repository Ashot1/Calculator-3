import { useStorage } from './BrowserStorage.ts'

export const useHistory = () => {
   const [HistoryData, setHistoryList] = useStorage(localStorage, 'History', '')

   const HistoryArray = HistoryData.split('$;$').filter((value) => !!value)

   const putToHistory = (expression: string) => {
      if (HistoryArray.length >= 20) {
         HistoryArray.pop()
      }
      setHistoryList(`${expression}$;$${HistoryArray.join('$;$')}`)
   }

   const deleteFromHistory = (id: number) => {
      if (id < 0 || id > HistoryArray.length) return
      const newArray = HistoryArray.toSpliced(id, 1)
      setHistoryList(newArray.join('$;$'))
   }

   return {
      HistoryData,
      putToHistory,
      setHistory: setHistoryList,
      HistoryArray,
      deleteFromHistory,
   }
}
