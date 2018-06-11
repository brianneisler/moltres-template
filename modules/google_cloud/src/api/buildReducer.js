import { handleActions } from 'moltres'
import { merge } from 'ramda'
import { setGoogleCloudStorage } from '../actions'

const buildReducer = (config) => handleActions({
  [setGoogleCloudStorage]: (state, { payload }) => merge(state, {
    storage: merge(state.storage, {
      [payload.name]: payload.app
    })
  })
}, {
  storage: {},
  configs: config
})

export default buildReducer
