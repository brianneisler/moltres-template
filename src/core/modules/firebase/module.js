import * as actions from './actions'
import { assoc, compose } from '../../../utils/lang'
import { fork, handleActions, put } from '../../../utils/redux'
import { monitorFirebaseAuthState } from './util'
import getContext from '../../getContext'
import withContext from '../../withContext'

const enhance = compose(withContext())

const mod = () => ({
  finally: async (store) => {
    const app = store.getContext('app')
    if (app) {
      await app.delete()
    }
  },

  reducer: handleActions(
    {
      [actions.setFirebaseApp]: (state, action) =>
        assoc('app', action.payload.app, state),
      [actions.setFirebaseAuth]: (state, action) =>
        assoc('auth', action.payload.auth, state),
      [actions.setFirebaseDatabase]: (state, action) =>
        assoc('database', action.payload.database, state),
      [actions.setFirebaseFirebase]: (state, action) =>
        assoc('firebase', action.payload.firebase, state),
      [actions.setFirebaseStorage]: (state, action) =>
        assoc('storage', action.payload.storage, state)
    },
    {
      app: undefined,
      auth: undefined,
      database: undefined,
      firebase: undefined,
      storage: undefined
    }
  ),

  run: function* run() {
    // Store into state for use by react components
    const app = yield* getContext('app')
    const auth = yield* getContext('auth')
    const database = yield* getContext('database')
    const _firebase = yield* getContext('firebase')
    const storage = yield* getContext('storage')
    yield put([
      actions.setFirebaseApp(app),
      actions.setFirebaseAuth(auth),
      actions.setFirebaseDatabase(database),
      actions.setFirebaseFirebase(_firebase),
      actions.setFirebaseStorage(storage)
    ])

    if (auth) {
      yield fork(enhance(monitorFirebaseAuthState))
    }
  }
})

export default mod
