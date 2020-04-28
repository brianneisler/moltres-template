import { createAction } from 'redux-actions'

const setFirebaseDatabase = createAction('SET_FIREBASE_DATABASE', (database) => ({
  database
}))

export default setFirebaseDatabase
