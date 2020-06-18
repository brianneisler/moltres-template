import { createSelector, select } from '../../../../utils/lang'

const selectUncaughtException = select(
  createSelector('error.uncaughtException')
)

export default selectUncaughtException
