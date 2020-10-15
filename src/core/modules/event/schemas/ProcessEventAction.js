import { Action } from '../../action'
import { Object, String } from '../../core'

const ProcessEventAction = {
  name: 'event.ProcessEventAction',
  schema: Action.schema.keys({
    payload: Object.schema.keys({
      eventId: String.schema.required()
    })
  })
}

export default ProcessEventAction
