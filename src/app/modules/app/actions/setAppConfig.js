import { createAction } from '../../../../utils/redux'

const setAppConfig = createAction('SET_APP_CONFIG', (config) => ({
  config
}))

export default setAppConfig
