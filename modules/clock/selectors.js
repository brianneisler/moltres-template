import { path } from 'ramda'

export const selectCurrentClock = (state) => path([ 'clock', 'current' ], state)
