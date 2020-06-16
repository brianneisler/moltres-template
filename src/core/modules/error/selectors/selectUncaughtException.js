import { createSelector, select } from '../../../../utils/data'

const selectUncaughtException = select(
  createSelector('error.uncaughtException')
)

export default selectUncaughtException
