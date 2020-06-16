import { createAction } from 'redux-actions'

const setFirebaseFirebase = createAction(
  'SET_FIREBASE_FIREBASE',
  (firebase) => ({
    firebase
  })
)

export default setFirebaseFirebase
