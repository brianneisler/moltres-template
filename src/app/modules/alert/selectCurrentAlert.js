import { createSelector, select } from '../../../utils/data'

const selectCurrentAlert = select(createSelector('alert.currentAlert'))

export default selectCurrentAlert
