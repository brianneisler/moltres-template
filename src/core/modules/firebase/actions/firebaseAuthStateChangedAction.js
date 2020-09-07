import { actionBuilder } from '../../../../utils/redux'
import { FirebaseAuthStateChangedAction } from '../schemas'

const firebaseAuthStateChangedAction = actionBuilder({
  Schema: FirebaseAuthStateChangedAction
})

export default firebaseAuthStateChangedAction
