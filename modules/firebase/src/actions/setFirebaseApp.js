import { createAction } from 'moltres'

const setFirebaseApp = createAction('SET_FIREBASE_APP', (name, app) => ({
  app,
  name
}))

export default setFirebaseApp
