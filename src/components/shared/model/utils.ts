import { MouseEvent, TouchEvent } from 'react'

export const getMouseCoords = (e: MouseEvent<HTMLButtonElement>) => {
   const boundingRect = e.currentTarget.getBoundingClientRect()
   const x = e.clientX - boundingRect.left + 'px'
   const y = e.clientY - boundingRect.top + 'px'
   return { x, y }
}

export const getStartTouchCoords = (e: TouchEvent<HTMLButtonElement>) => {
   const boundingRect = e.currentTarget.getBoundingClientRect()
   const x = e.changedTouches[0].clientX - boundingRect.left + 'px'
   const y = e.changedTouches[0].clientY - boundingRect.top + 'px'
   return { x, y }
}
