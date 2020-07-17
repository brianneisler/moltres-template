import { assoc } from '../../../utils/lang'
import { handleActions } from '../../../utils/redux'

import * as actions from './actions'

const mod = (config) => ({
  reducer: handleActions(
    {
      [actions.setFacebookConfig]: (state, action) =>
        assoc('config', action.payload.config, state)
    },
    {
      config: config.facebook
    }
  )
})

export default mod
