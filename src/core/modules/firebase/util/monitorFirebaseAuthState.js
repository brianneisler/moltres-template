import { handleChannel, put } from '../../../../utils/redux'
import { firebaseAuthStateChangedAction } from '../actions'

import createFirebaseAuthStateChannel from './createFirebaseAuthStateChannel'

function* monitorFirebaseAuthState(context) {
  const channel = createFirebaseAuthStateChannel(context)
  yield handleChannel(channel, function* (event) {
    yield put(firebaseAuthStateChangedAction(context, event.firebaseUser))
  })
}

export default monitorFirebaseAuthState
