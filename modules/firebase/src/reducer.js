import { handleActions } from 'moltres'
import { merge } from 'ramda'
import { setApp } from './actions'

const reducer = handleActions({
  [setApp]: (state, { payload }) => merge(state, {
    apps: merge(state.apps, {
      [payload.name]: payload.app
    })
  })
}, {
  apps: {}
})

export default reducer
