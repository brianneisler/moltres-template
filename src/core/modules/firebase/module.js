import { compose } from '../../../utils/lang'
import { fork } from '../../../utils/redux'
import getContext from '../../getContext'
import withContext from '../../withContext'

import * as actions from './actions'
import * as schemas from './schemas'
import { FirebaseConfig } from './schemas'
import { monitorFirebaseAuthState } from './util'

const enhance = compose(withContext())

const mod = () => ({
  actions,
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
  },
  schemas
})

mod.configSchema = FirebaseConfig

export default mod
