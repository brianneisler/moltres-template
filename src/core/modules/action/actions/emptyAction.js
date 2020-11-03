import { actionBuilder } from '../../../../utils/redux'
import { EmptyAction } from '../schemas'

const emptyAction = actionBuilder({
  Schema: EmptyAction
})

export default emptyAction
