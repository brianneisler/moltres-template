import { createAction } from '../../../../utils/redux'

const setFirebaseDatabase = createAction(
  'SET_FIREBASE_DATABASE',
  (database) => ({
    database
  })
)

export default setFirebaseDatabase
