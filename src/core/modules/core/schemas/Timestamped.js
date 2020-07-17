import Object from './Object'

const Timestamped = {
  name: 'core.Timestamped',
  schema: Object.schema.keys({
    // NOTE BRN: We don't make these required because the validation for creation
    // is done before the timestamps are added.
    createdAt: Object.schema,
    removedAt: Object.schema.allow(null),
    updatedAt: Object.schema
  })
}

export default Timestamped
