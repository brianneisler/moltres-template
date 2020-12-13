import { Array, Object } from 'moltres/core'

import SlackApp from './SlackApp'

const SlackConfig = {
  name: 'slack.SlackConfig',
  schema: Object.schema.keys({
    apps: Array.schema.items(SlackApp.schema).required()
  })
}

export default SlackConfig
