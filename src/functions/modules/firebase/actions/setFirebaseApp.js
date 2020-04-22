import { createAction } from 'redux-actions'

const setFirebaseApp = createAction('SET_FIREBASE_APP', (app) => ({
  app
}))

export default setFirebaseApp
