import { createSelector, select } from '../../../utils/lang'

const selectCurrentAlert = select(createSelector('alert.currentAlert'))

export default selectCurrentAlert
