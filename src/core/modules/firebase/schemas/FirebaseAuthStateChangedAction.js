import { Action, Object } from '../../core/schemas'

const FirebaseAuthStateChangedAction = {
  name: 'firebase.FirebaseAuthStateChangedAction',
  schema: Action.schema.keys({
    payload: Object.schema.allow(null).required()
  })
}

export default FirebaseAuthStateChangedAction
