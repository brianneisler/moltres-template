import { createAction } from '../../../../utils/redux'

const setFirebaseApp = createAction('SET_FIREBASE_APP', (app) => ({
  app
}))

export default setFirebaseApp
