import { Action } from '../../action'
import { Object, String } from '../../core'

import Event from './Event'

const ProcessEventAction = {
  name: 'event.ProcessEventAction',
  schema: Action.schema.keys({
    payload: Object.schema.keys({
      event: Event.schema,
      eventId: String.schema.required()
    })
  })
}

export default ProcessEventAction
