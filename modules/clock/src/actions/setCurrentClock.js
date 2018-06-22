import { createAction } from 'moltres'

const setCurrentClock = createAction('SET_CURRENT_CLOCK', (timestamp) => ({
  timestamp
}))

export default setCurrentClock
