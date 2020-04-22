import { createAction } from 'redux-actions'

const setFirebaseAuth = createAction('SET_FIREBASE_AUTH', (auth) => ({
  auth
}))

export default setFirebaseAuth
