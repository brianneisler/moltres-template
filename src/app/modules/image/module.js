import { assocPath } from 'moltres/lang'

import { handleActions } from 'moltres/redux'

import { setImageSizes } from './actions'

const mod = () => ({
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
})

export default mod
