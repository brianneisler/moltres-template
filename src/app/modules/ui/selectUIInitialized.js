import { createSelector, select } from '../../../utils/data'

const selectUIInitialized = select(createSelector('ui.initialized'))

export default selectUIInitialized
