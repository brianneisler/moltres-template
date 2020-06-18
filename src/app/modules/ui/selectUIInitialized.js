import { createSelector, select } from '../../../utils/lang'

const selectUIInitialized = select(createSelector('ui.initialized'))

export default selectUIInitialized
