import { actionBuilder } from 'moltres/redux'
import { SetAuthStateAction } from '../schemas'

const setAuthStateAction = actionBuilder({
  Schema: SetAuthStateAction
})

export default setAuthStateAction
