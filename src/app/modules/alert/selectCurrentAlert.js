import { createSelector, select } from 'moltres/lang'

const selectCurrentAlert = select(createSelector('alert.currentAlert'))

export default selectCurrentAlert
