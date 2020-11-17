import { createAction } from 'moltres/redux'

const setCurrentClock = createAction('SET_CURRENT_CLOCK', (timestamp) => ({
  timestamp
}))

export default setCurrentClock
