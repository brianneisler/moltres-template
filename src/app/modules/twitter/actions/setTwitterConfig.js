import { createAction } from 'redux-actions'

const setTwitterConfig = createAction('SET_TWITTER_CONFIG', (config) => ({
  config
}))

export default setTwitterConfig
