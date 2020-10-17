import { assocPath } from '../../../utils/lang'

import * as schemas from './schemas'
import { ProcessEventAction } from './schemas'
import * as sdk from './sdk'
import { findEventById } from './sdk'

const createEventMiddleware = () => (store) => (next) => (action) => {
  if (action.type === ProcessEventAction.name) {
    const context = store.getContext()
    // TODO BRN: Replace this with auto action enrichment
    return findEventById(context, action.payload.eventId).then((event) => {
      action = assocPath(['payload', 'event'], event, action)
      return next(action)
    })
  }
  return next(action)
}

const mod = () => ({
  middleware: [createEventMiddleware()],
  schemas,
  sdk
})

export default mod
