import { createAction } from '../../../../utils/redux'

const setFirebaseFirebase = createAction(
  'SET_FIREBASE_FIREBASE',
  (firebase) => ({
    firebase
  })
)

export default setFirebaseFirebase
