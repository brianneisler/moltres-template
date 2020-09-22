import String from './String'

const Email = {
  name: 'core.Email',
  schema: String.schema.email({
    tlds: {
      allow: false
    }
  })
}

export default Email
