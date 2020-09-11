import Boolean from './Boolean'
import Object from './Object'

const CoreConfig = {
  name: 'core.CoreConfig',
  schema: Object.schema.keys({
    debug: Boolean.schema
  })
}

export default CoreConfig
