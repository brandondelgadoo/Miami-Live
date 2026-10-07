import { useSyncExternalStore } from 'react'

// One shared 1-second clock, so every countdown on the page ticks together
// instead of each card running its own interval.
const listeners = new Set()
let now = Date.now()
let intervalId = null

const subscribe = (listener) => {
  listeners.add(listener)
  if (intervalId === null) {
    now = Date.now()
    intervalId = setInterval(() => {
      now = Date.now()
      listeners.forEach((notify) => notify())
    }, 1000)
  }

  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      clearInterval(intervalId)
      intervalId = null
    }
  }
}

const getSnapshot = () => now

const useNow = () => useSyncExternalStore(subscribe, getSnapshot)

export default useNow
