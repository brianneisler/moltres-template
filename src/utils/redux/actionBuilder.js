import { isContext, uuidv4 } from '../lang'
import { validateSchema } from '../schema'
import { rfc3339TimestampString } from '../time'

import createAction from './createAction'

const ACTION_IDENTITY = (context, payload = null) => payload

const actionBuilder = ({ Schema, meta, payload, type }) => {
  if (!type && !(Schema && (Schema.type || Schema.name))) {
    throw new Error(`'type' or 'schema.type' must be supplid`)
  }
  type = type || Schema.type || Schema.name
  payload = payload || ACTION_IDENTITY

  const actionCreator = createAction(type, payload, meta)
  const builder = (context, ...args) => {
    if (!isContext(context)) {
      throw new TypeError(
        `parameter 'context' is expected to be a Context instance. Instead was given ${context}`
      )
    }
    const { source } = context
    const action = {
      id: uuidv4(),
      source,
      specversion: '0.3-wip',
      time: rfc3339TimestampString(new Date()),
      ...actionCreator(context, ...args)
    }
    if (Schema) {
      validateSchema(Schema, action)
    }
    return action
  }

  builder.toString = () => type
  builder.requiresContext = true
  return builder
}

export default actionBuilder
