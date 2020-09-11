import { Object, Url } from '../../core/schemas'

const ApiConfig = {
  name: 'api.ApiConfig',
  schema: Object.schema
    .keys({
      url: Url.schema.required()
    })
    .required()
}

export default ApiConfig
