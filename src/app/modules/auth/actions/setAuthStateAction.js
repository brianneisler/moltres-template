import { SetAuthStateAction } from '../schemas'
import { actionBuilder } from '../../../../utils/lang'

const setAuthStateAction = actionBuilder({
  Schema: SetAuthStateAction
})

export default setAuthStateAction
