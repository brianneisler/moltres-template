import { createAction } from 'redux-actions'

const setFacebookConfig = createAction('SET_FACEBOOK_CONFIG', (config) => ({
  config
}))

export default setFacebookConfig
