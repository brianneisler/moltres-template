import { Object, String, Url } from '../../core/schemas'

const AppConfig = {
  name: 'app.AppConfig',
  schema: Object.schema
    .keys({
      description: String.schema.required(),
      name: String.schema.required(),
      slug: String.schema.required(),
      theme: String.schema.required(),
      url: Url.schema.required()
    })
    .required()
}

export default AppConfig
