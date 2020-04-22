import * as actions from './actions'
import { assocProp } from '../../../utils/data'
import { handleActions, put } from '../../../utils/lang'
import getContext from '../../../core/getContext'

const mod = () => ({
  finally: async (store) => {
    const database = store.getContext('database')
    database.disableNetwork()
  },

  reducer: handleActions(
    {
      [actions.setFirebaseApp]: (state, action) => assocProp('app', action.payload.app, state),
      [actions.setFirebaseAuth]: (state, action) => assocProp('auth', action.payload.auth, state),
      [actions.setFirebaseDatabase]: (state, action) =>
        assocProp('database', action.payload.database, state),
      [actions.setFirebaseFirebase]: (state, action) =>
        assocProp('firebase', action.payload.firebase, state),
      [actions.setFirebaseStorage]: (state, action) =>
        assocProp('storage', action.payload.storage, state)
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
  }
})

export default mod
