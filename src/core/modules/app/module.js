import { assoc } from '../../../utils/lang'
import { handleActions } from '../../../utils/redux'

import { AppConfig, SetAppConfigAction } from './schemas'

const mod = ({ config }) => ({
  reducer: handleActions(
    {
      [SetAppConfigAction.name]: (state, action) =>
        assoc('config', action.payload.config, state)
    },
    {
      config: config.app
    }
  )
})

mod.configSchema = AppConfig

export default mod
