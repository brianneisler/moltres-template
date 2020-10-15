import { Object } from '../../../../core/schemas'

const SlackApp = {
  name: 'slack.SlackApp',
  schema: Object.schema
    .keys({
      appId: String.schema.required(),
      clientId: String.schema.required(),
      clientSecret: String.schema.required(),
      signingSecret: String.schema.required()
    })
    .required()
}

export default SlackApp
