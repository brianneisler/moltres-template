import { compose } from '../../../utils/lang'
import { fork } from '../../../utils/redux'
import getContext from '../../getContext'
import withContext from '../../withContext'

import { FirebaseConfig } from './schemas'
import { monitorFirebaseAuthState } from './util'

const enhance = compose(withContext())

const mod = () => ({
  async finally(store) {
    const app = store.getContext('app')
    if (app) {
      await app.delete()
    }
  },

  *run() {
    const auth = yield* getContext('auth')
    if (auth) {
      yield fork(enhance(monitorFirebaseAuthState))
    }
  }
})

mod.configSchema = FirebaseConfig

export default mod
