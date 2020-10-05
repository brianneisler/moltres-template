import { actionBuilder } from '../../../../utils/redux'
import { MergeContextAction } from '../schemas'

const mergeContextAction = actionBuilder({
  Schema: MergeContextAction
})

export default mergeContextAction
