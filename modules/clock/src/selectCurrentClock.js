import { path } from 'ramda'

const selectCurrentClock = (state) => path([ 'clock', 'current' ], state)

export default selectCurrentClock
