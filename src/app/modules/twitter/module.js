import * as actions from './actions'
import { assocProp } from '../../../utils/data'
import { handleActions } from '../../../utils/lang'

const mod = (config) => ({
  reducer: handleActions(
    {
      [actions.setTwitterConfig]: (state, action) =>
        assocProp('config', action.payload.config, state)
    },
    {
      config: config.twitter
    }
  )
})

export default mod
