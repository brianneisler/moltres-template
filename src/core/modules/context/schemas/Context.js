import { Boolean, Object } from '../../core/schemas'

const Context = {
  name: 'context.Context',
  schema: Object.schema.keys({
    isContext: Boolean.schema.required()
  })
}

export default Context
