import { assoc } from '../../../utils/lang'
import { handleActions } from '../../../utils/redux'

import * as actions from './actions'

const mod = (config) => ({
  reducer: handleActions(
    {
      [actions.setAppConfig]: (state, action) =>
        assoc('config', action.payload.config, state)
    },
    {
      config: config.app
    }
  )
})

export default mod
