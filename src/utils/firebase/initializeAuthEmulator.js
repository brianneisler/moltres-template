import { append, reject } from '../data'

const initializeAuthEmulator = () => {
  // TODO BRN: Implement a simple emulator for the auth API
  let listeners = []
  return {
    onAuthStateChanged: (listener) => {
      listeners = append(listener, listener)
      return () => {
        listeners = reject((value) => value === listener, listeners)
      }
    }
  }
}

export default initializeAuthEmulator
