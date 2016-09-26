import o from 'duxtape'
import { handleActions } from 'redux-actions'
import { appReady } from './actions'

export default o.mapReducers({
  app: handleActions({
    [appReady]: (state, action) => action.payload
  })
})
