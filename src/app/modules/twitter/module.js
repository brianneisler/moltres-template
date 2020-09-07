import { assoc } from '../../../utils/lang'
import { handleActions } from '../../../utils/redux'

import * as actions from './actions'

const mod = ({ config }) => ({
  reducer: handleActions(
    {
      [actions.setTwitterConfig]: (state, action) =>
        assoc('config', action.payload.config, state)
    },
    {
      config: config.twitter
    }
  )
})

export default mod
