import { firebaseAuthStateChanged } from '../actions'
import { handleChannel, put } from '../../../../utils/redux'
import createFirebaseAuthStateChannel from './createFirebaseAuthStateChannel'

function* monitorFirebaseAuthState(context) {
  const channel = createFirebaseAuthStateChannel(context)
  yield handleChannel(channel, function* (event) {
    yield put(firebaseAuthStateChanged(event.firebaseUser))
  })
}

export default monitorFirebaseAuthState
