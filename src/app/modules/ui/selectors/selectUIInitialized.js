import { createSelector, select } from 'moltres/lang'

const selectUIInitialized = select(createSelector('ui.initialized'))

export default selectUIInitialized
