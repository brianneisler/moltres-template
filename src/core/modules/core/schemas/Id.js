import String from './String'

const Id = {
  name: 'core.Id',
  schema: String.schema.alphanum().length(20)
}

export default Id
