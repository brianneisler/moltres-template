import { createAction } from 'redux-actions'

const setAppConfig = createAction('SET_APP_CONFIG', (config) => ({
  config
}))

export default setAppConfig
