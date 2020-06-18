import { createAction } from '../../../../utils/redux'

const setFirebaseAuth = createAction('SET_FIREBASE_AUTH', (auth) => ({
  auth
}))

export default setFirebaseAuth
