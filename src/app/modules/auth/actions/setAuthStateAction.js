import { SetAuthStateAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const setAuthStateAction = actionBuilder({
  Schema: SetAuthStateAction
})

export default setAuthStateAction
