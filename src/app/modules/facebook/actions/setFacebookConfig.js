import { createAction } from '../../../../utils/redux'

const setFacebookConfig = createAction('SET_FACEBOOK_CONFIG', (config) => ({
  config
}))

export default setFacebookConfig
