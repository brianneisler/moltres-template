import { handleActions } from 'moltres'
import { merge } from 'ramda'
import { setFirebaseApp } from '../actions'

const buildReducer = (config) => handleActions({
  [setFirebaseApp]: (state, { payload }) => merge(state, {
    apps: merge(state.apps, {
      [payload.name]: payload.app
    })
  })
}, {
  apps: {},
  configs: config
})

export default buildReducer
