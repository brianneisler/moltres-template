import { createAction } from '../../../../utils/redux'

const setTwitterConfig = createAction('SET_TWITTER_CONFIG', (config) => ({
  config
}))

export default setTwitterConfig
