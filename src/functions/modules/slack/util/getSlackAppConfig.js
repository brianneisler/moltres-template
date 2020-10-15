import { find, getPath, propEq } from '../../../../utils/lang'

const getSlackAppConfig = ({ config }, slackAppId) =>
  find(propEq('appId', slackAppId), getPath(['slack', 'apps'], config))

export default getSlackAppConfig
