import { assoc } from '../../../utils/lang'
import { handleActions } from '../../../utils/redux'

import * as actions from './actions'
import * as schemas from './schemas'
import { AppConfig, SetAppConfigAction } from './schemas'
import * as selectors from './selectors'

const mod = ({ config }) => ({
  actions,
  reducer: handleActions(
    {
      [SetAppConfigAction.name]: (state, action) =>
        assoc('config', action.payload.config, state)
    },
    {
      config: config.app
    }
  ),
  schemas,
  selectors
})

mod.configSchema = AppConfig

export default mod
