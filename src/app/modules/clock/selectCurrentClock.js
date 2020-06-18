import { createSelector, select } from '../../../utils/lang'

const selectCurrentClock = select(createSelector('clock.current'))

export default selectCurrentClock
