import { createAction } from 'redux-actions'

const setCurrentClock = createAction('SET_CURRENT_CLOCK', (timestamp) => ({
  timestamp
}))

export default setCurrentClock
