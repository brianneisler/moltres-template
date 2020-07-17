import { actionBuilder } from '../../../../utils/redux'
import { SetAuthStateAction } from '../schemas'

const setAuthStateAction = actionBuilder({
  Schema: SetAuthStateAction
})

export default setAuthStateAction
