import { createSelector, select } from 'moltres/lang'

const selectCurrentClock = select(createSelector('clock.current'))

export default selectCurrentClock
