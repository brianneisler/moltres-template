import { createAction } from 'redux-actions'

const setFirebaseStorage = createAction('SET_FIREBASE_STORAGE', (storage) => ({
  storage
}))

export default setFirebaseStorage
