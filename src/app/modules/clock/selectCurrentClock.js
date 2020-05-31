import { createSelector, select } from '../../../utils/data'

const selectCurrentClock = select(createSelector('clock.current'))

export default selectCurrentClock
