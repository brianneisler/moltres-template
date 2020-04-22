import Number from './Number'
import Object from './Object'

const Timestamp = {
  name: 'core.Timestamp',
  schema: Object.schema.keys({
    nanoseconds: Number.schema.required(),
    seconds: Number.schema.required()
  })
}

export default Timestamp
