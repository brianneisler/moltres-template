import { assocPath } from '../../../utils/data'
import { handleActions } from '../../../utils/lang'
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
