import String from './String'

const Url = {
  name: 'core.Url',
  schema: String.schema.uri({
    scheme: ['http', 'https']
  })
}

export default Url
