import { path } from 'moltres-utils'

const selectCurrentClock = (state) => path(['clock', 'current'], state)

export default selectCurrentClock
