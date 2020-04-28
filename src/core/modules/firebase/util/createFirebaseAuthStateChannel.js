import { eventChannel, expandingBuffer } from '../../../../utils/lang'

const createFirebaseAuthStateChannel = ({ auth }) => {
  return eventChannel((emitter) => {
    const listener = (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in.
        emitter({ firebaseUser })
      } else {
        // No user is signed in.
        emitter({ firebaseUser: null })
      }
    }
    const unsubscribe = auth.onAuthStateChanged(listener)
    return () => unsubscribe()
  }, expandingBuffer(1))
}

export default createFirebaseAuthStateChannel
