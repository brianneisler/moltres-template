import { merge } from 'ramda'
import { handleActions } from 'redux-actions'
import { setApp } from './actions'

export default handleActions({
  [setApp]: (state, { payload }) => merge(state, {
    apps: merge(state.apps, {
      [payload.name]: payload.app
    })
  })
}, {
  apps: {}
})
