import { Action, Boolean, Object } from 'moltres/core'

const PreloadAction = {
  schema: Action.schema.keys({
    payload: Object.schema.keys({
      first: Boolean.schema.required(),
      location: Object.schema.required(),
      previousLocation: Object.schema.allow(null).required()
    })
  }),
  type: 'ROUTER:PRELOAD'
}

export default PreloadAction
