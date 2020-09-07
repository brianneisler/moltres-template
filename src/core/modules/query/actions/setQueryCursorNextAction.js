import { actionBuilder } from '../../../../utils/redux'
import { SetQueryCursorNextAction } from '../schemas'

const setQueryCursorNextAction = actionBuilder({
  Schema: SetQueryCursorNextAction
})

export default setQueryCursorNextAction
