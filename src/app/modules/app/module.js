import * as actions from './actions'
import { assoc } from '../../../utils/data'
import { handleActions } from '../../../utils/lang'

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
