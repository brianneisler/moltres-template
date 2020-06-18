import { assocPath } from '../../../utils/lang'
import { handleActions } from '../../../utils/redux'
import { setImageSizes } from './actions'

const mod = {
  reducer: handleActions(
    {
      [setImageSizes]: (state, action) => {
        return assocPath(['sizes', action.payload.url], action.payload, state)
      }
    },
    {
      sizes: {}
    }
  )
}

export default mod
