import { find, getPath, propEq } from 'moltres/lang'

const getSlackAppConfig = ({ config }, slackAppId) =>
  find(propEq('appId', slackAppId), getPath(['slack', 'apps'], config))

export default getSlackAppConfig
