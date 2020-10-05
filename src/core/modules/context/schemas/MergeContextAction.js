import { Action } from '../../action/schemas'
import { Object } from '../../core/schemas'

const MergeContextAction = {
  name: 'context.MergeContextAction',
  schema: Action.schema.keys({
    // key based updates
    payload: Object.schema.required()
  })
}

export default MergeContextAction
